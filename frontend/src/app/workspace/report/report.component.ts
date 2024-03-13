import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
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
  reportName: any;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["id"];
    });
    this.fetchReports(this.workspaceId);
  }

  fetchReportTypes(): void {
   
  }

  fetchReports(workspaceId: any): any {
    // Call authService to get the list of workspaces
    this.authService.getWorkspace(workspaceId).subscribe(
      (response) => {
        // Update workspaces array with the fetched data
        this.reportName = response.data.workspace.name;
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

  navigateToCreateReport(workspaceId: string) {
    console.log(workspaceId);
    this.router.navigate(['/createreport']);
  }

  navigateToEditReport(workspaceId: string) {
    this.router.navigate(['/editreport']);
  }

  navigateToDeleteReport(workspaceId: string) {
    this.router.navigate(['/deletereport']);
  }

  deleteReport(reportId: any): void {
    console.log(reportId);
    if (reportId) {
      console.log('Deleting report:', reportId);
      this.authService.deleteWorkspace(reportId).subscribe(
        (response) => {
          console.log('report deleted:', response);
          // Fetch updated reports after deletion
          this.fetchReports(this.workspaceId);
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