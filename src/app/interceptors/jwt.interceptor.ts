import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        
        const isApiUrl = request.url.startsWith(environment.baseApiUrl);
        if (isApiUrl) {
            const authData:string = localStorage.getItem('token')??"";
            if(authData) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authData}`
                }
            });
          }
        }

        return next.handle(request);
    }
}
