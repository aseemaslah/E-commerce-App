import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Developerinformation } from './developerinformation';

describe('Developerinformation', () => {
  let component: Developerinformation;
  let fixture: ComponentFixture<Developerinformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Developerinformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Developerinformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
