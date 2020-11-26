import { Directive , HostListener, Input, Output, EventEmitter} from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';


@Directive({
  selector: '[addToCart]'
})
export class AddDishToCartDirective {

  cart;
  modifires;

  constructor(private cartService:NgRestoCartService) {

    this.cartService
      .userCart()
      .subscribe(res => this.cart = res);

    this.cartService
      .getModifires()
      .subscribe(res => this.modifires = res);

  }


  @Input() dish:any;
  @Input() amountDish:any;
  @Input() comment:string;
  @Input() replaceCartDishId:boolean;

  @Output() loading = new EventEmitter<boolean>();
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<any>();

  @HostListener('click')
  onClick() {
    this.addDishToCart(this.dish.id, this.amountDish)
  }

  private addDishToCart(dishID, amount) {

    let data = {
      "dishId": dishID,
      "amount": amount,
      "cartId": undefined,
      "modifiers": this.modifires,
      "comment": this.comment,
      "replace": this.replaceCartDishId ? true : undefined,
      "cartDishId": this.replaceCartDishId
    };

    if (this.cart.cartId) data.cartId = this.cart.cartId;

    this.loading.emit(true);

    this.cartService
      .addDishToCart$(data)
      .subscribe(
        _ => this.success.emit(true),
        e => this.error.emit(e),
        () => {
          this.loading.emit(false)
        }
      );
  }


}
