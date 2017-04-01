import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import { CommonService } from '../common/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: app.Login;

  @ViewChild('signinForm') currentForm: NgForm;

  constructor(
    private _af: AngularFire,
    private _router: Router,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this.user = {
      name: null,
      password: null
    };
  }

  public submit(): void {
    this._common.spinnerStart();
    this._af.auth.login({
      email: this.user.name,
      password: this.user.password,
    },
    {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    })
    .then((res) => {
      this._common.setUserData(res);
      this._router.navigate(['/main']);
    })
    .catch((err) => {
      console.error(err);
      this.currentForm.form.controls['login'].setErrors({'auth': true});
      this.currentForm.form.controls['password'].setErrors({'auth': true});
      this._common.spinnerStop();
    });
  }


}
