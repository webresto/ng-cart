import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';
import { DishCalcComponent } from './components/dish-calc/dish-calc.component';
import * as i0 from "@angular/core";
export class NgRestoCartModule {
}
NgRestoCartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgRestoCartModule });
NgRestoCartModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgRestoCartModule_Factory(t) { return new (t || NgRestoCartModule)(); }, providers: [], imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgRestoCartModule, { declarations: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective,
        DishCalcComponent], imports: [CommonModule], exports: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective,
        DishCalcComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgRestoCartModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                providers: [],
                declarations: [
                    AddDishToCartDirective,
                    AmountCartDirective,
                    DeleteFromCartDirective,
                    OrderCartUserDirective,
                    ModifiresDirective,
                    DishCalcDirective,
                    SetDishCommentDirective,
                    SetAmountDirective,
                    CheckoutDirective,
                    DishCalcComponent
                ],
                exports: [
                    AddDishToCartDirective,
                    AmountCartDirective,
                    DeleteFromCartDirective,
                    OrderCartUserDirective,
                    ModifiresDirective,
                    DishCalcDirective,
                    SetDishCommentDirective,
                    SetAmountDirective,
                    CheckoutDirective,
                    DishCalcComponent
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvbmctY2FydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7O0FBOEIvRSxNQUFNLE9BQU8saUJBQWlCOztxREFBakIsaUJBQWlCO2lIQUFqQixpQkFBaUIsbUJBMUJqQixFQUFFLFlBREosQ0FBQyxZQUFZLENBQUM7d0ZBMkJaLGlCQUFpQixtQkF4QjFCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLGlCQUFpQixhQVpULFlBQVksYUFlcEIsc0JBQXNCO1FBQ3RCLG1CQUFtQjtRQUNuQix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIsdUJBQXVCO1FBQ3ZCLGtCQUFrQjtRQUNsQixpQkFBaUI7UUFDakIsaUJBQWlCO2tEQUdSLGlCQUFpQjtjQTVCN0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBbW91bnRDYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTZXRBbW91bnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERpc2hDYWxjQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXHJcbiAgICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxyXG4gICAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXHJcbiAgICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxyXG4gICAgTW9kaWZpcmVzRGlyZWN0aXZlLFxyXG4gICAgRGlzaENhbGNEaXJlY3RpdmUsXHJcbiAgICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcclxuICAgIFNldEFtb3VudERpcmVjdGl2ZSxcclxuICAgIENoZWNrb3V0RGlyZWN0aXZlLFxyXG4gICAgRGlzaENhbGNDb21wb25lbnRcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXHJcbiAgICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxyXG4gICAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXHJcbiAgICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxyXG4gICAgTW9kaWZpcmVzRGlyZWN0aXZlLFxyXG4gICAgRGlzaENhbGNEaXJlY3RpdmUsXHJcbiAgICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcclxuICAgIFNldEFtb3VudERpcmVjdGl2ZSxcclxuICAgIENoZWNrb3V0RGlyZWN0aXZlLFxyXG4gICAgRGlzaENhbGNDb21wb25lbnRcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cclxuIl19