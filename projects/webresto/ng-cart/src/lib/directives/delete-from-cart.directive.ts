import { Directive, HostListener, Input } from '@angular/core';
import { Cart, NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstDeleteFromCart]'
})
export class DeleteFromCartDirective {

  cart:Cart;

  constructor(private cartService: NgRestoCartService) {
    const sub = this.cartService.userCart().subscribe(
      res => this.cart = res, () => { }, () => sub.unsubscribe()
    );
  }


  @Input() dish: any;
  @Input() amountDish: any;

  @HostListener('click')
  onClick() {
    this.cartService.removeDishFromCart(this.dish.id, this.amountDish)
  }

}
