/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Directive, HostListener, Input } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class AddDishToCartDirective {
    /**
     * @param {?} cartService
     */
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
        this.cartService
            .getModifires()
            .subscribe(res => this.modifires = res);
    }
    /**
     * @return {?}
     */
    onClick() {
        this.addDishToCart(this.dish.id, this.amountDish);
    }
    /**
     * @param {?} dishID
     * @param {?} amount
     * @return {?}
     */
    addDishToCart(dishID, amount) {
        /** @type {?} */
        let data = {
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifires
        };
        //console.log("другие даные", data)
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.cartService.addDishToCart(data);
    }
}
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[addToCart]'
            },] },
];
/** @nocollapse */
AddDishToCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
AddDishToCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    AddDishToCartDirective.prototype.cart;
    /** @type {?} */
    AddDishToCartDirective.prototype.modifires;
    /** @type {?} */
    AddDishToCartDirective.prototype.dish;
    /** @type {?} */
    AddDishToCartDirective.prototype.amountDish;
    /** @type {?} */
    AddDishToCartDirective.prototype.cartService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFHLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFNdEUsTUFBTTs7OztJQUtKLFlBQW9CLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUVoRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLFdBQVc7YUFDYixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBRTNDOzs7O0lBUUQsT0FBTztRQUVMLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0tBRWxEOzs7Ozs7SUFFTyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU07O1FBRWxDLElBQUksSUFBSSxHQUFHO1lBQ1QsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzVCLENBQUM7O1FBR0YsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7O1lBM0N4QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7Ozs7WUFMUSxrQkFBa0I7OzttQkF3QnhCLEtBQUs7eUJBQ0wsS0FBSztzQkFHTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuICBtb2RpZmlyZXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaXJlcygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaXJlcyA9IHJlcyk7XG5cbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuXG4gICAgdGhpcy5hZGREaXNoVG9DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxuXG4gIH1cblxuICBwcml2YXRlIGFkZERpc2hUb0NhcnQoZGlzaElELCBhbW91bnQpIHtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50LFxuICAgICAgXCJjYXJ0SWRcIjogdW5kZWZpbmVkLFxuICAgICAgXCJtb2RpZmllcnNcIjogdGhpcy5tb2RpZmlyZXNcbiAgICB9O1xuICAgIC8vY29uc29sZS5sb2coXCLQtNGA0YPQs9C40LUg0LTQsNC90YvQtVwiLCBkYXRhKVxuXG4gICAgaWYgKHRoaXMuY2FydC5jYXJ0SWQpIGRhdGEuY2FydElkID0gdGhpcy5jYXJ0LmNhcnRJZDtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLmFkZERpc2hUb0NhcnQoZGF0YSk7XG4gIH1cblxuXG59XG4iXX0=