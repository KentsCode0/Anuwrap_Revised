import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../../navigation/navigation.component';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [RouterModule, NavigationComponent],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.css'
})
export class EditprofileComponent {

}
