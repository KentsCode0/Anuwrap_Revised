import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrl: './createreport.component.css',
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent {
  

  constructor(private router: Router) {}

  createReport() {
    this.router.navigate(['../report'])
  }
}
