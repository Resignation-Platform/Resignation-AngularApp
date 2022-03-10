import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EmployeeMockData } from 'src/app/mockData/employeeData';
import { ResignationService } from 'src/services/resignation.service';
import { ResignationFormComponent } from './resignation-form.component';

describe('RegistrationFormComponent', () => {
  let component: ResignationFormComponent;
  let fixture: ComponentFixture<ResignationFormComponent>;
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
      declarations: [ResignationFormComponent],
      providers: [ResignationService, EmployeeMockData, FormBuilder],
    });
    fixture = TestBed.createComponent(ResignationFormComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    resignationService = injector.get(ResignationService);
    employeeData = injector.get(EmployeeMockData);
    component.createResignationForm();
    component.employeeDetail = employeeData.employeeDetails;
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call createResignationForm if resignationForm is null and screenType is exitTracking
  on calling ngOnChanges`, () => {
    component.screenType = 'exitTracking';
    const spyCreateResignationForm = spyOn(component, 'createResignationForm');
    component.ngOnChanges();
    expect(spyCreateResignationForm).toHaveBeenCalled();
  });
});
