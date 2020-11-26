import { EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class AddDishToCartDirective {
    private cartService;
    cart: any;
    modifires: any;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    comment: string;
    replaceCartDishId: boolean;
    loading: EventEmitter<boolean>;
    success: EventEmitter<boolean>;
    error: EventEmitter<any>;
    onClick(): void;
    private addDishToCart;
}
