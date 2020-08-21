/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime, tap } from 'rxjs/operators';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class CheckoutDirective {
    /**
     * @param {?} cartService
     */
    constructor(cartService) {
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
        cart => this.cart = cart));
        this.cartService.OrderFormChange
            .pipe(filter((/**
         * @return {?}
         */
        () => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.delivery) {
                return true;
            }
        })), filter((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const formChangeKey = JSON.stringify({
                1: this.locationId,
                2: this.streetId,
                3: this.street,
                4: this.home,
                5: this.cartTotal,
                6: this.bonuses,
                7: this.delivery
            });
            if (formChangeKey !== this.lastFormChangeKey) {
                this.lastFormChangeKey = formChangeKey;
                return true;
            }
        })), debounceTime(1000))
            .subscribe((/**
         * @return {?}
         */
        () => this.checkStreet()));
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.delivery) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        /** @type {?} */
        let comment = this.comment || "Не указан";
        /** @type {?} */
        let paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        let data = {
            "cartId": this.cart.cartId,
            "comment": `${comment}\r\nОплата: ${paymentMethod}`,
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
            b => {
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
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            if (result.action && result.action.paymentRedirect) {
                window.location.href = result.action.paymentRedirect;
            }
        })))
            .subscribe((/**
         * @return {?}
         */
        () => this.success.emit(true)), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.error.emit(error)));
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        this.cartService.OrderFormChange.next(changes);
    }
    /**
     * @return {?}
     */
    checkStreet() {
        //if(this.streetId == '0') return;
        //if(this.streetId == '0') return;
        /** @type {?} */
        let comment = this.comment || "Не указан";
        /** @type {?} */
        let paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        let data = {
            "cartId": this.cart.cartId,
            "comment": `${comment}\r\nОплата: ${paymentMethod}`,
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
        /**
         * @param {?} result
         * @return {?}
         */
        result => this.isChecking.emit(false)), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.isChecking.emit(false)));
    }
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[checkout]'
            },] },
];
/** @nocollapse */
CheckoutDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
CheckoutDirective.propDecorators = {
    cartTotal: [{ type: Input }],
    bonuses: [{ type: Input }],
    name: [{ type: Input }],
    email: [{ type: Input }],
    phone: [{ type: Input }],
    delivery: [{ type: Input }],
    locationId: [{ type: Input }],
    street: [{ type: Input }],
    streetId: [{ type: Input }],
    home: [{ type: Input }],
    housing: [{ type: Input }],
    apartment: [{ type: Input }],
    entrance: [{ type: Input }],
    doorphone: [{ type: Input }],
    floor: [{ type: Input }],
    paymentMethod: [{ type: Input }],
    paymentMethodId: [{ type: Input }],
    personsCount: [{ type: Input }],
    comment: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    isChecking: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHdlYnJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQTtBQUMxRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUt0RSxNQUFNLE9BQU8saUJBQWlCOzs7O0lBa0M1QixZQUNVLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVQvQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVVqRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVM7Ozs7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO2FBQzdCLElBQUksQ0FDSCxNQUFNOzs7UUFBQyxHQUFHLEVBQUU7WUFDVixrSEFBa0g7WUFDbEgsSUFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNsRixPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxFQUFDLEVBQ0YsTUFBTTs7O1FBQUMs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dGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBkZWJvdW5jZVRpbWUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBkZWxpdmVyeTogYW55O1xuICBASW5wdXQoKSBsb2NhdGlvbklkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6IHN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xuICBASW5wdXQoKSBwYXltZW50TWV0aG9kSWQ6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uc0NvdW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcbiAgXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIGlzQ2hlY2tpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cblxuICBjYXJ0OiBhbnk7XG4gIGxhc3RGb3JtQ2hhbmdlS2V5OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlXG4gICkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IHtcbiAgICAgICAgICAvL2lmKCh0aGlzLmxvY2F0aW9uSWQgfHwgdGhpcy5zdHJlZXRJZCkgJiYgdGhpcy5ob21lICYmIHRoaXMucGhvbmUgJiYgdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkubGVuZ3RoID4gMTEpIHtcbiAgICAgICAgICBpZih0aGlzLmxvY2F0aW9uSWQgfHwgKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSB8fCB0aGlzLmRlbGl2ZXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkgPSBmb3JtQ2hhbmdlS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tTdHJlZXQoKSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgaWYoIXRoaXMubG9jYXRpb25JZCAmJiAhKCh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUpICYmICF0aGlzLmRlbGl2ZXJ5KSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0YPQttC90L4g0YPQutCw0LfQsNGC0Ywg0LDQtNGA0LXRgScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcItCd0LUg0YPQutCw0LfQsNC90L5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBgJHtjb21tZW50fVxcclxcbtCe0L/Qu9Cw0YLQsDogJHtwYXltZW50TWV0aG9kfWAsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgXCJwaG9uZVwiOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWVcbiAgICAgIH0sXG4gICAgICBcInBlcnNvbnNDb3VudFwiOiB0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG5cbiAgICBpZih0aGlzLmJvbnVzZXMpIHtcbiAgICAgIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxuICAgICAgICAgIGFtb3VudDogYi5hbW91bnRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5vcmRlckNhcnQoZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAocmVzdWx0ID0+IHtcbiAgICAgICAgICBpZihyZXN1bHQuYWN0aW9uICYmIHJlc3VsdC5hY3Rpb24ucGF5bWVudFJlZGlyZWN0KSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3VsdC5hY3Rpb24ucGF5bWVudFJlZGlyZWN0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICApO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlLm5leHQoY2hhbmdlcyk7XG4gIH1cblxuICBjaGVja1N0cmVldCgpIHtcblxuICAgIC8vaWYodGhpcy5zdHJlZXRJZCA9PSAnMCcpIHJldHVybjtcblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcItCd0LUg0YPQutCw0LfQsNC90L5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBgJHtjb21tZW50fVxcclxcbtCe0L/Qu9Cw0YLQsDogJHtwYXltZW50TWV0aG9kfWAsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgLy9cInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICAvL1wibmFtZVwiOiB0aGlzLm5hbWVcbiAgICAgICAgXCJwaG9uZVwiOiAnKzc5OTk5OTk5OTk5JyxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiAn0JLQsNGB0LAnXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygnRUVFRUVFRUVFRUVFJywgdGhpcy5kZWxpdmVyeSk7XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzQ2hlY2tpbmcuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuY2hlY2tTdHJlZXRWMihkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8oKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgLy9lcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICAgIHJlc3VsdCA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgaWYoIXBob25lKSByZXR1cm4gJyc7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnKzcnKTtcbiAgfVxufVxuIl19