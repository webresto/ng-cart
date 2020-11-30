import { EventEmitter, SimpleChanges } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class CheckoutDirective {
    private cartService;
    cartTotal: any;
    bonuses: any;
    name: string;
    email: string;
    phone: string;
    delivery: any;
    selfService: any;
    locationId: string;
    street: string;
    streetId: string;
    home: string;
    housing: string;
    apartment: string;
    entrance: string;
    doorphone: string;
    floor: string;
    paymentMethod: string;
    paymentMethodId: string;
    personsCount: number;
    comment: string;
    date: string;
    notifyMethodId: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    isChecking: EventEmitter<boolean>;
    cart: any;
    lastFormChangeKey: string;
    constructor(cartService: NgRestoCartService);
    onClick(): void;
    ngOnChanges(changes: SimpleChanges): void;
    checkStreet(): void;
    preparePhone(phone: any): any;
}
//# sourceMappingURL=checkout.directive.d.ts.map