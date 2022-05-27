import { Component } from '@angular/core';
import { Router,NavigationEnd, ActivatedRoute    } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'skill-tracker-app';
  isShown: boolean = false ; 
  name = 'Get Current Url Route Demo';
  currentRoute: string;
  userName:string;

  constructor(private router: Router, private route: ActivatedRoute) {     
    console.log(router.url);
    
    this.router.events.subscribe(
      ()=>{console.log('current route: ', this.router.url.toString());
      if(this.router.url.toString()==="/login")
      this.isShown = false;
      else
      this.isShown = true;}
      );
  }

  ngOnInit(): void {

  }

  logout()
  {  
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }


}
