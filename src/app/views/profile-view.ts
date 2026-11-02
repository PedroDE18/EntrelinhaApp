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
      <div class="space-y-2">
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] tracking-tight">
          {{ i18n.t('profile.title') }}
        </h1>
        <p class="text-sm font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          {{ i18n.t('profile.subtitle') }}
        </p>
      </div>

      <!-- Authentication & Profile Manager Section -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-5 border-l-4 border-l-[#9C3823] dark:border-l-[#DDA15E]">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">badge</mat-icon>
            <span>Conta & Perfil de Aprendizagem</span>
          </div>
          <span
            [class]="auth.isAdmin() ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border-amber-300 dark:border-amber-800' : 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200 border-stone-300 dark:border-stone-700'"
            class="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1">
            <mat-icon class="text-[12px] !w-3 !h-3 leading-none">{{ auth.isAdmin() ? 'shield' : 'school' }}</mat-icon>
            <span>{{ auth.isAdmin() ? 'Admin / Avaliador' : 'Perfil Aprendiz' }}</span>
          </span>
        </div>

        <!-- Active User Hero Card -->
        <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-full bg-[#EFE9DD] dark:bg-[#2A2420] border border-[#DECDB3] dark:border-[#42362C] flex items-center justify-center text-lg font-serif font-bold text-[#7A2A18] dark:text-[#F3D5A5] shadow-xs">
              {{ (auth.currentUser().name || 'U').charAt(0).toUpperCase() }}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-serif font-bold text-base text-[#231F1C] dark:text-[#EAE4DA]">
                  {{ auth.currentUser().name }}
                </span>
                <span class="text-xs font-mono text-[#8A8278] dark:text-[#7A7268]">
                  &#64;{{ auth.currentUser().username }}
                </span>
              </div>
              <p class="text-xs text-[#5A524A] dark:text-[#B5ADA3] mt-0.5">
                Nível Calibrado: <span class="font-semibold text-[#7A2A18] dark:text-[#F3D5A5]">CEFR {{ auth.currentUser().readingCEFR }}</span> • Vocabulário e radar isolados
              </p>
            </div>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              (click)="setAuthMode('switch')"
              [class]="authMode() === 'switch' ? 'bg-[#9C3823] text-white shadow-xs' : 'bg-[#EFE9DD] dark:bg-[#2A2420] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#E5DDCF]'"
              class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3.5 !h-3.5">swap_horiz</mat-icon>
              <span>Alternar</span>
            </button>
            <button
              type="button"
              (click)="setAuthMode('register')"
              [class]="authMode() === 'register' ? 'bg-[#9C3823] text-white shadow-xs' : 'bg-[#EFE9DD] dark:bg-[#2A2420] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#E5DDCF]'"
              class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3.5 !h-3.5">person_add</mat-icon>
              <span>Novo Perfil</span>
            </button>
            <button
              type="button"
              (click)="setAuthMode('login')"
              [class]="authMode() === 'login' ? 'bg-[#9C3823] text-white shadow-xs' : 'bg-[#EFE9DD] dark:bg-[#2A2420] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#E5DDCF]'"
              class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5">
              <mat-icon class="text-xs !w-3.5 !h-3.5">login</mat-icon>
              <span>Entrar</span>
            </button>
          </div>
        </div>

        <!-- Feedback Alert Messages -->
        @if (authError()) {
          <div class="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
            <mat-icon class="text-sm !w-4 !h-4 text-rose-600 dark:text-rose-400">error_outline</mat-icon>
            <span>{{ authError() }}</span>
          </div>
        }
        @if (authSuccess()) {
          <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
            <mat-icon class="text-sm !w-4 !h-4 text-emerald-600 dark:text-emerald-400">check_circle</mat-icon>
            <span>{{ authSuccess() }}</span>
          </div>
        }

        <!-- Mode: Switch Profiles List -->
        @if (authMode() === 'switch') {
          <div class="space-y-2 pt-1">
            <span class="text-xs font-semibold text-[#6C645C] dark:text-[#9C9387] uppercase tracking-wider block">
              Perfis de Leitura Disponíveis Neste Navegador
            </span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              @for (usr of auth.availableProfiles(); track usr.id) {
                <button
                  type="button"
                  (click)="switchProfile(usr.id)"
                  [class]="usr.id === auth.currentUser().id ? 'border-[#9C3823] dark:border-[#DDA15E] bg-[#FAF6F0] dark:bg-[#25201C] ring-1 ring-[#9C3823]/30' : 'border-[#E6DFD3] dark:border-[#332D28] bg-[#FDFCFB] dark:bg-[#181513] hover:border-[#DECDB3] dark:hover:border-[#42362C]'"
                  class="p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all touch-target-min">
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span class="w-8 h-8 rounded-full bg-[#EFE9DD] dark:bg-[#2A2420] flex items-center justify-center font-bold text-xs text-[#7A2A18] dark:text-[#F3D5A5] shrink-0">
                      {{ usr.name.charAt(0).toUpperCase() }}
                    </span>
                    <div class="truncate">
                      <span class="font-semibold text-xs text-[#231F1C] dark:text-[#EAE4DA] block truncate">{{ usr.name }}</span>
                      <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268] block">&#64;{{ usr.username }} • CEFR {{ usr.readingCEFR }}</span>
                    </div>
                  </div>
                  @if (usr.id === auth.currentUser().id) {
                    <span class="text-[11px] font-semibold text-[#9C3823] dark:text-[#DDA15E] flex items-center gap-1 shrink-0">
                      <mat-icon class="text-xs !w-3.5 !h-3.5">check</mat-icon>
                      <span>Ativo</span>
                    </span>
                  }
                </button>
              }
            </div>
            <p class="text-[11px] text-[#8A8278] dark:text-[#7A7268] pt-1">
              Troque entre perfis instantaneamente sem perder histórico. As métricas do Admin (B2) e de cada aprendiz permanecem isoladas.
            </p>
          </div>
        }

        <!-- Mode: Login Form -->
        @if (authMode() === 'login') {
          <form [formGroup]="loginForm" (ngSubmit)="submitLogin()" class="space-y-4 pt-1">
            <div class="space-y-1">
              <span class="text-xs font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">Entrar com credenciais existentes</span>
              <p class="text-[11px] text-[#6C645C] dark:text-[#9C9387]">
                Acesse seu perfil ou entre com o usuário de teste de administração.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">Nome de Usuário</label>
                <input
                  type="text"
                  formControlName="username"
                  placeholder="Ex: Admin ou seu usuário"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">Senha ou PIN</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Ex: Admin123"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]" />
              </div>
            </div>

            <div class="flex items-center justify-between pt-1 flex-wrap gap-2">
              <div class="text-[11px] text-[#8A8278] dark:text-[#7A7268]">
                <span>Dica de teste: </span>
                <button
                  type="button"
                  (click)="fillAdminCredentials()"
                  class="underline font-semibold text-[#9C3823] dark:text-[#DDA15E] hover:opacity-80">
                  Preencher Admin / Admin123
                </button>
              </div>

              <div class="flex items-center gap-2">
                <button
                  type="button"
                  (click)="setAuthMode('switch')"
                  class="px-3 py-1.5 text-xs text-[#6C645C] dark:text-[#9C9387] hover:underline">
                  Cancelar
                </button>
                <button
                  type="submit"
                  [disabled]="loginForm.invalid"
                  class="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#9C3823] text-white hover:bg-[#7A2A18] disabled:opacity-50 transition-colors shadow-xs">
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
              <span class="text-xs font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">Cadastrar Novo Perfil de Aprendiz</span>
              <p class="text-[11px] text-[#6C645C] dark:text-[#9C9387]">
                Crie um novo perfil independente com seu próprio nível CEFR, banco de vocabulário e radar de interferências.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">Seu Nome / Apelido</label>
                <input
                  type="text"
                  formControlName="name"
                  placeholder="Ex: Camille Claudel"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">Nome de Usuário (login)</label>
                <input
                  type="text"
                  formControlName="username"
                  placeholder="Ex: camille"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">Senha ou PIN</label>
                <input
                  type="password"
                  formControlName="password"
                  placeholder="Mínimo 4 caracteres"
                  class="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] bg-[#FCFAF7] dark:bg-[#181513] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#9C3823]" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1.5">Nível de Francês Inicial Estimado (CEFR)</label>
              <div class="flex flex-wrap gap-2">
                @for (lvl of ['A1', 'A2', 'B1', 'B2', 'C1']; track lvl) {
                  <button
                    type="button"
                    (click)="registerForm.patchValue({ readingCEFR: lvl })"
                    [class]="registerForm.get('readingCEFR')?.value === lvl ? 'bg-[#9C3823] text-white font-semibold' : 'bg-[#EFE9DD] dark:bg-[#2A2420] text-[#231F1C] dark:text-[#EAE4DA]'"
                    class="px-3 py-1 text-xs rounded-lg border border-[#DDD6C8] dark:border-[#38322C] transition-colors">
                    {{ lvl }}
                  </button>
                }
              </div>
            </div>

            <div class="flex items-center justify-between pt-1">
              <button
                type="button"
                (click)="setAuthMode('switch')"
                class="px-3 py-1.5 text-xs text-[#6C645C] dark:text-[#9C9387] hover:underline">
                Cancelar
              </button>
              <button
                type="submit"
                [disabled]="registerForm.invalid"
                class="px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#9C3823] text-white hover:bg-[#7A2A18] disabled:opacity-50 transition-colors shadow-xs">
                Criar Perfil e Começar
              </button>
            </div>
          </form>
        }
      </section>

      <!-- Language Configuration Card -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-4">
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

        <!-- Starting Point Placement Test Action -->
        <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#EFE9DD] dark:border-[#2C2723] text-xs">
          <div>
            <span class="font-semibold text-[#231F1C] dark:text-[#EAE4DA] block">Nível de Leitura Calibrado: CEFR {{ profile().readingCEFR }}</span>
            <span class="text-[#8A8278] dark:text-[#7A7268] block">Descubra seu ponto de partida ou recalibre seu radar de dificuldades</span>
          </div>
          <a
            routerLink="/placement"
            class="px-3.5 py-2 rounded-lg border border-[#DECDB3] dark:border-[#42362C] bg-[#F7F4EE] dark:bg-[#1A1715] font-semibold text-[#7A2A18] dark:text-[#F3D5A5] hover:bg-[#EFE9DD] dark:hover:bg-[#2A2420] transition-colors inline-flex items-center gap-1.5 touch-target-min self-start sm:self-auto shadow-xs">
            <mat-icon class="text-sm !w-4 !h-4">explore</mat-icon>
            <span>Fazer Teste de Nivelamento</span>
          </a>
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
              class="px-2.5 py-1 text-xs rounded transition-colors touch-target-min flex items-center justify-center">
              Português (BR)
            </button>
            <button
              type="button"
              (click)="changeLocale('fr-FR')"
              [class]="i18n.currentLocale() === 'fr-FR' ? 'bg-[#FCFAF7] dark:bg-[#26221F] text-[#231F1C] dark:text-[#EAE4DA] font-semibold shadow-xs' : 'text-[#6C645C] dark:text-[#9C9387]'"
              class="px-2.5 py-1 text-xs rounded transition-colors touch-target-min flex items-center justify-center">
              Français (FR)
            </button>
          </div>
        </div>
      </section>

      <!-- Dev Notes & Ideas Section (User Request: Spot under Perfil writing to DEV_NOTES.md in GitHub) -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#78350F] dark:text-[#FBBF24]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">edit_note</mat-icon>
            <span>Caderno de Notas & Relatório de Desenvolvimento</span>
          </div>
          <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F0E6D2] dark:bg-[#2B231D] text-[#78350F] dark:text-[#FBBF24] border border-[#DECDB3] dark:border-[#42362C]">
            DEV_NOTES.md
          </span>
        </div>

        <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          Registre aqui ideias de melhorias, relatórios de bugs ou notas pedagógicas. Suas anotações são salvas diretamente no arquivo <strong>DEV_NOTES.md</strong> na raiz do repositório no GitHub para acompanhamento contínuo da evolução do Entrelinha.
        </p>

        <!-- Form for Adding Notes -->
        <form [formGroup]="noteForm" (ngSubmit)="submitNote()" class="space-y-4 p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28]">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label for="devNoteCategory" class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">
                Tipo da Nota
              </label>
              <select
                id="devNoteCategory"
                formControlName="category"
                class="w-full text-xs px-3 py-2 rounded-lg bg-[#FCFAF7] dark:bg-[#24201D] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#78350F]">
                <option value="Melhoria">💡 Melhoria / Sugestão</option>
                <option value="Bug">🐛 Bug / Correção</option>
                <option value="Ideia">✨ Nova Ideia</option>
                <option value="Observação">📝 Observação Pedagógica</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label for="devNoteTitle" class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">
                Título Resumido
              </label>
              <input
                id="devNoteTitle"
                type="text"
                formControlName="title"
                placeholder="Ex: Refinar áudio em modo fone de ouvido..."
                class="w-full text-xs px-3 py-2 rounded-lg bg-[#FCFAF7] dark:bg-[#24201D] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#78350F]" />
            </div>
          </div>

          <div>
            <label for="devNoteContent" class="block text-xs font-medium text-[#6C645C] dark:text-[#9C9387] mb-1">
              Detalhes da Nota / Relato
            </label>
            <textarea
              id="devNoteContent"
              formControlName="content"
              rows="3"
              placeholder="Descreva a sugestão, comportamento observado ou caso de uso com riqueza de detalhes..."
              class="w-full text-xs p-3 rounded-lg bg-[#FCFAF7] dark:bg-[#24201D] border border-[#DDD6C8] dark:border-[#38322C] text-[#231F1C] dark:text-[#EAE4DA] focus:outline-none focus:ring-1 focus:ring-[#78350F] leading-relaxed"></textarea>
          </div>

          <!-- Status / Feedback Alerts -->
          @if (devNotes.statusMessage(); as msg) {
            <div class="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2">
              <mat-icon class="text-sm !w-4 !h-4 text-emerald-600">check_circle</mat-icon>
              <span>{{ msg }}</span>
            </div>
          }

          @if (devNotes.errorMessage(); as err) {
            <div class="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-center gap-2">
              <mat-icon class="text-sm !w-4 !h-4 text-rose-600">error</mat-icon>
              <span>{{ err }}</span>
            </div>
          }

          <div class="flex items-center justify-between pt-1">
            <span class="text-[11px] text-[#8A8278] dark:text-[#7A7268]">
              Salva com data, hora e categoria em DEV_NOTES.md
            </span>
            <button
              type="submit"
              [disabled]="noteForm.invalid || devNotes.isSaving()"
              class="px-4 py-2 rounded-lg bg-[#78350F] text-amber-50 hover:bg-[#5C290B] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors touch-target-min">
              <mat-icon class="text-sm !w-4 !h-4">save</mat-icon>
              <span>{{ devNotes.isSaving() ? 'Gravando...' : 'Gravar Nota no Repositório' }}</span>
            </button>
          </div>
        </form>

        <!-- Saved Notes Stream -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs text-[#6C645C] dark:text-[#9C9387]">
            <span class="font-semibold">Histórico de Notas Registradas ({{ devNotes.notes().length }})</span>
            <button
              type="button"
              (click)="devNotes.fetchNotes()"
              class="hover:underline flex items-center gap-1 text-[11px]">
              <mat-icon class="text-xs !w-3 !h-3">refresh</mat-icon>
              <span>Atualizar</span>
            </button>
          </div>

          <div class="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            @for (note of devNotes.notes(); track note.id) {
              <div class="p-3.5 rounded-xl bg-[#FCFAF7] dark:bg-[#1E1A17] border border-[#E6DFD3] dark:border-[#332D28] text-xs space-y-1.5 shadow-2xs">
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2">
                    <span
                      [class]="getCategoryBadgeClass(note.category)"
                      class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {{ note.category }}
                    </span>
                    <span class="font-serif font-bold text-[#231F1C] dark:text-[#EAE4DA] text-sm">
                      {{ note.title }}
                    </span>
                  </div>
                  <span class="text-[10px] font-mono text-[#8A8278] dark:text-[#7A7268] shrink-0">
                    {{ note.timestamp }}
                  </span>
                </div>
                <div class="text-[#5A524A] dark:text-[#B5ADA3] text-xs font-reading whitespace-pre-line leading-relaxed">
                  {{ note.content }}
                </div>
              </div>
            } @empty {
              <div class="p-6 text-center text-xs text-[#8A8278] dark:text-[#7A7268] border border-dashed border-[#DDD6C8] dark:border-[#38322C] rounded-xl">
                Nenhuma nota customizada registrada ainda. Crie a primeira acima!
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Supabase PostgreSQL Architecture & Storage Efficiency -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-5">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9C3823] dark:text-[#DDA15E]">
            <mat-icon class="text-sm leading-none !w-4 !h-4">storage</mat-icon>
            <span>Arquitetura Supabase / PostgreSQL & Otimização de Armazenamento</span>
          </div>
          <span
            [class]="dbStatus.state().connected ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'"
            class="text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full" [class]="dbStatus.state().connected ? 'bg-emerald-600' : 'bg-amber-600'"></span>
            {{ dbStatus.state().connected ? 'PostgreSQL Conectado' : 'Modo Catálogo Resiliente' }}
          </span>
        </div>

        <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          {{ i18n.t('profile.db_desc') }}
        </p>

        <!-- Supabase Guidance Note if Project URL was configured -->
        @if (dbStatus.state().supabaseProjectUrlDetected) {
          <div class="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div class="font-bold flex items-center gap-1.5">
              <mat-icon class="text-sm !w-4 !h-4 text-amber-600">info</mat-icon>
              <span>Formato de Conexão do Supabase</span>
            </div>
            <p class="text-[11px] leading-relaxed">
              Detectamos sua URL do projeto Supabase (<code class="px-1 py-0.5 bg-amber-100 dark:bg-amber-900 rounded">https://svouwcqxarvxslumbztp.supabase.co</code>). 
              Para conexão direta via Drizzle ORM ao PostgreSQL, você pode obter a string de conexão URI em: 
              <em>Supabase Dashboard > Project Settings > Database > Connection string (URI)</em>, no formato:
              <br/>
              <code class="block mt-1 p-1 bg-amber-100/80 dark:bg-amber-900/80 rounded font-mono text-[10px] break-all">
                postgresql://postgres:[SUA_SENHA]&#64;db.svouwcqxarvxslumbztp.supabase.co:5432/postgres
              </code>
            </p>
          </div>
        }

        <!-- Storage Efficiency Breakdown -->
        <div class="space-y-2">
          <span class="text-xs font-bold text-[#231F1C] dark:text-[#EAE4DA] block">
            Estratégias de Economia Extrema de Espaço no Supabase:
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div class="p-2.5 rounded-lg bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-0.5">
              <span class="font-bold text-[#78350F] dark:text-[#FBBF24]">1. Zero BLOBs em Banco</span>
              <p class="text-[#6C645C] dark:text-[#9C9387]">Áudios utilizam sintetizador nativo Web Speech / URLs leves; nenhuma gravação binária ocupa disco no Supabase.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-0.5">
              <span class="font-bold text-[#78350F] dark:text-[#FBBF24]">2. Tipos de Dados Compactos</span>
              <p class="text-[#6C645C] dark:text-[#9C9387]">Chaves primárias e relacionamentos com varchar(64) e inteiros pequenos; nada de campos de texto desnecessários.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-0.5">
              <span class="font-bold text-[#78350F] dark:text-[#FBBF24]">3. Pool Restrito (Max 4)</span>
              <p class="text-[#6C645C] dark:text-[#9C9387]">Pool de conexões mínimo para não estourar a cota de instâncias ou memória da camada gratuita do Supabase.</p>
            </div>
            <div class="p-2.5 rounded-lg bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-0.5">
              <span class="font-bold text-[#78350F] dark:text-[#FBBF24]">4. Progresso Consolidado</span>
              <p class="text-[#6C645C] dark:text-[#9C9387]">Atualizações de vocabulário e leitura por substituição de estado em vez de trilhões de logs de cliques avulsos.</p>
            </div>
          </div>
        </div>

        <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6C645C] dark:text-[#9C9387] border-t border-[#EFE9DD] dark:border-[#2C2723]">
          <span>Status do Driver: {{ i18n.t('profile.db_status_ready') }}</span>
          <span class="text-[#1B5E20] dark:text-[#86EFAC] font-medium">✓ {{ i18n.t('profile.pwa_cache_ready') }}</span>
        </div>
      </section>

      <!-- Mobile Access & iPhone 13 Optimization Card -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-4">
        <div class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1B5E20] dark:text-[#86EFAC]">
          <mat-icon class="text-sm leading-none !w-4 !h-4">phone_iphone</mat-icon>
          <span>Acesso Online & Otimização para iPhone 13</span>
        </div>

        <p class="text-xs font-reading text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
          O Entrelinha está hospedado na nuvem e totalmente acessível em qualquer dispositivo sem necessidade de configurações adicionais.
        </p>

        <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-2 text-xs">
          <span class="font-bold text-[#231F1C] dark:text-[#EAE4DA] block">Como instalar no seu iPhone 13 como App Nativo (PWA):</span>
          <ol class="list-decimal list-inside space-y-1.5 text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
            <li>Abra o link compartilhado no Safari do seu iPhone 13.</li>
            <li>Toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima na barra inferior).</li>
            <li>Role a lista e selecione <strong>"Adicionar à Tela de Início"</strong> (Add to Home Screen).</li>
            <li>O Entrelinha abrirá em tela cheia, com respeito total à barra de navegação inferior (Home Indicator) e entalhe superior (Notch).</li>
          </ol>
        </div>
      </section>

      <!-- Learning Preferences -->
      <section class="paper-page p-6 sm:p-7 rounded-2xl space-y-5">
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
              class="px-3.5 py-1.5 rounded-lg border border-[#DDD6C8] dark:border-[#38322C] font-medium bg-[#F7F4EE] dark:bg-[#1A1715] text-[#231F1C] dark:text-[#EAE4DA] hover:bg-[#EFE9DD] dark:hover:bg-[#2C2723] transition-colors touch-target-min flex items-center justify-center">
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
