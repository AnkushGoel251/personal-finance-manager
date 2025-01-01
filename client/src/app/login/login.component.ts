import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModuleExp } from '../common.module';
import { ApiService } from '../api.service';
import { response } from 'express';



@Component({
  selector: 'app-login',
  standalone:true,
  imports:[CommonModuleExp],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit(): void {
    const credentials = {
      id: this.email,
      password: this.password,
    };

    this.apiService.login(credentials).subscribe(
      (response: any) => {
        if (response.id) {
          // Store user ID (email) in local storage
          localStorage.setItem('userId', response.id);
          localStorage.setItem('userToken',"ok");

          // Redirect to the dashboard or another page
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid email or password.';
        }
      },
      (error) => {
        //console.log(response)
        this.errorMessage = 'An error occurred. Please try again.';
      }
    );
  }
}