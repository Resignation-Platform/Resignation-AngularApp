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
  isLoggedIn$!: Observable<boolean>;
  @Input() empArray!:IEmployee[];
  constructor(private service :ResignationService) {

  }

  ngOnInit(): void {

   this.isLoggedIn$= this.service.isLoggedIn
  }
  onExpandSidebar(){
    if ( this.isSideBarActivated==true) {

      this.isSideBarActivated=false;
    }
    else{
      this.isSideBarActivated=true;
    }
    console.log(this.isSideBarActivated);
  }

  onLogout(){
    this.service.userLogOut();
  }
}

