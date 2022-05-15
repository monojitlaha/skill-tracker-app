import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCreds } from 'src/app/models/login-creds.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCreds: any;
  token:any = "";
  constructor(private router: Router, private loginService: LoginService) { 


  }

  ngOnInit(): void {
  }

  login(username: string, password: string):void {
    
    console.log("Username =" + username + ";" + "Password ="+ password);
    this.loginCreds = new LoginCreds(username, password);
    console.log(this.loginCreds); 
    
    this.token = this.loginService.login(this.loginCreds)    
    .subscribe( 
      {
        next(num) { console.log("Component Token next = "+num); },
        error(){console.log('Error Occured');},
        complete() { 
          console.log('Finished sequence');           
        }
      }       
      );
    
    
      
      if(this.token!=null)
      {
        console.log("Component Token ="+ this.token);
        this.router.navigate(['/profile']);
        
      }
        

    // setTimeout(() => {
    //   this.router.navigate(['/profile']);
    // }, 1000);
  }
}
