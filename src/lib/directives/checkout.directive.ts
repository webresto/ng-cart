import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[checkout]'
})
export class CheckoutDirective {

  @Input() name:string;
  @Input() email:string;
  @Input() phone:string;

  @Input() locationId:string;

  @Input() streetId: string;
  @Input() home:string;
  @Input() housing:string;
  @Input() apartment:string;
  @Input() entrance:string;
  @Input() doorphone:string;
  @Input() floor:string;

  @Input() paymentMethod:string
  @Input() personsCount:number;
  @Input() comment:string;
  
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();

  cart: any;

  constructor(
    private cartService: NgRestoCartService
  ) {
    this.cartService
      .userCart()
      .subscribe(cart => this.cart = cart)
  }

  @HostListener('click')
  onClick() {

    if(!this.locationId && !(this.streetId && this.home)) {
      this.error.emit('Нужно указать адрес');
      return;
    }

    let comment = this.comment || "Не указан";
    let paymentMethod = this.paymentMethod || "Не указано";

    let data = {
      "cartId": this.cart.cartId,
      "comment": `${comment}\r\nОплата: ${paymentMethod}`,
      "customer": {
        "phone": this.preparePhone(this.phone),
        "mail": this.email,
        "name": this.name
      },
      "personsCount": this.personsCount
    };

    if(this.locationId) {
      data["locationId"] = this.locationId;
    } else {
      data["address"] = {
        "streetId": this.streetId,
        "home": +this.home,
        "housing": this.housing,
        "doorphone": this.doorphone || '',
        "entrance": this.entrance || '',
        "floor": this.floor || '',
        "apartment": this.apartment || ''
      }
    }

    this.cartService
      .orderCart(data)
      .subscribe(
        () => this.success.emit(true),
        error => this.error.emit(error)
      );
  }


  preparePhone(phone) {
    phone = '+' + phone.replace(/[^0-9]/gim,'');
    return phone.replace('+8', '');
  }
}
