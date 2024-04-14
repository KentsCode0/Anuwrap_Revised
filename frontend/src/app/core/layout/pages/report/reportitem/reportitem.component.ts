import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  reportId: any;
  report: any = {

  }

  constructor(
    private route: Router,
    private reportService: ReportService,
    private aRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe((params: Params) => {
      this.reportId = params["params"]["report_id"];
    });
    this.fetchReport();
  }

  fetchReport() {
    this.reportService.getReport(this.reportId).subscribe(
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
