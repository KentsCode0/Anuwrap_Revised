import { Component } from '@angular/core';
import { NavigationComponent } from "../navigation/navigation.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-collage',
    standalone: true,
    templateUrl: './collage.component.html',
    styleUrl: './collage.component.css',
    imports: [NavigationComponent, RouterModule]
})
export class CollageComponent {

}
