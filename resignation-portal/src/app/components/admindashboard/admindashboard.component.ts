import { Component, OnInit } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { IAdminDetails } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  public approvalDetail: IAdminDetails[] = [];
  public gridView!: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  UserRole!: string;
  constructor(private service: ResignationService) {}

  ngOnInit(): void {
    let LocalStorage_values = JSON.parse(
      localStorage.getItem('Employee_Details') || ''
    );
    this.UserRole = LocalStorage_values.empRole;
    this.fetchAdminDetails(
      LocalStorage_values.empNumber,
      LocalStorage_values.empRole
    );
  }

  fetchAdminDetails(AdminEmployeeNo: string, adminRole: string): void {
    this.service
      .fetchDetailsForAdmins(AdminEmployeeNo, adminRole)
      .subscribe((approvalDetails) => {
        this.approvalDetail = approvalDetails;
        this.setGridData();
      });
  }

  setGridData(): void {
    this.gridView = {
      data: this.approvalDetail.slice(this.skip, this.skip + this.pageSize),
      total: this.approvalDetail.length,
    };
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.setGridData();
  }

  updateExitApproval(data: IAdminDetails): void {
    this.service
      .updateAdminAcceptance(data.employeeNo, this.UserRole)
      .subscribe({
        // show the popup message
        next: (msg: any) => console.log(msg),
        error: (err: any) => console.log(err),
      });
    const index = this.approvalDetail.findIndex(
      (x) => x.employeeNo === data.employeeNo
    );
    this.approvalDetail.splice(0, 1);
    this.setGridData();
  }
}
