import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-createworkspace',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './createworkspace.component.html',
  styleUrl: './createworkspace.component.css'
})

export class CreateworkspaceComponent {

  constructor(private authService: AuthService) { }



  createWorkspace() {
    const workspaceData = {
      name: "" 
    };

    const headers = TokenService.headers; // Get headers from TokenService

    this.authService.createWorkspace(headers, workspaceData).subscribe(
      (response) => {
        // Handle successful creation of workspace
        console.log('Workspace created:', response);
      },
      (error) => {
        // Handle error
        console.error('Error creating workspace:', error);
      }
    );
  }
}