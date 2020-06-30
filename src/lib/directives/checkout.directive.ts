import { Directive, Input, Output, HostListener, EventEmitter, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, debounceTime, tap } from 'rxjs/operators'
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[checkout]'
})
export class CheckoutDirective {

  @Input() cartTotal:any;

  @Input() bonuses: any;

  @Input() name: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() delivery: any;
  @Input() locationId: string;

  @Input() streetId: string;
  @Input() home: string;
  @Input() housing: string;
  @Input() apartment: string;
  @Input() entrance: string;
  @Input() doorphone: string;
  @Input() floor: string;

  @Input() paymentMethod: string;
  @Input() personsCount: number;
  @Input() comment: string;
  
  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();
  @Output() isChecking = new EventEmitter<boolean>();


  cart: any;
  lastFormChangeKey: string;

  constructor(
    private cartService: NgRestoCartService
  ) {
    this.cartService
      .userCart()
      .subscribe(cart => this.cart = cart);


    this.cartService.OrderFormChange
      .pipe(
        filter(() => {
          //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
          if(this.locationId || this.streetId && this.home || this.delivery) {
            return true;
          }
        }),
        filter(() => {
          const formChangeKey = JSON.stringify({
            1: this.locationId,
            2: this.streetId,
            3: this.home,
            4: this.cartTotal,
            5: this.bonuses,
            6: this.delivery
          });

          if(formChangeKey !== this.lastFormChangeKey) {
            this.lastFormChangeKey = formChangeKey;
            return true;
          }
        }),
        debounceTime(1000)
      )
      .subscribe(() => this.checkStreet());
  }

  @HostListener('click')
  onClick() {
    if(!this.locationId && !(this.streetId && this.home) && !this.delivery) {
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

    // console.log('FFFFFFFFFFFFFFFF', this.delivery);

    data["selfDelivery"] = this.delivery;


    if(this.bonuses) {
      data['bonuses'] = this.bonuses.map(b => {
        return {
          name: b.name,
          amount: b.amount
        }
      });
    }


    if(this.locationId) {
      data["locationId"] = this.locationId;
    } else {
      data["address"] = {
        "street": this.streetId,
        "home": this.home,
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

  ngOnChanges(changes: SimpleChanges) {
    this.cartService.OrderFormChange.next(changes);
  }

  checkStreet() {

    //if(this.streetId == '0') return;

    let comment = this.comment || "Не указан";
    let paymentMethod = this.paymentMethod || "Не указано";

    let data = {
      "cartId": this.cart.cartId,
      "comment": `${comment}\r\nОплата: ${paymentMethod}`,
      "customer": {
        //"phone": this.preparePhone(this.phone),
        //"name": this.name
        "phone": '+79999999999',
        "mail": this.email,
        "name": 'Васа'
      },
      "personsCount": this.personsCount
    };


    // console.log('EEEEEEEEEEEE', this.delivery);

    data["selfDelivery"] = this.delivery;



    if(this.locationId) {
      data["locationId"] = this.locationId;
    } else {
      data["address"] = {
        "street": this.streetId,
        "home": this.home,
        "housing": this.housing,
        "doorphone": this.doorphone || '',
        "entrance": this.entrance || '',
        "floor": this.floor || '',
        "apartment": this.apartment || ''
      }
    }

    this.isChecking.emit(true);
    this.cartService
      .checkStreetV2(data)
      .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        result => this.isChecking.emit(false),
        error => this.isChecking.emit(false)
      );
  }


  preparePhone(phone) {
    if(!phone) return '';
    phone = '+' + phone.replace(/[^0-9]/gim,'');
    return phone.replace('+8', '+7');
  }
}
