import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { PopupService } from './popup.service';

@Component({
  selector: 'app-popup',
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  imports: [RouterLink, RouterOutlet],
})
export class PopupComponent {
  constructor(public popupService: PopupService) { }

  openPopup(): void {
    this.popupService.openPopup();
  }
  
}
