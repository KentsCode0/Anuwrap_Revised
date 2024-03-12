import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';
import { AuthService } from '../../../auth/auth.service';
import { TokenService } from '../../../auth/token/token.service';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrl: './createreport.component.css',
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent implements OnInit {
  reportTitle: string = '';
  description: string = '';
  workspaceId: string = '';
  userId: string = '';

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  this.workspaceId = this.tokenService.getWorkspaceId() || '';
  this.userId = this.tokenService.getUserId() || '';
  }

  createReport() {
    const reportData = {
      title: this.reportTitle,
      description: this.description,
      workspace_id: this.workspaceId,
      user_id: this.userId
    };
  
    // Add the required fields to the reportData object
    const workspaceId = this.tokenService.getWorkspaceId();
    const userId = this.tokenService.getUserId();
    if (workspaceId && userId) {
      reportData.workspace_id = workspaceId;
      reportData.user_id = userId;
    } else {
      console.error('Workspace ID or User ID not found.');
      return;
    }
  
    this.authService.createReport(reportData).subscribe(
      (response) => {
        console.log('Report created:', response);
        if (response.success) {
          if (response.data) {
            const reportId = response.data.report_id;
            this.tokenService.storeReportId(reportId);
          } else {
            console.warn('No report data found in the response.');
          }
        }
        this.router.navigate(['../workspacelist']);
      },
      (error) => {
        console.error('Error creating report:', error);
      }
    );
  }
  
  
}  