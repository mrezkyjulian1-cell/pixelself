// Web Audio API Retro Sound & Lo-fi Music Synthesizer
// Completely standalone, no external files required, zero latency, guaranteed to work offline.

class RetroSoundEngine {
  constructor() {
    this.ctx = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.masterGain = null;

    this.isBgmEnabled = true;
    this.isSfxEnabled = true;
    this.bgmVolume = 0.8;
    this.sfxVolume = 0.7;

    this.isPlaying = false;
    this.currentTrackIndex = 0;
    this.bgmTimer = null;
    this.stepIndex = 0;

    this.tracks = [
      {
        id: 'night-drive',
        title: 'Lofi - Night Drive',
        artist: 'Rezky Synth OST',
        tempo: 82,
        notes: [
          // Dm9 -> G13 -> Cmaj9 -> Am7
          [293.66, 349.23, 440.00, 523.25], // D4, F4, A4, C5
          [293.66, 349.23, 440.00, 493.88],
          [246.94, 329.63, 392.00, 493.88], // B3, E4, G4, B4
          [261.63, 329.63, 392.00, 493.88], // C4, E4, G4, B4
          [220.00, 261.63, 329.63, 440.00], // A3, C4, E4, A4
        ]
      },
      {
        id: 'pixel-dreams',
        title: 'Pixel Dreams (Town Theme)',
        artist: '16-bit RPG World',
        tempo: 96,
        notes: [
          // C -> G -> Am -> F
          [261.63, 329.63, 392.00, 523.25],
          [196.00, 246.94, 293.66, 392.00],
          [220.00, 261.63, 329.63, 440.00],
          [174.61, 220.00, 261.63, 349.23],
        ]
      },
      {
        id: 'starlight',
        title: 'Starlight Exploration',
        artist: 'Cosmic Chiptune',
        tempo: 75,
        notes: [
          [220.00, 277.18, 329.63, 440.00], // A maj
          [246.94, 311.13, 369.99, 493.88], // B maj
          [277.18, 329.63, 415.30, 554.37], // C# min
          [220.00, 329.63, 440.00, 659.25],
        ]
      },
      {
        id: 'late-night',
        title: 'Late Night Coding',
        artist: 'Focus Pulse',
        tempo: 90,
        notes: [
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 392.00], // G
          [220.00, 261.63, 329.63, 392.00], // Am7
          [164.81, 196.00, 246.94, 293.66], // Em7
        ]
      }
    ];

