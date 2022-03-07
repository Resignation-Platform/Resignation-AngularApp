import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExittrackingComponent } from './exittracking.component';

describe('ExittrackingComponent', () => {
  let component: ExittrackingComponent;
  let fixture: ComponentFixture<ExittrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExittrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExittrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
