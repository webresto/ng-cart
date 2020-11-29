import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishCalcLnComponent } from './dish-calc-ln.component';

describe('DishCalcLnComponent', () => {
  let component: DishCalcLnComponent;
  let fixture: ComponentFixture<DishCalcLnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishCalcLnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishCalcLnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
