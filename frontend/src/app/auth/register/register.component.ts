import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopupComponent } from './successPopup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { UnsuccesspopupComponent } from './unsuccesspopup/unsuccesspopup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationData = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  registerUser() {
    let data = this.http.post('http://localhost/anuwrap/backend/public/api/user', this.registrationData)
      .subscribe(
        (response: any) => {
          console.log(response); // Log response for debugging
          this.openSuccessPopup();
        },
        (error) => {
          console.error(error); // Log error for debugging
          this.openUnsuccessPopup();
        }
      );
  }
  openSuccessPopup(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openUnsuccessPopup(): void {
    const dialogRef = this.dialog.open(UnsuccesspopupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The diaglog was closed');
    })
  }
}
