import test from 'node:test';
import assert from 'node:assert/strict';
import { I18nService } from './i18n';

test('I18nService loads pt-BR by default and resolves nested keys', () => {
  const i18n = new I18nService();
  assert.equal(i18n.currentLocale(), 'pt-BR');
  assert.equal(i18n.t('nav.home'), 'Início');
  assert.equal(i18n.t('nav.library'), 'Biblioteca');
});

test('I18nService interpolates parameters correctly', () => {
  const i18n = new I18nService();
  assert.equal(i18n.t('home.reading_time', { minutes: 5 }), '5 min de leitura');
  assert.equal(
    i18n.t('home.serialized_badge', { current: 1, total: 3 }),
    'Narrativa em série · Episódio 1/3'
  );
});

test('I18nService switches locale reactively', () => {
  const i18n = new I18nService();
  i18n.setLocale('fr-FR');
  assert.equal(i18n.currentLocale(), 'fr-FR');
  assert.equal(i18n.t('nav.home'), 'Accueil');
  assert.equal(i18n.t('nav.library'), 'Bibliothèque');
});
