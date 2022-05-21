import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCreds } from 'src/app/models/login-creds';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCreds: any;
  authData: any;
  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit(): void {
  }

  login(username: string, password: string): void {

    console.log("Username =" + username + ";" + "Password =" + password);
    this.loginCreds = new LoginCreds(username, password);
    console.log(this.loginCreds);

    this.loginService.login(this.loginCreds)
      .subscribe((data) =>
        {
          if (data) {
            this.authData = data;
            console.log("Component Token =" + this.authData);
            localStorage.setItem('token', this.authData);
            this.router.navigate(['/userprofile'], { queryParams: { userName: username } });
          }
        });
  }
}
