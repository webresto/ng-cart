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
    dish_calc_component_1.DishCalcComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9uZy1jYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QywwQ0FBK0M7QUFDL0Msc0ZBQWlGO0FBQ2pGLDRFQUF5RTtBQUN6RSxzRkFBa0Y7QUFDbEYsb0ZBQWdGO0FBQ2hGLHdFQUF3RTtBQUN4RSwwRUFBdUU7QUFDdkUsd0VBQXFFO0FBQ3JFLHNFQUFvRTtBQUNwRSxzRkFBa0Y7QUFDbEYsa0ZBQStFO0FBRS9FLElBQU0sVUFBVSxHQUFHO0lBQ2pCLG1EQUFzQjtJQUN0QiwyQ0FBbUI7SUFDbkIsb0RBQXVCO0lBQ3ZCLGtEQUFzQjtJQUN0QixxQkFBcUI7SUFDckIsdUNBQWlCO0lBQ2pCLG9EQUF1QjtJQUN2Qix5Q0FBa0I7SUFDbEIsc0NBQWlCO0NBQ2xCLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRztJQUNqQix1Q0FBaUI7Q0FDbEIsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFHO0lBQ2QscUJBQVk7Q0FDYixDQUFDO0FBRUY7SUFBQTtJQU1pQyxDQUFDOztnQkFOakMsZUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztvQkFDbEIsU0FBUyxFQUFFLEVBQUU7b0JBQ2IsWUFBWSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztvQkFDdEMsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQztpQkFDbEM7O0lBQ2dDLHdCQUFDO0NBQUEsQUFObEMsSUFNa0M7QUFBckIsOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFtb3VudENhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG4vL2ltcG9ydCB7IE1vZGlmaXJlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2RpZmlyZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNldEFtb3VudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFNldERpc2hDb21tZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50JztcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSxcbiAgQW1vdW50Q2FydERpcmVjdGl2ZSxcbiAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXG4gIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUsXG4gIC8vTW9kaWZpcmVzRGlyZWN0aXZlLFxuICBEaXNoQ2FsY0RpcmVjdGl2ZSxcbiAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXG4gIFNldEFtb3VudERpcmVjdGl2ZSxcbiAgQ2hlY2tvdXREaXJlY3RpdmUsXG5dO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBEaXNoQ2FsY0NvbXBvbmVudFxuXTtcblxuY29uc3QgTU9EVUxFUyA9IFtcbiAgQ29tbW9uTW9kdWxlXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTU9EVUxFU10sXG4gIHByb3ZpZGVyczogW10sXG4gIGRlY2xhcmF0aW9uczogW0RJUkVDVElWRVMsIENPTVBPTkVOVFNdLFxuICBleHBvcnRzOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU11cbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRNb2R1bGUgeyB9XG4iXX0=