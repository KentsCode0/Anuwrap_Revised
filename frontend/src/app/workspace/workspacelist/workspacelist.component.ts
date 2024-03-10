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

    workspaces = []; 

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        const headers = TokenService.headers;
        const id = TokenService.getUserId();

        this.authService.getWorkspaces(id, headers).subscribe(
            (response) => {
                this.workspaces = response.data.workspace
                console.log('User Workspace:', response.data.workspace);
            },
            (error) => {
                console.log('Error fetching user workspaces:', error);
            }
        );
    }

    deleteWorkspace() {
        // Implement delete logic
    }

    editWorkspace() {
        // Implement edit logic
    }

    openWorkspace() {
        // Implement open logic
    }
}