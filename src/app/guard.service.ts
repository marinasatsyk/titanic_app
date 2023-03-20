import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class GuardService   implements CanActivate  {
//  private canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
  constructor(
    private uS: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | boolean
  {
    if( !sessionStorage.getItem('user') )
    {
      this.router.navigateByUrl('/login');
    }
    else
    {
      const jsonUser: null | string = sessionStorage.getItem('user');
      if( jsonUser )
      {
        const userToCheck = JSON.parse( jsonUser );

        this.uS.checkAuth( {name: userToCheck.name, email: userToCheck.email, password: userToCheck.password} ).subscribe( (res: any) => {
          if(!res.isValid)
          {
            sessionStorage.clear();
            this.router.navigateByUrl('/login');
          }
        })
      }
      else
      {
        this.router.navigateByUrl('/login');
      }
    }
  }
  
}
