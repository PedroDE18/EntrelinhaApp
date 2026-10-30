import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoryService } from '../core/services/story';
import { LearnerProfileService } from '../core/services/learner-profile';
import { SpeechNarrationService } from '../core/services/speech';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-home-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="space-y-12 sm:space-y-16">
      <!-- Hero: Featured Story of the Day -->
      <section class="relative bg-[#FCFAF7] dark:bg-[#221E1B] rounded-2xl p-6 sm:p-8 lg:p-10 border border-[#E6DFD3] dark:border-[#332D28] shadow-xs transition-colors">
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
          <div class="lg:col-span-5">
            <div class="relative overflow-hidden rounded-xl aspect-[4/3] shadow-sm border border-[#E6DFD3] dark:border-[#332D28] bg-[#EFE9DD] dark:bg-[#1A1715]">
              <img
                [src]="featuredStory.coverImage"
                [alt]="featuredStory.title"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover" />
              <div class="absolute bottom-3 left-3 bg-[#181513]/85 backdrop-blur-xs px-3 py-1 rounded text-[11px] text-[#EAE4DA]">
                {{ i18n.t('home.serialized_badge', { current: featuredStory.serializedInfo?.episodeNumber || 1, total: featuredStory.serializedInfo?.totalEpisodes || 3 }) }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Portuguese-French Contrast Spotlight (Piège Lusophone) -->
      <section class="bg-[#F9F3E8] dark:bg-[#25201B] rounded-xl p-6 border border-[#E8DCC8] dark:border-[#3A3228] transition-colors">
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
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#7A2A18] dark:text-[#F3D5A5] bg-[#F2E4D0] dark:bg-[#382D22] rounded-lg hover:bg-[#EBD8C0] dark:hover:bg-[#46382B] transition-colors shrink-0">
            <mat-icon class="text-base leading-none !w-4 !h-4">hearing</mat-icon>
            <span>{{ i18n.t('home.btn_audio_pronunciation') }}</span>
          </button>
        </div>
      </section>

      <!-- Restrained Progress Summary -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="p-4 rounded-xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28]">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.reading_level') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().readingCEFR }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.reading_level_label') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.reading_level_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28]">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.listening_level') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().listeningCEFR }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.listening_level_label') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.listening_level_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28]">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.active_learning') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#9C3823] dark:text-[#DDA15E]">{{ learnerService.learningWordsCount() }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.words_unit') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.active_learning_desc') }}</span>
        </div>

        <div class="p-4 rounded-xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28]">
          <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.streak') }}</span>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ profile().currentStreakDays }}</span>
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('home.stats.streak_unit') }}</span>
          </div>
          <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mt-1 block">{{ i18n.t('home.stats.stories_completed', { count: profile().storiesCompleted }) }}</span>
        </div>
      </section>

      <!-- Continue Reading / Recent Stories -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl sm:text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
              {{ i18n.t('home.recommended_heading') }}
            </h2>
            <p class="text-xs text-[#6C645C] dark:text-[#9C9387] mt-0.5">
              {{ i18n.t('home.recommended_subheading') }}
            </p>
          </div>
          <a routerLink="/library" class="text-xs font-medium text-[#231F1C] dark:text-[#EAE4DA] hover:underline">
            {{ i18n.t('home.see_all_library') }}
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (story of secondaryStories; track story.id) {
            <article class="flex flex-col justify-between bg-[#FCFAF7] dark:bg-[#221E1B] rounded-xl border border-[#E6DFD3] dark:border-[#332D28] p-5 hover:border-[#D1C7B7] dark:hover:border-[#473F37] transition-colors shadow-xs">
              <div class="space-y-3">
                <div class="overflow-hidden rounded-lg aspect-[16/10] bg-[#EFE9DD] dark:bg-[#1A1715]">
                  <img
                    [src]="story.coverImage"
                    [alt]="story.title"
                    referrerpolicy="no-referrer"
                    class="w-full h-full object-cover" />
                </div>

                <div class="flex items-center gap-2 text-xs text-[#6C645C] dark:text-[#9C9387]">
                  <span class="font-medium text-[#9C3823] dark:text-[#DDA15E]">{{ story.estimatedCEFR }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ i18n.t('home.reading_time', { minutes: story.readingMinutes }) }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ story.genre }}</span>
                </div>

                <h3 class="text-lg font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] line-clamp-1">
                  {{ story.title }}
                </h3>

                <p class="text-xs text-[#6C645C] dark:text-[#9C9387]">
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
  readonly secondaryStories = this.storyService.stories().slice(1, 4);

  playContrastExample(): void {
    this.speech.speakExcerpt("Actuellement, l'inspectrice examine le carnet. En fait, tout était prémédité.");
  }
}
