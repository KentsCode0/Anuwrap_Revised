import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html', 
  styleUrl: './login.component.css',
  imports: [RouterLink, RouterOutlet],
})
export class LoginComponent {

}
