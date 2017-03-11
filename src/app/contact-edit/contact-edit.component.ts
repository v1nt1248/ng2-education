import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ContactValidatorService } from './contact-validator.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})

export class ContactEditComponent implements OnInit {
  private contact$: Observable<app.Contact>;
  private contact: app.Contact;
  private title: string;
  private contactForm: FormGroup;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder//,
    // private _validator: ContactValidatorService
  ) {
    this.contact$ = this._route.data.pluck('contact');
  }

  ngOnInit() {
    this.contact$.subscribe(val => {
      this.contact = val;
      this.title = (!!this.contact.id) ? 'Редактирование контакта' : 'Создание нового контакта';
    });
    console.log(this.contact);
  }

  /**
   * закрытие модального окна
   */
  private closeModal(): void {
    this._router.navigate(['main', {outlets: {'dialog': null}}]);
  }

  /**
   * создание формы
   */
  private buildForm(): void {
    this.contactForm = this._fb.group({
      firstName: [this.contact.base.firstName, [Validators.required, Validators.minLength(2), this._validator.nameValidator]],
      middleName: [this.contact.base.middleName, [this._validator.nameValidator]],
      lastName: [this.contact.base.lastName, [this._validator.nameValidator]],
      birthDate: [this.contact.base.birthDate],
      company: [this.contact.base.company, [this._validator.stringValidator]],
      position: [this.contact.base.position, [this._validator.stringValidator]]
    });

    this.contactForm.valueChanges
      .subscribe(data => this.prepareErrorsText(data));

    this.prepareErrorsText();
  };

  /**
   * подготовка сообщений об ошибках
   */
  private prepareErrorsText(data?): void {
    console.log(data);
  }

}

