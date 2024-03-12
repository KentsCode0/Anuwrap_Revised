import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TokenService } from '../../../auth/token/token.service';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrls: ['./createreport.component.css'],
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent implements OnInit {
  reportTitle: string = '';
  description: string = '';
  workspaceId: string = '';
  userId: string = '';
  reportId: string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // If workspaceId is bound in HTML template, it will be updated directly from there
    this.userId = ''; // Assuming userId is obtained from somewhere else or not needed for report creation
  }

  createReport() {
    const reportData = {
      title: this.reportTitle,
      description: this.description,
      workspace_id: this.workspaceId,
      user_id: this.userId
    };

    this.authService.createReport(reportData).subscribe(
      (response) => {
        console.log('Report created:', response);
        if (response.success) {
          this.router.navigate(['../workspacelist']);
        } else {
          console.warn('Error creating report:', response);
        }
      },
      (error) => {
        console.error('Error creating report:', error);
      }
    );
  }
}