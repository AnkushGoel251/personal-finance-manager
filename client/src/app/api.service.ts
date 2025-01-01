import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';

// Define types for reuse
export interface PersonalFinance {
  id: string, 
  type: string, 
  name: string,
  amount: number,
  growth?: number,
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_no: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // User APIs
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users/register`, user);
  }

  login(credentials: { id: string; password: string }) {
    return this.http.post<{ id: string }>(
      `${this.baseUrl}/users/login-user`,
      credentials
    );
  }  

  getUserProfile(credentials: { id: string | null }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/get-user`, credentials);
  }

  updateUserProfile(profileData: any): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/users/update`, profileData);
  }

  // Finance APIs
  getFinancesByType(request: { id: string; type: string }): Observable<PersonalFinance[]> {
    return this.http.post<PersonalFinance[]>(`${this.baseUrl}/finance/by-type`, request);
  }

  getFinancesByUser(request: { id: string;}): Observable<PersonalFinance[]> {
    return this.http.post<PersonalFinance[]>(`${this.baseUrl}/finance/by-user`, request);
  }

  addFinances(finances: PersonalFinance[]) {
    const requests = finances.map(finance =>
      this.http.post<void>(`${this.baseUrl}/finance/add`, finance)
    );
  
    // Execute all requests in parallel
    forkJoin(requests).subscribe(
      (responses) => {
        console.log('All finances added successfully:', responses);
      },
      (error) => {
        console.error('Error adding finances:', error);
      }
    );
  }

  // updateFinances(finances: PersonalFinance[]): Observable<void> {
  //   console.log(finances)
  //   return this.http.post<void>(`${this.baseUrl}/finance/update`, finances);
  // }

  deleteFinances(finances: PersonalFinance[]){
    const requests = finances.map(finance =>
      this.http.post<void>(`${this.baseUrl}/finance/delete`, finance)
    );
  
    // Execute all requests in parallel
    forkJoin(requests).subscribe(
      (responses) => {
        console.log('All finances added successfully:', responses);
      },
      (error) => {
        console.error('Error adding finances:', error);
      }
    );
  }
}