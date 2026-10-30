import { Injectable, signal, computed } from '@angular/core';
import {
  LearnerProfile,
  LearnerWord,
  PortugueseInterferenceItem,
} from '../models';
import { transitionVocabularyState } from '../linguistics';

const INITIAL_PROFILE: LearnerProfile = {
  id: 'learner-br-01',
  name: 'Pedro Henrique',
  nativeLanguage: 'pt-BR',
  targetLanguage: 'fr-FR',
  readingCEFR: 'B1',
  listeningCEFR: 'A2',
  storiesCompleted: 4,
  totalReadingMinutes: 38,
  totalListeningMinutes: 24,
  currentStreakDays: 5,
  wordsLearnedCount: 142,
  vocabularyMetrics: {
    unseen: 520,
    encountered: 86,
    learning: 48,
    known: 142,
    mastered: 64,
  },
  preferredGenres: ['Mystère & Suspense', 'Littérature Classique', 'Chronique Urbaine'],
  readingSpeedPreference: 'comfortable',
  audioPlaybackSpeed: 1.0,
  firebaseSyncEnabled: true,
  lastSyncedAt: new Date().toISOString(),
};

const INITIAL_WORDS: LearnerWord[] = [
  {
    id: 'w-1',
    french: 'actuellement',
    lemma: 'actuel',
    translationPt: 'atualmente / no momento presente (não significa "na verdade")',
    state: 'learning',
    encounterCount: 3,
    lastEncountered: '2026-10-29',
    contextSentence: 'Actuellement, l\'inspectrice examine le carnet trouvé dans la librairie.',
    isFalseFriend: true,
    falseFriendNote: 'Em inglês "actually" é na verdade. Em francês "actuellement" é neste momento!',
  },
  {
    id: 'w-2',
    french: 'librairie',
    lemma: 'librairie',
    translationPt: 'livraria (onde se compram livros)',
    state: 'learning',
    encounterCount: 4,
    lastEncountered: '2026-10-29',
    contextSentence: 'Il poussa la porte de la vieille librairie du Marais.',
    isFalseFriend: true,
    falseFriendNote: 'Livraria em francês é librairie. Biblioteca é bibliothèque.',
  },
  {
    id: 'w-3',
    french: 'assister à',
    lemma: 'assister',
    translationPt: 'comparecer / presenciar',
    state: 'learning',
    encounterCount: 2,
    lastEncountered: '2026-10-28',
    contextSentence: 'Elle devait assister à la réception au ministère des Affaires étrangères.',
    isFalseFriend: true,
    falseFriendNote: '"Assister à" é presenciar/assistir. Ajudar é "aider".',
  },
  {
    id: 'w-4',
    french: 'le voyage',
    lemma: 'voyage',
    translationPt: 'a viagem (MASCULINO em francês: un voyage)',
    state: 'known',
    encounterCount: 5,
    lastEncountered: '2026-10-27',
    contextSentence: 'Phileas Fogg prépara son grand voyage autour du monde.',
    isFalseFriend: false,
  },
  {
    id: 'w-5',
    french: 'la fin',
    lemma: 'fin',
    translationPt: 'o fim (FEMININO em francês: la fin)',
    state: 'known',
    encounterCount: 6,
    lastEncountered: '2026-10-26',
    contextSentence: 'La fin de la soirée fut marquée par une perte terrible.',
  },
  {
    id: 'w-6',
    french: 'attendre',
    lemma: 'attendre',
    translationPt: 'esperar / aguardar (não é atender)',
    state: 'learning',
    encounterCount: 3,
    lastEncountered: '2026-10-28',
    contextSentence: 'Mathilde attendait impatiemment la réponse de son amie.',
    isFalseFriend: true,
    falseFriendNote: 'Attendre = esperar. Atender o telefone = répondre au téléphone.',
  },
];

const INITIAL_INTERFERENCE_RADAR: PortugueseInterferenceItem[] = [
  {
    id: 'pi-1',
    frenchTerm: 'Actuellement',
    portugueseFalseFriend: 'Na verdade',
    correctPortugueseMeaning: 'Atualmente / neste momento',
    howToSayInFrench: 'En fait / En réalité',
    category: 'faux_ami',
    explanationPt: 'Confusão muito frequente influenciada pelo inglês (actually). Em francês, significa estritamente o momento presente.',
    severity: 'high',
  },
  {
    id: 'pi-2',
    frenchTerm: 'Librairie',
    portugueseFalseFriend: 'Biblioteca',
    correctPortugueseMeaning: 'Livraria (comércio de livros)',
    howToSayInFrench: 'Bibliothèque (para acervo público)',
    category: 'faux_ami',
    explanationPt: 'Une librairie vende livros; une bibliothèque empresta livros.',
    severity: 'high',
  },
  {
    id: 'pi-3',
    frenchTerm: 'Assister à',
    portugueseFalseFriend: 'Dar assistência / prestar socorro',
    correctPortugueseMeaning: 'Comparecer / presenciar / assistir',
    howToSayInFrench: 'Aider / porter secours',
    category: 'faux_ami',
    explanationPt: '"Assister à un concert" é ir ao concerto, não dar apoio aos músicos.',
    severity: 'medium',
  },
  {
    id: 'pi-4',
    frenchTerm: 'Le voyage (masculin)',
    portugueseFalseFriend: 'A viagem (feminino em PT)',
    correctPortugueseMeaning: 'Gênero invertido: em francês é MASCULINO',
    howToSayInFrench: 'Un bon voyage / Ce voyage',
    category: 'genre',
    explanationPt: 'A quase totalidade das palavras terminadas em -age em francês são masculinas (le fromage, le garage, le voyage).',
    severity: 'high',
  },
  {
    id: 'pi-5',
    frenchTerm: 'La fin (féminin)',
    portugueseFalseFriend: 'O fim (masculino em PT)',
    correctPortugueseMeaning: 'Gênero invertido: em francês é FEMININO',
    howToSayInFrench: 'La fin / Une fin heureuse',
    category: 'genre',
    explanationPt: 'Diz-se "la fin" e nunca "le fin" quando se refere ao término ou desfecho.',
    severity: 'medium',
  },
];

