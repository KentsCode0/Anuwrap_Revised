import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  reportType: string = '';
  reportTitle: string = '';
  description: string = '';
  content: string = '';
  workspaceId: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.workspaceId = this.route.snapshot.params['workspaceId'];
  }

  createReport() {
    // Get user_id from TokenService
    const userId = this.tokenService.getUserId();
    console.log(this.reportType)
    console.log(this.workspaceId)
    console.log(userId)
    console.log(this.reportTitle)
    console.log(this.description)
  
  
    console.log('Workspace ID:', this.workspaceId); // Log the workspaceId
    
    const reportData = {
      reportType: this.reportType,
      title: this.reportTitle,
      description: this.description,
      content: this.content,
      workspace_id: this.workspaceId,
      user_id: userId,
    };
  
    console.log(reportData)
    this.authService.createReport(reportData).subscribe(
      (response) => {
        console.log('Report created:', response);
        if (response.success) {
          const reportId = response.data.report_id;
          this.router.navigate(['../report', reportId]);
        } else {
          console.warn('Error creating report:', response);
          // Handle error message display or any other action
        }
      },
      (error) => {
        console.error('Error creating report:', error);
        // Handle error message display or any other action
      }
    );
  }
}  