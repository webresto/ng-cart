import { Directive, Input, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-restocart.service";
export class SetAmountDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
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
SetAmountDirective.ɵfac = function SetAmountDirective_Factory(t) { return new (t || SetAmountDirective)(i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
SetAmountDirective.ɵdir = i0.ɵɵdefineDirective({ type: SetAmountDirective, selectors: [["", "setDishAmount", ""]], hostBindings: function SetAmountDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function SetAmountDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { action: "action", dish: "dish" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SetAmountDirective, [{
        type: Directive,
        args: [{
                selector: '[setDishAmount]'
            }]
    }], function () { return [{ type: i1.NgRestoCartService }]; }, { action: [{
            type: Input
        }], dish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWFtb3VudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNL0QsTUFBTSxPQUFPLGtCQUFrQjtJQVU3QixZQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFDaEQsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFWc0IsT0FBTztRQUM1QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBVUQsWUFBWSxDQUFDLE1BQU07UUFFakIsUUFBUSxNQUFNLEVBQUU7WUFDZCxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDO2dCQUNGLE1BQU07WUFDUixLQUFLLEdBQUc7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUNyQixDQUFDO2dCQUNGLE1BQU07WUFDUjtnQkFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7Z0JBQ3ZFLE1BQU07U0FDVDtJQUVILENBQUM7O29GQXBDVSxrQkFBa0I7dURBQWxCLGtCQUFrQjsrRkFBbEIsYUFBUzs7a0RBQVQsa0JBQWtCO2NBSDlCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2FBQzVCO3FFQUVVLE1BQU07a0JBQWQsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUVpQixPQUFPO2tCQUE3QixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaEFtb3VudF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXRBbW91bnREaXJlY3RpdmUge1xyXG4gIEBJbnB1dCgpIGFjdGlvbjphbnk7XHJcbiAgQElucHV0KCkgZGlzaDphbnk7XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcclxuICAgIHRoaXMuY2hhbmdlQW1vdW50KHRoaXMuYWN0aW9uKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2FydDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLnVzZXJDYXJ0KClcclxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUFtb3VudChhY3Rpb24pIHtcclxuXHJcbiAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICBjYXNlICcrJzpcclxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcclxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcclxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgKyAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnLSc6XHJcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXHJcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXHJcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50IC0gMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQlNC40YDQtdC60YLQuNCy0LAgU2V0RGlzaEFtb3VudCDQv9C+0LvRg9GH0LjQu9CwINC70L7QttC90L7QtSDQt9C90LDRh9C10L3QuNC1IGFjdGlvblwiKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=