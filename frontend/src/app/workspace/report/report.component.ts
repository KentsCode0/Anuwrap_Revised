import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { TokenService } from '../../auth/token/token.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-report',
    standalone: true,
    templateUrl: './report.component.html',
    styleUrl: './report.component.css',
    imports: [RouterModule, NavigationComponent, NavbarComponent, FormsModule, CommonModule, ]
})
export class ReportComponent implements OnInit {
  reports: any[] = [];
  workspaceId = '';
  reportTypes: any[] = [];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workspaceId = params.get('workspaceId')!;
      console.log('Workspace ID:', this.workspaceId);
      this.fetchReportTypes(); // Fetch report types on component initialization
      console.log(this.reportTypes)
    });
  }

  fetchReportTypes(): void {
   
  }

  navigateToCreateReport(workspaceId: string) {
    console.log(workspaceId);
    this.router.navigate(['/createreport', workspaceId]);
  }

  navigateToEditReport(workspaceId: string) {
    this.router.navigate(['/editreport', workspaceId]);
  }

  fetchReports() {
    const userId = this.tokenService.getUserId() || ''; // Provide default valu
  }

  deleteReport(reportId: any): void {
    console.log(reportId);
    if (reportId) {
      console.log('Deleting report:', reportId);
      this.authService.deleteWorkspace(reportId).subscribe(
        (response) => {
          console.log('report deleted:', response);
          // Fetch updated reports after deletion
          this.fetchReports();
        },
        (error) => {
          console.error('Error deleting workspace:', error);
        }
      );
    } else {
      console.error('Workspace ID is missing.');
    }
  }

  openReport() {}
}