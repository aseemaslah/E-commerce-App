import { TestBed } from '@angular/core/testing';

import { CartpageService } from './cartpage-service';

describe('CartpageService', () => {
  let service: CartpageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartpageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
