import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { TokenService } from '../../../auth/token/token.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.css',
    imports: [RouterModule, NavigationComponent]
})
export class ProfileComponent implements OnInit{

    user = {
        username : "",
        firstname : "",
        lastname : "",
        email : ""
    }
    constructor(private authService: AuthService){}

    ngOnInit(): void {
        const headers = TokenService.headers;
        const id = TokenService.getUserId();
        console.log("profile", headers)
        console.log("profile", id)
        this.authService.getUserInformation(id, headers).subscribe(
            (response) => {
              this.user.username = response.data.user.username;
              this.user.firstname = response.data.user.first_name;
              this.user.lastname = response.data.user.last_name;
              this.user.email = response.data.user.email;
              console.log('User Data:', response.data.user.first_name);
            },
            (error) => {
              console.error('Error fetching user information:', error);
            }
          );
        }
      }