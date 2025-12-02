import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailpage } from './product-detailpage';

describe('ProductDetailpage', () => {
  let component: ProductDetailpage;
  let fixture: ComponentFixture<ProductDetailpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
