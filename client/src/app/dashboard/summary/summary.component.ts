import { Component, OnInit } from '@angular/core';
import { CommonModuleExp } from '../../common.module';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports:[CommonModuleExp],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  savings: number = 0;
  investments: number = 0;
  expenses: number = 0;
  totalFinance: number = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSummary();
  }

  fetchSummary(): void {
    const userId = localStorage.getItem('userId'); // Replace this with dynamic userId if applicable
    this.apiService.getFinancesByUser({ id: userId === null?'':userId }).subscribe((response: any) => {
      // Initialize totals for calculations
      let totalSavings = 0;
      let totalInvestments = 0;
      let totalExpenses = 0;

      // Iterate through the finance data
      response.forEach((item: any) => {
        const type = item.type;
        const amount = item.amount;

        // Sum amounts based on type
        if (type === '0') {
          totalSavings += amount;
        } else if (type === '1') {
          totalExpenses += amount;
        } else if (type === '2') {
          totalInvestments += amount;
        }
      });
      //console.log(this.savings, totalSavings)

      // Update the component properties
      this.savings = totalSavings;
      this.investments = totalInvestments;
      this.expenses = totalExpenses;
      this.totalFinance = totalSavings + totalInvestments - totalExpenses;
    });
  }
}
