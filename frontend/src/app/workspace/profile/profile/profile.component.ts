import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { TokenService } from '../../../auth/token/token.service';
import { AuthService } from '../../../routeservice/auth.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterModule, NavbarComponent]
})
export class ProfileComponent implements OnInit {
  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserInformation().subscribe(
      (response) => {
        this.user.username = response.data.user.username;
        this.user.firstname = response.data.user.first_name;
        this.user.lastname = response.data.user.last_name;
        this.user.email = response.data.user.email;
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}