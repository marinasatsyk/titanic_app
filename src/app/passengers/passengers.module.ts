import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardService } from '../guard.service';
import { PassengersComponent } from './passengers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {Routes, RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';


const passengersRoutes: Routes = [
  {
  path: 'passengers',
  canActivate: [GuardService], //route protegée
  component: PassengersComponent
  },
  // {
  //   path:'pokemon/:id',
  //   canActivate: [GuardService], //route protegée
  //   component: PokemonDetailComponent
  // },
];




@NgModule({
  declarations: [
    PassengersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(passengersRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class PassengersModule { }
