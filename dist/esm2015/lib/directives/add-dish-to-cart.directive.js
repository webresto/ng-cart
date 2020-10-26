import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
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
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifires,
            "comment": this.comment
        };
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.ɵfac = function AddDishToCartDirective_Factory(t) { return new (t || AddDishToCartDirective)(i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
AddDishToCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddDishToCartDirective, selectors: [["", "addToCart", ""]], hostBindings: function AddDishToCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function AddDishToCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish", amountDish: "amountDish", comment: "comment" }, outputs: { loading: "loading", success: "success", error: "error" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AddDishToCartDirective, [{
        type: Directive,
        args: [{
                selector: '[addToCart]'
            }]
    }], function () { return [{ type: i1.NgRestoCartService }]; }, { dish: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUcsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFNdEUsTUFBTSxPQUFPLHNCQUFzQjtJQUtqQyxZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFpQnhDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBakJ4QyxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLFdBQVc7YUFDYixZQUFZLEVBQUU7YUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRTVDLENBQUM7SUFZRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDbkQsQ0FBQztJQUVPLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTTtRQUVsQyxJQUFJLElBQUksR0FBRztZQUNULFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMzQixTQUFTLEVBQUMsSUFBSSxDQUFDLE9BQU87U0FDdkIsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUVyRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsV0FBVzthQUNiLGNBQWMsQ0FBQyxJQUFJLENBQUM7YUFDcEIsU0FBUyxDQUNSLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzVCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3ZCLEdBQUcsRUFBRTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzFCLENBQUMsQ0FDRixDQUFDO0lBQ04sQ0FBQzs7NEZBdERVLHNCQUFzQjsyREFBdEIsc0JBQXNCO21HQUF0QixhQUFTOztrREFBVCxzQkFBc0I7Y0FIbEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2FBQ3hCO3FFQW1CVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFHUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW2FkZFRvQ2FydF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcclxuXHJcbiAgY2FydDtcclxuICBtb2RpZmlyZXM7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAudXNlckNhcnQoKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xyXG5cclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLmdldE1vZGlmaXJlcygpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMubW9kaWZpcmVzID0gcmVzKTtcclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgQElucHV0KCkgZGlzaDphbnk7XHJcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XHJcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBsb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYWRkRGlzaFRvQ2FydChkaXNoSUQsIGFtb3VudCkge1xyXG5cclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBcImRpc2hJZFwiOiBkaXNoSUQsXHJcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudCxcclxuICAgICAgXCJjYXJ0SWRcIjogdW5kZWZpbmVkLFxyXG4gICAgICBcIm1vZGlmaWVyc1wiOiB0aGlzLm1vZGlmaXJlcyxcclxuICAgICAgXCJjb21tZW50XCI6dGhpcy5jb21tZW50XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmNhcnQuY2FydElkKSBkYXRhLmNhcnRJZCA9IHRoaXMuY2FydC5jYXJ0SWQ7XHJcblxyXG4gICAgdGhpcy5sb2FkaW5nLmVtaXQodHJ1ZSk7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAuYWRkRGlzaFRvQ2FydCQoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICBfID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICAgIGUgPT4gdGhpcy5lcnJvci5lbWl0KGUpLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZy5lbWl0KGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICB9XHJcblxyXG5cclxufVxyXG4iXX0=