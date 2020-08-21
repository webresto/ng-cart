/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { AddDishToCartDirective } from './directives/add-dish-to-cart.directive';
import { AmountCartDirective } from './directives/amount-cart.directive';
import { DeleteFromCartDirective } from './directives/delete-from-cart.directive';
import { OrderCartUserDirective } from './directives/order-cart-user.directive';
//import { ModifiresDirective } from './directives/modifires.directive';
import { SetAmountDirective } from './directives/set-amount.directive';
import { DishCalcDirective } from './directives/dish-calc.directive';
import { DishCalcProDirective } from './directives/dish-calc-pro.directive';
import { CheckoutDirective } from "./directives/checkout.directive";
import { SetDishCommentDirective } from './directives/set-dish-comment.directive';
import { DishCalcComponent } from './components/dish-calc/dish-calc.component';
/** @type {?} */
const DIRECTIVES = [
    AddDishToCartDirective,
    AmountCartDirective,
    DeleteFromCartDirective,
    OrderCartUserDirective,
    //ModifiresDirective,
    DishCalcDirective,
    DishCalcProDirective,
    SetDishCommentDirective,
    SetAmountDirective,
    CheckoutDirective,
];
/** @type {?} */
const COMPONENTS = [
    DishCalcComponent
];
/** @type {?} */
const MODULES = [];
export class NgRestoCartModule {
}
NgRestoCartModule.decorators = [
    { type: NgModule, args: [{
                imports: [MODULES],
                providers: [],
                declarations: [DIRECTIVES, COMPONENTS],
                exports: [DIRECTIVES, COMPONENTS]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9uZy1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV6QyxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7QUFFaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7O01BRXpFLFVBQVUsR0FBRztJQUNqQixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLGlCQUFpQjtJQUNqQixvQkFBb0I7SUFDcEIsdUJBQXVCO0lBQ3ZCLGtCQUFrQjtJQUNsQixpQkFBaUI7Q0FDbEI7O01BRUssVUFBVSxHQUFHO0lBQ2pCLGlCQUFpQjtDQUNsQjs7TUFFSyxPQUFPLEdBQUcsRUFDZjtBQVFELE1BQU0sT0FBTyxpQkFBaUI7OztZQU43QixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNsQixTQUFTLEVBQUUsRUFBRTtnQkFDYixZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2FBQ2xDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBbW91bnRDYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPcmRlckNhcnRVc2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUnO1xuLy9pbXBvcnQgeyBNb2RpZmlyZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9kaWZpcmVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZXRBbW91bnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY1Byb0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMtcHJvLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDaGVja291dERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudCc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXG4gIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxuICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcbiAgRGlzaENhbGNEaXJlY3RpdmUsXG4gIERpc2hDYWxjUHJvRGlyZWN0aXZlLFxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZSxcbl07XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIERpc2hDYWxjQ29tcG9uZW50XG5dO1xuXG5jb25zdCBNT0RVTEVTID0gW1xuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01PRFVMRVNdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVMsIENPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0TW9kdWxlIHsgfVxuIl19