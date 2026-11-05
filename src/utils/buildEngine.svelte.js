// Coordinated Multi-Agent Build Engine (Svelte 5 Runes)
export class BuildEngine {
  step = $state(0);
  isScanning = $state(true);
  isComplete = $state(false);

  // Targets currently being built / selected
  activeTarget = $state(null); // { id, x, y, w, h, label, agent, isTyping }

  // Built status for each element ID
  builtStates = $state({
    "port-wireframe": false,
    "hero-greet": false,
    "hero-name": false,
    "hero-role": false,
    "hero-bio": false,
    "hero-buttons": false,
    "hero-metrics": false,
    "hero-portrait": false,
    "hero-runtimes": false,
    "hero-tags": false,
    "about-header": false,
    "about-bio": false,
    "about-strengths": false,
    "about-pillars": false,
    "flagship-header": false,
    "flagship-core": false,
    "flagship-layers": false,
    "flagship-grid": false,
    "matrix-header": false,
    "matrix-cards": false,
    "exp-header": false,
    "exp-card": false,
    "edu-header": false,
    "edu-timeline": false,
    "cert-header": false,
    "cert-grid": false,
    "contact-header": false,
    "contact-quick": false,
    "contact-form": false
  });

  // Crosshair markers placed by agents
  crosshairs = $state([]);

  constructor() {
    if (typeof window !== "undefined") {
      this.initSequence();
    }
  }

  initSequence() {
    this.step = 0;
    this.isScanning = true;
    this.isComplete = false;
    this.crosshairs = [];

    // Reset all built states
    Object.keys(this.builtStates).forEach((k) => {
      this.builtStates[k] = false;
    });

    // 0.8s of scanning orbit, then begin live build
    setTimeout(() => {
      this.isScanning = false;
      this.runNextStep();
    }, 800);
  }

  runNextStep() {
    const buildPlan = [
      { id: "port-wireframe", label: "1021 × 336", agent: "Architect", dur: 280 },
      { id: "hero-greet", label: "84 × 22", agent: "UI-Synthesizer", dur: 180 },
      { id: "hero-name", label: "128 × 48", agent: "ClaudeCode", isTyping: true, dur: 380 },
      { id: "hero-role", label: "291 × 13", agent: "Hermes-70B", isTyping: true, dur: 320 },
      { id: "hero-bio", label: "425 × 71", agent: "GPT-4o", isTyping: true, dur: 380 },
      { id: "hero-buttons", label: "260 × 40", agent: "DeepSeek-V3", dur: 220 },
      { id: "hero-metrics", label: "340 × 44", agent: "Codestral", dur: 220 },
      { id: "hero-portrait", label: "240 × 250", agent: "Sovereign-1", dur: 400 },
      { id: "hero-runtimes", label: "280 × 160", agent: "Quant-Prime", dur: 280 },
      { id: "hero-tags", label: "260 × 30", agent: "Mistral-Large", dur: 200 },
      { id: "about-header", label: "281 × 13", agent: "Qwen-2.5", isTyping: true, dur: 280 },
      { id: "about-bio", label: "440 × 180", agent: "Llama-3.3", dur: 320 },
      { id: "about-strengths", label: "440 × 140", agent: "ClaudeCode", dur: 300 },
      { id: "about-pillars", label: "360 × 260", agent: "Architect", dur: 320 },
      { id: "flagship-header", label: "241 × 28", agent: "ClaudeCode", dur: 260 },
      { id: "flagship-core", label: "680 × 260", agent: "Hermes-70B", dur: 360 },
      { id: "flagship-layers", label: "580 × 90", agent: "FastAPI-Core", dur: 280 },
      { id: "flagship-grid", label: "680 × 200", agent: "UI-Synthesizer", dur: 340 },
      { id: "matrix-header", label: "260 × 28", agent: "DeepSeek-V3", dur: 260 },
      { id: "matrix-cards", label: "720 × 240", agent: "Solidity-Op", dur: 340 },
      { id: "exp-header", label: "240 × 28", agent: "Codestral", dur: 240 },
      { id: "exp-card", label: "720 × 200", agent: "Mistral-Large", dur: 320 },
      { id: "edu-header", label: "240 × 28", agent: "Qwen-2.5", dur: 240 },
      { id: "edu-timeline", label: "720 × 220", agent: "Sovereign-1", dur: 320 },
      { id: "cert-header", label: "240 × 28", agent: "Llama-3.3", dur: 240 },
      { id: "cert-grid", label: "720 × 200", agent: "Architect", dur: 320 },
      { id: "contact-header", label: "380 × 42", agent: "ClaudeCode", isTyping: true, dur: 300 },
      { id: "contact-quick", label: "360 × 38", agent: "Hermes-70B", dur: 250 },
      { id: "contact-form", label: "440 × 320", agent: "GPT-4o", dur: 350 }
    ];

    if (this.step < buildPlan.length) {
      const plan = buildPlan[this.step];
      const el = document.getElementById(plan.id);

      if (el) {
        const rect = el.getBoundingClientRect();
        this.activeTarget = {
          id: plan.id,
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          w: Math.round(rect.width) || parseInt(plan.label),
          h: Math.round(rect.height) || 40,
          label: `${Math.round(rect.width) || plan.label.split("×")[0]} × ${Math.round(rect.height) || plan.label.split("×")[1] || 40}`,
          agent: plan.agent,
          isTyping: plan.isTyping || false
        };

        // Add a placement crosshair
        if (this.crosshairs.length < 12) {
          this.crosshairs.push({
            id: Math.random(),
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          });
        }
      }

      // Unlock element
      this.builtStates[plan.id] = true;

      setTimeout(() => {
        this.step++;
        this.runNextStep();
      }, plan.dur);
    } else {
      this.activeTarget = null;
      this.isComplete = true;
    }
  }

  isBuilt(id) {
    if (this.isScanning) return false;
    return this.builtStates[id] ?? true;
  }

  isBuilding(id) {
    return this.activeTarget?.id === id;
  }
}

export const buildEngine = new BuildEngine();
