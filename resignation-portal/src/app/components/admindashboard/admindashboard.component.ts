import { Component, OnInit } from '@angular/core';

import { AdminDetails } from 'src/app/models/AdminDetails';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css'],
})
export class AdmindashboardComponent implements OnInit {
  AdminDetails_List: AdminDetails[] = [];

  UserRole!:string;
  constructor(private service: ResignationService) {}

  ngOnInit(): void {
    let LocalStorage_values = JSON.parse(
      localStorage.getItem('Employee_Details') || ''
    );
    this.UserRole=LocalStorage_values.empRole;

    this.fetchAdminDetails(
      LocalStorage_values.empNumber,
      LocalStorage_values.empRole
    );
  }

  fetchAdminDetails(AdminEmployeeNo: string, adminRole: string) {
    this.service.fetchDetailsForAdmins(AdminEmployeeNo, adminRole).subscribe({
      next: (details) => this.AdminDetails_List.push(details),
      error: (e) => console.error(e),
      complete: () => console.log('complete'),
    });
  }

  onUpdateRequest(ExitEmpno: string) {
    this.service.updateAdminAcceptance(ExitEmpno, this.UserRole).subscribe({
      // show the popup message
      next: (msg: any) => console.log(msg),
      error: (err: any) => console.log(err),
    });
  }
}
