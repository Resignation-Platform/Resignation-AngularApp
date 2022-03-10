import { Component } from '@angular/core';
import { IEmployee } from './model/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resignation-portal';
  employee_details:IEmployee[]=[];

}
