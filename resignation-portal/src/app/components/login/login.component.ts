import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  employeeDetails_list: IEmployee[] = [

  ];
  constructor(private service: ResignationService, private route: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    let employee_Name = this.model.emailid;
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
            empName: data.email.split('@')[0],
            empRole:data.role
          };
          localStorage.removeItem('Employee_Details');
          localStorage.setItem('Employee_Details', JSON.stringify(details));
          this.route.navigateByUrl('/dashboard');
       },
       error:(err)=>{
        this.route.navigateByUrl('/login');
       }

    });

  }
  fetchExitEmployeeDetails() {}

}
