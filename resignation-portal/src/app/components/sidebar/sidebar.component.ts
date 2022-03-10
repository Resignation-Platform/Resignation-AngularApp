import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IEmployee } from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSideBarActivated:boolean=false;
  isAdmin:boolean=false;
  isLoggedIn$!: Observable<boolean>;
  @Input() empArray!:IEmployee[];
  constructor(private service :ResignationService) {

  }


  ngOnInit(): void {

   this.isLoggedIn$= this.service.isLoggedIn;
   let LocalStorage_values = JSON.parse(
    localStorage.getItem('Employee_Details') || ''
  );
    this.confirmIsAdmin(LocalStorage_values.empRole)
  }


  confirmIsAdmin(role:string){
    if (role?.toUpperCase()==='HR'|| role?.toUpperCase()==='PM'|| role?.toUpperCase()==='DH') {
        this.isAdmin=true;
    }
    else{
      this.isAdmin=false;
    }
  }

  onExpandSidebar(){
    if (this.isSideBarActivated) {

      this.isSideBarActivated=false;
    }
    else{
      this.isSideBarActivated=true;
    }

  }

  onLogout(){
    this.service.userLogOut();
  }
}

