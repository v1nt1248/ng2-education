import { timeout } from 'rxjs/operator/timeout';
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
  public selectContact: any;
  public mode: string;

  constructor(
    private _af: AngularFire,
    private _router: Router,
    private _common: CommonService
  ) { }

  ngOnInit() {
    this.selectContact = null;
    this.mode = 'show';
  }

  exit(): void {
    this._common.setUserData({auth: null, uid: null, provider: null});
    this._af.auth.logout()
      .then(res => {
        this._router.navigate(['/login']);
      });
  }

  openEditForm(mode: string): void {
    console.log('Modal!');
    // this.mode = mode;
    this._router.navigate(['main', {outlets: {'dialog': ['edit']}}]);
  }

}
