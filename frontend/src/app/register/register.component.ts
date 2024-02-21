import { Component, isStandalone } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router'; 
import { PopupService } from '../popup/popup.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [RouterLink, RouterOutlet],
})

export class RegisterComponent {  

  constructor(private popupService: PopupService) { }

  createAccount() {
    // Simulated account creation logic
    console.log('createAccount() method called');
    let accountCreatedSuccessfully = this.simulateAccountCreation();

    if (accountCreatedSuccessfully) {
      // If account creation is successful, open the popup
      this.popupService.openPopup();
    } else {
      // Handle account creation failure
      console.error('Account creation failed.');
    }
  }

  private simulateAccountCreation(): boolean {
    return true; // Simulated success
  }
}
