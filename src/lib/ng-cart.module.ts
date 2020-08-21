import { NgModule } from '@angular/core';

import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
//import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { DishCalcProDirective } from './directives/dish-calc-pro.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';
import { DishCalcComponent } from './components/dish-calc/dish-calc.component';

const DIRECTIVES = [
  AddDishToCartDirective,
  AmountCartDirective,
  DeleteFromCartDirective,
  OrderCartUserDirective,
  //ModifiresDirective,
  DishCalcDirective,
  DishCalcProDirective,
  SetDishCommentDirective,
  SetAmountDirective,
  CheckoutDirective,
];

const COMPONENTS = [
  DishCalcComponent
];

const MODULES = [
];

@NgModule({
  imports: [MODULES],
  providers: [],
  declarations: [DIRECTIVES, COMPONENTS],
  exports: [DIRECTIVES, COMPONENTS]
})
export class NgRestoCartModule { }
