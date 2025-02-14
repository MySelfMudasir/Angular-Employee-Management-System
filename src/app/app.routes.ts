import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

import { LayoutService } from './layout/service/app.layout.service';
import { ButtonDemoComponent } from './demo/components/uikit/button/buttondemo.component';
import { ChartsDemoComponent } from './demo/components/uikit/charts/chartsdemo.component';
import { FileDemoComponent } from './demo/components/uikit/file/filedemo.component';
import { FormLayoutDemoComponent } from './demo/components/uikit/formlayout/formlayoutdemo.component';
import { InputDemoComponent } from './demo/components/uikit/input/inputdemo.component';
import { ListDemoComponent } from './demo/components/uikit/list/listdemo.component';
import { MediaDemoComponent } from './demo/components/uikit/media/mediademo.component';
import { MessagesDemoComponent } from './demo/components/uikit/messages/messagesdemo.component';
import { MiscDemoComponent } from './demo/components/uikit/misc/miscdemo.component';
import { PanelsDemoComponent } from './demo/components/uikit/panels/panelsdemo.component';
import { TimelineDemoComponent } from './demo/components/pages/timeline/timelinedemo.component';
import { TableDemoComponent } from './demo/components/uikit/table/tabledemo.component';
import { OverlaysDemoComponent } from './demo/components/uikit/overlays/overlaysdemo.component';
import { TreeDemoComponent } from './demo/components/uikit/tree/treedemo.component';
import { LandingComponent } from './demo/components/landing/landing.component';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import { DocumentationComponent } from './demo/components/documentation/documentation.component';
import { CrudComponent } from './demo/components/pages/crud/crud.component';
import { EmptyDemoComponent } from './demo/components/pages/empty/emptydemo.component';
import { AccessComponent } from './demo/components/auth/access/access.component';
import { ErrorComponent } from './demo/components/auth/error/error.component';
import { LoginComponent } from './demo/components/auth/login/login.component';
import { FloatLabelDemoComponent } from './demo/components/uikit/floatlabel/floatlabeldemo.component';
import { InvalidStateDemoComponent } from './demo/components/uikit/invalid/invalidstatedemo.component';
import { MenusComponent } from './demo/components/uikit/menus/menus.component';
import { PersonalComponent } from './demo/components/uikit/menus/personal.component';
import { ConfirmationComponent } from './demo/components/uikit/menus/confirmation.component';
import { SeatComponent } from './demo/components/uikit/menus/seat.component';
import { PaymentComponent } from './demo/components/uikit/menus/payment.component';
import { BlocksComponent } from './demo/components/primeblocks/blocks/blocks.component';
import { IconsComponent } from './demo/components/utilities/icons/icons.component';
import { FingerprintLoginComponent } from './demo/components/auth/fingerprint/fingerprint.component';
import { RegisterComponent } from './demo/components/auth/register/register.component';
import { AddEmployeeComponent } from './demo/components/pages/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './demo/components/pages/view-employee/view-employee.component';
import { EditEmployeeComponent } from './demo/components/pages/edit-employee/edit-employee.component';
import { EmployeeAttendenceComponent } from './demo/components/pages/employee-attendence/employee-attendence.component';


// Consolidated routes
const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'formlayout', component: FormLayoutDemoComponent },
            { path: 'input', component: InputDemoComponent },
            { path: 'floatlabel', component: FloatLabelDemoComponent },
            { path: 'invalidstate', component: InvalidStateDemoComponent },
            { path: 'button', component: ButtonDemoComponent },
            { path: 'table', component: TableDemoComponent },
            { path: 'list', component: ListDemoComponent },
            { path: 'tree', component: TreeDemoComponent },
            { path: 'panel', component: PanelsDemoComponent },
            { path: 'overlay', component: OverlaysDemoComponent },
            { path: 'media', component: MediaDemoComponent },

            { path: 'menu', component: MenusComponent, children: [
                { path: 'personal', component: PersonalComponent },
                { path: 'confirmation', component: ConfirmationComponent },
                { path: 'seat', component: SeatComponent },
                { path: 'payment', component: PaymentComponent }
            ]},
            
            { path: 'message', component: MessagesDemoComponent },
            { path: 'file', component: FileDemoComponent },
            { path: 'charts', component: ChartsDemoComponent },
            { path: 'misc', component: MiscDemoComponent },
            { path: 'blocks', component: BlocksComponent },
            { path: 'icons', component: IconsComponent },
            { path: 'crud', component: CrudComponent },
            { path: 'timeline', component: TimelineDemoComponent },
            { path: 'empty', component: EmptyDemoComponent },
            { path: 'add-employee', component: AddEmployeeComponent},
            { path: 'view-employee', component: ViewEmployeeComponent},
            { path: 'edit-employee/:id', component: EditEmployeeComponent},
            { path: 'employee-attendence', component: EmployeeAttendenceComponent},
            { path: 'documentation', component: DocumentationComponent },
        ]
    },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'fingerprint', component: FingerprintLoginComponent },
    { path: 'error', component: ErrorComponent },
    { path: 'access', component: AccessComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' }
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes, { 
            scrollPositionRestoration: 'enabled', 
            anchorScrolling: 'enabled', 
            onSameUrlNavigation: 'reload' 
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
    constructor(public layoutService: LayoutService) { }
}
