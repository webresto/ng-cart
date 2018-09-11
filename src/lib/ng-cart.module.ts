import { NgModule } from '@angular/core';

import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
import { ModifiresDirective } from './directives/modifires.directive';

const DIRECTIVES = [
  AddDishToCartDirective,
  AmountCartDirective,
  DeleteFromCartDirective,
  OrderCartUserDirective,
  ModifiresDirective
];

const MODULES = [
];

@NgModule({
  imports: [...MODULES],
  providers: [],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES]
})
export class NgCartModule { }
