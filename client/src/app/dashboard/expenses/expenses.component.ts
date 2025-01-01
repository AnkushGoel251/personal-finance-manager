import { Component, OnInit } from '@angular/core';
import { CommonModuleExp } from '../../common.module';
import { ApiService } from '../../api.service';

export interface ExpenseCategory {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports:[CommonModuleExp],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenseCategories: ExpenseCategory[] = [
    { name: 'Food', amount: 0 },
    { name: 'Travel', amount: 0 },
    { name: 'Entertainment', amount: 0 },
    { name: 'Shopping', amount: 0 },
    { name: 'Miscellaneous', amount: 0 },
  ];
  userId = localStorage.getItem('userId');

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchExpenses();
  }

  fetchExpenses(): void {
    this.apiService
      .getFinancesByType({ id: this.userId?this.userId:'', type: '1' })
      .subscribe((response: any) => {
        // Map response data to existing categories
        this.expenseCategories = this.expenseCategories.map((category) => {
          const matchingData = response.find(
            (item: any) => item.name === category.name
          );
          return matchingData
            ? { name: category.name, amount: matchingData.amount }
            : category;
        });
      });
  }

  saveExpenses(): void {
    const expensesToSave = this.expenseCategories.map((category) => ({
      id: this.userId?this.userId:'',
      type: '1',
      name: category.name,
      amount: category.amount,
    }));

    this.apiService.addFinances(expensesToSave);
  }
}