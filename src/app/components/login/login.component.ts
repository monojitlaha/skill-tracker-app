import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCreds } from 'src/app/models/logincreds';
import { LoginProfile } from 'src/app/models/login-profile';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCreds: any;
  token:any = "";
  authData:any;
  profiles:boolean=false;
  constructor(private router: Router, 
    private loginService: LoginService) { 
  

  }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {
    
    console.log("Username =" + username + ";" + "Password =" + password);
    this.loginCreds = new LoginCreds(username, password);
    console.log(this.loginCreds);

    this.loginService.login(this.loginCreds)
      .subscribe((data) => {
        if (data) {
          
          this.authData = data;
          console.log("Component Token =" + this.authData);
          localStorage.setItem('token', this.authData.token);
          localStorage.setItem('role', this.authData.role);
          if (this.authData && this.authData.role) {
            if (this.authData.role.toLowerCase() === 'admin') {
              this.router.navigate(['/adminprofile']);
            } else {
              this.router.navigate(['/userprofile'], { queryParams: { userName: username } });
            }
        

    // setTimeout(() => {
    //   this.router.navigate(['/profile']);
    // }, 1000);
          }
        }
      },
      error=>{this.profiles = true});
  }
}
