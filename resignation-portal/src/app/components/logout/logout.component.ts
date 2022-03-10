import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service:ResignationService,private router:Router) { }

  ngOnInit(): void {


  }

}
