import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export  class  AuthGuard  {
   constructor(private authService : AuthService,
               private router : Router) {
   }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      if(this.authService.authenticated ==true){
        return true;
      } else {
        this.router.navigateByUrl("/login")
        return false;
      }

  }
}
