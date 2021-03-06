import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExittrackingComponent } from '../app/components/exittracking/exittracking.component';
import { FormsModule } from '@angular/forms';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { ResignationFormComponent } from './components/resignation-form/resignation-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { LogoutComponent } from './components/logout/logout.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    ExittrackingComponent,
    AdmindashboardComponent,
    SidebarComponent,
    DashBoardComponent,
    ResignationFormComponent,
    LoginComponent,
    HeaderComponent,
    LogoutComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    BrowserAnimationsModule,
    GridModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
