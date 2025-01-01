import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { CommonModuleExp } from '../common.module';

export interface responseFormat {
    name: string,
    email: string, // Assuming `id` corresponds to email
    contact: string,
    address: string,
    password: string,
    id: string
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModuleExp],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  responseData: responseFormat = {
    name: '',
    email: '', // Assuming `id` corresponds to email
    contact: '',
    address: '',
    password: '',
    id: ''
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    // Initialize the form with validators
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      contact: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    // Retrieve the userId from localStorage

    this.fetchUserProfile(localStorage.getItem('userId'));

  }

  fetchUserProfile(userId: string | null): void {
    // API call to fetch user details
    const Credential = {
      id: userId
    }
    this.apiService.getUserProfile(Credential).subscribe(
      (response: any) => {
        this.profileForm.patchValue({
          name: response.name,
          email: response.id, // Assuming `id` corresponds to email
          contact: response.phoneNo,
          address: response.address
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
    this.apiService.getUserProfile(Credential).subscribe(
      (response: any) => {
        
          this.responseData.name = response.name;
          this.responseData.email = response.id; // Assuming `id` corresponds to email
          this.responseData.contact = response.phoneNo;
          this.responseData.address = response.address;
          this.responseData.password = response.password;
          this.responseData.id = response.id;
        
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedProfile = {
        name: this.profileForm.value.name,
        email: this.responseData.id, // Assuming `id` corresponds to email
        phoneNo: this.profileForm.value.contact == undefined ? null : this.profileForm.value.contact,
        address: this.profileForm.value.address == undefined ? null : this.profileForm.value.contact,
        password: this.responseData.password,
        id: this.responseData.id
      };
      console.log(updatedProfile)
      this.apiService.updateUserProfile(updatedProfile).subscribe(
        () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error updating profile:', error);
          alert('An error occurred while updating the profile. Please try again.');
        }
      );
    }
  }

  onBack(): void {
    // Navigate back to the dashboard or previous page
    this.router.navigate(['/dashboard']);
  }
}