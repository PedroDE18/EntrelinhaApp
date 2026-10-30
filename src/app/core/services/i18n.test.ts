import { describe, it, expect } from 'vitest';
import { I18nService } from './i18n';

describe('I18nService', () => {
  it('loads pt-BR by default and resolves nested keys', () => {
    const i18n = new I18nService();
    expect(i18n.currentLocale()).toBe('pt-BR');
    expect(i18n.t('nav.home')).toBe('Início');
    expect(i18n.t('nav.library')).toBe('Biblioteca');
  });

  it('interpolates parameters correctly', () => {
    const i18n = new I18nService();
    expect(i18n.t('home.reading_time', { minutes: 5 })).toBe('5 min de leitura');
    expect(
      i18n.t('home.serialized_badge', { current: 1, total: 3 })
    ).toBe('Narrativa em série · Episódio 1/3');
  });

  it('switches locale reactively', () => {
    const i18n = new I18nService();
    i18n.setLocale('fr-FR');
    expect(i18n.currentLocale()).toBe('fr-FR');
    expect(i18n.t('nav.home')).toBe('Accueil');
    expect(i18n.t('nav.library')).toBe('Bibliothèque');
  });
});
