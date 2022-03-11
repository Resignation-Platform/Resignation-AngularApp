import { IEmployeeExitDetails, ISaveEmployeeDetails } from "../model/employee";

export class EmployeeMockData {
  public employeeDetails = {
    employeeNumber: '756743',
    employeeName: 'userName',
    email: 'test@gmail.com',
    role: 'HR',
    departmentName: 'engineering',
    dateOfJoining: '2022-03-07',
    hrName: 'testusername',
    programManagerName: 'testpmname',
    deliveryLeaderName: 'testdeliveryname',
  };


  public employeeExitDetails = {
    employeeNumber: '756743',
    email: 'test@gmail.com',
    personalEmail: 'testpersonal@gmail.com',
    HRName: 'testHRName',
    separationDate: '24-03-2022',
    lastWorkingDate: '24-03-2022',
    isHRApproved: true,
    isPMApproved: true,
    isDHApproved: true,
    iTClearance: true,
    financeClearance: true,
    contact: '584399933',
  };

  public approvalDetails = [
    {
      employeeNo: '488932',
      employeeEmailId: 'test@email.com',
      employeePersonalEmailid: 'personal@email.com',
      employeeContact: '5949292',
      seperationDate: '24-05-2020',
      lastWorkingDate: '24-07-2020',
      isHrApproved:'0'
    },
  ];

  public feedbackQuestions = [
    {
      id: 1,
      question: 'what is the reason the resignation?',
    },
    {
      id: 2,
      question: 'Do you have any other offer?',
    },
    {
      id: 3,
      question: 'What could be changed in the organaisation?',
    },
    {
      id: 4,
      question: 'what is the reason the resignation?',
    },
  ];



  public employeeSaveDetails:ISaveEmployeeDetails={
    employeeNumber: '756743',
    mailId: 'test@gmail.com',
    personalEmailId: 'testpersonal@gmail.com',
    contactNumber: '584399933',
    feedbacks:[]
  }
}


