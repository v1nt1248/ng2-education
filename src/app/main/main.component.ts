import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';
import { CommonService } from '../common/services/common.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private _af: AngularFire,
    private _router: Router,
    private _common: CommonService
  ) { }

  ngOnInit() {
  }

  exit(): void {
    this._common.setUserData({auth: null, uid: null, provider: null});
    this._af.auth.logout()
      .then(res => {
        this._router.navigate(['login']);
      });
  }

}
