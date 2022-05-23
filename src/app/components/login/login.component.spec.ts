import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: HttpClient, useValue: httpClientSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
    fixture = TestBed.createComponent(LoginComponent);    
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
