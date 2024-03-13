import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
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
  imports: [RouterModule, NavigationComponent, NavbarComponent, FormsModule, CommonModule,]
})
export class ReportComponent implements OnInit {
  reports: any[] = [];
  workspaceId = '';
  reportTypes: any[] = [];

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchReports();
    console.log("Workspace ID: ", this.workspaceId);

  }

  fetchReportTypes(): void {

  }

  navigateToCreateReport() {
    this.router.navigate(['../createreport'], { relativeTo: this.aRoute });
  }

  navigateToEditReport(reportId: any) {
    this.router.navigate([`../editreport/${reportId}`], { relativeTo: this.aRoute });
  }

  navigateToDeleteReport(reportId: any) {
    this.router.navigate([`../deletereport/${reportId}`], { relativeTo: this.aRoute });
  }

  fetchReports() {
    this.authService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report
        console.log(this.reports)
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteReport(reportId: any): void {
    if (reportId) {
      this.authService.deleteWorkspace(reportId).subscribe(
        (response) => {
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

  openReport() { }
}