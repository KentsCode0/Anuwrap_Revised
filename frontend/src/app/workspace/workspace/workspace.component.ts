import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from "../navigation/navigation.component";

@Component({
    selector: 'app-workspace',
    standalone: true,
    templateUrl: './workspace.component.html',
    styleUrl: './workspace.component.css',
    imports: [RouterModule, NavigationComponent]
})
export class WorkspaceComponent {
}
