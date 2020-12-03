import { Directive, Renderer2, ElementRef } from '@angular/core';
import { Cart, NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstAmountCart]'
})
export class AmountCartDirective {
  cart: Cart;
  amount: string;

  constructor(
    private cartService: NgRestoCartService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {

    this.amount = '0';
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
    const sub = this.cartService.userCart().subscribe(
      res => {
        this.cart = res;
        this.amount = String(res.dishesCount || 0);
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
      },
      () => { }, () => sub.unsubscribe()
    );
  }


}
