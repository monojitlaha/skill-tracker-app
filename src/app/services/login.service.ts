import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginCreds } from '../models/logincreds';
import { environment } from '../../environments/environment';
import { LoginProfile } from '../models/login-profile';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }

  login(logincreds: LoginCreds): Observable<LoginProfile> {
    return this.http.post<LoginProfile>(environment.authApiUrl + 'api/Authentication', logincreds)
      .pipe(map(result => {
        console.log('Auth Data:' + result);
        return result;
      }));
  }
}
