import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ApiService} from "../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private api: ApiService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.api.apiToken == null){
      this.router.navigate(["/login"]);
      return false;
    }
    if (this.api.apiToken.roles[0] == 'ADMIN'){
      return true;
    }
    if (this.api.apiToken.roles[0] != 'ADMIN'){
      this.router.navigate(["/home"]);
      return false;
    }
    this.router.navigate(["/home"]);
    return false;
  }

}
