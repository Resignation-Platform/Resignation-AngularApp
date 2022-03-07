import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Iservice } from './Iservice';
import { Observable } from 'rxjs';
import { AdminDetails } from 'src/app/models/AdminDetails';


@Injectable({
  providedIn: 'root'
})
export class ResignationService implements Iservice {

  constructor(
    private http:HttpClient
  ) { }
  fetchFeedBackQuestions() {
    throw new Error('Method not implemented.');
  }
  saveExitEmployeeDetails(ExitEmpDetails: any) {
    throw new Error('Method not implemented.');
  }
  fetchEmployeeExitProgress(ExitEmployeeNumber: string) {
    throw new Error('Method not implemented.');
  }
  fetchDetailsForAdmins(AdminEmployeeNumber: string):Observable<AdminDetails[]> {


    throw new Error('Method not implemented.');
  }
  updateAdminAcceptance(ExitEmployeeNumber: string, AdminRole: string):Observable<string> {
    throw new Error('Method not implemented.');
  }


  fetchEmployeeDetails(){

  }


}
