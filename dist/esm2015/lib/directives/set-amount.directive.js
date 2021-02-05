import { Directive, Input, HostListener } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class SetAmountDirective {
    constructor(cartService) {
        this.cartService = cartService;
        const sub = this.cartService.userCart().subscribe(res => this.cart = res, () => { }, () => sub.unsubscribe());
    }
    onClick() {
        this.changeAmount(this.action);
    }
    changeAmount(action) {
        switch (action) {
            case '+':
                this.cartService.setDishCountToCart(this.dish.id, this.dish.amount + 1);
                break;
            case '-':
                this.cartService.setDishCountToCart(this.dish.id, this.dish.amount - 1);
                break;
            default:
                console.log("Директива SetDishAmount получила ложное значение action");
                break;
        }
    }
}
SetAmountDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSetDishAmount]'
            },] }
];
SetAmountDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
SetAmountDirective.propDecorators = {
    action: [{ type: Input }],
    dish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWFtb3VudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy9saWIvZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFRLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLNUUsTUFBTSxPQUFPLGtCQUFrQjtJQVU3QixZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQy9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDM0QsQ0FBQztJQUNKLENBQUM7SUFWc0IsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBVUQsWUFBWSxDQUFDLE1BQU07UUFFakIsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDO2dCQUNGLE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU07U0FDVDtJQUVILENBQUM7OztZQXZDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjs7O1lBSmMsa0JBQWtCOzs7cUJBTTlCLEtBQUs7bUJBQ0wsS0FBSztzQkFFTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYXJ0LCBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RTZXREaXNoQW1vdW50XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIFNldEFtb3VudERpcmVjdGl2ZSB7XHJcbiAgQElucHV0KCkgYWN0aW9uOiBhbnk7XHJcbiAgQElucHV0KCkgZGlzaDogYW55O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNoYW5nZUFtb3VudCh0aGlzLmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBjYXJ0OkNhcnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG4gICAgY29uc3Qgc3ViID0gdGhpcy5jYXJ0U2VydmljZS51c2VyQ2FydCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHRoaXMuY2FydCA9IHJlcywgKCkgPT4geyB9LCAoKSA9PiBzdWIudW5zdWJzY3JpYmUoKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUFtb3VudChhY3Rpb24pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICBjYXNlICcrJzpcclxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcclxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcclxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgKyAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXHJcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXHJcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50IC0gMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQlNC40YDQtdC60YLQuNCy0LAgU2V0RGlzaEFtb3VudCDQv9C+0LvRg9GH0LjQu9CwINC70L7QttC90L7QtSDQt9C90LDRh9C10L3QuNC1IGFjdGlvblwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=