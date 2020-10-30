import { Directive, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { filter, debounceTime } from 'rxjs/operators';
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
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.cartId,
            "comment": comment,
            "customer": {
                "phone": this.preparePhone(this.phone),
                "mail": this.email,
                "name": this.name
            },
            "personsCount": +this.personsCount
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
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.cartId,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : null,
                "mail": this.email,
                "name": this.name || null
            },
            "personsCount": +this.personsCount
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
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        result => this.isChecking.emit(false), error => this.isChecking.emit(false));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IkM6L1VzZXJzL2xhcmNoZW5rb3YvZnJvbnRlbmQvcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBHLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFPLE1BQU0sZ0JBQWdCLENBQUE7OztBQU0xRCxNQUFNLE9BQU8saUJBQWlCO0lBc0M1QixZQUNVLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVQvQixZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVVqRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO2FBQzdCLElBQUksQ0FDSCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1Ysa0hBQWtIO1lBQ2xILElBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDckYsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQztRQUNGOzs7Ozs7Ozs7Ozs7Ozs7O2FBZ0JLO1FBQ0wsWUFBWSxDQUFDLElBQUks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bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IGZpbHRlciwgZGVib3VuY2VUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREaXJlY3RpdmUge1xyXG5cclxuICBASW5wdXQoKSBjYXJ0VG90YWw6YW55O1xyXG5cclxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBob25lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGVsaXZlcnk6IGFueTtcclxuICBASW5wdXQoKSBzZWxmU2VydmljZTogYW55O1xyXG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgc3RyZWV0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBob21lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVudHJhbmNlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBlcnNvbnNDb3VudDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZGF0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIG5vdGlmeU1ldGhvZElkOiBzdHJpbmc7XHJcbiAgXHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIGlzQ2hlY2tpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG5cclxuICBjYXJ0OiBhbnk7XHJcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcclxuICApIHtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC51c2VyQ2FydCgpXHJcbiAgICAgIC5zdWJzY3JpYmUoY2FydCA9PiB0aGlzLmNhcnQgPSBjYXJ0KTtcclxuXHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxyXG4gICAgICAucGlwZShcclxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XHJcbiAgICAgICAgICBpZih0aGlzLmxvY2F0aW9uSWQgfHwgKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSB8fCB0aGlzLnNlbGZTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIC8qZmlsdGVyKCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIDE6IHRoaXMubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgMjogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXHJcbiAgICAgICAgICAgIDQ6IHRoaXMuaG9tZSxcclxuICAgICAgICAgICAgNTogdGhpcy5jYXJ0VG90YWwsXHJcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcclxuICAgICAgICAgICAgNzogdGhpcy5kZWxpdmVyeSxcclxuICAgICAgICAgICAgODogdGhpcy5wYXltZW50TWV0aG9kSWRcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLCovXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuc2VsZlNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcclxuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwi0J3QtSDRg9C60LDQt9Cw0L3QvlwiO1xyXG5cclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxyXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudCxcclxuICAgICAgXCJjdXN0b21lclwiOiB7XHJcbiAgICAgICAgXCJwaG9uZVwiOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcclxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcclxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxyXG4gICAgfTtcclxuXHJcbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5kYXRlKSB7XHJcbiAgICAgIGRhdGFbXCJkYXRlXCJdID0gdGhpcy5kYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMubm90aWZ5TWV0aG9kSWQpIHtcclxuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xyXG5cclxuXHJcbiAgICBpZih0aGlzLmJvbnVzZXMpIHtcclxuICAgICAgZGF0YVsnYm9udXNlcyddID0gdGhpcy5ib251c2VzLm1hcChiID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxyXG4gICAgICAgICAgYW1vdW50OiBiLmFtb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xyXG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xyXG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcclxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxyXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXHJcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXHJcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxyXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcclxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FydElkID0gdGhpcy5jYXJ0LmlkO1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmKHJlc3VsdC5hY3Rpb24gJiYgcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3QpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdDtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzcy5lbWl0KGNhcnRJZClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlLm5leHQoY2hhbmdlcyk7XHJcbiAgfVxyXG5cclxuICBjaGVja1N0cmVldCgpIHtcclxuXHJcbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiO1xyXG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLQndC1INGD0LrQsNC30LDQvdC+XCI7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXHJcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50LFxyXG4gICAgICBcImN1c3RvbWVyXCI6IHtcclxuICAgICAgICBcInBob25lXCI6IHRoaXMucGhvbmUgPyB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSA6IG51bGwsXHJcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZSB8fCBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxyXG4gICAgfTtcclxuXHJcbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xyXG5cclxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XHJcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZih0aGlzLmRhdGUpIHtcclxuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xyXG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xyXG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xyXG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcclxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxyXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXHJcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXHJcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxyXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcclxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0NoZWNraW5nLmVtaXQodHJ1ZSk7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC5jaGVja1N0cmVldFYyKGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgLy8oKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgICByZXN1bHQgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpLFxyXG4gICAgICAgIGVycm9yID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcblxyXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xyXG4gICAgaWYoIXBob25lKSByZXR1cm4gJyc7XHJcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xyXG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==