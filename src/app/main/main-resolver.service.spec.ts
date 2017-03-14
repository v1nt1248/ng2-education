/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MainResolverService } from './main-resolver.service';

describe('MainResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainResolverService]
    });
  });

  it('should ...', inject([MainResolverService], (service: MainResolverService) => {
    expect(service).toBeTruthy();
  }));
});
