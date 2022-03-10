import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashBoardComponent } from './dash-board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeMockData } from 'src/app/mockData/employeeData';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterMock } from 'src/app/mockData/routeMock';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;
  let injector: Injector;
  let resignationService: ResignationService;
  let employeeData: EmployeeMockData;
  let route: Router;
  const details = {
    empNumber: '77723',
    empName: 'Test User',
    empRole: 'developer',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DashBoardComponent],
      providers: [
        ResignationService,
        EmployeeMockData,
        { provide: Router, useClass: RouterMock },
      ],
    });
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    resignationService = injector.get(ResignationService);
    employeeData = injector.get(EmployeeMockData);
    route = injector.get(Router);
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    component.employeeDetail = employeeData.employeeDetails;
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
    expect(component.emp_Name).toBe('Test User');
    expect(component.empNumber).toBe('77723');
  });

  it('should call the fetchEmployeeDetails on calling ngOnInit', () => {
    const spyFetchEmployeeDetails = spyOn(component, 'fetchEmployeeDetails');
    component.ngOnInit();
    expect(spyFetchEmployeeDetails).toHaveBeenCalled();
  });

  it('should return true if role of user is HR or PM or DH on calling checkApprovalRole', () => {
    // User is role is HR
    component.employeeDetail.role = 'HR';
    const resultHR = component.checkApprovalRole();
    expect(resultHR).toBe(true);

    // User is role is HR
    component.employeeDetail.role = 'PM';
    const resultPM = component.checkApprovalRole();
    expect(resultPM).toBe(true);

    // User is role is HR
    component.employeeDetail.role = 'DH';
    const resultDH = component.checkApprovalRole();
    expect(resultDH).toBe(true);
  });

  it(`should call fetchEmployeeDetails, fetchEmployeeExitProgress, set value for employeeDetail and employeeExitDetails
  on calling fetchEmployeeDetails`, () => {
    const spyFetchEmployeeDetails = spyOn(
      resignationService,
      'fetchEmployeeDetails'
    ).and.returnValue(of(employeeData.employeeDetails));
    const spyFetchEmployeeExitProgress = spyOn(
      resignationService,
      'fetchEmployeeExitProgress'
    ).and.returnValue(of(employeeData.employeeExitDetails));
    component.fetchEmployeeDetails();
    expect(spyFetchEmployeeDetails).toHaveBeenCalled();
    expect(spyFetchEmployeeExitProgress).toHaveBeenCalled();
    expect(component.employeeDetail).toEqual(employeeData.employeeDetails);
    expect(component.employeeExitDetails).toEqual(
      employeeData.employeeExitDetails
    );
  });

  it('shoulc call navigate of router on calling initiateNavigation', () => {
    const spyNavigate = spyOn(route, 'navigate');
    component.initiateNavigation('admin');
    expect(spyNavigate).toHaveBeenCalledWith(['/admin']);
  });
});
