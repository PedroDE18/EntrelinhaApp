import { ChangeDetectionStrategy, Component, inject, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { StoryService } from '../core/services/story';
import { SpeechNarrationService } from '../core/services/speech';
import { I18nService } from '../core/services/i18n';
import { DifficultyCategory, Story, LearnerWord, SrsRating } from '../core/models';
import { detectQuestionDifficultyCategory } from '../core/adaptive-learning';

@Component({
  selector: 'app-progress-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="space-y-10">
      <!-- Section Header -->
      <div class="space-y-1.5 border-b border-neutral-200 dark:border-neutral-800/80 pb-6">
        <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          <mat-icon class="text-xs !w-3.5 !h-3.5">insights</mat-icon>
          <span>Diagnostic & Progression</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-serif font-medium text-neutral-900 dark:text-neutral-50 tracking-tight">
          {{ i18n.t('progress.title') }}
        </h1>
        <p class="text-xs sm:text-sm font-reading text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
          {{ i18n.t('progress.subtitle') }}
        </p>
      </div>

      <!-- CEFR Dual Proficiency Matrix -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Reading Proficiency -->
        <div class="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {{ i18n.t('progress.reading_matrix_title') }}
            </span>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
              CEFR {{ profile().readingCEFR }}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ i18n.t('progress.reading_matrix_status') }}</span>
              <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500">~135 mots/min</span>
            </div>
            <!-- CEFR Scale Bar -->
            <div class="grid grid-cols-6 gap-1.5 h-1.5 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <div class="bg-neutral-900 dark:bg-neutral-100 h-full"></div>
              <div class="bg-neutral-900 dark:bg-neutral-100 h-full"></div>
              <div class="bg-neutral-900 dark:bg-neutral-100 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
            </div>
            <div class="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              <span>A1</span><span>A2</span><span class="font-bold text-neutral-900 dark:text-neutral-100">B1</span><span>B2</span><span>C1</span><span>C2</span>
            </div>
          </div>

          <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
            {{ i18n.t('progress.reading_matrix_desc') }}
          </p>
        </div>

        <!-- Listening Proficiency -->
        <div class="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              {{ i18n.t('progress.listening_matrix_title') }}
            </span>
            <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
              CEFR {{ profile().listeningCEFR }}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ i18n.t('progress.listening_matrix_status') }}</span>
              <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500">Modéré (0.9x)</span>
            </div>
            <!-- CEFR Scale Bar -->
            <div class="grid grid-cols-6 gap-1.5 h-1.5 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <div class="bg-neutral-900 dark:bg-neutral-100 h-full"></div>
              <div class="bg-neutral-900 dark:bg-neutral-100 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
              <div class="bg-neutral-200 dark:bg-neutral-800 h-full"></div>
            </div>
            <div class="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              <span>A1</span><span class="font-bold text-neutral-900 dark:text-neutral-100">A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span>
            </div>
          </div>

          <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
            {{ i18n.t('progress.listening_matrix_desc') }}
          </p>
        </div>
      </section>

      <!-- Literary Spaced Repetition (SRS Flash-Review) -->
      <section id="srs-review" class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <mat-icon class="text-xs !w-3.5 !h-3.5">auto_stories</mat-icon>
              <span>Sessão Diária de Fixação</span>
            </div>
            <h2 class="text-xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
              Flash-Review Literário em Contexto
            </h2>
            <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
              Repetição espaçada inteligente baseada em frases narrativas autênticas e contraste sistemático com o português.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="text-[11px] font-mono px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-medium">
              {{ srsDueWords().length }} para revisar hoje
            </span>
          </div>
        </div>

        @if (srsDueWords().length > 0 && currentSrsIndex() < srsDueWords().length) {
          @let word = srsDueWords()[currentSrsIndex()];
          <div class="p-6 sm:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-6">
            <!-- Progress indicator inside review -->
            <div class="flex items-center justify-between text-xs font-mono text-neutral-400 dark:text-neutral-500">
              <span>Cartão {{ currentSrsIndex() + 1 }} de {{ srsDueWords().length }}</span>
              <span class="text-[10px] uppercase">{{ word.state === 'learning' ? 'Em aprendizado' : 'Consolidação' }}</span>
            </div>

            <!-- Cloze narrative context sentence -->
            <div class="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-center space-y-2">
              <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Contexto na narrativa
              </span>
              <p class="font-reading italic text-base sm:text-lg text-neutral-900 dark:text-neutral-100 leading-relaxed">
                « {{ getClozeSentence(word) }} »
              </p>
            </div>

            <!-- Hidden answer / Revealed state -->
            @if (!srsCardRevealed()) {
              <div class="text-center pt-2">
                <button
                  type="button"
                  (click)="revealSrsCard()"
                  class="px-6 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-2">
                  <mat-icon class="text-xs !w-3.5 !h-3.5">visibility</mat-icon>
                  <span>Revelar Vocábulo & Tradução</span>
                </button>
              </div>
            } @else {
              <!-- Revealed details -->
              <div class="space-y-4 animate-in fade-in duration-200">
                <div class="text-center space-y-1">
                  <div class="flex items-center justify-center gap-2">
                    <span class="text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
                      {{ word.french }}
                    </span>
                    <button
                      type="button"
                      (click)="speech.speakWord(word.french)"
                      title="Ouvir pronúncia autêntica em francês"
                      class="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 cursor-pointer">
                      <mat-icon class="text-sm !w-4 !h-4">volume_up</mat-icon>
                    </button>
                  </div>
                  <p class="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {{ word.translationPt }}
                  </p>
                  @if (word.isFalseFriend) {
                    <p class="text-xs font-mono text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 p-2.5 rounded-xl max-w-md mx-auto border border-neutral-200 dark:border-neutral-700">
                      ⚠️ <strong>Falso Cognato:</strong> {{ word.falseFriendNote || 'Sentido diferente do esperado em português.' }}
                    </p>
                  }
                </div>

                <!-- SRS Rating Buttons (SM-2 / FSRS) -->
                <div class="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  <span class="text-[10px] font-mono uppercase tracking-widest text-center block text-neutral-400 dark:text-neutral-500">
                    Como foi a sua recordação deste termo?
                  </span>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      (click)="rateSrsCard('again')"
                      class="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100 text-xs font-medium transition-all cursor-pointer">
                      <span>Novamente</span>
                      <span class="text-[10px] font-mono block text-neutral-400 mt-0.5">1 dia</span>
                    </button>
                    <button
                      type="button"
                      (click)="rateSrsCard('hard')"
                      class="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100 text-xs font-medium transition-all cursor-pointer">
                      <span>Difícil</span>
                      <span class="text-[10px] font-mono block text-neutral-400 mt-0.5">curto prazo</span>
                    </button>
                    <button
                      type="button"
                      (click)="rateSrsCard('good')"
                      class="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100 text-xs font-medium transition-all cursor-pointer">
                      <span>Bom</span>
                      <span class="text-[10px] font-mono block text-neutral-400 mt-0.5">espaçado</span>
                    </button>
                    <button
                      type="button"
                      (click)="rateSrsCard('easy')"
                      class="p-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100 text-xs font-medium transition-all cursor-pointer">
                      <span>Fácil</span>
                      <span class="text-[10px] font-mono block text-neutral-400 mt-0.5">longo prazo</span>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <!-- All caught up state -->
          <div class="p-8 text-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3">
            <mat-icon class="text-3xl text-emerald-500 !w-8 !h-8">task_alt</mat-icon>
            <div class="space-y-1">
              <h3 class="font-serif font-medium text-base text-neutral-900 dark:text-neutral-100">
                Sua sessão diária está em dia.
              </h3>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto font-reading">
                Todos os termos agendados foram revisados. Novos vocábulos serão propostos conforme suas próximas leituras.
              </p>
            </div>
            <button
              type="button"
              (click)="restartSrsReview()"
              class="px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer font-mono">
              Praticar novamente com todos os termos
            </button>
          </div>
        }
      </section>

      <!-- Vocabulary Funnel (Section 9) -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">bubble_chart</mat-icon>
            <span>{{ i18n.t('progress.funnel_badge') }}</span>
          </div>
          <h2 class="text-xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
            {{ i18n.t('progress.funnel_title') }}
          </h2>
          <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
            {{ i18n.t('progress.funnel_subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">{{ i18n.t('progress.funnel_encountered') }}</span>
            <div class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100 mt-1">
              {{ profile().vocabularyMetrics.encountered }}
            </div>
            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 block">{{ i18n.t('progress.funnel_encountered_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">{{ i18n.t('progress.funnel_learning') }}</span>
            <div class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100 mt-1">
              {{ learnerService.learningWordsCount() }}
            </div>
            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 block">{{ i18n.t('progress.funnel_learning_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">{{ i18n.t('progress.funnel_known') }}</span>
            <div class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100 mt-1">
              {{ profile().vocabularyMetrics.known }}
            </div>
            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 block">{{ i18n.t('progress.funnel_known_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono uppercase text-neutral-400 dark:text-neutral-500">{{ i18n.t('progress.funnel_mastered') }}</span>
            <div class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100 mt-1">
              {{ profile().vocabularyMetrics.mastered }}
            </div>
            <span class="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5 block">{{ i18n.t('progress.funnel_mastered_sub') }}</span>
          </div>
        </div>

        <!-- Literary Notebook: Carnet de Mots & Export Section -->
        <div class="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                <span>Carnet de Mots — Caderno de Leituras</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {{ learnerService.words().length }} vocábulos
                </span>
              </h3>
              <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
                Seu léxico coletado em contexto, pronto para revisão fonética e exportação.
              </p>
            </div>

            <!-- Export Buttons (Markdown & Anki TSV) -->
            <div class="flex items-center gap-2">
              <button
                type="button"
                (click)="exportMarkdown()"
                [disabled]="learnerService.words().length === 0"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">description</mat-icon>
                <span>Exportar .md</span>
              </button>

              <button
                type="button"
                (click)="exportAnkiTsv()"
                [disabled]="learnerService.words().length === 0"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
                <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">file_download</mat-icon>
                <span>Exportar Anki (.tsv)</span>
              </button>
            </div>
          </div>

          <!-- Filter Pills for Notebook -->
          <div class="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              (click)="vocabFilter.set('all')"
              [class]="vocabFilter() === 'all' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
              class="px-3 py-1 rounded-full transition-colors font-mono text-[11px]">
              Todos ({{ learnerService.words().length }})
            </button>
            <button
              type="button"
              (click)="vocabFilter.set('learning')"
              [class]="vocabFilter() === 'learning' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
              class="px-3 py-1 rounded-full transition-colors font-mono text-[11px]">
              Quero Aprender ({{ learnerService.learningWordsCount() }})
            </button>
            <button
              type="button"
              (click)="vocabFilter.set('false_friends')"
              [class]="vocabFilter() === 'false_friends' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'"
              class="px-3 py-1 rounded-full transition-colors font-mono text-[11px]">
              Falsos Amigos ({{ falseFriendsCount() }})
            </button>
          </div>

          <!-- Vocabulary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            @for (w of filteredNotebookWords(); track w.id) {
              <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] hover:border-neutral-400 dark:hover:border-neutral-600 transition-all space-y-2">
                <div class="flex items-start justify-between gap-2">
                  <div class="space-y-0.5">
                    <div class="flex items-center gap-2">
                      <span class="font-serif font-medium text-base text-neutral-900 dark:text-neutral-100">{{ w.french }}</span>
                      <button
                        type="button"
                        (click)="speech.speakWord(w.french)"
                        title="Ouvir pronúncia autêntica em francês"
                        class="p-1 rounded text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
                        <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">volume_up</mat-icon>
                      </button>
                      @if (w.isFalseFriend) {
                        <span class="text-[9px] font-mono font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-1.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                          Falso Cognato
                        </span>
                      }
                    </div>
                    <span class="text-xs font-medium text-neutral-700 dark:text-neutral-300 block">
                      {{ w.translationPt }}
                    </span>
                  </div>

                  <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 shrink-0">
                    {{ w.encounterCount }}× visto
                  </span>
                </div>

                @if (w.contextSentence) {
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 font-reading italic line-clamp-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                    « {{ w.contextSentence }} »
                  </p>
                }
              </div>
            } @empty {
              <div class="col-span-full py-8 text-center text-xs text-neutral-400 space-y-1">
                <p>Nenhum vocábulo corresponde ao filtro selecionado.</p>
                <p class="italic">Clique nas palavras durante a leitura para adicioná-las ao seu Carnet de Mots.</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Radar de Dificuldades Contrastivas -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">query_stats</mat-icon>
            <span>Diagnóstico Adaptativo Lusófono</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
            Radar de Interferência Linguística
          </h2>
          <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Monitoramento em tempo real dos 7 principais pontos de atrito cognitivo entre a gramática do português brasileiro e o francês padrão.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for (item of difficultyRadarList(); track item.category) {
            <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="text-sm font-serif font-medium text-neutral-900 dark:text-neutral-100">
                    {{ item.labelPt }}
                  </h3>
                  <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block">
                    {{ item.labelFr }}
                  </span>
                </div>

                <span
                  class="text-[9px] font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#161616] text-neutral-800 dark:text-neutral-200 shrink-0">
                  {{ getTrendLabel(item.trend, item.masteryScore) }}
                </span>
              </div>

              <!-- Mastery bar -->
              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="text-neutral-400 dark:text-neutral-500">Domínio</span>
                  <span class="font-medium text-neutral-900 dark:text-neutral-100">{{ item.masteryScore }}%</span>
                </div>
                <div class="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div
                    class="h-full rounded-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-300"
                    [style.width.%]="item.masteryScore"></div>
                </div>
                <div class="flex justify-between text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                  <span>{{ item.attemptsCount }} tentativas</span>
                  <span>{{ item.correctCount }} acertos / {{ item.errorCount }} erros</span>
                </div>
              </div>

              <p class="text-xs font-reading text-neutral-600 dark:text-neutral-400 pt-1 leading-relaxed border-t border-neutral-200/60 dark:border-neutral-800/60">
                {{ item.descriptionPt }}
              </p>

              @if (findStoryForCategory(item.category); as recStory) {
                <div class="pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px]">
                  <span class="text-neutral-400 font-mono text-[10px]">Texto sugerido:</span>
                  <a
                    [routerLink]="['/read', recStory.id]"
                    class="font-medium text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1">
                    <span class="truncate max-w-[150px]">{{ recStory.title }}</span>
                    <mat-icon class="text-xs !w-3 !h-3">arrow_forward</mat-icon>
                  </a>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- Histórico Recente de Avaliações -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">history_edu</mat-icon>
              <span>Histórico de Leituras</span>
            </div>
            <h2 class="text-xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
              Sessões de Leitura & Questionários Recentes
            </h2>
          </div>
          <span class="text-xs font-mono text-neutral-400 dark:text-neutral-500">
            Total: {{ assessmentHistory().length }}
          </span>
        </div>

        @if (assessmentHistory().length > 0) {
          <div class="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            @for (session of assessmentHistory(); track session.id) {
              <div class="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="font-serif font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                      {{ session.storyTitle }}
                    </span>
                    <span class="text-[10px] font-mono text-neutral-400">
                      {{ session.completedAt.split('T')[0] }}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-1.5 items-center">
                    <span class="text-[10px] font-mono text-neutral-400">Tópicos:</span>
                    @for (cat of session.testedCategories; track cat) {
                      <span class="px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[10px]">
                        {{ cat }}
                      </span>
                    }
                  </div>
                </div>

                <div class="flex items-center gap-4 sm:text-right shrink-0">
                  <div>
                    <span class="text-[10px] font-mono text-neutral-400 block">Velocidade</span>
                    <span class="font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      {{ session.estimatedWpm }} ppm
                    </span>
                  </div>

                  <div class="w-px h-6 bg-neutral-200 dark:bg-neutral-800"></div>

                  <div>
                    <span class="text-[10px] font-mono text-neutral-400 block">Aproveitamento</span>
                    <span class="font-mono font-medium text-neutral-900 dark:text-neutral-100 text-sm">
                      {{ session.scorePercent }}%
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="p-8 text-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs text-neutral-400 space-y-2">
            <p>Nenhuma sessão de leitura com questionário concluída ainda.</p>
            <a routerLink="/library" class="inline-flex items-center gap-1 text-neutral-900 dark:text-neutral-100 font-mono hover:underline">
              <span>Escolha uma história na biblioteca</span>
              <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
            </a>
          </div>
        }
      </section>
    </div>
  `,
})
export class ProgressView {
  readonly learnerService = inject(LearnerProfileService);
  readonly storyService = inject(StoryService);
  readonly speech = inject(SpeechNarrationService);
  readonly i18n = inject(I18nService);

  readonly profile = this.learnerService.profile;
  readonly difficultyRadarList = computed(() => Object.values(this.learnerService.difficultyRadar()));
  readonly assessmentHistory = this.learnerService.assessmentHistory;

  readonly vocabFilter = signal<'all' | 'learning' | 'false_friends'>('all');

  // Literary SRS Review State
  readonly srsDueWords = computed(() => {
    const list = this.learnerService.dueReviewWords();
    if (list.length > 0) return list;
    return this.learnerService.words().slice(0, 6);
  });
  readonly currentSrsIndex = signal<number>(0);
  readonly srsCardRevealed = signal<boolean>(false);

  revealSrsCard(): void {
    this.srsCardRevealed.set(true);
  }

  rateSrsCard(rating: SrsRating): void {
    const words = this.srsDueWords();
    const idx = this.currentSrsIndex();
    if (idx < words.length) {
      const word = words[idx];
      this.learnerService.recordWordReview(word.id, rating);
    }
    this.srsCardRevealed.set(false);
    this.currentSrsIndex.update((i) => i + 1);
  }

  restartSrsReview(): void {
    this.currentSrsIndex.set(0);
    this.srsCardRevealed.set(false);
  }

  getClozeSentence(word: LearnerWord): string {
    if (!word.contextSentence) return `... ${word.french} ...`;
    const escaped = word.french.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'gi');
    const replaced = word.contextSentence.replace(regex, '[ ... ]');
    return replaced !== word.contextSentence ? replaced : `[ ... ] — ${word.contextSentence}`;
  }

  readonly falseFriendsCount = computed(() => {
    return this.learnerService.words().filter((w) => !!w.isFalseFriend).length;
  });

  readonly filteredNotebookWords = computed(() => {
    const list = this.learnerService.words();
    const filter = this.vocabFilter();
    if (filter === 'learning') {
      return list.filter((w) => w.state === 'learning');
    }
    if (filter === 'false_friends') {
      return list.filter((w) => !!w.isFalseFriend);
    }
    return list;
  });

  exportMarkdown(): void {
    const words = this.learnerService.words();
    let md = '# Entrelinha — Carnet de Mots (Caderno de Leituras)\n\n';
    md += `*Data de Exportação: ${new Date().toLocaleDateString('pt-BR')}*\n`;
    md += `*Total de Vocábulos Coletados: ${words.length}*\n\n`;
    md += '| Vocábulo Francês | Tradução em Português | Contexto Narrativo Original | Falso Cognato? |\n';
    md += '|---|---|---|---|\n';
    for (const w of words) {
      const ff = w.isFalseFriend ? 'Sim (Atenção)' : 'Não';
      const cleanCtx = (w.contextSentence || '').replace(/\|/g, '-');
      md += `| **${w.french}** | ${w.translationPt} | *${cleanCtx}* | ${ff} |\n`;
    }
    this.downloadFile(md, 'entrelinha-carnet-de-mots.md', 'text/markdown');
  }

  exportAnkiTsv(): void {
    const words = this.learnerService.words();
    if (words.length === 0) return;
    let tsv = '';
    for (const w of words) {
      const front = (w.french || '').replace(/[\t\r\n]+/g, ' ').trim();
      const cleanPt = (w.translationPt || '').replace(/[\t\r\n]+/g, ' ').trim();
      const cleanCtx = (w.contextSentence || '').replace(/[\t\r\n]+/g, ' ').trim();
      const back = `${cleanPt}<br><small><i>« ${cleanCtx} »</i></small>${w.isFalseFriend ? '<br><span style="color:#c92a2a">⚠️ Falso Cognato</span>' : ''}`;
      const tag = w.isFalseFriend ? 'entrelinha_falso_cognato' : 'entrelinha_vocabulario';
      tsv += `${front}\t${back}\t${tag}\n`;
    }
    this.downloadFile(tsv, 'entrelinha-anki-deck.tsv', 'text/tab-separated-values');
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    if (typeof window === 'undefined' || !document) return;
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  findStoryForCategory(cat: DifficultyCategory): Story | undefined {
    const stories = this.storyService.stories();
    return stories.find((s) => {
      if (s.targetDifficultyCategories?.includes(cat)) return true;
      return s.comprehensionQuestions?.some(
        (q) => detectQuestionDifficultyCategory(q) === cat
      );
    });
  }

  getMasteryBarColor(score: number): string {
    if (score >= 80) return 'bg-[#2E8540] dark:bg-[#4ADE80]';
    if (score >= 60) return 'bg-[#C07D2B] dark:bg-[#E6B373]';
    return 'bg-[#B71C1C] dark:bg-[#F87171]';
  }

  getTrendBadgeClass(trend: string, score: number): string {
    if (trend === 'improving') {
      return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
    }
    if (trend === 'declining') {
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300';
    }
    if (score >= 75) {
      return 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300';
    }
    return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
  }

  getTrendLabel(trend: string, score: number): string {
    if (trend === 'improving') return '↑ Em evolução';
    if (trend === 'declining') return '↓ Atenção necessária';
    if (trend === 'untested') return '○ Linha de base';
    if (score >= 75) return '✓ Dominado';
    return '⟳ Em consolidação';
  }
}
