import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, FormsModule]
})

export class AppComponent implements OnInit {
  title = 'Anuwrap';

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      initFlowbite();
    } 
  }
}
