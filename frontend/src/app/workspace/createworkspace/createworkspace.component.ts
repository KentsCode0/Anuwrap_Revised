import { Component, OnInit } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-createworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './createworkspace.component.html',
  styleUrl: './createworkspace.component.css'
})

export class CreateworkspaceComponent implements OnInit {
  workspaceName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  createWorkspace(): void {
    const workspaceData = {
      name: this.workspaceName,
      date_modified: new Date().toISOString(),
      date_created: new Date().toISOString()
    };

    this.authService.createWorkspace(workspaceData).subscribe(
      (response) => {
        console.log('Workspace created:', response);
       this.router.navigate(['../workspacelist'])
      },
      (error) => {
        console.error('Error creating workspace:', error);
        // Handle error (e.g., display error message)
      }
    );
  }
}