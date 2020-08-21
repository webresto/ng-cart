import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCalcComponent } from './dish-calc.component';

describe('DishCalcComponent', () => {
  let component: DishCalcComponent;
  let fixture: ComponentFixture<DishCalcComponent>;

  beforeEach(async(() => {
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
