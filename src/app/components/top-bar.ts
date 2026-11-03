import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../core/services/theme';
import { I18nService } from '../core/services/i18n';
import { AuthService } from '../core/services/auth';

@Component({
  selector: 'app-top-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <!-- Top Header -->
    <header class="sticky top-0 z-40 bg-[#FAFAFA]/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/80 transition-colors safe-top-padding">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">
        <!-- Brand wordmark (Stoic lowercase + terminal dot) -->
        <a routerLink="/" class="text-base sm:text-lg font-sans font-bold tracking-tight text-neutral-900 dark:text-neutral-50 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity flex items-center gap-1.5">
          <span class="tracking-tighter">entrelinha<span class="text-neutral-400 dark:text-neutral-500">.</span></span>
        </a>

        <!-- Desktop navigation links -->
        <nav class="hidden md:flex items-center gap-6 text-xs font-medium text-neutral-500 dark:text-neutral-400">
          <a
            routerLink="/"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            [routerLinkActiveOptions]="{ exact: true }"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap">
            {{ i18n.t('nav.home') }}
          </a>
          <a
            routerLink="/read/ombre-du-marais"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap">
            {{ i18n.t('nav.read') }}
          </a>
          <a
            routerLink="/library"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap">
            {{ i18n.t('nav.library') }}
          </a>
          <a
            routerLink="/progress"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap">
            {{ i18n.t('nav.progress') }}
          </a>
          <a
            routerLink="/profile"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap">
            {{ i18n.t('nav.profile') }}
          </a>
          <a
            routerLink="/placement"
            routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
            class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors whitespace-nowrap flex items-center gap-1 text-[11px] text-neutral-400 dark:text-neutral-500">
            <span>Nivelamento</span>
          </a>
        </nav>

        <!-- Right Side: User Badge & Theme Switcher -->
        <div class="flex items-center gap-2 shrink-0">
          <a
            routerLink="/profile"
            title="Perfil ativo: {{ auth.currentUser().name }} ({{ auth.currentUser().username }})"
            class="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all">
            <span class="w-4 h-4 rounded-full flex items-center justify-center font-bold text-[9px] bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
              {{ auth.currentUser().name.charAt(0) }}
            </span>
            <span class="font-medium max-w-[90px] truncate text-[11px]">{{ auth.currentUser().username }}</span>
            <span class="text-[9px] font-mono px-1 rounded uppercase font-semibold text-neutral-400 dark:text-neutral-500">
              {{ auth.isAdmin() ? 'Admin' : auth.currentUser().readingCEFR }}
            </span>
          </a>

          <button
            type="button"
            (click)="theme.toggleTheme()"
            [attr.aria-label]="theme.isDark() ? i18n.t('nav.theme_toggle_aria_light') : i18n.t('nav.theme_toggle_aria_dark')"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
            <mat-icon class="text-sm leading-none !w-4 !h-4">{{ theme.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Fixed Bottom Tab Bar -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#111111]/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around py-1.5 px-2 text-[10px] font-medium text-neutral-500 dark:text-neutral-400 pb-[max(env(safe-area-inset-bottom),0.5rem)] transition-colors">
      <a
        routerLink="/"
        routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
        [routerLinkActiveOptions]="{ exact: true }"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[50px] min-h-[44px] transition-colors">
        <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">home</mat-icon>
        <span>{{ i18n.t('nav.home') }}</span>
      </a>
      <a
        routerLink="/read/ombre-du-marais"
        routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[50px] min-h-[44px] transition-colors">
        <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">auto_stories</mat-icon>
        <span>{{ i18n.t('nav.read') }}</span>
      </a>
      <a
        routerLink="/library"
        routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[50px] min-h-[44px] transition-colors">
        <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">grid_view</mat-icon>
        <span>{{ i18n.t('nav.library') }}</span>
      </a>
      <a
        routerLink="/progress"
        routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[50px] min-h-[44px] transition-colors">
        <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">query_stats</mat-icon>
        <span>{{ i18n.t('nav.progress') }}</span>
      </a>
      <a
        routerLink="/profile"
        routerLinkActive="text-neutral-950 dark:text-neutral-50 font-semibold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[50px] min-h-[44px] transition-colors">
        <mat-icon class="text-lg leading-none !w-4.5 !h-4.5">person</mat-icon>
        <span>{{ i18n.t('nav.profile') }}</span>
      </a>
    </nav>
  `,
})
export class TopBar {
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
}
