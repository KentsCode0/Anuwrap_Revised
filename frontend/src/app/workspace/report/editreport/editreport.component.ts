import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../routeservice/auth.service';
import { TokenService } from '../../../auth/token/token.service';
import { relative } from 'path';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-editreport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './editreport.component.html',
  styleUrl: './editreport.component.css'
})
export class EditreportComponent {
  workspaceId: any;
  report = {
    title: "",
    description: "",
    content: "",
    report_type_id: "0",
    workspace_id: ""
  }

  reportId: any;
  reportTypes: any;

  constructor(private authService: AuthService,
    private route: Router,
    private aRoute: ActivatedRoute,
    private tokenService: TokenService,) { }

  ngOnInit(): void {
    if (document !== undefined) {
      initFlowbite();
    }
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchReportTypes();
    this.fetchReport();
  }

  fetchReportTypes(): void {
    this.authService.getReportType().subscribe(
      (response) => {
        this.reportTypes = response.data.report;
        console.log(this.reportTypes);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  editReport() {
    this.report["workspace_id"] = this.workspaceId;
    this.authService.editReport(this.report, this.reportId).subscribe(
      (response) => {
        this.reportTypes = response.data.report;
        console.log("Execute")
        this.route.navigate(["../../report"], { relativeTo: this.aRoute })
      },
      (error) => {
        console.log(error);
      }
    )
  }

  fetchReport() {
    this.authService.getReport(this.reportId).subscribe(
      (response) => {
        this.report.title = response.data.report.title;
        this.report.description = response.data.report.description;
        this.report.content = response.data.report.content;
        this.report.report_type_id = response.data.report.report_type_id;
        console.log(this.report)
      },
      (error) => {
        console.log("This", error);
      }
    )
  }

  goToReports() {
    this.route.navigate(['../../report'], { relativeTo: this.aRoute })
  }
}

