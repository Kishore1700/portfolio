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
function Header({ isOverloaded, activeTab, setActiveTab }) {
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

  const handleNavClick = (tabName) => {
    playSound('click');
    setActiveTab(tabName);
  };

  return (
    <header className="hud-header">
      <div className="hud-logo">
        <span>STARK</span>_KISHORE
        <span className="hud-logo-aux">JARVIS.OS</span>
      </div>

      <nav>
        <ul className="hud-nav-links">
          <li className={`hud-nav-item ${activeTab === 'core' ? 'active' : ''}`}>
            <a href="#" onClick={() => handleNavClick('core')}>CORE HUD</a>
          </li>
          <li className={`hud-nav-item ${activeTab === 'diagnostics' ? 'active' : ''}`}>
            <a href="#" onClick={() => handleNavClick('diagnostics')}>DIAGNOSTICS</a>
          </li>
          <li className={`hud-nav-item ${activeTab === 'loadout' ? 'active' : ''}`}>
            <a href="#" onClick={() => handleNavClick('loadout')}>LOADOUT</a>
          </li>
          <li className={`hud-nav-item ${activeTab === 'link' ? 'active' : ''}`}>
            <a href="#" onClick={() => handleNavClick('link')}>UPLINK</a>
          </li>
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
function Hero({ isOverloaded, toggleOverload, setActiveTab }) {
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

  const handleActionClick = (tabName) => {
    playSound('click');
    setActiveTab(tabName);
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
          <button className="cyber-btn" onClick={() => handleActionClick('diagnostics')}>
            SUIT SPECS
          </button>
          <button className="cyber-btn" onClick={() => handleActionClick('link')}>
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
   COMPONENT: CIRCULAR TELEMETRY GAUGE
   ========================================================================== */
function TelemetryGauge({ value, label }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="telemetry-gauge-container">
      <svg className="gauge-svg">
        <circle className="gauge-bg-circle" cx="32.5" cy="32.5" r={radius} />
        <circle 
          className="gauge-fill-circle" 
          cx="32.5" 
          cy="32.5" 
          r={radius} 
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <text className="gauge-text" x="32.5" y="36.5">{value}%</text>
      </svg>
      <span className="gauge-label">{label}</span>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: HOLOGRAPHIC BLUEPRINT SCHEMATIC VIEWER
   ========================================================================== */
function HolographicViewer({ activeMilestone, isOverloaded }) {
  return (
    <div className="holo-viewer-panel">
      <div className="holo-projection-cone"></div>
      <div className="holo-display-deck">
        <div className="holo-hologram-glow">
          <div className="holo-schematic-wrapper">
            {activeMilestone === 'm1' && (
              /* MARK I Blueprint: Basic Logic/School Grid */
              <svg className="holo-schematic-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-core)" strokeWidth="1" strokeDasharray="3, 5" className="schematic-rotating-ring" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="var(--color-core)" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="var(--color-core)" strokeWidth="0.5" />
                <rect x="35" y="35" width="30" height="30" fill="none" stroke="var(--color-core)" strokeWidth="1.5" className="schematic-glowing-path" />
                <circle cx="50" cy="50" r="8" fill="none" stroke="var(--color-aux)" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" className="schematic-core-node" />
              </svg>
            )}
            
            {activeMilestone === 'm2' && (
              /* MARK II Blueprint: High School Process Node */
              <svg className="holo-schematic-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-core)" strokeWidth="1" />
                <path d="M20,50 L40,50 L50,30 L60,70 L70,50 L80,50" fill="none" stroke="var(--color-core)" strokeWidth="1.5" className="schematic-glowing-path" />
                <circle cx="20" cy="50" r="3" fill="var(--color-aux)" />
                <circle cx="80" cy="50" r="3" fill="var(--color-aux)" />
                <circle cx="50" cy="30" r="4" className="schematic-core-node" />
                <circle cx="60" cy="70" r="4" className="schematic-core-node" />
                <line x1="50" y1="10" x2="50" y2="25" stroke="var(--color-core)" strokeWidth="1" strokeDasharray="2, 2" />
                <line x1="50" y1="75" x2="50" y2="90" stroke="var(--color-core)" strokeWidth="1" strokeDasharray="2, 2" />
              </svg>
            )}

            {activeMilestone === 'm3' && (
              /* MARK III Blueprint: Engineering Robotic/Arm Blueprint */
              <svg className="holo-schematic-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-core)" strokeWidth="0.5" />
                <polygon points="50,15 80,35 80,65 50,85 20,65 20,35" fill="none" stroke="var(--color-core)" strokeWidth="1" className="schematic-rotating-ring" />
                <path d="M50,15 L50,85 M20,35 L80,65 M20,65 L80,35" stroke="var(--color-core)" strokeWidth="0.5" strokeDasharray="2, 2" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="var(--color-core)" strokeWidth="1.5" className="schematic-glowing-path" />
                <circle cx="50" cy="50" r="5" className="schematic-core-node" />
                <circle cx="50" cy="15" r="3" fill="var(--color-aux)" />
                <circle cx="50" cy="85" r="3" fill="var(--color-aux)" />
              </svg>
            )}

            {activeMilestone === 'm4' && (
              /* MARK IV Blueprint: Neural AI / Full-Stack Network */
              <svg className="holo-schematic-svg" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="25" fill="none" stroke="var(--color-core)" strokeWidth="1" className="schematic-rotating-ring" />
                <g className="schematic-rotating-ring" style={{ animationDuration: '10s' }}>
                  <circle cx="50" cy="15" r="4" fill="var(--color-core)" />
                  <circle cx="85" cy="50" r="4" fill="var(--color-core)" />
                  <circle cx="50" cy="85" r="4" fill="var(--color-core)" />
                  <circle cx="15" cy="50" r="4" fill="var(--color-core)" />
                  
                  <line x1="50" y1="15" x2="85" y2="50" stroke="var(--color-core)" strokeWidth="0.75" />
                  <line x1="85" y1="50" x2="50" y2="85" stroke="var(--color-core)" strokeWidth="0.75" />
                  <line x1="50" y1="85" x2="15" y2="50" stroke="var(--color-core)" strokeWidth="0.75" />
                  <line x1="15" y1="50" x2="50" y2="15" stroke="var(--color-core)" strokeWidth="0.75" />
                </g>
                <circle cx="50" cy="50" r="10" fill="none" stroke="var(--color-aux)" strokeWidth="1.5" className="schematic-glowing-path" />
                <circle cx="50" cy="50" r="4" className="schematic-core-node" />
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className="holo-status-label glow-text">
        {isOverloaded ? 'HUD_WARN: OVERLOAD ACTIVE' : 'HOLO_PROJ: HUD_DECK'}
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: DIAGNOSTICS TIMELINE PANEL (EDUCATION)
   ========================================================================== */
function Diagnostics({ isOverloaded }) {
  const [activeM, setActiveM] = useState('m4');

  const milestones = {
    m1: {
      mark: "MARK I: FOUNDATION",
      title: "Primary & Secondary Schooling",
      year: "2010 - 2020",
      description: "Diagnostic report: System initiation. Configured early logical matrices including core Mathematics, General Physics, and Chemistry. Engaged initial software coding loops, creating simple logic scripts. Core cognitive circuits successfully stabilized.",
      logic: 70,
      tech: 25,
      creative: 40
    },
    m2: {
      mark: "MARK II: CORE CALIBRATION",
      title: "Higher Secondary College",
      year: "2020 - 2022",
      description: "Diagnostic report: Logic calibration. Loaded Advanced Mathematics, Particle Physics, and Digital Circuit blueprints. Deployed first structured software loadouts utilizing C++ compilers, object-oriented concepts, and core algorithms.",
      logic: 82,
      tech: 50,
      creative: 45
    },
    m3: {
      mark: "MARK III: ENGINEERING DESIGN",
      title: "Bachelor of Computer Science Engineering",
      year: "2022 - 2026",
      description: "Diagnostic report: High-tech mechatronics. Initialized Computer Science core engineering modules. Successfully installed Database systems (SQL), Unix architectures, Cloud clusters, Web structures (HTML5/CSS3), and Microcontrollers.",
      logic: 90,
      tech: 85,
      creative: 75
    },
    m4: {
      mark: "MARK IV: AUTONOMOUS OVERDRIVE",
      title: "Advanced Full-Stack & AI Systems",
      year: "2026 - Present",
      description: "Diagnostic report: Suit peak performance. Self-compiled React 18 frontend configurations, Node.js servers, Web Audio, and Canvas visual graphics. Engineered autonomous pipeline scripts, integrating neural APIs and high-end UI dashboards.",
      logic: 96,
      tech: 94,
      creative: 92
    }
  };

  const handleMilestoneClick = (id) => {
    playSound('charge');
    setActiveM(id);
    document.body.classList.add('star-accelerate');
    setTimeout(() => {
      document.body.classList.remove('star-accelerate');
    }, 600);
  };

  const current = milestones[activeM];

  return (
    <div className="hud-page-container">
      <div className="hud-panel diagnostics-container">
        <div className="decal-corner decal-tl"></div>
        <div className="decal-corner decal-tr"></div>
        <div className="decal-corner decal-bl"></div>
        <div className="decal-corner decal-br"></div>
        
        {/* Left Side: Milestones List */}
        <div className="milestones-sidebar">
          <div className="sidebar-title-row">
            <span className="glow-text" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-header)', letterSpacing: '2px', fontWeight: 800 }}>
              &gt; SUIT UPGRADES (LEARNING MILESTONES)
            </span>
            <span className="hud-logo-aux" style={{ fontSize: '0.55rem' }}>JARVIS.UPD</span>
          </div>

          <div className="milestones-list">
            {Object.keys(milestones).map((key) => (
              <div 
                key={key} 
                className={`milestone-item ${activeM === key ? 'active' : ''}`}
                onClick={() => handleMilestoneClick(key)}
              >
                <div className="milestone-meta">
                  <span className="milestone-mark">{milestones[key].mark}</span>
                  <span className="milestone-title">{milestones[key].title}</span>
                </div>
                <span className="milestone-year">{milestones[key].year}</span>
              </div>
            ))}
          </div>

          {/* Report Description */}
          <div className="milestone-details-box">
            <span>&gt; MODULE: {current.mark}</span>
            <span>&gt; DURATION: {current.year}</span>
            <div style={{ marginTop: '5px', color: '#a0afc2' }}>{current.description}</div>
          </div>

          {/* Active Gauges */}
          <div className="gauges-row">
            <TelemetryGauge value={current.logic} label="Logic Threads" />
            <TelemetryGauge value={current.tech} label="Tech Stack" />
            <TelemetryGauge value={current.creative} label="Visor Design" />
          </div>
        </div>

        {/* Right Side: Hologram projection */}
        <HolographicViewer activeMilestone={activeM} isOverloaded={isOverloaded} />
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: LOADOUT PANEL (SKILLS BATTERY MATRIX)
   ========================================================================== */
function Loadout() {
  const [selectedCategory, setSelectedCategory] = useState('front');

  const categories = {
    front: {
      name: "REPULSORS: FRONTEND WEAPONS",
      skills: [
        { name: "React / React Hooks", level: 95 },
        { name: "Modern Javascript (ES6+)", level: 92 },
        { name: "HTML5 / Canvas Shaders", level: 88 },
        { name: "CSS3 / Glassmorphism", level: 90 },
        { name: "htm / Browser-Native Modules", level: 85 }
      ]
    },
    back: {
      name: "THRUSTERS: BACKEND ENGINE",
      skills: [
        { name: "Node.js / Express Servers", level: 88 },
        { name: "RESTful Web APIs", level: 90 },
        { name: "Relational SQL Databases", level: 85 },
        { name: "Server Configuration", level: 80 }
      ]
    },
    system: {
      name: "COGNITIVE: SYSTEM LOADOUT",
      skills: [
        { name: "Git / Version Control", level: 92 },
        { name: "Babel Compilers", level: 84 },
        { name: "Web Audio Synthesizer", level: 86 },
        { name: "AI / Neural APIs", level: 80 }
      ]
    }
  };

  const current = categories[selectedCategory];

  return (
    <div className="hud-page-container">
      <div className="hud-panel diagnostics-container" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="decal-corner decal-tl"></div>
        <div className="decal-corner decal-tr"></div>
        <div className="decal-corner decal-bl"></div>
        <div className="decal-corner decal-br"></div>

        {/* Categories selector */}
        <div className="milestones-sidebar">
          <div className="sidebar-title-row">
            <span className="glow-text" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-header)', letterSpacing: '2px', fontWeight: 800 }}>
              &gt; SUIT WEAPONS CONFIG (SKILL MATRIX)
            </span>
          </div>

          <div className="milestones-list" style={{ flexGrow: 0 }}>
            <div className={`milestone-item ${selectedCategory === 'front' ? 'active' : ''}`} onClick={() => setSelectedCategory('front')}>
              <div className="milestone-meta">
                <span className="milestone-mark">REPULSORS</span>
                <span className="milestone-title">Frontend Visual weapons</span>
              </div>
            </div>
            <div className={`milestone-item ${selectedCategory === 'back' ? 'active' : ''}`} onClick={() => setSelectedCategory('back')}>
              <div className="milestone-meta">
                <span className="milestone-mark">THRUSTERS</span>
                <span className="milestone-title">Backend Stabilizing engines</span>
              </div>
            </div>
            <div className={`milestone-item ${selectedCategory === 'system' ? 'active' : ''}`} onClick={() => setSelectedCategory('system')}>
              <div className="milestone-meta">
                <span className="milestone-mark">COGNITIVE</span>
                <span className="milestone-title">Integrated systems loadout</span>
              </div>
            </div>
          </div>

          <div className="milestone-details-box" style={{ minHeight: '180px' }}>
            <span>&gt; CATEGORY: {current.name}</span>
            <span style={{ color: '#a0afc2', marginTop: '10px' }}>
              J.A.R.V.I.S. suit loadout maps Kishore's computational capabilities as dynamic system upgrades. Select weapon sets to check caliber metrics.
            </span>
          </div>
        </div>

        {/* Skill progress matrix */}
        <div className="milestones-sidebar" style={{ borderLeft: '1px solid rgba(0, 240, 255, 0.08)' }}>
          <div className="sidebar-title-row">
            <span className="glow-text" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-header)', letterSpacing: '2px', fontWeight: 800 }}>
              &gt; DIAGNOSTICS MATRIX
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', flexGrow: 1, justify: 'center' }}>
            {current.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justify: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <span>{skill.name}</span>
                  <span style={{ color: 'var(--color-core)' }}>{skill.level}% POWER</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(var(--color-core-hsl), 0.15)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ width: `${skill.level}%`, height: '100%', background: 'linear-gradient(90deg, var(--color-aux), var(--color-core))', boxShadow: '0 0 10px var(--color-core)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   COMPONENT: UPLINK TELEMETRY FORM (CONTACT)
   ========================================================================== */
function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', telemetry: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'sent'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.telemetry) return;
    
    playSound('unlock');
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', telemetry: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 2000);
  };

  return (
    <div className="hud-page-container">
      <div className="hud-panel diagnostics-container" style={{ gridTemplateColumns: '1.2fr 0.8fr' }}>
        <div className="decal-corner decal-tl"></div>
        <div className="decal-corner decal-tr"></div>
        <div className="decal-corner decal-bl"></div>
        <div className="decal-corner decal-br"></div>

        {/* Message input console */}
        <div className="milestones-sidebar">
          <div className="sidebar-title-row">
            <span className="glow-text" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-header)', letterSpacing: '2px', fontWeight: 800 }}>
              &gt; TRANSMIT UPLINK TELEMETRY
            </span>
          </div>

          <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1, justify: 'center' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-core)' }}>PILOT_NAME</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="EX: TONY STARK"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '10px 15px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-core)' }}>UPLINK_EMAIL</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="EX: TONY@STARK.COM"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '10px 15px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-core)' }}>TELEMETRY_LOG (MESSAGE)</label>
              <textarea 
                name="telemetry"
                value={formData.telemetry}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="TYPE TRANSMISSION LOG TO KISHORE..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0, 240, 255, 0.15)', padding: '10px 15px', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', outline: 'none', resize: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              className="cyber-btn" 
              disabled={status === 'sending'} 
              style={{ alignSelf: 'flex-start', borderStyle: 'solid' }}
            >
              {status === 'sending' ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
            </button>
          </form>
        </div>

        {/* Transmission log status */}
        <div className="milestones-sidebar" style={{ borderLeft: '1px solid rgba(0, 240, 255, 0.08)' }}>
          <div className="sidebar-title-row">
            <span className="glow-text" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-header)', letterSpacing: '2px', fontWeight: 800 }}>
              &gt; J.A.R.V.I.S. ANTENNA
            </span>
          </div>

          <div className="milestone-details-box" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justify: 'center', alignItems: 'center', textAlign: 'center', gap: '15px' }}>
            {status === 'idle' && (
              <>
                <div className="spec-indicator" style={{ width: '12px', height: '12px' }}></div>
                <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.8rem', letterSpacing: '1px' }}>ANTENNA READY</span>
                <span style={{ fontSize: '0.7rem', color: '#8fa0b5' }}>WARNING: DO NOT TRANSMIT CLASSIFIED DATA. SECURE ENCRYPTION DETECTED.</span>
              </>
            )}
            
            {status === 'sending' && (
              <>
                <div style={{ width: '30px', height: '30px', border: '3px solid rgba(0,240,255,0.1)', borderTopColor: 'var(--color-core)', borderRadius: '50%', animation: 'spin-clockwise 1s linear infinite' }}></div>
                <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.8rem', letterSpacing: '1px', color: 'var(--color-core)' }}>CHARGING BEAMS...</span>
                <span style={{ fontSize: '0.7rem', color: '#8fa0b5' }}>ENCRYPTING TELEMETRY DATA PACKAGE...</span>
              </>
            )}

            {status === 'sent' && (
              <>
                <div className="spec-indicator" style={{ width: '12px', height: '12px', backgroundColor: '#2ecc71', boxShadow: '0 0 10px #2ecc71' }}></div>
                <span style={{ fontFamily: 'var(--font-header)', fontSize: '0.8rem', letterSpacing: '1px', color: '#2ecc71' }}>TRANSMISSION COMPLETE</span>
                <span style={{ fontSize: '0.7rem', color: '#8fa0b5' }}>Sir, the telemetry log has been successfully dispatched to Kishore's network core.</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN SYSTEM APP COMPONENT
   ========================================================================== */
function App() {
  const [viewState, setViewState] = useState('entrance'); // 'entrance', 'suit_up', 'active'
  const [activeTab, setActiveTab] = useState('core'); // 'core', 'diagnostics', 'loadout', 'link'
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
      {viewState === 'suit_up' && (
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
        <div>
          <Header isOverloaded={overloaded} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          {activeTab === 'core' && (
            <div className="fade-in-up" style={{ animationDuration: '0.8s' }}>
              <Hero isOverloaded={overloaded} toggleOverload={toggleOverload} setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === 'diagnostics' && (
            <Diagnostics isOverloaded={overloaded} />
          )}

          {activeTab === 'loadout' && (
            <Loadout />
          )}

          {activeTab === 'link' && (
            <ContactForm />
          )}
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
