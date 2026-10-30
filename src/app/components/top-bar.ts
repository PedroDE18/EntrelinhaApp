import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../core/services/theme';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="sticky top-0 z-40 bg-[#F7F4EE]/90 dark:bg-[#181513]/90 backdrop-blur-md border-b border-[#E6DFD3] dark:border-[#332D28] transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        <!-- Zone 1: Single text element wordmark -->
        <a routerLink="/" class="text-xl sm:text-2xl font-serif font-semibold tracking-wider text-[#231F1C] dark:text-[#EAE4DA] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity">
          LINGUA
        </a>

        <!-- Zone 2: 4-5 concise single-line text navigation links -->
        <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-[#6C645C] dark:text-[#9C9387]">
          <a routerLink="/" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" [routerLinkActiveOptions]="{ exact: true }" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('nav.home') }}
          </a>
          <a routerLink="/read/ombre-du-marais" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('nav.read') }}
          </a>
          <a routerLink="/library" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('nav.library') }}
          </a>
          <a routerLink="/progress" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('nav.progress') }}
          </a>
          <a routerLink="/profile" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0">
            {{ i18n.t('nav.profile') }}
          </a>
        </nav>

        <!-- Zone 3: 1 primary action (Theme switch with localized label) -->
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            (click)="theme.toggleTheme()"
            [attr.aria-label]="theme.isDark() ? i18n.t('nav.theme_toggle_aria_light') : i18n.t('nav.theme_toggle_aria_dark')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] bg-[#FCFAF7] dark:bg-[#221E1B] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors whitespace-nowrap shrink-0 shadow-xs">
            <mat-icon class="text-base leading-none !w-4 !h-4">{{ theme.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            <span class="hidden sm:inline">{{ theme.isDark() ? i18n.t('nav.theme_light') : i18n.t('nav.theme_dark') }}</span>
          </button>
        </div>
      </div>

      <!-- Mobile navigation bar -->
      <div class="md:hidden flex items-center justify-around border-t border-[#E6DFD3] dark:border-[#332D28] py-2 px-2 text-xs font-medium text-[#6C645C] dark:text-[#9C9387] bg-[#F7F4EE] dark:bg-[#181513]">
        <a routerLink="/" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold" [routerLinkActiveOptions]="{ exact: true }" class="flex flex-col items-center gap-0.5 px-2 py-1">
          <mat-icon class="text-lg leading-none !w-5 !h-5">home</mat-icon>
          <span>{{ i18n.t('nav.home') }}</span>
        </a>
        <a routerLink="/read/ombre-du-marais" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold" class="flex flex-col items-center gap-0.5 px-2 py-1">
          <mat-icon class="text-lg leading-none !w-5 !h-5">menu_book</mat-icon>
          <span>{{ i18n.t('nav.read') }}</span>
        </a>
        <a routerLink="/library" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold" class="flex flex-col items-center gap-0.5 px-2 py-1">
          <mat-icon class="text-lg leading-none !w-5 !h-5">local_library</mat-icon>
          <span>{{ i18n.t('nav.library') }}</span>
        </a>
        <a routerLink="/progress" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold" class="flex flex-col items-center gap-0.5 px-2 py-1">
          <mat-icon class="text-lg leading-none !w-5 !h-5">insights</mat-icon>
          <span>{{ i18n.t('nav.progress') }}</span>
        </a>
        <a routerLink="/profile" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold" class="flex flex-col items-center gap-0.5 px-2 py-1">
          <mat-icon class="text-lg leading-none !w-5 !h-5">person</mat-icon>
          <span>{{ i18n.t('nav.profile') }}</span>
        </a>
      </div>
    </header>
  `,
})
export class TopBar {
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);
}
