import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PopupComponent } from './auth/popup/popup.component';
import { DashboardComponent } from './workspace/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { WorkspaceComponent } from './workspace/workspace/workspace.component';
import { WorkspacelistComponent } from './workspace/workspacelist/workspacelist.component';
import { CreateworkspaceComponent } from './workspace/createworkspace/createworkspace.component';
import { LayoutComponent } from './layout/layout.component';
export const routes: Routes = [
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
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'profile',
                component: ProfileComponent
            }, 
            {
                path: 'workspace',
                component: WorkspaceComponent
            }
        ]
    }
    

];
