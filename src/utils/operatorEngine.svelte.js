// Autonomous Operator Engine State (Svelte 5 Runes)
import { buildEngine } from "./buildEngine.svelte.js";

export class OperatorEngine {
  phase = $state("scanning"); // 'scanning' | 'wireframing' | 'assembled'
  isTouring = $state(true);
  tourSpeed = $state(1); // 1x, 2x, 0.5x
  builtLayers = $state(0);
  totalLayers = 252;
  agentCount = $state(18);
  elapsedSeconds = $state(0);
  isSwarmVortex = $state(false);

  constructor() {
    this.startLifecycle();
  }

  startLifecycle() {
    this.phase = "scanning";
    this.builtLayers = 0;
    this.agentCount = 18;
    this.elapsedSeconds = 0;

    // Phase 0: Scanning orbit (1.2s)
    setTimeout(() => {
      this.phase = "wireframing";
      this.builtLayers = 24;

      // Phase 1: Wireframing CAD layout (1.4s)
      setTimeout(() => {
        this.phase = "assembled";
        this.startLayerCounter();
        this.startTimer();
      }, 1400);
    }, 1200);
  }

  startLayerCounter() {
    const interval = setInterval(() => {
      if (this.builtLayers < this.totalLayers) {
        this.builtLayers = Math.min(this.totalLayers, this.builtLayers + Math.floor(Math.random() * 8 + 3));
        if (this.builtLayers > 180) this.agentCount = 28;
        else if (this.builtLayers > 90) this.agentCount = 22;
      } else {
        clearInterval(interval);
      }
    }, 120);
  }

  startTimer() {
    const timer = setInterval(() => {
      this.elapsedSeconds = +(this.elapsedSeconds + 0.1).toFixed(1);
      if (this.isSwarmVortex) {
        clearInterval(timer);
      }
    }, 100);
  }

  toggleTour() {
    this.isTouring = !this.isTouring;
  }

  cycleSpeed() {
    if (this.tourSpeed === 1) this.tourSpeed = 2;
    else if (this.tourSpeed === 2) this.tourSpeed = 0.5;
    else this.tourSpeed = 1;
  }

  replay() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    this.startLifecycle();
    buildEngine.initSequence();
  }
}

export const operatorEngine = new OperatorEngine();

