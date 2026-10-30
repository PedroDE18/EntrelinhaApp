import { describe, it, expect } from 'vitest';
import { SpeechNarrationService } from './speech';

describe('SpeechNarrationService', () => {
  it('splitIntoSentences splits paragraphs into sentences correctly', () => {
    const service = new SpeechNarrationService();
    const text =
      "Une bruine d'automne enveloppait le quartier du Marais. Les pavés luisants reflétaient les lumières dorées des bistros. L'inspectrice marchait.";
    const sentences = service.splitIntoSentences(text);

    expect(sentences.length).toBe(3);
    expect(sentences[0]).toBe("Une bruine d'automne enveloppait le quartier du Marais.");
    expect(sentences[1]).toBe('Les pavés luisants reflétaient les lumières dorées des bistros.');
    expect(sentences[2]).toBe("L'inspectrice marchait.");
  });

  it('handles single sentences and dialogues gracefully', () => {
    const service = new SpeechNarrationService();
    const dialogue = '— Un vrai Anglais ne plaisante jamais quand il s\'agit d\'un pari, répondit Phileas Fogg. Je parie vingt mille livres!';
    const sentences = service.splitIntoSentences(dialogue);

    expect(sentences.length).toBe(2);
    expect(sentences[0]).toBe('— Un vrai Anglais ne plaisante jamais quand il s\'agit d\'un pari, répondit Phileas Fogg.');
    expect(sentences[1]).toBe('Je parie vingt mille livres!');
  });

  it('state signals initialize correctly', () => {
    const service = new SpeechNarrationService();
    expect(service.isPlaying()).toBe(false);
    expect(service.isPaused()).toBe(false);
    expect(service.currentSpeed()).toBe(1.0);
    expect(service.progressPercent()).toBe(0);
  });
});
