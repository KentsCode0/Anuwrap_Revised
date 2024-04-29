import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { response } from 'express';

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
  reportTypes: any[] = [];

  constructor(
    private reportService: ReportService,
    private route: Router,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.workspaceId = params["params"]["workspace_id"];
      this.fetchReports();
      this.fetchReportTypes();
    });
  }
  fetchReports() {
    this.reportService.getReports(this.workspaceId).subscribe(
      (response) => {
        this.reports = response.data.reports
      },
      (error) => {
        console.log(error);
      }
    )
  }
fetchReportTypes(): void {
    this.reportService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data.report;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getReportTypeName(reportTypeId: number): string {
    const reportType = this.reportTypes.find(type => type.report_type_id === reportTypeId);
    return reportType ? reportType.name : '';
  }

  openReport(reportId: any): void {
    console.log("this")
    this.route.navigate([`../reportitem/${reportId}`], { relativeTo: this.aRoute });
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

  
}