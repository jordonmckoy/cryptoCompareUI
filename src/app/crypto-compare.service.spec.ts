/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CryptoCompareService } from './crypto-compare.service';

describe('CryptoCompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptoCompareService]
    });
  });

  it('should ...', inject([CryptoCompareService], (service: CryptoCompareService) => {
    expect(service).toBeTruthy();
  }));
});
