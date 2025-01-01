import { Component, OnInit } from '@angular/core';
import { CommonModuleExp } from '../../common.module';
import { ApiService } from '../../api.service';

export interface PersonalFinance {
  id: string;
  type: string;
  name: string;
  amount: number;
  growth?: number;
  rowStatus: string;
}

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModuleExp],
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css'],
})
export class InvestmentsComponent implements OnInit {
  investments: PersonalFinance[] = [];
  deletedRows: PersonalFinance[] = [];
  userId = localStorage.getItem('userId');
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchInvestments();
  }

  fetchInvestments() {
    this.apiService
      .getFinancesByType({ id: this.userId?this.userId:'', type: '2' })
      .subscribe((response: any) => {
        this.investments = response.map((item: any) => ({
          id: item.id,
          type: item.type,
          name: item.name,
          amount: item.amount,
          growth: item.growth,
          rowStatus: 'DATA', // Initially empty
        }));
      });
  }

  handleInputChange(index: number) {
    const investment = this.investments[index];
    console.log(index);
    if (investment.rowStatus !== 'NEW') {
      investment.rowStatus = 'MODIFIED';
    }
  }

  addInvestment() {
    this.investments.push({
      id: this.userId?this.userId:'',
      type: '2',
      name: '',
      amount: 0,
      growth: 0,
      rowStatus: 'ADDED',
    });
  }

  deleteInvestment(index: number) {
    const investment = this.investments[index];
    if (investment.rowStatus !== 'ADDED') {
      // Remove not newly added rows immediately
      this.deletedRows.push(investment);
    }
    this.investments.splice(index, 1);
  }

  saveChanges() {
    const addedRows = this.investments.filter(
      (investment) => investment.rowStatus === 'ADDED'
    );
    const modifiedRows = this.investments.filter(
      (investment) => investment.rowStatus === 'MODIFIED'
    );
    console.log(this.investments);

    // Call API for added rows
    if (addedRows.length > 0) this.apiService.addFinances(addedRows);

    // Call API for modified rows
    if (modifiedRows.length > 0) this.apiService.addFinances(modifiedRows);

    // Call API for deleted rows
    if (this.deletedRows.length > 0)
      this.apiService.deleteFinances(this.deletedRows);
  }
}