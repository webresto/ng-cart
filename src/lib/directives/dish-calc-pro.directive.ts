import { Directive, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[dishCalcPro]'
})
export class DishCalcProDirective implements OnDestroy {

  @Input()  dish:any;
  @Input()  amount:any;
  @Input()  selectedModifiers:any;
  @Output()  validate:EventEmitter<any> = new EventEmitter();
  @Output()  amountDishToAdd:EventEmitter<any> = new EventEmitter();

  weightTotal;
  amountDish;
  price;
  amountModifires:any = {};
  stateModifiers:any = {};

  constructor(private cartService:NgRestoCartService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.validate.emit(true);
    this.cartService.setModifires([], []);
  }

}
