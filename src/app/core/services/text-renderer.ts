import { Injectable } from '@angular/core';
import { GlossToken, RenderedTextItem, VocabularyState } from '../models';
import { checkFalseCognate, checkGenderTrap, normalizeToken } from '../linguistics';
import { lookupFrenchLexicon } from '../lexicon';
import { LearnerProfileService } from './learner-profile';

const ZWS = '\u200B'; // Zero-width space used by Lute to separate multi-word tokens

export interface ParsedRawToken {
  text: string;
  isWord: boolean;
  sentenceNumber: number;
  isSentenceStart: boolean;
}

export interface CandidateItem {
  id: string;
  startIndex: number;
  tokenCount: number;
  text: string;
  textLc: string;
  sentenceNumber: number;
  isWord: boolean;
  gloss?: GlossToken;
  isCustomMultiword?: boolean;
}

/**
 * Built-in high-yield French idiomatic multi-word expressions
 * Pedagogically vital for Brazilian Portuguese speakers.
 */
export const DEFAULT_FRENCH_MULTIWORDS: {
  phrase: string;
  translationPt: string;
  definitionFr: string;
  falseFriend?: { ptTrap: string; trueMeaningPt: string; explanation: string };
}[] = [
  {
    phrase: 'tout à coup',
    translationPt: 'de repente / subitamente',
    definitionFr: 'Soudainement, de manière imprévue.',
  },
  {
    phrase: 'au fur et à mesure',
    translationPt: 'à medida que / progressivamente',
    definitionFr: 'Progressivement, suivant une proportion continue.',
  },
  {
    phrase: "d'accord",
    translationPt: 'de acordo / tudo bem / ok',
    definitionFr: 'Expression d’assentiment ou de conformité.',
  },
  {
    phrase: "c'est-à-dire",
    translationPt: 'ou seja / isto é',
    definitionFr: 'Sert à expliquer ou préciser une affirmation précédente.',
  },
  {
    phrase: 'il y a',
    translationPt: 'há / existe / faz [tempo]',
    definitionFr: 'Indique l’existence ou une durée temporelle écoulée.',
  },
  {
    phrase: 'en fait',
    translationPt: 'na verdade / de fato',
    definitionFr: 'En réalité, effectivement.',
    falseFriend: {
      ptTrap: 'de feito',
      trueMeaningPt: 'na verdade, de fato',
      explanation: 'Use "en fait" para dizer "na verdade". Evite dizer "actuellement" com esse sentido.',
    },
  },
  {
    phrase: 'en train de',
    translationPt: 'fazendo algo / no meio de (gerúndio)',
    definitionFr: 'Indique une action en cours d’accomplissement.',
  },
  {
    phrase: 'avoir envie de',
    translationPt: 'estar com vontade de / querer',
    definitionFr: 'Désirer quelque chose, avoir le souhait de.',
    falseFriend: {
      ptTrap: 'ter inveja de',
      trueMeaningPt: 'estar com vontade de',
      explanation: '"Avoir envie de" significa ter vontade ou apetite de algo. Ter inveja é "être envieux" ou "jalouser".',
    },
  },
  {
    phrase: 'avoir besoin de',
    translationPt: 'precisar de / necessitar de',
    definitionFr: 'Éprouver la nécessité de.',
  },
  {
    phrase: 'au lieu de',
    translationPt: 'em vez de / em lugar de',
    definitionFr: 'À la place de, en remplacement de.',
  },
  {
    phrase: 'grâce à',
    translationPt: 'graças a (consequência positiva)',
    definitionFr: 'Par l’effet bienfaisant ou avantageux de.',
  },
  {
    phrase: 'à cause de',
    translationPt: 'por causa de (consequência negativa ou neutra)',
    definitionFr: 'En raison de (souvent négatif ou neutre).',
  },
  {
    phrase: 'parce que',
    translationPt: 'porque / já que',
    definitionFr: 'Conjonction introduisant la cause directe.',
  },
  {
    phrase: 'bien que',
    translationPt: 'embora / mesmo que (+ subjuntivo)',
    definitionFr: 'Conjonction marquant la concession.',
  },
  {
    phrase: 'de temps en temps',
    translationPt: 'de vez em quando / esporadicamente',
    definitionFr: 'Parfois, à intervalles irréguliers.',
  },
  {
    phrase: 'petit à petit',
    translationPt: 'pouco a pouco / gradualmente',
    definitionFr: 'Lentement et par degrés successifs.',
  },
  {
    phrase: 'assister à',
    translationPt: 'comparecer a / presenciar',
    definitionFr: 'Être présent à un événement.',
    falseFriend: {
      ptTrap: 'prestar auxílio / dar assistência',
      trueMeaningPt: 'comparecer / presenciar',
      explanation: '"Assister à" significa estar presente. Ajudar é "aider".',
    },
  },
  {
    phrase: 'prendre garde',
    translationPt: 'tomar cuidado / ficar atento',
    definitionFr: 'Faire attention à un danger potentiel.',
  },
  {
    phrase: 'faire attention',
    translationPt: 'prestar atenção / ter cuidado',
    definitionFr: 'Être vigilant et concentré.',
  },
  {
    phrase: 'tout de suite',
    translationPt: 'imediatamente / logo em seguida',
    definitionFr: 'Sans délai, sur-le-champ.',
  },
  {
    phrase: 'en tout cas',
    translationPt: 'de qualquer forma / em todo caso',
    definitionFr: 'Quoi qu’il arrive, de toute manière.',
  },
  {
    phrase: 'à vrai dire',
    translationPt: 'para falar a verdade / sinceramente',
    definitionFr: 'Pour être sincère, franchement.',
  },
];

