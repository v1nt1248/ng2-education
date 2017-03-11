import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ContactValidatorService {

  constructor() { }

  public nameValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^[a-zа-я ё]*$/i).test(value);
    return valid ? null : {nameError: true};
  }

  public stringValidator(item: FormControl): {[key: string]: boolean} {
    const value = item.value || null;
    const valid = (/^[a-zа-я ё0-9'"()-]*$/i).test(value);
    return valid ? null : {stringError: true};
  }

}
