import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Params } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/auth.service';
import { TokenService } from '../../../auth/token/token.service';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrls: ['./createreport.component.css'],
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent implements OnInit {
    report = {
        title: "",
        description: "",
        content: "",
        report_type_id: "",
        workspaceId: ""
    }

    reportId: any;
    reportTypes: any;

    constructor(
        private authService: AuthService,
        private route: Router,
        private aRoute: ActivatedRoute,
        private tokenService: TokenService,
    ) { }

    ngOnInit(): void {
        this.aRoute.paramMap.subscribe((params: Params) => {
            this.reportId = params["params"]["report_id"];
        });
        this.fetchReportTypes();
    }

    fetchReportTypes(): void {
        this.authService.getReportType().subscribe(
            (response) => {
                this.reportTypes = response.data;
                console.log(this.reportTypes);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    createReport() {
        const userId = this.tokenService.getUserId();
        console.log(this.report);
    }
}