@Injectable({
  providedIn: 'root',
})
export class TextRendererService {
  constructor(private readonly learnerProfile?: LearnerProfileService) {}

  /**
   * Applies character normalizations inspired by Lute's character substitutions:
   * Normalizes curly apostrophes, ellipses, double quotes, and CRLF line breaks.
   */
  normalizeText(input: string): string {
    if (!input) return '';
    return input
      .replace(/\r\n/g, '\n')
      .replace(/[’‘´`]/g, "'")
      .replace(/\.{3}/g, '…')
      .replace(/\.{2}/g, '‥')
      .replace(/\u00A0/g, ' ')
      .replace(/\u200B/g, '') // strip accidental zero-width spaces
      .trim();
  }

  /**
   * Splits narrative text into atomic raw tokens (words, whitespace, punctuation).
   * French word characters include standard Latin letters and all accented forms.
   */
  tokenizeToRaw(text: string): ParsedRawToken[] {
    const normalized = this.normalizeText(text);
    if (!normalized) return [];

    // Word characters for French: letters + accented vowels + cedilla
    const wordPattern = /[a-zA-ZÀ-ÖØ-öø-ȳáéíóúÁÉÍÓÚñÑçÇ]+/g;
    const sentenceTerminators = new Set(['.', '!', '?', '…', ':']);

    const tokens: ParsedRawToken[] = [];
    let lastIndex = 0;
    let sentenceNumber = 0;
    let nextIsSentenceStart = true;

    let match: RegExpExecArray | null;
    while ((match = wordPattern.exec(normalized)) !== null) {
      const matchStart = match.index;
      const matchEnd = matchStart + match[0].length;

      // Capture any preceding non-word text (spaces, punctuation, symbols)
      if (matchStart > lastIndex) {
        const nonWord = normalized.substring(lastIndex, matchStart);
        // Check if non-word contains sentence boundary
        let hasSentenceEnd = false;
        for (const ch of nonWord) {
          if (sentenceTerminators.has(ch)) {
            hasSentenceEnd = true;
          }
        }

        tokens.push({
          text: nonWord,
          isWord: false,
          sentenceNumber,
          isSentenceStart: false,
        });

        if (hasSentenceEnd) {
          sentenceNumber++;
          nextIsSentenceStart = true;
        }
      }

      // Add the word token
      tokens.push({
        text: match[0],
        isWord: true,
        sentenceNumber,
        isSentenceStart: nextIsSentenceStart,
      });
      nextIsSentenceStart = false;

      lastIndex = matchEnd;
    }

    // Trailing non-word text
    if (lastIndex < normalized.length) {
      const trailing = normalized.substring(lastIndex);
      tokens.push({
        text: trailing,
        isWord: false,
        sentenceNumber,
        isSentenceStart: false,
      });
    }

    return tokens;
  }

  /**
   * Extracts sentences from raw tokens for context tracking.
   */
  extractSentenceContexts(tokens: ParsedRawToken[]): Map<number, string> {
    const map = new Map<number, string>();
    for (const t of tokens) {
      const current = map.get(t.sentenceNumber) || '';
      map.set(t.sentenceNumber, current + t.text);
    }
    return map;
  }

  /**
   * Compiles the list of multi-word expressions by merging default French phrases,
   * existing story-level glosses, and any user-saved expressions in the profile.
   */
  getMultiwordCatalog(storyGlosses: GlossToken[] = []): Map<string, {
    translationPt: string;
    definitionFr: string;
    falseFriend?: { ptTrap: string; trueMeaningPt: string; explanation: string };
  }> {
    const catalog = new Map<string, {
      translationPt: string;
      definitionFr: string;
      falseFriend?: { ptTrap: string; trueMeaningPt: string; explanation: string };
    }>();

    // 1. Defaults
    for (const def of DEFAULT_FRENCH_MULTIWORDS) {
      catalog.set(def.phrase.toLowerCase().trim(), {
        translationPt: def.translationPt,
        definitionFr: def.definitionFr,
        falseFriend: def.falseFriend,
      });
    }

    // 2. Story-provided glosses containing spaces or apostrophes
    for (const g of storyGlosses) {
      const clean = (g.cleanWord || g.text).toLowerCase().trim();
      if (clean.includes(' ') || clean.includes("'")) {
        catalog.set(clean, {
          translationPt: g.translationPt,
          definitionFr: g.definitionFr,
          falseFriend: g.falseFriend,
        });
      }
    }

    // 3. User profile saved words containing spaces
    if (this.learnerProfile) {
      for (const w of this.learnerProfile.words()) {
        const clean = w.french.toLowerCase().trim();
        if (clean.includes(' ')) {
          catalog.set(clean, {
            translationPt: w.translationPt,
            definitionFr: `Expression enregistrée par l’apprenant : ${w.french}`,
            falseFriend: w.isFalseFriend && w.falseFriendNote
              ? {
                  ptTrap: 'Confusão frequente',
                  trueMeaningPt: w.translationPt,
                  explanation: w.falseFriendNote,
                }
              : undefined,
          });
        }
      }
    }

    return catalog;
  }

  /**
   * Core Lute algorithm ported to TypeScript:
   * Computes rendered TextItems with multi-word expression matching and overlap resolution.
   */
  calculateTextItems(
    paragraphText: string,
    storyGlosses: GlossToken[] = [],
    paragraphIndex = 0
  ): RenderedTextItem[] {
    const rawTokens = this.tokenizeToRaw(paragraphText);
    if (rawTokens.length === 0) return [];

    const sentenceContexts = this.extractSentenceContexts(rawTokens);
    const multiwordCatalog = this.getMultiwordCatalog(storyGlosses);

    // Map existing single-word glosses for quick lookup
    const singleGlossMap = new Map<string, GlossToken>();
    for (const g of storyGlosses) {
      const clean = normalizeToken(g.cleanWord || g.text);
      singleGlossMap.set(clean, g);
    }

    // Step 1: Collect candidates for all single-word and non-word tokens
    const candidates: CandidateItem[] = [];

    for (let i = 0; i < rawTokens.length; i++) {
      const tok = rawTokens[i];
      const textLc = tok.text.toLowerCase();
      const clean = normalizeToken(tok.text);
      const gloss = singleGlossMap.get(clean);

      candidates.push({
        id: `tok-${paragraphIndex}-${i}-single`,
        startIndex: i,
        tokenCount: 1,
        text: tok.text,
        textLc,
        sentenceNumber: tok.sentenceNumber,
        isWord: tok.isWord,
        gloss,
      });
    }

    // Step 2: Search for multi-word expressions across the token stream
    // We search over windows of word/non-word sequences up to length 12
    const totalTokens = rawTokens.length;

    for (const [phrase, info] of multiwordCatalog.entries()) {
      // Normalize phrase for matching
      const phraseNorm = phrase.replace(/[’‘´`]/g, "'").trim().toLowerCase();
      // Tokenize phrase using same raw tokenizer
      const phraseRawTokens = this.tokenizeToRaw(phraseNorm);
      const phraseTokensCount = phraseRawTokens.length;
      if (phraseTokensCount <= 1) continue;

      // Slide window across paragraph raw tokens
      for (let start = 0; start <= totalTokens - phraseTokensCount; start++) {
        // Fast boundary check: first token must match
        if (rawTokens[start].text.toLowerCase().trim() !== phraseRawTokens[0].text.toLowerCase().trim()) {
          continue;
        }

        // Check if slice matches the phrase token-by-token
        let matches = true;
        for (let k = 0; k < phraseTokensCount; k++) {
          const actual = rawTokens[start + k].text.toLowerCase();
          const expected = phraseRawTokens[k].text.toLowerCase();
          if (actual !== expected) {
            matches = false;
            break;
          }
        }

        if (matches) {
          const sliceText = rawTokens.slice(start, start + phraseTokensCount).map((t) => t.text).join('');
          candidates.push({
            id: `tok-${paragraphIndex}-${start}-mw-${phraseTokensCount}`,
            startIndex: start,
            tokenCount: phraseTokensCount,
            text: sliceText,
            textLc: phraseNorm,
            sentenceNumber: rawTokens[start].sentenceNumber,
            isWord: true,
            isCustomMultiword: true,
            gloss: {
              text: sliceText,
              cleanWord: phraseNorm,
              definitionFr: info.definitionFr,
              translationPt: info.translationPt,
              falseFriend: info.falseFriend,
            },
          });
        }
      }
    }

