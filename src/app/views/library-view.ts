import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoryService } from '../core/services/story';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-library-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="space-y-8">
      <!-- Section Header -->
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight">
          {{ i18n.t('library.title') }}
        </h1>
        <p class="text-sm font-reading text-[#5A524A] dark:text-[#B5ADA3] max-w-2xl leading-relaxed">
          {{ i18n.t('library.description') }}
        </p>
      </div>

      <!-- Filters Ribbon -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 border-y border-[#E6DFD3] dark:border-[#332D28]">
        <!-- CEFR Level Filters -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFE9DD] dark:bg-[#1A1715] rounded-lg">
          <button
            type="button"
            (click)="selectedLevel.set('all')"
            [class]="selectedLevel() === 'all' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('library.filters.all_levels') }}
          </button>
          <button
            type="button"
            (click)="selectedLevel.set('A2')"
            [class]="selectedLevel() === 'A2' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('library.filters.a2') }}
          </button>
          <button
            type="button"
            (click)="selectedLevel.set('B1')"
            [class]="selectedLevel() === 'B1' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('library.filters.b1') }}
          </button>
          <button
            type="button"
            (click)="selectedLevel.set('B2')"
            [class]="selectedLevel() === 'B2' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('library.filters.b2') }}
          </button>
        </div>

        <!-- Source Type Filters -->
        <div class="flex items-center gap-2">
          <label for="sourceSelect" class="text-xs text-[#6C645C] dark:text-[#9C9387] whitespace-nowrap">{{ i18n.t('library.filters.source_label') }}</label>
          <select
            id="sourceSelect"
            [value]="selectedSource()"
            (change)="onSourceChange($event)"
            class="text-xs bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#DDD6C8] dark:border-[#38322C] rounded-lg px-2.5 py-1.5 text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]">
            <option value="all">{{ i18n.t('library.filters.sources.all') }}</option>
            <option value="public_domain">{{ i18n.t('library.filters.sources.public_domain') }}</option>
            <option value="ai_original">{{ i18n.t('library.filters.sources.ai_original') }}</option>
            <option value="adapted_literature">{{ i18n.t('library.filters.sources.adapted_literature') }}</option>
            <option value="contemporary_news">{{ i18n.t('library.filters.sources.contemporary_news') }}</option>
          </select>
        </div>
      </div>

      <!-- Story Catalog Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (story of filteredStories(); track story.id) {
          <article class="flex flex-col justify-between paper-page rounded-2xl overflow-hidden shadow-xs hover:border-[#D1C7B7] dark:hover:border-[#473F37] transition-all duration-300 group">
            <div>
              <div class="relative aspect-[4/5] overflow-hidden bg-[#1A1715] flex items-center justify-center p-3 border-b border-[#E6DFD3] dark:border-[#332D28]">
                <div class="relative w-full h-full rounded-lg overflow-hidden book-cover-shadow">
                  <img
                    [src]="story.coverImage"
                    [alt]="story.title"
                    loading="lazy"
                    class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                </div>
                <div class="absolute top-4 right-4 bg-[#181513]/90 backdrop-blur-xs text-[#EAE4DA] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#3E362F] shadow-sm">
                  CEFR {{ story.estimatedCEFR }}
                </div>
              </div>

              <div class="p-5 space-y-2.5">
                <div class="flex items-center gap-2 text-xs text-[#6C645C] dark:text-[#9C9387]">
                  <span>{{ i18n.t('home.reading_time', { minutes: story.readingMinutes }) }}</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ story.wordCount }} palavras</span>
                  <span aria-hidden="true">·</span>
                  <span>{{ story.genre }}</span>
                </div>

                <h2 class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] leading-snug group-hover:text-[#9C3823] dark:group-hover:text-[#DDA15E] transition-colors">
                  {{ story.title }}
                </h2>

                <p class="text-xs text-[#5A524A] dark:text-[#B5ADA3] font-medium">
                  {{ story.author }}
                </p>

                <p class="text-xs font-reading text-[#4A423B] dark:text-[#C5BFB5] line-clamp-3 leading-relaxed">
                  {{ story.excerpt }}
                </p>

                <div class="pt-2 text-[11px] text-[#8A8278] dark:text-[#7A7268]">
                  {{ i18n.t('library.provenance_prefix') }} <span class="text-[#3A342F] dark:text-[#D8D2C7]">{{ story.sourceLabel }}</span>
                </div>
              </div>
            </div>

            <div class="p-5 pt-0 border-t border-[#EFE9DD] dark:border-[#2C2723] mt-4 flex items-center justify-between">
              @if (story.audioAvailable) {
                <span class="inline-flex items-center gap-1.5 text-[11px] text-[#78350F] dark:text-[#FBBF24] font-medium">
                  <mat-icon class="text-sm leading-none !w-3.5 !h-3.5">record_voice_over</mat-icon>
                  <span>{{ i18n.t('library.audio_included') }}</span>
                </span>
              } @else {
                <span></span>
              }

              <a
                [routerLink]="['/read', story.id]"
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#231F1C] dark:bg-[#EAE4DA] text-white dark:text-[#181513] hover:opacity-90 transition-opacity shadow-xs">
                <span>{{ i18n.t('library.btn_read_story') }}</span>
                <mat-icon class="text-sm leading-none !w-3.5 !h-3.5">arrow_forward</mat-icon>
              </a>
            </div>
          </article>
        } @empty {
          <div class="col-span-full py-16 text-center space-y-3">
            <mat-icon class="text-3xl text-[#8A8278]">filter_list_off</mat-icon>
            <p class="text-[#5A524A] dark:text-[#B5ADA3] text-sm">{{ i18n.t('library.empty_state_msg') }}</p>
            <button
              type="button"
              (click)="resetFilters()"
              class="text-xs text-[#9C3823] dark:text-[#DDA15E] underline font-medium">
              {{ i18n.t('library.reset_filters') }}
            </button>
          </div>
        }
      </div>
    </div>
  `,
})
export class LibraryView {
  readonly storyService = inject(StoryService);
  readonly i18n = inject(I18nService);

  readonly selectedLevel = signal<string>('all');
  readonly selectedSource = signal<string>('all');

  readonly filteredStories = computed(() => {
    const all = this.storyService.stories();
    const level = this.selectedLevel();
    const source = this.selectedSource();

    return all.filter((s) => {
      const matchLevel = level === 'all' || s.estimatedCEFR === level;
      const matchSource = source === 'all' || s.sourceType === source;
      return matchLevel && matchSource;
    });
  });

  onSourceChange(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.selectedSource.set(val);
  }

  resetFilters(): void {
    this.selectedLevel.set('all');
    this.selectedSource.set('all');
  }
}
