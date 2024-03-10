import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService) {
  } 

  login() {
    this.authService.login(this.credentials).subscribe(
      (response: any) => {
        TokenService.setToHeader(response.data.token)
        TokenService.storeToken(response.data.token)
        TokenService.storeUserId(response.data.user_id)

        console.log(TokenService.getUserId())
        console.log(TokenService.getToken())
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
