import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Cart, NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstAddToCart]'
})
export class AddDishToCartDirective {

  cart:Cart;
  @Input() modifires: any;

  constructor(private cartService: NgRestoCartService) {

    const sub = this.cartService.userCart().pipe(
      switchMap(
        res => {
          this.cart = res;
          return this.cartService.getModifires();
        })
    ).subscribe(
      res => this.modifires = res, () => { }, () => sub.unsubscribe()
    );
  }


  @Input() dish: any;
  @Input() amountDish: any;
  @Input() comment: string;

  @Output() loading = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<any>();

  @HostListener('click')
  onClick() {
    this.addDishToCart(this.dish.id, this.amountDish)
  }

  private addDishToCart(dishID, amount) {

    let data = {
      dishId: dishID,
      amount: amount,
      cartId: undefined,
      modifiers: this.modifires,
      comment: this.comment
    };

    if (this.cart.cartId) data.cartId = this.cart.cartId;

    this.loading.emit(true);

    const sub = this.cartService
      .addDishToCart$(data)
      .subscribe(
        () => this.success.emit(true),
        e => this.error.emit(e),
        () => {
          this.loading.emit(false);
          sub.unsubscribe();
        }
      );
  }

}
