import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResignationService } from 'src/services/resignation.service';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let service :ResignationService;
  let injector:Injector;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ SidebarComponent ],
      providers:[ResignationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    //injecting service class object
    injector=fixture.debugElement.injector;
    service=injector.get(ResignationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //  it('should get the value of role from localstorage',()=>{
  //   let details={
  //     empRole:'PM',
  //   };
  //   localStorage.setItem('Employee_Details',JSON.stringify(details));
  //   component.ngOnInit();
  //   expect(component.confirmIsAdmin('PM')).toBeTruthy(component.isAdmin)

  //  })

   it(`should have initial value as false for 'isSideBarActivated'`,async()=>{
     expect(component.isSideBarActivated).toBeFalsy();
   });






});
