import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

@Injectable()
export class ContactResolverService implements Resolve<app.Contact> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot): Observable<app.Contact> {
    const id = route.params['id'];
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
      return null;
    }
  }

}
