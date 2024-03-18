import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { getLocaleDateFormat } from '@angular/common';
import { TokenService } from '../../auth/token/token.service';
import { AuthService } from '../../routeservice/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
    this.getData();
  }

  user = {
    username: "",
    firstname: "",
    lastname: "",
    email: ""
  };

  constructor(private authService: AuthService, private tokenService: TokenService, private route: Router) { }

  getData(): void {
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

  signOut(): void {
    this.tokenService.clearAuth();
    this.route.navigate(["/login"]);
  }
}

