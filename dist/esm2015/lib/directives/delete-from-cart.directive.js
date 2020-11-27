import { Directive, HostListener, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-restocart.service";
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
DeleteFromCartDirective.ɵfac = function DeleteFromCartDirective_Factory(t) { return new (t || DeleteFromCartDirective)(i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
DeleteFromCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: DeleteFromCartDirective, selectors: [["", "deleteFromCart", ""]], hostBindings: function DeleteFromCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function DeleteFromCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish", amountDish: "amountDish" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DeleteFromCartDirective, [{
        type: Directive,
        args: [{
                selector: '[deleteFromCart]'
            }]
    }], function () { return [{ type: i1.NgRestoCartService }]; }, { dish: [{
            type: Input
        }], amountDish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFHLFlBQVksRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7OztBQU0vRCxNQUFNLE9BQU8sdUJBQXVCO0lBSWxDLFlBQW9CLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQUNoRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQU9ELE9BQU87UUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNwRSxDQUFDOzs4RkFqQlUsdUJBQXVCOzREQUF2Qix1QkFBdUI7b0dBQXZCLGFBQVM7O2tEQUFULHVCQUF1QjtjQUhuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGtCQUFrQjthQUM3QjtxRUFZVSxJQUFJO2tCQUFaLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBR04sT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZGVsZXRlRnJvbUNhcnRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xyXG5cclxuICBjYXJ0O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAudXNlckNhcnQoKVxyXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xyXG4gIH1cclxuXHJcblxyXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xyXG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMuY2FydFNlcnZpY2UucmVtb3ZlRGlzaEZyb21DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxyXG4gIH1cclxuXHJcbn1cclxuIl19