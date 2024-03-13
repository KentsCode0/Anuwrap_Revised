import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { CommonModule, NgFor } from '@angular/common';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css',
  imports: [RouterModule, NavbarComponent, CommonModule]
})
export class WorkspacelistComponent implements OnInit {
  workspaces: any[] = []; // Assuming your workspace data is stored in this array

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.fetchWorkspaces();
    // Fetch workspaces when component initializes
    if (typeof document !== 'undefined') {
      initFlowbite();
    }
  }

  fetchWorkspaces() {
    // Call authService to get the list of workspaces
    this.authService.getWorkspaces().subscribe(
      (response) => {
        // Update workspaces array with the fetched data
        this.workspaces = response.data.workspace;
      },
      (error) => {
        if (!error.error) return
        if (error.error['message'] == "workspaces not found") {
          this.workspaces = []
        } else {
          console.error('Error fetching workspaces:', error);
        }
      }
    );
  }

  navigateToCreateWorkspace() {
    this.route.navigate([`/createworkspace`]);
  }

  openWorkspace(workspaceId: any): void {
    console.log("open workspace id: ", workspaceId)
    this.route.navigate([`/report/${workspaceId}`]);
  }

  editWorkspace(workspaceId: any): void {
    this.route.navigate([`/editworkspace/${workspaceId}`]);
  }

  deleteWorkspace(workspaceId: any): void {
    console.log(workspaceId)
    this.route.navigate([`/deleteworkspace/${workspaceId}`]);
  }

}