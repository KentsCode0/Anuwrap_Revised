import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationData = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  registerUser() {
    this.http.post('http://localhost/anuwrap/backend/public/api/user', this.registrationData)
      .subscribe(
        (response: any) => {
          console.log(response); // Log response for debugging
          // Handle successful registration, e.g., show success message
        },
        (error) => {
          console.error(error); // Log error for debugging
          // Handle error, e.g., display error message to user
        }
      );
  }
}
