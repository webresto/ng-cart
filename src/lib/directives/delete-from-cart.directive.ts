import { Directive , HostListener,Input} from '@angular/core';
import {NgRestoCartService} from '../services/ng-restocart.service';

@Directive({
  selector: '[deleteFromCart]'
})
export class DeleteFromCartDirective {

  cart;

  constructor(private sailsResto:NgRestoCartService) {

    this.sailsResto.userCart().subscribe(
      res=> {
        this.cart = res;
      }
    );
  }


  @Input() dish:any;
  @Input() amountDish:any;

  @HostListener('click')
  onClick() {
    this.sailsResto.removeDishFromCart(this.dish.id, this.amountDish)
  }

}
