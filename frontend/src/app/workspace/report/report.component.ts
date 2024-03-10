import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [ RouterModule, NavigationComponent],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
