import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Profile } from '../models/profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getProfiles(): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'Admin', httpOptions);
  }

  getProfileByCriteria(key:string, value:string): Observable<any> {
    return this.http.get(environment.baseApiUrl + 'Admin/' + key +'/' + value, httpOptions);
  }

  createProfile(profile:Profile): Observable<any> {
    const body=JSON.stringify(profile);
    console.log(body)
    return this.http.post(environment.baseApiUrl + 'Engineer', body, httpOptions);
  }

  updateProfile(id:string, profile:Profile): Observable<any> {
    const body=JSON.stringify(profile);
    console.log(body)
    return this.http.put(environment.baseApiUrl + 'Engineer/' + id, body, httpOptions);
  }
}