@Injectable({
  providedIn: 'root',
})
export class LearnerProfileService {
  readonly profile = signal<LearnerProfile>(INITIAL_PROFILE);
  readonly words = signal<LearnerWord[]>(INITIAL_WORDS);
  readonly interferenceRadar = signal<PortugueseInterferenceItem[]>(INITIAL_INTERFERENCE_RADAR);

  // Derived metrics
  readonly learningWordsCount = computed(() => this.words().filter((w) => w.state === 'learning').length);
  readonly knownWordsCount = computed(() => this.words().filter((w) => w.state === 'known').length);
  readonly masteredWordsCount = computed(() => this.words().filter((w) => w.state === 'mastered').length);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedProfile = localStorage.getItem('lingua_learner_profile');
      if (savedProfile) {
        try {
          this.profile.set(JSON.parse(savedProfile));
        } catch {
          // keep initial
        }
      }
      const savedWords = localStorage.getItem('lingua_learner_words');
      if (savedWords) {
        try {
          this.words.set(JSON.parse(savedWords));
        } catch {
          // keep initial
        }
      }

      // Asynchronously hydrate from server persistence store
      this.syncFromServer();
    }
  }

  private syncFromServer(): void {
    if (typeof window === 'undefined' || typeof fetch === 'undefined') return;
    fetch('/api/user/data')
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.success && payload.data) {
          if (payload.data.profile) {
            this.profile.set(payload.data.profile);
            localStorage.setItem('lingua_learner_profile', JSON.stringify(payload.data.profile));
          }
          if (payload.data.words && Array.isArray(payload.data.words)) {
            this.words.set(payload.data.words);
            localStorage.setItem('lingua_learner_words', JSON.stringify(payload.data.words));
          }
        }
      })
      .catch(() => {
        // Fall back gracefully to local storage
      });
  }

  private persistToServer(): void {
    if (typeof window === 'undefined' || typeof fetch === 'undefined') return;
    fetch('/api/user/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        profile: this.profile(),
        words: this.words(),
      }),
    }).catch(() => {
      // Offline fallback: data is already safely stored in localStorage
    });
  }

  updateWordClassification(
    french: string,
    action: 'mark_unknown' | 'want_to_learn' | 'mark_known' | 'mark_uncertain',
    contextSentence: string,
    translationPt: string,
    isFalseFriend = false,
    falseFriendNote?: string
  ): void {
    const list = [...this.words()];
    const existingIndex = list.findIndex((w) => w.french.toLowerCase() === french.toLowerCase());

    if (existingIndex >= 0) {
      const word = list[existingIndex];
      const nextState = transitionVocabularyState(word.state, action);
      list[existingIndex] = {
        ...word,
        state: nextState,
        encounterCount: word.encounterCount + 1,
        lastEncountered: new Date().toISOString().split('T')[0],
      };
    } else {
      const nextState = transitionVocabularyState('unseen', action);
      list.unshift({
        id: `w-${Date.now()}`,
        french,
        lemma: french.toLowerCase(),
        translationPt: translationPt || 'Traduction en contexte',
        state: nextState,
        encounterCount: 1,
        lastEncountered: new Date().toISOString().split('T')[0],
        contextSentence,
        isFalseFriend,
        falseFriendNote,
      });
    }

    this.words.set(list);
    this.saveWords();
  }

  recordStoryCompleted(storyId: string, readingMinutes: number, score: number): void {
    this.profile.update((p) => ({
      ...p,
      storiesCompleted: p.storiesCompleted + 1,
      totalReadingMinutes: p.totalReadingMinutes + readingMinutes,
      vocabularyMetrics: {
        ...p.vocabularyMetrics,
        known: p.vocabularyMetrics.known + (score >= 75 ? 2 : 1),
      },
      lastSyncedAt: new Date().toISOString(),
    }));
    this.saveProfile();
  }

  recordListeningCompleted(minutes: number): void {
    this.profile.update((p) => ({
      ...p,
      totalListeningMinutes: p.totalListeningMinutes + minutes,
      lastSyncedAt: new Date().toISOString(),
    }));
    this.saveProfile();
  }

  private saveProfile(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lingua_learner_profile', JSON.stringify(this.profile()));
      this.persistToServer();
    }
  }

  private saveWords(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lingua_learner_words', JSON.stringify(this.words()));
      this.persistToServer();
    }
  }
}
