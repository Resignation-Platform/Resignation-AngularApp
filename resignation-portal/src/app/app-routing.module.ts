import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ExittrackingComponent } from './components/exittracking/exittracking.component';

const routes: Routes = [
  {path:'dashboard',component:DashBoardComponent},
  {path:'exit-tracking',component:ExittrackingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
