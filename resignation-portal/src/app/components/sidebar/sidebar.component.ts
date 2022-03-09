import { Component, HostListener, Input, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/model/employee';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSideBarActivated:boolean=false;
  @Input() empArray!:IEmployee[];
  constructor() {

  }

  ngOnInit(): void {
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
}
