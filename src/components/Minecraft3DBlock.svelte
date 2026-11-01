<script>
  import { onMount } from "svelte";
  import { Pickaxe } from "lucide-svelte";
  import { sound } from "../utils/sound.js";
  import confetti from "canvas-confetti";

  let canvas = $state();
  let gl = null;
  let animFrame;

  // Selected block
  let currentBlock = $state("tnt");

  // True 3D perspective angles: Pitch 25°, Yaw 45°
  let rotX = $state(25);
  let rotY = $state(45);
  let autoRotate = $state(true);

  // Floating 3D bobbing
  let time = 0;
  let bobY = $state(0);

  // Drag interaction
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startRotX = 0;
  let startRotY = 0;
  let hasMoved = false;

  // Mining / punch state
  let punchScale = $state(1);
  let floatParticles = $state([]);
  let particleIdCounter = 0;

  const blocks = {
    tnt: {
      name: "TNT BLOCK",
      id: "minecraft:tnt",
      rarity: "DANGEROUS",
      accent: "#FF5555"
    },
    grass: {
      name: "GRASS BLOCK",
      id: "minecraft:grass_block",
      rarity: "COMMON",
      accent: "#55FF55"
    },
    diamond: {
      name: "DIAMOND ORE",
      id: "minecraft:diamond_ore",
      rarity: "RARE",
      accent: "#55FFFF"
    },
    crafting: {
      name: "CRAFTING TABLE",
      id: "minecraft:crafting_table",
      rarity: "UNCOMMON",
      accent: "#b8860b"
    },
    gold: {
      name: "LUCKY GOLD",
      id: "minecraft:gold_block",
      rarity: "TREASURE",
      accent: "#FFFF55"
    }
  };

  // WebGL resources
  let shaderProgram = null;
  let blockTextures = {};
  let positionBuffer = null;
  let uvBuffer = null;
  let normalBuffer = null;
  let indexBuffer = null;

  // Shaders: True 3D Perspective + 3D Lighting
  const vsSource = `
    attribute vec3 aPosition;
    attribute vec2 aUv;
    attribute vec3 aNormal;

    uniform mat4 uMatrix;
    uniform mat3 uNormalMatrix;

    varying vec2 vUv;
    varying float vLight;

    void main() {
      gl_Position = uMatrix * vec4(aPosition, 1.0);
      vUv = aUv;

      vec3 norm = normalize(uNormalMatrix * aNormal);
      vec3 lightDir = normalize(vec3(0.35, 0.85, 0.45));
      float diff = max(dot(norm, lightDir), 0.0);

      float ambient = 0.65;
      if (norm.y > 0.5) {
        ambient = 0.95;
      } else if (norm.y < -0.5) {
        ambient = 0.40;
      }

      vLight = clamp(ambient * 0.75 + diff * 0.45, 0.45, 1.15);
    }
  `;

  const fsSource = `
    precision mediump float;

    uniform sampler2D uSampler;
    varying vec2 vUv;
    varying float vLight;

    void main() {
      vec4 texColor = texture2D(uSampler, vUv);
      gl_FragColor = vec4(texColor.rgb * vLight, texColor.a);
    }
  `;

  // True 3D Perspective Projection Matrix (Standard Column-Major)
  function mat4Perspective(fovRad, aspect, near, far) {
    const f = 1.0 / Math.tan(fovRad / 2);
    const nf = 1.0 / (near - far);
    return new Float32Array([
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * nf, -1,
      0, 0, 2 * near * far * nf, 0
    ]);
  }

  // Column-Major 4x4 Matrix Multiply (C = A * B)
  function mat4Multiply(a, b) {
    const out = new Float32Array(16);
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        out[c * 4 + r] =
          a[r] * b[c * 4] +
          a[4 + r] * b[c * 4 + 1] +
          a[8 + r] * b[c * 4 + 2] +
          a[12 + r] * b[c * 4 + 3];
      }
    }
    return out;
  }

  // Column-Major ModelView: Scale -> Rotate Y -> Rotate X -> Translate
  function mat4ModelView(rxDeg, ryDeg, scale, by) {
    const radX = (rxDeg * Math.PI) / 180;
    const radY = (ryDeg * Math.PI) / 180;
    const cx = Math.cos(radX), sx = Math.sin(radX);
    const cy = Math.cos(radY), sy = Math.sin(radY);

    const m = new Float32Array(16);
    // Column 0
    m[0] = scale * cy;
    m[1] = scale * sx * sy;
    m[2] = -scale * cx * sy;
    m[3] = 0;

    // Column 1
    m[4] = 0;
    m[5] = scale * cx;
    m[6] = scale * sx;
    m[7] = 0;

    // Column 2
    m[8] = scale * sy;
    m[9] = -scale * sx * cy;
    m[10] = scale * cx * cy;
    m[11] = 0;

    // Column 3 (Translation in 3D camera space)
    m[12] = 0;
    m[13] = by + 0.08;
    m[14] = -2.8;
    m[15] = 1;

    return m;
  }

  // Upper-left 3x3 normal matrix in column-major
  function mat3NormalFromMat4(m) {
    return [
      m[0], m[1], m[2],
      m[4], m[5], m[6],
      m[8], m[9], m[10]
    ];
  }

  // Generate 16x48 Atlas (Top: 0..1/3, Side: 1/3..2/3, Bottom: 2/3..1)
  function createTextureAtlas(drawTop, drawSide, drawBottom) {
    const c = document.createElement("canvas");
    c.width = 16;
    c.height = 48;
    const g = c.getContext("2d");

    // Top face
    g.save();
    drawTop(g);
    g.restore();

    // Side face
    g.save();
    g.translate(0, 16);
    drawSide(g);
    g.restore();

    // Bottom face
    g.save();
    g.translate(0, 32);
    drawBottom(g);
    g.restore();

    return c;
  }

  function initBlockAtlases() {
    // 1. TNT BLOCK
    const tntAtlas = createTextureAtlas(
      // Top
      (g) => {
        g.fillStyle = "#d82f1f";
        g.fillRect(0, 0, 16, 16);
        g.fillStyle = "#b42214";
        for (let x = 2; x < 14; x += 4) {
          for (let y = 2; y < 14; y += 4) g.fillRect(x, y, 2, 2);
        }
        g.fillStyle = "#262626";
        g.fillRect(7, 7, 2, 2);
        g.fillStyle = "#ffffff";
        g.fillRect(8, 6, 1, 1);
      },
      // Side (Crisp TNT band)
      (g) => {
        g.fillStyle = "#d82f1f";
        g.fillRect(0, 0, 16, 16);
        g.fillStyle = "#b42214";
        for (let x = 0; x < 16; x += 4) g.fillRect(x, 0, 1, 16);
        // White band
        g.fillStyle = "#ffffff";
        g.fillRect(0, 5, 16, 6);
        g.fillStyle = "#dcdcdc";
        g.fillRect(0, 5, 16, 1);
        g.fillRect(0, 10, 16, 1);
        // TNT lettering
        g.fillStyle = "#000000";
        // T
        g.fillRect(2, 6, 3, 1);
        g.fillRect(3, 7, 1, 3);
        // N
        g.fillRect(6, 6, 1, 4);
        g.fillRect(7, 7, 1, 1);
        g.fillRect(8, 8, 1, 1);
        g.fillRect(9, 6, 1, 4);
        // T
        g.fillRect(11, 6, 3, 1);
        g.fillRect(12, 7, 1, 3);
      },
      // Bottom
      (g) => {
        g.fillStyle = "#9a1c10";
        g.fillRect(0, 0, 16, 16);
      }
    );

    // 2. GRASS BLOCK
    const grassAtlas = createTextureAtlas(
      // Top
      (g) => {
        g.fillStyle = "#5a8c2f";
        g.fillRect(0, 0, 16, 16);
        g.fillStyle = "#4a7627";
        for (let i = 0; i < 28; i++) g.fillRect((i * 7) % 15, (i * 11) % 15, 2, 1);
        g.fillStyle = "#6ea33c";
        for (let i = 0; i < 22; i++) g.fillRect((i * 13) % 15, (i * 9) % 15, 1, 2);
      },
      // Side
      (g) => {
        g.fillStyle = "#866043";
        g.fillRect(0, 0, 16, 16);
        g.fillStyle = "#6b4b34";
        for (let x = 0; x < 16; x += 2) {
          for (let y = 5; y < 16; y += 3) {
            if ((x * y) % 3 === 0) g.fillRect(x, y, 1, 1);
          }
        }
        // Grass fringe
        g.fillStyle = "#5a8c2f";
        g.fillRect(0, 0, 16, 4);
        g.fillRect(2, 4, 2, 2);
        g.fillRect(6, 4, 3, 3);
        g.fillRect(12, 4, 2, 2);
        g.fillStyle = "#4a7627";
        g.fillRect(0, 3, 16, 1);
      },
      // Bottom
      (g) => {
        g.fillStyle = "#866043";
        g.fillRect(0, 0, 16, 16);
        g.fillStyle = "#5c3e2b";
        for (let x = 0; x < 16; x += 3) {
          for (let y = 0; y < 16; y += 3) g.fillRect(x, y, 1, 1);
        }
      }
    );

    // 3. DIAMOND ORE
    const diamondSide = (g) => {
      g.fillStyle = "#6f737b";
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = "#575b63";
      for (let x = 0; x < 16; x += 3) {
        for (let y = 0; y < 16; y += 3) {
          if ((x + y) % 2 === 0) g.fillRect(x, y, 2, 1);
        }
      }
      g.fillStyle = "#55ffff";
      g.fillRect(3, 4, 2, 2);
      g.fillRect(10, 3, 3, 2);
      g.fillRect(5, 10, 3, 2);
      g.fillRect(11, 11, 2, 2);
      g.fillStyle = "#c4ffff";
      g.fillRect(4, 4, 1, 1);
      g.fillRect(11, 3, 1, 1);
      g.fillRect(6, 10, 1, 1);
      g.fillStyle = "#008888";
      g.fillRect(3, 6, 1, 1);
      g.fillRect(13, 4, 1, 1);
      g.fillRect(8, 11, 1, 1);
    };
    const diamondAtlas = createTextureAtlas(diamondSide, diamondSide, diamondSide);

    // 4. CRAFTING TABLE
    const craftTop = (g) => {
      g.fillStyle = "#a87545";
      g.fillRect(0, 0, 16, 16);
      g.strokeStyle = "#402812";
      g.lineWidth = 1;
      g.strokeRect(0.5, 0.5, 15, 15);
      g.beginPath();
      g.moveTo(5.5, 1); g.lineTo(5.5, 15);
      g.moveTo(10.5, 1); g.lineTo(10.5, 15);
      g.moveTo(1, 5.5); g.lineTo(15, 5.5);
      g.moveTo(1, 10.5); g.lineTo(15, 10.5);
      g.stroke();
    };
    const craftSide = (g) => {
      g.fillStyle = "#8a582c";
      g.fillRect(0, 0, 16, 16);
      g.fillStyle = "#45260f";
      g.fillRect(0, 0, 16, 2);
      g.fillRect(0, 14, 16, 2);
      g.fillStyle = "#cccccc";
      g.fillRect(3, 4, 3, 8);
      g.fillStyle = "#45260f";
      g.fillRect(3, 10, 3, 2);
    };
    const craftBottom = (g) => {
      g.fillStyle = "#633f1f";
      g.fillRect(0, 0, 16, 16);
    };
    const craftAtlas = createTextureAtlas(craftTop, craftSide, craftBottom);

    // 5. LUCKY GOLD
    const goldSide = (g) => {
      g.fillStyle = "#f5cc38";
      g.fillRect(0, 0, 16, 16);
      g.strokeStyle = "#ba911a";
      g.lineWidth = 1;
      g.strokeRect(0.5, 0.5, 15, 15);
      g.fillStyle = "#ffffff";
      g.fillRect(2, 2, 2, 2);
      g.fillRect(12, 12, 2, 2);
      g.fillStyle = "#7a5806";
      g.fillRect(6, 4, 4, 1);
      g.fillRect(9, 5, 2, 2);
      g.fillRect(7, 7, 2, 2);
      g.fillRect(7, 10, 2, 2);
    };
    const goldAtlas = createTextureAtlas(goldSide, goldSide, goldSide);

    // Upload to WebGL textures
    blockTextures.tnt = loadGlTexture(tntAtlas);
    blockTextures.grass = loadGlTexture(grassAtlas);
    blockTextures.diamond = loadGlTexture(diamondAtlas);
    blockTextures.crafting = loadGlTexture(craftAtlas);
    blockTextures.gold = loadGlTexture(goldAtlas);
  }

  function loadGlTexture(image) {
    if (!gl) return null;
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // Nearest neighbor: 100% crisp Minecraft pixels
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  }

  function initWebGL() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 280 * dpr;
    canvas.height = 200 * dpr;
    canvas.style.width = "280px";
    canvas.style.height = "200px";

    gl = canvas.getContext("webgl", { antialias: false, alpha: true }) ||
         canvas.getContext("experimental-webgl", { antialias: false, alpha: true });
    if (!gl) return;

    // Compile Shaders
    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error("Vertex Shader Error:", gl.getShaderInfoLog(vs));
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("Fragment Shader Error:", gl.getShaderInfoLog(fs));
    }

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Program Link Error:", gl.getProgramInfoLog(shaderProgram));
    }
    gl.useProgram(shaderProgram);

    // 24 Vertices (Unit cube: -0.5 to 0.5)
    const positions = [
      // Front face (+Z)
      -0.5, -0.5,  0.5,   0.5, -0.5,  0.5,   0.5,  0.5,  0.5,  -0.5,  0.5,  0.5,
      // Back face (-Z)
       0.5, -0.5, -0.5,  -0.5, -0.5, -0.5,  -0.5,  0.5, -0.5,   0.5,  0.5, -0.5,
      // Top face (+Y)
      -0.5,  0.5,  0.5,   0.5,  0.5,  0.5,   0.5,  0.5, -0.5,  -0.5,  0.5, -0.5,
      // Bottom face (-Y)
      -0.5, -0.5, -0.5,   0.5, -0.5, -0.5,   0.5, -0.5,  0.5,  -0.5, -0.5,  0.5,
      // Right face (+X)
       0.5, -0.5,  0.5,   0.5, -0.5, -0.5,   0.5,  0.5, -0.5,   0.5,  0.5,  0.5,
      // Left face (-X)
      -0.5, -0.5, -0.5,  -0.5, -0.5,  0.5,  -0.5,  0.5,  0.5,  -0.5,  0.5, -0.5
    ];

    // UVs mapped to 16x48 atlas tiles
    const t0 = 0.0, t1 = 1.0 / 3.0;
    const s0 = 1.0 / 3.0, s1 = 2.0 / 3.0;
    const b0 = 2.0 / 3.0, b1 = 1.0;

    const uvs = [
      // Front (Side tile)
      0.0, s1,   1.0, s1,   1.0, s0,   0.0, s0,
      // Back (Side tile)
      0.0, s1,   1.0, s1,   1.0, s0,   0.0, s0,
      // Top (Top tile)
      0.0, t1,   1.0, t1,   1.0, t0,   0.0, t0,
      // Bottom (Bottom tile)
      0.0, b1,   1.0, b1,   1.0, b0,   0.0, b0,
      // Right (Side tile)
      0.0, s1,   1.0, s1,   1.0, s0,   0.0, s0,
      // Left (Side tile)
      0.0, s1,   1.0, s1,   1.0, s0,   0.0, s0
    ];

    const normals = [
      // Front
       0.0,  0.0,  1.0,   0.0,  0.0,  1.0,   0.0,  0.0,  1.0,   0.0,  0.0,  1.0,
      // Back
       0.0,  0.0, -1.0,   0.0,  0.0, -1.0,   0.0,  0.0, -1.0,   0.0,  0.0, -1.0,
      // Top
       0.0,  1.0,  0.0,   0.0,  1.0,  0.0,   0.0,  1.0,  0.0,   0.0,  1.0,  0.0,
      // Bottom
       0.0, -1.0,  0.0,   0.0, -1.0,  0.0,   0.0, -1.0,  0.0,   0.0, -1.0,  0.0,
      // Right
       1.0,  0.0,  0.0,   1.0,  0.0,  0.0,   1.0,  0.0,  0.0,   1.0,  0.0,  0.0,
      // Left
      -1.0,  0.0,  0.0,  -1.0,  0.0,  0.0,  -1.0,  0.0,  0.0,  -1.0,  0.0,  0.0
    ];

    const indices = [
       0,  1,  2,    0,  2,  3,  // Front
       4,  5,  6,    4,  6,  7,  // Back
       8,  9, 10,    8, 10, 11,  // Top
      12, 13, 14,   12, 14, 15,  // Bottom
      16, 17, 18,   16, 18, 19,  // Right
      20, 21, 22,   20, 22, 23   // Left
    ];

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    uvBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);

    indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    initBlockAtlases();

    // Enable 3D Depth Test & Backface Culling
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
  }

  function renderGl() {
    if (!gl || !shaderProgram) return;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Real 3D Perspective Projection (FOV 38 deg)
    const aspect = canvas.width / canvas.height;
    const proj = mat4Perspective((38 * Math.PI) / 180, aspect, 0.1, 100.0);
    const mv = mat4ModelView(rotX, rotY, punchScale * 0.95, bobY);
    const mvp = mat4Multiply(proj, mv);
    const normMat = mat3NormalFromMat4(mv);

    gl.useProgram(shaderProgram);

    // Uniforms
    const uMatrix = gl.getUniformLocation(shaderProgram, "uMatrix");
    gl.uniformMatrix4fv(uMatrix, false, mvp);

    const uNormalMatrix = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
    gl.uniformMatrix3fv(uNormalMatrix, false, new Float32Array(normMat));

    // Bind Attributes
    const aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    const aUv = gl.getAttribLocation(shaderProgram, "aUv");
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.vertexAttribPointer(aUv, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aUv);

    const aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aNormal);

    // Bind Texture
    const currentTex = blockTextures[currentBlock];
    if (currentTex) {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, currentTex);
      const uSampler = gl.getUniformLocation(shaderProgram, "uSampler");
      gl.uniform1i(uSampler, 0);
    }

    // Draw 36 indices (6 seamless 3D faces)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
  }

  // Pointer drag to spin in 3D
  function handlePointerDown(e) {
    isDragging = true;
    hasMoved = false;
    autoRotate = false;
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    startY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    startRotX = rotX;
    startRotY = rotY;
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    const dx = clientX - startX;
    const dy = clientY - startY;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMoved = true;
    }

    rotY = (startRotY + dx * 0.8) % 360;
    rotX = Math.max(-65, Math.min(65, startRotX + dy * 0.7));
  }

  function handlePointerUp() {
    isDragging = false;
    setTimeout(() => {
      autoRotate = true;
    }, 2800);
  }

  // Click to mine/punch
  function punchBlock() {
    if (hasMoved) return;
    sound.playCraft();
    punchScale = 0.90;

    const pId = particleIdCounter++;
    floatParticles.push({
      id: pId,
      text: "⛏️ +50 XP",
      color: blocks[currentBlock].accent,
      x: (Math.random() - 0.5) * 60,
      y: (Math.random() - 0.5) * 30
    });
    setTimeout(() => {
      floatParticles = floatParticles.filter((p) => p.id !== pId);
    }, 1100);

    confetti({
      particleCount: 24,
      spread: 50,
      origin: { y: 0.45 },
      colors: [blocks[currentBlock].accent, "#ffffff", "#333333"]
    });

    setTimeout(() => {
      punchScale = 1.0;
    }, 120);
  }

  // Main 60fps render loop
  function loop() {
    time += 0.035;
    // Gentle 3D floating bob
    bobY = Math.sin(time) * 0.045;

    if (autoRotate && !isDragging) {
      rotY = (rotY + 0.5) % 360;
    }
    renderGl();
    animFrame = requestAnimationFrame(loop);
  }

  onMount(() => {
    initWebGL();
    animFrame = requestAnimationFrame(loop);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  });
