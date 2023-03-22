import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardService } from '../guard.service';
import { PassengersComponent } from './passengers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';
import { BarchartComponent } from './barchart/barchart.component';
import { NgChartsModule } from 'ng2-charts';
import { PiechartComponent } from './piechart/piechart.component';

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
    declarations: [PassengersComponent, HeaderComponent, SearchComponent, BarchartComponent, PiechartComponent],
    imports: [
        CommonModule,
        RouterModule.forRoot(passengersRoutes),
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        NgChartsModule,
    ],
})
export class PassengersModule {}
