import { Cart, NgRestoCartService } from '../services/ng-restocart.service';
export declare class DeleteFromCartDirective {
    private cartService;
    cart: Cart;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    onClick(): void;
}
