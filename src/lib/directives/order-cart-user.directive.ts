import { Directive, Input, HostListener } from '@angular/core';
import {NgRestoCartService} from '../services/ng-restocart.service';

@Directive({
  selector: '[OrderCartUser]'
})
export class OrderCartUserDirective {
  @Input() OrderCartUser: any;
  @HostListener('click')
  onClick() {
 this.ngRestoCartService.checkoutCart(this.OrderCartUser);
  console.log(this.OrderCartUser)

 }

  constructor(private ngRestoCartService:NgRestoCartService) { 

  }

}
