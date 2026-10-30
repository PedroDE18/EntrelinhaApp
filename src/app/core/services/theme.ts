import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lingua_theme');
      if (stored) {
        this.isDark.set(stored === 'dark');
      } else {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.isDark.set(prefersDark);
      }
      this.applyTheme(this.isDark());
    }

    effect(() => {
      const dark = this.isDark();
      if (typeof window !== 'undefined') {
        this.applyTheme(dark);
        localStorage.setItem('lingua_theme', dark ? 'dark' : 'light');
      }
    });
  }

  toggleTheme(): void {
    this.isDark.update((v) => !v);
  }

  setTheme(dark: boolean): void {
    this.isDark.set(dark);
  }

  private applyTheme(dark: boolean): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  }
}
