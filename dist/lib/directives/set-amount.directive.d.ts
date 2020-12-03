import { Cart, NgRestoCartService } from '../services/ng-restocart.service';
export declare class SetAmountDirective {
    private cartService;
    action: any;
    dish: any;
    onClick(): void;
    cart: Cart;
    constructor(cartService: NgRestoCartService);
    changeAmount(action: any): void;
}
