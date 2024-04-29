import { Routes } from '@angular/router';
import { NotfoundComponent } from './shared/error/notfound/notfound.component';
import { UnauthorizedComponent } from './shared/error/unauthorized/unauthorized.component';
import { LoginComponent } from './core/layout/pages/authentication/login/login.component';
import { ParentComponent } from './core/layout/parent/parent.component';
import { RegisterComponent } from './core/layout/pages/authentication/register/register.component';
import { RegisterSuccessComponent } from './core/layout/pages/authentication/register-success/register-success.component';
import { WorkspacelistComponent } from './core/layout/pages/workspace/workspacelist/workspacelist.component';
import { authenticationGuard } from './shared/guards/authentication.guard';
import { ProfileComponent } from './core/layout/pages/profile/profile/profile.component';
import { EditprofileComponent } from './core/layout/pages/profile/editprofile/editprofile.component';
import { DeleteworkspaceComponent } from './core/layout/pages/workspace/deleteworkspace/deleteworkspace.component';
import { EditworkspaceComponent } from './core/layout/pages/workspace/editworkspace/editworkspace.component';
import { CreateworkspaceComponent } from './core/layout/pages/workspace/createworkspace/createworkspace.component';
import { DashboardComponent } from './core/layout/pages/dashboard/dashboard.component';
import { ReportlistComponent } from './core/layout/pages/report/reportlist/reportlist.component';
import { CreatereportComponent } from './core/layout/pages/report/createreport/createreport.component';
import { ReportitemComponent } from './core/layout/pages/report/reportitem/reportitem.component';
import { EditreportComponent } from './core/layout/pages/report/editreport/editreport.component';
import { DeletereportComponent } from './core/layout/pages/report/deletereport/deletereport.component';
import { CollagelistComponent } from './core/layout/pages/collage/collagelist/collagelist.component';
import { CreatecollageComponent } from './core/layout/pages/collage/createcollage/createcollage.component';
import { EditcollageComponent } from './core/layout/pages/collage/editcollage/editcollage.component';
import { DeletecollageComponent } from './core/layout/pages/collage/deletecollage/deletecollage.component';
import { CollageitemComponent } from './core/layout/pages/collage/collageitem/collageitem.component';
import { AnualreportComponent } from './core/layout/pages/anualreport/anualreport.component';
import { ReportDesignComponent } from './core/layout/pages/report/report-design/report-design.component';

export const routes: Routes = [
        {
            path: '404',
            component: NotfoundComponent
        },
        {
            path: '401',
            component: UnauthorizedComponent
        },
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
            path:'',
            component: ParentComponent,
            children: [
                {
                    path: 'register',
                    component: RegisterComponent
                },
                {
                    path: 'register-success',
                    component: RegisterSuccessComponent
                },
                {
                    path: 'workspacelist',
                    component: WorkspacelistComponent,
                    canActivate: [authenticationGuard]
                },
                {
                path: 'profile',    
                component: ProfileComponent,
                canActivate: [authenticationGuard]
                },
                {
                    path: 'editprofile',
                    component: EditprofileComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'createworkspace',
                    component: CreateworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'deleteworkspace/:workspace_id',
                    component: DeleteworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {   
                    path: 'editworkspace/:workspace_id',
                    component: EditworkspaceComponent,
                    canActivate: [authenticationGuard]
                },
                {
                    path: 'workspace/:workspace_id',
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: DashboardComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'reportlist',
                        component: ReportlistComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createreport',
                        component: CreatereportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'reportitem/:report_id',
                        component: ReportitemComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editreport/:report_id',
                        component: EditreportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletereport/:report_id',
                        component: DeletereportComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'report-design/:report_id',
                        component: ReportDesignComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'collagelist',
                        component: CollagelistComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'createcollage',
                        component: CreatecollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'editcollage/:collage_id',
                        component: EditcollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'deletecollage/:collage_id',
                        component: DeletecollageComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'collageitem/:collage_id',
                        component: CollageitemComponent,
                        canActivate: [authenticationGuard]
                    },
                    {
                        path: 'annualreportlist',
                        component: AnualreportComponent,
                        canActivate: [authenticationGuard]
                    }
                ]
            }
            
            ]
        }
];
