import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { of, throwError } from 'rxjs';
import { EmployeeMockData } from 'src/app/mockData/employeeData';
import { ResignationService } from 'src/services/resignation.service';

import { AdmindashboardComponent } from './admindashboard.component';

describe('AdmindashboardComponent', () => {
  let component: AdmindashboardComponent;
  let fixture: ComponentFixture<AdmindashboardComponent>;
  let injector: Injector;
  let resignationService: ResignationService;
  let employeeData: EmployeeMockData;
  const details = {
    empNumber: '77723',
    empName: 'Test User',
    empRole: 'developer',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [AdmindashboardComponent],
      providers: [ResignationService, EmployeeMockData],
    });
    fixture = TestBed.createComponent(AdmindashboardComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    resignationService = injector.get(ResignationService);
    employeeData = injector.get(EmployeeMockData);
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get value of empName and empNumber from local storage on calling ngOnInit', () => {
    component.ngOnInit();
    expect(component.UserRole).toBe('developer');
  });

  it('should call the fetchAdminDetails with empNumber and empRole on calling ngOnInit', () => {
    const spyFetchEmployeeDetails = spyOn(component, 'fetchAdminDetails');
    component.ngOnInit();
    expect(spyFetchEmployeeDetails).toHaveBeenCalledWith('77723', 'developer');
  });

  it('should call fetchDetailsForAdmins, setGridData and approvalDetails on calling fetchAdminDetails', () => {
    const spyFetchDetailsForAdmins = spyOn(
      resignationService,
      'fetchDetailsForAdmins'
    ).and.returnValue(of(employeeData.approvalDetails));
    const spySetGridData = spyOn(component, 'setGridData');
    component.fetchAdminDetails('77723', 'developer');
    expect(spyFetchDetailsForAdmins).toHaveBeenCalled();
    expect(spySetGridData).toHaveBeenCalled();
    expect(component.approvalDetails).toEqual(employeeData.approvalDetails);
  });

  it('should get the grid view on calling the setGridData', () => {
    component.approvalDetails = employeeData.approvalDetails;
    component.skip = 0;
    component.pageSize = 10;
    component.setGridData();
    expect(component.gridView.total).toBe(1);
    expect(component.gridView.data).toEqual(employeeData.approvalDetails);
  });

  it('should set the value for skip and call setGridData on calling pageChange', () => {
    const pageChangeEvent: PageChangeEvent = {
      skip: 10,
      take: 10,
    };
    const spySetGridData = spyOn(component, 'setGridData');
    component.skip = 0;
    component.pageChange(pageChangeEvent);
    expect(component.skip).toBe(10);
    expect(spySetGridData).toHaveBeenCalled();
  });

  it(`should call updateAdminAcceptance method of resignationService 
  on calling updateExitApproval`, () => {
    const spyUpdateAdminAcceptance = spyOn(
      resignationService,
      'updateAdminAcceptance'
    ).and.returnValue(of('updated'));
    component.updateExitApproval(employeeData.approvalDetails[0]);
    expect(spyUpdateAdminAcceptance).toHaveBeenCalled();
  });

  it(`should call setGridData method and splice approved detail from approvalDetails
  if updateAdminAcceptance is successful on calling updateExitApproval`, () => {
    const spyUpdateAdminAcceptance = spyOn(
      resignationService,
      'updateAdminAcceptance'
    ).and.returnValue(of('updated'));
    const spySetGridData = spyOn(component, 'setGridData');
    component.approvalDetails = employeeData.approvalDetails;
    component.updateExitApproval(employeeData.approvalDetails[0]);
    expect(spyUpdateAdminAcceptance).toHaveBeenCalled();
    expect(spySetGridData).toHaveBeenCalled();
    expect(component.approvalDetails).toEqual([]);
  });

  it(`should not call setGridData method and not to splice approved detail from approvalDetails
  if updateAdminAcceptance is failure on calling updateExitApproval`, () => {
    const spyUpdateAdminAcceptance = spyOn(
      resignationService,
      'updateAdminAcceptance'
    ).and.returnValue(throwError(() => new Error('error')));
    const spySetGridData = spyOn(component, 'setGridData');
    component.approvalDetails = employeeData.approvalDetails;
    component.updateExitApproval(employeeData.approvalDetails[0]);
    expect(spyUpdateAdminAcceptance).toHaveBeenCalled();
    expect(spySetGridData).not.toHaveBeenCalled();
    expect(component.approvalDetails).toEqual(employeeData.approvalDetails);
  });
});
