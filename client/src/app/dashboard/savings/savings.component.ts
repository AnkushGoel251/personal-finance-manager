import { Component, OnInit } from '@angular/core';
import { CommonModuleExp } from '../../common.module';
import { ApiService } from '../../api.service';


export interface PersonalFinance {
  id: string, 
  type: string, 
  name: string,
  amount: number,
  growth?: number,
  rowStatus: string
}


@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModuleExp],
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css'],
})
export class SavingsComponent implements OnInit {
  savings: PersonalFinance[] = [];
  deletedRows: PersonalFinance[] = [];
  userId = localStorage.getItem('userId');
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchSavings();
  }

  fetchSavings() {
    this.apiService.getFinancesByType({ id: this.userId?this.userId:'', type: "0" }).subscribe((response: any) => {
      this.savings = response.map((item: any) => ({
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
    const saving = this.savings[index];
    console.log(index)
    if (saving.rowStatus !== 'NEW') {
      saving.rowStatus = 'MODIFIED';
    }
  }

  addSaving() {
    this.savings.push({
      id: this.userId?this.userId:'', 
      type: '0', 
      name: '',
      amount: 0,
      growth: 0,
      rowStatus: 'ADDED',
    });
  }

  deleteSaving(index: number) {
    const saving = this.savings[index];
    if (saving.rowStatus !== 'ADDED') {
      // Remove not newly added rows immediately
      this.deletedRows.push(saving)
    } 
    this.savings.splice(index, 1);
  }

  saveChanges() {
    const addedRows = this.savings.filter((saving) => saving.rowStatus === 'ADDED');
    const modifiedRows = this.savings.filter((saving) => saving.rowStatus === 'MODIFIED');
    console.log(this.savings)

    // Call API for added rows
    if(addedRows.length > 0)
    this.apiService.addFinances(addedRows);

    // Call API for modified rows
    if(modifiedRows.length > 0)
    this.apiService.addFinances(modifiedRows);

    // Call API for deleted rows
    if(this.deletedRows.length > 0)
    this.apiService.deleteFinances(this.deletedRows);
  }
}