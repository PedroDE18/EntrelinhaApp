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
    <header class="sticky top-0 z-40 bg-[#F7F4EE]/92 dark:bg-[#181513]/92 backdrop-blur-md border-b border-[#E6DFD3] dark:border-[#332D28] transition-colors safe-top-padding">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <!-- Zone 1: Single text element wordmark -->
        <a routerLink="/" class="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#231F1C] dark:text-[#EAE4DA] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2">
          <span>Entrelinha</span>
        </a>

        <!-- Zone 2: Desktop navigation links -->
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
          <a routerLink="/placement" routerLinkActive="text-[#231F1C] dark:text-[#EAE4DA] font-semibold border-b-2 border-[#231F1C] dark:border-[#EAE4DA] pb-0.5" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-xs">
            <mat-icon class="text-sm !w-3.5 !h-3.5 text-[#9C3823] dark:text-[#DDA15E]">explore</mat-icon>
            <span>Nivelamento</span>
          </a>
        </nav>

        <!-- Zone 3: User Badge & Theme switch -->
        <div class="flex items-center gap-2.5 shrink-0">
          <a
            routerLink="/profile"
            title="Perfil ativo: {{ auth.currentUser().name }} ({{ auth.currentUser().username }})"
            class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#221E1B] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors shadow-2xs">
            <span class="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]"
                  [class]="auth.isAdmin() ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-200' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'">
              {{ auth.currentUser().name.charAt(0) }}
            </span>
            <span class="font-medium max-w-[100px] truncate">{{ auth.currentUser().username }}</span>
            <span class="text-[9px] font-mono px-1 py-0.2 rounded font-bold uppercase"
                  [class]="auth.isAdmin() ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'">
              {{ auth.isAdmin() ? 'Admin' : auth.currentUser().readingCEFR }}
            </span>
          </a>

          <button
            type="button"
            (click)="theme.toggleTheme()"
            [attr.aria-label]="theme.isDark() ? i18n.t('nav.theme_toggle_aria_light') : i18n.t('nav.theme_toggle_aria_dark')"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] bg-[#FCFAF7] dark:bg-[#221E1B] hover:bg-[#F2ECE1] dark:hover:bg-[#2C2723] transition-colors whitespace-nowrap shrink-0 shadow-xs touch-target-min">
            <mat-icon class="text-base leading-none !w-4 !h-4">{{ theme.isDark() ? 'light_mode' : 'dark_mode' }}</mat-icon>
            <span class="hidden sm:inline">{{ theme.isDark() ? i18n.t('nav.theme_light') : i18n.t('nav.theme_dark') }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Fixed Bottom Tab Bar (Optimized for iPhone 13 & 390px Viewports) -->
    <nav class="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FCFAF7]/95 dark:bg-[#1A1715]/95 backdrop-blur-lg border-t border-[#E6DFD3] dark:border-[#332D28] flex items-center justify-around py-1.5 px-1 text-[11px] font-medium text-[#6C645C] dark:text-[#9C9387] pb-[max(env(safe-area-inset-bottom),0.5rem)] shadow-lg transition-colors">
      <a
        routerLink="/"
        routerLinkActive="text-[#78350F] dark:text-[#FBBF24] font-bold"
        [routerLinkActiveOptions]="{ exact: true }"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] min-h-[44px] rounded-lg transition-colors">
        <mat-icon class="text-xl leading-none !w-5 !h-5">home</mat-icon>
        <span class="text-[10px]">{{ i18n.t('nav.home') }}</span>
      </a>
      <a
        routerLink="/read/ombre-du-marais"
        routerLinkActive="text-[#78350F] dark:text-[#FBBF24] font-bold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] min-h-[44px] rounded-lg transition-colors">
        <mat-icon class="text-xl leading-none !w-5 !h-5">menu_book</mat-icon>
        <span class="text-[10px]">{{ i18n.t('nav.read') }}</span>
      </a>
      <a
        routerLink="/library"
        routerLinkActive="text-[#78350F] dark:text-[#FBBF24] font-bold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] min-h-[44px] rounded-lg transition-colors">
        <mat-icon class="text-xl leading-none !w-5 !h-5">local_library</mat-icon>
        <span class="text-[10px]">{{ i18n.t('nav.library') }}</span>
      </a>
      <a
        routerLink="/progress"
        routerLinkActive="text-[#78350F] dark:text-[#FBBF24] font-bold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] min-h-[44px] rounded-lg transition-colors">
        <mat-icon class="text-xl leading-none !w-5 !h-5">insights</mat-icon>
        <span class="text-[10px]">{{ i18n.t('nav.progress') }}</span>
      </a>
      <a
        routerLink="/profile"
        routerLinkActive="text-[#78350F] dark:text-[#FBBF24] font-bold"
        class="flex flex-col items-center justify-center gap-0.5 px-2 py-1 min-w-[56px] min-h-[44px] rounded-lg transition-colors">
        <mat-icon class="text-xl leading-none !w-5 !h-5">person</mat-icon>
        <span class="text-[10px]">{{ i18n.t('nav.profile') }}</span>
      </a>
    </nav>
  `,
})
export class TopBar {
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);
  readonly auth = inject(AuthService);
}
