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
CheckoutDirective.ɵdir = i0.ɵɵdefineDirective({ type: CheckoutDirective, selectors: [["", "rstCheckout", ""]], hostBindings: function CheckoutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function CheckoutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", error: "error", isChecking: "isChecking" }, features: [i0.ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CheckoutDirective, [{
        type: Directive,
        args: [{
                selector: '[rstCheckout]'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLWNhcnQvc3JjLyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksR0FBRyxNQUFNLGdCQUFnQixDQUFBOzs7QUFNdEQsTUFBTSxPQUFPLGlCQUFpQjtJQXNDNUIsWUFBb0IsV0FBK0I7UUFBL0IsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBUnpDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ25DLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBUWpELElBQUksQ0FBQyxXQUFXO2FBQ2IsUUFBUSxFQUFFO2FBQ1YsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWU7YUFDN0IsSUFBSSxDQUNILE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDVixrSEFBa0g7WUFDbEgsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUN0RixPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDO1FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7YUFnQks7UUFDTCxZQUFZLENBQUMsSUFBSSxDQUFDLENBQ25CO2FBQ0EsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFHRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUMzRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU87U0FDUjtRQUVELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDO1FBRTFDLElBQUksSUFBSSxHQUFHO1lBQ1QsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUN4QixPQUFPLEVBQUUsT0FBTztZQUNoQixRQUFRLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDaEI7WUFDRCxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWTtTQUNqQyxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDaEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUMxQjtRQUVELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQzlDO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFHdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDckMsT0FBTztvQkFDTCxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7b0JBQ1osTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO2lCQUNqQixDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUdELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO2dCQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtnQkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTthQUNoQyxDQUFBO1NBQ0Y7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsV0FBVzthQUNiLFNBQVMsQ0FBQyxJQUFJLENBQUM7YUFDZixTQUFTLENBQ1IsTUFBTSxDQUFDLEVBQUU7WUFDUCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7Z0JBQ2xELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO2FBQzFCO1FBQ0gsQ0FBQyxFQUNELEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ2hDLENBQUM7SUFDTixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsV0FBVztRQUVULGtDQUFrQztRQUVsQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQztRQUUxQyxJQUFJLElBQUksR0FBRztZQUNULE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDeEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsUUFBUSxFQUFFO2dCQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDeEQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLO2dCQUNoQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJO2FBQ3hCO1lBQ0QsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVk7U0FDakMsQ0FBQztRQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBRXZDLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ2hEO1FBRUQsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM5QztRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUN0QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO2dCQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTtnQkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTtnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLElBQUksRUFBRTthQUNoQyxDQUFBO1NBQ0Y7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVzthQUNiLGFBQWEsQ0FBQyxJQUFJLENBQUM7YUFDbkIsU0FBUztRQUNSLGdDQUFnQztRQUNoQyxpQ0FBaUM7UUFDakMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQ2pDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUNsQyxDQUFDO0lBQ04sQ0FBQztJQUdELFlBQVksQ0FBQyxLQUFLO1FBQ2hCLElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3QyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7O2tGQXZOVSxpQkFBaUI7c0RBQWpCLGlCQUFpQjs4RkFBakIsYUFBUzs7a0RBQVQsaUJBQWlCO2NBSDdCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjtxRUFHVSxTQUFTO2tCQUFqQixLQUFLO1lBRUcsT0FBTztrQkFBZixLQUFLO1lBRUcsSUFBSTtrQkFBWixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLFdBQVc7a0JBQW5CLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBRUcsTUFBTTtrQkFBZCxLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLFNBQVM7a0JBQWpCLEtBQUs7WUFDRyxRQUFRO2tCQUFoQixLQUFLO1lBQ0csU0FBUztrQkFBakIsS0FBSztZQUNHLEtBQUs7a0JBQWIsS0FBSztZQUVHLGFBQWE7a0JBQXJCLEtBQUs7WUFDRyxlQUFlO2tCQUF2QixLQUFLO1lBQ0csWUFBWTtrQkFBcEIsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUVHLElBQUk7a0JBQVosS0FBSztZQUNHLGNBQWM7a0JBQXRCLEtBQUs7WUFFSSxPQUFPO2tCQUFoQixNQUFNO1lBQ0csS0FBSztrQkFBZCxNQUFNO1lBQ0csVUFBVTtrQkFBbkIsTUFBTTtZQTJDUCxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgZmlsdGVyLCBkZWJvdW5jZVRpbWUsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXHJcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JzdENoZWNrb3V0XSdcclxufSlcclxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgY2FydFRvdGFsOiBhbnk7XHJcblxyXG4gIEBJbnB1dCgpIGJvbnVzZXM6IGFueTtcclxuXHJcbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGVtYWlsOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGhvbmU6IHN0cmluZztcclxuICBASW5wdXQoKSBkZWxpdmVyeTogYW55O1xyXG4gIEBJbnB1dCgpIHNlbGZTZXJ2aWNlOiBhbnk7XHJcbiAgQElucHV0KCkgbG9jYXRpb25JZDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZztcclxuICBASW5wdXQoKSBzdHJlZXRJZDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZztcclxuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgYXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgQElucHV0KCkgZW50cmFuY2U6IHN0cmluZztcclxuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcclxuICBASW5wdXQoKSBmbG9vcjogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZElkOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgcGVyc29uc0NvdW50OiBudW1iZXI7XHJcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xyXG5cclxuICBASW5wdXQoKSBkYXRlOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgbm90aWZ5TWV0aG9kSWQ6IHN0cmluZztcclxuXHJcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcbiAgQE91dHB1dCgpIGlzQ2hlY2tpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG5cclxuICBjYXJ0OiBhbnk7XHJcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlKSB7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAudXNlckNhcnQoKVxyXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydCk7XHJcblxyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgZmlsdGVyKCgpID0+IHtcclxuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xyXG4gICAgICAgICAgaWYgKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuc2VsZlNlcnZpY2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgLypmaWx0ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZm9ybUNoYW5nZUtleSA9IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgMTogdGhpcy5sb2NhdGlvbklkLFxyXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxyXG4gICAgICAgICAgICAzOiB0aGlzLnN0cmVldCxcclxuICAgICAgICAgICAgNDogdGhpcy5ob21lLFxyXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcclxuICAgICAgICAgICAgNjogdGhpcy5ib251c2VzLFxyXG4gICAgICAgICAgICA3OiB0aGlzLmRlbGl2ZXJ5LFxyXG4gICAgICAgICAgICA4OiB0aGlzLnBheW1lbnRNZXRob2RJZFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xyXG4gICAgICAgICAgICB0aGlzLmxhc3RGb3JtQ2hhbmdlS2V5ID0gZm9ybUNoYW5nZUtleTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSksKi9cclxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMClcclxuICAgICAgKVxyXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuY2hlY2tTdHJlZXQoKSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIGlmICghdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuc2VsZlNlcnZpY2UpIHtcclxuICAgICAgdGhpcy5lcnJvci5lbWl0KCfQndGD0LbQvdC+INGD0LrQsNC30LDRgtGMINCw0LTRgNC10YEnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnQuY2FydElkLFxyXG4gICAgICBjb21tZW50OiBjb21tZW50LFxyXG4gICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgIHBob25lOiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKSxcclxuICAgICAgICBtYWlsOiB0aGlzLmVtYWlsLFxyXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZVxyXG4gICAgICB9LFxyXG4gICAgICBwZXJzb25zQ291bnQ6ICt0aGlzLnBlcnNvbnNDb3VudFxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcclxuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRhdGUpIHtcclxuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubm90aWZ5TWV0aG9kSWQpIHtcclxuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xyXG5cclxuXHJcbiAgICBpZiAodGhpcy5ib251c2VzKSB7XHJcbiAgICAgIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIG5hbWU6IGIubmFtZSxcclxuICAgICAgICAgIGFtb3VudDogYi5hbW91bnRcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAodGhpcy5sb2NhdGlvbklkKSB7XHJcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XHJcbiAgICAgICAgc3RyZWV0SWQ6IHRoaXMuc3RyZWV0SWQsXHJcbiAgICAgICAgc3RyZWV0OiB0aGlzLnN0cmVldCxcclxuICAgICAgICBob21lOiB0aGlzLmhvbWUsXHJcbiAgICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nLFxyXG4gICAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJycsXHJcbiAgICAgICAgZW50cmFuY2U6IHRoaXMuZW50cmFuY2UgfHwgJycsXHJcbiAgICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXHJcbiAgICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FydElkID0gdGhpcy5jYXJ0LmlkO1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZVxyXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgIGlmIChyZXN1bHQuYWN0aW9uICYmIHJlc3VsdC5hY3Rpb24ucGF5bWVudFJlZGlyZWN0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3Q7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3MuZW1pdChjYXJ0SWQpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tTdHJlZXQoKSB7XHJcblxyXG4gICAgLy9pZih0aGlzLnN0cmVldElkID09ICcwJykgcmV0dXJuO1xyXG5cclxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwi0J3QtSDRg9C60LDQt9Cw0L1cIjtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnQuY2FydElkLFxyXG4gICAgICBjb21tZW50OiBjb21tZW50LFxyXG4gICAgICBjdXN0b21lcjoge1xyXG4gICAgICAgIHBob25lOiB0aGlzLnBob25lID8gdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkgOiBudWxsLFxyXG4gICAgICAgIG1haWw6IHRoaXMuZW1haWwsXHJcbiAgICAgICAgbmFtZTogdGhpcy5uYW1lIHx8IG51bGxcclxuICAgICAgfSxcclxuICAgICAgcGVyc29uc0NvdW50OiArdGhpcy5wZXJzb25zQ291bnRcclxuICAgIH07XHJcblxyXG4gICAgZGF0YVtcInNlbGZTZXJ2aWNlXCJdID0gdGhpcy5zZWxmU2VydmljZTtcclxuXHJcbiAgICBpZiAodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcclxuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmRhdGUpIHtcclxuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubm90aWZ5TWV0aG9kSWQpIHtcclxuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5sb2NhdGlvbklkKSB7XHJcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XHJcbiAgICAgICAgc3RyZWV0SWQ6IHRoaXMuc3RyZWV0SWQsXHJcbiAgICAgICAgc3RyZWV0OiB0aGlzLnN0cmVldCxcclxuICAgICAgICBob21lOiB0aGlzLmhvbWUsXHJcbiAgICAgICAgaG91c2luZzogdGhpcy5ob3VzaW5nLFxyXG4gICAgICAgIGRvb3JwaG9uZTogdGhpcy5kb29ycGhvbmUgfHwgJycsXHJcbiAgICAgICAgZW50cmFuY2U6IHRoaXMuZW50cmFuY2UgfHwgJycsXHJcbiAgICAgICAgZmxvb3I6IHRoaXMuZmxvb3IgfHwgJycsXHJcbiAgICAgICAgYXBhcnRtZW50OiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0NoZWNraW5nLmVtaXQodHJ1ZSk7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXHJcbiAgICAgIC5jaGVja1N0cmVldFYyKGRhdGEpXHJcbiAgICAgIC5zdWJzY3JpYmUoXHJcbiAgICAgICAgLy8oKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcclxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcclxuICAgICAgICAoKSA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSksXHJcbiAgICAgICAgKCkgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpXHJcbiAgICAgICk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJlcGFyZVBob25lKHBob25lKSB7XHJcbiAgICBpZiAoIXBob25lKSByZXR1cm4gJyc7XHJcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sICcnKTtcclxuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcrNycpO1xyXG4gIH1cclxufVxyXG4iXX0=