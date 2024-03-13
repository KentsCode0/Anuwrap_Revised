import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

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
    password: '',
    confirm_password: ''
  };

  errors = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    password1: ""
  }

  constructor(private http: HttpClient, private router: Router) { }

  registerUser() {
    this.http.post('http://localhost/anuwrap/backend/public/api/user', this.registrationData)
      .subscribe(
        (response: any) => {
          this.router.navigate(['/register_success']);
        },
        (error) => {
          let errors = error.error.errors
          this.errors["username"] = errors["username"];
          this.errors["email"] = errors["email"];
          this.errors["firstname"] = errors["firstname"];
          this.errors["lastname"] = errors["lastname"];
          this.errors["password"] = errors["password"];
          this.errors["password1"] = errors["password1"];
        }
      );
  }

}
