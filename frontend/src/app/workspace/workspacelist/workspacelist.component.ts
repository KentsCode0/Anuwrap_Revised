import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-workspacelist',
    standalone: true,
    templateUrl: './workspacelist.component.html',
    styleUrl: './workspacelist.component.css',
    imports: [RouterModule, NavbarComponent, CommonModule, FormsModule]
})
export class WorkspacelistComponent implements OnInit {
    workspaces: any[] = [];
    workspaceId = ''

    constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

    ngOnInit(): void {
        // Fetch workspaces when component initializes
        this.fetchWorkspaces();
    }

    navigateToCreateWorkspace() {
        this.router.navigate(['/createworkspace']);
      }

      navigateToReport(workspaceId: string) {
        console.log(workspaceId)
        this.router.navigate(['/report', workspaceId]);
    }

      fetchWorkspaces() {
        const userId = this.tokenService.getUserId() || ''; // Provide default value
        if (userId) {
          this.authService.getWorkspaces(userId).subscribe(
            (response) => {
              // Update workspaces array with the fetched data
              this.workspaces = response.data.workspace.map((workspace: any) => ({
                workspace_id: String(workspace.workspace_id),
                name: workspace.name,
              }));
              console.log('Fetched workspaces:', response.data);
              
              // Check if the response contains workspace_id
              if (response.data.workspace_id) {
                // Navigate to the report page with the retrieved workspace_id
                this.router.navigate(['/report', response.data.workspace_id]);
              }
            },
            (error) => {
              console.error('Error fetching workspaces:', error);
            }
          );
        } else {
          console.error('User ID is missing.'); 
        }
      }


    deleteWorkspace(workspaceId: any): void {
        console.log(workspaceId)
        if (workspaceId) {
            console.log('Deleting workspace:', workspaceId); 
            this.authService.deleteWorkspace(workspaceId).subscribe(
                (response) => {
                    console.log('Workspace deleted:', response);
                    // Fetch updated workspaces after deletion
                    this.fetchWorkspaces();
                },
                (error) => {
                    console.error('Error deleting workspace:', error);
                }
            );
        } else {
            console.error('Workspace ID is missing.'); 
        }
    }
}