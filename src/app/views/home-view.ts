import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoryService } from '../core/services/story';
import { LearnerProfileService } from '../core/services/learner-profile';
import { SpeechNarrationService } from '../core/services/speech';
import { I18nService } from '../core/services/i18n';
import { rankStoriesForLearner, getRecommendedFocusAreas } from '../core/adaptive-learning';

@Component({
  selector: 'app-home-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="space-y-12 sm:space-y-16">
      <!-- Stoic Daily Reflection Card -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] transition-all">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-3 mb-4">
          <span class="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            Pensée du Jour · Reflexão Literária
          </span>
          <span class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            Marcel Proust
          </span>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <blockquote class="space-y-1.5 max-w-2xl">
            <p class="text-lg sm:text-xl font-serif italic text-neutral-900 dark:text-neutral-100 leading-relaxed">
              « La lecture est au seuil de la vie spirituelle ; elle peut nous y introduire : elle ne la constitue pas. »
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 font-reading">
              A leitura nos coloca no limiar do entendimento; aprenda com serenidade, frase por frase.
            </p>
          </blockquote>
          <button
            type="button"
            (click)="speech.speakExcerpt('La lecture est au seuil de la vie spirituelle.')"
            title="Ouvir reflexão com voz natural"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all self-start sm:self-auto shrink-0">
            <mat-icon class="text-xs !w-3.5 !h-3.5">volume_up</mat-icon>
            <span>Ouvir</span>
          </button>
        </div>
      </section>

      <!-- Hero: Featured Story of the Day (Swiss Editorial Asymmetric Grid) -->
      <section class="p-6 sm:p-8 lg:p-10 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] transition-all">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <!-- Text details -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
              <span class="text-neutral-900 dark:text-neutral-100 font-semibold">{{ i18n.t('home.story_of_the_day') }}</span>
              <span>·</span>
              <span>CEFR {{ featuredStory.estimatedCEFR }}</span>
              <span>·</span>
              <span>{{ i18n.t('home.reading_time', { minutes: featuredStory.readingMinutes }) }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
              {{ featuredStory.title }}
            </h1>

            <p class="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              {{ i18n.t('home.by_author', { author: featuredStory.author, source: featuredStory.sourceLabel }) }}
            </p>

            <p class="text-sm sm:text-base font-reading text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
              {{ featuredStory.excerpt }}
            </p>

            <div class="pt-4 flex flex-wrap items-center gap-3">
              <a
                [routerLink]="['/read', featuredStory.id]"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
                <mat-icon class="text-sm !w-4 !h-4">auto_stories</mat-icon>
                <span>{{ i18n.t('home.btn_start_reading') }}</span>
              </a>

              <button
                type="button"
                (click)="speech.speakExcerpt(featuredStory.excerpt)"
                class="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-[#141414] hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                <mat-icon class="text-sm !w-4 !h-4">volume_up</mat-icon>
                <span>{{ i18n.t('home.btn_listen_excerpt') }}</span>
              </button>
            </div>
          </div>

          <!-- Cover Image Minimal Presentation -->
          <div class="lg:col-span-5 flex justify-center items-center">
            <div class="relative w-full max-w-[260px] sm:max-w-[300px] aspect-[4/5] overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
              <img
                [src]="featuredStory.coverImage || featuredStory.coverImageUrl || '/images/cover-marais.svg'"
                [alt]="featuredStory.title"
                class="w-full h-full object-cover" />
              <div class="absolute bottom-3 left-3 bg-neutral-900/90 text-white dark:bg-neutral-100/90 dark:text-neutral-900 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-mono">
                {{ i18n.t('home.serialized_badge', { current: featuredStory.serializedInfo?.episodeNumber || 1, total: featuredStory.serializedInfo?.totalEpisodes || 3 }) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Diagnostic Starting Point Banner -->
      <section class="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all">
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
            <mat-icon class="text-xs !w-3.5 !h-3.5">explore</mat-icon>
            <span>Nivelamento Diagnóstico</span>
          </div>
          <h2 class="text-base sm:text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100">
            Descubra seu Ponto de Partida no Francês
          </h2>
          <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Responda a 6 questões práticas para calibrar seu nível de leitura (A1–B2) e mapear antecipadamente suas armadilhas contrastivas.
          </p>
        </div>

        <a
          routerLink="/placement"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shrink-0">
          <span>Fazer Teste (3 min)</span>
          <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
        </a>
      </section>

      <!-- Portuguese-French Contrast Spotlight (Piège Lusophone) -->
      <section class="p-6 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] transition-all">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <mat-icon class="text-xs !w-3.5 !h-3.5">error_outline</mat-icon>
              <span>{{ i18n.t('home.false_friend_badge') }}</span>
            </div>
            <h2 class="text-lg sm:text-xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
              « Actuellement » ≠ « Na verdade »
            </h2>
            <p class="text-xs sm:text-sm font-reading text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
              Muitos brasileiros traduzem <em class="font-semibold text-neutral-900 dark:text-neutral-100">actuellement</em> como "na verdade", influenciados pelo inglês <em>actually</em>. Em francês, significa estritamente <strong>"neste momento / atualmente"</strong>. Para dizer "na verdade", use <strong>"en fait"</strong> ou <strong>"en réalité"</strong>.
            </p>
          </div>

          <button
            type="button"
            (click)="playContrastExample()"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors shrink-0 touch-target-min">
            <mat-icon class="text-sm !w-4 !h-4 shrink-0">volume_up</mat-icon>
            <span>{{ i18n.t('home.btn_audio_pronunciation') }}</span>
          </button>
        </div>
      </section>

      <!-- Swiss Minimalist Stats Grid -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div class="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414]">
          <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">{{ i18n.t('home.stats.reading_level') }}</span>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ profile().readingCEFR }}</span>
            <span class="text-[11px] text-neutral-400 dark:text-neutral-500">{{ i18n.t('home.stats.reading_level_label') }}</span>
          </div>
          <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">{{ i18n.t('home.stats.reading_level_desc') }}</span>
        </div>

        <div class="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414]">
          <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">{{ i18n.t('home.stats.listening_level') }}</span>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ profile().listeningCEFR }}</span>
            <span class="text-[11px] text-neutral-400 dark:text-neutral-500">{{ i18n.t('home.stats.listening_level_label') }}</span>
          </div>
          <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">{{ i18n.t('home.stats.listening_level_desc') }}</span>
        </div>

        <div class="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414]">
          <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">{{ i18n.t('home.stats.active_learning') }}</span>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ learnerService.learningWordsCount() }}</span>
            <span class="text-[11px] text-neutral-400 dark:text-neutral-500">{{ i18n.t('home.stats.words_unit') }}</span>
          </div>
          <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">{{ i18n.t('home.stats.active_learning_desc') }}</span>
        </div>

        <div class="p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414]">
          <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">{{ i18n.t('home.stats.streak') }}</span>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-mono font-medium text-neutral-900 dark:text-neutral-100">{{ profile().currentStreakDays }}</span>
            <span class="text-[11px] text-neutral-400 dark:text-neutral-500">{{ i18n.t('home.stats.streak_unit') }}</span>
          </div>
          <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 block">{{ i18n.t('home.stats.stories_completed', { count: profile().storiesCompleted }) }}</span>
        </div>
      </section>

      <!-- Adaptive Recommendations -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
          <div>
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-1">
              Recomendações Personalizadas
            </span>
            <h2 class="text-xl sm:text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
              Fortaleça seus pontos sensíveis
            </h2>
          </div>
          <a routerLink="/library" class="text-xs font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
            {{ i18n.t('home.see_all_library') }} →
          </a>
        </div>

        <!-- Focus areas badges -->
        @if (focusAreas().length > 0) {
          <div class="flex flex-wrap items-center gap-2 p-3.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] text-xs">
            <span class="text-[11px] font-mono text-neutral-400 dark:text-neutral-500">Foco prioritário:</span>
            @for (area of focusAreas(); track area.category) {
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-[11px] font-medium text-neutral-800 dark:text-neutral-200">
                <span class="w-1.5 h-1.5 rounded-full" [class]="area.masteryScore < 60 ? 'bg-amber-500' : 'bg-emerald-500'"></span>
                <span>{{ area.categoryLabelPt }}</span>
                <span class="font-mono text-neutral-400 dark:text-neutral-500 text-[10px]">({{ area.masteryScore }}%)</span>
              </span>
            }
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (story of secondaryStories(); track story.id) {
            <article class="flex flex-col justify-between p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 group">
              <div class="space-y-3">
                <div class="overflow-hidden rounded-xl aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <img
                    [src]="story.coverImage || story.coverImageUrl || '/images/cover-marais.svg'"
                    [alt]="story.title"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                </div>

                <div class="flex items-center gap-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                  <span class="font-semibold text-neutral-900 dark:text-neutral-100">CEFR {{ story.estimatedCEFR }}</span>
                  <span>·</span>
                  <span>{{ i18n.t('home.reading_time', { minutes: story.readingMinutes }) }}</span>
                  <span>·</span>
                  <span class="truncate">{{ story.genre }}</span>
                </div>

                <h3 class="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:underline">
                  {{ story.title }}
                </h3>

                <p class="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                  {{ story.author }}
                </p>

                <p class="text-xs font-reading text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {{ story.excerpt }}
                </p>
              </div>

              <div class="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
                <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 truncate max-w-[130px]">{{ story.sourceLabel }}</span>
                <a
                  [routerLink]="['/read', story.id]"
                  class="text-xs font-medium text-neutral-900 dark:text-neutral-100 inline-flex items-center gap-1 group-hover:underline">
                  <span>{{ i18n.t('home.btn_read_card') }}</span>
                  <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
                </a>
              </div>
            </article>
          }
        </div>
      </section>
    </div>
  `,
})
export class HomeView {
  readonly storyService = inject(StoryService);
  readonly learnerService = inject(LearnerProfileService);
  readonly speech = inject(SpeechNarrationService);
  readonly i18n = inject(I18nService);

  readonly profile = this.learnerService.profile;
  readonly featuredStory = this.storyService.getFeaturedStory();

  readonly secondaryStories = computed(() => {
    const all = this.storyService.stories();
    const ranked = rankStoriesForLearner(all, this.profile());
    const featuredId = this.featuredStory.id;
    return ranked.filter((s) => s.id !== featuredId).slice(0, 3);
  });

  readonly focusAreas = computed(() =>
    getRecommendedFocusAreas(this.profile(), this.storyService.stories())
  );

  playContrastExample(): void {
    this.speech.speakExcerpt("Actuellement, l'inspectrice examine le carnet. En fait, tout était prémédité.");
  }
}
