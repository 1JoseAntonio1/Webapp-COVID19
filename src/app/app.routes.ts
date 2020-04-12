import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Covid19Component } from './pages/covid19/covid19.component';

const app_routes: Routes = [
  {path: 'covid19', component: Covid19Component},
  {path: '**', pathMatch: 'full', redirectTo: 'covid19'}
];

@NgModule({
  imports: [
    RouterModule.forRoot( app_routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
