import { Directive , HostListener, Input} from '@angular/core';
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
      "comment":this.comment
    };
    console.log("другие даные", data)

    if (this.cart.cartId) data.cartId = this.cart.cartId;
    this.cartService.addDishToCart(data);
  }


}
