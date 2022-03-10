import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResignationService } from './resignation.service';
import {IFeedback,IFeedbackQuestions} from '../../src/app/model/employee';
import { of } from 'rxjs';
import { EmployeeMockData } from 'src/app/mockData/employeeData';

describe('ResignationService', () => {
  let service: ResignationService;

  let empMockData:EmployeeMockData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[EmployeeMockData],

    });
    service = TestBed.inject(ResignationService);
    empMockData=TestBed.inject(EmployeeMockData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should fetch the feedback question ',()=>{
    let questions:IFeedbackQuestions[]=
    [
      {id: 1,question: 'what is the reason the resignation?',}
      ,{ id: 2,question: 'Do you have any other offer?',},
      {id: 3,question: 'What could be changed in the organaisation?',},
      {id: 4,question: 'what is the reason the resignation?',},
    ]

      let spyOnFeebBackApi=spyOn(service,'fetchFeedBackQuestions').and.returnValue(of(questions))

    service.fetchFeedBackQuestions().subscribe(feedbackquestion=>{
        expect(feedbackquestion).toEqual(questions);
    });
    expect(spyOnFeebBackApi).toHaveBeenCalled();
  });

  it('should save the Employee exit details',()=>{
    let spySaveEmpDetails=spyOn(service,'saveExitEmployeeDetails')
    .withArgs(empMockData.employeeSaveDetails).and.returnValue(of('Updated successfully'));

    service.saveExitEmployeeDetails(empMockData.employeeSaveDetails).subscribe(
      data=>{
        expect(data).toEqual('Updated successfully');
      }
    );

    expect(spySaveEmpDetails).toHaveBeenCalled();

  });
  it('should fetch employee exit progress',()=>{
    let spyEmployeeExitProgress=spyOn(service,'fetchEmployeeExitProgress').withArgs('756743').and
                                .returnValue(of(empMockData.employeeExitDetails));

      service.fetchEmployeeExitProgress('756743').subscribe(progressdetails=>{
        expect(progressdetails).toEqual(empMockData.employeeExitDetails);
      });
      expect(spyEmployeeExitProgress).toHaveBeenCalled();

  });
  it('should update the admin acceptance for the exit employee',()=>{

    let spyUpdateAdminApproval=spyOn(service,'updateAdminAcceptance')
                                .withArgs('756743','HR').and.returnValue(of('Updated successfully'));
        service.updateAdminAcceptance('756743','HR').subscribe(data=>{
          expect(data).toEqual('Updated successfully')
        });
        expect(spyUpdateAdminApproval).toHaveBeenCalled();

  });
  it('should fetch employee details on login',()=>{
    let spyEmpDetails=spyOn(service,'fetchEmployeeDetails').withArgs('756743')
                      .and.returnValue(of(empMockData.employeeDetails));
          service.fetchEmployeeDetails('756743').subscribe(data=>{
            expect(data).toEqual(empMockData.employeeDetails);
          });
          expect(spyEmpDetails).toHaveBeenCalled();
  });
  it('should fetch admin details for approving the employee resignation',()=>{
      let spyAdminDetails=spyOn(service,'fetchDetailsForAdmins')
                            .withArgs('','').and.returnValue(of(empMockData.approvalDetails));

      service.fetchDetailsForAdmins('','').subscribe(data=>{
              expect(data).toEqual(empMockData.approvalDetails);
            });
        expect(spyAdminDetails).toHaveBeenCalled();

  });
  it('should get the value of observable',()=>{
    service.loggedInSubj.subscribe(data=>expect(data).toBeFalsy())

  });
  it('should call the userLogin when user is logged and emit an event',()=>{
    let spyUserLogin=spyOn(service,'UserLogin').withArgs('testUser','756743').and.callThrough();
    service.UserLogin('testUser','756743')
    expect(spyUserLogin).toHaveBeenCalled();
    expect(service.isLoggedIn).toBeTruthy();
  });

  it('should call logout and subject to have a false value',()=>{
    let spyLogOut=spyOn(service,'userLogOut').and.callThrough();
    service.userLogOut();
    expect(spyLogOut).toHaveBeenCalled();
    service.loggedInSubj.subscribe(data=>{
      expect(data).toBeFalsy();
    })
  })


});
