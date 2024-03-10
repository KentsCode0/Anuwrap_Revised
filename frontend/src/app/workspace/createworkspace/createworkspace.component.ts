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

export class CreateworkspaceComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.createWorkspace();
  }

  createWorkspace() {
    const workspaceData = {
      workspaceId: "",
      name: ""
    };
    const headers = TokenService.headers;
    const id = TokenService.getUserId();

    this.authService.createWorkspace(id, headers).subscribe(
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
