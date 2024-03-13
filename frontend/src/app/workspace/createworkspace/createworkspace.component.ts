  import { Component, OnInit } from '@angular/core';
  import { Router, RouterModule } from '@angular/router';
  import { AuthService } from '../../auth/auth.service';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-createworkspace',
    standalone: true,
    imports: [RouterModule, CommonModule, FormsModule],
    templateUrl: './createworkspace.component.html',
    styleUrl: './createworkspace.component.css'
  })

export class CreateworkspaceComponent implements OnInit {
  workspaceName: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // You can initialize any data or logic here if needed
  }

  createWorkspace() {
    const workspaceData = {
      name: this.workspaceName
    };

    this.authService.createWorkspace(workspaceData).subscribe(
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
}