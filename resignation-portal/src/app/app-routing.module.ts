import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ExittrackingComponent } from './components/exittracking/exittracking.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'dashboard',component:DashBoardComponent},
  {path:'exit-tracking',component:ExittrackingComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
