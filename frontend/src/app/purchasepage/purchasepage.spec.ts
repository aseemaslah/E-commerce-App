import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchasepage } from './purchasepage';

describe('Purchasepage', () => {
  let component: Purchasepage;
  let fixture: ComponentFixture<Purchasepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Purchasepage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Purchasepage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
