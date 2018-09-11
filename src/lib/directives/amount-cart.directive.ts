import { Directive, Renderer2, ElementRef } from '@angular/core';
import {NgRestoCartService} from '../services/ng-restocart.service';

@Directive({
  selector: '[amountCart]'
})
export class AmountCartDirective {

  cart:object;
  amount:string;

  constructor(private sailsResto:NgRestoCartService, private renderer: Renderer2, private el: ElementRef) {
    this.amount = '0'; 
    this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
    this.sailsResto.userCart().subscribe(
      res=>{
        this.cart = res;
        this.amount = res.dishesCount || 0;
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
      }
    );
  }


}