    this.onTrackChange = null;
    this.onPlayStateChange = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.isBgmEnabled ? this.bgmVolume * 0.35 : 0, this.ctx.currentTime);
      this.bgmGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.isSfxEnabled ? this.sfxVolume * 0.45 : 0, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn('AudioContext failed to initialize:', e);
    }
  }

  resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // SFX Methods
  playSelect() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {}
  }

  playConfirm() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { f: 523.25, time: 0 },
        { f: 659.25, time: 0.08 },
        { f: 783.99, time: 0.16 },
        { f: 1046.50, time: 0.24 }
      ].forEach(({ f, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + time);

        gain.gain.setValueAtTime(0.2, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.15);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + time);
        osc.stop(now + time + 0.16);
      });
    } catch (e) {}
  }

  playCancel() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [
        { f: 440, time: 0 },
        { f: 330, time: 0.08 },
        { f: 220, time: 0.16 }
      ].forEach(({ f, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(f, now + time);

        gain.gain.setValueAtTime(0.12, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.12);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + time);
        osc.stop(now + time + 0.13);
      });
    } catch (e) {}
  }

  playDoor() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.25);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2400, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.31);
    } catch (e) {}
  }

  playFanfare() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.1, t: 0 },
        { f: 659.25, d: 0.1, t: 0.12 },
        { f: 783.99, d: 0.1, t: 0.24 },
        { f: 1046.50, d: 0.35, t: 0.36 }
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.25, now + t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + d);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + t);
        osc.stop(now + t + d + 0.02);
      });
    } catch (e) {}
  }

  playSave() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      arpeggio.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.42);
      });
    } catch (e) {}
  }

  playFootstep() {
    if (!this.isSfxEnabled) return;
    this.resume();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  // Procedural 16-Bit Lo-fi BGM loop
  startBgm() {
    this.resume();
    if (!this.ctx) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    if (this.onPlayStateChange) this.onPlayStateChange(true);
    this.scheduleNextBar();
  }

  scheduleNextBar() {
    if (!this.isPlaying || !this.ctx) return;

    const track = this.tracks[this.currentTrackIndex];
    const beatDuration = 60 / track.tempo;
    const chord = track.notes[this.stepIndex % track.notes.length];

    if (this.isBgmEnabled && this.ctx.state === 'running') {
      const now = this.ctx.currentTime;

      // Warm Pad Chords (filtered triangle & sine)
      chord.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(950, now);

        // Soft attack & release
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 1.95);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.bgmGain);

        osc.start(now);
        osc.stop(now + beatDuration * 2);
      });

      // Subtle Bass Note
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bassOsc.type = 'triangle';
      bassOsc.frequency.setValueAtTime(chord[0] / 2, now);

      bassGain.gain.setValueAtTime(0.08, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 1.8);

      bassOsc.connect(bassGain);
      bassGain.connect(this.bgmGain);

      bassOsc.start(now);
      bassOsc.stop(now + beatDuration * 1.9);

      // Light chiptune arpeggios
      [0, 0.4, 0.8, 1.2].forEach((offset, idx) => {
        const arpOsc = this.ctx.createOscillator();
        const arpGain = this.ctx.createGain();
        arpOsc.type = 'square';
        const arpFreq = chord[(idx + this.stepIndex) % chord.length] * 1.5;
        arpOsc.frequency.setValueAtTime(arpFreq, now + offset * beatDuration);

        arpGain.gain.setValueAtTime(0.015, now + offset * beatDuration);
        arpGain.gain.exponentialRampToValueAtTime(0.001, now + offset * beatDuration + 0.18);

        arpOsc.connect(arpGain);
        arpGain.connect(this.bgmGain);

        arpOsc.start(now + offset * beatDuration);
        arpOsc.stop(now + offset * beatDuration + 0.2);
      });
    }

    this.stepIndex++;
    this.bgmTimer = setTimeout(() => {
      this.scheduleNextBar();
    }, beatDuration * 2000);
  }

  stopBgm() {
    this.isPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.onPlayStateChange) this.onPlayStateChange(false);
  }

  toggleBgmPlay() {
    if (this.isPlaying) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.isPlaying;
  }

  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.stepIndex = 0;
    if (this.onTrackChange) this.onTrackChange(this.getCurrentTrack());
  }

  prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.stepIndex = 0;
    if (this.onTrackChange) this.onTrackChange(this.getCurrentTrack());
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  setBgmEnabled(enabled) {
    this.isBgmEnabled = enabled;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(enabled ? this.bgmVolume * 0.35 : 0, this.ctx.currentTime);
    }
  }

  setSfxEnabled(enabled) {
    this.isSfxEnabled = enabled;
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(enabled ? this.sfxVolume * 0.45 : 0, this.ctx.currentTime);
    }
  }

  setBgmVolume(val) {
    this.bgmVolume = Math.max(0, Math.min(1, val));
    if (this.bgmGain && this.ctx && this.isBgmEnabled) {
      this.bgmGain.gain.setValueAtTime(this.bgmVolume * 0.35, this.ctx.currentTime);
    }
  }

  setSfxVolume(val) {
    this.sfxVolume = Math.max(0, Math.min(1, val));
    if (this.sfxGain && this.ctx && this.isSfxEnabled) {
      this.sfxGain.gain.setValueAtTime(this.sfxVolume * 0.45, this.ctx.currentTime);
    }
  }
}

export const sound = new RetroSoundEngine();
