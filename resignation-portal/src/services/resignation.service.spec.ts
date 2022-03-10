import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResignationService } from './resignation.service';

describe('ResignationService', () => {
  let service: ResignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule]
    });
    service = TestBed.inject(ResignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
