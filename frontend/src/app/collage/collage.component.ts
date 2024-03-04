import { Component } from '@angular/core';
import { NavigationComponent } from "../workspace/navigation/navigation.component";

@Component({
    selector: 'app-collage',
    standalone: true,
    templateUrl: './collage.component.html',
    styleUrl: './collage.component.css',
    imports: [NavigationComponent]
})
export class CollageComponent {

}
