import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  model: any = {};


  employeeDetails_list: IEmployee[] = [

  ];
  constructor(private service: ResignationService, private route: Router) {}




  onSubmit() {
    let employee_Name = this.model.emailid;
    console.log(employee_Name);
    this.fetchEmployeeDetails(employee_Name);
  }

  fetchEmployeeDetails(empName: string) {
     this.service.fetchEmployeeDetails(empName)
    .subscribe(
      {
        next:(data) =>
        {
          this.employeeDetails_list.push(data);
          let details = {
            empNumber: data.employeeNumber,
            empName: data.email,
            empRole:data.role.toUpperCase()
          };
          localStorage.removeItem('Employee_Details');
          localStorage.setItem('Employee_Details', JSON.stringify(details));
          this.route.navigateByUrl('/dashboard');
          this.service.UserLogin(data.email,data.employeeNumber);
       },
       error:(err)=>{
        this.route.navigateByUrl('/login');
       }

    });

  }


}
