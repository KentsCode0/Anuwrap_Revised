import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  getReports(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reports/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {

          return throwError(() => 'Error fetching report');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  deleteReport(reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/reports/${reportId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error deleting workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  getReportType(): Observable<any> {
    const authInfo = this.tokenService.getAuth();

    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/reporttype`, { headers: headers }).pipe(
        catchError((error: any) => {
          return throwError(() => 'Error fetching workspace');
        })
      );
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError(() => 'Unauthorized access or missing workspace ID');
    }
  }

  createReport(reportData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/reports`, reportData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  editReport(reportData: any, reportId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.put<any>(`${this.apiUrl}/reports/${reportId}`, reportData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
}
