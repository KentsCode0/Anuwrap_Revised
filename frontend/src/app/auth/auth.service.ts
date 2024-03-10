import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/anuwrap/backend/public/api';

  constructor(private http: HttpClient) {
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/token`, credentials, {responseType:"json"});
  }

  getUserInformation(userId: string, headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`, { headers: headers });
  }

  getWorkspaces(userId: string, headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/workspaces/${userId}`, { headers: headers });
  }

  createWorkspace(headers: HttpHeaders, workspaceData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/workspace`, workspaceData, { headers: headers });
  }
  

}
