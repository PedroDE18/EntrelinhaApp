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
        <div class="flex items-center justify-between gap-4 py-3 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
          <a routerLink="/library" class="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors font-mono">
            <mat-icon class="text-sm leading-none !w-4 !h-4">arrow_back</mat-icon>
            <span>{{ i18n.t('reader.back_to_library') }}</span>
          </a>

          <div class="flex items-center gap-2.5">
            <!-- Typography font style toggle -->
            <button
              type="button"
              (click)="toggleFontSerif()"
              [attr.aria-label]="useSerif() ? i18n.t('reader.aria_font_sans') : i18n.t('reader.aria_font_serif')"
              class="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors font-mono text-[11px]">
              {{ useSerif() ? i18n.t('reader.font_serif') : i18n.t('reader.font_sans') }}
            </button>

            <!-- Text Size adjuster -->
            <div class="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-full overflow-hidden bg-white dark:bg-[#141414]">
              <button
                type="button"
                (click)="decreaseFontSize()"
                [attr.aria-label]="i18n.t('reader.aria_font_decrease')"
                class="px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs font-mono text-neutral-800 dark:text-neutral-200">
                A-
              </button>
              <span class="px-2 py-1 bg-neutral-50 dark:bg-[#0E0E0E] text-[10px] font-mono border-x border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                {{ fontSize() }}px
              </span>
              <button
                type="button"
                (click)="increaseFontSize()"
                [attr.aria-label]="i18n.t('reader.aria_font_increase')"
                class="px-2.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-xs font-mono text-neutral-800 dark:text-neutral-200">
                A+
              </button>
            </div>
          </div>
        </div>

        <!-- Audio Narration Bar: Floating Stoic Dock -->
        <div
          [class.sticky]="speech.isPlaying()"
          [class.top-16]="speech.isPlaying()"
          [class.z-30]="speech.isPlaying()"
          [class.shadow-md]="speech.isPlaying()"
          class="bg-white/95 dark:bg-[#141414]/95 backdrop-blur-md rounded-2xl p-4 border border-neutral-200/80 dark:border-neutral-800/80 transition-all space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <!-- Play / Pause primary toggle button -->
              <button
                type="button"
                (click)="toggleAudio(s)"
                [attr.aria-label]="speech.isPlaying() ? i18n.t('reader.aria_pause') : i18n.t('reader.aria_play')"
                class="inline-flex items-center justify-center w-9 h-9 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-all">
                <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">
                  {{ speech.isPlaying() ? 'pause' : 'play_arrow' }}
                </mat-icon>
              </button>

              <!-- Replay button -->
              <button
                type="button"
                (click)="speech.replay()"
                [attr.aria-label]="i18n.t('reader.aria_replay')"
                class="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-center">
                <mat-icon class="text-sm leading-none !w-4 !h-4">replay</mat-icon>
              </button>

              <div class="space-y-0.5">
                <div class="text-xs font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span>{{ i18n.t('reader.audio_narration_title') }}</span>
                  <!-- Interactive Natural Voice Selector -->
                  @if (speech.availableFrenchVoices().length > 1) {
                    <div class="relative inline-block">
                      <select
                        [value]="speech.selectedVoiceId()"
                        (change)="onVoiceChange($event)"
                        title="Escolha a voz francesa com maior naturalidade para seu dispositivo"
                        class="text-[10px] font-mono pl-2 pr-5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 appearance-none cursor-pointer focus:outline-none">
                        @for (v of speech.availableFrenchVoices(); track v.name) {
                          <option [value]="v.name">
                            {{ v.label }}
                          </option>
                        }
                      </select>
                      <mat-icon class="text-[10px] leading-none !w-3 !h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500">
                        arrow_drop_down
                      </mat-icon>
                    </div>
                  } @else {
                    <span class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      <mat-icon class="text-[11px] leading-none !w-3 !h-3">record_voice_over</mat-icon>
                      <span>{{ speech.activeVoiceName() }}</span>
                    </span>
                  }
                </div>
                <div class="text-[11px] text-neutral-400 dark:text-neutral-500">
                  {{ i18n.t('reader.audio_narration_subtitle') }}
                </div>
              </div>
            </div>

            <!-- Auto-scroll & Playback Speed Controls -->
            <div class="flex items-center gap-2 text-xs flex-wrap">
              <button
                type="button"
                (click)="toggleAutoScroll()"
                [class]="autoScrollEnabled() ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'"
                title="Rastreamento cinematográfico e centralização automática durante a narração"
                class="px-2.5 py-0.5 rounded-full text-[11px] font-mono flex items-center gap-1 transition-colors">
                <mat-icon class="text-xs leading-none !w-3 !h-3">center_focus_strong</mat-icon>
                <span>Auto-scroll</span>
              </button>

              <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mr-0.5">{{ i18n.t('reader.speed_label') }}</span>
              @for (speed of [0.75, 0.92, 1.0, 1.25]; track speed) {
                <button
                  type="button"
                  (click)="speech.setSpeed(speed)"
                  [class]="speech.currentSpeed() === speed ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
                  class="px-2 py-0.5 rounded-full font-mono text-[11px] transition-colors">
                  {{ speed === 0.92 ? '0.9x' : speed + 'x' }}
                </button>
              }
            </div>
          </div>

          <!-- Progress scrubber -->
          <div class="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
            <div
              class="bg-neutral-900 dark:bg-neutral-100 h-full transition-all duration-300"
              [style.width.%]="speech.progressPercent()"></div>
          </div>
        </div>

        <!-- Story Header: Clean Editorial Title & Frontispiece Vignette -->
        <header class="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-3 pb-6 border-b border-neutral-200 dark:border-neutral-800">
          <div class="w-24 sm:w-28 md:w-32 flex-shrink-0 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 aspect-[4/5]">
            <img [src]="s.coverImage || s.coverImageUrl || '/images/cover-marais.svg'" [alt]="s.title" class="w-full h-full object-cover block" />
          </div>

          <div class="flex-1 space-y-2 text-center sm:text-left">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              <span class="px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold">
                {{ i18n.t('home.level', { level: s.estimatedCEFR }) }}
              </span>
              <span>·</span>
              <span>{{ i18n.t('reader.reading_time_words', { minutes: s.readingMinutes, words: s.wordCount }) }}</span>
              <span>·</span>
              <span>{{ s.genre }}</span>
            </div>

            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-neutral-900 dark:text-neutral-50 tracking-tight leading-tight">
              {{ s.title }}
            </h1>

            <div class="text-xs font-mono text-neutral-400 dark:text-neutral-500 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span>Par <strong class="font-medium text-neutral-900 dark:text-neutral-100">{{ s.author }}</strong></span>
              @if (s.sourceUrl) {
                <span>·</span>
                <a [href]="s.sourceUrl" target="_blank" rel="noopener noreferrer" class="hover:underline text-neutral-600 dark:text-neutral-400">
                  {{ i18n.t('reader.source_link') }}
                </a>
              }
            </div>

            @if (s.excerpt) {
              <p class="text-xs sm:text-sm font-reading italic text-neutral-500 dark:text-neutral-400 max-w-xl leading-relaxed pt-1 hidden sm:block">
                « {{ s.excerpt }} »
              </p>
            }
          </div>
        </header>

        <!-- Reading Bookmark Notification (Retomar Leitura) -->
        @if (savedBookmarkParagraph(); as bookmarkIdx) {
          <div class="flex items-center justify-between p-3.5 px-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
            <div class="flex items-center gap-2">
              <mat-icon class="text-sm text-neutral-900 dark:text-neutral-100 !w-4 !h-4">bookmark</mat-icon>
              <span>Você parou a leitura no <strong>parágrafo {{ bookmarkIdx + 1 }}</strong>.</span>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                (click)="scrollToParagraph(bookmarkIdx)"
                class="font-semibold text-neutral-900 dark:text-neutral-100 hover:underline cursor-pointer">
                Retomar aqui
              </button>
              <button
                type="button"
                (click)="clearBookmark(s.id)"
                title="Dispensar marcador"
                class="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 p-0.5 cursor-pointer">
                <mat-icon class="text-xs !w-3.5 !h-3.5">close</mat-icon>
              </button>
            </div>
          </div>
        }

        <!-- Reading Canvas: Stoic Distraction-Free Text Sanctuary -->
        <div class="p-6 sm:p-10 lg:p-14 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] shadow-sm">
          <article
            class="max-w-2xl mx-auto space-y-6 text-neutral-800 dark:text-neutral-200"
            [class.font-reading]="useSerif()"
            [class.font-sans]="!useSerif()"
            [style.fontSize.px]="fontSize()"
            [style.lineHeight]="1.85">
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
                  class="opacity-0 group-hover/para:opacity-100 transition-opacity absolute -left-7 top-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 p-0.5 cursor-pointer">
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
                      [class.bg-neutral-100]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-neutral-800]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.underline]="tok.falseFriend || tok.genderTrap"
                      [class.decoration-neutral-400]="tok.falseFriend || tok.genderTrap"
                      [class.underline-offset-2]="tok.falseFriend || tok.genderTrap"
                      [class.border-b]="tok.isMultiword"
                      [class.border-dotted]="tok.isMultiword"
                      [class.border-neutral-400]="tok.isMultiword"
                      [class.bg-neutral-50]="tok.isMultiword && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-neutral-800/50]="tok.isMultiword && !isSentenceActive(pIdx, tok.sentenceNumber)"
                      class="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded px-0.5 py-0.5 inline transition-colors">
                      {{ tok.text }}
                    </span>
                  } @else {
                    <span
                      [attr.data-sentence-id]="pIdx + '-' + tok.sentenceNumber"
                      [class.bg-neutral-100]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      [class.dark:bg-neutral-800]="isSentenceActive(pIdx, tok.sentenceNumber)"
                      class="whitespace-pre-wrap select-text transition-colors duration-200">{{ tok.text }}</span>
                  }
                }
              </p>
            }
          </article>
        </div>

        <!-- Interactive Contextual Gloss Modal / Card -->
        @if (selectedToken(); as tok) {
          <div class="fixed inset-x-0 bottom-0 sm:bottom-4 z-50 max-w-lg mx-auto px-2 sm:px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div class="bg-white dark:bg-[#161616] rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl border border-neutral-200 dark:border-neutral-800 space-y-4">
              <!-- Header of gloss -->
              <div class="flex items-start justify-between gap-3">
                <div class="space-y-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100">{{ tok.fullText }}</span>
                    @if (tok.isMultiword) {
                      <span class="text-[9px] font-mono uppercase tracking-wider bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700">
                        Expressão ({{ tok.tokenCount }} termos)
                      </span>
                    }
                    <button
                      type="button"
                      (click)="speech.speakWord(tok.fullText)"
                      [attr.aria-label]="i18n.t('reader.gloss.aria_pronounce')"
                      class="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 p-1 rounded transition-colors">
                      <mat-icon class="text-sm leading-none !w-4 !h-4">volume_up</mat-icon>
                    </button>
                  </div>
                  @if (tok.definitionFr) {
                    <p class="text-xs text-neutral-500 dark:text-neutral-400">
                      {{ i18n.t('reader.gloss.french_definition') }} <span class="italic text-neutral-800 dark:text-neutral-200">{{ tok.definitionFr }}</span>
                    </p>
                  }
                </div>

                <button
                  type="button"
                  (click)="closeGloss()"
                  [attr.aria-label]="i18n.t('reader.gloss.aria_close')"
                  class="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 p-1">
                  <mat-icon class="text-lg leading-none !w-5 !h-5">close</mat-icon>
                </button>
              </div>

              <!-- Brazilian Portuguese Translation & Contrast -->
              <div class="p-3.5 bg-neutral-50 dark:bg-[#1E1E1E] rounded-xl border border-neutral-200/80 dark:border-neutral-800 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                    {{ i18n.t('reader.gloss.portuguese_heading') }}
                  </span>
                  @if (tok.falseFriend) {
                    <span class="text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded-full">
                      {{ i18n.t('reader.gloss.badge_false_friend') }}
                    </span>
                  }
                  @if (tok.genderTrap) {
                    <span class="text-[9px] font-mono font-bold uppercase tracking-wider bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-2 py-0.5 rounded-full">
                      {{ i18n.t('reader.gloss.badge_gender_trap') }}
                    </span>
                  }
                </div>

                <p class="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {{ tok.translationPt || ('Termo em contexto : ' + tok.cleanWord) }}
                </p>

                @if (tok.falseFriend) {
                  <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                    {{ tok.falseFriend.explanation }}
                  </p>
                }

                @if (tok.genderTrap) {
                  <p class="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed pt-1">
                    {{ tok.genderTrap.explanation }}
                  </p>
                }
              </div>

              <!-- Surrounding Sentence Context -->
              @if (tok.sentenceContext) {
                <div class="px-3 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg text-xs space-y-0.5 border border-neutral-200/60 dark:border-neutral-800">
                  <span class="text-[10px] uppercase font-mono text-neutral-400 dark:text-neutral-500 block">Contexto da Frase</span>
                  <p class="italic font-reading text-neutral-600 dark:text-neutral-400 line-clamp-2">"{{ tok.sentenceContext.trim() }}"</p>
                </div>
              }

              <!-- State Discrimination Selection -->
              <div class="space-y-1.5 pt-1">
                <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">{{ i18n.t('reader.gloss.classify_prompt') }}</span>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    (click)="classifyToken('want_to_learn', tok)"
                    class="px-3 py-2 text-left rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors border border-neutral-200 dark:border-neutral-800">
                    <span class="font-medium block text-xs">{{ i18n.t('reader.gloss.btn_want_to_learn') }}</span>
                    <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block font-mono">{{ i18n.t('reader.gloss.btn_want_to_learn_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_known', tok)"
                    class="px-3 py-2 text-left rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors border border-neutral-200 dark:border-neutral-800">
                    <span class="font-medium block text-xs">{{ i18n.t('reader.gloss.btn_known') }}</span>
                    <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block font-mono">{{ i18n.t('reader.gloss.btn_known_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_unknown', tok)"
                    class="px-3 py-2 text-left rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors border border-neutral-200 dark:border-neutral-800">
                    <span class="font-medium block text-xs">{{ i18n.t('reader.gloss.btn_unknown') }}</span>
                    <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block font-mono">{{ i18n.t('reader.gloss.btn_unknown_sub') }}</span>
                  </button>

                  <button
                    type="button"
                    (click)="classifyToken('mark_uncertain', tok)"
                    class="px-3 py-2 text-left rounded-xl bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors border border-neutral-200 dark:border-neutral-800">
                    <span class="font-medium block text-xs">{{ i18n.t('reader.gloss.btn_uncertain') }}</span>
                    <span class="text-[10px] text-neutral-400 dark:text-neutral-500 block font-mono">{{ i18n.t('reader.gloss.btn_uncertain_sub') }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }

        <!-- Provenance & Licensing Metadata Block -->
        <section class="mt-12 p-5 rounded-2xl bg-white dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800/80 space-y-2 text-xs text-neutral-500 dark:text-neutral-400">
          <div class="flex items-center gap-2 font-mono uppercase tracking-widest text-[10px] text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">verified</mat-icon>
            <span>{{ i18n.t('reader.provenance.heading') }}</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <span class="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] block">{{ i18n.t('reader.provenance.source_origin') }}</span>
              <span class="text-neutral-900 dark:text-neutral-100 font-medium">{{ s.sourceLabel }}</span>
            </div>
            <div>
              <span class="text-neutral-400 dark:text-neutral-500 font-mono text-[10px] block">{{ i18n.t('reader.provenance.license') }}</span>
              <span class="text-neutral-900 dark:text-neutral-100 font-medium">{{ s.licenseInfo }}</span>
            </div>
          </div>
          <p class="text-[11px] text-neutral-400 dark:text-neutral-500 pt-1 leading-relaxed">
            {{ i18n.t('reader.provenance.disclaimer') }}
          </p>
        </section>

        <!-- Comprehension Assessment Section -->
        <section class="mt-12 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#141414] border border-neutral-200/80 dark:border-neutral-800/80 space-y-6">
          <div class="space-y-1">
            <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">quiz</mat-icon>
              <span>{{ i18n.t('reader.quiz.badge') }}</span>
            </div>
            <h2 class="text-xl sm:text-2xl font-serif font-medium text-neutral-900 dark:text-neutral-100">
              {{ i18n.t('reader.quiz.title') }}
            </h2>
            <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {{ i18n.t('reader.quiz.subtitle') }}
            </p>
          </div>

          <!-- Questions loop -->
          <div class="space-y-6 pt-2">
            @for (q of s.comprehensionQuestions; track q.id; let qIdx = $index) {
              <div class="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-3">
                <div class="space-y-1">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {{ i18n.t('reader.quiz.question_label', { number: qIdx + 1, type: q.type }) }}
                  </span>
                  <h3 class="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100">
                    {{ q.questionFr }}
                  </h3>
                  <p class="text-xs text-neutral-500 dark:text-neutral-400 italic">
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
                      class="w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-colors flex items-start gap-2.5">
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
                  <div class="mt-3 p-3.5 rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 text-xs space-y-1 animate-in fade-in duration-150">
                    <div class="font-semibold text-neutral-900 dark:text-neutral-100">
                      {{ answeredQuestions()[q.id] === q.correctOptionId ? i18n.t('reader.quiz.correct_feedback') : i18n.t('reader.quiz.incorrect_feedback') }}
                    </div>
                    <p class="text-neutral-600 dark:text-neutral-300 leading-relaxed">{{ q.explanationFr }}</p>
                    <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed italic">{{ q.explanationPt }}</p>
                    @if (q.portugueseInterferenceNote) {
                      <div class="pt-1.5 text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">
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
            <div class="p-5 rounded-2xl border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 space-y-4 animate-in fade-in duration-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                <div class="space-y-0.5">
                  <div class="flex items-center gap-2 text-xs font-semibold text-neutral-900 dark:text-neutral-100 font-mono">
                    <mat-icon class="text-sm !w-4 !h-4 text-emerald-500">check_circle</mat-icon>
                    <span>Avaliação Registrada com Sucesso</span>
                  </div>
                  <h3 class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100">
                    Diagnóstico de Compreensão & Interferência
                  </h3>
                </div>

                <div class="flex items-center gap-4">
                  <div class="text-right">
                    <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block">Aproveitamento</span>
                    <span class="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      {{ res.scorePercent }}%
                    </span>
                  </div>
                  <div class="w-px h-8 bg-neutral-200 dark:bg-neutral-800"></div>
                  <div class="text-right">
                    <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block">Velocidade</span>
                    <span class="text-xl font-mono font-medium text-neutral-900 dark:text-neutral-100">
                      {{ readingWpm() }} <span class="text-[11px] font-normal text-neutral-400">ppm</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Categories tested vs mistakes -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="space-y-1">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                    Tópicos Linguísticos Avaliados:
                  </span>
                  <div class="flex flex-wrap gap-1.5">
                    @for (cat of res.testedCategories; track cat) {
                      <span class="px-2 py-0.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-[10px]">
                        {{ cat }}
                      </span>
                    }
                  </div>
                </div>

                <div class="space-y-1">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block">
                    Pontos de Atenção (Erros):
                  </span>
                  @if (res.mistakeCategories.length > 0) {
                    <div class="flex flex-wrap gap-1.5">
                      @for (cat of res.mistakeCategories; track cat) {
                        <span class="px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-mono text-[10px]">
                          {{ cat }}
                        </span>
                      }
                    </div>
                  } @else {
                    <span class="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono block">
                      ✓ Nenhuma armadilha acionada. Excelente precisão!
                    </span>
                  }
                </div>
              </div>

              <div class="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <span class="text-neutral-500 dark:text-neutral-400">
                  O Radar de Dificuldades do seu perfil foi atualizado.
                </span>
                <div class="flex items-center gap-3">
                  <a routerLink="/progress" class="font-mono text-xs text-neutral-900 dark:text-neutral-100 hover:underline inline-flex items-center gap-1">
                    <span>Revisar Vocabulário no SRS</span>
                    <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
                  </a>
                </div>
              </div>
            </div>
          } @else {
            <div class="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <div class="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                {{ i18n.t('reader.quiz.progress_counter', { answered: answeredCount(), total: s.comprehensionQuestions.length }) }}
              </div>

              <button
                type="button"
                (click)="finishStory(s)"
                [disabled]="completed() || answeredCount() === 0"
                class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-40">
                <mat-icon class="text-sm leading-none !w-4 !h-4">check_circle</mat-icon>
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

  onVoiceChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target?.value) {
      this.speech.setSelectedVoice(target.value);
    }
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

