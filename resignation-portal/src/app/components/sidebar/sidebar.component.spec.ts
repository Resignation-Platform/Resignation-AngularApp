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
  const details = {
    empRole: 'HR',
  };

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
    localStorage.setItem('Employee_Details', JSON.stringify(details));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call the confirmIsAdmin with empRole on calling ngOnInit', () => {
    //With User role HR
    const spyConfirmIsAdminHR = spyOn(component, 'confirmIsAdmin');
    component.ngOnInit();
    expect(spyConfirmIsAdminHR).toHaveBeenCalledWith('HR');
  });

  it('Should set isAdmin to true if user is HR or PM or DH on calling confirmIsAdmin', () => {
    // User is role is HR
    component.confirmIsAdmin("HR");
    expect(component.isAdmin).toBe(true);

    // User is role is PM
    component.confirmIsAdmin("PM");
    expect(component.isAdmin).toBe(true);

    // User is role is DH
    component.confirmIsAdmin("DH");
    expect(component.isAdmin).toBe(true);
  });

  it('Should set isAdmin to false if user is not HR or PM or DH on calling confirmIsAdmin', () => {
    // User is role is HR
    component.confirmIsAdmin("developer");
    expect(component.isAdmin).toBe(false);
  });

  it('Should toggle isSideBarActivated to true or false on calling onExpandSidebar', () => {
    //isSideBarActivated is true
    component.isSideBarActivated = true;
    component.onExpandSidebar();
    expect(component.isSideBarActivated).toBe(false);

    //isSideBarActivated is false
    component.isSideBarActivated = false;
    component.onExpandSidebar();
    expect(component.isSideBarActivated).toBe(true);
  });

  it('Should call userLogout on calling onLogOut', () => {
    const spyUserLogout = spyOn(
      service,
      'userLogOut'
    )
    component.onLogout();
    expect(spyUserLogout).toHaveBeenCalled();
  })


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
