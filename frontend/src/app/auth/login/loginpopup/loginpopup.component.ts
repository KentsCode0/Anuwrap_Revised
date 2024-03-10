import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-loginpopup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './loginpopup.component.html',
  styleUrl: './loginpopup.component.css'
})

export class LoginpopupComponent {

  constructor(public dialogRef: MatDialogRef<LoginpopupComponent>, private router: Router) { }

  closeErrorPopup(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
}

