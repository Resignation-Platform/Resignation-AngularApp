export interface IEmployee {
  employeeNumber: string;
  email: string;
  role: string;
  departmentName: string;
  dateOfJoining: string;
  HRName: string;
  programManagerName: string;
  deliveryLeaderName: string;
}

export interface ISaveEmployeeDetails {
  employeeNumber: string;
  mailId: string;
  personMailId: string;
  contactNumber: string;
  feebacks: IFeedback[];
}

export interface IFeedback {
  question: string;
  answer: string;
}
