import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iservice } from './Iservice';
import { from, Observable, of } from 'rxjs';
import { AdminDetails } from 'src/app/models/AdminDetails';
import { IEmployee, ISaveEmployeeDetails } from 'src/app/model/employee';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResignationService implements Iservice {
  constructor(private http: HttpClient) {}

  WebApi_Url = environment.ApiUrl;
  fetchFeedBackQuestions() {
    return of([
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
    ]);
  }
  saveExitEmployeeDetails(
    employeeeExitDetails: ISaveEmployeeDetails
  ): Observable<any> {
    throw new Error('Method not implemented.');
  }
  fetchEmployeeExitProgress(ExitEmployeeNumber: string) {
    throw new Error('Method not implemented.');
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

  fetchEmployeeDetails(EmployeeName: string): Observable<any> {
    return this.http.get(this.WebApi_Url + '/Employees/' + EmployeeName);
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
