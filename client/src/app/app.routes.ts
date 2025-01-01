import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
    { path: 'login', component: LoginComponent },          // Login route
    { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard]},  // Dashboard route
    { path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
  ];
  
