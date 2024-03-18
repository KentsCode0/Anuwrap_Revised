import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../routeservice/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editworkspace.component.html',
  styleUrl: './editworkspace.component.css'
})
export class EditworkspaceComponent {
  workspaceName: string = '';
  workspaceId: string = '';

  constructor(private authService: AuthService, private router: Router, private aRoute: ActivatedRoute) {
    this.workspaceId = ""
    this.workspaceName = ""
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["id"];
    });
    this.fetchWorkspace(this.workspaceId);
  }

  editWorkspace() {
    const workspaceData = {
      name: this.workspaceName
    };

    this.authService.editWorkspace(workspaceData, this.workspaceId).subscribe(
      (response) => {
        if (response.data) {
          console.log("created")
        } else {
          console.warn('No workspace data found in the response.');
        }
        this.router.navigate(['../workspacelist'])
      },
      (error) => {
        console.error('Error creating workspace:', error);
      }
    );

  }

  fetchWorkspace(workspaceId: any): any {
    // Call authService to get the list of workspaces
    this.authService.getWorkspace(workspaceId).subscribe(
      (response) => {
        // Update workspaces array with the fetched data
        this.workspaceName = response.data.workspace.name;
        console.log("fetched")
      },
      (error) => {
        if (!error.error) return
        if (error.error['message'] == "workspaces not found") {
          console.error("Workspace not found")
        } else {
          console.error('Error fetching workspaces:', error);
        }
      }
    );
  }
}
