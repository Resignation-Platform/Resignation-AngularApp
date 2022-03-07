import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import  { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExittrackingComponent } from '../app/components/exittracking/exittracking.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ExittrackingComponent,
    AdmindashboardComponent
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
