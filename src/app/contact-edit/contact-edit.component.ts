import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2'
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MdSnackBar } from '@angular/material';
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
  private contactList: FirebaseListObservable<app.Contact[]>;

  constructor(
    private _af: AngularFire,
    private _router: Router,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _toast: MdSnackBar,
    private _validator: ContactValidatorService
  ) {
    this.contact$ = this._route.data.pluck('contact');
    this.contactList = this._af.database.list('/contacts');
  }

  ngOnInit() {
    this.baseErrorsText = [
      {name: 'required', text: 'Поле обязательно!'},
      {name: 'minlength', limit: true, text: 'символа минимум!'},
      {name: 'nameError',  text: 'Только буквы и пробел!'},
      {name: 'stringError', text: `Буквы, цифры, пробел и символы "(*_)-'`},
      {name: 'emailError', text: 'Не валидный email!'},
      {name: 'phoneError', text: `Цифры, пробел и символы :+(_)-`}
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
      firstName: [this.contact.firstName, [Validators.required, Validators.minLength(2), this._validator.nameValidator]],
      middleName: [this.contact.middleName, [this._validator.nameValidator]],
      lastName: [this.contact.lastName, [this._validator.nameValidator]],
      birthDate: [this.contact.birthDate],
      company: [this.contact.company, [this._validator.stringValidator]],
      position: [this.contact.position, [this._validator.stringValidator]],
      phone: [this.contact.phone, [this._validator.phoneValidator]],
      email: [this.contact.email, [this._validator.emailValidator]],
      place: [this.contact.place, [this._validator.stringValidator]]
    });

    this.contactForm.valueChanges
      .do(data => {
        for (const field of Object.keys(data)) {
          this.contact[field] = data[field];
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

  /**
   * удаление аватарки
   */
  delAvatar(): void {
    this.contact.avatar = null;
  }

  /**
   * получение данных файла картинки
   */
  private getImg($event): void {
    this.contact.avatar = $event;
  }
  /**
   * получение информации об ошибке при чтении файла картинки
   */
  private getError($event): void {
    this._toast.open($event, null, {duration: 1500, extraClasses: ['errorMsg']});
  }

  /**
   * сохранение контакта
   */
  saveContact() {
    // console.log(JSON.stringify(this.contact, null, 2));
    if (this.contact.id === null) {
      this.contact.id = new Date().getTime() + '';
      this.contactList.push(this.contact)
        .then(res => {
          // console.log(res);
          const newId = res.path.o[1];
          this.contact.id = newId;
          this.contactList.update(newId, this.contact);
        })
        .then(res => {
          const notif = this._toast.open('Контакт сохранен!', null, {duration: 1500, extraClasses: ['successMsg']});
          notif.afterDismissed().subscribe(() => {
            this.closeModal();
          });
        })
        .catch(err => {
          console.error(err);
          this._toast.open('Ошибка при записи контакта! Попробуйте позже.', null, {duration: 1500, extraClasses: ['errorMsg']});
        });
    }
  }



}

