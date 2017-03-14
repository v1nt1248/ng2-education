import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.contact$ = this._route.data.pluck('contact');
  }

  ngOnInit() {
    this.contact$.subscribe(val => {
      this.contact = val;
      console.log(this.contact);
    })
  }

}
