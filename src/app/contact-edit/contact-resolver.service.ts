import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/take';


@Injectable()
export class ContactResolverService implements Resolve<app.Contact> {

  constructor(
    private _af: AngularFire
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<app.Contact> | FirebaseObjectObservable<app.Contact> {
    const id = route.params['id'];
    // console.log(`id: ${id}`);
    if (id === 'new') {
      return Observable.from([
        {
          id: null,
          avatar: null,
          firstName: null,
          middleName: null,
          lastName: null,
          birthDate: null,
          company: null,
          position: null,
          phone: null,
          email: null,
          place: null
        }
      ]);
    } else {
      return this._af.database.object(`/contacts/${id}`).take(1);
    }
  }

}
