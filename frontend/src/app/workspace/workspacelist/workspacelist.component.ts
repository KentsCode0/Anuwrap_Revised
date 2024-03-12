import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
    selector: 'app-workspacelist',
    standalone: true,
    templateUrl: './workspacelist.component.html',
    styleUrl: './workspacelist.component.css',
    imports: [RouterModule, NavbarComponent, CommonModule]
})
export class WorkspacelistComponent implements OnInit {
    workspaces: any[] = []; // Assuming your workspace data is stored in this array
  
    constructor(private authService: AuthService, private tokenService: TokenService) { }
  
    ngOnInit(): void {
      // Fetch workspaces when component initializes
      this.fetchWorkspaces();
    }
  
    fetchWorkspaces() {
      // Call authService to get the list of workspaces
      this.authService.getWorkspaces().subscribe(
        (response) => {
          // Update workspaces array with the fetched data
          this.workspaces = response.data.workspace;
        },
        (error) => {
          console.error('Error fetching workspaces:', error);
          // Handle error, show error message, etc.
        }
      );
    }
  
    deleteWorkspace(): void {
        const workspaceId = this.tokenService.getWorkspaceId();
        console.log('Workspace ID:', workspaceId); // Log the workspace ID
        if (workspaceId) {
            this.authService.deleteWorkspace().subscribe(
                (response) => {
                    console.log('Workspace deleted:', response);
                    this.fetchWorkspaces();
                },
                (error) => {
                    console.error('Error deleting workspace:', error);
                    // Handle error (e.g., display error message)
                }
            );
        } else {
            console.error('Workspace ID is missing.'); // Log an error if workspace ID is missing
        }
    }
    
      
  }