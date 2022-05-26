import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class AuthenticationGuard implements CanActivate {
  path:string;
  profile:string;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(route.url.length == 0)
        return false;
      else
        this.path = route.url[0].path;

      this.profile =  localStorage.getItem("role")??""; 

      if(this.profile== "fse" && this.path == "userprofile")    
        return true;    
      else if(this.profile== "admin" && this.path == "adminprofile")    
        return true;
      else
      {
        this.router.navigate(['/login']);
        return false;
      }

  }  
}
