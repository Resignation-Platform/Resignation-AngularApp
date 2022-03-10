import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';

import { LoginComponent } from './login.component';
import {EmployeeMockData} from '../../mockData/employeeData';
import { IEmployee } from 'src/app/model/employee';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service :ResignationService;
  let injector :Injector;
  let employee_Mockdata:EmployeeMockData;
  const details = {
    empNumber: '756743',
    empName: 'userName',
    empRole: 'developer',
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule,FormsModule],
      declarations: [ LoginComponent ],
      providers:[ResignationService,EmployeeMockData],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    injector=fixture.debugElement.injector;
    service=injector.get(ResignationService);
    employee_Mockdata=injector.get(EmployeeMockData);
    component.model={emailid:'userName'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the onSubmit() when the submit button is clicked',()=>{

      let spyFetchEmployee=spyOn(component,'fetchEmployeeDetails');

      component.onSubmit();

      expect(spyFetchEmployee).toHaveBeenCalled();
  });

  it('should make a service call to fetchEmployeeDetails()',()=>{
    let spyServiceFetchEmployee=spyOn(service,'fetchEmployeeDetails').and.returnValue(of(employee_Mockdata.employeeDetails));
    let spyUserLogin=spyOn(service,'UserLogin');

    component.fetchEmployeeDetails('userName');

    let LocalStorage_values = JSON.parse(
      localStorage.getItem('Employee_Details') || ''
    );
    expect(LocalStorage_values.empName).toEqual('test');
    expect(spyServiceFetchEmployee).toHaveBeenCalled();
    expect(component.employeeDetails_list).toEqual([employee_Mockdata.employeeDetails])
    expect(spyUserLogin).toHaveBeenCalled()
  });





});
