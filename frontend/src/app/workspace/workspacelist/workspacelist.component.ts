import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth/auth.service';

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

    }

}
