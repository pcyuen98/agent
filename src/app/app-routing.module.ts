import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { URLFormComponent } from './url-form/url-form.component';

const routes: Routes = [
  {
    path: 'agent/:method/:id',
    component: ReactiveFormComponent
  },
  {
    path: '**',
    component: URLFormComponent
  },
  {
    path: 'url',
    component: URLFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
