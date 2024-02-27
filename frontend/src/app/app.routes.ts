import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PopupComponent } from './popup/popup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkspacelistComponent } from './workspacelist/workspacelist.component';
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

];
