import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EmployeeMockData } from 'src/app/mockData/employeeData';
import { ResignationService } from 'src/services/resignation.service';

import { ExittrackingComponent } from './exittracking.component';

fdescribe('ExittrackingComponent', () => {
  let component: ExittrackingComponent;
  let fixture: ComponentFixture<ExittrackingComponent>;
  let injector:Injector;
  let employeeMock_data:EmployeeMockData;
  let service:ResignationService;

  const details = {
    empNumber: '756743',
    empName: 'userName',
    empRole: 'developer',
  };

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports:[HttpClientTestingModule,RouterTestingModule],
  //     declarations: [ ExittrackingComponent ],
  //     providers:[ResignationService,EmployeeMockData]
  //   })
  //   .compileComponents();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      declarations: [ ExittrackingComponent ],
      providers:[ResignationService,EmployeeMockData]
    })

    fixture = TestBed.createComponent(ExittrackingComponent);
    component = fixture.componentInstance;
    injector=fixture.debugElement.injector;
    service=injector.get(ResignationService);
    employeeMock_data=injector.get(EmployeeMockData);
    localStorage.setItem('Employee_Details',JSON.stringify(details));
    fixture.detectChanges();
  });

  afterEach(()=>{
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the Employee details values from localstorage',()=>{
    component.ngOnInit()
    expect(component.LocalStorgage).toEqual(details);
  });

  it('fetchEmployeeDetails() function should be called on ngOnInit',()=>{
    let spyFetchEmployeeDetails= spyOn(component,'fetchEmployeeDetails');
    component.ngOnInit();
    expect(spyFetchEmployeeDetails).toHaveBeenCalledWith('userName');
  });
  it('should make a api call to fetchemployeeDetails',()=>{
    let spyFetchEmployeeDetails= spyOn(service,'fetchEmployeeDetails').and.returnValue(of(employeeMock_data.employeeDetails));
    component.fetchEmployeeDetails('userName');
    expect(spyFetchEmployeeDetails).toHaveBeenCalled();
    expect(component.Employee_Details$).toEqual(employeeMock_data.employeeDetails);
  });
  it('should call fetchEmployeeExitProgress() on ngOnInit',()=>{
    let spyFetchExitdetails=spyOn(component,'fetchEmployeeExitProgress');
    component.ngOnInit();
    expect(spyFetchExitdetails).toHaveBeenCalledWith('756743');
  });

  it('should make a api request to fetch the exitprogress details',()=>{
    let spyserviceFetchExitDetails=spyOn(service,'fetchEmployeeExitProgress').and.returnValue(of(employeeMock_data.employeeExitDetails))
    component.fetchEmployeeExitProgress('756743');
    expect(spyserviceFetchExitDetails).toHaveBeenCalled();
    expect(component.Employee_ExitProgress$).toEqual(employeeMock_data.employeeExitDetails)
  })


});
