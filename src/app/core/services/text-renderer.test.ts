import { describe, it, expect } from 'vitest';
import { TextRendererService } from './text-renderer';

describe('TextRendererService (Lute Multi-Word Algorithm Port)', () => {
  const renderer = new TextRendererService();

  it('normalizes French apostrophes and ellipses correctly', () => {
    const input = "« C’est vrai... L‘histoire commence là. »";
    const normalized = renderer.normalizeText(input);
    expect(normalized).toBe("« C'est vrai… L'histoire commence là. »");
  });

  it('tokenizes raw paragraph into sequential words and non-words', () => {
    const text = "Le Marais est magnifique.";
    const tokens = renderer.tokenizeToRaw(text);

    // [Le, ' ', Marais, ' ', est, ' ', magnifique, '.']
    expect(tokens.length).toBe(8);
    expect(tokens[0]).toEqual({
      text: 'Le',
      isWord: true,
      sentenceNumber: 0,
      isSentenceStart: true,
    });
    expect(tokens[1]).toEqual({
      text: ' ',
      isWord: false,
      sentenceNumber: 0,
      isSentenceStart: false,
    });
    expect(tokens[2].text).toBe('Marais');
    expect(tokens[2].isWord).toBe(true);
    expect(tokens[7].text).toBe('.');
    expect(tokens[7].isWord).toBe(false);
  });

  it('increments sentence numbers on sentence terminators', () => {
    const text = "Premier fait! Deuxième fait? Troisième fait.";
    const tokens = renderer.tokenizeToRaw(text);
    const words = tokens.filter((t) => t.isWord);

    expect(words[0].sentenceNumber).toBe(0); // "Premier"
    expect(words[1].sentenceNumber).toBe(0); // "fait"
    expect(words[2].sentenceNumber).toBe(1); // "Deuxième"
    expect(words[3].sentenceNumber).toBe(1); // "fait"
    expect(words[4].sentenceNumber).toBe(2); // "Troisième"
    expect(words[5].sentenceNumber).toBe(2); // "fait"
  });

  it('detects French multi-word expressions like "tout à coup"', () => {
    const text = "Tout à coup, une lumière apparut dans la ruelle.";
    const items = renderer.calculateTextItems(text);

    // The multiword "Tout à coup" should be recognized as a single item with isMultiword = true
    const multiwordItem = items.find((i) => i.isMultiword);
    expect(multiwordItem).toBeDefined();
    expect(multiwordItem!.text.toLowerCase()).toBe('tout à coup');
    expect(multiwordItem!.isWord).toBe(true);
    expect(multiwordItem!.translationPt).toBe('de repente / subitamente');
  });

  it('detects compound expressions like "au fur et à mesure" and "d\'accord"', () => {
    const text = "Au fur et à mesure, ils étaient d'accord.";
    const items = renderer.calculateTextItems(text);

    const mws = items.filter((i) => i.isMultiword);
    expect(mws.length).toBe(2);
    expect(mws[0].text.toLowerCase()).toBe('au fur et à mesure');
    expect(mws[1].text.toLowerCase()).toBe("d'accord");
  });

  it('handles overlapping terms correctly giving precedence to longer expressions', () => {
    const text = "Il est en train de lire.";
    const items = renderer.calculateTextItems(text);

    // "en train de" should be a single multi-word item
    const enTrainDe = items.find((i) => i.text.toLowerCase() === 'en train de');
    expect(enTrainDe).toBeDefined();
    expect(enTrainDe!.isMultiword).toBe(true);
  });

  it('associates false friend warnings with multi-word expressions like "assister à"', () => {
    const text = "Elle devait assister à la séance.";
    const items = renderer.calculateTextItems(text);

    const assister = items.find((i) => i.fullText.toLowerCase() === 'assister à');
    expect(assister).toBeDefined();
    expect(assister?.falseFriend).toBeDefined();
    expect(assister?.falseFriend?.ptTrap).toContain('prestar auxílio');
  });

  it('preserves full containing sentence context on each rendered token', () => {
    const text = "La vieille librairie était sombre. Les clients parlaient doucement.";
    const items = renderer.calculateTextItems(text);

    const librairie = items.find((i) => i.cleanWord === 'librairie');
    expect(librairie).toBeDefined();
    expect(librairie?.sentenceContext).toContain('La vieille librairie était sombre.');
  });
});
