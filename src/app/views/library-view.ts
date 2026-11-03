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
    <div class="space-y-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800/80 pb-6">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs !w-3.5 !h-3.5">auto_stories</mat-icon>
            <span>Bibliothèque Francophone</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-serif font-medium text-neutral-900 dark:text-neutral-50 tracking-tight">
            {{ i18n.t('library.title') }}
          </h1>
          <p class="text-xs sm:text-sm font-reading text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            {{ i18n.t('library.description') }}
          </p>
        </div>

        <!-- View Mode Switcher: Trilha vs Catálogo -->
        <div class="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full self-start md:self-auto border border-neutral-200 dark:border-neutral-800">
          <button
            type="button"
            (click)="viewMode.set('fil_conducteur')"
            [class]="viewMode() === 'fil_conducteur' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
            class="px-3.5 py-1 text-xs rounded-full transition-all flex items-center gap-1.5">
            <mat-icon class="text-xs !w-3.5 !h-3.5">timeline</mat-icon>
            <span>Trilha Recomendada</span>
          </button>
          <button
            type="button"
            (click)="viewMode.set('full_catalog')"
            [class]="viewMode() === 'full_catalog' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
            class="px-3.5 py-1 text-xs rounded-full transition-all flex items-center gap-1.5">
            <mat-icon class="text-xs !w-3.5 !h-3.5">grid_view</mat-icon>
            <span>Catálogo Completo</span>
          </button>
        </div>
      </div>

      <!-- MODE 1: TRILHA PERSONALIZADA (LE FIL CONDUCTEUR) -->
      @if (viewMode() === 'fil_conducteur') {
        <div class="space-y-12">
          <!-- Placement Diagnostic Awareness Callout -->
          <div class="p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 flex items-center justify-center shrink-0">
                <mat-icon class="text-sm !w-4 !h-4">flag</mat-icon>
              </span>
              <div>
                <span class="font-semibold text-neutral-900 dark:text-neutral-100 block">
                  Seu Ponto de Partida Atual: CEFR {{ userLevel() }}
                </span>
                <span class="text-neutral-500 dark:text-neutral-400 text-[11px]">
                  Trilha calibrada para otimizar compreensão textual e prevenir interferências do português.
                </span>
              </div>
            </div>
            <a routerLink="/placement" class="font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-neutral-50 text-xs underline shrink-0">
              Recalibrar Nível →
            </a>
          </div>

          <!-- Shelf 1: Ponto de Partida -->
          <section class="space-y-5">
            <div class="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800/80 pb-2">
              <div>
                <h2 class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span>1. Seu Ponto de Partida</span>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                    Nível {{ userLevel() }}
                  </span>
                </h2>
                <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
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
            <div class="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800/80 pb-2">
              <div>
                <h2 class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span>2. Desafio Gradual (Entrada Compreensível n+1)</span>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {{ userLevel() === 'B2' || userLevel() === 'C1' ? 'B2+ / C1 Avançado' : 'Nível ' + nextLevel() }}
                  </span>
                </h2>
                <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
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
            <div class="flex items-baseline justify-between border-b border-neutral-200 dark:border-neutral-800/80 pb-2">
              <div>
                <h2 class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
                  <span>3. Foco em Interferência e Falsos Amigos</span>
                  <span class="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300">
                    Falsos Cognatos
                  </span>
                </h2>
                <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400">
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
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-3 border-y border-neutral-200 dark:border-neutral-800">
          <!-- CEFR Level Filters -->
          <div class="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              (click)="selectedLevel.set('all')"
              [class]="selectedLevel() === 'all' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
              class="px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0">
              {{ i18n.t('library.filters.all_levels') }}
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('A1')"
              [class]="selectedLevel() === 'A1' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
              class="px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0">
              A1
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('A2')"
              [class]="selectedLevel() === 'A2' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
              class="px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0">
              A2
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('B1')"
              [class]="selectedLevel() === 'B1' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
              class="px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0">
              B1
            </button>
            <button
              type="button"
              (click)="selectedLevel.set('B2')"
              [class]="selectedLevel() === 'B2' ? 'bg-white dark:bg-[#1C1C1C] text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold' : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'"
              class="px-3 py-1 text-xs rounded-full transition-colors whitespace-nowrap shrink-0">
              B2
            </button>
          </div>

          <!-- Source Type Filters -->
          <div class="flex items-center gap-2">
            <label for="sourceSelect" class="text-xs font-mono text-neutral-400 dark:text-neutral-500 whitespace-nowrap">{{ i18n.t('library.filters.source_label') }}</label>
            <select
              id="sourceSelect"
              [value]="selectedSource()"
              (change)="onSourceChange($event)"
              class="text-xs bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800 rounded-full px-3 py-1 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900">
              <option value="all">{{ i18n.t('library.filters.sources.all') }}</option>
              <option value="public_domain">{{ i18n.t('library.filters.sources.public_domain') }}</option>
              <option value="ai_original">{{ i18n.t('library.filters.sources.ai_original') }}</option>
              <option value="adapted_literature">{{ i18n.t('library.filters.sources.adapted_literature') }}</option>
              <option value="contemporary_news">{{ i18n.t('library.filters.sources.contemporary_news') }}</option>
            </select>
          </div>
        </div>

        <!-- Story Catalog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (story of filteredStories(); track story.id) {
            <ng-container *ngTemplateOutlet="storyCard; context: { $implicit: story }"></ng-container>
          } @empty {
            <div class="col-span-full py-16 text-center space-y-3">
              <mat-icon class="text-3xl leading-none !w-8 !h-8 text-neutral-400">filter_list_off</mat-icon>
              <p class="text-neutral-500 dark:text-neutral-400 text-sm">{{ i18n.t('library.empty_state_msg') }}</p>
              <button
                type="button"
                (click)="resetFilters()"
                class="text-xs font-mono text-neutral-900 dark:text-neutral-100 underline">
                {{ i18n.t('library.reset_filters') }}
              </button>
            </div>
          }
        </div>
      }

      <!-- Reusable Story Card Template -->
      <ng-template #storyCard let-story>
        <article class="flex flex-col justify-between p-5 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 group">
          <div class="space-y-3">
            <div class="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <img
                [src]="story.coverImage || story.coverImageUrl || '/images/cover-marais.svg'"
                [alt]="story.title"
                loading="lazy"
                class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
              <div class="absolute top-3 right-3 bg-neutral-900/90 text-white dark:bg-neutral-100/90 dark:text-neutral-900 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full backdrop-blur-xs">
                CEFR {{ story.estimatedCEFR || story.estimatedCefr || 'B1' }}
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex items-center gap-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                <span>{{ i18n.t('home.reading_time', { minutes: story.readingMinutes }) }}</span>
                <span>·</span>
                <span>{{ story.wordCount }} mots</span>
                <span>·</span>
                <span class="truncate">{{ story.genre }}</span>
              </div>

              <h2 class="text-lg font-serif font-medium text-neutral-900 dark:text-neutral-100 leading-snug group-hover:underline">
                {{ story.title }}
              </h2>

              <p class="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                {{ story.author }}
              </p>

              <p class="text-xs font-reading text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                {{ story.excerpt }}
              </p>

              <div class="pt-1 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                {{ i18n.t('library.provenance_prefix') }} <span class="text-neutral-700 dark:text-neutral-300">{{ story.sourceLabel }}</span>
              </div>
            </div>
          </div>

          <div class="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between">
            @if (story.audioAvailable) {
              <span class="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">volume_up</mat-icon>
                <span>{{ i18n.t('library.audio_included') }}</span>
              </span>
            } @else {
              <span></span>
            }

            <a
              [routerLink]="['/read', story.id]"
              class="inline-flex items-center gap-1 text-xs font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
              <span>{{ i18n.t('library.btn_read_story') }}</span>
              <mat-icon class="text-xs !w-3.5 !h-3.5">arrow_forward</mat-icon>
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
