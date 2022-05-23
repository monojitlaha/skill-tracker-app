import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let fakeActivatedRoute = {
    paramMap: of(convertToParamMap({ username: 'test' })),
    queryParamMap: of(convertToParamMap({ query: 'active' }))};

  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [FormBuilder,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: HttpClient, useValue: httpClientSpy }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
