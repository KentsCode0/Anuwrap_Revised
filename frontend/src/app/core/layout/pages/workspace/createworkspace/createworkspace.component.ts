import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { WorkspaceService } from '../../../../../shared/services/workspace.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../../../../shared/services/token.service';

@Component({
  selector: 'app-createworkspace',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './createworkspace.component.html',
  styleUrl: './createworkspace.component.css'
})

export class CreateworkspaceComponent implements OnInit {
workspaceName: string = '';
workspaceId: any;
roleId: { [key: string]: string } = {
  superAdmin: "1",
  admin: "2",
  user: "3"
};


constructor(private workspaceService: WorkspaceService, private router: Router, private aRoute: ActivatedRoute, private tokenService: TokenService) { }
workspaces: any[] = [];
ngOnInit(): void {
  this.fetchWorkspaces();
}

createWorkspace() {
  const workspaceData = {
    name: this.workspaceName
  };

  this.workspaceService.createWorkspace(workspaceData).subscribe(
    (response) => {
      if (response.data) {
        console.log("created")
        this.workspaceId = response.data['workspace_id'];
        console.log(response.data)
        this.createUserWorkspace(); 
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

createUserWorkspace() {
  const userId = this.tokenService.getUserId();

  const userWorkspaceData = {
    user_id: userId,
    workspace_id: this.workspaceId,
    role_id: this.roleId['superAdmin'] 
  };
  console.log(userWorkspaceData)
  this.workspaceService.createUserWorkspace(userWorkspaceData).subscribe(
    (response) => {
      console.log("User workspace created successfully");
    },
    (error) => {
      console.error('Error creating user workspace:', error);
    }
  );
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

}