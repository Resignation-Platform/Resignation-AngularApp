import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iservice } from './Iservice';
import { from, Observable, of, throwError } from 'rxjs';
import { AdminDetails } from 'src/app/models/AdminDetails';
import {
  IEmployee,
  IEmployeeExitDetails,
  IFeedbackQuestions,
  ISaveEmployeeDetails,
} from 'src/app/model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResignationService implements Iservice {
  constructor(private http: HttpClient) {}

  WebApi_Url = environment.ApiUrl;
  fetchFeedBackQuestions(): Observable<IFeedbackQuestions[]> {
    // return of([
    //   {
    //     id: 1,
    //     question: 'what is the reason the resignation?',
    //   },
    //   {
    //     id: 2,
    //     question: 'Do you have any other offer?',
    //   },
    //   {
    //     id: 3,
    //     question: 'What could be changed in the organaisation?',
    //   },
    //   {
    //     id: 4,
    //     question: 'what is the reason the resignation?',
    //   },
    // ]);

    return this.http.get<IFeedbackQuestions[]>(
      this.WebApi_Url + '/Employees/Feedback'
    );
  }

  saveExitEmployeeDetails(
    employeeeExitDetails: ISaveEmployeeDetails
  ): Observable<any> {
    return this.http.post(
      this.WebApi_Url + '/Employees/',
      employeeeExitDetails
    );
  }

  fetchEmployeeExitProgress(
    exitEmployeeNumber: string
  ): Observable<IEmployeeExitDetails> {
    return this.http.get<IEmployeeExitDetails>(
      this.WebApi_Url + '/Employees/' + exitEmployeeNumber
    );
  }

  updateAdminAcceptance(
    ExitEmployeeNumber: string,
    AdminRole: string
  ): Observable<string> {
    let approval_obj = {
      ExitEmpNo: ExitEmployeeNumber,
      AdminRole: AdminRole,
    };

    return this.http.put<any>(
      this.WebApi_Url + '/Employees/AdminApprovals',
      approval_obj
    );
  }

  fetchEmployeeDetails(EmployeeName: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(
      this.WebApi_Url + '/Employees/' + EmployeeName
    );
  }

  fetchDetailsForAdmins(
    AdminEmployeeNumber: string,
    AdminRole: string
  ): Observable<any> {
    return this.http.get(
      this.WebApi_Url +
        '/Admin?AdminEmpNo=' +
        AdminEmployeeNumber +
        '&AdminRole=' +
        AdminRole
    );
  }
}
