/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class CheckoutDirective {
    /**
     * @param {?} cartService
     */
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} cart
         * @return {?}
         */
        cart => this.cart = cart));
        this.cartService.OrderFormChange.subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res)
                this.checkStreet();
        }));
    }
    /**
     * @return {?}
     */
    onClick() {
        if (!this.locationId && !(this.streetId && this.home)) {
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
        // console.log('FFFFFFFFFFFFFFFF', this.delivery);
        data["selfDelivery"] = this.delivery;
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                "streetId": this.streetId,
                "home": +this.home,
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
        () => this.success.emit(true)), (/**
         * @param {?} error
         * @return {?}
         */
        error => this.error.emit(error)));
    }
    /*  ngOnChanges(changes: SimpleChanges) {
        //if(!changes.locationId && !changes.streetId && !changes.home) return;
        // this.checkStreet();
        console.log('CHANGES', changes);
      }*/
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
                "phone": '+78888888888',
                "mail": this.email,
                "name": this.name
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
                "streetId": this.streetId,
                "home": +this.home,
                "housing": this.housing,
                "doorphone": this.doorphone || '',
                "entrance": this.entrance || '',
                "floor": this.floor || '',
                "apartment": this.apartment || ''
            };
        }
        this.cartService
            .checkStreetV2(data)
            .subscribe((
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        /**
         * @param {?} result
         * @return {?}
         */
        result => console.info('Check street result', result)), (/**
         * @param {?} error
         * @return {?}
         */
        error => console.info('Check street error', error)));
    }
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[checkout]'
            },] },
];
CheckoutDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
CheckoutDirective.propDecorators = {
    cartTotal: [{ type: Input }],
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
    formIsChanged: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    CheckoutDirective.prototype.cartTotal;
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
    CheckoutDirective.prototype.formIsChanged;
    /** @type {?} */
    CheckoutDirective.prototype.success;
    /** @type {?} */
    CheckoutDirective.prototype.error;
    /** @type {?} */
    CheckoutDirective.prototype.cart;
    /**
     * @type {?}
     * @private
     */
    CheckoutDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQWtCLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUt0RSxNQUFNOzs7O0lBNkJKLFlBQ1UsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBUC9CLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBUTNDLElBQUksQ0FBQyxXQUFXO2FBQ2IsUUFBUSxFQUFFO2FBQ1YsU0FBUzs7OztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxTQUFTOzs7O1FBQUMsR0FBRyxDQUFBLEVBQUU7WUFDOUMsSUFBRyxHQUFHO2dCQUNKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUMsQ0FBQTtJQUNKLENBQUM7Ozs7SUFHRCxPQUFPO1FBRUwsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkMsT0FBTztTQUNSOztZQUVHLE9BQU8sR0FB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QzFCLGtDQUFzQjs7SUFFdEIsMENBQThCOztJQUM5Qix5Q0FBNkI7O0lBQzdCLG9DQUF3Qjs7SUFDeEIsMENBQXdDOztJQUV4QyxvQ0FBZ0Q7O0lBQ2hELGtDQUE2Qzs7SUFHN0MsaUNBQVU7Ozs7O0lBR1Isd0NBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OmFueTtcbiAgQElucHV0KCkgbG9jYXRpb25JZDpzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGRvb3JwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOnN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOnN0cmluZztcbiAgQElucHV0KCkgcGVyc29uc0NvdW50Om51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcm1Jc0NoYW5nZWQ6IE9ic2VydmFibGU8YW55PjtcbiAgXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuXG4gIGNhcnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5zdWJzY3JpYmUocmVzPT57XG4gICAgICBpZihyZXMpXG4gICAgICAgIHRoaXMuY2hlY2tTdHJlZXQoKTtcbiAgICB9KVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuXG4gICAgaWYoIXRoaXMubG9jYXRpb25JZCAmJiAhKHRoaXMuc3RyZWV0SWQgJiYgdGhpcy5ob21lKSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLQndC1INGD0LrQsNC30LDQvdC+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7QntC/0LvQsNGC0LA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG4gICAgLy8gY29uc29sZS5sb2coJ0ZGRkZGRkZGRkZGRkZGRkYnLCB0aGlzLmRlbGl2ZXJ5KTtcblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG5cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwiaG9tZVwiOiArdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLm9yZGVyQ2FydChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuLyogIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAvL2lmKCFjaGFuZ2VzLmxvY2F0aW9uSWQgJiYgIWNoYW5nZXMuc3RyZWV0SWQgJiYgIWNoYW5nZXMuaG9tZSkgcmV0dXJuO1xuICAgIC8vIHRoaXMuY2hlY2tTdHJlZXQoKTtcbiAgICBjb25zb2xlLmxvZygnQ0hBTkdFUycsIGNoYW5nZXMpO1xuICB9Ki9cblxuICBjaGVja1N0cmVldCgpIHtcblxuICAgIC8vaWYodGhpcy5zdHJlZXRJZCA9PSAnMCcpIHJldHVybjtcblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcItCd0LUg0YPQutCw0LfQsNC90L5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBgJHtjb21tZW50fVxcclxcbtCe0L/Qu9Cw0YLQsDogJHtwYXltZW50TWV0aG9kfWAsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgXCJwaG9uZVwiOiAnKzc4ODg4ODg4ODg4JyxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWVcbiAgICAgIH0sXG4gICAgICBcInBlcnNvbnNDb3VudFwiOiB0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cblxuICAgIC8vIGNvbnNvbGUubG9nKCdFRUVFRUVFRUVFRUUnLCB0aGlzLmRlbGl2ZXJ5KTtcblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG5cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwiaG9tZVwiOiArdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmNoZWNrU3RyZWV0VjIoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICByZXN1bHQgPT4gY29uc29sZS5pbmZvKCdDaGVjayBzdHJlZXQgcmVzdWx0JywgcmVzdWx0KSxcbiAgICAgICAgZXJyb3IgPT4gY29uc29sZS5pbmZvKCdDaGVjayBzdHJlZXQgZXJyb3InLCBlcnJvcilcbiAgICAgICk7XG4gIH1cblxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XG4gIH1cbn1cbiJdfQ==