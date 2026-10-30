import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export interface DevNote {
  id: string;
  timestamp: string;
  category: string;
  title: string;
  content: string;
}

export interface DevNotesResponse {
  success: boolean;
  notes: DevNote[];
  raw?: string;
  filePath?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DevNotesService {
  private readonly http = inject(HttpClient);

  readonly notes = signal<DevNote[]>([]);
  readonly isLoading = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly statusMessage = signal<string | null>(null);
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.http.get<DevNotesResponse>('/api/dev-notes').pipe(
      tap((res) => {
        this.isLoading.set(false);
        if (res.success && Array.isArray(res.notes)) {
          this.notes.set(res.notes);
        }
      }),
      catchError((err) => {
        this.isLoading.set(false);
        console.warn('[DevNotes] Could not load dev notes from server:', err);
        // Fallback initial note
        if (this.notes().length === 0) {
          this.notes.set([
            {
              id: 'init-1',
              timestamp: '2026-10-30 13:20',
              category: 'MELHORIA',
              title: 'Nomenclatura Linguística: Falso Cognato',
              content: 'Substituição do termo "Falso Amigo" por "Falso Cognato" para maior precisão.',
            },
          ]);
        }
        return of(null);
      })
    ).subscribe();
  }

  saveNote(data: { category: string; title: string; content: string }): Promise<boolean> {
    this.isSaving.set(true);
    this.statusMessage.set(null);
    this.errorMessage.set(null);

    return new Promise((resolve) => {
      this.http.post<DevNotesResponse>('/api/dev-notes', data).pipe(
        tap((res) => {
          this.isSaving.set(false);
          if (res.success) {
            this.statusMessage.set('Nota salva com sucesso no arquivo DEV_NOTES.md!');
            if (Array.isArray(res.notes)) {
              this.notes.set(res.notes);
            }
            setTimeout(() => this.statusMessage.set(null), 4000);
            resolve(true);
          } else {
            this.errorMessage.set(res.error || 'Erro ao registrar nota.');
            resolve(false);
          }
        }),
        catchError((err) => {
          this.isSaving.set(false);
          const errorMsg = err.error?.error || err.message || 'Erro de comunicação ao salvar nota.';
          this.errorMessage.set(errorMsg);
          // Optimistic local add
          const now = new Date();
          const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          this.notes.update((prev) => [
            {
              id: `local-${Date.now()}`,
              timestamp,
              category: data.category.toUpperCase(),
              title: data.title,
              content: data.content,
            },
            ...prev,
          ]);
          this.statusMessage.set('Nota registrada localmente!');
          setTimeout(() => this.statusMessage.set(null), 4000);
          resolve(true);
          return of(null);
        })
      ).subscribe();
    });
  }
}
