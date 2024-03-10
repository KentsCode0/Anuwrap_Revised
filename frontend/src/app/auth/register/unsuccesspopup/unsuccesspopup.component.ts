import { Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './unsuccesspopup.component.html',
  styleUrls: ['./unsuccesspopup.component.css'],
  imports: [ RouterModule]
})
export class UnsuccesspopupComponent {

   constructor(public dialogRef: MatDialogRef<UnsuccesspopupComponent>, private router: Router) { }

  closePopupLoop(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/register');
  }
}