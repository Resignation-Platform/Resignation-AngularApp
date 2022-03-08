import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  public employeeDetail!: IEmployee;

  constructor(private resignationService: ResignationService) {}

  ngOnInit(): void {
    this.fetchEmployeeDetails();
  }

  /**
   * Fetch employee details
   */
  fetchEmployeeDetails(): void {
    this.resignationService
      .fetchEmployeeDetails()
      .subscribe((employeeDetail) => {
        this.employeeDetail = employeeDetail;
      });
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
}
