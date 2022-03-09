import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ExittrackingComponent } from './components/exittracking/exittracking.component';
import { HelpComponent } from './components/help/help.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';

import { ResignationFormComponent } from './components/resignation-form/resignation-form.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'exit-tracking',component:ExittrackingComponent},
  {path:'seperation',component:ResignationFormComponent},
  {path:'logout',component:LogoutComponent},
  {path:'admin', component:AdmindashboardComponent},
  {path:'help',component:HelpComponent},
  { path: '**', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
