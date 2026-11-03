import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LearnerProfileService } from '../core/services/learner-profile';
import { I18nService } from '../core/services/i18n';
import {
  PLACEMENT_QUESTIONS,
  PlacementQuestion,
  evaluatePlacementScore,
} from '../core/placement-test';
import { CEFRLevel, DifficultyCategory, DifficultyRadar } from '../core/models';
import { createDefaultDifficultyRadar } from '../core/adaptive-learning';

@Component({
  selector: 'app-placement-test-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="max-w-3xl mx-auto space-y-8 pb-16">
      <!-- Top back navigation -->
      <div class="py-2 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400">
        <a routerLink="/" class="inline-flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors">
          <mat-icon class="text-base leading-none !w-4 !h-4">arrow_back</mat-icon>
          <span>Voltar ao Início</span>
        </a>
      </div>

      <!-- Header -->
      <div class="space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 text-xs font-mono uppercase tracking-wider">
          <mat-icon class="text-sm !w-4 !h-4">explore</mat-icon>
          <span>Diagnóstico de Entrada</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Defina seu Ponto de Partida
        </h1>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl font-light">
          Responda a 6 questões práticas concebidas para lusófonos. Avaliaremos sua capacidade de inferência, domínio de falsos cognatos e estruturas verbais para calibrar seu nível de leitura (A1–B2) e seu radar de dificuldades.
        </p>
      </div>

      <!-- Completion Result Card -->
      @if (completedResult(); as res) {
        <section class="stoic-card p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] space-y-6 animate-in fade-in duration-300 shadow-xs">
          <div class="space-y-2 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <mat-icon class="text-base !w-4 !h-4">verified</mat-icon>
              <span>Diagnóstico Concluído com Sucesso</span>
            </span>
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h2 class="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                Nível Recomendado: {{ res.assignedCefr }}
              </h2>
              <span class="text-sm font-mono text-neutral-500 dark:text-neutral-400">
                Aproveitamento: {{ res.score }} de {{ res.total }} ({{ Math.round((res.score / res.total) * 100) }}%)
              </span>
            </div>
          </div>

          <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif">
            {{ res.startingExplanationPt }}
          </p>

          <!-- Diagnostic Strengths & Weaknesses -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
            <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <span class="font-mono font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                ✓ Seus Pontos de Firmeza:
              </span>
              @if (res.initialStrengths.length > 0) {
                <ul class="space-y-1.5 text-neutral-800 dark:text-neutral-200">
                  @for (cat of res.initialStrengths; track cat) {
                    <li class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{{ formatCategoryName(cat) }}</span>
                    </li>
                  }
                </ul>
              } @else {
                <span class="text-neutral-500 dark:text-neutral-400">Iniciando fundamentos do idioma.</span>
              }
            </div>

            <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2">
              <span class="font-mono font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                ⚠ Pontos que Calibramos no seu Radar:
              </span>
              @if (res.initialWeaknesses.length > 0) {
                <ul class="space-y-1.5 text-neutral-800 dark:text-neutral-200">
                  @for (cat of res.initialWeaknesses; track cat) {
                    <li class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{{ formatCategoryName(cat) }}</span>
                    </li>
                  }
                </ul>
              } @else {
                <span class="text-emerald-600 dark:text-emerald-400">Nenhuma fraqueza acentuada detectada!</span>
              }
            </div>
          </div>

          <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span class="text-xs text-neutral-500 dark:text-neutral-400">
              Seu perfil e radar de interferência foram calibrados com estes resultados.
            </span>
            <button
              type="button"
              (click)="applyAndNavigate(res.assignedCefr)"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-medium text-xs text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
              <mat-icon class="text-base !w-4 !h-4">auto_stories</mat-icon>
              <span>Explorar Leituras Recomendadas</span>
            </button>
          </div>
        </section>
      } @else {
        <!-- Interactive Question Flow -->
        <div class="space-y-6">
          <!-- Progress bar -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span class="font-mono">Questão {{ currentStep() + 1 }} de {{ questions.length }}</span>
              <span class="font-mono font-medium">{{ Math.round(((currentStep() + 1) / questions.length) * 100) }}%</span>
            </div>
            <div class="h-1 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div
                class="h-full bg-neutral-900 dark:bg-white transition-all duration-300 rounded-full"
                [style.width.%]="((currentStep() + 1) / questions.length) * 100"></div>
            </div>
          </div>

          @if (currentQuestion(); as q) {
            <article class="stoic-card p-6 sm:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] space-y-6 shadow-xs">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  <span class="px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold">{{ q.targetCefr }}</span>
                  <span>·</span>
                  <span>{{ formatCategoryName(q.difficultyCategory) }}</span>
                </div>

                <h2 class="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-neutral-100 leading-snug pt-1">
                  {{ q.promptFr }}
                </h2>

                <p class="text-xs text-neutral-500 dark:text-neutral-400 italic">
                  {{ q.promptPt }}
                </p>
              </div>

              <!-- Options -->
              <div class="space-y-2.5 pt-2">
                @for (opt of q.options; track opt.id) {
                  <button
                    type="button"
                    (click)="selectAnswer(q.id, opt.id)"
                    [disabled]="hasAnswered(q.id)"
                    [class]="getOptionClass(q.id, opt.id, q.correctOptionId)"
                    class="w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3">
                    <span class="font-mono text-xs mt-0.5 uppercase opacity-60">{{ opt.id }}.</span>
                    <div class="space-y-0.5">
                      <span class="font-medium block">{{ opt.textFr }}</span>
                      <span class="text-xs opacity-75 block font-light">{{ opt.textPt }}</span>
                    </div>
                  </button>
                }
              </div>

              <!-- Instant explanation once answered -->
              @if (hasAnswered(q.id)) {
                <div class="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs space-y-2 animate-in fade-in duration-150">
                  <div class="font-semibold text-sm" [class]="selectedAnswers()[q.id] === q.correctOptionId ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'">
                    {{ selectedAnswers()[q.id] === q.correctOptionId ? '✓ Correto!' : '✗ Observação contrastiva:' }}
                  </div>
                  <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif">
                    {{ q.explanationPt }}
                  </p>
                  <div class="pt-1 text-neutral-500 dark:text-neutral-400 font-mono text-[11px]">
                    Foco pedagógico: {{ q.interferenceNote }}
                  </div>
                </div>

                <!-- Next button -->
                <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
                  @if (currentStep() < questions.length - 1) {
                    <button
                      type="button"
                      (click)="nextQuestion()"
                      class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-xs text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
                      <span>Próxima questão</span>
                      <mat-icon class="text-sm !w-4 !h-4">arrow_forward</mat-icon>
                    </button>
                  } @else {
                    <button
                      type="button"
                      (click)="finishTest()"
                      class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-xs text-white bg-neutral-900 dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
                      <mat-icon class="text-base !w-4 !h-4">done_all</mat-icon>
                      <span>Finalizar e Ver Diagnóstico</span>
                    </button>
                  }
                </div>
              }
            </article>
          }
        </div>
      }
    </div>
  `,
})
export class PlacementTestView {
  private readonly router = inject(Router);
  private readonly learnerService = inject(LearnerProfileService);
  readonly i18n = inject(I18nService);

  readonly questions = PLACEMENT_QUESTIONS;
  readonly currentStep = signal<number>(0);
  readonly selectedAnswers = signal<Record<string, string>>({});
  readonly completedResult = signal<ReturnType<typeof evaluatePlacementScore> | null>(null);

  readonly Math = Math;

  readonly currentQuestion = computed(() => this.questions[this.currentStep()]);

  hasAnswered(questionId: string): boolean {
    return this.selectedAnswers()[questionId] !== undefined;
  }

  selectAnswer(questionId: string, optionId: string): void {
    if (this.hasAnswered(questionId)) return;
    this.selectedAnswers.update((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  }

  getOptionClass(questionId: string, optionId: string, correctOptionId: string): string {
    const chosen = this.selectedAnswers()[questionId];
    if (!chosen) {
      return 'bg-white dark:bg-[#141414] border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 text-neutral-900 dark:text-neutral-100';
    }
    if (optionId === correctOptionId) {
      return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-medium';
    }
    if (chosen === optionId && optionId !== correctOptionId) {
      return 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300';
    }
    return 'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 opacity-40 text-neutral-400 dark:text-neutral-600';
  }

  nextQuestion(): void {
    if (this.currentStep() < this.questions.length - 1) {
      this.currentStep.update((s) => s + 1);
    }
  }

  finishTest(): void {
    const res = evaluatePlacementScore(this.selectedAnswers());
    this.completedResult.set(res);

    // Update learner profile starting CEFR level and radar
    this.learnerService.profile.update((p) => {
      const radar: DifficultyRadar = p.difficultyRadar
        ? JSON.parse(JSON.stringify(p.difficultyRadar))
        : createDefaultDifficultyRadar();

      // Lower radar mastery for weaknesses, boost strengths
      res.initialWeaknesses.forEach((cat) => {
        if (radar[cat]) {
          radar[cat].masteryScore = Math.max(20, radar[cat].masteryScore - 20);
          radar[cat].trend = 'declining';
          radar[cat].attemptsCount += 1;
          radar[cat].errorCount += 1;
        }
      });

      res.initialStrengths.forEach((cat) => {
        if (radar[cat]) {
          radar[cat].masteryScore = Math.min(100, radar[cat].masteryScore + 15);
          radar[cat].trend = 'improving';
          radar[cat].attemptsCount += 1;
          radar[cat].correctCount += 1;
        }
      });

      return {
        ...p,
        readingCEFR: res.assignedCefr,
        difficultyRadar: radar,
        lastSyncedAt: new Date().toISOString(),
      };
    });

    if (typeof window !== 'undefined') {
      localStorage.setItem('lingua_learner_profile', JSON.stringify(this.learnerService.profile()));
    }
  }

  applyAndNavigate(level: CEFRLevel): void {
    this.router.navigate(['/library'], { queryParams: { level } });
  }

  formatCategoryName(cat: DifficultyCategory): string {
    const map: Record<DifficultyCategory, string> = {
      faux_ami: 'Falsos Cognatos',
      divergence_genre: 'Gênero Gramatical (-age)',
      temps_verbal_aspect: 'Imparfait vs Passé Composé',
      preposition_complementation: 'Regência & Preposições',
      pronom_en_y: 'Pronomes « en » e « y »',
      declencheur_subjonctif: 'Gatilhos de Subjuntivo',
      accord_participe: 'Concordância do Particípio',
    };
    return map[cat] || cat;
  }
}
