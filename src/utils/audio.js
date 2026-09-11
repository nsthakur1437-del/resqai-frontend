// Web Audio API synthesizer for futuristic command center sound effects (no external audio files required)

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playBeep(freq = 440, type = 'sine', duration = 0.15, vol = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  playEmergencyAlert() {
    if (!this.enabled) return;
    this.playBeep(880, 'triangle', 0.12, 0.15);
    setTimeout(() => this.playBeep(660, 'triangle', 0.18, 0.15), 130);
    setTimeout(() => this.playBeep(980, 'triangle', 0.25, 0.18), 320);
  }

  playAiChime() {
    if (!this.enabled) return;
    this.playBeep(523.25, 'sine', 0.1, 0.08); // C5
    setTimeout(() => this.playBeep(659.25, 'sine', 0.12, 0.08), 100); // E5
    setTimeout(() => this.playBeep(783.99, 'sine', 0.2, 0.08), 200); // G5
  }

  playSuccess() {
    if (!this.enabled) return;
    this.playBeep(587.33, 'triangle', 0.12, 0.12); // D5
    setTimeout(() => this.playBeep(739.99, 'triangle', 0.14, 0.12), 120); // F#5
    setTimeout(() => this.playBeep(880.00, 'triangle', 0.35, 0.15), 240); // A5
  }

  playClick() {
    if (!this.enabled) return;
    this.playBeep(1200, 'sine', 0.04, 0.04);
  }
}

export const soundFX = new SoundFX();
