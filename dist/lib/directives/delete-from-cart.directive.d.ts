import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class DeleteFromCartDirective {
    private cartService;
    cart: any;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    onClick(): void;
}
