import { TestBed, inject } from '@angular/core/testing';

import { NgRestoCartService } from './ng-restocart.service';

describe('SailsRestoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgRestoCartService]
    });
  });

  it('should be created', inject([NgRestoCartService], (service: NgRestoCartService) => {
    expect(service).toBeTruthy();
  }));
});
