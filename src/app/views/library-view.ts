import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StoryService } from '../core/services/story';
import { LearnerProfileService } from '../core/services/learner-profile';
import { I18nService } from '../core/services/i18n';
import { CEFRLevel, Story } from '../core/models';

@Component({
  selector: 'app-library-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, NgTemplateOutlet],
  template: `
    <div class="space-y-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">menu_book</mat-icon>
            <span>Bibliothèque Francophone</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight">
            {{ i18n.t('library.title') }}
          </h1>
          <p class="text-sm font-reading text-[#5A524A] dark:text-[#B5ADA3] max-w-2xl leading-relaxed">
            {{ i18n.t('library.description') }}
          </p>
        </div>

        <!-- View Mode Switcher: Trilha vs Catálogo -->
        <div class="flex items-center gap-1.5 p-1 bg-[#EFE9DD] dark:bg-[#1A1715] rounded-xl self-start md:self-auto border border-[#E0D7C7] dark:border-[#2C2723]">
          <button
            type="button"
            (click)="viewMode.set('fil_conducteur')"
            [class]="viewMode() === 'fil_conducteur' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3.5 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1.5">
            <mat-icon class="text-sm !w-4 !h-4">timeline</mat-icon>
            <span>Trilha Recomendada</span>
          </button>
          <button
            type="button"
            (click)="viewMode.set('full_catalog')"
            [class]="viewMode() === 'full_catalog' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
            class="px-3.5 py-1.5 text-xs rounded-lg transition-colors flex items-center gap-1.5">
            <mat-icon class="text-sm !w-4 !h-4">grid_view</mat-icon>
            <span>Catálogo Completo</span>
          </button>
        </div>
      </div>

      <!-- MODE 1: TRILHA PERSONALIZADA (LE FIL CONDUCTEUR) -->
      @if (viewMode() === 'fil_conducteur') {
        <div class="space-y-12">
          <!-- Placement Diagnostic Awareness Callout -->
          <div class="p-4 rounded-xl border border-[#DECDB3] dark:border-[#42362C] bg-gradient-to-r from-[#F9F5EE] to-[#F3EDE2] dark:from-[#201C19] dark:to-[#1A1614] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5">
              <span class="w-8 h-8 rounded-full bg-[#9C3823]/10 dark:bg-[#DDA15E]/15 text-[#9C3823] dark:text-[#DDA15E] flex items-center justify-center shrink-0">
                <mat-icon class="text-base !w-4 !h-4">flag</mat-icon>
              </span>
              <div>
                <span class="font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">
                  Seu Ponto de Partida Atual: Nível CEFR {{ userLevel() }}
                </span>
                <span class="text-[#6C645C] dark:text-[#9C9387]">
                  Trilha calibrada para otimizar compreensão textual e prevenir interferências do português.
                </span>
              </div>
            </div>
            <a routerLink="/placement" class="text-[#9C3823] dark:text-[#DDA15E] underline font-semibold shrink-0">
              Recalibrar Nível →
            </a>
          </div>

          <!-- Shelf 1: Ponto de Partida -->
          <section class="space-y-5">
            <div class="flex items-baseline justify-between border-b border-[#E6DFD3] dark:border-[#332D28] pb-2">
              <div>
                <h2 class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] flex items-center gap-2">
                  <span>1. Seu Ponto de Partida</span>
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#EFE8DC] dark:bg-[#2C2621] text-[#9C3823] dark:text-[#DDA15E]">
                    Nível {{ userLevel() }}
                  </span>
                </h2>
                <p class="text-xs font-reading text-[#6C645C] dark:text-[#9C9387]">
                  Histórias ideais para consolidar vocabulário e fluência sem sobrecarga cognitiva.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (story of startingPointStories(); track story.id) {
                <ng-container *ngTemplateOutlet="storyCard; context: { $implicit: story }"></ng-container>
              }
            </div>
          </section>

          <!-- Shelf 2: Desafio Gradual (n+1) -->
          <section class="space-y-5">
            <div class="flex items-baseline justify-between border-b border-[#E6DFD3] dark:border-[#332D28] pb-2">
              <div>
                <h2 class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] flex items-center gap-2">
                  <span>2. Desafio Gradual (Entrada Compreensível n+1)</span>
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#EFE8DC] dark:bg-[#2C2621] text-[#231F1C] dark:text-[#EAE4DA]">
                    {{ userLevel() === 'B2' || userLevel() === 'C1' ? 'B2+ / C1 Avançado' : 'Nível ' + nextLevel() }}
                  </span>
                </h2>
                <p class="text-xs font-reading text-[#6C645C] dark:text-[#9C9387]">
                  Obras um nível acima com apoio de vocabulário e explicações gramaticais.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (story of nextLevelStories(); track story.id) {
                <ng-container *ngTemplateOutlet="storyCard; context: { $implicit: story }"></ng-container>
              }
            </div>
          </section>

          <!-- Shelf 3: Foco Contrastivo -->
          <section class="space-y-5">
            <div class="flex items-baseline justify-between border-b border-[#E6DFD3] dark:border-[#332D28] pb-2">
              <div>
                <h2 class="text-xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] flex items-center gap-2">
                  <span>3. Foco em Interferência e Falsos Amigos</span>
                  <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#FDE8E8] dark:bg-[#3D1A1A] text-[#9C3823] dark:text-[#F8B4B4]">
                    Falsos Cognatos
                  </span>
                </h2>
                <p class="text-xs font-reading text-[#6C645C] dark:text-[#9C9387]">
                  Textos ricos em termos de grafia semelhante mas significados divergentes entre pt-BR e fr-FR.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (story of contrastiveStories(); track story.id) {
                <ng-container *ngTemplateOutlet="storyCard; context: { $implicit: story }"></ng-container>
              }
            </div>
          </section>
        </div>
      }

      <!-- MODE 2: CATÁLOGO COMPLETO COM FILTROS -->
      @if (viewMode() === 'full_catalog') {
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
              (click)="selectedLevel.set('A1')"
              [class]="selectedLevel() === 'A1' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
              class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
              A1
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('A2')"
              [class]="selectedLevel() === 'A2' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
              class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
              A2
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('B1')"
              [class]="selectedLevel() === 'B1' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
              class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
              B1
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('B2')"
              [class]="selectedLevel() === 'B2' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] shadow-xs font-semibold' : 'text-[#6C645C] dark:text-[#9C9387] hover:text-[#231F1C] dark:hover:text-[#EAE4DA]'"
              class="px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0">
              B2
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
            <ng-container *ngTemplateOutlet="storyCard; context: { $implicit: story }"></ng-container>
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
      }

      <!-- Reusable Story Card Template -->
      <ng-template #storyCard let-story>
        <article class="flex flex-col justify-between paper-page rounded-2xl overflow-hidden shadow-xs hover:border-[#D1C7B7] dark:hover:border-[#473F37] transition-all duration-300 group">
          <div>
            <div class="relative aspect-[4/5] overflow-hidden bg-[#1A1715] flex items-center justify-center p-3 border-b border-[#E6DFD3] dark:border-[#332D28]">
              <div class="relative w-full h-full rounded-lg overflow-hidden book-cover-shadow">
                <img
                  [src]="story.coverImage || story.coverImageUrl || '/images/cover-marais.svg'"
                  [alt]="story.title"
                  loading="lazy"
                  class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              </div>
              <div class="absolute top-4 right-4 bg-[#181513]/90 backdrop-blur-xs text-[#EAE4DA] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#3E362F] shadow-sm">
                CEFR {{ story.estimatedCEFR || story.estimatedCefr || 'B1' }}
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
      </ng-template>
    </div>
  `,
})
export class LibraryView {
  readonly storyService = inject(StoryService);
  readonly profileService = inject(LearnerProfileService);
  readonly i18n = inject(I18nService);

