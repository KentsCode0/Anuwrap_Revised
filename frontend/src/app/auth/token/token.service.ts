import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_ID_KEY = 'user_id';
  private readonly WORKSPACE_KEY = 'workspace_id';
  private headers: HttpHeaders | undefined;

  constructor(private cookieService: CookieService) {}

  setAuthorization(token: string, userId: string): void {
    this.cookieService.set(this.TOKEN_KEY, token);
    this.cookieService.set(this.USER_ID_KEY, userId);
  }

  storeToken(token: string): void {
    this.cookieService.set(this.TOKEN_KEY, token);
  }
  
  storeUserId(userId: string): void {
    this.cookieService.set(this.USER_ID_KEY, userId);
  }

  storeWorkspaceId(workspaceId: string): void {
    this.cookieService.set(this.WORKSPACE_KEY, workspaceId)
  }

  getAuth(): [string, string, HttpHeaders] | null {
    const token = this.cookieService.get(this.TOKEN_KEY);
    const userId = this.cookieService.get(this.USER_ID_KEY);
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return token && userId ? [token, userId, this.headers] : null;
  }

  clearAuth(): void {
    this.cookieService.delete(this.TOKEN_KEY);
    this.cookieService.delete(this.USER_ID_KEY);
  }

  getUserId(): string | null {
    return this.cookieService.get(this.USER_ID_KEY);
  }

  getToken(): string | null {
    return this.cookieService.get(this.TOKEN_KEY);
  }

  getWorkspaceId(): string | null {
    return this.cookieService.get(this.WORKSPACE_KEY);
  }
}
