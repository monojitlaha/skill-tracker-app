import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);
  httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
  httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
  httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor,
      { provide: HttpClient, useValue: httpClientSpy }
      ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
