import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GuardService } from './guard.service';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PassengersComponent } from './passengers/passengers/passengers.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'passengers',
        canActivate: [GuardService], //route protegée
        component: PassengersComponent, // à changer contre  PassengersComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
    //   {
    //     path:'passenger/:id',
    //     canActivate: [GuardService], //route protegée
    //     component: UserDetailComponent
    //   },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
