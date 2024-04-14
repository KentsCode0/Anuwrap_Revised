import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { NavigationComponent } from '../../../../../shared/navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../../../../../shared/services/report.service';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrls: ['./createreport.component.css'],
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent implements OnInit {
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

    constructor(
        private reportService: ReportService,
        private route: Router,
        private aRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        if (document !== undefined) {
            initFlowbite();
        }
        this.aRoute.paramMap.subscribe((params: Params) => {
            this.reportId = params["params"]["report_id"];
            this.workspaceId = params["params"]["workspace_id"];
        });
        this.fetchReportTypes();
    }

    fetchReportTypes(): void {
        this.reportService.getReportType().subscribe(
            (response) => {
                this.reportTypes = response.data.report;
                console.log(this.reportTypes);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    createReport() {
        this.report["workspace_id"] = this.workspaceId;
        console.log(this.report);
        this.reportService.createReport(this.report).subscribe(
            (response) => {
                this.reportTypes = response.data.report;
                this.route.navigate(["../report"], { relativeTo: this.aRoute })
            },
            (error) => {
                console.log(error);
            }
        )
    }



    goToReports() {
        this.route.navigate(['../report'], { relativeTo: this.aRoute })
    }
}