import { Component, OnInit } from '@angular/core';

import { AdminDetails } from 'src/app/models/AdminDetails';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

AdminDetails_List:AdminDetails[]=[];

  constructor(private service :ResignationService) { }

  ngOnInit(): void {
    this.fetchAdminDetails('');
  }

  fetchAdminDetails( AdminEmployeeNo:string){
    this.service.fetchDetailsForAdmins(AdminEmployeeNo).subscribe(
      {
        next: (details) => this.AdminDetails_List=details,
        error: (e) => console.error(e),
        complete: () => console.log('complete')
      }
    );
  }

  onUpdateRequest(ExitEmpno:string,AdminRole:string){
    this.service.updateAdminAcceptance(ExitEmpno,AdminRole).subscribe(
      (msg:any)=>console.log(msg),
      (err:any)=>console.log(err),
    );
  }

}
