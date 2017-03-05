import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class CommonService {
  private userData: app.Auth;

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

}
