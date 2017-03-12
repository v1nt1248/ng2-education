import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactValidatorService } from './contact-validator.service';
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
  private contactFormErrors: {[key: string]: string};
  // private baseErrorsText: {
  //   required: app.FieldErrorObj;
  //   minlength: app.FieldErrorObj;
  //   nameError: app.FieldErrorObj;
  //   stringError: app.FieldErrorObj;
  //   emailError: app.FieldErrorObj;
  // };

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _validator: ContactValidatorService
  ) {
    this.contact$ = this._route.data.pluck('contact');
  }

  ngOnInit() {
    // this.baseErrorsText = {
    //   required: {
    //     text: 'Поле обязательно!'
    //   },
    //   minlength: {
    //     limit: true,
    //     text: ' символа минимум!'
    //   },
    //   nameError: {
    //     text: 'Только буквы и пробел!'
    //   },
    //   stringError: {
    //     text: `Буквы, цифры, пробел и символы "(_)-'`
    //   },
    //   emailError: {
    //     text: 'Не валидный email!'
    //   }
    // };

    this.contact$.subscribe(val => {
      this.contact = val;
      this.title = (!!this.contact.id) ? 'Редактирование контакта' : 'Создание нового контакта';
    });
    console.log(this.contact);

    this.buildForm();
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
      firstName: ['', [Validators.required, Validators.minLength(2), this._validator.nameValidator]],
      middleName: ['', [this._validator.nameValidator]],
      lastName: ['', [this._validator.nameValidator]],
      birthDate: [''],
      company: ['', [this._validator.stringValidator]],
      position: ['', [this._validator.stringValidator]]
    });

    this.contactForm.valueChanges
      .subscribe(data => this.haveErrors(data));

    this.haveErrors();
  };

  /**
   * подготовка сообщений об ошибках
   */
  private haveErrors(data?: {[key: string]: any}): void {
    console.log(data);
    for (let field of Object.keys(data)) {
      let errorsText = '';
      // data[field]
    }
  }


}

