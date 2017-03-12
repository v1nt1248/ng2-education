import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactValidatorService } from './contact-validator.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/do';

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
  private baseErrorsText: app.ErrorTextObj[];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _validator: ContactValidatorService
  ) {
    this.contact$ = this._route.data.pluck('contact');
  }

  ngOnInit() {
    this.baseErrorsText = [
      {name: 'required', text: 'Поле обязательно!'},
      {name: 'minlength', limit: true, text: 'символа минимум!'},
      {name: 'nameError',  text: 'Только буквы и пробел!'},
      {name: 'stringError', text: `Буквы, цифры, пробел и символы "(_)-'`},
      {name: 'emailError', text: 'Не валидный email!'}
    ];
    this.contactFormErrors = {};

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
      .do(data => {
        for (const field of Object.keys(data)) {
          this.contact.base[field] = data[field];
        }
      })
      .subscribe(data => this.haveErrors(data));

    this.haveErrors();
  };

  /**
   * подготовка сообщений об ошибках
   */
  private haveErrors(data?: {[key: string]: any}): void {
    // console.log(data);
    if (!!data) {
      for (const field of Object.keys(this.contactForm.controls)) {
        let errorsFieldText = '';
        if (this.contactForm.controls[field].invalid) {
          this.baseErrorsText.forEach(validator => {
            errorsFieldText += (!this.contactForm.controls[field].errors[validator.name]) ? '' : ((!!validator.limit) ? `${this.contactForm.controls[field].errors[validator.name].requiredLength} ${validator.text} ` : `${validator.text} `);
          });
        }
        this.contactFormErrors[field] = errorsFieldText;
      }
    }
  }



}

