import { ChangeDetectionStrategy, Component, inject, signal, computed, effect, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoryService } from '../core/services/story';
import { LearnerProfileService } from '../core/services/learner-profile';
import { SpeechNarrationService } from '../core/services/speech';
import { I18nService } from '../core/services/i18n';
import { TextRendererService } from '../core/services/text-renderer';
import { RenderedTextItem, Story, StoryParagraph } from '../core/models';
import { checkFalseCognate, checkGenderTrap } from '../core/linguistics';
import { lookupFrenchLexicon } from '../core/lexicon';

@Component({
  selector: 'app-reading-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    @if (story(); as s) {
      <div class="max-w-4xl mx-auto space-y-8 pb-16">
        <!-- Top Toolbar: Navigation & Reading Preferences -->
        <div class="flex items-center justify-between gap-4 py-3 border-b border-[#E6DFD3] dark:border-[#332D28] text-xs text-[#6C645C] dark:text-[#9C9387]">
          <a routerLink="/library" class="inline-flex items-center gap-1.5 hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors">
            <mat-icon class="text-base leading-none !w-4 !h-4">arrow_back</mat-icon>
            <span>{{ i18n.t('reader.back_to_library') }}</span>
          </a>

          <div class="flex items-center gap-3">
            <!-- Typography font style toggle -->
            <button
              type="button"
              (click)="toggleFontSerif()"
              [attr.aria-label]="useSerif() ? i18n.t('reader.aria_font_sans') : i18n.t('reader.aria_font_serif')"
              class="px-2.5 py-1 rounded border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#221E1B] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors">
              {{ useSerif() ? i18n.t('reader.font_serif') : i18n.t('reader.font_sans') }}
            </button>

            <!-- Text Size adjuster -->
            <div class="flex items-center border border-[#DDD6C8] dark:border-[#38322C] rounded overflow-hidden bg-[#FCFAF7] dark:bg-[#221E1B]">
              <button
                type="button"
                (click)="decreaseFontSize()"
                [attr.aria-label]="i18n.t('reader.aria_font_decrease')"
                class="px-2 py-1 hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors text-xs font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
                A-
              </button>
              <span class="px-2 py-1 bg-[#F5EFE3] dark:bg-[#181513] text-[11px] font-mono border-x border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
                {{ fontSize() }}px
              </span>
              <button
                type="button"
                (click)="increaseFontSize()"
                [attr.aria-label]="i18n.t('reader.aria_font_increase')"
                class="px-2 py-1 hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors text-xs font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
                A+
              </button>
            </div>
          </div>
        </div>

        <!-- Audio Narration Bar: Only sticky when actively playing -->
        <div
          [class.sticky]="speech.isPlaying()"
          [class.top-16]="speech.isPlaying()"
          [class.z-30]="speech.isPlaying()"
          [class.shadow-md]="speech.isPlaying()"
          class="bg-[#FCFAF7]/95 dark:bg-[#221E1B]/95 backdrop-blur-md rounded-xl p-4 border border-[#E6DFD3] dark:border-[#332D28] transition-all space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <!-- Play / Pause primary toggle button -->
              <button
                type="button"
                (click)="toggleAudio(s)"
                [attr.aria-label]="speech.isPlaying() ? i18n.t('reader.aria_pause') : i18n.t('reader.aria_play')"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#9C3823] text-white hover:bg-[#832F1D] dark:bg-[#DDA15E] dark:text-[#181513] hover:opacity-95 transition-all shadow-sm">
                <mat-icon class="text-xl leading-none !w-5 !h-5">
                  {{ speech.isPlaying() ? 'pause' : 'play_arrow' }}
                </mat-icon>
              </button>

              <!-- Replay button -->
              <button
                type="button"
                (click)="speech.replay()"
                [attr.aria-label]="i18n.t('reader.aria_replay')"
                class="p-2 rounded-lg border border-[#DDD6C8] dark:border-[#38322C] text-[#5A524A] dark:text-[#B5ADA3] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors">
                <mat-icon class="text-base leading-none !w-4 !h-4">replay</mat-icon>
              </button>

              <div class="space-y-0.5">
                <div class="text-xs font-semibold text-[#231F1C] dark:text-[#EAE4DA] flex items-center gap-2">
                  <span>{{ i18n.t('reader.audio_narration_title') }}</span>
                  <span class="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#EFE8DC] dark:bg-[#2F2923] text-[#78350F] dark:text-[#FBBF24] font-medium border border-[#D5CABB]/60 dark:border-[#423930]">
                    <mat-icon class="text-[12px] leading-none !w-3 !h-3">record_voice_over</mat-icon>
                    <span>{{ speech.activeVoiceName() }}</span>
                  </span>
                </div>
                <div class="text-[11px] text-[#6C645C] dark:text-[#9C9387]">
                  {{ i18n.t('reader.audio_narration_subtitle') }}
                </div>
              </div>
            </div>

            <!-- Auto-scroll & Playback Speed Controls -->
            <div class="flex items-center gap-2 text-xs flex-wrap">
              <button
                type="button"
                (click)="toggleAutoScroll()"
                [class]="autoScrollEnabled() ? 'bg-[#9C3823] text-white dark:bg-[#DDA15E] dark:text-[#181513] font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] border border-[#DDD6C8] dark:border-[#38322C] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723]'"
                title="Rastreamento cinematográfico e centralização automática durante a narração"
                class="px-2 py-0.5 rounded text-[11px] flex items-center gap-1 transition-colors">
                <mat-icon class="text-xs leading-none !w-3 !h-3">center_focus_strong</mat-icon>
                <span>Auto-scroll</span>
              </button>

              <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] mr-0.5">{{ i18n.t('reader.speed_label') }}</span>
              @for (speed of [0.75, 0.92, 1.0, 1.25]; track speed) {
                <button
                  type="button"
                  (click)="speech.setSpeed(speed)"
                  [class]="speech.currentSpeed() === speed ? 'bg-[#231F1C] text-white dark:bg-[#EAE4DA] dark:text-[#181513] font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723]'"
                  class="px-2 py-0.5 rounded text-[11px] transition-colors">
                  {{ speed === 0.92 ? '0.9x' : speed + 'x' }}
                </button>
              }
            </div>
          </div>

          <!-- Progress scrubber -->
          <div class="w-full bg-[#EFE9DD] dark:bg-[#181513] h-1.5 rounded-full overflow-hidden">
            <div
              class="bg-[#9C3823] dark:bg-[#DDA15E] h-full transition-all duration-300"
              [style.width.%]="speech.progressPercent()"></div>
          </div>
        </div>

        <!-- Story Header: Clean Editorial Title & Frontispiece Vignette -->
        <header class="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-3 pb-4 border-b border-[#E6DFD3] dark:border-[#332D28]">
          <div class="w-24 sm:w-32 md:w-36 flex-shrink-0 rounded-lg overflow-hidden book-cover-shadow border border-[#D5CABB] dark:border-[#3E362F] bg-[#181513]">
            <img [src]="s.coverImage || s.coverImageUrl || '/images/cover-marais.svg'" [alt]="s.title" class="w-full h-auto object-cover aspect-[4/5] block" />
          </div>

          <div class="flex-1 space-y-2.5 text-center sm:text-left">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#6C645C] dark:text-[#9C9387]">
              <span class="px-2.5 py-0.5 rounded-full bg-[#EFE8DC] dark:bg-[#2C2621] font-semibold text-[#9C3823] dark:text-[#DDA15E]">
                {{ i18n.t('home.level', { level: s.estimatedCEFR }) }}
              </span>
              <span aria-hidden="true">·</span>
              <span>{{ i18n.t('reader.reading_time_words', { minutes: s.readingMinutes, words: s.wordCount }) }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ s.genre }}</span>
            </div>

            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight leading-tight">
              {{ s.title }}
            </h1>

            <div class="text-xs sm:text-sm text-[#5A524A] dark:text-[#B5ADA3] flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span>Par <strong class="font-medium text-[#231F1C] dark:text-[#EAE4DA]">{{ s.author }}</strong></span>
              @if (s.sourceUrl) {
                <span aria-hidden="true">·</span>
                <a [href]="s.sourceUrl" target="_blank" rel="noopener noreferrer" class="hover:underline text-[#9C3823] dark:text-[#DDA15E]">
                  {{ i18n.t('reader.source_link') }}
                </a>
              }
            </div>

            @if (s.excerpt) {
              <p class="text-xs sm:text-sm font-reading italic text-[#6C645C] dark:text-[#9C9387] max-w-xl leading-relaxed pt-1 hidden sm:block">
                « {{ s.excerpt }} »
              </p>
            }
          </div>
        </header>

        <!-- Reading Bookmark Notification (Retomar Leitura) -->
        @if (savedBookmarkParagraph(); as bookmarkIdx) {
          <div class="flex items-center justify-between p-3 px-4 rounded-xl bg-[#F7EFE1] dark:bg-[#28221D] border border-[#E6DFD3] dark:border-[#3D342C] text-xs text-[#5A524A] dark:text-[#B5ADA3]">
            <div class="flex items-center gap-2">
              <mat-icon class="text-sm text-[#9C3823] dark:text-[#DDA15E] !w-4 !h-4">bookmark</mat-icon>
              <span>Você parou a leitura no <strong>parágrafo {{ bookmarkIdx + 1 }}</strong>.</span>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="scrollToParagraph(bookmarkIdx)"
                class="font-semibold text-[#9C3823] dark:text-[#DDA15E] hover:underline cursor-pointer">
                Retomar aqui
              </button>
              <button
                type="button"
                (click)="clearBookmark(s.id)"
                title="Dispensar marcador"
                class="text-[#8A8278] hover:text-[#231F1C] dark:hover:text-[#EAE4DA] p-0.5 cursor-pointer">
                <mat-icon class="text-xs !w-3.5 !h-3.5">close</mat-icon>
              </button>
            </div>
          </div>
        }

        <!-- Reading Canvas: Book-like measure & Paper warmth with Lute Multi-Word Engine -->
        <div class="paper-page book-spine-left rounded-2xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <article
            class="max-w-2xl mx-auto space-y-6 text-[#2E2824] dark:text-[#E2DDD3]"
            [class.font-reading]="useSerif()"
            [class.font-sans]="!useSerif()"
            [style.fontSize.px]="fontSize()"
            [style.lineHeight]="1.88">
            @for (para of s.paragraphs; track para.id; let pIdx = $index) {
              <p
                [id]="'para-' + pIdx"
                [class.story-drop-cap]="pIdx === 0"
                class="relative select-text transition-colors text-justify hyphens-auto leading-relaxed group/para">
                <!-- Quick listen button for this paragraph in left margin -->
                <button
                  type="button"
                  (click)="playFromParagraph(s, pIdx)"
                  title="Ouvir este parágrafo com voz natural"
                  class="opacity-0 group-hover/para:opacity-100 transition-opacity absolute -left-7 top-1 text-[#8A8278] hover:text-[#9C3823] dark:hover:text-[#DDA15E] p-0.5 cursor-pointer">
                  <mat-icon class="text-base leading-none !w-4 !h-4">play_circle</mat-icon>
                </button>

                @for (tok of getParagraphItems(para, pIdx); track tok.id) {
                  @if (tok.isWord) {
                    <span
                      (click)="selectToken(tok)"
                      (keydown.enter)="selectToken(tok)"
                      tabindex="0"
                      role="button"
                      [attr.aria-label]="'Traduzir ' + tok.fullText"
                      [attr.data-sentence-id]="pIdx + '-' + tok.sentenceNumber"
                      [class.bg-amber-100/90]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-amber-950/60]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.text-[#7A2A18]]="tok.falseFriend && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:text-[#F3D5A5]]="tok.falseFriend && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.font-semibold]="tok.falseFriend || tok.genderTrap"
                      [class.underline]="tok.falseFriend || tok.genderTrap"
                      [class.decoration-[#C07D2B]]="tok.falseFriend"
                      [class.decoration-[#2B6CB0]]="tok.genderTrap"
                      [class.border-b-2]="tok.isMultiword"
                      [class.border-dotted]="tok.isMultiword"
                      [class.border-[#9C3823]/60]="tok.isMultiword"
                      [class.bg-[#F7EFE1]/80]="tok.isMultiword && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-[#342A22]/80]="tok.isMultiword && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.rounded]="tok.isMultiword"
                      [class.px-1]="tok.isMultiword"
                      [class.bg-[#EAF5EC]/60]="tok.state === 'known' && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-[#1E3324]/60]="tok.state === 'known' && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.bg-[#FEF3C7]/60]="tok.state === 'learning' && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-[#3E3018]/60]="tok.state === 'learning' && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      class="cursor-pointer hover:bg-[#F3E7D3] dark:hover:bg-[#382F26] rounded-xs px-0.5 py-0.5 inline transition-colors">
                      {{ tok.text }}
                    </span>
                  } @else {
                    <span
                      [attr.data-sentence-id]="pIdx + '-' + tok.sentenceNumber"
                      [class.bg-amber-100/90]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-amber-950/60]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      class="whitespace-pre-wrap select-text transition-colors duration-200">{{ tok.text }}</span>
                  }
                }
              </p>
            }
          </article>
        </div>

        <!-- Interactive Contextual Gloss Modal / Card -->
        @if (selectedToken(); as tok) {
          <div class="fixed inset-x-0 bottom-0 sm:bottom-4 z-50 max-w-xl mx-auto px-2 sm:px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div class="paper-page rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border border-[#DDD6C8] dark:border-[#38322C] space-y-4">
              <!-- Header of gloss -->
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-lg font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">{{ tok.fullText }}</span>
                    @if (tok.isMultiword) {
                      <span class="text-[10px] font-semibold uppercase tracking-wider bg-[#EDE6D8] dark:bg-[#2F2924] text-[#6C645C] dark:text-[#B5ADA3] px-2 py-0.5 rounded-full border border-[#D5CABB] dark:border-[#3E362F]">
                        Expressão ({{ tok.tokenCount }} termos)
                      </span>
                    }
                    <button
                      type="button"
                      (click)="speech.speakWord(tok.fullText)"
                      [attr.aria-label]="i18n.t('reader.gloss.aria_pronounce')"
                      class="text-[#6C645C] hover:text-[#9C3823] dark:hover:text-[#DDA15E] p-1 rounded transition-colors">
                      <mat-icon class="text-base leading-none !w-4 !h-4">volume_up</mat-icon>
                    </button>
                  </div>
                  @if (tok.definitionFr) {
                    <p class="text-xs text-[#6C645C] dark:text-[#9C9387]">
                      {{ i18n.t('reader.gloss.french_definition') }} <span class="italic text-[#231F1C] dark:text-[#EAE4DA]">{{ tok.definitionFr }}</span>
                    </p>
                  }
                </div>

                <button
                  type="button"
                  (click)="closeGloss()"
                  [attr.aria-label]="i18n.t('reader.gloss.aria_close')"
                  class="text-[#8A8278] hover:text-[#231F1C] dark:hover:text-[#EAE4DA] p-1">
                  <mat-icon class="text-lg leading-none !w-5 !h-5">close</mat-icon>
                </button>
              </div>

              <!-- Brazilian Portuguese Translation & Contrast -->
              <div class="p-3 bg-[#F9F3E8] dark:bg-[#25201B] rounded-xl border border-[#E8DCC8] dark:border-[#3A3228] space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold text-[#9C3823] dark:text-[#DDA15E] uppercase tracking-wider">
                    {{ i18n.t('reader.gloss.portuguese_heading') }}
                  </span>
                  @if (tok.falseFriend) {
                    <span class="text-[10px] font-bold uppercase tracking-wider bg-[#FDE8E8] dark:bg-[#3D1A1A] text-[#9C3823] dark:text-[#F8B4B4] px-2 py-0.5 rounded">
                      {{ i18n.t('reader.gloss.badge_false_friend') }}
                    </span>
                  }
                  @if (tok.genderTrap) {
                    <span class="text-[10px] font-bold uppercase tracking-wider bg-[#E1EFFE] dark:bg-[#1E2E42] text-[#1E429F] dark:text-[#90CDF4] px-2 py-0.5 rounded">
                      {{ i18n.t('reader.gloss.badge_gender_trap') }}
                    </span>
                  }
                </div>

                <p class="text-sm font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
                  {{ tok.translationPt || ('Termo em contexto : ' + tok.cleanWord) }}
                </p>

                @if (tok.falseFriend) {
                  <p class="text-xs text-[#7A2A18] dark:text-[#F3D5A5] leading-relaxed pt-1">
                    {{ tok.falseFriend.explanation }}
                  </p>
                }

                @if (tok.genderTrap) {
                  <p class="text-xs text-[#1E429F] dark:text-[#90CDF4] leading-relaxed pt-1">
                    {{ tok.genderTrap.explanation }}
                  </p>
                }
              </div>

              <!-- Surrounding Sentence Context -->
              @if (tok.sentenceContext) {
                <div class="px-3 py-2 bg-[#F3ECE1] dark:bg-[#1D1917] rounded-lg text-xs space-y-0.5 border border-[#E4D9C8] dark:border-[#2F2925]">
                  <span class="text-[10px] uppercase font-semibold text-[#8A8278] dark:text-[#7A7268] block">Contexto da Frase</span>
                  <p class="italic text-[#4A423A] dark:text-[#C5BEB3] line-clamp-2">"{{ tok.sentenceContext.trim() }}"</p>
                </div>
              }

              <!-- State Discrimination Selection -->
              <div class="space-y-1.5 pt-1">
                <span class="text-[11px] text-[#6C645C] dark:text-[#9C9387] block">{{ i18n.t('reader.gloss.classify_prompt') }}</span>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    (click)="classifyToken('want_to_learn', tok)"
                    class="px-3 py-2 text-left rounded-lg bg-[#F5EFE3] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors border border-transparent hover:border-[#DDD6C8] dark:hover:border-[#38322C]">
                    <span class="font-semibold block">{{ i18n.t('reader.gloss.btn_want_to_learn') }}</span>
                    <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.gloss.btn_want_to_learn_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_known', tok)"
                    class="px-3 py-2 text-left rounded-lg bg-[#F5EFE3] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors border border-transparent hover:border-[#DDD6C8] dark:hover:border-[#38322C]">
                    <span class="font-semibold block">{{ i18n.t('reader.gloss.btn_known') }}</span>
                    <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.gloss.btn_known_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_unknown', tok)"
                    class="px-3 py-2 text-left rounded-lg bg-[#F5EFE3] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors border border-transparent hover:border-[#DDD6C8] dark:hover:border-[#38322C]">
                    <span class="font-semibold block">{{ i18n.t('reader.gloss.btn_unknown') }}</span>
                    <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.gloss.btn_unknown_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_uncertain', tok)"
                    class="px-3 py-2 text-left rounded-lg bg-[#F5EFE3] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors border border-transparent hover:border-[#DDD6C8] dark:hover:border-[#38322C]">
                    <span class="font-semibold block">{{ i18n.t('reader.gloss.btn_uncertain') }}</span>
                    <span class="text-[10px] text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.gloss.btn_uncertain_sub') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Provenance & Licensing Metadata Block -->
        <section class="mt-12 p-5 rounded-xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28] space-y-2 text-xs text-[#5A524A] dark:text-[#B5ADA3]">
          <div class="flex items-center gap-2 font-semibold text-[#231F1C] dark:text-[#EAE4DA] uppercase tracking-wider text-[11px]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">verified</mat-icon>
            <span>{{ i18n.t('reader.provenance.heading') }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <span class="text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.provenance.source_origin') }}</span>
              <span class="text-[#231F1C] dark:text-[#EAE4DA]">{{ s.sourceLabel }}</span>
            </div>
            <div>
              <span class="text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('reader.provenance.license') }}</span>
              <span class="text-[#231F1C] dark:text-[#EAE4DA]">{{ s.licenseInfo }}</span>
            </div>
          </div>
          <p class="text-[11px] text-[#8A8278] dark:text-[#7A7268] pt-1 leading-relaxed">
            {{ i18n.t('reader.provenance.disclaimer') }}
          </p>
        </section>

        <!-- Comprehension Assessment Section -->
        <section class="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28] shadow-xs space-y-6">
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
              <mat-icon class="text-sm leading-none !w-4 !h-4">quiz</mat-icon>
              <span>{{ i18n.t('reader.quiz.badge') }}</span>
            </div>
            <h2 class="text-2xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
              {{ i18n.t('reader.quiz.title') }}
            </h2>
            <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
              {{ i18n.t('reader.quiz.subtitle') }}
            </p>
          </div>

          <!-- Questions loop -->
          <div class="space-y-6 pt-2">
            @for (q of s.comprehensionQuestions; track q.id; let qIdx = $index) {
              <div class="p-5 rounded-xl bg-[#F7F4EE] dark:bg-[#181513] border border-[#E6DFD3] dark:border-[#332D28] space-y-3">
                <div class="space-y-1">
                  <span class="text-[11px] font-semibold text-[#8A8278] dark:text-[#7A7268] uppercase tracking-wider">
                    {{ i18n.t('reader.quiz.question_label', { number: qIdx + 1, type: q.type }) }}
                  </span>
                  <h3 class="text-base font-serif font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
                    {{ q.questionFr }}
                  </h3>
                  <p class="text-xs text-[#5A524A] dark:text-[#B5ADA3] italic">
                    {{ q.questionPt }}
                  </p>
                </div>

                <!-- Options -->
                <div class="space-y-2 pt-1">
                  @for (opt of q.options; track opt.id) {
                    <button
                      type="button"
                      (click)="selectAnswer(q.id, opt.id)"
                      [disabled]="answeredQuestions()[q.id] !== undefined"
                      [class]="getOptionClass(q.id, opt.id, q.correctOptionId)"
                      class="w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-colors flex items-start gap-2.5">
                      <span class="font-mono text-xs mt-0.5 uppercase opacity-70">{{ opt.id }}.</span>
                      <div class="space-y-0.5">
                        <span class="font-medium block">{{ opt.textFr }}</span>
                        <span class="text-xs opacity-75 block">{{ opt.textPt }}</span>
                      </div>
                    </button>
                  }
                </div>

                <!-- Explanation when answered -->
                @if (answeredQuestions()[q.id] !== undefined) {
                  <div class="mt-3 p-3.5 rounded-lg bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#DDD6C8] dark:border-[#38322C] text-xs space-y-1 animate-in fade-in duration-150">
                    <div class="font-semibold text-[#231F1C] dark:text-[#EAE4DA]">
                      {{ answeredQuestions()[q.id] === q.correctOptionId ? i18n.t('reader.quiz.correct_feedback') : i18n.t('reader.quiz.incorrect_feedback') }}
                    </div>
                    <p class="text-[#3A342F] dark:text-[#D8D2C7] leading-relaxed">{{ q.explanationFr }}</p>
                    <p class="text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed italic">{{ q.explanationPt }}</p>
                    @if (q.portugueseInterferenceNote) {
                      <div class="pt-1.5 text-[#9C3823] dark:text-[#DDA15E] font-medium">
                        {{ i18n.t('reader.quiz.portuguese_note_prefix') }} {{ q.portugueseInterferenceNote }}
                      </div>
                    }
                  </div>
                }
              </div>
            }
          </div>

          <!-- Final Complete Button & Diagnostic Outcome -->
          @if (completed() && assessmentResult(); as res) {
            <div class="p-5 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#2E8540]/40 space-y-4 animate-in fade-in duration-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E6DFD3] dark:border-[#332D28] pb-3">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 text-xs font-semibold text-[#1B5E20] dark:text-[#86EFAC]">
                    <mat-icon class="text-sm !w-4 !h-4">check_circle</mat-icon>
                    <span>Avaliação Registrada com Sucesso</span>
                  </div>
                  <h3 class="text-lg font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
                    Diagnóstico de Compreensão & Interferência
                  </h3>
                </div>

                <div class="flex items-center gap-3">
                  <div class="text-right">
                    <span class="text-xs text-[#8A8278] dark:text-[#7A7268] block">Aproveitamento</span>
                    <span class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA]">
                      {{ res.scorePercent }}%
                    </span>
                  </div>
                  <div class="w-px h-8 bg-[#E6DFD3] dark:bg-[#332D28]"></div>
                  <div class="text-right">
                    <span class="text-xs text-[#8A8278] dark:text-[#7A7268] block">Velocidade</span>
                    <span class="text-xl font-mono font-bold text-[#9C3823] dark:text-[#DDA15E]">
                      {{ readingWpm() }} <span class="text-[11px] font-normal text-[#8A8278] dark:text-[#7A7268]">ppm</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Categories tested vs mistakes -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="space-y-1">
                  <span class="text-[11px] font-semibold text-[#6C645C] dark:text-[#9C9387] uppercase tracking-wider block">
                    Tópicos Linguísticos Avaliados:
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    @for (cat of res.testedCategories; track cat) {
                      <span class="px-2 py-0.5 rounded bg-[#FCFAF7] dark:bg-[#25201B] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] font-mono text-[11px]">
                        {{ cat }}
                      </span>
                    }
                  </div>
                </div>

                <div class="space-y-1">
                  <span class="text-[11px] font-semibold text-[#6C645C] dark:text-[#9C9387] uppercase tracking-wider block">
                    Pontos de Atenção (Erros Identificados):
                  </span>
                  @if (res.mistakeCategories.length > 0) {
                    <div class="flex flex-wrap gap-1.5">
                      @for (cat of res.mistakeCategories; track cat) {
                        <span class="px-2 py-0.5 rounded bg-[#FDF2F2] dark:bg-[#3D1A1A] border border-[#D32F2F]/40 text-[#B71C1C] dark:text-[#FCA5A5] font-mono text-[11px]">
                          {{ cat }}
                        </span>
                      }
                    </div>
                  } @else {
                    <span class="text-[11px] text-[#1B5E20] dark:text-[#86EFAC] font-medium block">
                      ✓ Nenhuma armadilha de interferência acionada. Excelente precisão!
                    </span>
                  }
                </div>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#E6DFD3] dark:border-[#332D28] text-xs">
                <span class="text-[#6C645C] dark:text-[#9C9387]">
                  O Radar de Dificuldades Contrastivas do seu perfil foi atualizado.
                </span>
                <div class="flex items-center gap-3">
                  <a routerLink="/progress" class="font-medium text-[#9C3823] dark:text-[#DDA15E] hover:underline inline-flex items-center gap-1">
                    <span>Revisar Vocabulário no SRS</span>
                    <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          } @else {
            <div class="pt-4 border-t border-[#E6DFD3] dark:border-[#332D28] flex items-center justify-between">
              <div class="text-xs text-[#6C645C] dark:text-[#9C9387]">
                {{ i18n.t('reader.quiz.progress_counter', { answered: answeredCount(), total: s.comprehensionQuestions.length }) }}
              </div>

              <button
                type="button"
                (click)="finishStory(s)"
                [disabled]="completed() || answeredCount() === 0"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-[#231F1C] dark:bg-[#EAE4DA] dark:text-[#181513] hover:opacity-90 transition-opacity disabled:opacity-40">
                <mat-icon class="text-base leading-none !w-4 !h-4">check_circle</mat-icon>
                <span>
                  {{
                    completed()
                      ? i18n.t('reader.quiz.btn_validated')
                      : answeredCount() === 0
                        ? 'Responda as questões para validar'
                        : i18n.t('reader.quiz.btn_validate')
                  }}
                </span>
              </button>
            </div>
          }
        </section>
      </div>
    } @else {
      <div class="py-24 text-center space-y-4">
        <h2 class="text-2xl font-serif text-[#231F1C] dark:text-[#EAE4DA]">{{ i18n.t('reader.not_found_title') }}</h2>
        <a routerLink="/library" class="text-xs text-[#9C3823] dark:text-[#DDA15E] underline font-medium">
          {{ i18n.t('reader.not_found_btn') }}
        </a>
      </div>
    }
  `,
})
export class ReadingView implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly storyService = inject(StoryService);
  private readonly learnerService = inject(LearnerProfileService);
  readonly speech = inject(SpeechNarrationService);
  readonly i18n = inject(I18nService);
  readonly textRenderer = inject(TextRendererService);

  readonly storyId = signal<string>('ombre-du-marais');
  readonly story = computed(() => this.storyService.getStoryById(this.storyId()));

  // Reading settings & Auto-scroll
  readonly useSerif = signal<boolean>(true);
  readonly fontSize = signal<number>(18);
  readonly selectedToken = signal<RenderedTextItem | null>(null);
  readonly activeSentenceContext = signal<string>('');
  readonly autoScrollEnabled = signal<boolean>(true);
  readonly savedBookmarkParagraph = signal<number | null>(null);

  // Assessment state
  readonly answeredQuestions = signal<Record<string, string>>({});
  readonly completed = signal<boolean>(false);
  readonly assessmentResult = signal<{
    scorePercent: number;
    testedCategories: string[];
    mistakeCategories: string[];
  } | null>(null);
  readonly readingWpm = signal<number>(140);
  private readingStartTime = Date.now();

  readonly answeredCount = computed(() => Object.keys(this.answeredQuestions()).length);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.storyId.set(id);
        this.speech.stop();
        this.answeredQuestions.set({});
        this.completed.set(false);
        this.assessmentResult.set(null);
        this.readingStartTime = Date.now();
        this.loadBookmark(id);
      }
    });

    effect(() => {
      const active = this.speech.activeSentence();
      if (active && this.autoScrollEnabled() && typeof document !== 'undefined') {
        const el = document.querySelector(`[data-sentence-id="${active.paragraphIndex}-${active.sentenceIndexInParagraph}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          this.updateBookmark(active.paragraphIndex);
        }
      }
    });
  }

  toggleAutoScroll(): void {
    this.autoScrollEnabled.update((v) => !v);
  }

  scrollToParagraph(pIndex: number): void {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(`para-${pIndex}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private loadBookmark(storyId: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const raw = localStorage.getItem(`entrelinha_bookmark_${storyId}`);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.pIndex === 'number' && parsed.pIndex > 0) {
          this.savedBookmarkParagraph.set(parsed.pIndex);
          return;
        }
      }
    } catch {
      // Ignore storage error
    }
    this.savedBookmarkParagraph.set(null);
  }

  updateBookmark(pIndex: number): void {
    const id = this.storyId();
    if (!id || typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(`entrelinha_bookmark_${id}`, JSON.stringify({ pIndex, timestamp: Date.now() }));
    } catch {
      // Ignore storage error
    }
  }

  clearBookmark(storyId: string): void {
    this.savedBookmarkParagraph.set(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(`entrelinha_bookmark_${storyId}`);
    }
  }

  ngOnDestroy(): void {
    // Stop playback immediately when leaving the reading view
    this.speech.stop();
  }

  toggleFontSerif(): void {
    this.useSerif.update((v) => !v);
  }

  increaseFontSize(): void {
    this.fontSize.update((s) => Math.min(26, s + 1));
  }

  decreaseFontSize(): void {
    this.fontSize.update((s) => Math.max(14, s - 1));
  }

  toggleAudio(story: Story): void {
    if (this.speech.isPlaying()) {
      this.speech.pause();
    } else if (this.speech.isPaused()) {
      this.speech.resume();
    } else {
      this.speech.playStoryParagraphs(story.paragraphs);
    }
  }

  playFromParagraph(story: Story, pIdx: number): void {
    const narrative = this.speech.prepareStory(story.paragraphs);
    const target = narrative.find((n) => n.paragraphIndex === pIdx);
    const startIdx = target ? target.globalIndex : 0;
    this.speech.playStoryParagraphs(story.paragraphs, startIdx);
  }

  isSentenceActive(pIdx: number, sNum: number): boolean {
    if (!this.speech.isPlaying()) return false;
    const active = this.speech.activeSentence();
    return active !== null && active.paragraphIndex === pIdx && active.sentenceIndexInParagraph === sNum;
  }

  getParagraphItems(para: StoryParagraph, pIndex: number): RenderedTextItem[] {
    return this.textRenderer.calculateTextItems(para.text, para.tokens, pIndex);
  }

  selectToken(tok: RenderedTextItem): void {
    const falseFriendCheck = checkFalseCognate(tok.cleanWord);
    const genderCheck = checkGenderTrap(tok.cleanWord);
    const lexiconMatch = !tok.translationPt ? lookupFrenchLexicon(tok.cleanWord) : null;

    const enriched: RenderedTextItem = {
      ...tok,
      translationPt: tok.translationPt || lexiconMatch?.translationPt,
      definitionFr: tok.definitionFr || lexiconMatch?.definitionFr,
      falseFriend: tok.falseFriend || (falseFriendCheck ? falseFriendCheck : undefined),
      genderTrap: tok.genderTrap || (genderCheck ? genderCheck : undefined),
    };

    this.selectedToken.set(enriched);
    this.activeSentenceContext.set(tok.sentenceContext);
  }

  closeGloss(): void {
    this.selectedToken.set(null);
  }

  classifyToken(action: 'mark_unknown' | 'want_to_learn' | 'mark_known' | 'mark_uncertain', tok: RenderedTextItem): void {
    this.learnerService.updateWordClassification(
      tok.fullText,
      action,
      tok.sentenceContext,
      tok.translationPt || ('Termo em estudo : ' + tok.cleanWord),
      !!tok.falseFriend,
      tok.falseFriend?.explanation
    );
    this.closeGloss();
  }

  selectAnswer(questionId: string, optionId: string): void {
    if (this.answeredQuestions()[questionId] !== undefined) return;

    this.answeredQuestions.update((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }

  getOptionClass(questionId: string, optionId: string, correctOptionId: string): string {
    const chosen = this.answeredQuestions()[questionId];
    if (!chosen) {
      return 'bg-[#FCFAF7] dark:bg-[#221E1B] border-[#DDD6C8] dark:border-[#38322C] hover:border-[#9C3823] dark:hover:border-[#DDA15E] text-[#231F1C] dark:text-[#EAE4DA]';
    }

    if (optionId === correctOptionId) {
      return 'bg-[#EBF7EE] dark:bg-[#1C3322] border-[#2E8540] text-[#1B5E20] dark:text-[#A3E635] font-semibold';
    }

    if (chosen === optionId && optionId !== correctOptionId) {
      return 'bg-[#FDF2F2] dark:bg-[#3D1A1A] border-[#D32F2F] text-[#B71C1C] dark:text-[#FCA5A5]';
    }

    return 'bg-[#F5EFE3] dark:bg-[#1A1715] border-[#DDD6C8] dark:border-[#38322C] opacity-60 text-[#8A8278] dark:text-[#7A7268]';
  }

  finishStory(story: Story): void {
    const elapsedSec = Math.max(15, Math.round((Date.now() - this.readingStartTime) / 1000));
    const answered = this.answeredQuestions();
    const questions = story.comprehensionQuestions || [];

    const questionResults = questions.map((q) => ({
      question: q,
      isCorrect: answered[q.id] === q.correctOptionId,
    }));

    const outcome = this.learnerService.recordAssessmentOutcome(
      story.id,
      story.title,
      questionResults,
      elapsedSec,
      story.wordCount
    );

    const minutes = elapsedSec / 60;
    const calculatedWpm = Math.max(40, Math.round(story.wordCount / minutes));
    this.readingWpm.set(calculatedWpm);

    this.assessmentResult.set({
      scorePercent: outcome.scorePercent,
      testedCategories: outcome.testedCategories,
      mistakeCategories: outcome.mistakeCategories,
    });
    this.completed.set(true);
  }
}

