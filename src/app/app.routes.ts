import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddAccountFormComponent } from './components/add-account-form/add-account-form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addAccount', component: AddAccountFormComponent },
];
