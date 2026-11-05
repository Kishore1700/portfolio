// Coordinated Multi-Agent Autonomous Build Engine (Svelte 5 Runes)
export class BuildEngine {
  phase = $state("scanning"); // 'scanning' | 'wireframe' | 'building' | 'complete'
  isScanning = $derived(this.phase === "scanning");
  isWireframe = $derived(this.phase === "wireframe");
  isComplete = $derived(this.phase === "complete");

  // Track active agent positions & targets: map agentName -> { id, x, y, label, isTyping }
  agentTargets = $state({});

  // Active build states: id -> true/false
  builtStates = $state({});

  // Real-time typed text for typewriter elements
  typedTexts = $state({
    "hero-greet": "",
    "hero-name": "",
    "hero-role": "",
    "hero-bio": "",
    "hero-btn2": "",
    "hero-runtime1": "",
    "hero-runtime2": "",
    "hero-runtime3": "",
    "about-header": "",
    "flagship-header": "",
    "contact-header": ""
  });

  // Target full texts to type out
  fullTexts = {
    "hero-greet": "Hello, I'm",
    "hero-name": "KISHORE.",
    "hero-role": "• FULL-STACK ARCHITECT & MCA SCHOLAR",
    "hero-bio": "Master of Computer Applications candidate at Sona College of Technology. Architecting high-concurrency backend services, asynchronous pipelines, and reactive client interfaces from first principles — zero frameworks, total autonomy.",
    "hero-btn2": "EXPLORE ARCHITECTURE",
    "hero-runtime1": "01. Autonomous Core",
    "hero-runtime2": "02. Reactive Web Engine",
    "hero-runtime3": "03. AI & Computer Vision",
    "about-header": "Background & Philosophy",
    "flagship-header": "Flagship Deployments",
    "contact-header": "Let's Architect Something Extraordinary."
  };

  // Crosshair markers placed by agents
  crosshairs = $state([]);

  constructor() {
    if (typeof window !== "undefined") {
      this.initSequence();
    }
  }

  initSequence() {
    this.phase = "scanning";
    this.agentTargets = {};
    this.crosshairs = [];

    // Reset typed texts
    Object.keys(this.typedTexts).forEach((k) => {
      this.typedTexts[k] = "";
    });

    // Reset built states
    const allIds = [
      "port-wireframe", "hero-greet", "hero-name", "hero-role", "hero-bio",
      "hero-buttons", "hero-metrics", "hero-portrait", "hero-runtimes", "hero-tags",
      "about-header", "about-bio", "about-strengths", "about-pillars",
      "flagship-header", "flagship-core", "flagship-layers", "flagship-grid",
      "matrix-header", "matrix-cards",
      "exp-header", "exp-card", "edu-header", "edu-timeline",
      "cert-header", "cert-grid",
      "contact-header", "contact-quick", "contact-form"
    ];
    allIds.forEach((id) => {
      this.builtStates[id] = false;
    });

    // Phase 1: 0.9s Central scanning orbit
    setTimeout(() => {
      // Phase 2: Wireframe Blueprint activated
      this.phase = "wireframe";

      // Allow 0.4s of full CAD blueprint canvas
      setTimeout(() => {
        this.phase = "building";
        this.startMultiAgentBuild();
      }, 400);
    }, 900);
  }

