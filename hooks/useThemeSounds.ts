import { useCallback } from 'react';

export function useThemeSounds() {
  const playSound = useCallback((soundType: 'theme-change' | 'button-click' | 'success' | 'error') => {
    try {
      // Criar um contexto de áudio
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Função para criar um oscilador com envelope ADSR simples
      const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        // Envelope ADSR simples
        const now = audioContext.currentTime;
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01); // Attack
        gainNode.gain.exponentialRampToValueAtTime(0.1, now + duration * 0.3); // Decay
        gainNode.gain.setValueAtTime(0.1, now + duration * 0.7); // Sustain
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Release

        oscillator.start(now);
        oscillator.stop(now + duration);
      };

      switch (soundType) {
        case 'theme-change':
          // Sequência mágica para mudança de tema
          setTimeout(() => createTone(523.25, 0.15, 'sine'), 0);   // C5
          setTimeout(() => createTone(659.25, 0.15, 'sine'), 100); // E5
          setTimeout(() => createTone(783.99, 0.15, 'sine'), 200); // G5
          setTimeout(() => createTone(1046.5, 0.3, 'triangle'), 300); // C6
          break;

        case 'button-click':
          // Som de clique suave
          createTone(800, 0.1, 'square');
          break;

        case 'success':
          // Som de sucesso
          setTimeout(() => createTone(523.25, 0.15, 'sine'), 0);   // C5
          setTimeout(() => createTone(659.25, 0.15, 'sine'), 100); // E5
          setTimeout(() => createTone(783.99, 0.2, 'sine'), 200);  // G5
          break;

        case 'error':
          // Som de erro
          createTone(200, 0.3, 'sawtooth');
          break;
      }
    } catch (error) {
      // Silenciar erros de áudio (pode acontecer se o contexto não estiver disponível)
      console.warn('Audio not available:', error);
    }
  }, []);

  return { playSound };
}