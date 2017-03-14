import { FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainResolverService implements Resolve<app.Contact[]> {

  constructor(
    private _af: AngularFire
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<app.Contact[]> {
    const contacts = this._af.database.list('/contacts');
    contacts.subscribe(res => {
      console.log(res);
    });
    return contacts;
  }
}
