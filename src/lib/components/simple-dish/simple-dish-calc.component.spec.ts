import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDishCalcComponent } from './simple-dish-calc.component';

describe('SimpleDishCalcComponent', () => {
  let component: SimpleDishCalcComponent;
  let fixture: ComponentFixture<SimpleDishCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleDishCalcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDishCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
