/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
var DishCalcProDirective = /** @class */ (function () {
    function DishCalcProDirective(cartService) {
        this.cartService = cartService;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.amountModifires = {};
        this.stateModifiers = {};
    }
    /**
     * @return {?}
     */
    DishCalcProDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    /**
     * @return {?}
     */
    DishCalcProDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    };
    DishCalcProDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dishCalcPro]'
                },] },
    ];
    /** @nocollapse */
    DishCalcProDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    DishCalcProDirective.propDecorators = {
        dish: [{ type: Input }],
        amount: [{ type: Input }],
        selectedModifiers: [{ type: Input }],
        validate: [{ type: Output }],
        amountDishToAdd: [{ type: Output }]
    };
    return DishCalcProDirective;
}());
export { DishCalcProDirective };
if (false) {
    /** @type {?} */
    DishCalcProDirective.prototype.dish;
    /** @type {?} */
    DishCalcProDirective.prototype.amount;
    /** @type {?} */
    DishCalcProDirective.prototype.selectedModifiers;
    /** @type {?} */
    DishCalcProDirective.prototype.validate;
    /** @type {?} */
    DishCalcProDirective.prototype.amountDishToAdd;
    /** @type {?} */
    DishCalcProDirective.prototype.weightTotal;
    /** @type {?} */
    DishCalcProDirective.prototype.amountDish;
    /** @type {?} */
    DishCalcProDirective.prototype.price;
    /** @type {?} */
    DishCalcProDirective.prototype.amountModifires;
    /** @type {?} */
    DishCalcProDirective.prototype.stateModifiers;
    /**
     * @type {?}
     * @private
     */
    DishCalcProDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLXByby5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy1wcm8uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBaUJFLDhCQUFvQixXQUE4QjtRQUE5QixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFUdkMsYUFBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELG9CQUFlLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLbEUsb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFDekIsbUJBQWMsR0FBTyxFQUFFLENBQUM7SUFFNkIsQ0FBQzs7OztJQUV0RCx1Q0FBUTs7O0lBQVIsY0FBWSxDQUFDOzs7O0lBRWIsMENBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQXhCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7aUJBQzFCOzs7O2dCQUpRLGtCQUFrQjs7O3VCQU94QixLQUFLO3lCQUNMLEtBQUs7b0NBQ0wsS0FBSzsyQkFDTCxNQUFNO2tDQUNOLE1BQU07O0lBaUJULDJCQUFDO0NBQUEsQUExQkQsSUEwQkM7U0F2Qlksb0JBQW9COzs7SUFFL0Isb0NBQW1COztJQUNuQixzQ0FBcUI7O0lBQ3JCLGlEQUFnQzs7SUFDaEMsd0NBQTJEOztJQUMzRCwrQ0FBa0U7O0lBRWxFLDJDQUFZOztJQUNaLDBDQUFXOztJQUNYLHFDQUFNOztJQUNOLCtDQUF5Qjs7SUFDekIsOENBQXdCOzs7OztJQUVaLDJDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpc2hDYWxjUHJvXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNQcm9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdlaWdodFRvdGFsO1xuICBhbW91bnREaXNoO1xuICBwcmljZTtcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xuICBzdGF0ZU1vZGlmaWVyczphbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XG4gIH1cblxufVxuIl19