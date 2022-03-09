import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IEmployee, IEmployeeExitDetails } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  public employeeDetail!: IEmployee;
  public emp_Name!: string;
  public empNumber!: string;
  employeeExitDetails!: IEmployeeExitDetails;

  constructor(
    private resignationService: ResignationService,
    private route: Router
  ) {}

  ngOnInit(): void {
    let LocalStorage_values = JSON.parse(
      localStorage.getItem('Employee_Details') || ''
    );
    this.emp_Name = LocalStorage_values.empName;
    this.empNumber = LocalStorage_values.empNumber;
    this.fetchEmployeeDetails();
  }

  /**
   * Fetch employee details
   */
  fetchEmployeeDetails(): void {

    this.resignationService.fetchEmployeeDetails(this.emp_Name).subscribe({
      next: data=>{
        this.employeeDetail=data;
        this.resignationService.fetchEmployeeExitProgress(this.empNumber).subscribe({
          next:(details)=>{
            this.employeeExitDetails=details;
          }
        })
      }
    })

  }

  /**
   * Check approval role
   */
  checkApprovalRole(): boolean {
    return (
      this.employeeDetail.role === 'HR' ||
      this.employeeDetail.role === 'program manager' ||
      this.employeeDetail.role === 'delivery leader'
    );
  }

  initiateNavigation(param: string): void {
    const url = `/${param}`;
    this.route.navigate([url]);
  }
}
