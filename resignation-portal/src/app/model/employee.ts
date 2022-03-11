export interface IEmployee {
  employeeNumber: string;
  employeeName: string;
  email: string;
  role: string;
  departmentName: string;
  dateOfJoining: string;
  hrName: string;
  programManagerName: string;
  deliveryLeaderName: string;
}

export interface ISaveEmployeeDetails {
  employeeNumber: string;
  mailId: string;
  personalEmailId: string;
  contactNumber: string;
  feedbacks: IFeedback[];
}

export interface IFeedback {
  question: string;
  answer: string;
}

export interface IEmployeeExitProgress {
  employeeNumber: string;
  email: string;
  personalEmail: string;
  contact: string;
  separationDate: string;
  lastWorkingDate: string;
  isHRApproved: boolean;
  isPMApproved: boolean;
  isDHApproved: boolean;
  iTClearance: boolean;
  financeClearance: boolean;
}

export interface IEmployeeExitDetails {
  employeeNumber: string;
  email: string;
  personalEmail: string;
  contact: string;
  HRName: string;
  separationDate: string;
  lastWorkingDate: string;
  isHRApproved: boolean;
  isPMApproved: boolean;
  isDHApproved: boolean;
  iTClearance: boolean;
  financeClearance: boolean;
}

export interface IFeedbackQuestions {
  id: number;
  question: string;
}

export interface IAdminDetails {
  employeeNo: string;
  employeeEmailId: string;
  employeePersonalEmailid: string;
  employeeContact: string;
  seperationDate: string;
  lastWorkingDate: string;
  isHrApproved:string;
}
