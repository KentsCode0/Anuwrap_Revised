import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Router, RouterModule, ActivatedRoute, Params } from '@angular/router';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';

@Component({
  selector: 'app-deletereport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './deletereport.component.html',
  styleUrl: './deletereport.component.css'
})
export class DeletereportComponent implements OnInit {
  workspaceId: any;
  reportId: any;
  report: any = {};
  constructor(private route: Router, private aRoute: ActivatedRoute, private reportService: ReportService) {
  }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
      this.workspaceId = params["params"]["workspace_id"];
    });

    this.fetchReport();
  }

  goToReports() {
    this.route.navigate(['../../reportlist'], { relativeTo: this.aRoute })
  }

  deleteReport(): void {
    if (this.reportId) {
      this.reportService.deleteReport(this.reportId, this.workspaceId).subscribe(
        (response) => {
          this.route.navigate(["../../reportlist"], { relativeTo: this.aRoute });
        },
        (error) => {
          console.error('Error deleting workspace:', error);
        }
      );
    } else {
      console.error('Workspace ID is missing.');
    }
  }

  fetchReport() {
    this
    this.reportService.getReport(this.reportId, this.workspaceId).subscribe(
      (response) => {
        this.report = response.data.report
      },
      (error) => {
        console.log("This", error);
      }
    )
  }
}
