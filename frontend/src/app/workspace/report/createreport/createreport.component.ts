import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from 'express';

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrl: './createreport.component.css',
    imports: [RouterModule, NavigationComponent, CommonModule, FormsModule]
})
export class CreatereportComponent {
    // Property to control the visibility of the modal
    openModal: boolean = false;

    // Method to toggle the modal's visibility
    toggleModal() {
        this.openModal = !this.openModal;
    }

    createReport() {
        // Method to handle creating the report
    }
}
