import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    public static storedToken : any;
    public static headers : any = "";
    public static userId: any;
  constructor() {
  }

  static setToHeader(token: string) {
    TokenService.headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      
    });
  }

  static storeToken(token: string) {
    TokenService.storedToken = token;
    return true
  }
  
  static storeUserId(userId: string) {
    TokenService.userId = userId;
    return true
  }

  static getUserId(){
    return TokenService.userId;
  }
  static getToken(){
    return TokenService.storedToken;
  }
  
}
