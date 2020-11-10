import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-restocart.service";
export class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(() => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
                return true;
            }
        }), 
        /*filter(() => {
          const formChangeKey = JSON.stringify({
            1: this.locationId,
            2: this.streetId,
            3: this.street,
            4: this.home,
            5: this.cartTotal,
            6: this.bonuses,
            7: this.delivery,
            8: this.paymentMethodId
          });

          if(formChangeKey !== this.lastFormChangeKey) {
            this.lastFormChangeKey = formChangeKey;
            return true;
          }
        }),*/
        debounceTime(1000))
            .subscribe(() => this.checkStreet());
    }
    onClick() {
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        let comment = this.comment || "Не указан";
        let data = {
            cartId: this.cart.cartId,
            comment: comment,
            customer: {
                phone: this.preparePhone(this.phone),
                mail: this.email,
                name: this.name
            },
            personsCount: +this.personsCount
        };
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.date) {
            data["date"] = this.date;
        }
        if (this.notifyMethodId) {
            data["notifyMethodId"] = this.notifyMethodId;
        }
        data["selfService"] = this.selfService;
        if (this.bonuses) {
            data['bonuses'] = this.bonuses.map(b => {
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
                streetId: this.streetId,
                street: this.street,
                home: this.home,
                housing: this.housing,
                doorphone: this.doorphone || '',
                entrance: this.entrance || '',
                floor: this.floor || '',
                apartment: this.apartment || ''
            };
        }
        const cartId = this.cart.id;
        this.cartService
            .orderCart(data)
            .subscribe(result => {
            if (result.action && result.action.paymentRedirect) {
                window.location.href = result.action.paymentRedirect;
            }
            else {
                this.success.emit(cartId);
            }
        }, error => this.error.emit(error));
    }
    ngOnChanges(changes) {
        this.cartService.OrderFormChange.next(changes);
    }
    checkStreet() {
        //if(this.streetId == '0') return;
        let comment = this.comment || "Не указан";
        let data = {
            cartId: this.cart.cartId,
            comment: comment,
            customer: {
                phone: this.phone ? this.preparePhone(this.phone) : null,
                mail: this.email,
                name: this.name || null
            },
            personsCount: +this.personsCount
        };
        data["selfService"] = this.selfService;
        if (this.paymentMethodId) {
            data["paymentMethodId"] = this.paymentMethodId;
        }
        if (this.date) {
            data["date"] = this.date;
        }
        if (this.notifyMethodId) {
            data["notifyMethodId"] = this.notifyMethodId;
        }
        if (this.locationId) {
            data["locationId"] = this.locationId;
        }
        else {
            data["address"] = {
                streetId: this.streetId,
                street: this.street,
                home: this.home,
                housing: this.housing,
                doorphone: this.doorphone || '',
                entrance: this.entrance || '',
                floor: this.floor || '',
                apartment: this.apartment || ''
            };
        }
        this.isChecking.emit(true);
        this.cartService
            .checkStreetV2(data)
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        () => this.isChecking.emit(false), () => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.ɵfac = function CheckoutDirective_Factory(t) { return new (t || CheckoutDirective)(i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
CheckoutDirective.ɵdir = i0.ɵɵdefineDirective({ type: CheckoutDirective, selectors: [["", "checkout", ""]], hostBindings: function CheckoutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CheckoutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", error: "error", isChecking: "isChecking" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CheckoutDirective, [{
        type: Directive,
        args: [{
                selector: '[checkout]'
            }]
    }], function () { return [{ type: i1.NgRestoCartService }]; }, { cartTotal: [{
            type: Input
        }], bonuses: [{
            type: Input
        }], name: [{
            type: Input
        }], email: [{
            type: Input
        }], phone: [{
            type: Input
        }], delivery: [{
            type: Input
        }], selfService: [{
            type: Input
        }], locationId: [{
            type: Input
        }], street: [{
            type: Input
        }], streetId: [{
            type: Input
        }], home: [{
            type: Input
        }], housing: [{
            type: Input
        }], apartment: [{
            type: Input
        }], entrance: [{
            type: Input
        }], doorphone: [{
            type: Input
        }], floor: [{
            type: Input
        }], paymentMethod: [{
            type: Input
        }], paymentMethodId: [{
            type: Input
        }], personsCount: [{
            type: Input
        }], comment: [{
            type: Input
        }], date: [{
            type: Input
        }], notifyMethodId: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], isChecking: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxHQUFHLE1BQU0sZ0JBQWdCLENBQUE7OztBQU10RCxNQUFNLE9BQU8saUJBQWlCO0lBc0M1QixZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFSekMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFDbkMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFXLENBQUM7UUFRakQsSUFBSSxDQUFDLFdBQVc7YUFDYixRQUFRLEVBQUU7YUFDVixTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZTthQUM3QixJQUFJLENBQ0gsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNWLGtIQUFrSDtZQUNsSCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3RGLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUM7UUFDRjs7Ozs7Ozs7Ozs7Ozs7OzthQWdCSztRQUNMLFlBQVksQ0FBQyxJQUFJ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LEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7a0ZBdk5VLGlCQUFpQjtzREFBakIsaUJBQWlCOzhGQUFqQixhQUFTOztrREFBVCxpQkFBaUI7Y0FIN0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2FBQ3ZCO3FFQUdVLFNBQVM7a0JBQWpCLEtBQUs7WUFFRyxPQUFPO2tCQUFmLEtBQUs7WUFFRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csV0FBVztrQkFBbkIsS0FBSztZQUNHLFVBQVU7a0JBQWxCLEtBQUs7WUFFRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBRUcsYUFBYTtrQkFBckIsS0FBSztZQUNHLGVBQWU7a0JBQXZCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csT0FBTztrQkFBZixLQUFLO1lBRUcsSUFBSTtrQkFBWixLQUFLO1lBQ0csY0FBYztrQkFBdEIsS0FBSztZQUVJLE9BQU87a0JBQWhCLE1BQU07WUFDRyxLQUFLO2tCQUFkLE1BQU07WUFDRyxVQUFVO2tCQUFuQixNQUFNO1lBMkNQLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBmaWx0ZXIsIGRlYm91bmNlVGltZSwgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBjYXJ0VG90YWw6IGFueTtcclxuXHJcbiAgQElucHV0KCkgYm9udXNlczogYW55O1xyXG5cclxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZW1haWw6IHN0cmluZztcclxuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XHJcbiAgQElucHV0KCkgc2VsZlNlcnZpY2U6IGFueTtcclxuICBASW5wdXQoKSBsb2NhdGlvbklkOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIHN0cmVldDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhvdXNpbmc6IHN0cmluZztcclxuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcclxuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGRvb3JwaG9uZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2Q6IHN0cmluZztcclxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kSWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcclxuICBASW5wdXQoKSBjb21tZW50OiBzdHJpbmc7XHJcblxyXG4gIEBJbnB1dCgpIGRhdGU6IHN0cmluZztcclxuICBASW5wdXQoKSBub3RpZnlNZXRob2RJZDogc3RyaW5nO1xyXG5cclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuXHJcblxyXG4gIGNhcnQ6IGFueTtcclxuICBsYXN0Rm9ybUNoYW5nZUtleTogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC51c2VyQ2FydCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KTtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sb2NhdGlvbklkIHx8ICh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUgfHwgdGhpcy5zZWxmU2VydmljZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSxcclxuICAgICAgICAvKmZpbHRlcigoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmb3JtQ2hhbmdlS2V5ID0gSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXHJcbiAgICAgICAgICAgIDI6IHRoaXMuc3RyZWV0SWQsXHJcbiAgICAgICAgICAgIDM6IHRoaXMuc3RyZWV0LFxyXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXHJcbiAgICAgICAgICAgIDU6IHRoaXMuY2FydFRvdGFsLFxyXG4gICAgICAgICAgICA2OiB0aGlzLmJvbnVzZXMsXHJcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnksXHJcbiAgICAgICAgICAgIDg6IHRoaXMucGF5bWVudE1ldGhvZElkXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICBpZihmb3JtQ2hhbmdlS2V5ICE9PSB0aGlzLmxhc3RGb3JtQ2hhbmdlS2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkgPSBmb3JtQ2hhbmdlS2V5O1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSwqL1xyXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxyXG4gICAgICApXHJcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja1N0cmVldCgpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBvbkNsaWNrKCkge1xyXG4gICAgaWYgKCF0aGlzLmxvY2F0aW9uSWQgJiYgISgodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lKSAmJiAhdGhpcy5zZWxmU2VydmljZSkge1xyXG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ9Cd0YPQttC90L4g0YPQutCw0LfQsNGC0Ywg0LDQtNGA0LXRgScpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xyXG5cclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBjYXJ0SWQ6IHRoaXMuY2FydC5jYXJ0SWQsXHJcbiAgICAgIGNvbW1lbnQ6IGNvbW1lbnQsXHJcbiAgICAgIGN1c3RvbWVyOiB7XHJcbiAgICAgICAgcGhvbmU6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxyXG4gICAgICAgIG1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIHBlcnNvbnNDb3VudDogK3RoaXMucGVyc29uc0NvdW50XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLnBheW1lbnRNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0ZSkge1xyXG4gICAgICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ub3RpZnlNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xyXG4gICAgfVxyXG5cclxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmJvbnVzZXMpIHtcclxuICAgICAgZGF0YVsnYm9udXNlcyddID0gdGhpcy5ib251c2VzLm1hcChiID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxyXG4gICAgICAgICAgYW1vdW50OiBiLmFtb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmICh0aGlzLmxvY2F0aW9uSWQpIHtcclxuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcclxuICAgICAgICBzdHJlZXRJZDogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxyXG4gICAgICAgIGhvbWU6IHRoaXMuaG9tZSxcclxuICAgICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcsXHJcbiAgICAgICAgZG9vcnBob25lOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcclxuICAgICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcclxuICAgICAgICBmbG9vcjogdGhpcy5mbG9vciB8fCAnJyxcclxuICAgICAgICBhcGFydG1lbnQ6IHRoaXMuYXBhcnRtZW50IHx8ICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYXJ0SWQgPSB0aGlzLmNhcnQuaWQ7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC5vcmRlckNhcnQoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgaWYgKHJlc3VsdC5hY3Rpb24gJiYgcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzcy5lbWl0KGNhcnRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlLm5leHQoY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBjaGVja1N0cmVldCgpIHtcclxuXHJcbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xyXG5cclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBjYXJ0SWQ6IHRoaXMuY2FydC5jYXJ0SWQsXHJcbiAgICAgIGNvbW1lbnQ6IGNvbW1lbnQsXHJcbiAgICAgIGN1c3RvbWVyOiB7XHJcbiAgICAgICAgcGhvbmU6IHRoaXMucGhvbmUgPyB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSA6IG51bGwsXHJcbiAgICAgICAgbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICBuYW1lOiB0aGlzLm5hbWUgfHwgbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBwZXJzb25zQ291bnQ6ICt0aGlzLnBlcnNvbnNDb3VudFxyXG4gICAgfTtcclxuXHJcbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xyXG5cclxuICAgIGlmICh0aGlzLnBheW1lbnRNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZGF0ZSkge1xyXG4gICAgICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ub3RpZnlNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxvY2F0aW9uSWQpIHtcclxuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcclxuICAgICAgICBzdHJlZXRJZDogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICBzdHJlZXQ6IHRoaXMuc3RyZWV0LFxyXG4gICAgICAgIGhvbWU6IHRoaXMuaG9tZSxcclxuICAgICAgICBob3VzaW5nOiB0aGlzLmhvdXNpbmcsXHJcbiAgICAgICAgZG9vcnBob25lOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcclxuICAgICAgICBlbnRyYW5jZTogdGhpcy5lbnRyYW5jZSB8fCAnJyxcclxuICAgICAgICBmbG9vcjogdGhpcy5mbG9vciB8fCAnJyxcclxuICAgICAgICBhcGFydG1lbnQ6IHRoaXMuYXBhcnRtZW50IHx8ICcnXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmlzQ2hlY2tpbmcuZW1pdCh0cnVlKTtcclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLmNoZWNrU3RyZWV0VjIoZGF0YSlcclxuICAgICAgLnN1YnNjcmliZShcclxuICAgICAgICAvLygpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICAgICgpID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKSxcclxuICAgICAgICAoKSA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG5cclxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcclxuICAgIGlmICghcGhvbmUpIHJldHVybiAnJztcclxuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwgJycpO1xyXG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==