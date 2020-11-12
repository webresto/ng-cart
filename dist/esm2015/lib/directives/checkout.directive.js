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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBaUIsTUFBTSxlQUFlLENBQUM7QUFDcEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxZQUFZLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQTs7O0FBTXRELE1BQU0sT0FBTyxpQkFBaUI7SUFzQzVCLFlBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQVJ6QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUNuQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQVFqRCxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlO2FBQzdCLElBQUksQ0FDSCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1Ysa0hBQWtIO1lBQ2xILElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDdEYsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQztRQUNGOzs7Ozs7Ozs7Ozs7Ozs7O2FBZ0JLO1FBQ0wsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUNuQjthQUNBLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJ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RUFBRSxDQUFDLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOztrRkF2TlUsaUJBQWlCO3NEQUFqQixpQkFBaUI7OEZBQWpCLGFBQVM7O2tEQUFULGlCQUFpQjtjQUg3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7cUVBR1UsU0FBUztrQkFBakIsS0FBSztZQUVHLE9BQU87a0JBQWYsS0FBSztZQUVHLElBQUk7a0JBQVosS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxXQUFXO2tCQUFuQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUVHLE1BQU07a0JBQWQsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFDRyxTQUFTO2tCQUFqQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxLQUFLO2tCQUFiLEtBQUs7WUFFRyxhQUFhO2tCQUFyQixLQUFLO1lBQ0csZUFBZTtrQkFBdkIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxPQUFPO2tCQUFmLEtBQUs7WUFFRyxJQUFJO2tCQUFaLEtBQUs7WUFDRyxjQUFjO2tCQUF0QixLQUFLO1lBRUksT0FBTztrQkFBaEIsTUFBTTtZQUNHLEtBQUs7a0JBQWQsTUFBTTtZQUNHLFVBQVU7a0JBQW5CLE1BQU07WUEyQ1AsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IGZpbHRlciwgZGVib3VuY2VUaW1lLCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xyXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjaGVja291dF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XHJcblxyXG4gIEBJbnB1dCgpIGNhcnRUb3RhbDogYW55O1xyXG5cclxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBob25lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZGVsaXZlcnk6IGFueTtcclxuICBASW5wdXQoKSBzZWxmU2VydmljZTogYW55O1xyXG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgc3RyZWV0OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBob21lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVudHJhbmNlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIHBlcnNvbnNDb3VudDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcclxuXHJcbiAgQElucHV0KCkgZGF0ZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIG5vdGlmeU1ldGhvZElkOiBzdHJpbmc7XHJcblxyXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIEBPdXRwdXQoKSBpc0NoZWNraW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuXHJcbiAgY2FydDogYW55O1xyXG4gIGxhc3RGb3JtQ2hhbmdlS2V5OiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG5cclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLnVzZXJDYXJ0KClcclxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xyXG5cclxuICAgIHRoaXMuY2FydFNlcnZpY2UuT3JkZXJGb3JtQ2hhbmdlXHJcbiAgICAgIC5waXBlKFxyXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XHJcbiAgICAgICAgICAvL2lmKCh0aGlzLmxvY2F0aW9uSWQgfHwgdGhpcy5zdHJlZXRJZCkgJiYgdGhpcy5ob21lICYmIHRoaXMucGhvbmUgJiYgdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkubGVuZ3RoID4gMTEpIHtcclxuICAgICAgICAgIGlmICh0aGlzLmxvY2F0aW9uSWQgfHwgKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSB8fCB0aGlzLnNlbGZTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIC8qZmlsdGVyKCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgIDE6IHRoaXMubG9jYXRpb25JZCxcclxuICAgICAgICAgICAgMjogdGhpcy5zdHJlZXRJZCxcclxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXHJcbiAgICAgICAgICAgIDQ6IHRoaXMuaG9tZSxcclxuICAgICAgICAgICAgNTogdGhpcy5jYXJ0VG90YWwsXHJcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcclxuICAgICAgICAgICAgNzogdGhpcy5kZWxpdmVyeSxcclxuICAgICAgICAgICAgODogdGhpcy5wYXltZW50TWV0aG9kSWRcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pLCovXHJcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMDApXHJcbiAgICAgIClcclxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIG9uQ2xpY2soKSB7XHJcbiAgICBpZiAoIXRoaXMubG9jYXRpb25JZCAmJiAhKCh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUpICYmICF0aGlzLnNlbGZTZXJ2aWNlKSB7XHJcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgn0J3Rg9C20L3QviDRg9C60LDQt9Cw0YLRjCDQsNC00YDQtdGBJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0LmNhcnRJZCxcclxuICAgICAgY29tbWVudDogY29tbWVudCxcclxuICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICBwaG9uZTogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXHJcbiAgICAgICAgbWFpbDogdGhpcy5lbWFpbCxcclxuICAgICAgICBuYW1lOiB0aGlzLm5hbWVcclxuICAgICAgfSxcclxuICAgICAgcGVyc29uc0NvdW50OiArdGhpcy5wZXJzb25zQ291bnRcclxuICAgIH07XHJcblxyXG4gICAgaWYgKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XHJcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRlKSB7XHJcbiAgICAgIGRhdGFbXCJkYXRlXCJdID0gdGhpcy5kYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm5vdGlmeU1ldGhvZElkKSB7XHJcbiAgICAgIGRhdGFbXCJub3RpZnlNZXRob2RJZFwiXSA9IHRoaXMubm90aWZ5TWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YVtcInNlbGZTZXJ2aWNlXCJdID0gdGhpcy5zZWxmU2VydmljZTtcclxuXHJcblxyXG4gICAgaWYgKHRoaXMuYm9udXNlcykge1xyXG4gICAgICBkYXRhWydib251c2VzJ10gPSB0aGlzLmJvbnVzZXMubWFwKGIgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBiLm5hbWUsXHJcbiAgICAgICAgICBhbW91bnQ6IGIuYW1vdW50XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHRoaXMubG9jYXRpb25JZCkge1xyXG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xyXG4gICAgICAgIHN0cmVldElkOiB0aGlzLnN0cmVldElkLFxyXG4gICAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXHJcbiAgICAgICAgaG9tZTogdGhpcy5ob21lLFxyXG4gICAgICAgIGhvdXNpbmc6IHRoaXMuaG91c2luZyxcclxuICAgICAgICBkb29ycGhvbmU6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxyXG4gICAgICAgIGVudHJhbmNlOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxyXG4gICAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxyXG4gICAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJydcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhcnRJZCA9IHRoaXMuY2FydC5pZDtcclxuICAgIHRoaXMuY2FydFNlcnZpY2VcclxuICAgICAgLm9yZGVyQ2FydChkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBpZiAocmVzdWx0LmFjdGlvbiAmJiByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3VsdC5hY3Rpb24ucGF5bWVudFJlZGlyZWN0O1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdWNjZXNzLmVtaXQoY2FydElkKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2UubmV4dChjaGFuZ2VzKTtcclxuICB9XHJcblxyXG4gIGNoZWNrU3RyZWV0KCkge1xyXG5cclxuICAgIC8vaWYodGhpcy5zdHJlZXRJZCA9PSAnMCcpIHJldHVybjtcclxuXHJcbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcItCd0LUg0YPQutCw0LfQsNC9XCI7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0LmNhcnRJZCxcclxuICAgICAgY29tbWVudDogY29tbWVudCxcclxuICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICBwaG9uZTogdGhpcy5waG9uZSA/IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpIDogbnVsbCxcclxuICAgICAgICBtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSB8fCBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIHBlcnNvbnNDb3VudDogK3RoaXMucGVyc29uc0NvdW50XHJcbiAgICB9O1xyXG5cclxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XHJcblxyXG4gICAgaWYgKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XHJcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5kYXRlKSB7XHJcbiAgICAgIGRhdGFbXCJkYXRlXCJdID0gdGhpcy5kYXRlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLm5vdGlmeU1ldGhvZElkKSB7XHJcbiAgICAgIGRhdGFbXCJub3RpZnlNZXRob2RJZFwiXSA9IHRoaXMubm90aWZ5TWV0aG9kSWQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubG9jYXRpb25JZCkge1xyXG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xyXG4gICAgICAgIHN0cmVldElkOiB0aGlzLnN0cmVldElkLFxyXG4gICAgICAgIHN0cmVldDogdGhpcy5zdHJlZXQsXHJcbiAgICAgICAgaG9tZTogdGhpcy5ob21lLFxyXG4gICAgICAgIGhvdXNpbmc6IHRoaXMuaG91c2luZyxcclxuICAgICAgICBkb29ycGhvbmU6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxyXG4gICAgICAgIGVudHJhbmNlOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxyXG4gICAgICAgIGZsb29yOiB0aGlzLmZsb29yIHx8ICcnLFxyXG4gICAgICAgIGFwYXJ0bWVudDogdGhpcy5hcGFydG1lbnQgfHwgJydcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNDaGVja2luZy5lbWl0KHRydWUpO1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAuY2hlY2tTdHJlZXRWMihkYXRhKVxyXG4gICAgICAuc3Vic2NyaWJlKFxyXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXHJcbiAgICAgICAgLy9lcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICAgKCkgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpLFxyXG4gICAgICAgICgpID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxyXG4gICAgICApO1xyXG4gIH1cclxuXHJcblxyXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xyXG4gICAgaWYgKCFwaG9uZSkgcmV0dXJuICcnO1xyXG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCAnJyk7XHJcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnKzcnKTtcclxuICB9XHJcbn1cclxuIl19