  readonly viewMode = signal<'fil_conducteur' | 'full_catalog'>('fil_conducteur');
  readonly selectedLevel = signal<string>('all');
  readonly selectedSource = signal<string>('all');

  readonly userLevel = computed<CEFRLevel>(() => this.profileService.profile().readingCEFR || 'A2');

  readonly nextLevel = computed<CEFRLevel>(() => {
    const map: Record<CEFRLevel, CEFRLevel> = {
      A1: 'A2',
      A2: 'B1',
      B1: 'B2',
      B2: 'C1',
      C1: 'C2',
      C2: 'C2',
    };
    return map[this.userLevel()] || 'B1';
  });

  readonly startingPointStories = computed(() => {
    const all = this.storyService.stories();
    const lvl = this.userLevel();
    const matches = all.filter((s) => s.estimatedCEFR === lvl);
    return matches.length > 0 ? matches : all.slice(0, 3);
  });

  readonly nextLevelStories = computed(() => {
    const all = this.storyService.stories();
    const next = this.nextLevel();
    const matches = all.filter((s) => s.estimatedCEFR === next);
    if (matches.length > 0) return matches;
    // For advanced learners (B2/C1), present high-density literary masterpieces (C1, B2)
    return all.filter((s) => s.estimatedCEFR === 'C1' || s.estimatedCEFR === 'B2').slice(0, 3);
  });

  readonly contrastiveStories = computed(() => {
    const all = this.storyService.stories();
    return all.filter((s) =>
      s.genre.includes('Psychologique') ||
      s.genre.includes('Mystère') ||
      s.genre.includes('Classique') ||
      s.genre.includes('Philosophie') ||
      s.id.includes('marais') ||
      s.id.includes('parure') ||
      s.id.includes('machado')
    ).slice(0, 3);
  });

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