    // Step 3: Sort candidates according to Lute's algorithm:
    // Sort by startIndex ascending, then by tokenCount descending (longer terms win)
    candidates.sort((a, b) => {
      if (a.startIndex !== b.startIndex) {
        return a.startIndex - b.startIndex;
      }
      return b.tokenCount - a.tokenCount;
    });

    // Step 4: Write to output token allocation array from bottom to top (Lute's reverse fill)
    // This ensures that longer terms have precedence and overwrite sub-elements where appropriate.
    const outputSlots = new Array<string | null>(totalTokens).fill(null);

    for (let c = candidates.length - 1; c >= 0; c--) {
      const item = candidates[c];
      for (let pos = item.startIndex; pos < item.startIndex + item.tokenCount; pos++) {
        outputSlots[pos] = item.id;
      }
    }

    // Step 5: Count occurrences in outputSlots to calculate displayCount for each item
    const idCounts = new Map<string, number>();
    for (const id of outputSlots) {
      if (id) {
        idCounts.set(id, (idCounts.get(id) || 0) + 1);
      }
    }

    // Step 6: Filter items that actually appear in output and build RenderedTextItem
    const finalItems: RenderedTextItem[] = [];

    // Map learner words for status lookup
    const learnerWords = this.learnerProfile ? this.learnerProfile.words() : [];
    const learnerMap = new Map<string, VocabularyState>();
    for (const w of learnerWords) {
      learnerMap.set(w.french.toLowerCase().trim(), w.state);
      learnerMap.set(w.lemma.toLowerCase().trim(), w.state);
    }

