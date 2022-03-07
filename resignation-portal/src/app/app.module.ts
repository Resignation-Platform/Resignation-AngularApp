import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExittrackingComponent } from '../app/components/exittracking/exittracking.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
<<<<<<< HEAD
import { SidebarComponent } from './components/sidebar/sidebar.component';
=======
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
>>>>>>> 1f77be745ce6d05e411179f93c20b83d24538ab1

@NgModule({
  declarations: [
    AppComponent,
    ExittrackingComponent,
    AdmindashboardComponent,
<<<<<<< HEAD
    SidebarComponent
=======
    DashBoardComponent,
    RegistrationFormComponent
>>>>>>> 1f77be745ce6d05e411179f93c20b83d24538ab1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
