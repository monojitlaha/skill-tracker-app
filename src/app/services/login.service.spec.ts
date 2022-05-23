import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;
  
  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientSpy }
        ]
    });
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
