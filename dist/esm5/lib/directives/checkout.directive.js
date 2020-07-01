/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
            .subscribe(function (cart) { return _this.cart = cart; });
        this.cartService.OrderFormChange
            .pipe(filter(function () {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (_this.locationId || _this.streetId && _this.home || _this.delivery) {
                return true;
            }
        }), filter(function () {
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
        }), debounceTime(1000))
            .subscribe(function () { return _this.checkStreet(); });
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
            data['bonuses'] = this.bonuses.map(function (b) {
                return {
                    name: b.name,
                    amount: b.amount
                };
            });
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
            .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
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
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        function (result) { return _this.isChecking.emit(false); }, function (error) { return _this.isChecking.emit(false); });
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
    /** @type {?} */
    CheckoutDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBTyxNQUFNLGdCQUFnQixDQUFBO0FBQzFELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRXRFO0lBbUNFLDJCQUNVLFdBQStCO1FBRHpDLGlCQWtDQztRQWpDUyxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFUL0IsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFTakQsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBR3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTthQUM3QixJQUFJLENBQ0gsTUFBTSxDQUFDO1lBQ0wsa0hBQWtIO1lBQ2xILElBQUcsS0FBSSxDQUFDLFVBQVUsSUFBSSxLQUFJLENBQUMsUUFBUSxJQUFJLEtBQUksQ0FBQyxJQUFJLElBQUksS0FBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakUsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxFQUNGLE1BQU0sQ0FBQzs7Z0JBQ0MsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25DLENBQUMsRUFB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QUFNOzZCQUNOLE1BQU07MEJBMENOLFlBQVksU0FBQyxPQUFPOztJQXdIdkIsd0JBQUM7Q0FBQSxBQS9MRCxJQStMQztTQTVMWSxpQkFBaUI7OztJQUU1QixzQ0FBdUI7O0lBRXZCLG9DQUFzQjs7SUFFdEIsaUNBQXNCOztJQUN0QixrQ0FBdUI7O0lBQ3ZCLGtDQUF1Qjs7SUFDdkIscUNBQXVCOztJQUN2Qix1Q0FBNEI7O0lBRTVCLHFDQUEwQjs7SUFDMUIsaUNBQXNCOztJQUN0QixvQ0FBeUI7O0lBQ3pCLHNDQUEyQjs7SUFDM0IscUNBQTBCOztJQUMxQixzQ0FBMkI7O0lBQzNCLGtDQUF1Qjs7SUFFdkIsMENBQStCOztJQUMvQix5Q0FBOEI7O0lBQzlCLG9DQUF5Qjs7SUFFekIsb0NBQWdEOztJQUNoRCxrQ0FBNkM7O0lBQzdDLHVDQUFtRDs7SUFHbkQsaUNBQVU7O0lBQ1YsOENBQTBCOztJQUd4Qix3Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZGVib3VuY2VUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NoZWNrb3V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIGNhcnRUb3RhbDphbnk7XG5cbiAgQElucHV0KCkgYm9udXNlczogYW55O1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgZW1haWw6IHN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZGVsaXZlcnk6IGFueTtcbiAgQElucHV0KCkgbG9jYXRpb25JZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6IHN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KTtcblxuXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xuICAgICAgICAgIGlmKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkICYmIHRoaXMuaG9tZSB8fCB0aGlzLmRlbGl2ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5ob21lLFxuICAgICAgICAgICAgNDogdGhpcy5jYXJ0VG90YWwsXG4gICAgICAgICAgICA1OiB0aGlzLmJvbnVzZXMsXG4gICAgICAgICAgICA2OiB0aGlzLmRlbGl2ZXJ5XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZihmb3JtQ2hhbmdlS2V5ICE9PSB0aGlzLmxhc3RGb3JtQ2hhbmdlS2V5KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RGb3JtQ2hhbmdlS2V5ID0gZm9ybUNoYW5nZUtleTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLmxvY2F0aW9uSWQgJiYgISh0aGlzLnN0cmVldElkICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuZGVsaXZlcnkpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQsNC00YDQtdGBJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGAke2NvbW1lbnR9XFxyXFxu0J7Qv9C70LDRgtCwOiAke3BheW1lbnRNZXRob2R9YCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6IHRoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIC8vIGNvbnNvbGUubG9nKCdGRkZGRkZGRkZGRkZGRkZGJywgdGhpcy5kZWxpdmVyeSk7XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuXG4gICAgaWYodGhpcy5ib251c2VzKSB7XG4gICAgICBkYXRhWydib251c2VzJ10gPSB0aGlzLmJvbnVzZXMubWFwKGIgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGIubmFtZSxcbiAgICAgICAgICBhbW91bnQ6IGIuYW1vdW50XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoKSB7XG5cbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLQndC1INGD0LrQsNC30LDQvdC+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7QntC/0LvQsNGC0LA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIC8vXCJwaG9uZVwiOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgICAgLy9cIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICAgIFwicGhvbmVcIjogJys3OTk5OTk5OTk5OScsXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogJ9CS0LDRgdCwJ1xuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6IHRoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuXG4gICAgLy8gY29uc29sZS5sb2coJ0VFRUVFRUVFRUVFRScsIHRoaXMuZGVsaXZlcnkpO1xuXG4gICAgZGF0YVtcInNlbGZEZWxpdmVyeVwiXSA9IHRoaXMuZGVsaXZlcnk7XG5cblxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzQ2hlY2tpbmcuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuY2hlY2tTdHJlZXRWMihkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8oKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgLy9lcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICAgIHJlc3VsdCA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgaWYoIXBob25lKSByZXR1cm4gJyc7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnKzcnKTtcbiAgfVxufVxuIl19