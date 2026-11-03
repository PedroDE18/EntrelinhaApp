import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../core/services/i18n';

@Component({
  selector: 'app-footer-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="mt-20 border-t border-neutral-200 dark:border-neutral-800/80 bg-[#FAFAFA] dark:bg-[#0A0A0A] text-neutral-500 dark:text-neutral-400 py-12 transition-colors">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800/60">
          <div>
            <span class="text-base font-sans font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              entrelinha<span class="text-neutral-400 dark:text-neutral-500">.</span>
            </span>
            <p class="text-xs font-serif italic text-neutral-500 dark:text-neutral-400 mt-1">
              {{ i18n.t('footer.tagline') }}
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 dark:text-neutral-500">
            <span>{{ i18n.t('footer.config_line') }}</span>
            <span>·</span>
            <span>{{ i18n.t('footer.phase_label') }}</span>
          </div>
        </div>

        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 dark:text-neutral-500">
          <p>{{ i18n.t('footer.copyright') }}</p>
          <div class="flex items-center gap-4">
            <a routerLink="/library" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">{{ i18n.t('footer.link_catalog') }}</a>
            <span>·</span>
            <a routerLink="/progress" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">{{ i18n.t('footer.link_radar') }}</a>
            <span>·</span>
            <a routerLink="/profile" class="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">{{ i18n.t('footer.link_db') }}</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterBar {
  readonly i18n = inject(I18nService);
}
