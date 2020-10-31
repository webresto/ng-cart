import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-restocart.service";
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
AddDishToCartDirective.ɵfac = function AddDishToCartDirective_Factory(t) { return new (t || AddDishToCartDirective)(i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
AddDishToCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddDishToCartDirective, selectors: [["", "addToCart", ""]], hostBindings: function AddDishToCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function AddDishToCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { modifires: "modifires", dish: "dish", amountDish: "amountDish", comment: "comment" }, outputs: { loading: "loading", success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AddDishToCartDirective, [{
        type: Directive,
        args: [{
                selector: '[addToCart]'
            }]
    }], function () { return [{ type: i1.NgRestoCartService }]; }, { modifires: [{
            type: Input
        }], dish: [{
            type: Input
        }], amountDish: [{
            type: Input
        }], comment: [{
            type: Input
        }], loading: [{
            type: Output
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFPckYsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQyxZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFpQnpDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBakJ4QyxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLFdBQVc7YUFDYixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRTVDLENBQUM7SUFZRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUVsQyxJQUFJLElBQUksR0FBRztZQUNULE1BQU0sRUFBRSxNQUFNO1lBQ2QsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsU0FBUztZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFckQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLFdBQVc7YUFDYixjQUFjLENBQUMsSUFBSSxDQUFDO2FBQ3BCLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDdkIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQy9CLENBQUM7SUFDTixDQUFDOzs0RkFwRFUsc0JBQXNCOzJEQUF0QixzQkFBc0I7bUdBQXRCLGFBQVM7O2tEQUFULHNCQUFzQjtjQUhsQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7YUFDeEI7cUVBSVUsU0FBUztrQkFBakIsS0FBSztZQWVHLElBQUk7a0JBQVosS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUdQLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbYWRkVG9DYXJ0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZERpc2hUb0NhcnREaXJlY3RpdmUge1xyXG5cclxuICBjYXJ0O1xyXG4gIEBJbnB1dCgpIG1vZGlmaXJlczogYW55O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC51c2VyQ2FydCgpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAuZ2V0TW9kaWZpcmVzKClcclxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5tb2RpZmlyZXMgPSByZXMpO1xyXG5cclxuICB9XHJcblxyXG5cclxuICBASW5wdXQoKSBkaXNoOiBhbnk7XHJcbiAgQElucHV0KCkgYW1vdW50RGlzaDogYW55O1xyXG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcclxuXHJcbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5hZGREaXNoVG9DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRCwgYW1vdW50KSB7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIGRpc2hJZDogZGlzaElELFxyXG4gICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgY2FydElkOiB1bmRlZmluZWQsXHJcbiAgICAgIG1vZGlmaWVyczogdGhpcy5tb2RpZmlyZXMsXHJcbiAgICAgIGNvbW1lbnQ6IHRoaXMuY29tbWVudFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5jYXJ0LmNhcnRJZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuY2FydElkO1xyXG5cclxuICAgIHRoaXMubG9hZGluZy5lbWl0KHRydWUpO1xyXG5cclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLmFkZERpc2hUb0NhcnQkKGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgICAgZSA9PiB0aGlzLmVycm9yLmVtaXQoZSksXHJcbiAgICAgICAgKCkgPT4gdGhpcy5sb2FkaW5nLmVtaXQoZmFsc2UpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=