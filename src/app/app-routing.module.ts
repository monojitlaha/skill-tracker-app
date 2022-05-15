import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', pathMatch: 'full', component: LoginComponent},
  { path: 'profile', pathMatch: 'full', component: ProfileComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
