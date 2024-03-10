import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { response } from 'express';
import { error } from 'console';

@Component({
    selector: 'app-workspacelist',
    standalone: true,
    templateUrl: './workspacelist.component.html',
    styleUrl: './workspacelist.component.css',
    imports: [RouterModule, NavbarComponent]
})
export class WorkspacelistComponent implements OnInit {

    workspace = {
        workspaceId : "",
        name: "",
        dateModified: "",
        dateCreated: ""
    }
    constructor(private authService: AuthService){}

    ngOnInit(): void {
        const headers = TokenService.headers;
        const id = TokenService.getUserId();

        this.authService.getWorkspace(id, headers).subscribe(
            (response) => {
                this.workspace.workspaceId = response.data.workspace.workspace_id;
                this.workspace.name = response.data.workspace.name;
                this.workspace.dateModified = response.data.workspace.date_modified;
                this.workspace.name = response.data.workspace.date_created;
                console.log('User Workspace:', response.data.workspace.name)

            },
            (error) => {
                console.log('error fetching user workspaces:', error);
            }
        );
    }

}
