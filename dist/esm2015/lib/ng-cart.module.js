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
const DIRECTIVES = [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    //ModifiresDirective,
    DishCalcDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
];
const COMPONENTS = [
    DishCalcComponent
];
const MODULES = [
    CommonModule
];
export class NgRestoCartModule {
}
NgRestoCartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgRestoCartModule });
NgRestoCartModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgRestoCartModule_Factory(t) { return new (t || NgRestoCartModule)(); }, providers: [], imports: [[MODULES]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgRestoCartModule, { declarations: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective, DishCalcComponent], imports: [CommonModule], exports: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective, DishCalcComponent] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgRestoCartModule, [{
        type: NgModule,
        args: [{
                imports: [MODULES],
                providers: [],
                declarations: [DIRECTIVES, COMPONENTS],
                exports: [DIRECTIVES, COMPONENTS]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvUHJvZmVzc2lvbmFsL2Zyb250ZW5kL3Byb2plY3RzL3dlYnJlc3RvL25nLWNhcnQvc3JjLyIsInNvdXJjZXMiOlsibGliL25nLWNhcnQubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3pFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2hGLHdFQUF3RTtBQUN4RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQzs7QUFFL0UsTUFBTSxVQUFVLEdBQUc7SUFDakIsc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix1QkFBdUI7SUFDdkIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixpQkFBaUI7Q0FDbEIsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUFHO0lBQ2pCLGlCQUFpQjtDQUNsQixDQUFDO0FBRUYsTUFBTSxPQUFPLEdBQUc7SUFDZCxZQUFZO0NBQ2IsQ0FBQztBQVFGLE1BQU0sT0FBTyxpQkFBaUI7O3FEQUFqQixpQkFBaUI7aUhBQWpCLGlCQUFpQixtQkFKakIsRUFBRSxZQURKLENBQUMsT0FBTyxDQUFDO3dGQUtQLGlCQUFpQixtQkF6QjVCLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCLEVBSWpCLGlCQUFpQixhQUlqQixZQUFZLGFBaEJaLHNCQUFzQjtRQUN0QixtQkFBbUI7UUFDbkIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixrQkFBa0I7UUFDbEIsaUJBQWlCLEVBSWpCLGlCQUFpQjtrREFhTixpQkFBaUI7Y0FON0IsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDbEIsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQzthQUNsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBBbW91bnRDYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcclxuLy9pbXBvcnQgeyBNb2RpZmlyZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9kaWZpcmVzLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IFNldEFtb3VudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDaGVja291dERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlXCI7XHJcbmltcG9ydCB7IFNldERpc2hDb21tZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGlzaENhbGNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xyXG5cclxuY29uc3QgRElSRUNUSVZFUyA9IFtcclxuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxyXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXHJcbiAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXHJcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcclxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcclxuICBEaXNoQ2FsY0RpcmVjdGl2ZSxcclxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcclxuICBTZXRBbW91bnREaXJlY3RpdmUsXHJcbiAgQ2hlY2tvdXREaXJlY3RpdmUsXHJcbl07XHJcblxyXG5jb25zdCBDT01QT05FTlRTID0gW1xyXG4gIERpc2hDYWxjQ29tcG9uZW50XHJcbl07XHJcblxyXG5jb25zdCBNT0RVTEVTID0gW1xyXG4gIENvbW1vbk1vZHVsZVxyXG5dO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbTU9EVUxFU10sXHJcbiAgcHJvdmlkZXJzOiBbXSxcclxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXSxcclxuICBleHBvcnRzOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU11cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0TW9kdWxlIHsgfVxyXG4iXX0=