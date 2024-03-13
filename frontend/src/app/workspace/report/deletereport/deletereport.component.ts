import { Component } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
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

  constructor(private router: Router, private route: ActivatedRoute){}

  goToReports() {
    this.router.navigate(['../report'], { relativeTo: this.route })
  }
}
