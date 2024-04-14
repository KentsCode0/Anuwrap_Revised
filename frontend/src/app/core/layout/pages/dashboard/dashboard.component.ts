import { Component } from '@angular/core';
import { NavigationComponent } from "../../../../shared/navigation/navigation.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [NavigationComponent]
})
export class DashboardComponent {

}
