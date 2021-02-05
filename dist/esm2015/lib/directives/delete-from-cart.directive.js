import { Directive, HostListener, Input } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class DeleteFromCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        const sub = this.cartService.userCart().subscribe(res => this.cart = res, () => { }, () => sub.unsubscribe());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFRLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLNUUsTUFBTSxPQUFPLHVCQUF1QjtJQUlsQyxZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQy9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FDM0QsQ0FBQztJQUNKLENBQUM7SUFPRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDcEUsQ0FBQzs7O1lBcEJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2FBQ2hDOzs7WUFKYyxrQkFBa0I7OzttQkFnQjlCLEtBQUs7eUJBQ0wsS0FBSztzQkFFTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSG9zdExpc3RlbmVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDYXJ0LCBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3REZWxldGVGcm9tQ2FydF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB7XHJcblxyXG4gIGNhcnQ6Q2FydDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlKSB7XHJcbiAgICBjb25zdCBzdWIgPSB0aGlzLmNhcnRTZXJ2aWNlLnVzZXJDYXJ0KCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXMgPT4gdGhpcy5jYXJ0ID0gcmVzLCAoKSA9PiB7IH0sICgpID0+IHN1Yi51bnN1YnNjcmliZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcblxyXG4gIEBJbnB1dCgpIGRpc2g6IGFueTtcclxuICBASW5wdXQoKSBhbW91bnREaXNoOiBhbnk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=