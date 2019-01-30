import { NgModule } from '@angular/core';

import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
//import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';

const DIRECTIVES = [
  AddDishToCartDirective,
  AmountCartDirective,
  DeleteFromCartDirective,
  OrderCartUserDirective,
  //ModifiresDirective,
  DishCalcDirective,
  SetAmountDirective,
  CheckoutDirective,
  SetDishCommentDirective
];

const MODULES = [
];

@NgModule({
  imports: [MODULES],
  providers: [],
  declarations: [DIRECTIVES],
  exports: [DIRECTIVES]
})
export class NgRestoCartModule { }
