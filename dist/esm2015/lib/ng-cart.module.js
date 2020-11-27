import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
//import { ModifiresDirective } from './directives/modifires.directive';
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
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective,
        DishCalcComponent], imports: [CommonModule], exports: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
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
                    //ModifiresDirective,
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
                    //ModifiresDirective,
                    DishCalcDirective,
                    SetDishCommentDirective,
                    SetAmountDirective,
                    CheckoutDirective,
                    DishCalcComponent
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvbmctY2FydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsd0VBQXdFO0FBQ3hFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDRDQUE0QyxDQUFDOztBQThCL0UsTUFBTSxPQUFPLGlCQUFpQjs7cURBQWpCLGlCQUFpQjtpSEFBakIsaUJBQWlCLG1CQTFCakIsRUFBRSxZQURKLENBQUMsWUFBWSxDQUFDO3dGQTJCWixpQkFBaUIsbUJBeEIxQixzQkFBc0I7UUFDdEIsbUJBQW1CO1FBQ25CLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsa0JBQWtCO1FBQ2xCLGlCQUFpQjtRQUNqQixpQkFBaUIsYUFaVCxZQUFZLGFBZXBCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCO1FBQ2pCLGlCQUFpQjtrREFHUixpQkFBaUI7Y0E1QjdCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFNBQVMsRUFBRSxFQUFFO2dCQUNiLFlBQVksRUFBRTtvQkFDWixzQkFBc0I7b0JBQ3RCLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7aUJBQ2xCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxzQkFBc0I7b0JBQ3RCLG1CQUFtQjtvQkFDbkIsdUJBQXVCO29CQUN2QixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtvQkFDckIsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLGtCQUFrQjtvQkFDbEIsaUJBQWlCO29CQUNqQixpQkFBaUI7aUJBQ2xCO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XHJcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBTZXRBbW91bnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xyXG5pbXBvcnQgeyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERpc2hDYWxjQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXHJcbiAgICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxyXG4gICAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXHJcbiAgICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxyXG4gICAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXHJcbiAgICBEaXNoQ2FsY0RpcmVjdGl2ZSxcclxuICAgIFNldERpc2hDb21tZW50RGlyZWN0aXZlLFxyXG4gICAgU2V0QW1vdW50RGlyZWN0aXZlLFxyXG4gICAgQ2hlY2tvdXREaXJlY3RpdmUsXHJcbiAgICBEaXNoQ2FsY0NvbXBvbmVudFxyXG4gIF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSxcclxuICAgIEFtb3VudENhcnREaXJlY3RpdmUsXHJcbiAgICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcclxuICAgIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUsXHJcbiAgICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjRGlyZWN0aXZlLFxyXG4gICAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXHJcbiAgICBTZXRBbW91bnREaXJlY3RpdmUsXHJcbiAgICBDaGVja291dERpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRNb2R1bGUgeyB9XHJcbiJdfQ==