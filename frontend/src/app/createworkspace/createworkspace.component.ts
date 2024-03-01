import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-createworkspace',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './createworkspace.component.html',
  styleUrl: './createworkspace.component.css'
})
export class CreateworkspaceComponent {

}
