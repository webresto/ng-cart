import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.loading = new EventEmitter();
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
        this.cartService
            .getModifires()
            .subscribe(res => this.modifires = res);
    }
    onClick() {
        this.addDishToCart(this.dish.id, this.amountDish);
    }
    addDishToCart(dishID, amount) {
        let data = {
            dishId: dishID,
            amount: amount,
            cartId: undefined,
            modifiers: this.modifires,
            comment: this.comment
        };
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(() => this.success.emit(true), e => this.error.emit(e), () => this.loading.emit(false));
    }
}
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAddToCart]'
            },] }
];
AddDishToCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
AddDishToCartDirective.propDecorators = {
    modifires: [{ type: Input }],
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    comment: [{ type: Input }],
    loading: [{ type: Output }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQU10RSxNQUFNLE9BQU8sc0JBQXNCO0lBS2pDLFlBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQWlCekMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFqQnhDLElBQUksQ0FBQyxXQUFXO2FBQ2IsUUFBUSxFQUFFO2FBQ1YsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsV0FBVzthQUNiLFlBQVksRUFBRTthQUNkLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFFNUMsQ0FBQztJQVlELE9BQU87UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQU0sRUFBRSxNQUFNO1FBRWxDLElBQUksSUFBSSxHQUFHO1lBQ1QsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsTUFBTTtZQUNkLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDdEIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsV0FBVzthQUNiLGNBQWMsQ0FBQyxJQUFJLENBQUM7YUFDcEIsU0FBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM3QixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUN2QixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDL0IsQ0FBQztJQUNOLENBQUM7OztZQXZERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7O1lBTFEsa0JBQWtCOzs7d0JBU3hCLEtBQUs7bUJBZUwsS0FBSzt5QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBRUwsTUFBTTtzQkFDTixNQUFNO29CQUNOLE1BQU07c0JBRU4sWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcclxuXHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tyc3RBZGRUb0NhcnRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB7XHJcblxyXG4gIGNhcnQ7XHJcbiAgQElucHV0KCkgbW9kaWZpcmVzOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG5cclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLnVzZXJDYXJ0KClcclxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC5nZXRNb2RpZmlyZXMoKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaXJlcyA9IHJlcyk7XHJcblxyXG4gIH1cclxuXHJcblxyXG4gIEBJbnB1dCgpIGRpc2g6IGFueTtcclxuICBASW5wdXQoKSBhbW91bnREaXNoOiBhbnk7XHJcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmFkZERpc2hUb0NhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFkZERpc2hUb0NhcnQoZGlzaElELCBhbW91bnQpIHtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgZGlzaElkOiBkaXNoSUQsXHJcbiAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICBjYXJ0SWQ6IHVuZGVmaW5lZCxcclxuICAgICAgbW9kaWZpZXJzOiB0aGlzLm1vZGlmaXJlcyxcclxuICAgICAgY29tbWVudDogdGhpcy5jb21tZW50XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmNhcnQuY2FydElkKSBkYXRhLmNhcnRJZCA9IHRoaXMuY2FydC5jYXJ0SWQ7XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAuYWRkRGlzaFRvQ2FydCQoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICBlID0+IHRoaXMuZXJyb3IuZW1pdChlKSxcclxuICAgICAgICAoKSA9PiB0aGlzLmxvYWRpbmcuZW1pdChmYWxzZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==