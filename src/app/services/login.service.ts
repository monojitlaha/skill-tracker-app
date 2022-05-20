import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginCreds } from '../models/login-creds.model';



@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
   token:string = "";

  constructor(private http: HttpClient) { }

  login(logincreds: LoginCreds):Observable<any>{

    return this.http.post(`http://localhost:35020/api/Authentication`, logincreds, { responseType: 'text'})
    .pipe(map(token => {
      console.log('Token in Service = '+ token);
      localStorage.setItem('token', token);      
      return token;
  }));
  }
}
