import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashBoardComponent } from './dash-board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeMockData } from 'src/app/mockData/employeeData';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;
  let injector: Injector;
  let resignationService: ResignationService;
  const details = {
    empNumber: '77723',
    empName: 'Test User',
    empRole: 'developer',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [DashBoardComponent],
      providers: [ResignationService, EmployeeMockData],
    });
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    resignationService = injector.get(ResignationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get value of empName and empNumber from local storage on calling ngOnInit', () => {
    let details = {
      empNumber: '77723',
      empName: 'Test User',
      empRole: 'developer',
    };
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    component.ngOnInit();
    expect(component.emp_Name).toBe('Test User');
    expect(component.empNumber).toBe('77723');
    localStorage.clear();
  });
});
