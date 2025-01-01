import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModuleExp } from '../common.module';
import { SummaryComponent } from './summary/summary.component';
import { InvestmentsComponent } from './investments/investments.component';
import { SavingsComponent } from './savings/savings.component';
import { ExpensesComponent } from './expenses/expenses.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModuleExp,
    SummaryComponent,
    InvestmentsComponent,
    SavingsComponent,
    ExpensesComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) {}
  onLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userToken'); // Remove the token
    } else {
      console.error('localStorage is not available in this environment.');
    }
    this.router.navigate(['/login']); // Redirect to login
  }
  activeTab: string = 'summary'; // Default active tab

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
  goToProfile(): void {
    this.router.navigate(['/profile']); // Navigate to the user profile page
  }
}
