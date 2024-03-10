import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
    selector: 'app-editprofile',
    standalone: true,
    templateUrl: './editprofile.component.html',
    styleUrl: './editprofile.component.css',
    imports: [RouterModule, NavbarComponent]
})
export class EditprofileComponent {

}
