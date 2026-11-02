import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/home-view').then((m) => m.HomeView),
  },
  {
    path: 'library',
    loadComponent: () => import('./views/library-view').then((m) => m.LibraryView),
  },
  {
    path: 'read/:id',
    loadComponent: () => import('./views/reading-view').then((m) => m.ReadingView),
  },
  {
    path: 'progress',
    loadComponent: () => import('./views/progress-view').then((m) => m.ProgressView),
  },
  {
    path: 'profile',
    loadComponent: () => import('./views/profile-view').then((m) => m.ProfileView),
  },
  {
    path: 'placement',
    loadComponent: () => import('./views/placement-test-view').then((m) => m.PlacementTestView),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
