import { Component, OnInit } from '@angular/core';
import { IEmployee, IEmployeeExitDetails, IEmployeeExitProgress } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-exittracking',
  templateUrl: './exittracking.component.html',
  styleUrls: ['./exittracking.component.css']
})
export class ExittrackingComponent implements OnInit {

  constructor(private service:ResignationService) { }
  show=0;
  Employee_Details$!:IEmployee;
  Employee_ExitProgress$!:IEmployeeExitProgress;

  ngOnInit(): void {
    let LocalStorage_values = JSON.parse(
      localStorage.getItem('Employee_Details') || ''
    );

   this.fetchEmployeeDetails(LocalStorage_values.empName);
   this.fetchEmployeeExitProgress(LocalStorage_values.empNumber);

  }

  fetchEmployeeDetails(employeeName:string){
    this.service.fetchEmployeeDetails(employeeName).subscribe(
      data=>this.Employee_Details$=data
    )
  }
   fetchEmployeeExitProgress(empNo:string){
      this.service.fetchEmployeeExitProgress(empNo).subscribe(

        data=>this.Employee_ExitProgress$=(data)
      )
   }

}
