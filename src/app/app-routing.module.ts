import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { URLFormComponent } from './url-form/url-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { DonateFormComponent } from './donate-form/donate-form.component';

const routes: Routes = [
  {
    path: 'agent/:method/:id',
    component: ReactiveFormComponent
  },
  {
    path: '',
    component: URLFormComponent
  },
  {
    path: 'donate',
    component: DonateFormComponent
  },
  {
    path: 'url',
    component: URLFormComponent
  },
  {
    path: 'register',
    component: RegisterFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
