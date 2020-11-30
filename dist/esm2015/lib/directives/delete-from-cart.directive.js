import { Directive, HostListener, Input } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class DeleteFromCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.cartService.removeDishFromCart(this.dish.id, this.amountDish);
    }
}
DeleteFromCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstDeleteFromCart]'
            },] }
];
DeleteFromCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
DeleteFromCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFHLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLdEUsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFPRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDcEUsQ0FBQzs7O1lBcEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2FBQ2hDOzs7WUFKUSxrQkFBa0I7OzttQkFnQnhCLEtBQUs7eUJBQ0wsS0FBSztzQkFFTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3REZWxldGVGcm9tQ2FydF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB7XHJcblxyXG4gIGNhcnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC51c2VyQ2FydCgpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XHJcbiAgfVxyXG5cclxuXHJcbiAgQElucHV0KCkgZGlzaDphbnk7XHJcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=