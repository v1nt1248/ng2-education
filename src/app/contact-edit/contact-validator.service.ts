import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ContactValidatorService {

  constructor() { }

  public nameValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^[a-zа-я ё]*$/i).test(value);
    return (valid || value === null) ? null : {nameError: true};
  }

  public stringValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^[a-zа-я ё0-9'"(*_)-]*$/i).test(value);
    return (valid || value === null) ? null : {stringError: true};
  }

  public emailValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value);
    return (valid || value === null ) ? null : {emailError: true};
  }

  public phoneValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^[0-9 :+(_)-]*$/i).test(value);
    return (valid || value === null) ? null : {phoneError: true};
  }

}
