import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-footer-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="mt-20 border-t border-[#E6DFD3] dark:border-[#332D28] bg-[#EFE9DD] dark:bg-[#13110F] text-[#6C645C] dark:text-[#9C9387] py-12 transition-colors">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#E6DFD3] dark:border-[#332D28]">
          <div>
            <span class="text-xl font-serif font-semibold tracking-wider text-[#231F1C] dark:text-[#EAE4DA]">Entrelinha</span>
            <p class="text-sm italic font-reading text-[#6C645C] dark:text-[#9C9387] mt-1">
              {{ i18n.t('footer.tagline') }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-6 text-xs text-[#6C645C] dark:text-[#9C9387]">
            <span>{{ i18n.t('footer.config_line') }}</span>
            <span class="text-[#DDD6C8] dark:text-[#38322C]">·</span>
            <span>{{ i18n.t('footer.phase_label') }}</span>
          </div>
        </div>

        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8278] dark:text-[#7A7268]">
          <p>{{ i18n.t('footer.copyright') }}</p>
          <div class="flex items-center gap-4">
            <a routerLink="/library" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors">{{ i18n.t('footer.link_catalog') }}</a>
            <span>·</span>
            <a routerLink="/progress" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors">{{ i18n.t('footer.link_radar') }}</a>
            <span>·</span>
            <a routerLink="/profile" class="hover:text-[#231F1C] dark:hover:text-[#EAE4DA] transition-colors">{{ i18n.t('footer.link_db') }}</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterBar {
  readonly i18n = inject(I18nService);
}
