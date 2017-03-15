import { timeout } from 'rxjs/operator/timeout';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../common/services/common.service';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  private contacts$: FirebaseListObservable<app.Contact[]>;
  private contacts: app.Contact[];
  private selectContactId: string;
  private mode: string;

  constructor(
    private _af: AngularFire,
    private _router: Router,
    private _route: ActivatedRoute,
    private _common: CommonService
  ) {
    this.contacts$ = this._af.database.list('/contacts');
  }

  ngOnInit() {
    this.selectContactId = null;
    this.mode = 'show';
    this.contacts$.subscribe(val => {
      this.contacts = val;
      console.log(this.contacts);
    });
  }

  select(contact: app.Contact): void {
    this.selectContactId = contact.id;
    this._router.navigate(['main', {outlets: {'content': ['contact', this.selectContactId]}}]);
  }

  exit(): void {
    this._common.setUserData({auth: null, uid: null, provider: null});
    this._af.auth.logout()
      .then(res => {
        this._router.navigate(['/login']);
      });
  }

  openEditForm(id: string): void {
    this._router.navigate(['main', {outlets: {'dialog': ['editor', id], 'content': ['no-contact']}}]);
  }

}
