import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }
}
