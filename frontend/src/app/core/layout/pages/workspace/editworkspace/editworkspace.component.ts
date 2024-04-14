import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-editworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './editworkspace.component.html',
  styleUrl: './editworkspace.component.css'
})
export class EditworkspaceComponent {
  workspaceName: string = '';
  workspaceId: any;

  constructor(private workspaceService: WorkspaceService, private router: Router, private aRoute: ActivatedRoute) {
    this.workspaceId = ""
    this.workspaceName = ""
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchWorkspace(this.workspaceId);
    console.log(response)
  }

  editWorkspace() {
    const workspaceData = {
      name: this.workspaceName
    };

    this.workspaceService.editWorkspace(workspaceData, this.workspaceId).subscribe(
      (response) => {
        if (response.data) {
          console.log("created")
        } else {
          console.warn('No workspace data found in the response.');
        }
        this.router.navigate(['../workspacelist'])
      },
      (error) => {
        console.error('Error updating workspace:', error);
      }
    );

  }

  fetchWorkspace(workspaceId: any): any {
    // Call authService to get the list of workspaces
    this.workspaceService.getWorkspace(workspaceId).subscribe(
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
