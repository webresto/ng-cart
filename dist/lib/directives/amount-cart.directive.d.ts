import { Renderer2, ElementRef } from '@angular/core';
import { Cart, NgRestoCartService } from '../services/ng-restocart.service';
export declare class AmountCartDirective {
    private cartService;
    private renderer;
    private el;
    cart: Cart;
    amount: string;
    constructor(cartService: NgRestoCartService, renderer: Renderer2, el: ElementRef);
}
