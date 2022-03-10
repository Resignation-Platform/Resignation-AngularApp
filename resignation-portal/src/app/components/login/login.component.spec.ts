import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';

import { LoginComponent } from './login.component';
import {EmployeeMockData} from '../../mockData/employeeData';
import { IEmployee } from 'src/app/model/employee';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service :ResignationService;
  let injector :Injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      declarations: [ LoginComponent ],
      providers:[ResignationService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    injector=fixture.debugElement.injector;
    service=injector.get(ResignationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  //  it('should fetch employee details from webapi', ()=>{
  //    let empData:IEmployee[]=[];
  //   let mock_data={
  //     employeeNumber: '1024',
  //     employeeName: 'veer',
  //     email: 'veer',
  //     role: 'emp',
  //     departmentName: 'engineering',
  //     dateOfJoining: '2022-03-03',
  //     hrName: 'veeranjaneyulu',
  //     programManagerName: 'sarath',
  //     deliveryLeaderName: 'sudhanshu',
  //   }

  //   empData.push(mock_data);
  //   expect(service.fetchEmployeeDetails('veer')).toEqual()
  //  })


});
