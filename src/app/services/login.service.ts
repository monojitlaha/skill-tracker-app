import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginCreds } from '../models/logincreds';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }

  login(logincreds: LoginCreds): Observable<any> {
    return this.http.post(environment.authApiUrl + 'api/Authentication', logincreds, { responseType: 'text' })
      .pipe(map(result => {
        console.log('Auth Data:' + result);
        return result;
      }));
  }
}
