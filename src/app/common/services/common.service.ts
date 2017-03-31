import { emit } from 'cluster';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CommonService {
  private userData: app.Auth;
  private emit: Subject<app.Contact> = new Subject<app.Contact>();

  constructor() { }

  private ngOnInint() {
    this.userData = {
      auth: null,
      uid: null,
      provider: null
    };
  }

  public setUserData(data: app.Auth): void {
    this.userData = data;
  }

  public getUserData(): app.Auth {
    return this.userData;
  }

  public prepareEvent(contact: app.Contact): void {
    this.emit.next(contact);
    this.emitEvent();
  }

  public emitEvent(): Observable<app.Contact> {
    return this.emit.asObservable();
  }

}
