import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token`, credentials, { responseType: "json" });
  }

  getUserInformation(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${authInfo[0]}`
      });
      return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers: headers });
    } else {
      return throwError('Unauthorized access');
    }
  }

  

  createWorkspace(workspaceData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.post<any>(`${this.apiUrl}/workspace`, workspaceData, { headers: headers });
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  getWorkspaces(userId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/workspaces/${userId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          console.error('Error fetching workspaces:', error);
          return throwError('Error fetching workspaces');
        })
      );
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

deleteWorkspace(workspaceId: any): Observable<any> {
  const authInfo = this.tokenService.getAuth();
  if (authInfo) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/workspace/${workspaceId}`, { headers: headers }).pipe(
          catchError((error: any) => {
              console.error('Error deleting workspace:', error);
              return throwError('Error deleting workspace');
          })
      );
  } else {
      return throwError('Unauthorized access');
  }
}

  updateWorkspace() {

  }

  createReport(reportData: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      const { reportType, title, description, content, workspace_id } = reportData;
      
      if (reportType! || !title || !description || !content || !workspace_id) {
        console.error('Error creating report: Missing required parameters');
        return throwError('Missing required parameters');
      }
  
      return this.http.post<any>(`${this.apiUrl}/report`, reportData, { headers: headers }).pipe(
        catchError((error: any) => {
          console.error('Error creating report:', error);
          return throwError('Error creating report');
        })
      );
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }

  getReports(workspaceId: any): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/report/${workspaceId}`, { headers: headers }).pipe(
        catchError((error: any) => {
          console.error('Error fetching reports:', error);
          return throwError('Error fetching reports');
        })
      );
    } else {
      // Handle unauthorized access
      return throwError('Unauthorized access');
    }
  }
  
}