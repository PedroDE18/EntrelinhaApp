import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { SpeechNarrationService } from '../core/services/speech';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-progress-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="space-y-10">
      <!-- Section Header -->
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight">
          {{ i18n.t('progress.title') }}
        </h1>
        <p class="text-sm font-reading text-[#5A524A] dark:text-[#B5ADA3] max-w-2xl leading-relaxed">
          {{ i18n.t('progress.subtitle') }}
        </p>
      </div>

      <!-- CEFR Dual Proficiency Matrix -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Reading Proficiency -->
        <div class="p-6 rounded-2xl paper-page space-y-4 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-[#6C645C] dark:text-[#9C9387]">
              {{ i18n.t('progress.reading_matrix_title') }}
            </span>
            <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F2E4D0] dark:bg-[#382D22] text-[#7A2A18] dark:text-[#F3D5A5]">
              CEFR {{ profile().readingCEFR }}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ i18n.t('progress.reading_matrix_status') }}</span>
              <span class="text-xs font-mono text-[#6C645C] dark:text-[#9C9387]">~135 palavras/min</span>
            </div>
            <!-- CEFR Scale Bar -->
            <div class="grid grid-cols-6 gap-1 h-2 rounded-full overflow-hidden bg-[#EFE9DD] dark:bg-[#1A1715]">
              <div class="bg-[#9C3823] dark:bg-[#DDA15E] h-full"></div>
              <div class="bg-[#9C3823] dark:bg-[#DDA15E] h-full"></div>
              <div class="bg-[#9C3823] dark:bg-[#DDA15E] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
            </div>
            <div class="flex justify-between text-[10px] text-[#8A8278] dark:text-[#7A7268] font-mono">
              <span>A1</span><span>A2</span><span class="font-bold text-[#9C3823] dark:text-[#DDA15E]">B1</span><span>B2</span><span>C1</span><span>C2</span>
            </div>
          </div>

          <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed pt-1">
            {{ i18n.t('progress.reading_matrix_desc') }}
          </p>
        </div>

        <!-- Listening Proficiency -->
        <div class="p-6 rounded-2xl paper-page space-y-4 shadow-xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold uppercase tracking-wider text-[#6C645C] dark:text-[#9C9387]">
              {{ i18n.t('progress.listening_matrix_title') }}
            </span>
            <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#F5EFE3] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA]">
              CEFR {{ profile().listeningCEFR }}
            </span>
          </div>

          <div class="space-y-2">
            <div class="flex items-baseline justify-between">
              <span class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ i18n.t('progress.listening_matrix_status') }}</span>
              <span class="text-xs font-mono text-[#6C645C] dark:text-[#9C9387]">Ritmo moderado (0.9x)</span>
            </div>
            <!-- CEFR Scale Bar -->
            <div class="grid grid-cols-6 gap-1 h-2 rounded-full overflow-hidden bg-[#EFE9DD] dark:bg-[#1A1715]">
              <div class="bg-[#9C3823] dark:bg-[#DDA15E] h-full"></div>
              <div class="bg-[#9C3823] dark:bg-[#DDA15E] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
              <div class="bg-[#DDD6C8] dark:bg-[#332D28] h-full"></div>
            </div>
            <div class="flex justify-between text-[10px] text-[#8A8278] dark:text-[#7A7268] font-mono">
              <span>A1</span><span class="font-bold text-[#9C3823] dark:text-[#DDA15E]">A2</span><span>B1</span><span>B2</span><span>C1</span><span>C2</span>
            </div>
          </div>

          <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed pt-1">
            {{ i18n.t('progress.listening_matrix_desc') }}
          </p>
        </div>
      </section>

      <!-- Vocabulary Funnel (Section 9) -->
      <section class="p-6 sm:p-8 rounded-2xl paper-page space-y-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">bubble_chart</mat-icon>
            <span>{{ i18n.t('progress.funnel_badge') }}</span>
          </div>
          <h2 class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
            {{ i18n.t('progress.funnel_title') }}
          </h2>
          <p class="text-xs font-reading text-[#6C645C] dark:text-[#9C9387]">
            {{ i18n.t('progress.funnel_subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#181513] border border-[#E6DFD3] dark:border-[#332D28]">
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('progress.funnel_encountered') }}</span>
            <div class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] mt-1">
              {{ profile().vocabularyMetrics.encountered }}
            </div>
            <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] mt-0.5 block">{{ i18n.t('progress.funnel_encountered_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl bg-[#F9F3E8] dark:bg-[#25201B] border border-[#E8DCC8] dark:border-[#3A3228]">
            <span class="text-xs text-[#9C3823] dark:text-[#DDA15E]">{{ i18n.t('progress.funnel_learning') }}</span>
            <div class="text-2xl font-serif font-bold text-[#9C3823] dark:text-[#DDA15E] mt-1">
              {{ learnerService.learningWordsCount() }}
            </div>
            <span class="text-[10px] text-[#C07D2B] dark:text-[#E6B373] mt-0.5 block">{{ i18n.t('progress.funnel_learning_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#181513] border border-[#E6DFD3] dark:border-[#332D28]">
            <span class="text-xs text-[#6C645C] dark:text-[#9C9387]">{{ i18n.t('progress.funnel_known') }}</span>
            <div class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] mt-1">
              {{ profile().vocabularyMetrics.known }}
            </div>
            <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] mt-0.5 block">{{ i18n.t('progress.funnel_known_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl bg-[#EBF7EE] dark:bg-[#1B2B1E] border border-[#C3E6CB] dark:border-[#2C4832]">
            <span class="text-xs text-[#1B5E20] dark:text-[#86EFAC]">{{ i18n.t('progress.funnel_mastered') }}</span>
            <div class="text-2xl font-serif font-bold text-[#1B5E20] dark:text-[#86EFAC] mt-1">
              {{ profile().vocabularyMetrics.mastered }}
            </div>
            <span class="text-[10px] text-[#2E7D32] dark:text-[#4ADE80] mt-0.5 block">{{ i18n.t('progress.funnel_mastered_sub') }}</span>
          </div>
        </div>

        <!-- Recent Words Under Active Learning -->
        <div class="space-y-3 pt-2">
          <h3 class="text-sm font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
            {{ i18n.t('progress.notebook_title') }}
          </h3>
          <div class="divide-y divide-[#EFE9DD] dark:divide-[#2C2723]">
            @for (w of learnerService.words(); track w.id) {
              <div class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2">
                    <span class="font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ w.french }}</span>
                    @if (w.isFalseFriend) {
                      <span class="text-[10px] font-semibold bg-[#FDE8E8] dark:bg-[#3D1A1A] text-[#9C3823] dark:text-[#F8B4B4] px-1.5 py-0.5 rounded">
                        {{ i18n.t('reader.gloss.badge_false_friend') }}
                      </span>
                    }
                  </div>
                  <p class="text-xs text-[#5A524A] dark:text-[#B5ADA3] font-reading italic">
                    « {{ w.contextSentence }} »
                  </p>
                </div>
                <div class="text-right sm:max-w-xs shrink-0">
                  <span class="text-xs font-medium text-[#231F1C] dark:text-[#EAE4DA] block">{{ w.translationPt }}</span>
                  <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('progress.times_encountered', { count: w.encounterCount }) }}</span>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Radar de Falsos Cognatos e Armadilhas Lusófonas -->
      <section class="p-6 sm:p-8 rounded-2xl paper-page space-y-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">radar</mat-icon>
            <span>{{ i18n.t('progress.radar_badge') }}</span>
          </div>
          <h2 class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
            {{ i18n.t('progress.radar_title') }}
          </h2>
          <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3]">
            {{ i18n.t('progress.radar_subtitle') }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          @for (item of learnerService.interferenceRadar(); track item.id) {
            <div class="p-4 rounded-xl bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-base font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ item.frenchTerm }}</span>
                <span class="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#F2E4D0] dark:bg-[#382D22] text-[#7A2A18] dark:text-[#F3D5A5]">
                  {{ item.category === 'faux_ami' ? i18n.t('reader.gloss.badge_false_friend') : i18n.t('reader.gloss.badge_gender_trap') }}
                </span>
              </div>

              <div class="text-xs space-y-1 pt-1">
                <div class="flex items-center gap-1.5 text-[#B71C1C] dark:text-[#FCA5A5]">
                  <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">close</mat-icon>
                  <span>{{ i18n.t('progress.trap_frequent') }} <strong>{{ item.portugueseFalseFriend }}</strong></span>
                </div>
                <div class="flex items-center gap-1.5 text-[#1B5E20] dark:text-[#86EFAC]">
                  <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">check</mat-icon>
                  <span>{{ i18n.t('progress.trap_meaning') }} <strong>{{ item.correctPortugueseMeaning }}</strong></span>
                </div>
                <div class="text-[11px] text-[#6C645C] dark:text-[#9C9387] pt-1">
                  {{ i18n.t('progress.how_to_say') }} <code class="bg-[#F5EFE3] dark:bg-[#25201B] px-1 py-0.5 rounded text-[#231F1C] dark:text-[#EAE4DA] font-mono">{{ item.howToSayInFrench }}</code>
                </div>
              </div>

              <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] pt-1 leading-relaxed border-t border-[#EFE9DD] dark:border-[#2C2723]">
                {{ item.explanationPt }}
              </p>
            </div>
          }
        </div>
      </section>
    </div>
  `,
})
export class ProgressView {
  readonly learnerService = inject(LearnerProfileService);
  readonly speech = inject(SpeechNarrationService);
  readonly i18n = inject(I18nService);

  readonly profile = this.learnerService.profile;
}
