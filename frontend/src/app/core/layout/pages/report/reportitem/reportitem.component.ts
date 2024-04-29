import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { ReportService } from '../../../../../shared/services/report.service';
import { NavigationBarComponent } from '../../../../../shared/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-reportitem',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './reportitem.component.html',
  styleUrl: './reportitem.component.css'
})
export class ReportitemComponent implements OnInit {
  workspaceId: any;
  reportId: any;
  report: any = {

  }

  constructor(
    private reportService: ReportService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      this.workspaceId = params["params"]["workspace_id"];
    });
    this.fetchReport();
  }

  fetchReport() {
    this.reportService.getReport(this.reportId, this.workspaceId).subscribe(
      (response) => {
        this.report = response.data.report
        console.log(this.report)
      },
      (error) => {
        console.log("This", error);
      }
    )
  }
}
