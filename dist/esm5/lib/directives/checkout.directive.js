/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
import { NgRestoCartService } from '../services/ng-restocart.service';
var CheckoutDirective = /** @class */ (function () {
    function CheckoutDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} cart
         * @return {?}
         */
        function (cart) { return _this.cart = cart; }));
        this.cartService.OrderFormChange
            .pipe(filter((/**
         * @return {?}
         */
        function () {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (_this.locationId || _this.streetId && _this.home || _this.delivery) {
                return true;
            }
        })), filter((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formChangeKey = JSON.stringify({
                1: _this.locationId,
                2: _this.streetId,
                3: _this.home,
                4: _this.cartTotal,
                5: _this.bonuses,
                6: _this.delivery
            });
            if (formChangeKey !== _this.lastFormChangeKey) {
                _this.lastFormChangeKey = formChangeKey;
                return true;
            }
        })), debounceTime(1000))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.checkStreet(); }));
    }
    /**
     * @return {?}
     */
    CheckoutDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.locationId && !(this.streetId && this.home) && !this.delivery) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        /** @type {?} */
        var comment = this.comment || "Не указан";
        /** @type {?} */
        var paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        var data = {
            "cartId": this.cart.cartId,
            "comment": comment + "\r\n\u041E\u043F\u043B\u0430\u0442\u0430: " + paymentMethod,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
            "personsCount": this.personsCount
        };
        // console.log('FFFFFFFFFFFFFFFF', this.delivery);
        data["selfDelivery"] = this.delivery;
        if (this.bonuses) {
            data['bonuses'] = this.bonuses.map((/**
             * @param {?} b
             * @return {?}
             */
            function (b) {
                return {
                    name: b.name,
                    amount: b.amount
                };
            }));
        }
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "street": this.streetId,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        this.cartService
            .orderCart(data)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.success.emit(true); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CheckoutDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.cartService.OrderFormChange.next(changes);
    };
    /**
     * @return {?}
     */
    CheckoutDirective.prototype.checkStreet = /**
     * @return {?}
     */
    function () {
        //if(this.streetId == '0') return;
        var _this = this;
        //if(this.streetId == '0') return;
        /** @type {?} */
        var comment = this.comment || "Не указан";
        /** @type {?} */
        var paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        var data = {
            "cartId": this.cart.cartId,
            "comment": comment + "\r\n\u041E\u043F\u043B\u0430\u0442\u0430: " + paymentMethod,
            "customer": {
                //"phone": this.preparePhone(this.phone),
                //"name": this.name
                "phone": '+79999999999',
                "mail": this.email,
                "name": 'Васа'
            },
            "personsCount": this.personsCount
        };
        // console.log('EEEEEEEEEEEE', this.delivery);
        data["selfDelivery"] = this.delivery;
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "street": this.streetId,
                "home": this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        this.isChecking.emit(true);
        this.cartService
            .checkStreetV2(data)
            .subscribe((
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        /**
         * @param {?} result
         * @return {?}
         */
        function (result) { return _this.isChecking.emit(false); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.isChecking.emit(false); }));
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    CheckoutDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    };
    CheckoutDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[checkout]'
                },] },
    ];
    CheckoutDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        cartTotal: [{ type: Input }],
        bonuses: [{ type: Input }],
        name: [{ type: Input }],
        email: [{ type: Input }],
        phone: [{ type: Input }],
        delivery: [{ type: Input }],
        locationId: [{ type: Input }],
        streetId: [{ type: Input }],
        home: [{ type: Input }],
        housing: [{ type: Input }],
        apartment: [{ type: Input }],
        entrance: [{ type: Input }],
        doorphone: [{ type: Input }],
        floor: [{ type: Input }],
        paymentMethod: [{ type: Input }],
        personsCount: [{ type: Input }],
        comment: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        isChecking: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
    };
    return CheckoutDirective;
}());
export { CheckoutDirective };
if (false) {
    /** @type {?} */
    CheckoutDirective.prototype.cartTotal;
    /** @type {?} */
    CheckoutDirective.prototype.bonuses;
    /** @type {?} */
    CheckoutDirective.prototype.name;
    /** @type {?} */
    CheckoutDirective.prototype.email;
    /** @type {?} */
    CheckoutDirective.prototype.phone;
    /** @type {?} */
    CheckoutDirective.prototype.delivery;
    /** @type {?} */
    CheckoutDirective.prototype.locationId;
    /** @type {?} */
    CheckoutDirective.prototype.streetId;
    /** @type {?} */
    CheckoutDirective.prototype.home;
    /** @type {?} */
    CheckoutDirective.prototype.housing;
    /** @type {?} */
    CheckoutDirective.prototype.apartment;
    /** @type {?} */
    CheckoutDirective.prototype.entrance;
    /** @type {?} */
    CheckoutDirective.prototype.doorphone;
    /** @type {?} */
    CheckoutDirective.prototype.floor;
    /** @type {?} */
    CheckoutDirective.prototype.paymentMethod;
    /** @type {?} */
    CheckoutDirective.prototype.personsCount;
    /** @type {?} */
    CheckoutDirective.prototype.comment;
    /** @type {?} */
    CheckoutDirective.prototype.success;
    /** @type {?} */
    CheckoutDirective.prototype.error;
    /** @type {?} */
    CheckoutDirective.prototype.isChecking;
    /** @type {?} */
    CheckoutDirective.prototype.cart;
    /** @type {?} */
    CheckoutDirective.prototype.lastFormChangeKey;
    /**
     * @type {?}
     * @private
     */
    CheckoutDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBTyxNQUFNLGdCQUFnQixDQUFBO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBbUNFLDJCQUNVLFdBQStCO1FBRHpDLGlCQWtDQztRQWpDUyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFUL0IsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFTakQsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsRUFBQyxDQUFDO1FBR3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTthQUM3QixJQUFJLENBQ0gsTUFBTTs7O1FBQUM7WUFDTCxrSEFBa0g7WUFDbEgsSUFBRyxLQUFJLENBQUMsVUFBVSxJQUFJLEtBQUksQ0FBQyxRQUFRLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqRSxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxFQUFDLEVBQ0YsTUFBTTs7O1FBQUM7O2dCQUNDLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQyxD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Q0wsS0FBSzswQkFFTCxNQUFNO3dCQUNOLE1BQU07NkJBQ04sTUFBTTswQkEwQ04sWUFBWSxTQUFDLE9BQU87O0lBd0h2Qix3QkFBQztDQUFBLEFBL0xELElBK0xDO1NBNUxZLGlCQUFpQjs7O0lBRTVCLHNDQUF1Qjs7SUFFdkIsb0NBQXNCOztJQUV0QixpQ0FBc0I7O0lBQ3RCLGtDQUF1Qjs7SUFDdkIsa0NBQXVCOztJQUN2QixxQ0FBdUI7O0lBQ3ZCLHVDQUE0Qjs7SUFFNUIscUNBQTBCOztJQUMxQixpQ0FBc0I7O0lBQ3RCLG9DQUF5Qjs7SUFDekIsc0NBQTJCOztJQUMzQixxQ0FBMEI7O0lBQzFCLHNDQUEyQjs7SUFDM0Isa0NBQXVCOztJQUV2QiwwQ0FBK0I7O0lBQy9CLHlDQUE4Qjs7SUFDOUIsb0NBQXlCOztJQUV6QixvQ0FBZ0Q7O0lBQ2hELGtDQUE2Qzs7SUFDN0MsdUNBQW1EOztJQUduRCxpQ0FBVTs7SUFDViw4Q0FBMEI7Ozs7O0lBR3hCLHdDQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBkZWJvdW5jZVRpbWUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBkZWxpdmVyeTogYW55O1xuICBASW5wdXQoKSBsb2NhdGlvbklkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcnNvbnNDb3VudDogbnVtYmVyO1xuICBASW5wdXQoKSBjb21tZW50OiBzdHJpbmc7XG4gIFxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBpc0NoZWNraW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cbiAgY2FydDogYW55O1xuICBsYXN0Rm9ybUNoYW5nZUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZVxuICApIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xuXG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XG4gICAgICAgICAgaWYodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQgJiYgdGhpcy5ob21lIHx8IHRoaXMuZGVsaXZlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUNoYW5nZUtleSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIDE6IHRoaXMubG9jYXRpb25JZCxcbiAgICAgICAgICAgIDI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgICAgICAzOiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA0OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDU6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDY6IHRoaXMuZGVsaXZlcnlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkgPSBmb3JtQ2hhbmdlS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tTdHJlZXQoKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYoIXRoaXMubG9jYXRpb25JZCAmJiAhKHRoaXMuc3RyZWV0SWQgJiYgdGhpcy5ob21lKSAmJiAhdGhpcy5kZWxpdmVyeSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLQndC1INGD0LrQsNC30LDQvdC+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7QntC/0LvQsNGC0LA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG4gICAgLy8gY29uc29sZS5sb2coJ0ZGRkZGRkZGRkZGRkZGRkYnLCB0aGlzLmRlbGl2ZXJ5KTtcblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG5cbiAgICBpZih0aGlzLmJvbnVzZXMpIHtcbiAgICAgIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxuICAgICAgICAgIGFtb3VudDogYi5hbW91bnRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5vcmRlckNhcnQoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlLm5leHQoY2hhbmdlcyk7XG4gIH1cblxuICBjaGVja1N0cmVldCgpIHtcblxuICAgIC8vaWYodGhpcy5zdHJlZXRJZCA9PSAnMCcpIHJldHVybjtcblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcItCd0LUg0YPQutCw0LfQsNC90L5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBgJHtjb21tZW50fVxcclxcbtCe0L/Qu9Cw0YLQsDogJHtwYXltZW50TWV0aG9kfWAsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgLy9cInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICAvL1wibmFtZVwiOiB0aGlzLm5hbWVcbiAgICAgICAgXCJwaG9uZVwiOiAnKzc5OTk5OTk5OTk5JyxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiAn0JLQsNGB0LAnXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygnRUVFRUVFRUVFRUVFJywgdGhpcy5kZWxpdmVyeSk7XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNDaGVja2luZy5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5jaGVja1N0cmVldFYyKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLygpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgcmVzdWx0ID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpXG4gICAgICApO1xuICB9XG5cblxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcbiAgICBpZighcGhvbmUpIHJldHVybiAnJztcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcrNycpO1xuICB9XG59XG4iXX0=