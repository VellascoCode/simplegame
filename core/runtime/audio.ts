let audioContext: AudioContext | null = null;

type ToneOptions = {
  frequency?: number;
  duration?: number;
  volume?: number;
  type?: OscillatorType;
};

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioContext) return audioContext;
  try {
    audioContext = new AudioContext();
    if (audioContext.state === "suspended") {
      void audioContext.resume().catch((error) => {
        console.warn("Failed to resume audio context", error);
      });
    }
    return audioContext;
  } catch (error) {
    console.warn("Failed to initialise audio context", error);
    audioContext = null;
    return null;
  }
}

function playTone(options: ToneOptions): void {
  const ctx = getContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume().catch((error) => {
      console.warn("Unable to resume audio context", error);
    });
  }
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = options.type ?? "triangle";
  oscillator.frequency.value = options.frequency ?? 300;
  gain.gain.value = options.volume ?? 0.15;
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  const duration = Math.max(0.05, options.duration ?? 0.15);
  const now = ctx.currentTime;
  oscillator.start(now);
  oscillator.stop(now + duration);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
}

export function playAttackSound(): void {
  playTone({ frequency: 260, duration: 0.08, type: "square", volume: 0.18 });
}

export function playDamageSound(): void {
  playTone({ frequency: 140, duration: 0.12, type: "sawtooth", volume: 0.2 });
}

export function playDeathSound(): void {
  playTone({ frequency: 90, duration: 0.25, type: "triangle", volume: 0.22 });
}

export function playXpSound(): void {
  playTone({ frequency: 520, duration: 0.2, type: "sine", volume: 0.17 });
}

export function playLevelUpSound(): void {
  playTone({ frequency: 640, duration: 0.25, type: "triangle", volume: 0.25 });
  playTone({ frequency: 440, duration: 0.2, type: "sine", volume: 0.18 });
}

export function playMenuOpenSound(): void {
  playTone({ frequency: 720, duration: 0.2, type: "square", volume: 0.3 });
}

export function playMenuCloseSound(): void {
  playTone({ frequency: 280, duration: 0.18, type: "sawtooth", volume: 0.28 });
}
