/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
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
            .subscribe(cart => this.cart = cart);
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
        if (this.delivery) {
            data["delivery"] = { "type": "self" };
        }
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
            .subscribe(() => this.success.emit(true), error => this.error.emit(error));
    }
    /**
     * @param {?} phone
     * @return {?}
     */
    preparePhone(phone) {
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '');
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
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
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
    CheckoutDirective.prototype.cart;
    /**
     * @type {?}
     * @private
     */
    CheckoutDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3RFLE1BQU07Ozs7SUF5QkosWUFDVSxXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFOL0IsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFPM0MsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Ozs7SUFHRCxPQUFPO1FBRUwsSUFBRyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkMsT0FBTztTQUNSOztZQUVHLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVc7O1lBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxJQUFJLFlBQVk7O1lBRWxELElBQUksR0FBRztZQUNULFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDMUIsU0FBUyxFQUFFLEdBQUcsT0FBTyxlQUFlLGFBQWEsRUFBRTtZQUNuRCxVQUFVLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDdEMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbEI7WUFDRCxjQUFjLEVBQUUsSUFBSSxDQUFDLFlBQVk7U0FDbEM7UUFDQSxJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUM7WUFDZixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUE7U0FDckM7UUFFRixJQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDdEM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRztnQkFDaEIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUN6QixNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDbEIsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO2dCQUNqQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFO2dCQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVMsSUFBSSxFQUFFO2FBQ2xDLENBQUE7U0FDRjtRQUVELElBQUksQ0FBQyxXQUFXO2FBQ2IsU0FBUyxDQUFDLElBQUksQ0FBQzthQUNmLFNBQVMsQ0FDUixHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDN0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDaEMsQ0FBQztJQUNOLENBQUM7Ozs7O0lBR0QsWUFBWSxDQUFDLEtBQUs7UUFDaEIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OztZQXZGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7OztZQUpRLGtCQUFrQjs7O21CQU94QixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3lCQUNMLEtBQUs7dUJBRUwsS0FBSzttQkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO3dCQUNMLEtBQUs7b0JBQ0wsS0FBSzs0QkFFTCxLQUFLOzJCQUNMLEtBQUs7c0JBQ0wsS0FBSztzQkFFTCxNQUFNO29CQUNOLE1BQU07c0JBWU4sWUFBWSxTQUFDLE9BQU87Ozs7SUEvQnJCLGlDQUFxQjs7SUFDckIsa0NBQXNCOztJQUN0QixrQ0FBc0I7O0lBQ3RCLHFDQUFzQjs7SUFDdEIsdUNBQTJCOztJQUUzQixxQ0FBMEI7O0lBQzFCLGlDQUFxQjs7SUFDckIsb0NBQXdCOztJQUN4QixzQ0FBMEI7O0lBQzFCLHFDQUF5Qjs7SUFDekIsc0NBQTBCOztJQUMxQixrQ0FBc0I7O0lBRXRCLDBDQUE2Qjs7SUFDN0IseUNBQTZCOztJQUM3QixvQ0FBd0I7O0lBRXhCLG9DQUFnRDs7SUFDaEQsa0NBQTZDOztJQUU3QyxpQ0FBVTs7Ozs7SUFHUix3Q0FBdUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NoZWNrb3V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG5hbWU6c3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDpzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOnN0cmluZztcbiAgQElucHV0KCkgZGVsaXZlcnk6YW55O1xuICBASW5wdXQoKSBsb2NhdGlvbklkOnN0cmluZztcblxuICBASW5wdXQoKSBzdHJlZXRJZDogc3RyaW5nO1xuICBASW5wdXQoKSBob21lOnN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzpzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDpzdHJpbmc7XG4gIEBJbnB1dCgpIGVudHJhbmNlOnN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOnN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6c3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2Q6c3RyaW5nXG4gIEBJbnB1dCgpIHBlcnNvbnNDb3VudDpudW1iZXI7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6c3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNhcnQ6IGFueTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuXG4gICAgaWYoIXRoaXMubG9jYXRpb25JZCAmJiAhKHRoaXMuc3RyZWV0SWQgJiYgdGhpcy5ob21lKSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLQndC1INGD0LrQsNC30LDQvdC+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7QntC/0LvQsNGC0LA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuICAgICBpZih0aGlzLmRlbGl2ZXJ5KXtcbiAgICAgICBkYXRhW1wiZGVsaXZlcnlcIl0gPSB7IFwidHlwZVwiOiBcInNlbGZcIn1cbiAgICAgfVxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJob21lXCI6ICt0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiJdfQ==