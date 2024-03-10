import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-createworkspace',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './createworkspace.component.html',
  styleUrl: './createworkspace.component.css'
})
export class CreateworkspaceComponent {

  constructor(private authService: AuthService){}

  createWorkspace(){}
}
