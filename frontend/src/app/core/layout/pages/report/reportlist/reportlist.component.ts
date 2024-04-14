import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  templateUrl: './reportlist.component.html',
  styleUrl: './reportlist.component.css',
  imports: [RouterModule, NavigationComponent, FormsModule, CommonModule,]
})
export class ReportlistComponent implements OnInit {
  reports: any[] = [];
  workspaceId = '';

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchReports();
  }

  openReport(reportId: any): void {
    console.log("this")
    this.route.navigate([`../report/${reportId}`], { relativeTo: this.aRoute });
  }

  navigateToCreateReport() {
    this.route.navigate(['../createreport'], { relativeTo: this.aRoute });
  }

  navigateToEditReport(reportId: any) {
    this.route.navigate([`../editreport/${reportId}`], { relativeTo: this.aRoute });
  }

  navigateToDeleteReport(reportId: any) {
    this.route.navigate([`../deletereport/${reportId}`], { relativeTo: this.aRoute });
  }

  fetchReports() {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.report
        console.log(this.reports)
      },
      (error) => {
        console.log(error);
      }
    )
  }
}