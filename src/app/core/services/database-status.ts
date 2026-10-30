import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';

export interface DbHealthState {
  connected: boolean;
  mode: 'postgresql' | 'in_memory_catalog';
  version?: string;
  note?: string;
  error?: string;
  supabaseProjectUrlDetected?: boolean;
  hasDatabaseUrl?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DatabaseStatusService {
  private readonly http = inject(HttpClient);

  readonly state = signal<DbHealthState>({
    connected: false,
    mode: 'in_memory_catalog',
    note: 'Consultando conexão com PostgreSQL/Supabase...',
  });

  readonly isChecking = signal<boolean>(false);

  constructor() {
    this.refreshHealth();
  }

  refreshHealth(): void {
    this.isChecking.set(true);
    this.http.get<{
      status: string;
      database: DbHealthState;
      hasDatabaseUrl: boolean;
    }>('/api/health').pipe(
      tap((res) => {
        this.isChecking.set(false);
        if (res && res.database) {
          this.state.set({
            ...res.database,
            hasDatabaseUrl: res.hasDatabaseUrl,
          });
        }
      }),
      catchError((err) => {
        this.isChecking.set(false);
        this.state.set({
          connected: false,
          mode: 'in_memory_catalog',
          note: 'Servidor operando com catálogo de resiliência local offline.',
          error: err.message,
        });
        return of(null);
      })
    ).subscribe();
  }
}
