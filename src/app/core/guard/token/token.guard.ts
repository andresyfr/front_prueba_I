import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router} from '@angular/router';

import { LoginService } from '@feature/login/shared/services/login/login.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  
  constructor(
    private loginService: LoginService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):Promise<boolean> | UrlTree | Promise<boolean | UrlTree> | boolean | UrlTree{
    if(this.loginService.estAautenticado()){
      return true;
    }else{
      return this.router.parseUrl('/login');
    }
  }

}
