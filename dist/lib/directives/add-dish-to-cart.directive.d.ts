import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class AddDishToCartDirective {
    private cartService;
    cart: any;
    modifires: any;
    constructor(cartService: NgRestoCartService);
    dish: any;
    amountDish: any;
    comment: string;
    onClick(): void;
    private addDishToCart;
}