</script>

<div class="flex flex-col items-center justify-between w-full h-full select-none">
  
  <!-- Top 3D Block HUD Badge -->
  <div class="flex items-center justify-between w-full border-b border-black/60 pb-2 mb-1">
    <div class="flex items-center gap-1.5">
      <span class="w-2 h-2 bg-[#55FF55] animate-pulse"></span>
      <span class="font-pixel text-[10px] text-[#FFFF55]">
        {blocks[currentBlock].name}
      </span>
    </div>
    <span class="text-[9px] font-silkscreen px-1.5 py-0.5 mc-slot bg-[#040507] text-[#55FFFF]">
      {blocks[currentBlock].rarity}
    </span>
  </div>

  <!-- 3D Perspective Viewport (Full 3D Space) -->
  <div
    class="relative w-full h-48 sm:h-52 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none overflow-hidden"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onclick={punchBlock}
    onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); punchBlock(); } }}
    role="button"
    tabindex="0"
    aria-label="Interactive 3D Minecraft Block - Drag to spin 3D, click to punch"
  >
    <!-- True 3D Hardware Accelerated WebGL Canvas -->
    <canvas
      bind:this={canvas}
      class="block pointer-events-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
    ></canvas>

    <!-- Dynamic 3D Ground Shadow that scales with 3D height -->
    <div
      class="absolute bottom-2 rounded-full bg-black/55 blur-md pointer-events-none transition-transform"
      style="width: {120 * punchScale}px; height: 18px; transform: scale({1.0 - bobY * 2});"
    ></div>

    <!-- Floating punch text effects -->
    <div class="absolute inset-0 pointer-events-none flex items-center justify-center">
      {#each floatParticles as p (p.id)}
        <div
          class="absolute font-pixel text-[10px] animate-bounce mc-text-shadow"
          style="transform: translate({p.x}px, {p.y}px); color: {p.color};"
        >
          {p.text}
        </div>
      {/each}
    </div>
  </div>

  <!-- Instruction Tip -->
  <div class="text-[9px] font-pixel text-slate-400 my-1 text-center flex items-center gap-1.5 justify-center">
    <Pickaxe class="w-3 h-3 text-[#FFFF55]" />
    <span>DRAG TO ROTATE 3D &bull; CLICK TO MINE</span>
  </div>

  <!-- Quick Block Switcher Hotbar -->
  <div class="w-full pt-2 border-t border-black/60">
    <div class="flex items-center justify-center gap-2">
      {#each Object.entries(blocks) as [key, blk]}
        <button
          type="button"
          onclick={(e) => {
            e.stopPropagation();
            sound.playClick();
            currentBlock = key;
          }}
          class="w-8 h-8 mc-slot flex items-center justify-center transition-all cursor-pointer {currentBlock === key
            ? 'border-2 border-[#55FF55] bg-[#12141c] scale-110 shadow-[0_0_12px_#55FF55]/60'
            : 'bg-[#050608] hover:bg-[#0c0d12]'}"
          title="Switch to {blk.name}"
        >
          {#if key === 'tnt'}
            <span class="w-3.5 h-3.5 bg-[#FF5555] border border-black"></span>
          {:else if key === 'grass'}
            <span class="w-3.5 h-3.5 bg-[#55FF55] border border-black"></span>
          {:else if key === 'diamond'}
            <span class="w-3.5 h-3.5 bg-[#55FFFF] border border-black shadow-[0_0_4px_#55FFFF]"></span>
          {:else if key === 'crafting'}
            <span class="w-3.5 h-3.5 bg-[#b8860b] border border-black"></span>
          {:else if key === 'gold'}
            <span class="w-3.5 h-3.5 bg-[#FFFF55] border border-black shadow-[0_0_4px_#FFFF55]"></span>
          {/if}
        </button>
      {/each}
    </div>
  </div>

</div>
