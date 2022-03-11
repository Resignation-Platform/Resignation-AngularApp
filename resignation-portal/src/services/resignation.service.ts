import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iservice } from './Iservice';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  IAdminDetails,
  IEmployee,
  IEmployeeExitDetails,
  IFeedbackQuestions,
  ISaveEmployeeDetails,
} from 'src/app/model/employee';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResignationService implements Iservice {
  public loggedInSubj = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) {}

  WebApi_Url = environment.ApiUrl;
  fetchFeedBackQuestions(): Observable<IFeedbackQuestions[]> {
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

    return this.http.get<IFeedbackQuestions[]>(
      this.WebApi_Url + '/Employees/Feedback'
    );
  }

  saveExitEmployeeDetails(
    employeeeExitDetails: ISaveEmployeeDetails
  ): Observable<any> {
    return this.http.post(
      this.WebApi_Url + '/Employees/',
      employeeeExitDetails,
      {
        responseType:'text'
      }
    )
  }

  fetchEmployeeExitProgress(
    exitEmployeeNumber: string
  ): Observable<IEmployeeExitDetails> {
    return this.http.get<IEmployeeExitDetails>(
      this.WebApi_Url +
        '/Employees/FetchEmployeeExitDetails/' +
        exitEmployeeNumber
    );
  }

  updateAdminAcceptance(
    ExitEmployeeNumber: string,
    AdminRole: string
  ): Observable<any> {
    let approval_obj = {
      ExitEmpNo: ExitEmployeeNumber,
      AdminRole: AdminRole,
    };

    return this.http.put(
      this.WebApi_Url + '/Employees/AdminApprovals',
      approval_obj,
      {
        responseType:'text'
      }
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
  ): Observable<IAdminDetails[]> {
    return this.http.get<IAdminDetails[]>(
      this.WebApi_Url +
        '/Admin?AdminEmpNo=' +
        AdminEmployeeNumber +
        '&AdminRole=' +
        AdminRole
    );
  }
  get isLoggedIn() {
    return this.loggedInSubj.asObservable();
  }

  UserLogin(empName: string, empNum: string) {
    if (empName !== '' && empNum !== '') {
      this.loggedInSubj.next(true);
    } else {
      this.router.navigate(['/login']);
    }
  }
  userLogOut() {
    this.loggedInSubj.next(false);
    this.router.navigate(['/login']);
  }
}
