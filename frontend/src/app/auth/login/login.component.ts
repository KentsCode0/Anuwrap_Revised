import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Token } from '@angular/compiler';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router, private tokenService: TokenService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        const token = response.data.token;
        const userId = response.data.user_id;
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        this.tokenService.setAuthorization(token, userId, headers);
  
        this.router.navigate(['../workspacelist']);
      },
      (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          console.error('An error occurred:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was:`, error.error);
        }
      }
    );
  }
}