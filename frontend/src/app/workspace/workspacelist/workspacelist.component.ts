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
    workspaces: any[] = [];

    constructor(private authService: AuthService, private tokenService: TokenService) { }

    ngOnInit(): void {
        // Fetch workspaces when component initializes
        this.fetchWorkspaces();
    }

    fetchWorkspaces() {
        const userId = this.tokenService.getUserId(); 
        if (userId) {
            this.authService.getWorkspaces(userId).subscribe(
                (response) => {
                    // Update workspaces array with the fetched data
                    this.workspaces = response.data.workspace.map((workspace: any) => ({
                        workspace_id: String(workspace.workspace_id),
                        name: workspace.name,
                      }));
                    console.log('Fetched workspaces:', response.data);
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