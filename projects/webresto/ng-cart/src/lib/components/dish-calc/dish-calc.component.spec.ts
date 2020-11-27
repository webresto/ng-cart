import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DishCalcComponent } from './dish-calc.component';

describe('DishCalcComponent', () => {
  let component: DishCalcComponent;
  let fixture: ComponentFixture<DishCalcComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
