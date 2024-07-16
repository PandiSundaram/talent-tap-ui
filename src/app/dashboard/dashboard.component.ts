import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Candidate, CandidateService } from '../candidate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  candidates: Candidate[] = [];
  displayedColumns: string[] = ['candidateId', 'firstName', 'lastName', 'email', 'phoneNumber', 'referrerId', 'jobId', 'status', 'rounds'];
  candidatesForm: FormGroup;
  editedRows: Candidate[] = [];

  constructor(private candidateService: CandidateService, 
              private fb: FormBuilder, 
              private snackBar: MatSnackBar) {
    this.candidatesForm = this.fb.group({
      candidates: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.candidateService.getCandidateDetails().subscribe((data) => {
      this.candidates = data;
      this.initializeForm();
    });
  }
  
  get candidatesArray(): FormArray {
    return this.candidatesForm.get('candidates') as FormArray;
  }

  initializeForm(): void {
    this.candidates.forEach(candidate => {
      this.candidatesArray.push(this.fb.group({
        candidateId: [candidate.candidateId],
        firstName: [candidate.firstName],
        lastName: [candidate.lastName],
        email: [candidate.email],
        phoneNumber: [candidate.phoneNumber],
        referrerId: [candidate.referrerId],
        jobId: [candidate.jobId],
        status: [candidate.status],
        rounds: [candidate.rounds]
      }));
    });
  }

  onStatusChange(index: number) {
    const editedCandidate = this.candidates[index];
    if (!this.editedRows.includes(editedCandidate)) {
      this.editedRows.push(editedCandidate);
    }
  }

  onRoundsChange(index: number) {
    const editedCandidate = this.candidates[index];
    if (!this.editedRows.includes(editedCandidate)) {
      this.editedRows.push(editedCandidate);
    }
  }

  applyChanges() {
    console.log('Edited Candidates:', this.editedRows);
    this.candidateService.updateCandidateDetails(this.editedRows).subscribe(
      updatedCandidates => {
        console.log('Candidates updated successfully', updatedCandidates);
        this.showSuccess('Candidates updated successfully');
      },
      error => {
        console.error('Failed to update candidates', error);
        // Handle error, possibly show an error message
      }
    );
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
