import { Component } from '@angular/core';
import { IEmployee } from './model/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-Seperation';
  employee_details:IEmployee[]=[];

}
