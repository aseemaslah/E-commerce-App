import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Termsandcondtions } from './termsandcondtions';

describe('Termsandcondtions', () => {
  let component: Termsandcondtions;
  let fixture: ComponentFixture<Termsandcondtions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Termsandcondtions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Termsandcondtions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
