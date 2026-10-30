import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { ThemeService } from '../core/services/theme';
import { I18nService, SupportedLocale } from '../core/services/i18n';
import { DevNotesService } from '../core/services/dev-notes';
import { DatabaseStatusService } from '../core/services/database-status';

@Component({
  selector: 'app-profile-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
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
          Registre aqui ideias de melhorias, relatórios de bugs ou notas pedagógicas. Suas anotações são salvas diretamente no arquivo <strong>DEV_NOTES.md</strong> na raiz do repositório no GitHub para acompanhamento contínuo da evolução do LINGUA.
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
          O LINGUA está hospedado na nuvem e totalmente acessível em qualquer dispositivo sem necessidade de configurações adicionais.
        </p>

        <div class="p-4 rounded-xl bg-[#F7F4EE] dark:bg-[#1A1715] border border-[#E6DFD3] dark:border-[#332D28] space-y-2 text-xs">
          <span class="font-bold text-[#231F1C] dark:text-[#EAE4DA] block">Como instalar no seu iPhone 13 como App Nativo (PWA):</span>
          <ol class="list-decimal list-inside space-y-1.5 text-[#5A524A] dark:text-[#B5ADA3] leading-relaxed">
            <li>Abra o link compartilhado no Safari do seu iPhone 13.</li>
            <li>Toque no botão <strong>Compartilhar</strong> (ícone do quadrado com a seta para cima na barra inferior).</li>
            <li>Role a lista e selecione <strong>"Adicionar à Tela de Início"</strong> (Add to Home Screen).</li>
            <li>O LINGUA abrirá em tela cheia, com respeito total à barra de navegação inferior (Home Indicator) e entalhe superior (Notch).</li>
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

  readonly profile = this.learnerService.profile;

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
