// J.A.R.V.I.S. OS — STARK INDUSTRIES CORE REACT APPLICATION
const { useState, useEffect, useRef } = React;

/* ==========================================================================
   J.A.R.V.I.S. AUDIO SYNTHESIZER (REPULSOR BEAMS & SIRENS)
   ========================================================================== */
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const destination = ctx.destination;
    
    if (type === 'click') {
      // 1. STARK HOLO-HUD TAP CHIRP (High-tech holographic laser chirp)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1600, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(400, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);
      
      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.08);
      osc2.stop(ctx.currentTime + 0.08);
      
    } else if (type === 'charge') {
      // 2. SUIT THRUSTER / REPULSOR ENERGY WHINE (Rising charging hum)
      const osc = ctx.createOscillator();
      const oscSub = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.55);
      
      oscSub.type = 'sawtooth';
      oscSub.frequency.setValueAtTime(90, ctx.currentTime);
      oscSub.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.55);
      
      gainNode.gain.setValueAtTime(0.005, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.45);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      
      // Lowpass filter to smooth out sawtooth highs
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.55);
      
      osc.connect(gainNode);
      oscSub.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(destination);
      
      osc.start();
      oscSub.start();
      osc.stop(ctx.currentTime + 0.55);
      oscSub.stop(ctx.currentTime + 0.55);
      
    } else if (type === 'unlock') {
      // 3. IRON MAN SUIT-UP ARC REPULSOR BLAST (Charge-up + Blast Fire + Exhaust Whine)
      const now = ctx.currentTime;
      
      // A. Rising Charge Oscillator
      const oscCharge = ctx.createOscillator();
      const gainCharge = ctx.createGain();
      oscCharge.type = 'sine';
      oscCharge.frequency.setValueAtTime(200, now);
      oscCharge.frequency.exponentialRampToValueAtTime(1600, now + 0.25);
      
      gainCharge.gain.setValueAtTime(0.001, now);
      gainCharge.gain.linearRampToValueAtTime(0.06, now + 0.22);
      gainCharge.gain.setValueAtTime(0.001, now + 0.25);
      
      oscCharge.connect(gainCharge);
      gainCharge.connect(destination);
      oscCharge.start(now);
      oscCharge.stop(now + 0.25);
      
      // B. Main Fire Blast (Sudden heavy energy explosion)
      const oscBlast = ctx.createOscillator();
      const gainBlast = ctx.createGain();
      oscBlast.type = 'sawtooth';
      oscBlast.frequency.setValueAtTime(1600, now + 0.25);
      oscBlast.frequency.exponentialRampToValueAtTime(60, now + 0.85);
      
      gainBlast.gain.setValueAtTime(0.14, now + 0.25);
      gainBlast.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      
      // C. Blast Noise (Simulates rushing air and plasma combustion)
      const bufferSize = ctx.sampleRate * 0.6; // 0.6 seconds of noise
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      const noiseGain = ctx.createGain();
      
      // Bandpass filter to make the noise sound like high-tech exhaust vents
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(800, now + 0.25);
      noiseFilter.frequency.exponentialRampToValueAtTime(100, now + 0.85);
      
      noiseGain.gain.setValueAtTime(0.15, now + 0.25);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);
      
      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(destination);
      
      oscBlast.connect(gainBlast);
      gainBlast.connect(destination);
      
      oscBlast.start(now + 0.25);
      noiseNode.start(now + 0.25);
      
      oscBlast.stop(now + 0.85);
      noiseNode.stop(now + 0.85);
      
    } else if (type === 'alert') {
      // 4. COMBAT MODE / HAZARD WARNING ALARM (Jarvis Emergency Siren)
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.type = 'square';
      osc2.type = 'sawtooth';
      
      // Alternating warble sweep
      osc1.frequency.setValueAtTime(580, now);
      osc1.frequency.linearRampToValueAtTime(440, now + 0.15);
      osc1.frequency.linearRampToValueAtTime(580, now + 0.3);
      
      osc2.frequency.setValueAtTime(100, now);
      osc2.frequency.linearRampToValueAtTime(150, now + 0.3);
      
      gainNode.gain.setValueAtTime(0.04, now);
      gainNode.gain.linearRampToValueAtTime(0.04, now + 0.25);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(destination);
      
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    }
  } catch (e) {
    console.warn("Audio blocked by autoplay:", e);
  }
};

/* ==========================================================================
   COMPONENT: CANVAS GRID & REPULSOR PARTICLE ENGINE
   ========================================================================== */
