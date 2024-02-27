import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-workspacelist',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './workspacelist.component.html',
  styleUrl: './workspacelist.component.css'
})
export class WorkspacelistComponent {

}
