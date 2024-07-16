import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Candidate {
  candidateId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  referrerId: string;
  jobId: string;
  resumeName: string;
  status: string;
  rounds: string;
}

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:8080/talent';

  constructor(private http: HttpClient) { }

  loginUser(userName: string, passWord: string): Observable<boolean> {
    const url = `${this.apiUrl}/loginuser`;
    const payload = { userName, passWord };
    return this.http.post<boolean>(url, payload);
  }

  registerCandidate(candidate: Candidate): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, candidate);
  }

  getCandidateDetails(): Observable<Candidate[]> {
    const url = `${this.apiUrl}/details`;
    return this.http.get<Candidate[]>(url);
  }

  updateCandidateDetails(candidates: Candidate[]): Observable<any> {
    const url = `${this.apiUrl}/details`;
    return this.http.put<any>(url, candidates);
  }
}
