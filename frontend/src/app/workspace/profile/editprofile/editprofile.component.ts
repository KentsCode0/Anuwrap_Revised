import { Component, OnInit } from '@angular/core';
import { RouterModule, Route, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TokenService } from '../../../auth/token/token.service';
import { AuthService } from '../../../routeservice/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule, FormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
  user: any = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  

  constructor(private authService: AuthService, private route: Router) { }

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

  editUser(): void {
    delete this.user.username;
    delete this.user.email;
    this.authService.editUserInformation(this.user).subscribe(
      (response) => {
        this.route.navigate(["/profile"]);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}
