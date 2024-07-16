import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registrationForm: FormGroup;

  jobs = [
    { code: 'DEV', title: 'Developer' },
    { code: 'DS', title: 'Data Scientist' },
    { code: 'PM', title: 'Project Manager' },
    { code: 'QA', title: 'Quality Assurance' },
    // Add more job codes and titles as needed
  ];

  constructor(private fb: FormBuilder,
              private candidateService: CandidateService,
              private snackBar: MatSnackBar
  ) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      referrerId: ['', Validators.required],
      jobId: ['', Validators.required],
      resumeName: [null, Validators.required] // Changed to resumeName for file name
    });
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file: File | null = (fileInput.files && fileInput.files[0]) ? fileInput.files[0] : null;
  
    if (file) {
      this.registrationForm.get('resumeName')!.setValue(file.name); // Set file name to resumeName field
      this.registrationForm.get('resumeName')!.markAsDirty(); // Mark field as dirty to trigger validation
    }
  }
  
  onSubmit(): void {
    if (this.registrationForm.valid) {
      const candidate = this.registrationForm.value;
      this.candidateService.registerCandidate(candidate).subscribe(
        response => {
          console.log('Registration successful', response);
          this.showSuccess('Registration successful');
        },
        error => {
          console.error('Registration failed', error);
          // Show error message or toast notification here
        }
      );
    }
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
