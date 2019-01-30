import { EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class CheckoutDirective {
    private cartService;
    name: string;
    email: string;
    phone: string;
    delivery: any;
    locationId: string;
    streetId: string;
    home: string;
    housing: string;
    apartment: string;
    entrance: string;
    doorphone: string;
    floor: string;
    paymentMethod: string;
    personsCount: number;
    comment: string;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    cart: any;
    constructor(cartService: NgRestoCartService);
    onClick(): void;
    preparePhone(phone: any): any;
}
