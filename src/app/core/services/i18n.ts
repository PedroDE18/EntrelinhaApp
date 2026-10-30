import { Injectable, signal, computed } from '@angular/core';
import ptBR from '../../../locales/pt-BR.json';
import frFR from '../../../locales/fr-FR.json';

export type SupportedLocale = 'pt-BR' | 'fr-FR';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  readonly currentLocale = signal<SupportedLocale>('pt-BR');

  private readonly dictionaries: Record<SupportedLocale, Record<string, unknown>> = {
    'pt-BR': ptBR as Record<string, unknown>,
    'fr-FR': frFR as Record<string, unknown>,
  };

  readonly activeDictionary = computed(() => this.dictionaries[this.currentLocale()]);

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lingua_interface_locale') as SupportedLocale;
      if (saved && (saved === 'pt-BR' || saved === 'fr-FR')) {
        this.currentLocale.set(saved);
      }
    }
  }

  setLocale(locale: SupportedLocale): void {
    this.currentLocale.set(locale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lingua_interface_locale', locale);
    }
  }

  /**
   * Translates a dot-notated key with optional parameter interpolation
   * e.g. t('home.reading_time', { minutes: 4 })
   */
  t(path: string, params?: Record<string, string | number>): string {
    const dict = this.activeDictionary();
    const parts = path.split('.');
    let current: unknown = dict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        // Fallback to pt-BR if current locale misses key
        return this.resolveFallback(path, params);
      }
    }

    if (typeof current !== 'string') {
      return path;
    }

    return this.interpolate(current, params);
  }

  private resolveFallback(path: string, params?: Record<string, string | number>): string {
    const fallbackDict = this.dictionaries['pt-BR'];
    const parts = path.split('.');
    let current: unknown = fallbackDict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return path;
      }
    }

    return typeof current === 'string' ? this.interpolate(current, params) : path;
  }

  private interpolate(template: string, params?: Record<string, string | number>): string {
    if (!params) return template;
    return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, key) => {
      return params[key] !== undefined ? String(params[key]) : `{{${key}}}`;
    });
  }
}
