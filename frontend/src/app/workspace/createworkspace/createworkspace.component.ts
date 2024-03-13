  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
  import { AuthService } from '../../auth/auth.service';
  import { TokenService } from '../../auth/token/token.service';
  import { HttpHeaders } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { routes } from '../../app.routes';

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
  
    ngOnInit(): void {}
  
    createWorkspace() {
      const workspaceData = {
        name: this.workspaceName
      };
      this.authService.createWorkspace(workspaceData).subscribe(
        (response) => {
          console.log('Workspace created:', response);
          if (response.success) {
            this.router.navigate(['../workspacelist']);
          } else {
            console.warn('Error creating workspace:', response);
          }
        },
        (error) => {
          console.error('Error creating workspace:', error);
        }
      );
    }
  }