import { Renderer2, ElementRef } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class AmountCartDirective {
    private cartService;
    private renderer;
    private el;
    cart: object;
    amount: string;
    constructor(cartService: NgRestoCartService, renderer: Renderer2, el: ElementRef);
    static ɵfac: i0.ɵɵFactoryDef<AmountCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<AmountCartDirective, "[amountCart]", never, {}, {}, never>;
}
