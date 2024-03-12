import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  getWorkspaces(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    if (authInfo) {
      const userId = authInfo[1];
      const headers = authInfo[2];
      return this.http.get<any>(`${this.apiUrl}/workspaces/${userId}`, { headers: headers });
    } else {
      // Handle unauthorized access
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

  deleteWorkspace(): Observable<any> {
    const authInfo = this.tokenService.getAuth();
    const workspaceId = this.tokenService.getWorkspaceId();
    if (authInfo && workspaceId) {
      const headers = authInfo[2];
      return this.http.delete<any>(`${this.apiUrl}/workspace/${workspaceId}`, { headers: headers });
    } else {
      // Handle unauthorized access or missing workspace ID
      return throwError('Unauthorized access or missing workspace ID');
    }
  }
}