    for (const candidate of candidates) {
      const displayCount = idCounts.get(candidate.id) || 0;
      if (displayCount === 0) continue;

      // If overlapped, slice text to display the visible tokens
      let displayText = candidate.text;
      if (candidate.tokenCount > 1 && displayCount < candidate.tokenCount) {
        // Display only the last `displayCount` tokens of the candidate
        const sliceTokens = rawTokens.slice(
          candidate.startIndex + (candidate.tokenCount - displayCount),
          candidate.startIndex + candidate.tokenCount
        );
        displayText = sliceTokens.map((t) => t.text).join('');
      }

      const clean = normalizeToken(candidate.textLc);
      const lexiconEntry = candidate.isWord
        ? lookupFrenchLexicon(candidate.textLc) || lookupFrenchLexicon(clean) || lookupFrenchLexicon(candidate.text)
        : null;
      const falseFriend = candidate.gloss?.falseFriend || checkFalseCognate(clean) || undefined;
      const genderTrap = candidate.gloss?.genderTrap || checkGenderTrap(clean) || undefined;
      const sentenceContext = sentenceContexts.get(candidate.sentenceNumber) || '';

      const translationPt = candidate.gloss?.translationPt
        || (falseFriend ? falseFriend.trueMeaningPt : undefined)
        || (lexiconEntry ? lexiconEntry.translationPt : undefined);

      const definitionFr = candidate.gloss?.definitionFr
        || (lexiconEntry ? lexiconEntry.definitionFr : undefined);

      // Determine learner vocabulary state
      let state: VocabularyState = 'unseen';
      if (candidate.isWord) {
        const storedState = learnerMap.get(candidate.textLc) || learnerMap.get(clean);
        if (storedState) {
          state = storedState;
        }
      }

      finalItems.push({
        id: candidate.id,
        text: displayText,
        fullText: candidate.text,
        cleanWord: candidate.isWord ? clean : '',
        tokenCount: candidate.tokenCount,
        displayCount,
        isWord: candidate.isWord,
        isMultiword: candidate.tokenCount > 1,
        sentenceNumber: candidate.sentenceNumber,
        sentenceContext,
        paragraphIndex,
        tokenIndex: candidate.startIndex,
        state,
        isSentenceStart: rawTokens[candidate.startIndex]?.isSentenceStart ?? false,
        definitionFr,
        translationPt,
        falseFriend,
        genderTrap,
      });
    }

    return finalItems;
  }
}
