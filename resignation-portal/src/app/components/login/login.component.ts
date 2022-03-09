import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnChanges {

  model: any = {};
  employeeDetails_list: IEmployee[] = [

  ];
  constructor(private service: ResignationService, private route: Router) {}
  ngOnChanges(changes: SimpleChanges): void {

    this.onLogout();
  }
  ngOnInit(): void {
  }
  onLogout(){

    this.employeeDetails_list=[];
  }
  checkEmployeeList(){
    console.log('calling array length')
    return this.employeeDetails_list.length>0
  }

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
          this.service.UserLogin(data.email,data.employeeNumber);
       },
       error:(err)=>{
        this.route.navigateByUrl('/login');
       }

    });

  }


}
