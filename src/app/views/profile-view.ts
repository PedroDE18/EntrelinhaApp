import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { ThemeService } from '../core/services/theme';
import { I18nService, SupportedLocale } from '../core/services/i18n';

@Component({
  selector: 'app-profile-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  template: `
    <div class="space-y-10 max-w-3xl mx-auto">
      <!-- Section Header -->
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight">
          {{ i18n.t('profile.title') }}
        </h1>
        <p class="text-sm font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          {{ i18n.t('profile.subtitle') }}
        </p>
      </div>

      <!-- Language Configuration Card -->
      <section class="p-6 rounded-2xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28] space-y-4 shadow-xs">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
          <mat-icon class="text-sm leading-none !w-4 !h-4">translate</mat-icon>
          <span>{{ i18n.t('profile.language_pair_heading') }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28]">
            <span class="text-xs text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('profile.native_language_label') }}</span>
            <span class="text-base font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] mt-1 block">
              {{ i18n.t('profile.native_language_name') }}
            </span>
            <span class="text-[11px] text-[#6C645C] dark:text-[#9C9387] mt-0.5 block">{{ i18n.t('profile.native_language_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28]">
            <span class="text-xs text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('profile.target_language_label') }}</span>
            <span class="text-base font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] mt-1 block">
              {{ i18n.t('profile.target_language_name') }}
            </span>
            <span class="text-[11px] text-[#6C645C] dark:text-[#9C9387] mt-0.5 block">{{ i18n.t('profile.target_language_sub') }}</span>
          </div>
        </div>

        <!-- Interface Language Switcher -->
        <div class="pt-2 flex items-center justify-between border-t border-[#EFE9DD] dark:border-[#2C2723] text-xs">
          <div>
            <span class="font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">{{ i18n.t('profile.interface_language_label') }}</span>
            <span class="text-[#8A8278] dark:text-[#7A7268] block">Selecione o idioma de navegação da interface</span>
          </div>
          <div class="flex items-center gap-1.5 p-1 bg-[#EFE9DD] dark:bg-[#181513] rounded-lg">
            <button
              type="button"
              (click)="changeLocale('pt-BR')"
              [class]="i18n.currentLocale() === 'pt-BR' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] font-semibold shadow-xs' : 'text-[#6C645C] dark:text-[#9C9387]'"
              class="px-2.5 py-1 text-xs rounded transition-colors">
              Português (BR)
            </button>
            <button
              type="button"
              (click)="changeLocale('fr-FR')"
              [class]="i18n.currentLocale() === 'fr-FR' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] font-semibold shadow-xs' : 'text-[#6C645C] dark:text-[#9C9387]'"
              class="px-2.5 py-1 text-xs rounded transition-colors">
              Français (FR)
            </button>
          </div>
        </div>
      </section>

      <!-- Learning Preferences -->
      <section class="p-6 rounded-2xl bg-[#FCFAF7] dark:bg-[#221E1B] border border-[#E6DFD3] dark:border-[#332D28] space-y-5 shadow-xs">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6C645C] dark:text-[#9C9387]">
          <mat-icon class="text-sm leading-none !w-4 !h-4">tune</mat-icon>
          <span>{{ i18n.t('profile.preferences_heading') }}</span>
        </div>

        <div class="space-y-4 text-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE9DD] dark:border-[#2C2723]">
            <div>
              <span class="font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">{{ i18n.t('profile.favorite_genres_label') }}</span>
              <span class="text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('profile.favorite_genres_sub') }}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              @for (genre of profile().preferredGenres; track genre) {
                <span class="px-2.5 py-1 rounded-md bg-[#F5EFE3] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] text-xs font-medium border border-[#DDD6C8] dark:border-[#38322C]">
                  {{ genre }}
                </span>
              }
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#EFE9DD] dark:border-[#2C2723]">
            <div>
              <span class="font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">{{ i18n.t('profile.theme_label') }}</span>
              <span class="text-[#8A8278] dark:text-[#7A7268] block">{{ i18n.t('profile.theme_sub') }}</span>
            </div>
            <button
              type="button"
              (click)="theme.toggleTheme()"
              class="px-3.5 py-1.5 rounded-lg border border-[#DDD6C8] dark:border-[#38322C] font-medium bg-[#F7F4EE] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors">
              {{ theme.isDark() ? i18n.t('nav.theme_light') : i18n.t('nav.theme_dark') }}
            </button>
          </div>
        </div>
      </section>

      <!-- PostgreSQL Relational Database Architecture Card (Priority 4) -->
      <section class="p-6 rounded-2xl bg-[#F9F3E8] dark:bg-[#221E1B] border border-[#E8DCC8] dark:border-[#332D28] space-y-4">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
          <mat-icon class="text-sm leading-none !w-4 !h-4">dns</mat-icon>
          <span>{{ i18n.t('profile.db_heading') }}</span>
        </div>

        <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          {{ i18n.t('profile.db_desc') }}
        </p>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[11px]">
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • languages
          </div>
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • lexical_entries
          </div>
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • linguistic_relationships
          </div>
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • grammar_concepts
          </div>
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • user_vocabulary
          </div>
          <div class="p-2.5 rounded bg-[#FCFAF7] dark:bg-[#1A1715] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA]">
            • learning_events
          </div>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6C645C] dark:text-[#9C9387]">
          <span>Status: {{ i18n.t('profile.db_status_ready') }}</span>
          <span class="text-[#1B5E20] dark:text-[#86EFAC] font-medium">✓ {{ i18n.t('profile.pwa_cache_ready') }}</span>
        </div>
      </section>
    </div>
  `,
})
export class ProfileView {
  readonly learnerService = inject(LearnerProfileService);
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);

  readonly profile = this.learnerService.profile;

  changeLocale(locale: SupportedLocale): void {
    this.i18n.setLocale(locale);
  }
}
