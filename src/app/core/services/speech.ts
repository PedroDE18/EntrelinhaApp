import { Injectable, signal } from '@angular/core';

export interface FrenchVoiceOption {
  name: string;
  lang: string;
  isNatural: boolean;
  label: string;
}

export interface NarrativeSentence {
  paragraphIndex: number;
  sentenceIndexInParagraph: number;
  globalIndex: number;
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class SpeechNarrationService {
  readonly isPlaying = signal<boolean>(false);
  readonly isPaused = signal<boolean>(false);
  readonly currentSpeed = signal<number>(0.92);
  readonly progressPercent = signal<number>(0);
  readonly currentSentenceIndex = signal<number>(0);
  readonly totalSentences = signal<number>(0);
  readonly activeVoiceName = signal<string>('Voz Natural Francesa');
  readonly availableFrenchVoices = signal<FrenchVoiceOption[]>([]);
  readonly activeSentence = signal<NarrativeSentence | null>(null);
  readonly narrativeSentences = signal<NarrativeSentence[]>([]);
  readonly selectedVoiceId = signal<string>('');

  private sentences: string[] = [];
  private synth: SpeechSynthesis | null = null;
  private activeUtterance: SpeechSynthesisUtterance | null = null;
  private isProcessing = false;
  private selectedVoiceName: string | null = null;
  private pauseTimeoutId: any = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
    }
  }

  /**
   * Initializes and listens for asynchronous voice loading from browser engine
   */
  private initVoices(): void {
    if (!this.synth) return;

    const update = () => {
      const voices = this.synth?.getVoices() || [];
      const frenchVoices = voices.filter((v) => {
        const l = (v.lang || '').toLowerCase().replace('_', '-');
        return l.startsWith('fr');
      });

      const ranked = this.sortVoicesByNaturalQuality(frenchVoices);
      const options: FrenchVoiceOption[] = ranked.map((v) => ({
        name: v.name,
        lang: v.lang,
        isNatural: this.isNaturalVoice(v),
        label: this.formatVoiceLabel(v),
      }));

      this.availableFrenchVoices.set(options);

      if (ranked.length > 0) {
        const top = this.getBestFrenchVoice();
        if (top) {
          this.activeVoiceName.set(this.formatVoiceLabel(top));
          this.selectedVoiceId.set(top.name);
        }
      }
    };

    update();
    if (typeof window !== 'undefined') {
      if (this.synth.addEventListener) {
        this.synth.addEventListener('voiceschanged', update);
      } else if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = update;
      }
      // Retries for mobile web engines where voices load asynchronously
      setTimeout(update, 500);
      setTimeout(update, 1500);
    }
  }

  /**
   * Quality scoring heuristic to prefer human-like neural and enhanced voices
   */
  private scoreVoice(voice: SpeechSynthesisVoice): number {
    let score = 0;
    const name = voice.name.toLowerCase();
    const lang = (voice.lang || '').toLowerCase().replace('_', '-');

    if (lang === 'fr-fr') score += 40;
    else if (lang.startsWith('fr')) score += 20;

    if (name.includes('natural') || name.includes('online')) score += 70;
    if (name.includes('google') && name.includes('français')) score += 60;
    if (name.includes('enhanced') || name.includes('premium') || name.includes('siri')) score += 55;

    const favoredNames = ['paul', 'julie', 'henri', 'denise', 'thomas', 'audrey', 'amélie', 'céline', 'nicolas'];
    if (favoredNames.some((n) => name.includes(n))) score += 30;

    if (name.includes('espeak') || name.includes('compact') || name.includes('sin-nombre')) score -= 80;

    return score;
  }

  isNaturalVoice(voice: SpeechSynthesisVoice): boolean {
    const name = voice.name.toLowerCase();
    return (
      name.includes('natural') ||
      name.includes('online') ||
      name.includes('enhanced') ||
      name.includes('premium') ||
      name.includes('google') ||
      name.includes('siri')
    );
  }

  private formatVoiceLabel(voice: SpeechSynthesisVoice): string {
    const isNat = this.isNaturalVoice(voice);
    const cleanName = voice.name
      .replace(/Microsoft\s+/i, '')
      .replace(/Online\s*\(Natural\)\s*-\s*/i, '')
      .replace(/\s*\(France\)/i, '')
      .trim();
    return isNat ? `${cleanName} (Natural)` : cleanName;
  }

  private sortVoicesByNaturalQuality(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
    return [...voices].sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));
  }

  getBestFrenchVoice(): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    const allVoices = this.synth.getVoices();
    const french = allVoices.filter((v) => (v.lang || '').toLowerCase().replace('_', '-').startsWith('fr'));
    if (french.length === 0) return null;

    if (this.selectedVoiceName) {
      const match = french.find((v) => v.name === this.selectedVoiceName);
      if (match) return match;
    }

    const sorted = this.sortVoicesByNaturalQuality(french);
    return sorted[0] || french[0];
  }

  setSelectedVoice(voiceName: string): void {
    this.selectedVoiceName = voiceName;
    this.selectedVoiceId.set(voiceName);
    const voice = this.getBestFrenchVoice();
    if (voice) {
      this.activeVoiceName.set(this.formatVoiceLabel(voice));
    }
  }

  /**
   * Prosody & Intonation Engine
   * Calculates human-like pitch, speed cadence, and breathing pauses based on French syntax and punctuation.
   */
  computeSentenceProsody(sentenceText: string, baseSpeed: number): {
    pitch: number;
    rate: number;
    pauseAfterMs: number;
    cleanText: string;
  } {
    const trimmed = (sentenceText || '').trim();
    let pitch = 1.0;
    let rate = baseSpeed;
    let pauseAfterMs = 360; // Natural period breathing pause

    // 1. Interrogative intonation (Rising inflection in French questions)
    if (trimmed.endsWith('?')) {
      pitch = 1.08;
      rate = Math.max(0.75, baseSpeed * 0.96);
      pauseAfterMs = 420;
    }
    // 2. Exclamative and animated emphasis
    else if (trimmed.endsWith('!')) {
      pitch = 1.05;
      rate = Math.min(1.2, baseSpeed * 1.02);
      pauseAfterMs = 400;
    }
    // 3. Literary dialogue (Quoted speech or dash lines)
    else if (trimmed.startsWith('«') || trimmed.endsWith('»') || trimmed.startsWith('—') || trimmed.startsWith('-')) {
      pitch = 1.02;
      rate = Math.max(0.78, baseSpeed * 0.98);
      pauseAfterMs = 380;
    }
    // 4. Incomplete sentences or ellipsis (Trailing suspension)
    else if (trimmed.endsWith('...') || trimmed.endsWith('…')) {
      pitch = 0.98;
      rate = Math.max(0.75, baseSpeed * 0.94);
      pauseAfterMs = 480;
    }
    // 5. Semicolon or colon (Mid-thought pause)
    else if (trimmed.endsWith(';') || trimmed.endsWith(':')) {
      pitch = 1.0;
      rate = baseSpeed;
      pauseAfterMs = 280;
    }

    // Clean whitespace around French punctuation for smooth phonation
    const cleanText = trimmed
      .replace(/\s+([?!;:])/g, '$1') // Normalize French non-breaking spaces before punctuation to avoid hiccups
      .replace(/\s+/g, ' ');

    return { pitch, rate, pauseAfterMs, cleanText };
  }

  /**
   * Splits a continuous French narrative text into clean sentence segments
   */
  splitIntoSentences(text: string): string[] {
    if (!text) return [];
    const raw = text
      .replace(/\r\n/g, ' ')
      .replace(/\n/g, ' ')
      .split(/(?<=[.!?…])\s+(?=[A-ZÀÂÉÈÊËÎÏÔÙÛÜÇ«"—])/g)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    return raw.length > 0 ? raw : [text];
  }

  /**
   * Prepares structured narrative sentences with paragraph mapping for active read-along
   */
  prepareStory(paragraphs: { text: string }[]): NarrativeSentence[] {
    const result: NarrativeSentence[] = [];
    let globalIndex = 0;

    paragraphs.forEach((p, pIdx) => {
      const sents = this.splitIntoSentences(p.text);
      sents.forEach((text, sIdx) => {
        result.push({
          paragraphIndex: pIdx,
          sentenceIndexInParagraph: sIdx,
          globalIndex: globalIndex++,
          text,
        });
      });
    });

    return result;
  }

  /**
   * Plays story with paragraph-to-sentence read-along mapping
   */
  playStoryParagraphs(paragraphs: { text: string }[], startGlobalIndex: number = 0): void {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      this.clearPauseTimeout();
      this.stop();
      const narrative = this.prepareStory(paragraphs);
      this.narrativeSentences.set(narrative);
      this.sentences = narrative.map((n) => n.text);
      this.totalSentences.set(this.sentences.length);
      this.currentSentenceIndex.set(startGlobalIndex);
      this.progressPercent.set(0);
      this.isPaused.set(false);

      if (this.sentences.length > 0 && startGlobalIndex < this.sentences.length) {
        this.activeSentence.set(narrative[startGlobalIndex]);
        this.speakCurrentSentence();
      }
    } finally {
      this.isProcessing = false;
    }
  }

  playStory(fullText: string): void {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      this.clearPauseTimeout();
      this.stop();
      this.sentences = this.splitIntoSentences(fullText);
      const narrative: NarrativeSentence[] = this.sentences.map((text, i) => ({
        paragraphIndex: 0,
        sentenceIndexInParagraph: i,
        globalIndex: i,
        text,
      }));
      this.narrativeSentences.set(narrative);
      this.totalSentences.set(this.sentences.length);
      this.currentSentenceIndex.set(0);
      this.progressPercent.set(0);
      this.isPaused.set(false);

      if (narrative.length > 0) {
        this.activeSentence.set(narrative[0]);
        this.speakCurrentSentence();
      }
    } finally {
      this.isProcessing = false;
    }
  }

  pause(): void {
    this.clearPauseTimeout();
    if (!this.isPlaying()) return;

    if (this.synth) {
      try {
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
    this.clearPauseTimeout();
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
    this.clearPauseTimeout();
    this.stop();
    this.currentSentenceIndex.set(0);
    this.progressPercent.set(0);
    this.isPaused.set(false);

    if (this.sentences.length > 0) {
      const narrative = this.narrativeSentences();
      if (narrative[0]) {
        this.activeSentence.set(narrative[0]);
      }
      this.speakCurrentSentence();
    }
  }

  stop(): void {
    this.clearPauseTimeout();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.isPlaying.set(false);
    this.isPaused.set(false);
    this.activeSentence.set(null);
    this.activeUtterance = null;
  }

  setSpeed(speed: number): void {
    this.currentSpeed.set(speed);
    if (this.isPlaying()) {
      this.speakCurrentSentence();
    }
  }

  /**
   * Jump directly to speak a specific sentence in the narrative
   */
  jumpToSentence(globalIndex: number): void {
    if (globalIndex < 0 || globalIndex >= this.sentences.length) return;
    this.clearPauseTimeout();
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // ignore
      }
    }
    this.currentSentenceIndex.set(globalIndex);
    const narrative = this.narrativeSentences();
    if (narrative[globalIndex]) {
      this.activeSentence.set(narrative[globalIndex]);
    }
    this.isPlaying.set(true);
    this.isPaused.set(false);
    this.speakCurrentSentence();
  }

  /**
   * Pronounce a single vocabulary word or short expression with clear phonetics
   */
  speakWord(frenchWord: string): void {
    if (!this.synth || !frenchWord) return;

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(frenchWord);
      utterance.lang = 'fr-FR';
      utterance.rate = Math.max(0.82, this.currentSpeed() * 0.95);
      utterance.pitch = 1.0;

      const voice = this.getBestFrenchVoice();
      if (voice) {
        utterance.voice = voice;
      }

      this.synth.speak(utterance);
    } catch {
      // ignore
    }
  }

  speakExcerpt(frenchText: string): void {
    this.speakWord(frenchText);
  }

  private clearPauseTimeout(): void {
    if (this.pauseTimeoutId) {
      clearTimeout(this.pauseTimeoutId);
      this.pauseTimeoutId = null;
    }
  }

  private speakCurrentSentence(): void {
    const idx = this.currentSentenceIndex();
    if (idx >= this.sentences.length) {
      this.isPlaying.set(false);
      this.isPaused.set(false);
      this.activeSentence.set(null);
      this.progressPercent.set(100);
      return;
    }

    const narrative = this.narrativeSentences();
    if (narrative[idx]) {
      this.activeSentence.set(narrative[idx]);
    }

    const sentence = this.sentences[idx];
    const total = Math.max(1, this.sentences.length);
    const progress = Math.min(100, Math.round((idx / total) * 100));
    this.progressPercent.set(progress);

    const prosody = this.computeSentenceProsody(sentence, this.currentSpeed());

    if (this.synth) {
      try {
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(prosody.cleanText);
        utterance.lang = 'fr-FR';
        utterance.rate = prosody.rate;
        utterance.pitch = prosody.pitch;

        const bestVoice = this.getBestFrenchVoice();
        if (bestVoice) {
          utterance.voice = bestVoice;
          this.activeVoiceName.set(this.formatVoiceLabel(bestVoice));
        }

        utterance.onend = () => {
          if (!this.isPlaying()) return;
          const nextIdx = idx + 1;
          this.currentSentenceIndex.set(nextIdx);

          if (nextIdx < this.sentences.length) {
            // Check if sentence transitions to a new paragraph for natural narrative breath
            const curP = narrative[idx]?.paragraphIndex;
            const nextP = narrative[nextIdx]?.paragraphIndex;
            const isParagraphChange = curP !== undefined && nextP !== undefined && curP !== nextP;
            const pauseDuration = isParagraphChange ? 650 : prosody.pauseAfterMs;

            this.pauseTimeoutId = setTimeout(() => {
              if (this.isPlaying()) {
                this.speakCurrentSentence();
              }
            }, pauseDuration);
          } else {
            this.isPlaying.set(false);
            this.isPaused.set(false);
            this.activeSentence.set(null);
            this.progressPercent.set(100);
          }
        };

        utterance.onerror = () => {
          this.isPlaying.set(false);
          this.isPaused.set(false);
          this.activeSentence.set(null);
        };

        this.activeUtterance = utterance;
        this.synth.speak(utterance);
        this.isPlaying.set(true);
        this.isPaused.set(false);
      } catch {
        this.isPlaying.set(false);
        this.isPaused.set(false);
        this.activeSentence.set(null);
      }
    } else {
      this.isPlaying.set(true);
      this.isPaused.set(false);
    }
  }
}
