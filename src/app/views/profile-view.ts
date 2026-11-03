import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { ThemeService } from '../core/services/theme';
import { I18nService, SupportedLocale } from '../core/services/i18n';
import { DevNotesService } from '../core/services/dev-notes';
import { DatabaseStatusService } from '../core/services/database-status';
import { AuthService } from '../core/services/auth';
import { CEFRLevel } from '../core/models';

@Component({
  selector: 'app-profile-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  template: `
    <div class="space-y-10 max-w-3xl mx-auto pb-12">
      <!-- Section Header -->
      <div class="space-y-1.5 border-b border-neutral-200 dark:border-neutral-800/80 pb-6">
        <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          <mat-icon class="text-xs !w-3.5 !h-3.5">person</mat-icon>
          <span>Compte & Préférences</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-serif font-medium text-neutral-900 dark:text-neutral-50 tracking-tight">
          {{ i18n.t('profile.title') }}
        </h1>
        <p class="text-xs sm:text-sm font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {{ i18n.t('profile.subtitle') }}
        </p>
      </div>

      <!-- Authentication & Profile Manager Section -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">badge</mat-icon>
            <span>Conta & Perfil de Aprendizagem</span>
          </div>
          <span
            class="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
            <mat-icon class="text-[11px] !w-3 !h-3 leading-none">{{ auth.isAdmin() ? 'shield' : 'school' }}</mat-icon>
            <span>{{ auth.isAdmin() ? 'Admin / Avaliador' : 'Perfil Aprendiz' }}</span>
          </span>
        </div>

        <!-- Active User Hero Card -->
        <div class="p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-full bg-white dark:bg-[#1E1E1E] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-base font-serif font-medium text-neutral-900 dark:text-neutral-100">
              {{ (auth.currentUser().name || 'U').charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-serif font-medium text-base text-neutral-900 dark:text-neutral-100">
                  {{ auth.currentUser().name }}
                </span>
                <span class="text-xs font-mono text-neutral-400">
                  &#64;{{ auth.currentUser().username }}
                </span>
              </div>
              <p class="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-reading">
                Nível Calibrado: <span class="font-mono font-semibold text-neutral-900 dark:text-neutral-100">CEFR {{ auth.currentUser().readingCEFR }}</span> • Vocabulário e radar isolados
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              (click)="setAuthMode('switch')"
              [class]="authMode() === 'switch' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'"
              class="px-3.5 py-1.5 text-xs font-mono rounded-full transition-all flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3 !h-3">swap_horiz</mat-icon>
              <span>Alternar</span>
            </button>
            <button
              type="button"
              (click)="setAuthMode('register')"
              [class]="authMode() === 'register' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'"
              class="px-3.5 py-1.5 text-xs font-mono rounded-full transition-all flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3 !h-3">person_add</mat-icon>
              <span>Novo Perfil</span>
            </button>
            <button
              type="button"
              (click)="setAuthMode('login')"
              [class]="authMode() === 'login' ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-neutral-400'"
              class="px-3.5 py-1.5 text-xs font-mono rounded-full transition-all flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3 !h-3">login</mat-icon>
              <span>Entrar</span>
            </button>
          </div>
        </div>

        <!-- Feedback Alert Messages -->
        @if (authError()) {
          <div class="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-mono flex items-center gap-2">
            <mat-icon class="text-xs !w-3.5 !h-3.5 text-rose-500">error_outline</mat-icon>
            <span>{{ authError() }}</span>
          </div>
        }
        @if (authSuccess()) {
          <div class="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-mono flex items-center gap-2">
            <mat-icon class="text-xs !w-3.5 !h-3.5 text-emerald-500">check_circle</mat-icon>
            <span>{{ authSuccess() }}</span>
          </div>
        }

        <!-- Mode: Switch Profiles List -->
        @if (authMode() === 'switch') {
          <div class="space-y-3 pt-1">
            <span class="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest block">
              Perfis Disponíveis Neste Navegador
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              @for (usr of auth.availableProfiles(); track usr.id) {
                <button
                  type="button"
                  (click)="switchProfile(usr.id)"
                  [class]="usr.id === auth.currentUser().id ? 'border-neutral-900 dark:border-white ring-1 ring-neutral-900/10 dark:ring-white/20' : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'"
                  class="p-3.5 rounded-xl border bg-white dark:bg-[#161616] text-left flex items-center justify-between gap-3 transition-all touch-target-min">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs text-neutral-800 dark:text-neutral-200 shrink-0 font-mono">
                      {{ usr.name.charAt(0).toUpperCase() }}
                    </span>
                    <div class="truncate">
                      <span class="font-medium text-xs text-neutral-900 dark:text-neutral-100 block truncate">{{ usr.name }}</span>
                      <span class="text-[11px] font-mono text-neutral-400 block">&#64;{{ usr.username }} • CEFR {{ usr.readingCEFR }}</span>
                    </div>
                  </div>
                  @if (usr.id === auth.currentUser().id) {
                    <span class="text-[10px] font-mono font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-1 shrink-0">
                      <mat-icon class="text-xs !w-3 !h-3">check</mat-icon>
                      <span>Ativo</span>
                    </span>
                  }
                </button>
              }
            </div>
            <p class="text-[11px] font-mono text-neutral-400 pt-1">
              Troque entre perfis instantaneamente. As métricas do Admin (B2) e de cada aprendiz permanecem isoladas.
            </p>
          </div>
        }

        <!-- Mode: Login Form -->
        @if (authMode() === 'login') {
          <form [formGroup]="loginForm" (ngSubmit)="submitLogin()" class="space-y-4 pt-1">
            <div class="space-y-1">
              <span class="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">Entrar com credenciais existentes</span>
              <p class="text-[11px] text-neutral-400">
                Acesse seu perfil ou entre com o usuário de teste de administração.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 mb-1">Nome de Usuário</label>
                <input
                  type="text"
                  formControlName="username"
                  placeholder="Ex: Admin"
                  class="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900" />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 mb-1">Senha ou PIN</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Ex: Admin123"
                  class="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900" />
              </div>
            </div>

            <div class="flex items-center justify-between pt-1 flex-wrap gap-2">
              <div class="text-[11px] font-mono text-neutral-400">
                <span>Dica de teste: </span>
                <button
                  type="button"
                  (click)="fillAdminCredentials()"
                  class="underline font-semibold text-neutral-900 dark:text-neutral-100 hover:opacity-80">
                  Preencher Admin / Admin123
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  (click)="setAuthMode('switch')"
                  class="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                  Cancelar
                </button>
                <button
                  type="submit"
                  [disabled]="loginForm.invalid"
                  class="px-4 py-1.5 text-xs font-semibold rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 disabled:opacity-50 transition-colors">
                  Entrar na Conta
                </button>
              </div>
            </div>
          </form>
        }

        <!-- Mode: Register Form -->
        @if (authMode() === 'register') {
          <form [formGroup]="registerForm" (ngSubmit)="submitRegister()" class="space-y-4 pt-1">
            <div class="space-y-1">
              <span class="text-xs font-semibold text-neutral-900 dark:text-neutral-100 block">Cadastrar Novo Perfil</span>
              <p class="text-[11px] text-neutral-400">
                Crie um novo perfil independente com seu próprio nível CEFR, banco de vocabulário e radar.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 mb-1">Seu Nome / Apelido</label>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="Ex: Camille Claudel"
                  class="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900" />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 mb-1">Nome de Usuário</label>
                <input
                  type="text"
                  formControlName="username"
                  placeholder="Ex: camille"
                  class="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900" />
              </div>
              <div>
                <label class="block text-[11px] font-mono text-neutral-400 mb-1">Senha ou PIN</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Mínimo 4 caracteres"
                  class="w-full px-3.5 py-2 text-xs rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-neutral-900" />
              </div>
            </div>

            <div>
              <label class="block text-[11px] font-mono text-neutral-400 mb-1.5">Nível Estimado Inicial (CEFR)</label>
              <div class="flex flex-wrap gap-1.5">
                @for (lvl of ['A1', 'A2', 'B1', 'B2', 'C1']; track lvl) {
                  <button
                    type="button"
                    (click)="registerForm.patchValue({ readingCEFR: lvl })"
                    [class]="registerForm.get('readingCEFR')?.value === lvl ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold' : 'border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300'"
                    class="px-3 py-1 text-xs font-mono rounded-full transition-colors">
                    {{ lvl }}
                  </button>
                }
              </div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <button
                type="button"
                (click)="setAuthMode('switch')"
                class="px-3 py-1.5 text-xs font-mono text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
                Cancelar
              </button>
              <button
                type="submit"
                [disabled]="registerForm.invalid"
                class="px-4 py-1.5 text-xs font-semibold rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 disabled:opacity-50 transition-colors">
                Criar Perfil e Começar
              </button>
            </div>
          </form>
        }
      </section>

      <!-- Language Configuration Card -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-5">
        <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">translate</mat-icon>
          <span>{{ i18n.t('profile.language_pair_heading') }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono text-neutral-400 uppercase block">{{ i18n.t('profile.native_language_label') }}</span>
            <span class="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100 mt-1 block">
              {{ i18n.t('profile.native_language_name') }}
            </span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 block">{{ i18n.t('profile.native_language_sub') }}</span>
          </div>

          <div class="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
            <span class="text-[10px] font-mono text-neutral-400 uppercase block">{{ i18n.t('profile.target_language_label') }}</span>
            <span class="text-base font-serif font-medium text-neutral-900 dark:text-neutral-100 mt-1 block">
              {{ i18n.t('profile.target_language_name') }}
            </span>
            <span class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 block">{{ i18n.t('profile.target_language_sub') }}</span>
          </div>
        </div>

        <!-- Starting Point Placement Test Action -->
        <div class="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <div>
            <span class="font-medium text-neutral-900 dark:text-neutral-100 block">Nível de Leitura: CEFR {{ profile().readingCEFR }}</span>
            <span class="text-neutral-400 text-[11px] block">Descubra seu ponto de partida ou recalibre seu radar de dificuldades</span>
          </div>
          <a
            routerLink="/placement"
            class="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#161616] text-neutral-900 dark:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors inline-flex items-center gap-1.5 text-xs font-mono self-start sm:self-auto">
            <mat-icon class="text-xs !w-3.5 !h-3.5">explore</mat-icon>
            <span>Fazer Teste de Nivelamento</span>
          </a>
        </div>

        <!-- Interface Language Switcher -->
        <div class="pt-3 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 text-xs">
          <div>
            <span class="font-medium text-neutral-900 dark:text-neutral-100 block">{{ i18n.t('profile.interface_language_label') }}</span>
            <span class="text-neutral-400 text-[11px] block">Selecione o idioma de navegação</span>
          </div>
          <div class="flex items-center gap-1 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              (click)="changeLocale('pt-BR')"
              [class]="i18n.currentLocale() === 'pt-BR' ? 'bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs' : 'text-neutral-500 hover:text-neutral-900'"
              class="px-3 py-1 text-xs rounded-full transition-colors font-mono">
              Português
            </button>
            <button
              type="button"
              (click)="changeLocale('fr-FR')"
              [class]="i18n.currentLocale() === 'fr-FR' ? 'bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 font-semibold shadow-xs' : 'text-neutral-500 hover:text-neutral-900'"
              class="px-3 py-1 text-xs rounded-full transition-colors font-mono">
              Français
            </button>
          </div>
        </div>
      </section>

      <!-- Dev Notes & Ideas Section -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">edit_note</mat-icon>
            <span>Caderno de Notas & Relatório</span>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-500">
            DEV_NOTES.md
          </span>
        </div>

        <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Registre aqui ideias de melhorias, relatos ou notas pedagógicas. Suas anotações são salvas diretamente no repositório no GitHub para acompanhamento contínuo.
        </p>

        <!-- Form for Adding Notes -->
        <form [formGroup]="noteForm" (ngSubmit)="submitNote()" class="space-y-4 p-4 sm:p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label for="devNoteCategory" class="block text-[11px] font-mono text-neutral-400 mb-1">
                Tipo da Nota
              </label>
              <select
                id="devNoteCategory"
                formControlName="category"
                class="w-full text-xs px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none">
                <option value="Melhoria">💡 Melhoria</option>
                <option value="Bug">🐛 Correção</option>
                <option value="Ideia">✨ Ideia</option>
                <option value="Observação">📝 Observação</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label for="devNoteTitle" class="block text-[11px] font-mono text-neutral-400 mb-1">
                Título Resumido
              </label>
              <input
                id="devNoteTitle"
                type="text"
                formControlName="title"
                placeholder="Ex: Refinar áudio em modo fone de ouvido..."
                class="w-full text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none" />
            </div>
          </div>

          <div>
            <label for="devNoteContent" class="block text-[11px] font-mono text-neutral-400 mb-1">
              Detalhes da Nota
            </label>
            <textarea
              id="devNoteContent"
              formControlName="content"
              rows="3"
              placeholder="Descreva a sugestão ou caso de uso..."
              class="w-full text-xs p-3 rounded-xl bg-white dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none leading-relaxed"></textarea>
          </div>

          <!-- Status / Feedback Alerts -->
          @if (devNotes.statusMessage(); as msg) {
            <div class="p-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161616] text-neutral-800 dark:text-neutral-200 text-xs font-mono flex items-center gap-2">
              <mat-icon class="text-xs !w-3.5 !h-3.5 text-emerald-500">check_circle</mat-icon>
              <span>{{ msg }}</span>
            </div>
          }

          <div class="flex items-center justify-between pt-1">
            <span class="text-[10px] font-mono text-neutral-400">
              Salva em DEV_NOTES.md
            </span>
            <button
              type="submit"
              [disabled]="noteForm.invalid || devNotes.isSaving()"
              class="px-4 py-2 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 disabled:opacity-50 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors">
              <mat-icon class="text-xs !w-3.5 !h-3.5">save</mat-icon>
              <span>{{ devNotes.isSaving() ? 'Gravando...' : 'Gravar Nota' }}</span>
            </button>
          </div>
        </form>

        <!-- Saved Notes Stream -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs text-neutral-500">
            <span class="font-mono text-[11px]">Notas Registradas ({{ devNotes.notes().length }})</span>
            <button
              type="button"
              (click)="devNotes.fetchNotes()"
              class="hover:underline flex items-center gap-1 text-[11px] font-mono">
              <mat-icon class="text-xs !w-3 !h-3">refresh</mat-icon>
              <span>Atualizar</span>
            </button>
          </div>

          <div class="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            @for (note of devNotes.notes(); track note.id) {
              <div class="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-xs space-y-1.5">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span
                      class="px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 font-mono text-[10px] uppercase">
                      {{ note.category }}
                    </span>
                    <span class="font-medium text-neutral-900 dark:text-neutral-100">
                      {{ note.title }}
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-neutral-400 shrink-0">
                    {{ note.timestamp }}
                  </span>
                </div>
                <div class="text-neutral-600 dark:text-neutral-400 text-xs font-reading whitespace-pre-line leading-relaxed">
                  {{ note.content }}
                </div>
              </div>
            } @empty {
              <div class="p-6 text-center text-xs text-neutral-400 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl font-mono">
                Nenhuma nota customizada registrada ainda.
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Supabase PostgreSQL Architecture Card -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">storage</mat-icon>
            <span>Supabase / PostgreSQL & Eficiência de Armazenamento</span>
          </div>
          <span
            class="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full" [class]="dbStatus.state().connected ? 'bg-emerald-500' : 'bg-neutral-400'"></span>
            {{ dbStatus.state().connected ? 'PostgreSQL Conectado' : 'Modo Catálogo Resiliente' }}
          </span>
        </div>

        <p class="text-xs font-reading text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {{ i18n.t('profile.db_desc') }}
        </p>

        <!-- Storage Efficiency Breakdown -->
        <div class="space-y-2">
          <span class="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
            Estratégias de Economia Extrema de Espaço:
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div class="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-0.5">
              <span class="font-mono font-semibold text-neutral-900 dark:text-neutral-100">1. Zero BLOBs</span>
              <p class="text-neutral-500">Áudios sintetizados via Web Speech; nenhuma gravação binária ocupa disco no Supabase.</p>
            </div>
            <div class="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-0.5">
              <span class="font-mono font-semibold text-neutral-900 dark:text-neutral-100">2. Tipos Compactos</span>
              <p class="text-neutral-500">Chaves primárias e relacionamentos com varchar(64) e inteiros pequenos; zero desperdício.</p>
            </div>
            <div class="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-0.5">
              <span class="font-mono font-semibold text-neutral-900 dark:text-neutral-100">3. Pool Restrito (Max 4)</span>
              <p class="text-neutral-500">Pool de conexões mínimo para respeitar a cota de instâncias da camada gratuita.</p>
            </div>
            <div class="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 space-y-0.5">
              <span class="font-mono font-semibold text-neutral-900 dark:text-neutral-100">4. Estado Consolidado</span>
              <p class="text-neutral-500">Atualizações de vocabulário e leitura por substituição direta em vez de trilhões de logs.</p>
            </div>
          </div>
        </div>

        <div class="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
          <span>Status do Driver: {{ i18n.t('profile.db_status_ready') }}</span>
          <span class="text-neutral-700 dark:text-neutral-300">✓ {{ i18n.t('profile.pwa_cache_ready') }}</span>
        </div>
      </section>

      <!-- Learning Preferences -->
      <section class="p-6 sm:p-8 rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#141414] space-y-5">
        <div class="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
          <mat-icon class="text-xs leading-none !w-3.5 !h-3.5">tune</mat-icon>
          <span>{{ i18n.t('profile.preferences_heading') }}</span>
        </div>

        <div class="space-y-4 text-xs">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <span class="font-medium text-neutral-900 dark:text-neutral-100 block">{{ i18n.t('profile.favorite_genres_label') }}</span>
              <span class="text-neutral-400 text-[11px] block">{{ i18n.t('profile.favorite_genres_sub') }}</span>
            </div>
            <div class="flex flex-wrap gap-1.5">
              @for (genre of profile().preferredGenres; track genre) {
                <span class="px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs font-mono">
                  {{ genre }}
                </span>
              }
            </div>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="font-medium text-neutral-900 dark:text-neutral-100 block">{{ i18n.t('profile.theme_label') }}</span>
              <span class="text-neutral-400 text-[11px] block">{{ i18n.t('profile.theme_sub') }}</span>
            </div>
            <button
              type="button"
              (click)="theme.toggleTheme()"
              class="px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-neutral-100 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              {{ theme.isDark() ? i18n.t('nav.theme_light') : i18n.t('nav.theme_dark') }}
            </button>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ProfileView {
  readonly learnerService = inject(LearnerProfileService);
  readonly theme = inject(ThemeService);
  readonly i18n = inject(I18nService);
  readonly devNotes = inject(DevNotesService);
  readonly dbStatus = inject(DatabaseStatusService);
  readonly auth = inject(AuthService);

  readonly profile = this.learnerService.profile;

  readonly authMode = signal<'switch' | 'login' | 'register'>('switch');
  readonly authError = signal<string | null>(null);
  readonly authSuccess = signal<string | null>(null);

  readonly loginForm = new FormGroup({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  readonly registerForm = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4)],
    }),
    readingCEFR: new FormControl<string>('A2', { nonNullable: true }),
  });

  setAuthMode(mode: 'switch' | 'login' | 'register'): void {
    this.authMode.set(mode);
    this.authError.set(null);
    this.authSuccess.set(null);
  }

  fillAdminCredentials(): void {
    this.loginForm.patchValue({
      username: 'Admin',
      password: 'Admin123',
    });
  }

  switchProfile(userId: string): void {
    const success = this.auth.switchProfile(userId);
    if (success) {
      this.authSuccess.set(`Perfil alternado com sucesso para ${this.auth.currentUser()?.name}.`);
      setTimeout(() => this.authSuccess.set(null), 3000);
    }
  }

  async submitLogin(): Promise<void> {
    if (this.loginForm.invalid) return;
    this.authError.set(null);
    this.authSuccess.set(null);

    const { username, password } = this.loginForm.getRawValue();
    const res = await this.auth.login(username, password);

    if (res.success) {
      this.authSuccess.set(`Bem-vindo(a), ${this.auth.currentUser()?.name}!`);
      this.loginForm.reset();
      this.authMode.set('switch');
      setTimeout(() => this.authSuccess.set(null), 4000);
    } else {
      this.authError.set(res.error || 'Credenciais inválidas.');
    }
  }

  async submitRegister(): Promise<void> {
    if (this.registerForm.invalid) return;
    this.authError.set(null);
    this.authSuccess.set(null);

    const { username, password, name, readingCEFR } = this.registerForm.getRawValue();
    const res = await this.auth.register(
      username,
      password,
      name,
      readingCEFR as CEFRLevel
    );

    if (res.success && res.user) {
      this.authSuccess.set(`Perfil "${res.user.name}" criado com sucesso e ativo!`);
      this.registerForm.reset({ readingCEFR: 'A2' });
      this.authMode.set('switch');
      setTimeout(() => this.authSuccess.set(null), 4000);
    } else {
      this.authError.set(res.error || 'Erro ao registrar novo perfil.');
    }
  }

  readonly noteForm = new FormGroup({
    category: new FormControl<string>('Melhoria', { nonNullable: true }),
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  changeLocale(locale: SupportedLocale): void {
    this.i18n.setLocale(locale);
  }

  async submitNote(): Promise<void> {
    if (this.noteForm.invalid) return;

    const val = this.noteForm.getRawValue();
    const success = await this.devNotes.saveNote({
      category: val.category,
      title: val.title,
      content: val.content,
    });

    if (success) {
      this.noteForm.patchValue({
        title: '',
        content: '',
      });
      this.noteForm.markAsPristine();
      this.noteForm.markAsUntouched();
    }
  }

  getCategoryBadgeClass(category: string): string {
    const cat = category.toUpperCase();
    if (cat.includes('BUG')) {
      return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800';
    }
    if (cat.includes('MELHORIA')) {
      return 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800';
    }
    if (cat.includes('IDEIA')) {
      return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200 border border-sky-300 dark:border-sky-800';
    }
    return 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700';
  }
}
