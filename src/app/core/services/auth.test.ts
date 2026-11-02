import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AuthService, DEFAULT_ADMIN_USER, DEFAULT_LEARNER_USER } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('initializes with Admin profile and pre-seeded credentials', () => {
    expect(service.currentUser().username).toBe('Admin');
    expect(service.currentUser().role).toBe('admin');
    expect(service.currentUser().readingCEFR).toBe('B2');
    expect(service.isAdmin()).toBe(true);
    expect(service.availableProfiles().length).toBeGreaterThanOrEqual(2);
  });

  it('authenticates Admin with correct credentials (Admin / Admin123)', async () => {
    const result = await service.login('Admin', 'Admin123');
    expect(result.success).toBe(true);
    expect(service.currentUser().username).toBe('Admin');
  });

  it('rejects login with wrong password', async () => {
    const result = await service.login('Admin', 'wrongpassword');
    expect(result.success).toBe(false);
    expect(result.error).toContain('Senha incorreta');
  });

  it('rejects login with non-existent username', async () => {
    const result = await service.login('ghostuser', 'somepassword');
    expect(result.success).toBe(false);
    expect(result.error).toContain('não encontrado');
  });

  it('registers a new learner profile and sets it as active', async () => {
    const regResult = await service.register('marie', 'pass123', 'Marie Curie', 'B1');
    expect(regResult.success).toBe(true);
    expect(regResult.user).toBeDefined();
    expect(regResult.user?.username).toBe('marie');
    expect(regResult.user?.role).toBe('learner');
    expect(regResult.user?.readingCEFR).toBe('B1');

    expect(service.currentUser().username).toBe('marie');
    expect(service.isAdmin()).toBe(false);

    // Profile list now has the new user
    const profiles = service.availableProfiles();
    expect(profiles.some((p) => p.username === 'marie')).toBe(true);
  });

  it('prevents registering duplicate usernames', async () => {
    const res = await service.register('admin', 'anotherPass', 'Duplicate Admin');
    expect(res.success).toBe(false);
    expect(res.error).toContain('já está em uso');
  });

  it('allows seamless switching between profiles', () => {
    // Switch to default learner pedro
    const switched = service.switchProfile(DEFAULT_LEARNER_USER.id);
    expect(switched).toBe(true);
    expect(service.currentUser().id).toBe(DEFAULT_LEARNER_USER.id);
    expect(service.currentUser().username).toBe('pedro');
    expect(service.isAdmin()).toBe(false);

    // Switch back to Admin
    const switchedBack = service.switchProfile(DEFAULT_ADMIN_USER.id);
    expect(switchedBack).toBe(true);
    expect(service.currentUser().id).toBe(DEFAULT_ADMIN_USER.id);
    expect(service.isAdmin()).toBe(true);
  });
});
