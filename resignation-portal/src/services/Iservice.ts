export interface Iservice{
  fetchEmployeeDetails(EmployeeName:string):any;
  fetchFeedBackQuestions():any;
  saveExitEmployeeDetails(ExitEmpDetails:any):any;
  fetchEmployeeExitProgress(ExitEmployeeNumber:string):any;

  fetchDetailsForAdmins(AdminEmployeeNumber:string,AdminRole:string):any;
  updateAdminAcceptance(ExitEmployeeNumber:string,AdminRole:string):any;
}
