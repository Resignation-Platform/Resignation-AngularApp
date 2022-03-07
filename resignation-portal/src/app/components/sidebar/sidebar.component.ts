import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isSideBarActivated:boolean=true;
  constructor() { }

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
