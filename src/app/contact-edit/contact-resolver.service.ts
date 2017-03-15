import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';

@Injectable()
export class ContactResolverService implements Resolve<app.Contact> {
  private list$: FirebaseListObservable<app.Contact[]>;

  constructor(
    private _af: AngularFire
  ) {
    this.list$ = this._af.database.list('/contacts');
  }

  resolve(route: ActivatedRouteSnapshot): Observable<app.Contact> {
    const id = route.params['id'];
    console.log(`id: ${id}`);
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
      return this.list$
        .do(value => console.log(value))
        .filter((value: app.Contact) => value.id === id);
    }
  }

}
