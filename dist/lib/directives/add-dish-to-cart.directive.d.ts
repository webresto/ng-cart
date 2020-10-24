import { EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class AddDishToCartDirective {
    private cartService;
    cart: any;
    modifires: any;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    comment: string;
    loading: EventEmitter<boolean>;
    success: EventEmitter<boolean>;
    error: EventEmitter<any>;
    onClick(): void;
    private addDishToCart;
    static ɵfac: i0.ɵɵFactoryDef<AddDishToCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AddDishToCartDirective, "[addToCart]", never, { "dish": "dish"; "amountDish": "amountDish"; "comment": "comment"; }, { "loading": "loading"; "success": "success"; "error": "error"; }, never>;
}
