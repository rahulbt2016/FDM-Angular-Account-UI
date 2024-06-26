import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddAccountFormComponent } from './components/add-account-form/add-account-form.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addAccount', component: AddAccountFormComponent },
  { path: 'updateAccount/:accountId', component: UpdateAccountComponent },
  { path: '**', component: NotFoundComponent },
];
