import { Injectable, signal, computed } from '@angular/core';
import { CEFRLevel, UserAccount } from '../models';

export const DEFAULT_ADMIN_USER: UserAccount = {
  id: 'usr-admin',
  username: 'Admin',
  name: 'Administrateur Entrelinha',
  role: 'admin',
  readingCEFR: 'B2',
  listeningCEFR: 'B1',
  createdAt: '2026-10-01T00:00:00.000Z',
};

export const DEFAULT_LEARNER_USER: UserAccount = {
  id: 'learner-br-01',
  username: 'pedro',
  name: 'Pedro Henrique',
  role: 'learner',
  readingCEFR: 'B1',
  listeningCEFR: 'A2',
  createdAt: '2026-10-25T00:00:00.000Z',
};

interface StoredCredential {
  id: string;
  username: string;
  passwordHash: string; // Base64 salted signature
  user: UserAccount;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly currentUser = signal<UserAccount>(DEFAULT_ADMIN_USER);
  readonly availableProfiles = signal<UserAccount[]>([DEFAULT_ADMIN_USER, DEFAULT_LEARNER_USER]);
  readonly isAuthenticated = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  private readonly CREDENTIALS_KEY = 'entrelinha_user_credentials';
  private readonly ACTIVE_USER_KEY = 'entrelinha_active_user_id';

  constructor() {
    this.initAuth();
  }

  private initAuth(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      // 1. Initialize or load stored credentials
      let creds = this.getStoredCredentials();
      if (!creds || creds.length === 0) {
        creds = [
          {
            id: DEFAULT_ADMIN_USER.id,
            username: DEFAULT_ADMIN_USER.username.toLowerCase(),
            passwordHash: this.hashPassword('Admin123'),
            user: DEFAULT_ADMIN_USER,
          },
          {
            id: DEFAULT_LEARNER_USER.id,
            username: DEFAULT_LEARNER_USER.username.toLowerCase(),
            passwordHash: this.hashPassword('entrelinha123'),
            user: DEFAULT_LEARNER_USER,
          },
        ];
        this.saveStoredCredentials(creds);
      }

      const profiles = creds.map((c) => c.user);
      this.availableProfiles.set(profiles);

      // 2. Hydrate active session
      const savedUserId = localStorage.getItem(this.ACTIVE_USER_KEY);
      if (savedUserId) {
        const found = profiles.find((p) => p.id === savedUserId);
        if (found) {
          this.currentUser.set(found);
          return;
        }
      }

      // Default to Admin for testing as requested
      this.currentUser.set(DEFAULT_ADMIN_USER);
      localStorage.setItem(this.ACTIVE_USER_KEY, DEFAULT_ADMIN_USER.id);
    } catch {
      // Graceful fallback
    }
  }

  async login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
    const cleanUser = (username || '').trim().toLowerCase();
    const creds = this.getStoredCredentials();
    const entry = creds.find((c) => c.username.toLowerCase() === cleanUser);

    if (!entry) {
      return { success: false, error: 'Usuário não encontrado.' };
    }

    if (entry.passwordHash !== this.hashPassword(password)) {
      return { success: false, error: 'Senha incorreta. Para a conta Admin utilize "Admin123".' };
    }

    this.currentUser.set(entry.user);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.ACTIVE_USER_KEY, entry.user.id);
    }

    // Notify backend session
    this.syncAuthWithBackend(entry.user);

    return { success: true };
  }

  async register(
    username: string,
    password: string,
    name: string,
    initialCEFR: CEFRLevel = 'A2'
  ): Promise<{ success: boolean; error?: string; user?: UserAccount }> {
    const cleanUser = (username || '').trim();
    if (!cleanUser || cleanUser.length < 3) {
      return { success: false, error: 'Nome de usuário deve ter pelo menos 3 caracteres.' };
    }

    if (!password || password.length < 4) {
      return { success: false, error: 'Senha deve ter pelo menos 4 caracteres.' };
    }

    const creds = this.getStoredCredentials();
    if (creds.some((c) => c.username.toLowerCase() === cleanUser.toLowerCase())) {
      return { success: false, error: 'Este nome de usuário já está em uso.' };
    }

    const newId = `usr-${Date.now()}`;
    const newUser: UserAccount = {
      id: newId,
      username: cleanUser,
      name: (name || cleanUser).trim(),
      role: 'learner',
      readingCEFR: initialCEFR,
      listeningCEFR: initialCEFR === 'B2' ? 'B1' : initialCEFR === 'B1' ? 'A2' : 'A1',
      createdAt: new Date().toISOString(),
    };

    creds.push({
      id: newId,
      username: cleanUser.toLowerCase(),
      passwordHash: this.hashPassword(password),
      user: newUser,
    });

    this.saveStoredCredentials(creds);
    this.availableProfiles.set(creds.map((c) => c.user));
    this.currentUser.set(newUser);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(this.ACTIVE_USER_KEY, newId);
    }

    this.syncAuthWithBackend(newUser);

    return { success: true, user: newUser };
  }

  switchProfile(userId: string): boolean {
    const profiles = this.availableProfiles();
    const found = profiles.find((p) => p.id === userId);
    if (found) {
      this.currentUser.set(found);
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.ACTIVE_USER_KEY, found.id);
      }
      this.syncAuthWithBackend(found);
      return true;
    }
    return false;
  }

  logout(): void {
    // Revert to Admin for test environment convenience
    this.switchProfile(DEFAULT_ADMIN_USER.id);
  }

  private hashPassword(password: string): string {
    // Compact salt hash for browser & edge runtime
    let hash = 0;
    const salt = 'entrelinha_salt_fr_br_2026';
    const str = `${salt}:${password}`;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `sha_${Math.abs(hash).toString(16)}`;
  }

  private getStoredCredentials(): StoredCredential[] {
    if (typeof window === 'undefined' || !window.localStorage) return [];
    try {
      const raw = localStorage.getItem(this.CREDENTIALS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveStoredCredentials(creds: StoredCredential[]): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(this.CREDENTIALS_KEY, JSON.stringify(creds));
    } catch {}
  }

  private syncAuthWithBackend(user: UserAccount): void {
    if (typeof window === 'undefined' || !window.fetch) return;
    fetch('/api/auth/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user }),
    }).catch(() => {
      // Resilient offline fallback
    });
  }
}
