import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Iservice } from './Iservice';
import { from, Observable, of } from 'rxjs';
import { AdminDetails } from 'src/app/models/AdminDetails';
import { IEmployee, ISaveEmployeeDetails } from 'src/app/model/employee';

@Injectable({
  providedIn: 'root',
})
export class ResignationService implements Iservice {
  constructor(private http: HttpClient) {}
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
  fetchDetailsForAdmins(
    AdminEmployeeNumber: string
  ): Observable<AdminDetails[]> {
    throw new Error('Method not implemented.');
  }
  updateAdminAcceptance(
    ExitEmployeeNumber: string,
    AdminRole: string
  ): Observable<string> {
    throw new Error('Method not implemented.');
  }

  fetchEmployeeDetails(): Observable<any> {
    return of({
      employeeNumber: '756743',
      email: 'test@gmail.com',
      role: 'developer',
      departmentName: 'engineering',
      dateOfJoining: '2022-03-07',
      HRName: 'testusername',
      programManagerName: 'testpmname',
      deliveryLeaderName: 'testdeliveryname',
    });
  }
}
