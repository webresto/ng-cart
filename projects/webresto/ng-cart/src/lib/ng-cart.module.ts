import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';
import { DishCalcComponent } from './components/dish-calc/dish-calc.component';

@NgModule({
  imports: [CommonModule],
  providers: [],
  declarations: [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    ModifiresDirective,
    DishCalcDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
    DishCalcComponent
  ],
  exports: [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    ModifiresDirective,
    DishCalcDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
    DishCalcComponent
  ]
})
export class NgRestoCartModule { }
