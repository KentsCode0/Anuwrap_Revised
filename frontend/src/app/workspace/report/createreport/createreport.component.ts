import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from "../../navigation/navigation.component";

@Component({
    selector: 'app-createreport',
    standalone: true,
    templateUrl: './createreport.component.html',
    styleUrl: './createreport.component.css',
    imports: [RouterModule, NavigationComponent]
})
export class CreatereportComponent {

}