function CanvasGrid({ isOverloaded }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const [telemetry, setTelemetry] = useState({ x: 45.289, y: 12.804, warp: 1.0 });

  useEffect(() => {
    // Fluctuating Stark HUD flight coordinate readouts
    const interval = setInterval(() => {
      setTelemetry({
        x: (45.289 + (Math.random() - 0.5) * 0.05).toFixed(4),
        y: (12.804 + (Math.random() - 0.5) * 0.05).toFixed(4),
        warp: (isOverloaded ? 4.5 + Math.random() : 1.0 + Math.random() * 0.1).toFixed(2)
      });
    }, 800);
    return () => clearInterval(interval);
  }, [isOverloaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 1. Twinkling Background Stars
    const starCount = 120;
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        twinklePhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.05 + Math.random() * 0.15,
        color: Math.random() > 0.85 
          ? (isOverloaded ? 'rgba(255, 0, 60, ' : 'rgba(0, 240, 255, ')
          : 'rgba(255, 255, 255, '
      });
    }

    // 2. Mini Meteors / Rocky Asteroids
    const meteorCount = 15;
    const meteors = [];
    for (let i = 0; i < meteorCount; i++) {
      meteors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1.2,
        speedX: -(0.4 + Math.random() * 0.8), // Drifts diagonally left
        speedY: (0.2 + Math.random() * 0.4),  // Drifts diagonally down
        tailLength: 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
        color: isOverloaded ? 'rgba(255, 85, 0, ' : 'rgba(243, 156, 18, ' // Bronze/Gold Stark rock colors
      });
    }

    // 3. High-Speed Shooting Stars
    const shootingStars = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * canvas.width * 1.2,
          y: -50,
          vx: -(4 + Math.random() * 8),  // Extremely fast left-zip
          vy: (3 + Math.random() * 6),   // Extremely fast down-zip
          size: Math.random() * 2 + 1,
          length: 80 + Math.random() * 120,
          life: 1.0,
          decay: 0.015 + Math.random() * 0.025,
          color: isOverloaded ? 'rgba(255, 0, 60, ' : 'rgba(0, 240, 255, '
        });
      }
    };

    // Spawn shooting star every 3.5 seconds
    const spawnInterval = setInterval(spawnShootingStar, 3500);

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const speedMultiplier = isOverloaded ? 2.5 : 1.0;

      // 1. Draw Twinkling Background Stars (Parallax Drift)
      stars.forEach((s) => {
        // Drift stars diagonally
        s.x -= s.driftSpeed * speedMultiplier;
        s.y += (s.driftSpeed * 0.5) * speedMultiplier;
        
        // Wrap around borders
        if (s.x < 0) s.x = width;
        if (s.y > height) s.y = 0;

        // Twinkle phase calculations
        s.twinklePhase += s.twinkleSpeed;
        const currentOpacity = 0.35 + Math.sin(s.twinklePhase) * 0.55;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color}${currentOpacity})`;
        ctx.fill();
      });

      // 2. Draw Mini Meteors / Rocky Asteroids with Trails
      meteors.forEach((m) => {
        m.x += m.speedX * speedMultiplier;
        m.y += m.speedY * speedMultiplier;

        // Wrap around boundaries
        if (m.x < -50) m.x = width + 50;
        if (m.y > height + 50) m.y = -50;

        // Draw meteor trail
        const gradient = ctx.createLinearGradient(
          m.x, m.y, 
          m.x - (m.speedX * m.tailLength), 
          m.y - (m.speedY * m.tailLength)
        );
        gradient.addColorStop(0, `${m.color}${m.opacity})`);
        gradient.addColorStop(1, `${m.color}0)`);

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - (m.speedX * m.tailLength), m.y - (m.speedY * m.tailLength));
        ctx.strokeStyle = gradient;
        ctx.lineWidth = m.size * 0.5;
        ctx.stroke();

        // Draw meteor rocky head core
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
        ctx.fillStyle = isOverloaded ? 'rgba(255, 85, 0, 0.85)' : 'rgba(243, 156, 18, 0.85)';
        ctx.shadowColor = isOverloaded ? '#ff003c' : '#f39c12';
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      });

      // 3. Draw High-Speed Shooting Stars with glowing trails
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += ss.vx * speedMultiplier;
        ss.y += ss.vy * speedMultiplier;
        ss.life -= ss.decay;

        if (ss.life <= 0 || ss.x < -100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        // Draw bright fading energy tail
        const speedVal = Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
        const trailX = ss.x - (ss.vx / speedVal) * ss.length;
        const trailY = ss.y - (ss.vy / speedVal) * ss.length;

        const gradient = ctx.createLinearGradient(ss.x, ss.y, trailX, trailY);
        gradient.addColorStop(0, `${ss.color}${ss.life * 0.85})`);
        gradient.addColorStop(0.3, `${ss.color}${ss.life * 0.4})`);
        gradient.addColorStop(1, `${ss.color}0)`);

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(trailX, trailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = ss.size * ss.life;
        ctx.stroke();

        // Star glowing head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.size * ss.life * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = isOverloaded ? '#ff3300' : '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw Stark Visor HUD Central Target Overlay
      const centerX = width / 2;
      const centerY = height / 2;
      ctx.strokeStyle = isOverloaded ? 'rgba(255, 0, 60, 0.055)' : 'rgba(0, 240, 255, 0.055)';
      ctx.lineWidth = 0.5;

      ctx.beginPath();
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.setLineDash([5, 15]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.strokeStyle = isOverloaded ? 'rgba(255, 0, 60, 0.18)' : 'rgba(0, 240, 255, 0.18)';
      ctx.lineWidth = 1;
      
      // Targeting crosshair compass ticks
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 20); ctx.lineTo(centerX, centerY - 10);
      ctx.moveTo(centerX, centerY + 10); ctx.lineTo(centerX, centerY + 20);
      ctx.moveTo(centerX - 20, centerY); ctx.lineTo(centerX - 10, centerY);
      ctx.moveTo(centerX + 10, centerY); ctx.lineTo(centerX + 20, centerY);
      ctx.stroke();

      // 5. Telemetry coordinate readouts in margins
      ctx.fillStyle = isOverloaded ? 'rgba(255, 0, 60, 0.35)' : 'rgba(0, 240, 255, 0.35)';
      ctx.font = '9px "Share Tech Mono"';
      ctx.fillText(`WARP_FACTOR: ${telemetry.warp}x`, 40, height - 40);
      ctx.fillText(`NAV_SYS: ALT-X ${telemetry.x} | LAT-Y ${telemetry.y}`, 40, height - 25);
      
      if (isOverloaded) {
        ctx.fillStyle = 'rgba(255, 0, 60, 0.5)';
        ctx.font = '10px "Orbitron"';
        ctx.fillText("COMBAT INTERFACE: ACTIVE", width - 210, height - 25);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearInterval(spawnInterval);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOverloaded, telemetry]);

  return <canvas ref={canvasRef} className="canvas-background" />;
}

/* ==========================================================================
   COMPONENT: SUIT ENTRANCE ARC REACTOR PORTAL (OUTSIDE THE SUIT)
   ========================================================================== */
function SuitUpEntrance({ onSuitUp }) {
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    playSound('charge');
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  const handleCoreClick = () => {
    playSound('unlock');
    onSuitUp();
  };

  return (
    <div className="suit-entrance-container">
      {/* Sleek outer Stark coordinate tags */}
      <div className="suit-entrance-hud-box">
        <span className="entrance-corner-label">STARK_IND_SYS // MK85</span>
        <span className="entrance-corner-label">COGNITIVE_GRID: ARMED</span>
      </div>

      {/* Main Core Reactor Button */}
      <div 
        className="arc-reactor-portal"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCoreClick}
      >
        <div className="reactor-ring-outer"></div>
        <div className="reactor-ring-inner"></div>
        
        <div className="reactor-coils-container">
          <div className="reactor-coil coil-1"></div>
          <div className="reactor-coil coil-2"></div>
          <div className="reactor-coil coil-3"></div>
          <div className="reactor-coil coil-4"></div>
          <div className="reactor-coil coil-5"></div>
          <div className="reactor-coil coil-6"></div>
          <div className="reactor-coil coil-7"></div>
          <div className="reactor-coil coil-8"></div>
          <div className="reactor-coil coil-9"></div>
          <div className="reactor-coil coil-10"></div>
        </div>

        <div className="reactor-core-repulsor"></div>
      </div>

      <div className="arc-reactor-prompt-text">
        {hovering ? 'INITIATING THREADS...' : 'ENGAGE ARC REACTOR'}
      </div>
      <div className="arc-reactor-subtext">
        PRESS CORE TO SECURE SUIT-UP LINK
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: IMMERSIVE HUD NAV HEADER
   ========================================================================== */
function Header({ isOverloaded }) {
  const [timeStr, setTimeStr] = useState('');
  const [fakeCpu, setFakeCpu] = useState(8);

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const datePart = d.toISOString().split('T')[0];
      const timePart = d.toLocaleTimeString();
      setTimeStr(`${datePart} | ${timePart} UTC`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const cpuInterval = setInterval(() => {
      setFakeCpu(Math.floor(Math.random() * (isOverloaded ? 45 : 12)) + (isOverloaded ? 65 : 8));
    }, 2200);

    return () => {
      clearInterval(interval);
      clearInterval(cpuInterval);
    };
  }, [isOverloaded]);

  const handleNavClick = (section) => {
    playSound('click');
    alert(`J.A.R.V.I.S.: [${section.toUpperCase()}] suit telemetry diagnostic active. SIR.`);
  };

  return (
    <header className="hud-header">
      <div className="hud-logo">
        <span>STARK</span>_KISHORE
        <span className="hud-logo-aux">JARVIS.OS</span>
      </div>

      <nav>
        <ul className="hud-nav-links">
          <li className="hud-nav-item active"><a href="#" onClick={() => handleNavClick('core')}>CORE HUD</a></li>
          <li className="hud-nav-item"><a href="#" onClick={() => handleNavClick('specs')}>DIAGNOSTICS</a></li>
          <li className="hud-nav-item"><a href="#" onClick={() => handleNavClick('loadout')}>LOADOUT</a></li>
          <li className="hud-nav-item"><a href="#" onClick={() => handleNavClick('link')}>UPLINK</a></li>
        </ul>
      </nav>

      <div className="hud-system-specs">
        <div className="spec-item">
          <span className="spec-indicator"></span>
          <span>SUIT_TEMP: {isOverloaded ? '94.2°C [WARNING]' : '36.8°C [STABLE]'}</span>
        </div>
        <div className="spec-item">
          <span>ARC_POWER: {isOverloaded ? '240% [OVERDRIVE]' : '100% [OPTIMAL]'}</span>
        </div>
        <div className="spec-item">
          <span>CPU_CORE: {fakeCpu}%</span>
        </div>
        <div className="spec-item" style={{ color: 'var(--stark-gold)' }}>
          <span>{timeStr}</span>
        </div>
      </div>
    </header>
  );
}

/* ==========================================================================
   COMPONENT: HERO / STARK COMMAND CENTER
   ========================================================================== */
function Hero({ isOverloaded, toggleOverload }) {
  const [profileText, setProfileText] = useState('');
  const starkProfile = [
    "J.A.R.V.I.S.@STARK_NET:~$ ./armor_diagnostics.sh",
    "[EXTRACTING PILOT BIOMETRICS AND TELEMETRY...]",
    "",
    "PILOT NAME: KISHORE",
    "SUIT DESIGNATION: MARK 85 HYBRID NANOTECH DEPLOYMENT",
    "PRIMARY ROLE: FULL-STACK ENGINEER & COGNITIVE SOFTWARE ARCHITECT",
    "SYSTEM LOADOUT: REACT 18+, ADVANCED JAVASCRIPT, SHADERS, DATA STACKS",
    "ENERGY SOURCE: NEW ELEMENT ARC REACTOR CELL (VIBRANIUM FUSED)",
    "MISSION PROFILE: SAFEGUARDING THE INTERNET WITH BEAUTIFUL FUTURISTIC CODE",
    "SUIT CODES: ACTIVE / STABLE / J.A.R.V.I.S. INTEL VISOR SYSTEMS ONLINE"
  ];

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let buffer = '';
    let typeTimer;

    const typeWriter = () => {
      if (currentLine < starkProfile.length) {
        const line = starkProfile[currentLine];
        
        if (currentChar < line.length) {
          buffer += line[currentChar];
          setProfileText(buffer + '\n');
          currentChar++;
          typeTimer = setTimeout(typeWriter, 10);
        } else {
          buffer += '\n';
          setProfileText(buffer);
          currentLine++;
          currentChar = 0;
          typeTimer = setTimeout(typeWriter, 80);
        }
      }
    };

    typeTimer = setTimeout(typeWriter, 400);
    return () => clearTimeout(typeTimer);
  }, []);

  const handleActionClick = (btnName) => {
    playSound('click');
    alert(`J.A.R.V.I.S.: Deploying Stark system telemetry: [${btnName}]. Blueprint unlocked.`);
  };

  const handleOverloadClick = () => {
    playSound('alert');
    toggleOverload();
  };

  return (
    <section className="hero-container">
      <div className="hud-panel command-console-panel">
        <div className="decal-corner decal-tl"></div>
        <div className="decal-corner decal-tr"></div>
        <div className="decal-corner decal-bl"></div>
        <div className="decal-corner decal-br"></div>
        
        <div className="console-header">
          <div className="console-title">
            <span className="spec-indicator"></span>
            <span>J.A.R.V.I.S. INTERFACE HOLOGRAPHICS</span>
          </div>
          <span className="console-grid-decal" style={{ color: 'var(--color-core)' }}>STARK_MARK_85</span>
        </div>

        <div className="console-body">
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>
            {profileText}
            <span className="cursor-blink"></span>
          </pre>
        </div>

        <div className="console-actions">
          <button className="cyber-btn" onClick={() => handleActionClick('armor_diagnostics')}>
            SUIT SPECS
          </button>
          <button className="cyber-btn" onClick={() => handleActionClick('repulsor_uplink')}>
            REPULSOR LINK
          </button>
        </div>
      </div>

      <div className="avatar-chassis-panel">
        <div className="overload-telemetry-trigger">
          <button className="overload-btn" onClick={handleOverloadClick}>
            {isOverloaded ? 'SAFE SYSTEM MODE' : 'HOUSE PARTY PROTOCOL'}
          </button>
          <span className="overload-status-text">
            {isOverloaded ? 'WARNING: EMERGENCY WEAPONS SHIELD DEPLOYED' : 'SUIT INTERFACES: SHIELDS SECURE'}
          </span>
        </div>

        <div className="avatar-shield-ring">
          <div className="reactor-core-frame">
            <img 
              src="./assets/arc_reactor.png" 
              alt="Stark Arc Reactor" 
              className="reactor-core-image" 
            />
            <div className="reactor-status-hud glow-text">
              {isOverloaded ? 'COMBAT OVERDRIVE' : 'STARK ARC stable'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   MAIN SYSTEM APP COMPONENT
   ========================================================================== */
function App() {
  const [viewState, setViewState] = useState('entrance'); // 'entrance', 'suit_up', 'active'
  const [overloaded, setOverloaded] = useState(false);
  const [bootLogs, setBootLogs] = useState([]);

  // J.A.R.V.I.S. fast compile logs inside visor
  const STARK_VISOR_LOGS = [
    "DIAGNOSTICS: STARK INDUSTRIES OS BOOT...",
    "ARMOR: MARK 85 NANOTECH MOLECULAR LINKING... [OK]",
    "POWER: NEW ELEMENT REACTOR CELLS INITIALIZED... [100%]",
    "THRUSTERS: FLIGHT SYSTEMS CALIBRATED... [OK]",
    "HUD: VISOR GLASS COATINGS SECURED... [OK]",
    "J.A.R.V.I.S.: WELCOME BACK, SIR. CALIBRATION COMPLETE."
  ];

  const triggerSuitUpSequence = () => {
    setViewState('suit_up');
    
    // Animate diagnostic logs fast on screen inside armor shells
    let logIndex = 0;
    const interval = setInterval(() => {
      if (logIndex < STARK_VISOR_LOGS.length) {
        setBootLogs(prev => [...prev, STARK_VISOR_LOGS[logIndex]]);
        logIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setViewState('active');
        }, 800); // Glitch completes, visor HUD fully fades in
      }
    }, 180);
  };

  const toggleOverload = () => {
    setOverloaded(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('overloaded');
      } else {
        document.body.classList.remove('overloaded');
      }
      return next;
    });
  };

  return (
    <div className="portfolio-app-root">
      <div className="scanline"></div>
      <div className="vignette"></div>
      
      <CanvasGrid isOverloaded={overloaded} />

      {/* 1. Outside the suit — Beautiful Central Arc Reactor Button */}
      {viewState === 'entrance' && (
        <SuitUpEntrance onSuitUp={triggerSuitUpSequence} />
      )}

      {/* 2. Transition Suit-Up Animation (Sliding Armor Panels) */}
      {(viewState === 'suit_up' || viewState === 'entrance' && false) && (
        <div className={`armor-assembly-overlay ${viewState === 'suit_up' ? 'active' : ''}`}>
          <div className="armor-plate armor-plate-left"></div>
          <div className="armor-plate armor-plate-right"></div>
          <div className="armor-static-glitch">
            <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', letterSpacing: '2px', lineHeight: '2' }}>
              {bootLogs.map((log, i) => (
                <div key={i}>&gt; {log}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Inside the Visor HUD (Main active command center) */}
      {viewState === 'active' && (
        <div className="fade-in-up" style={{ animationDuration: '0.8s' }}>
          <Header isOverloaded={overloaded} />
          <Hero isOverloaded={overloaded} toggleOverload={toggleOverload} />
        </div>
      )}
    </div>
  );
}

// Mount J.A.R.V.I.S. HUD
const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(<App />);
}
