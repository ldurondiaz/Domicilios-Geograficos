/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CapturarService } from './capturar.service';

describe('Service: Capturar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CapturarService]
    });
  });

  it('should ...', inject([CapturarService], (service: CapturarService) => {
    expect(service).toBeTruthy();
  }));
});
