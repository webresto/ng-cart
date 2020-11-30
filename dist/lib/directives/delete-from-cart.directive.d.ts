import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class DeleteFromCartDirective {
    private cartService;
    cart: any;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    onClick(): void;
    static ɵfac: i0.ɵɵFactoryDef<DeleteFromCartDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DeleteFromCartDirective, "[rstDeleteFromCart]", never, { "dish": "dish"; "amountDish": "amountDish"; }, {}, never>;
}
