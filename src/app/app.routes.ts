import { Routes } from '@angular/router';
import { AuthGuard } from '../guared/auth.guard';

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('../components/login/login.component').then(m => m.default) },
    { path: 'dashboard', loadComponent: () => import('../pages/dashboard/dashboard.component').then(m => m.default), canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' } // Redirect to login by default
  ];
