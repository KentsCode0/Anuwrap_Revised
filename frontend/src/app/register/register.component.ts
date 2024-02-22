import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [RouterLink, RouterOutlet]
})
export class RegisterComponent {  
  constructor(private dialog: MatDialog, private router: Router) {}

  createAccount(event: Event): void {
    console.log('Form submitted!');
    event.preventDefault();
    // Simulated account creation logic
    let accountCreatedSuccessfully = this.simulateAccountCreation();

    if (accountCreatedSuccessfully) {
      // If account creation is successful, open the dialog
      const dialogRef = this.dialog.open(PopupComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // Redirect to /login after closing the dialog
        this.router.navigate(['/login']);
      });
    } else {
      // Handle account creation failure
      console.error('Account creation failed.');
    }
  }

  private simulateAccountCreation(): boolean {
    console.log('hello');
    return true; // Simulated success
  }
}