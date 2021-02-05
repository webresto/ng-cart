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
export class NgRestoCartModule {
}
NgRestoCartModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctY2FydC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy9saWIvbmctY2FydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDakYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDekUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDcEUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUE4Qi9FLE1BQU0sT0FBTyxpQkFBaUI7OztZQTVCN0IsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsU0FBUyxFQUFFLEVBQUU7Z0JBQ2IsWUFBWSxFQUFFO29CQUNaLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHNCQUFzQjtvQkFDdEIsbUJBQW1CO29CQUNuQix1QkFBdUI7b0JBQ3ZCLHNCQUFzQjtvQkFDdEIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIsa0JBQWtCO29CQUNsQixpQkFBaUI7b0JBQ2pCLGlCQUFpQjtpQkFDbEI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE1vZGlmaXJlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2RpZmlyZXMuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgRGlzaENhbGNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBEaXNoQ2FsY0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudCc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIHByb3ZpZGVyczogW10sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxyXG4gICAgQW1vdW50Q2FydERpcmVjdGl2ZSxcclxuICAgIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxyXG4gICAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcclxuICAgIE1vZGlmaXJlc0RpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjRGlyZWN0aXZlLFxyXG4gICAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXHJcbiAgICBTZXRBbW91bnREaXJlY3RpdmUsXHJcbiAgICBDaGVja291dERpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjQ29tcG9uZW50XHJcbiAgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxyXG4gICAgQW1vdW50Q2FydERpcmVjdGl2ZSxcclxuICAgIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxyXG4gICAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcclxuICAgIE1vZGlmaXJlc0RpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjRGlyZWN0aXZlLFxyXG4gICAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXHJcbiAgICBTZXRBbW91bnREaXJlY3RpdmUsXHJcbiAgICBDaGVja291dERpcmVjdGl2ZSxcclxuICAgIERpc2hDYWxjQ29tcG9uZW50XHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRNb2R1bGUgeyB9XHJcbiJdfQ==