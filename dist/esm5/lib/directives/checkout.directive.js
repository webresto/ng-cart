"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ng_restocart_service_1 = require("../services/ng-restocart.service");
var CheckoutDirective = /** @class */ (function () {
    function CheckoutDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.isChecking = new core_1.EventEmitter();
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} cart
         * @return {?}
         */
        function (cart) { return _this.cart = cart; }));
        this.cartService.OrderFormChange
            .pipe(operators_1.filter((/**
         * @return {?}
         */
        function () {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (_this.locationId || (_this.streetId || _this.street) && _this.home || _this.delivery) {
                return true;
            }
        })), operators_1.filter((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formChangeKey = JSON.stringify({
                1: _this.locationId,
                2: _this.streetId,
                3: _this.street,
                4: _this.home,
                5: _this.cartTotal,
                6: _this.bonuses,
                7: _this.delivery
            });
            if (formChangeKey !== _this.lastFormChangeKey) {
                _this.lastFormChangeKey = formChangeKey;
                return true;
            }
        })), operators_1.debounceTime(1000))
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
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.delivery) {
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
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
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
                "streetId": this.streetId,
                "street": this.street,
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
            .pipe(operators_1.tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result.action && result.action.paymentRedirect) {
                window.location.href = result.action.paymentRedirect;
            }
        })))
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
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "street": this.street,
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
        { type: core_1.Directive, args: [{
                    selector: '[checkout]'
                },] },
    ];
    /** @nocollapse */
    CheckoutDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        cartTotal: [{ type: core_1.Input }],
        bonuses: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        email: [{ type: core_1.Input }],
        phone: [{ type: core_1.Input }],
        delivery: [{ type: core_1.Input }],
        locationId: [{ type: core_1.Input }],
        street: [{ type: core_1.Input }],
        streetId: [{ type: core_1.Input }],
        home: [{ type: core_1.Input }],
        housing: [{ type: core_1.Input }],
        apartment: [{ type: core_1.Input }],
        entrance: [{ type: core_1.Input }],
        doorphone: [{ type: core_1.Input }],
        floor: [{ type: core_1.Input }],
        paymentMethod: [{ type: core_1.Input }],
        paymentMethodId: [{ type: core_1.Input }],
        personsCount: [{ type: core_1.Input }],
        comment: [{ type: core_1.Input }],
        success: [{ type: core_1.Output }],
        error: [{ type: core_1.Output }],
        isChecking: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return CheckoutDirective;
}());
exports.CheckoutDirective = CheckoutDirective;
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
    CheckoutDirective.prototype.street;
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
    CheckoutDirective.prototype.paymentMethodId;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0NBQW9HO0FBRXBHLDRDQUEwRDtBQUMxRCx5RUFBc0U7QUFFdEU7SUFxQ0UsMkJBQ1UsV0FBK0I7UUFEekMsaUJBbUNDO1FBbENTLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVQvQixZQUFPLEdBQUcsSUFBSSxtQkFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBQ25DLGVBQVUsR0FBRyxJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQVVqRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVM7Ozs7UUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFoQixDQUFnQixFQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO2FBQzdCLElBQUksQ0FDSCxrQkFBTTs7O1FBQUM7WUFDTCxrSEFBa0g7WUFDbEgsSUFBRyxLQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSSxDQUFDLElBQUksSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsRixPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxFQUFDLEVBQ0Ysa0JBQU07OztRQUFDOztnQkFDQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDbkMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxVQUFVO2dCQUNsQixDQUFDLEVBQUUsS0FBSSxDQUFDLFFBQVE7Z0JBQ2hCLENBQUMsRUFBRSxLQUFJLENBQUMsTUFBTTtnQkFDZCxDQUFDLEVBQUUs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LCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRlYm91bmNlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjaGVja291dF0nXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBjYXJ0VG90YWw6YW55O1xuXG4gIEBJbnB1dCgpIGJvbnVzZXM6IGFueTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZztcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xuICAgICAgICAgIGlmKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuZGVsaXZlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUNoYW5nZUtleSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIDE6IHRoaXMubG9jYXRpb25JZCxcbiAgICAgICAgICAgIDI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgICAgICAzOiB0aGlzLnN0cmVldCxcbiAgICAgICAgICAgIDQ6IHRoaXMuaG9tZSxcbiAgICAgICAgICAgIDU6IHRoaXMuY2FydFRvdGFsLFxuICAgICAgICAgICAgNjogdGhpcy5ib251c2VzLFxuICAgICAgICAgICAgNzogdGhpcy5kZWxpdmVyeVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja1N0cmVldCgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuZGVsaXZlcnkpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQsNC00YDQtdGBJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGAke2NvbW1lbnR9XFxyXFxu0J7Qv9C70LDRgtCwOiAke3BheW1lbnRNZXRob2R9YCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6IHRoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgZGF0YVtcInNlbGZEZWxpdmVyeVwiXSA9IHRoaXMuZGVsaXZlcnk7XG5cblxuICAgIGlmKHRoaXMuYm9udXNlcykge1xuICAgICAgZGF0YVsnYm9udXNlcyddID0gdGhpcy5ib251c2VzLm1hcChiID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBiLm5hbWUsXG4gICAgICAgICAgYW1vdW50OiBiLmFtb3VudFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLm9yZGVyQ2FydChkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXN1bHQgPT4ge1xuICAgICAgICAgIGlmKHJlc3VsdC5hY3Rpb24gJiYgcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3QpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2UubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KCkge1xuXG4gICAgLy9pZih0aGlzLnN0cmVldElkID09ICcwJykgcmV0dXJuO1xuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGAke2NvbW1lbnR9XFxyXFxu0J7Qv9C70LDRgtCwOiAke3BheW1lbnRNZXRob2R9YCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAvL1wicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIC8vXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgICBcInBob25lXCI6ICcrNzk5OTk5OTk5OTknLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6ICfQktCw0YHQsCdcbiAgICAgIH0sXG4gICAgICBcInBlcnNvbnNDb3VudFwiOiB0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cblxuICAgIC8vIGNvbnNvbGUubG9nKCdFRUVFRUVFRUVFRUUnLCB0aGlzLmRlbGl2ZXJ5KTtcblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG4gICAgaWYodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcbiAgICB9XG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNDaGVja2luZy5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5jaGVja1N0cmVldFYyKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLygpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgcmVzdWx0ID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpXG4gICAgICApO1xuICB9XG5cblxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcbiAgICBpZighcGhvbmUpIHJldHVybiAnJztcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcrNycpO1xuICB9XG59XG4iXX0=