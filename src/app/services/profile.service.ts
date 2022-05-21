import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Profile } from '../models/Profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }
  createProfile(profile:Profile): Observable<any> {
    const body=JSON.stringify(profile);
    console.log(body)
    return this.http.post(environment.baseApiUrl + 'engineer/profile/create', body, httpOptions);
  }

  updateProfile(id:string, profile:Profile): Observable<any> {
    const body=JSON.stringify(profile);
    console.log(body)
    return this.http.put(environment.baseApiUrl + 'engineer/profile/update/' + id, body, httpOptions);
  }
}