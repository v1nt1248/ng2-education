/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactEditService } from './contact-edit.service';

describe('ContactEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactEditService]
    });
  });

  it('should ...', inject([ContactEditService], (service: ContactEditService) => {
    expect(service).toBeTruthy();
  }));
});
