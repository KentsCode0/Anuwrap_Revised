import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  imports: [ RouterModule]
})
export class PopupComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    private router: Router 
  ) { }

  ngOnInit(): void { }

  closePopupAndRedirect(): void {
    this.dialogRef.close();
    this.router.navigateByUrl('/login');
  }
}