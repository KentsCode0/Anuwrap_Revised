import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-annualreport',
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  templateUrl: './annualreport.component.html',
  styleUrl: './annualreport.component.css'
})
export class AnnualreportComponent {

}
