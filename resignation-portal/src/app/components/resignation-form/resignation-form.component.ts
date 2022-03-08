import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IEmployee,
  IEmployeeExitDetails,
  IFeedbackQuestions,
  ISaveEmployeeDetails,
} from 'src/app/model/employee';
import { ResignationService } from 'src/services/resignation.service';

@Component({
  selector: 'app-resignation-form',
  templateUrl: './resignation-form.component.html',
  styleUrls: ['./resignation-form.component.css'],
})
export class ResignationFormComponent implements OnInit, OnChanges {
  @Input() screenType!: string;
  @Input() employeeExitDetails!: IEmployeeExitDetails;
  @Input() employeeDetail!: IEmployee;
  public resignationForm!: FormGroup;
  public feedbackQuestions!: IFeedbackQuestions[];
  public empName!: string;

  constructor(
    private formBuilder: FormBuilder,
    private resignationService: ResignationService,
    private route: Router
  ) {}

  ngOnChanges(): void {
    if (!this.resignationForm && this.screenType === 'exitTracking') {
      this.createResignationForm();
    }

    if (
      this.screenType === 'exitTracking' &&
      this.employeeExitDetails &&
      this.employeeDetail
    ) {
      this.resignationForm.disable();
      this.setEmployeeDetail();
    }
  }

  ngOnInit(): void {
    if (this.screenType !== 'exitTracking') {
      let LocalStorage_values = JSON.parse(
        localStorage.getItem('Employee_Details') || ''
      );
      this.empName = LocalStorage_values.empName;
      this.fetchFeedbackQuestions();
    }
  }

  /**
   * Fetches the feedback questions
   */
  fetchFeedbackQuestions(): void {
    this.resignationService
      .fetchFeedBackQuestions()
      .subscribe((feedbackQuestions) => {
        this.feedbackQuestions = feedbackQuestions;
        this.createResignationForm();
        this.fetchEmployeeDetails(this.empName);
      });
  }

  /**
   * Creates the resignation form
   */
  createResignationForm(): void {
    this.resignationForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      id: [{ value: '', disabled: true }],
      mail: [{ value: '', disabled: true }],
      personalMail: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$'
          ),
        ],
      ],
      contactNumber: ['', [Validators.required, Validators.minLength(10)]],
      HRName: [{ value: '', disabled: true }],
      projectManager: [{ value: '', disabled: true }],
      deliveryLeader: [{ value: '', disabled: true }],
      feedbacks: this.createArrayOfFeedbackFormControls(),
    });
  }

  setEmployeeDetail(): void {
    this.resignationForm.patchValue({
      name: this.employeeDetail.empName,
      id: this.employeeExitDetails.employeeNumber,
      mail: this.employeeExitDetails.email,
      personalMail: this.employeeExitDetails.personalEmail,
      contactNumber: this.employeeExitDetails.contact,
      HRName: this.employeeDetail.HRName,
      projectManager: this.employeeDetail.programManagerName,
      deliveryLeader: this.employeeDetail.deliveryLeaderName,
    });
  }

  /**
   * Creates the array of feed back form controls
   * @returns - the form array of feedback controls
   */
  createArrayOfFeedbackFormControls(): FormArray | null {
    if (this.screenType !== 'exitTracking') {
      const controls = this.feedbackQuestions.map((question) => {
        return this.formBuilder.control('');
      });

      return new FormArray(controls);
    }

    return null;
  }

  /**
   * Gets the feedback questions array
   */
  get feedbackQuestionsArray() {
    return this.resignationForm.controls['feedbacks'] as FormArray;
  }

  /**
   * Fetch employee details
   */
  fetchEmployeeDetails(empName: string): void {
    this.resignationService
      .fetchEmployeeDetails(empName)
      .subscribe((employeeDetail) => {
        this.employeeDetail = employeeDetail;
        this.setDefaultToResignationForm();
      });
  }

  /**
   * Sets the default value for resignation form
   */
  setDefaultToResignationForm(): void {
    this.resignationForm.patchValue({
      name: this.employeeDetail.HRName,
      id: this.employeeDetail.employeeNumber,
      mail: this.employeeDetail.email,
      HRName: this.employeeDetail.HRName,
      projectManager: this.employeeDetail.programManagerName,
      deliveryLeader: this.employeeDetail.deliveryLeaderName,
    });
  }

  /**
   * Saves the resignation information
   */
  saveResignationInformation(): void {
    const resignationDetails = this.resignationForm.getRawValue();
    const feedbackAnswers: string[] = resignationDetails.feedbacks;
    const resignationDetailsPayload: ISaveEmployeeDetails = {
      employeeNumber: resignationDetails.id,
      mailId: resignationDetails.mail,
      personMailId: resignationDetails.personalMail,
      contactNumber: resignationDetails.contactNumber,
      feebacks: feedbackAnswers.map((answer, i) => {
        return {
          question: this.feedbackQuestions[i].question,
          answer: answer,
        };
      }),
    };

    this.resignationService
      .saveExitEmployeeDetails(resignationDetailsPayload)
      .subscribe({
        next: (x) => {
          this.route.navigate(['/exit-tracking']);
        },
        error: () => {
          alert('Resignation save failed');
        },
      });
  }
}
