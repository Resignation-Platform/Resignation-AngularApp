import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';

import { ExittrackingComponent } from './exittracking.component';

describe('ExittrackingComponent', () => {
  let component: ExittrackingComponent;
  let fixture: ComponentFixture<ExittrackingComponent>;
  let injector:Injector;
  let service:ResignationService;

  const details = {
    empNumber: '77723',
    empName: 'Test User',
    empRole: 'developer',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExittrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExittrackingComponent);
    component = fixture.componentInstance;
    localStorage.setItem('Employee_Details',JSON.stringify(details));
    fixture.detectChanges();
  });

  afterEach(()=>{
    localStorage.clear();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the Employee details values from localstorage',()=>{
    component.ngOnInit()
    expect(component.LocalStorgage).toEqual(details);
  });

  it('fetchEmployeeDetails() function should be called',()=>{
    let spyFetchEmployeeDetails= spyOn(component,'fetchEmployeeDetails')
  })


});
