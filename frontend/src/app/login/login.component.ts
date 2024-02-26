import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css',
  imports: [RouterLink, RouterOutlet],
})
export class LoginComponent {

  constructor(private router: Router) {}

  login(event: Event) {
    console.log('button click');
    // Prevent default form submission
    event.preventDefault();

    // Simulate successful login
    const isLoggedIn = true;

    if (isLoggedIn) {
      // Navigate to the dashboard route upon successful login
      this.router.navigate(['/dashboard']);
    }
  }

}
