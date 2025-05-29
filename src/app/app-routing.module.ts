import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './website/pages/index/index.component';
import { PhotosComponent } from './website/pages/photos/photos.component';
import { CompetitionsComponent } from './website/pages/competitions/competitions.component';
import { SignupComponent } from './app/pages/signup/signup.component';
import { LoginComponent } from './app/pages/login/login.component';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'competitions', component: CompetitionsComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
