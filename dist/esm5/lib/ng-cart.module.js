"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var add_dish_to_cart_directive_1 = require("./directives/add-dish-to-cart.directive");
var amount_cart_directive_1 = require("./directives/amount-cart.directive");
var delete_from_cart_directive_1 = require("./directives/delete-from-cart.directive");
var order_cart_user_directive_1 = require("./directives/order-cart-user.directive");
//import { ModifiresDirective } from './directives/modifires.directive';
var set_amount_directive_1 = require("./directives/set-amount.directive");
var dish_calc_directive_1 = require("./directives/dish-calc.directive");
var checkout_directive_1 = require("./directives/checkout.directive");
var set_dish_comment_directive_1 = require("./directives/set-dish-comment.directive");
var dish_calc_component_1 = require("./components/dish-calc/dish-calc.component");
var dish_calc_ln_component_1 = require("./components/dish-calc-ln/dish-calc-ln.component");
var DIRECTIVES = [
    add_dish_to_cart_directive_1.AddDishToCartDirective,
    amount_cart_directive_1.AmountCartDirective,
    delete_from_cart_directive_1.DeleteFromCartDirective,
    order_cart_user_directive_1.OrderCartUserDirective,
    //ModifiresDirective,
    dish_calc_directive_1.DishCalcDirective,
    set_dish_comment_directive_1.SetDishCommentDirective,
    set_amount_directive_1.SetAmountDirective,
    checkout_directive_1.CheckoutDirective,
];
var COMPONENTS = [
    dish_calc_component_1.DishCalcComponent,
    dish_calc_ln_component_1.DishCalcLnComponent
];
var MODULES = [
    common_1.CommonModule
];
var NgRestoCartModule = /** @class */ (function () {
    function NgRestoCartModule() {
    }
    NgRestoCartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [MODULES],
                    providers: [],
                    declarations: [DIRECTIVES, COMPONENTS],
                    exports: [DIRECTIVES, COMPONENTS]
                },] },
    ];
    return NgRestoCartModule;
}());
exports.NgRestoCartModule = NgRestoCartModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9uZy1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0Msc0ZBQWlGO0FBQ2pGLDRFQUF5RTtBQUN6RSxzRkFBa0Y7QUFDbEYsb0ZBQWdGO0FBQ2hGLHdFQUF3RTtBQUN4RSwwRUFBdUU7QUFDdkUsd0VBQXFFO0FBQ3JFLHNFQUFvRTtBQUNwRSxzRkFBa0Y7QUFDbEYsa0ZBQStFO0FBQy9FLDJGQUF1RjtBQUV2RixJQUFNLFVBQVUsR0FBRztJQUNqQixtREFBc0I7SUFDdEIsMkNBQW1CO0lBQ25CLG9EQUF1QjtJQUN2QixrREFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLHVDQUFpQjtJQUNqQixvREFBdUI7SUFDdkIseUNBQWtCO0lBQ2xCLHNDQUFpQjtDQUNsQixDQUFDO0FBRUYsSUFBTSxVQUFVLEdBQUc7SUFDakIsdUNBQWlCO0lBQ2pCLDRDQUFtQjtDQUNwQixDQUFDO0FBRUYsSUFBTSxPQUFPLEdBQUc7SUFDZCxxQkFBWTtDQUNiLENBQUM7QUFFRjtJQUFBO0lBTWlDLENBQUM7O2dCQU5qQyxlQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO29CQUNsQixTQUFTLEVBQUUsRUFBRTtvQkFDYixZQUFZLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO29CQUN0QyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO2lCQUNsQzs7SUFDZ0Msd0JBQUM7Q0FBQSxBQU5sQyxJQU1rQztBQUFyQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlzaENhbGNMbkNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNoLWNhbGMtbG4vZGlzaC1jYWxjLWxuLmNvbXBvbmVudCc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXG4gIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxuICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcbiAgRGlzaENhbGNEaXJlY3RpdmUsXG4gIFNldERpc2hDb21tZW50RGlyZWN0aXZlLFxuICBTZXRBbW91bnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlLFxuXTtcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgRGlzaENhbGNDb21wb25lbnQsXG4gIERpc2hDYWxjTG5Db21wb25lbnRcbl07XG5cbmNvbnN0IE1PRFVMRVMgPSBbXG4gIENvbW1vbk1vZHVsZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01PRFVMRVNdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVMsIENPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0TW9kdWxlIHsgfVxuIl19