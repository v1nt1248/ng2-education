import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { CommonService } from '../common/services/common.service';
import { ConfirmDialogService } from './confirm-dialog.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private contact$: Observable<app.Contact>;
  private contact: app.Contact;
  private contactEdited$: Observable<app.Contact>
  private contactList$: FirebaseListObservable<app.Contact[]>

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _af: AngularFire,
    private _common: CommonService,
    private _dialog: ConfirmDialogService
  ) {
    this.contact$ = this._route.data.pluck('contact');
    // console.log(this.contact$);
    this.contactEdited$ = this._common.emitEvent();
    this.contactList$ = this._af.database.list('/contacts');
  }

  ngOnInit() {
    this.contact$.subscribe(val => {
      this.contact = val;
      // console.log(this.contact);
    });
    this.contactEdited$.subscribe(val => {
      this.contact = val;
      // console.log(`Edited contact!`);
    })
  }

  private editContact(): void {
    this._router.navigate(['main', {outlets: {'dialog': ['editor', this.contact.id]}}]);
  }

  private delContact(): void {
    this._dialog
      .confirm()
      .subscribe(res => {
        if (res) {
          this.contactList$.remove(this.contact.id);
          this._router.navigate(['main', {outlets: {'content': ['no-contact']}}]);
        }
      });
  }

}

