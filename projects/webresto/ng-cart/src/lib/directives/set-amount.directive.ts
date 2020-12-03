import { Directive, Input, HostListener } from '@angular/core';
import { Cart, NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstSetDishAmount]'
})
export class SetAmountDirective {
  @Input() action: any;
  @Input() dish: any;

  @HostListener('click') onClick() {
    this.changeAmount(this.action);
  }

  cart:Cart;

  constructor(private cartService: NgRestoCartService) {
    const sub = this.cartService.userCart().subscribe(
      res => this.cart = res, () => { }, () => sub.unsubscribe()
    );
  }

  changeAmount(action) {

    switch (action) {
      case '+':
        this.cartService.setDishCountToCart(
          this.dish.id,
          this.dish.amount + 1
        );
        break;
      case '-':
        this.cartService.setDishCountToCart(
          this.dish.id,
          this.dish.amount - 1
        );
        break;
      default:
        console.log("Директива SetDishAmount получила ложное значение action");
        break;
    }

  }

}
