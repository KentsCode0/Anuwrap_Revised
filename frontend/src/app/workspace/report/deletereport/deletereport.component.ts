import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-deletereport',
  standalone: true,
  imports: [RouterModule, NavigationComponent, CommonModule, FormsModule],
  templateUrl: './deletereport.component.html',
  styleUrl: './deletereport.component.css'
})
export class DeletereportComponent {
  reportName: any;
  reportId: any;

  constructor(private router: Router, private route: ActivatedRoute){}
  goToReports(reportId: string) {
    this.router.navigate(['/report', reportId],{relativeTo: this.route})
  }
}
