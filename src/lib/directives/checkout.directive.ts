import { Directive, Input, Output, HostListener, EventEmitter, SimpleChanges } from '@angular/core';
import { filter, debounceTime, } from 'rxjs/operators'
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[checkout]'
})
export class CheckoutDirective {

  @Input() cartTotal: any;

  @Input() bonuses: any;

  @Input() name: string;
  @Input() email: string;
  @Input() phone: string;
  @Input() delivery: any;
  @Input() selfService: any;
  @Input() locationId: string;

  @Input() streetId: string;
  @Input() street: any;
  @Input() home: string;
  @Input() housing: string;
  @Input() apartment: string;
  @Input() entrance: string;
  @Input() doorphone: string;
  @Input() floor: string;

  @Input() paymentMethod: string;
  @Input() paymentMethodId: string;
  @Input() personsCount: number;
  @Input() comment: string;

  @Input() date: string;
  @Input() notifyMethodId: string;

  @Output() success = new EventEmitter<boolean>();
  @Output() error = new EventEmitter<string>();
  @Output() isChecking = new EventEmitter<boolean>();


  cart: any;
  lastFormChangeKey: string;

  constructor(private cartService: NgRestoCartService) {

    this.cartService
      .userCart()
      .subscribe(cart => this.cart = cart);

    this.cartService.OrderFormChange
      .pipe(
        filter(() => {
          //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
          if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
            return true;
          }
        }),
        /*filter(() => {
          const formChangeKey = JSON.stringify({
            1: this.locationId,
            2: this.streetId,
            3: this.street,
            4: this.home,
            5: this.cartTotal,
            6: this.bonuses,
            7: this.delivery,
            8: this.paymentMethodId
          });

          if(formChangeKey !== this.lastFormChangeKey) {
            this.lastFormChangeKey = formChangeKey;
            return true;
          }
        }),*/
        debounceTime(1000)
      )
      .subscribe(() => this.checkStreet());
  }

  @HostListener('click')
  onClick() {
    if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
      this.error.emit('Нужно указать адрес');
      return;
    }

    let comment = this.comment || "Не указан";

    let data = {
      cartId: this.cart.cartId,
      comment: comment,
      customer: {
        phone: this.preparePhone(this.phone),
        mail: this.email,
        name: this.name
      },
      personsCount: +this.personsCount
    };

    if (this.paymentMethodId) {
      data["paymentMethodId"] = this.paymentMethodId;
    }

    if (this.date) {
      data["date"] = this.date;
    }

    if (this.notifyMethodId) {
      data["notifyMethodId"] = this.notifyMethodId;
    }

    data["selfService"] = this.selfService;


    if (this.bonuses) {
      data['bonuses'] = this.bonuses.map(b => {
        return {
          name: b.name,
          amount: b.amount
        }
      });
    }


    if (this.locationId) {
      data["locationId"] = this.locationId;
    } else {
      data["address"] = {
        streetId: this.streetId,
        street: this.street,
        home: this.home,
        housing: this.housing,
        doorphone: this.doorphone || '',
        entrance: this.entrance || '',
        floor: this.floor || '',
        apartment: this.apartment || ''
      }
    }

    const cartId = this.cart.id;
    this.cartService
      .orderCart(data)
      .subscribe(
        result => {
          if (result.action && result.action.paymentRedirect) {
            window.location.href = result.action.paymentRedirect;
          } else {
            this.success.emit(cartId)
          }
        },
        error => this.error.emit(error)
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cartService.OrderFormChange.next(changes);
  }

  checkStreet() {

    //if(this.streetId == '0') return;

    let comment = this.comment || "Не указан";

    let data = {
      cartId: this.cart.cartId,
      comment: comment,
      customer: {
        phone: this.phone ? this.preparePhone(this.phone) : null,
        mail: this.email,
        name: this.name || null
      },
      personsCount: +this.personsCount
    };

    data["selfService"] = this.selfService;

    if (this.paymentMethodId) {
      data["paymentMethodId"] = this.paymentMethodId;
    }

    if (this.date) {
      data["date"] = this.date;
    }

    if (this.notifyMethodId) {
      data["notifyMethodId"] = this.notifyMethodId;
    }

    if (this.locationId) {
      data["locationId"] = this.locationId;
    } else {
      data["address"] = {
        streetId: this.streetId,
        street: this.street,
        home: this.home,
        housing: this.housing,
        doorphone: this.doorphone || '',
        entrance: this.entrance || '',
        floor: this.floor || '',
        apartment: this.apartment || ''
      }
    }

    this.isChecking.emit(true);
    this.cartService
      .checkStreetV2(data)
      .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        () => this.isChecking.emit(false),
        () => this.isChecking.emit(false)
      );
  }


  preparePhone(phone) {
    if (!phone) return '';
    phone = '+' + phone.replace(/[^0-9]/gim, '');
    return phone.replace('+8', '+7');
  }
}
