import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { PopupComponent } from '../auth/register/successPopup/popup.component';
import { DashboardComponent } from '../workspace/dashboard/dashboard.component';
import { ProfileComponent } from '../workspace/profile/profile/profile.component';
import { WorkspaceComponent } from '../workspace/workspace/workspace.component';
import { WorkspacelistComponent } from '../workspace/workspacelist/workspacelist.component';
import { CreateworkspaceComponent } from '../workspace/createworkspace/createworkspace.component';
import { ReportComponent } from '../workspace/report/report.component';
import { CollageComponent } from '../workspace/collage/collage.component';
import { NavigationComponent } from '../workspace/navigation/navigation.component';
import { LayoutComponent } from '../layout/layout.component';
import { EditprofileComponent } from '../workspace/profile/editprofile/editprofile.component';
import { NavbarComponent } from '../workspace/navbar/navbar.component';
import { CreatereportComponent } from '../workspace/report/createreport/createreport.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'popup',
                component: PopupComponent
            }, 
            {
                path: 'workspacelist',
                component: WorkspacelistComponent
            },
            {
                path: 'createworkspace',
                component: CreateworkspaceComponent
            },
            {
                path: 'navigation',
                component: NavigationComponent
            },
            {
                path: 'navbar',
                component: NavbarComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }, 
            {
                path: 'editprofile',
                component: EditprofileComponent
            },  
            {
                path: 'workspace',
                component: WorkspaceComponent
            },
            {
                path: 'collage',
                component: CollageComponent
            },
            {
                path:'report',
                component: ReportComponent
            },
            {
                path:'createreport',
                component: CreatereportComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
