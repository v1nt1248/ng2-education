import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.service';

@Injectable()
export class GuardService implements CanActivate{

  constructor(
    private _router: Router,
    private _common: CommonService
  ) { }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route);
    console.log(state);
    if (!!this._common.getUserData()) {
      if (!!this._common.getUserData().uid) {
        return true;
      }
    }

    this._router.navigate(['/login']);
    return false;
  }

}
