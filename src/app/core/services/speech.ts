import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpeechNarrationService {
  readonly isPlaying = signal<boolean>(false);
  readonly isPaused = signal<boolean>(false);
  readonly currentSpeed = signal<number>(1.0);
  readonly progressPercent = signal<number>(0);
  readonly currentSentenceIndex = signal<number>(0);
  readonly totalSentences = signal<number>(0);

  private sentences: string[] = [];
  private synth: SpeechSynthesis | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private isProcessing = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  /**
   * Splits a continuous French narrative text into clean sentence segments
   */
  splitIntoSentences(text: string): string[] {
    if (!text) return [];
    // Match sentence terminators (. ! ? ...) while preserving French quotations
    const raw = text
      .replace(/\r\n/g, ' ')
      .replace(/\n/g, ' ')
      .split(/(?<=[.!?…])\s+(?=[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ«"—])/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return raw.length > 0 ? raw : [text];
  }

  playStory(fullText: string): void {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      this.stop();
      this.sentences = this.splitIntoSentences(fullText);
      this.totalSentences.set(this.sentences.length);
      this.currentSentenceIndex.set(0);
      this.progressPercent.set(0);
      this.isPaused.set(false);

      this.speakCurrentSentence();
    } finally {
      this.isProcessing = false;
    }
  }

  pause(): void {
    if (!this.isPlaying()) return;

    if (this.synth) {
      try {
        // Immediate audio cutoff: cancel active utterance to silence output instantaneously
        this.synth.cancel();
      } catch {
        // ignore
      }
    }

    this.isPlaying.set(false);
    this.isPaused.set(true);
    this.activeUtterance = null;
  }

  resume(): void {
    if (!this.isPaused() && !this.isPlaying()) {
      if (this.sentences.length > 0) {
        this.speakCurrentSentence();
      }
      return;
    }

    if (this.currentSentenceIndex() >= this.sentences.length) {
      this.replay();
      return;
    }

    this.isPaused.set(false);
    this.speakCurrentSentence();
  }

  replay(): void {
    this.stop();
    this.currentSentenceIndex.set(0);
    this.progressPercent.set(0);
    this.isPaused.set(false);

    if (this.sentences.length > 0) {
      this.speakCurrentSentence();
    }
  }

  stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.isPlaying.set(false);
    this.isPaused.set(false);
    this.activeUtterance = null;
  }

  setSpeed(speed: number): void {
    this.currentSpeed.set(speed);
    if (this.isPlaying()) {
      // Re-trigger current sentence with updated speed seamlessly
      this.speakCurrentSentence();
    }
  }

  speakExcerpt(frenchText: string): void {
    if (!this.synth) return;

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(frenchText);
      utterance.lang = 'fr-FR';
      utterance.rate = this.currentSpeed();

      const voices = this.synth.getVoices();
      const frenchVoice = voices.find((v) => v.lang.startsWith('fr') || v.lang.includes('FR'));
      if (frenchVoice) {
        utterance.voice = frenchVoice;
      }

      this.synth.speak(utterance);
    } catch {
      // ignore
    }
  }

  private speakCurrentSentence(): void {
    const idx = this.currentSentenceIndex();
    if (idx >= this.sentences.length) {
      // Reached the end
      this.isPlaying.set(false);
      this.isPaused.set(false);
      this.progressPercent.set(100);
      return;
    }

    const sentence = this.sentences[idx];
    const total = Math.max(1, this.sentences.length);
    const progress = Math.min(100, Math.round((idx / total) * 100));
    this.progressPercent.set(progress);

    if (this.synth) {
      try {
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = 'fr-FR';
        utterance.rate = this.currentSpeed();

        const voices = this.synth.getVoices();
        const frenchVoice = voices.find((v) => v.lang.startsWith('fr') || v.lang.includes('FR'));
        if (frenchVoice) {
          utterance.voice = frenchVoice;
        }

        utterance.onend = () => {
          if (!this.isPlaying()) return;
          const nextIdx = idx + 1;
          this.currentSentenceIndex.set(nextIdx);

          if (nextIdx < this.sentences.length) {
            this.speakCurrentSentence();
          } else {
            this.isPlaying.set(false);
            this.isPaused.set(false);
            this.progressPercent.set(100);
          }
        };

        utterance.onerror = () => {
          this.isPlaying.set(false);
          this.isPaused.set(false);
        };

        this.activeUtterance = utterance;
        this.synth.speak(utterance);
        this.isPlaying.set(true);
        this.isPaused.set(false);
      } catch {
        this.isPlaying.set(false);
        this.isPaused.set(false);
      }
    } else {
      // In headless environment without speech synthesis, simulate play state for UI
      this.isPlaying.set(true);
      this.isPaused.set(false);
    }
  }
}
