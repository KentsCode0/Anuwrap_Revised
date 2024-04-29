import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
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

  constructor(private userService: UserService, private tokenService: TokenService, private route: Router, private aRoute: ActivatedRoute) { }

  getData(): void {
    this.userService.getUserInformation().subscribe(
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
  signOut(): void {
    this.tokenService.clearAuth();
    this.route.navigate(["/login"]);
  }
}