  startMultiAgentBuild() {
    // Stage 1: Architect draws PORTFOLIO and UI-Synthesizer types "Hello, I'm"
    this.assignTarget("Architect", "port-wireframe", "1021 × 336", false, 300);
    this.builtStates["port-wireframe"] = true;

    setTimeout(() => {
      this.typeText("UI-Synthesizer", "hero-greet", 18, () => {
        this.builtStates["hero-greet"] = true;
      });
    }, 150);

    // Stage 2: ClaudeCode types KISHORE. in red block & Hermes-70B types role
    setTimeout(() => {
      this.typeText("ClaudeCode", "hero-name", 35, () => {
        this.builtStates["hero-name"] = true;
      });

      this.typeText("Hermes-70B", "hero-role", 15, () => {
        this.builtStates["hero-role"] = true;
      });
    }, 400);

    // Stage 3: Sovereign-1 materializes portrait & GPT-4o streams the bio paragraph
    setTimeout(() => {
      this.assignTarget("Sovereign-1", "hero-portrait", "240 × 250", false, 1200);
      this.builtStates["hero-portrait"] = true;

      this.typeText("GPT-4o", "hero-bio", 8, () => {
        this.builtStates["hero-bio"] = true;
      });

      // Quant-Prime types the runtimes concurrently
      this.typeText("Quant-Prime", "hero-runtime1", 12, () => {
        this.typeText("Quant-Prime", "hero-runtime2", 12, () => {
          this.typeText("Quant-Prime", "hero-runtime3", 12, () => {
            this.builtStates["hero-runtimes"] = true;
          });
        });
      });
    }, 850);

    // Stage 4: DeepSeek-V3 types button & Codestral unlocks metrics & tags
    setTimeout(() => {
      this.typeText("DeepSeek-V3", "hero-btn2", 15, () => {
        this.builtStates["hero-buttons"] = true;
      });

      this.assignTarget("Codestral", "hero-metrics", "340 × 44", false, 400);
      this.builtStates["hero-metrics"] = true;

      this.assignTarget("Mistral-Large", "hero-tags", "260 × 30", false, 400);
      this.builtStates["hero-tags"] = true;
    }, 1400);

    // Stage 5: Down-page elements unlock progressively
    setTimeout(() => {
      this.unlockDownPageSections();
    }, 2200);
  }

  typeText(agentName, targetId, charInterval, onDone) {
    const full = this.fullTexts[targetId] || "";
    let idx = 0;
    this.typedTexts[targetId] = "";

    const el = typeof document !== "undefined" ? document.getElementById(targetId) : null;
    let label = "CAD // LAYER";
    if (el) {
      const rect = el.getBoundingClientRect();
      label = `${Math.round(rect.width) || 120} × ${Math.round(rect.height) || 30}`;
    }

    this.assignTarget(agentName, targetId, label, true, full.length * charInterval + 100);

    const interval = setInterval(() => {
      if (idx < full.length) {
        idx++;
        this.typedTexts[targetId] = full.slice(0, idx);
      } else {
        clearInterval(interval);
        this.removeTarget(agentName);
        if (onDone) onDone();
      }
    }, charInterval);
  }

  assignTarget(agentName, targetId, label, isTyping, dur) {
    if (typeof document === "undefined") return;
    const el = document.getElementById(targetId);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    this.agentTargets[agentName] = {
      id: targetId,
      screenX: rect.left + rect.width * 0.5,
      screenY: rect.top + rect.height * 0.5,
      w: Math.round(rect.width) || 100,
      h: Math.round(rect.height) || 30,
      label: label || `${Math.round(rect.width)} × ${Math.round(rect.height)}`,
      agent: agentName,
      isTyping: !!isTyping
    };

    // Add crosshair
    if (this.crosshairs.length < 16) {
      this.crosshairs.push({
        id: Math.random(),
        x: rect.left + rect.width * 0.5,
        y: rect.top + rect.height * 0.5
      });
    }

    if (dur) {
      setTimeout(() => {
        this.removeTarget(agentName);
      }, dur);
    }
  }

  removeTarget(agentName) {
    if (this.agentTargets[agentName]) {
      delete this.agentTargets[agentName];
    }
  }

  unlockDownPageSections() {
    const downIds = [
      "about-header", "about-bio", "about-strengths", "about-pillars",
      "flagship-header", "flagship-core", "flagship-layers", "flagship-grid",
      "matrix-header", "matrix-cards",
      "exp-header", "exp-card", "edu-header", "edu-timeline",
      "cert-header", "cert-grid",
      "contact-header", "contact-quick", "contact-form"
    ];

    downIds.forEach((id, i) => {
      setTimeout(() => {
        this.builtStates[id] = true;
        if (this.fullTexts[id]) {
          this.typedTexts[id] = this.fullTexts[id];
        }
        if (i === downIds.length - 1) {
          this.phase = "complete";
        }
      }, i * 70);
    });
  }

  isBuilt(id) {
    if (this.phase === "scanning") return false;
    if (this.phase === "complete") return true;
    return !!this.builtStates[id];
  }

  isBuilding(id) {
    return Object.values(this.agentTargets).some((t) => t.id === id);
  }

  getActiveTargetFor(id) {
    return Object.values(this.agentTargets).find((t) => t.id === id) || null;
  }
}

export const buildEngine = new BuildEngine();
