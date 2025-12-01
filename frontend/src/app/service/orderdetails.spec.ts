import { TestBed } from '@angular/core/testing';

import { Orderdetails } from './orderdetails';

describe('Orderdetails', () => {
  let service: Orderdetails;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Orderdetails);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
