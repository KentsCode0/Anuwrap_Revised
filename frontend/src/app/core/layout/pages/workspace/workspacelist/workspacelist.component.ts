import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css',
  imports: [RouterModule, NavigationBarComponent, CommonModule],
  providers: [DatePipe]
})
export class WorkspacelistComponent implements OnInit {
  workspaces: any[] = []; // Assuming your workspace data is stored in this array

  constructor(private workspaceService: WorkspaceService, private route: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchWorkspaces();
    // Fetch workspaces when component initializes

  }

  fetchWorkspaces() {
    // Call authService to get the list of workspaces
    this.workspaceService.getWorkspaces().subscribe(
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
    console.log(`/workspace/${workspaceId}`);
    this.route.navigate([`/workspace/${workspaceId}`]);
  }

  editWorkspace(workspaceId: any): void {
    this.route.navigate([`/editworkspace/${workspaceId}`]);
  }

  deleteWorkspace(workspaceId: any): void {
    console.log(workspaceId)
    this.route.navigate([`/deleteworkspace/${workspaceId}`]);
  }

}