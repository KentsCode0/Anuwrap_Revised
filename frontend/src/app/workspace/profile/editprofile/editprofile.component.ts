import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TokenService } from '../../../auth/token/token.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent implements OnInit {
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
        console.log('User Data:', response.data.user);
      },
      (error) => {
        console.error('Error fetching user information:', error);
      }
    );
  }
}
