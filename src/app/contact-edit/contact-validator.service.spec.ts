/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactValidatorService } from './contact-validator.service';

describe('ContactValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactValidatorService]
    });
  });

  it('should ...', inject([ContactValidatorService], (service: ContactValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
