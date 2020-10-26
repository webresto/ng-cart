import { Directive, Input, HostListener } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWFtb3VudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7O0FBS3RFLE1BQU0sT0FBTyxrQkFBa0I7SUFVN0IsWUFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBQ2hELElBQUksQ0FBQyxXQUFXO2FBQ2IsUUFBUSxFQUFFO2FBQ1YsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBVnNCLE9BQU87UUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQVVELFlBQVksQ0FBQyxNQUFNO1FBRWpCLFFBQVEsTUFBTSxFQUFFO1lBQ2QsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDckIsQ0FBQztnQkFDRixNQUFNO1lBQ1IsS0FBSyxHQUFHO2dCQUNOLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FDckIsQ0FBQztnQkFDRixNQUFNO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO2dCQUN2RSxNQUFNO1NBQ1Q7SUFFSCxDQUFDOztvRkFwQ1Usa0JBQWtCO3VEQUFsQixrQkFBa0I7K0ZBQWxCLGFBQVM7O2tEQUFULGtCQUFrQjtjQUg5QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjthQUM1QjtxRUFFVSxNQUFNO2tCQUFkLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFFaUIsT0FBTztrQkFBN0IsWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3NldERpc2hBbW91bnRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0QW1vdW50RGlyZWN0aXZlIHtcclxuICBASW5wdXQoKSBhY3Rpb246YW55O1xyXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XHJcbiAgICB0aGlzLmNoYW5nZUFtb3VudCh0aGlzLmFjdGlvbik7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNhcnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC51c2VyQ2FydCgpXHJcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VBbW91bnQoYWN0aW9uKSB7XHJcblxyXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgY2FzZSAnKyc6XHJcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXHJcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXHJcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50ICsgMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJy0nOlxyXG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0KFxyXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxyXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCAtIDFcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0JTQuNGA0LXQutGC0LjQstCwIFNldERpc2hBbW91bnQg0L/QvtC70YPRh9C40LvQsCDQu9C+0LbQvdC+0LUg0LfQvdCw0YfQtdC90LjQtSBhY3Rpb25cIik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19