import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [  
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'userprofile', pathMatch: 'full', component: UserProfileComponent, canActivate:[AuthenticationGuard]},
  { path: 'adminprofile', pathMatch: 'full', component: AdminProfileComponent, canActivate:[AuthenticationGuard]},
  { path: '**',  redirectTo: '/login', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
