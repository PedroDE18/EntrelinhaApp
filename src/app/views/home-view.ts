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
      <!-- Hero: Featured Story of the Day -->
      <section class="relative paper-page rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm transition-colors">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Text details -->
          <div class="lg:col-span-7 space-y-4">
            <div class="flex items-center gap-2 text-xs font-medium text-[#6C645C] dark:text-[#9C9387]">
              <span class="uppercase tracking-widest text-[#9C3823] dark:text-[#DDA15E] font-semibold">{{ i18n.t('home.story_of_the_day') }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ i18n.t('home.level', { level: featuredStory.estimatedCEFR }) }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ i18n.t('home.reading_time', { minutes: featuredStory.readingMinutes }) }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ featuredStory.genre }}</span>
            </div>

            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight leading-tight">
              {{ featuredStory.title }}
            </h1>

            <p class="text-xs text-[#6C645C] dark:text-[#9C9387]">
              {{ i18n.t('home.by_author', { author: featuredStory.author, source: featuredStory.sourceLabel }) }}
            </p>

            <p class="text-base sm:text-lg font-reading text-[#3A342F] dark:text-[#D8D2C7] leading-relaxed max-w-2xl pt-1">
              {{ featuredStory.excerpt }}
            </p>

            <div class="pt-4 flex flex-wrap items-center gap-4">
              <a
                [routerLink]="['/read', featuredStory.id]"
                class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#231F1C] dark:bg-[#EAE4DA] dark:text-[#181513] rounded-xl hover:opacity-90 transition-opacity shadow-xs">
                <mat-icon class="text-lg leading-none !w-5 !h-5">auto_stories</mat-icon>
                <span>{{ i18n.t('home.btn_start_reading') }}</span>
              </a>

              <button
                type="button"
                (click)="speech.speakExcerpt(featuredStory.excerpt)"
                class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[#231F1C] dark:text-[#EAE4DA] bg-[#F7F4EE] dark:bg-[#1A1715] rounded-xl border border-[#DDD6C8] dark:border-[#38322C] hover:bg-[#EFE9DD] dark:hover:bg-[#2A2420] transition-colors">
                <mat-icon class="text-lg leading-none !w-5 !h-5">volume_up</mat-icon>
                <span>{{ i18n.t('home.btn_listen_excerpt') }}</span>
              </button>
            </div>
          </div>

          <!-- Cover Image -->
          <div class="lg:col-span-5 flex justify-center items-center">
            <div class="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5] overflow-hidden rounded-2xl book-cover-shadow border border-[#E6DFD3] dark:border-[#332D28] bg-[#1A1715]">
              <img
                [src]="featuredStory.coverImage || featuredStory.coverImageUrl || '/images/cover-marais.svg'"
                [alt]="featuredStory.title"
                class="w-full h-full object-cover" />
              <div class="absolute bottom-3 left-3 bg-[#181513]/90 backdrop-blur-xs px-3 py-1 rounded-md text-[11px] text-[#EAE4DA] border border-[#3E362F]">
                {{ i18n.t('home.serialized_badge', { current: featuredStory.serializedInfo?.episodeNumber || 1, total: featuredStory.serializedInfo?.totalEpisodes || 3 }) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Diagnostic Starting Point Banner -->
      <section class="paper-page rounded-xl p-5 border border-[#DECDB3] dark:border-[#42362C] bg-gradient-to-r from-[#F9F5EE] to-[#F4EDE0] dark:from-[#201C19] dark:to-[#1A1614] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-1.5 text-xs font-semibold text-[#9C3823] dark:text-[#DDA15E] uppercase tracking-wider">
            <mat-icon class="text-sm !w-4 !h-4">explore</mat-icon>
            <span>Teste de Nivelamento Diagnóstico</span>
          </div>
          <h2 class="text-base sm:text-lg font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
            Descubra seu Ponto de Partida no Francês
          </h2>
          <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] max-w-2xl leading-relaxed">
            Responda a 6 questões práticas para calibrar seu nível de leitura (A1–B2) e mapear antecipadamente suas armadilhas contrastivas.
          </p>
        </div>

        <a
          routerLink="/placement"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#231F1C] dark:bg-[#EAE4DA] dark:text-[#181513] hover:opacity-90 transition-opacity shrink-0 shadow-xs">
          <span>Fazer Teste (3 min)</span>
          <mat-icon class="text-sm !w-4 !h-4">arrow_forward</mat-icon>
        </a>
      </section>

      <!-- Portuguese-French Contrast Spotlight (Piège Lusophone / Falso Cognato) -->
      <section class="paper-page rounded-xl p-6 transition-colors">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="space-y-1.5">
            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
              <mat-icon class="text-sm leading-none !w-4 !h-4">warning_amber</mat-icon>
              <span>{{ i18n.t('home.false_friend_badge') }}</span>
            </div>
            <h2 class="text-lg sm:text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
              « Actuellement » ≠ « Na verdade »
            </h2>
            <p class="text-sm font-reading text-[#3A342F] dark:text-[#D8D2C7] leading-relaxed max-w-3xl">
              Muitos brasileiros traduzem <em class="font-semibold text-[#231F1C] dark:text-[#EAE4DA]">actuellement</em> como "na verdade", influenciados pelo inglês <em>actually</em>. Em francês, significa estritamente <strong>"neste momento / atualmente"</strong>. Para dizer "na verdade", use <strong>"en fait"</strong> ou <strong>"en réalité"</strong>.
            </p>
          </div>

          <button
            type="button"
            (click)="playContrastExample()"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#7A2A18] dark:text-[#F3D5A5] bg-[#F2E4D0] dark:bg-[#382D22] rounded-lg hover:bg-[#EBD8C0] dark:hover:bg-[#46382B] transition-colors shrink-0 touch-target-min">
            <mat-icon class="text-base leading-none !w-4 !h-4">hearing</mat-icon>
            <span>{{ i18n.t('home.btn_audio_pronunciation') }}</span>
          </button>
        </div>
      </section>

      <!-- Restrained Progress Summary -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl paper-page">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.reading_level') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().readingCEFR }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.reading_level_label') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.reading_level_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl paper-page">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.listening_level') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().listeningCEFR }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.listening_level_label') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.listening_level_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl paper-page">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.active_learning') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#9C3823] dark:text-[#DDA15E]">{{ learnerService.learningWordsCount() }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.words_unit') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.active_learning_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl paper-page">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.streak') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().currentStreakDays }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.streak_unit') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.stories_completed', { count: profile().storiesCompleted }) }}</span>
        </div>
      </section>

      <!-- Adaptive Recommendations: Tailored to Learner Difficulties -->
      <section class="space-y-6">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-1.5 text-xs font-semibold text-[#9C3823] dark:text-[#DDA15E] uppercase tracking-wider mb-1">
              <mat-icon class="text-sm !w-4 !h-4">auto_awesome</mat-icon>
              <span>Recomendações Personalizadas pelo Diagnóstico</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
              Fortaleça seus pontos sensíveis
            </h2>
            <p class="text-xs text-[#6C645C] dark:text-[#9C9387] mt-0.5">
              Histórias priorizadas pelo algoritmo adaptativo com base nos seus tópicos de maior interferência linguística.
            </p>
          </div>
          <a routerLink="/library" class="text-xs font-medium text-[#231F1C] dark:text-[#EAE4DA] hover:underline self-start sm:self-auto">
            {{ i18n.t('home.see_all_library') }}
          </a>
        </div>

        <!-- Focus areas badges -->
        @if (focusAreas().length > 0) {
          <div class="flex flex-wrap items-center gap-2 p-3.5 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] text-xs">
            <span class="text-[#8A8278] dark:text-[#7A7268] font-medium">Foco prioritário sugerido:</span>
            @for (area of focusAreas(); track area.category) {
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FCFAF7] dark:bg-[#25201B] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] text-[11px] font-medium">
                <span class="w-1.5 h-1.5 rounded-full" [class]="area.masteryScore < 60 ? 'bg-amber-500' : 'bg-emerald-500'"></span>
                <span>{{ area.categoryLabelPt }}</span>
                <span class="font-mono text-[#8A8278] dark:text-[#7A7268]">({{ area.masteryScore }}%)</span>
              </span>
            }
          </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (story of secondaryStories(); track story.id) {
            <article class="flex flex-col justify-between paper-page rounded-2xl p-5 hover:border-[#D1C7B7] dark:hover:border-[#473F37] transition-all duration-300 shadow-xs group">
              <div class="space-y-4">
                <div class="overflow-hidden rounded-xl aspect-[4/5] bg-[#1A1715] p-2 flex items-center justify-center border border-[#E6DFD3] dark:border-[#332D28]">
                  <div class="w-full h-full rounded-lg overflow-hidden book-cover-shadow">
                    <img
                      [src]="story.coverImage || story.coverImageUrl || '/images/cover-marais.svg'"
                      [alt]="story.title"
                      loading="lazy"
                      class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                  </div>
                </div>

                <div class="flex items-center gap-2 text-xs text-[#6C645C] dark:text-[#9C9387]">
                  <span class="font-medium text-[#9C3823] dark:text-[#DDA15E]">{{ story.estimatedCEFR }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ i18n.t('home.reading_time', { minutes: story.readingMinutes }) }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ story.genre }}</span>
                </div>

                <h3 class="text-lg font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] line-clamp-1 group-hover:text-[#9C3823] dark:group-hover:text-[#DDA15E] transition-colors">
                  {{ story.title }}
                </h3>

                <p class="text-xs text-[#5A524A] dark:text-[#B5ADA3]">
                  {{ story.author }}
                </p>

                <p class="text-xs font-reading text-[#4A423B] dark:text-[#C5BFB5] line-clamp-3 leading-relaxed">
                  {{ story.excerpt }}
                </p>
              </div>

              <div class="pt-4 mt-4 border-t border-[#EFE9DD] dark:border-[#2C2723] flex items-center justify-between">
                <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] truncate max-w-[140px]">{{ story.sourceLabel }}</span>
                <a
                  [routerLink]="['/read', story.id]"
                  class="text-xs font-medium text-[#231F1C] dark:text-[#EAE4DA] hover:underline inline-flex items-center gap-1">
                  <span>{{ i18n.t('home.btn_read_card') }}</span>
                  <mat-icon class="text-sm leading-none !w-3.5 !h-3.5">arrow_forward</mat-icon>
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
