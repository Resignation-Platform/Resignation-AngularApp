import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EmployeeMockData } from 'src/app/mockData/employeeData';
import { RouterMock } from 'src/app/mockData/routeMock';
import { ResignationService } from 'src/services/resignation.service';
import { ResignationFormComponent } from './resignation-form.component';

describe('RegistrationFormComponent', () => {
  let component: ResignationFormComponent;
  let fixture: ComponentFixture<ResignationFormComponent>;
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
      declarations: [ResignationFormComponent],
      providers: [
        ResignationService,
        EmployeeMockData,
        FormBuilder,
        { provide: Router, useClass: RouterMock },
      ],
    });
    fixture = TestBed.createComponent(ResignationFormComponent);
    component = fixture.componentInstance;
    injector = fixture.debugElement.injector;
    resignationService = injector.get(ResignationService);
    employeeData = injector.get(EmployeeMockData);
    route = injector.get(Router);
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should not call createResignationForm if screenType is not equal to exitTracking
  on calling ngOnChanges`, () => {
    component.screenType = '';
    const spyCreateResignationForm = spyOn(component, 'createResignationForm');
    component.ngOnChanges();
    expect(spyCreateResignationForm).not.toHaveBeenCalled();
  });

  it(`should not call createResignationForm if resignationForm is already created
  on calling ngOnChanges`, () => {
    component.screenType = 'exitTracking';
    const spyCreateResignationForm = spyOn(component, 'createResignationForm');
    component.ngOnChanges();
    expect(spyCreateResignationForm).not.toHaveBeenCalled();
  });

  it(`should disable the resignationForm and call setEmployeeDetail if screenType is exitTracking,
    employeeExitDetails and employeeDetail on calling ngOnChanges`, () => {
    component.employeeDetail = employeeData.employeeDetails;
    component.employeeExitDetails = employeeData.employeeExitDetails;
    component.screenType = 'exitTracking';
    const spySetEmployeeDetail = spyOn(component, 'setEmployeeDetail');
    component.ngOnChanges();
    expect(component.resignationForm.disabled).toBe(true);
    expect(spySetEmployeeDetail).toHaveBeenCalled();
  });

  it(`should not disable the resignationForm and not to call setEmployeeDetail if screenType is not exitTracking,
    employeeExitDetails and employeeDetail has value on calling ngOnChanges`, () => {
    component.employeeDetail = employeeData.employeeDetails;
    component.employeeExitDetails = employeeData.employeeExitDetails;
    component.screenType = '';
    const spySetEmployeeDetail = spyOn(component, 'setEmployeeDetail');
    component.ngOnChanges();
    expect(component.resignationForm.disabled).toBe(false);
    expect(spySetEmployeeDetail).not.toHaveBeenCalled();
  });

  it(`should not disable the resignationForm and not to call setEmployeeDetail if screenType is exitTracking,
    employeeExitDetails has no value and employeeDetail has value on calling ngOnChanges`, () => {
    component.employeeDetail = employeeData.employeeDetails;
    component.screenType = 'exitTracking';
    const spySetEmployeeDetail = spyOn(component, 'setEmployeeDetail');
    component.ngOnChanges();
    expect(component.resignationForm.disabled).toBe(false);
    expect(spySetEmployeeDetail).not.toHaveBeenCalled();
  });

  it(`should not disable the resignationForm and not to call setEmployeeDetail if screenType is exitTracking,
    employeeExitDetails has value and employeeDetail has no value on calling ngOnChanges`, () => {
    component.employeeExitDetails = employeeData.employeeExitDetails;
    component.screenType = 'exitTracking';
    const spySetEmployeeDetail = spyOn(component, 'setEmployeeDetail');
    component.ngOnChanges();
    expect(component.resignationForm.disabled).toBe(false);
    expect(spySetEmployeeDetail).not.toHaveBeenCalled();
  });

  it(`should call fetchFeedbackQuestions and set value for empName if screenType is not exitTracking
    on calling ngOnInit`, () => {
    component.screenType = '';
    const spyFetchFeedbackQuestions = spyOn(
      component,
      'fetchFeedbackQuestions'
    );
    component.empName = '';
    component.ngOnInit();
    expect(component.empName).toEqual('Test User');
    expect(spyFetchFeedbackQuestions).toHaveBeenCalled();
  });

  it(`should not call fetchFeedbackQuestions and not set value for empName if screenType is exitTracking
    on calling ngOnInit`, () => {
    component.screenType = 'exitTracking';
    const spyFetchFeedbackQuestions = spyOn(
      component,
      'fetchFeedbackQuestions'
    );
    component.empName = '';
    component.ngOnInit();
    expect(component.empName).toEqual('');
    expect(spyFetchFeedbackQuestions).not.toHaveBeenCalled();
  });

  it('should create the resignationForm on calling createResignationForm', () => {
    component.createResignationForm();
    expect(component.resignationForm).toBeDefined();
  });

  it('should call fetchFeedbackQuestions of resignationService on calling fetchFeedBackQuestions', () => {
    const spyFetchFeedbackQuestions = spyOn(
      resignationService,
      'fetchFeedBackQuestions'
    ).and.returnValue(of(employeeData.feedbackQuestions));
    component.fetchFeedbackQuestions();
    expect(spyFetchFeedbackQuestions).toHaveBeenCalled();
  });

  it(`should set value for feedbackQuestions, call createResignationForm and fetchEmployeeDetails with empName
  on calling fetchFeedBackQuestions`, () => {
    spyOn(resignationService, 'fetchFeedBackQuestions').and.returnValue(
      of(employeeData.feedbackQuestions)
    );
    component.empName = 'testUser';
    const spyCreateResignationForm = spyOn(component, 'createResignationForm');
    const spyFetchEmployeeDetails = spyOn(component, 'fetchEmployeeDetails');
    component.fetchFeedbackQuestions();
    expect(component.feedbackQuestions).toEqual(employeeData.feedbackQuestions);
    expect(spyCreateResignationForm).toHaveBeenCalled();
    expect(spyFetchEmployeeDetails).toHaveBeenCalledWith(component.empName);
  });

  it('should call fetchEmployeeDetails of resignationService on calling fetchEmployeeDetails', () => {
    const spyFetchEmployeeDetails = spyOn(
      resignationService,
      'fetchEmployeeDetails'
    ).and.returnValue(of(employeeData.employeeDetails));
    component.fetchEmployeeDetails('test');
    expect(spyFetchEmployeeDetails).toHaveBeenCalled();
  });

  it('should call setDefaultToResignationForm and set value for employeeDetail on calling fetchEmployeeDetails', () => {
    spyOn(resignationService, 'fetchEmployeeDetails').and.returnValue(
      of(employeeData.employeeDetails)
    );
    const spySetDefaultToResignationForm = spyOn(
      component,
      'setDefaultToResignationForm'
    );
    component.fetchEmployeeDetails('test');
    expect(spySetDefaultToResignationForm).toHaveBeenCalled();
    expect(component.employeeDetail).toEqual(employeeData.employeeDetails);
  });

  it('should set value for name, id, mail, HRName, projectManager and deliveryLeader on calling setDefaultToResignationForm', () => {
    component.createResignationForm();
    component.employeeDetail = employeeData.employeeDetails;
    component.setDefaultToResignationForm();
    expect(component.resignationForm.controls['name'].value).toBe(
      employeeData.employeeDetails.employeeName
    );
    expect(component.resignationForm.controls['id'].value).toBe(
      employeeData.employeeDetails.employeeNumber
    );
    expect(component.resignationForm.controls['mail'].value).toBe(
      employeeData.employeeDetails.email
    );
    expect(component.resignationForm.controls['HRName'].value).toBe(
      employeeData.employeeDetails.hrName
    );
    expect(component.resignationForm.controls['projectManager'].value).toBe(
      employeeData.employeeDetails.programManagerName
    );
    expect(component.resignationForm.controls['deliveryLeader'].value).toBe(
      employeeData.employeeDetails.deliveryLeaderName
    );
  });

  it(`should set value for name, id, mail, personalMail, contactNumber, HRName, projectManager and deliveryLeader
  on calling setEmployeeDetail`, () => {
    component.createResignationForm();
    component.employeeDetail = employeeData.employeeDetails;
    component.employeeExitDetails = employeeData.employeeExitDetails;
    component.setEmployeeDetail();
    expect(component.resignationForm.controls['name'].value).toBe(
      employeeData.employeeDetails.employeeName
    );
    expect(component.resignationForm.controls['id'].value).toBe(
      employeeData.employeeExitDetails.employeeNumber
    );
    expect(component.resignationForm.controls['mail'].value).toBe(
      employeeData.employeeExitDetails.email
    );
    expect(component.resignationForm.controls['personalMail'].value).toBe(
      employeeData.employeeExitDetails.personalEmail
    );
    expect(component.resignationForm.controls['contactNumber'].value).toBe(
      employeeData.employeeExitDetails.contact
    );
    expect(component.resignationForm.controls['HRName'].value).toBe(
      employeeData.employeeDetails.hrName
    );
    expect(component.resignationForm.controls['projectManager'].value).toBe(
      employeeData.employeeDetails.programManagerName
    );
    expect(component.resignationForm.controls['deliveryLeader'].value).toBe(
      employeeData.employeeDetails.deliveryLeaderName
    );
  });

  it('should return null if screenType is exitTracking on calling createArrayOfFeedbackFormControls', () => {
    component.screenType = 'exitTracking';
    const result = component.createArrayOfFeedbackFormControls();
    expect(result).toBe(null);
  });

  it('should return null if feedbackQuestions is null on calling createArrayOfFeedbackFormControls', () => {
    component.screenType = '';
    component.feedbackQuestions = [];
    const result = component.createArrayOfFeedbackFormControls();
    expect(result).toBe(null);
  });

  it(`should return formArray of controls if feedbackQuestions is not null and screenType is not exitTracking
    on calling createArrayOfFeedbackFormControls`, () => {
    component.screenType = '';
    component.feedbackQuestions = employeeData.feedbackQuestions;
    const result = component.createArrayOfFeedbackFormControls();
    expect(result?.length).toBe(component.feedbackQuestions.length);
  });

  it(`should call saveExitEmployeeDetails of resignationService on calling saveResignationInformation`, () => {
    component.createResignationForm();
    component.resignationForm.controls['id'].setValue('477742');
    component.resignationForm.controls['mail'].setValue('testUser@g.com');
    component.resignationForm.controls['personalMail'].setValue(
      'perosnal@o.com'
    );
    component.resignationForm.controls['contactNumber'].setValue('99394243942');
    component.feedbackQuestions = employeeData.feedbackQuestions;
    const spyNavigate = spyOn(route, 'navigate');
    const spySaveExitEmployeeDetails = spyOn(
      resignationService,
      'saveExitEmployeeDetails'
    ).and.returnValue(of('saved'));
    component.saveResignationInformation();
    expect(spySaveExitEmployeeDetails).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalled();
  });

  it(`should show alert if saveExitEmployeeDetails of resignationService returns error
  on calling saveResignationInformation`, () => {
    component.createResignationForm();
    component.resignationForm.controls['id'].setValue('477742');
    component.feedbackQuestions = employeeData.feedbackQuestions;
    const spySaveExitEmployeeDetails = spyOn(
      resignationService,
      'saveExitEmployeeDetails'
    ).and.returnValue(throwError(() => new Error('Error')));
    const spyWindowAlert = spyOn(window, 'alert');
    component.saveResignationInformation();
    expect(spySaveExitEmployeeDetails).toHaveBeenCalled();
    expect(spyWindowAlert).toHaveBeenCalled();
  });
});
