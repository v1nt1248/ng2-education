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

  public spinnerStart(): void {
    if (!document.querySelector('#spinner')) {
      const bodyElem = document.querySelector('body');
      const spinnerElem = document.createElement('img');
      spinnerElem.src = 'assets/wait.gif';
      spinnerElem.id = 'spinner';
      spinnerElem.style.width = '150px';
      spinnerElem.style.height = '150px';
      spinnerElem.style.position = 'fixed';
      spinnerElem.style.top = 'calc(50% - 75px)';
      spinnerElem.style.left = 'calc(50% - 75px)';
      spinnerElem.style.zIndex = '5000';
      bodyElem.appendChild(spinnerElem);
    }
  }

  public spinnerStop(): void {
    if (document.querySelector('#spinner')) {
      const spinnerElem = document.querySelector('#spinner');
      spinnerElem.remove();
    }
  }

}
