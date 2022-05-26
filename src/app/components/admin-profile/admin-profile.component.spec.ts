import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AdminProfileComponent } from './admin-profile.component';

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get', 'put']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileComponent ],
      providers: [FormBuilder,
        { provide: HttpClient, useValue: httpClientSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    httpClientSpy.post.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.get.and.returnValue(of({ status: 200, data: {} }));
    httpClientSpy.put.and.returnValue(of({ status: 200, data: {} }));
    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
