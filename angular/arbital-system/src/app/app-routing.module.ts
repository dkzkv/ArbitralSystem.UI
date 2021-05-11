import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { PmiComponent } from './pages/pmi/pmi.component';
import { PmiDetailComponent } from './pages/pmi/detail/pmiDetail.component';
import { ServerInfoComponent } from './pages/server/server.component';
import { ServerDetailComponent } from './pages/server/detail/serverDetail.component';
import { OrderBookComponent } from './pages/order-book/order-book.component';
import { OrderBookDetailComponent } from './pages/order-book/detail/order-bookDetail.component';

const routes: Routes = [
  {
    path: 'pmi',
    component: PmiComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-book',
    component: OrderBookComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'servers',
    component: ServerInfoComponent,
    canActivate: [AuthGuardService]
  },
  
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),
    DxDataGridModule,
    DxFormModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTextBoxModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent,
     ProfileComponent,
     TasksComponent,
     ServerInfoComponent,
     ServerDetailComponent,
     PmiComponent,
     OrderBookComponent,
     OrderBookDetailComponent,
     PmiDetailComponent]
})
export class AppRoutingModule { }
