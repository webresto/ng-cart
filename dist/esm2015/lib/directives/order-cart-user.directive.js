import { Directive, Input, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class OrderCartUserDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.requiredFields = ["name", "phone", "street", "house"];
        this.checkerFields = new BehaviorSubject(undefined);
    }
    onClick() {
        this.order(this.orderCart.value);
        console.log(this.orderCart.value);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            const sub = this.cartService.userCart().subscribe(cart => {
                if (this.cart && this.orderCart.valid && this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                    this.checkStreet(this.orderCart.value);
                }
                this.cart = cart;
            }, () => { }, () => sub.unsubscribe());
        }, 100);
        setTimeout(() => {
            this.checkerFields.next(this.checkForFields(this.orderCart._directives, this.requiredFields));
        }, 100);
        this.checkerFields.subscribe(state => {
            if (state) {
                this.orderCart.controls['street'].valueChanges.subscribe(val => {
                    if (typeof val === 'object') {
                        setTimeout(() => {
                            if (this.orderCart.controls['house'].valid) {
                                this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                                this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                                this.checkStreet(this.orderCart.value);
                            }
                        }, 100);
                    }
                });
                this.orderCart.controls['house'].valueChanges.subscribe(val => {
                    setTimeout(() => {
                        if (this.orderCart.controls['street'].valid) {
                            this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                            this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                            this.checkStreet(this.orderCart.value);
                        }
                    }, 100);
                });
            }
        });
    }
    checkForFields(formDirectives, requiredFields) {
        let fieldsAreAvailable = {};
        let noFields = [];
        formDirectives.forEach(element => {
            fieldsAreAvailable[element.name] = true;
        });
        requiredFields.forEach(element => {
            if (!fieldsAreAvailable.hasOwnProperty(element)) {
                noFields.push(element);
            }
        });
        if (noFields.length <= 0) {
            return true;
        }
        else {
            console.error("У формы отсутсвуют следующие обязательные для корректной работы модуля поля:", noFields);
            return false;
        }
    }
    order(dataToSend) {
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let payment;
            let comment = dataToSend.comment || "Не указан";
            if (dataToSend.cash) {
                payment = "Наличными курьеру";
            }
            else if (dataToSend.bankcard) {
                payment = "Банковской картой курьеру";
            }
            else {
                payment = "Не указан";
            }
            console.log(dataToSend);
            let data = {
                "cartId": this.cart.cartId,
                // TODO: тип оплаты надо вынести в отдельный модуль.
                "comment": "\n Тип оплаты:" + payment + "\nКоментарий:" + comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            this.cartService.orderCart(data).subscribe();
        }
        else {
        }
    }
    checkStreet(dataToSend) {
        console.log(">>>>", dataToSend);
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let data = {
                "cartId": this.cart.cartId,
                "comment": dataToSend.comment,
                // "delivery": {
                //   "type": "string (self or nothing)"
                // },
                "address": {
                    // "city": "string",
                    "streetId": dataToSend.street.id,
                    "home": dataToSend.house,
                    "housing": dataToSend.housing,
                    // "index": "string",
                    "doorphone": dataToSend.doorphone,
                    "entrance": dataToSend.entrance,
                    "floor": dataToSend.floor,
                    "apartment": dataToSend.apartment
                },
                "customer": {
                    "phone": '+' + dataToSend.phone,
                    "mail": dataToSend.email,
                    "name": dataToSend.name
                },
                "personsCount": dataToSend.personsCount
            };
            this.cartService.checkStreet(data);
        }
        else {
        }
    }
    stringToNumber(str) {
        console.log(typeof str);
        if (typeof str === 'string') {
            return +str;
        }
        else if (typeof str === "number") {
            return str;
        }
        else {
            console.error("Параметр home должен быть или string или number");
        }
    }
}
OrderCartUserDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstOrderCart]'
            },] }
];
OrderCartUserDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
OrderCartUserDirective.propDecorators = {
    orderCart: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL3dlYnJlc3RvL25nLWNhcnQvc3JjL2xpYi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLdEUsTUFBTSxPQUFPLHNCQUFzQjtJQWNqQyxZQUFvQixXQUErQjtRQUEvQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFIM0MsbUJBQWMsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUkzRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFWRCxPQUFPO1FBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBU0QsZUFBZTtRQUViLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDL0MsSUFBSSxDQUFDLEVBQUU7Z0JBQ0wsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxT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eEIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxPQUFPO29CQUM3QixxQkFBcUI7b0JBQ3JCLFdBQVcsRUFBRSxVQUFVLENBQUMsU0FBUztvQkFDakMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRO29CQUMvQixPQUFPLEVBQUUsVUFBVSxDQUFDLEtBQUs7b0JBQ3pCLFdBQVcsRUFBRSxVQUFVLENBQUMsU0FBUztpQkFDbEM7Z0JBQ0QsVUFBVSxFQUFFO29CQUNWLE9BQU8sRUFBRSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUs7b0JBQy9CLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSztvQkFDeEIsTUFBTSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2lCQUN4QjtnQkFDRCxjQUFjLEVBQUUsVUFBVSxDQUFDLFlBQVk7YUFDeEMsQ0FBQztZQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBRXBDO2FBQU07U0FFTjtJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsR0FBaUI7UUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUM7U0FDYjthQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ2xDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7YUFBTTtZQUNMLE9BQU8sQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7OztZQXJMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjs7O1lBSlEsa0JBQWtCOzs7d0JBT3hCLEtBQUs7c0JBR0wsWUFBWSxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3JzdE9yZGVyQ2FydF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBPcmRlckNhcnRVc2VyRGlyZWN0aXZlIHtcclxuXHJcbiAgQElucHV0KCkgb3JkZXJDYXJ0OiBhbnk7XHJcbiAgY2FydDogYW55O1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgb25DbGljaygpIHtcclxuICAgIHRoaXMub3JkZXIodGhpcy5vcmRlckNhcnQudmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy5vcmRlckNhcnQudmFsdWUpXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlcXVpcmVkRmllbGRzOiBBcnJheTxzdHJpbmc+ID0gW1wibmFtZVwiLCBcInBob25lXCIsIFwic3RyZWV0XCIsIFwiaG91c2VcIl07XHJcbiAgcHJpdmF0ZSBjaGVja2VyRmllbGRzOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG4gICAgdGhpcy5jaGVja2VyRmllbGRzID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBzdWIgPSB0aGlzLmNhcnRTZXJ2aWNlLnVzZXJDYXJ0KCkuc3Vic2NyaWJlKFxyXG4gICAgICAgIGNhcnQgPT4ge1xyXG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrU3RyZWV0KHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcclxuICAgICAgICB9LCAoKSA9PiB7IH0sICgpID0+IHN1Yi51bnN1YnNjcmliZSgpXHJcbiAgICAgICAgKTtcclxuICAgIH0sIDEwMCk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY2hlY2tlckZpZWxkcy5uZXh0KHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKTtcclxuICAgIH0sIDEwMCk7XHJcblxyXG4gICAgdGhpcy5jaGVja2VyRmllbGRzLnN1YnNjcmliZShzdGF0ZSA9PiB7XHJcbiAgICAgIGlmIChzdGF0ZSkge1xyXG4gICAgICAgIHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydob3VzZSddLnZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcItCd0LXRg9C60LDQt9Cw0L3QvlwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RyZWV0KHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xyXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsaWQpIHtcclxuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcItCd0LXRg9C60LDQt9Cw0L3QvlwiO1xyXG4gICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lID0gdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgfHwgXCI3ODg4ODg4ODg4OFwiO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIGNoZWNrRm9yRmllbGRzKGZvcm1EaXJlY3RpdmVzOiBBcnJheTxhbnk+LCByZXF1aXJlZEZpZWxkczogQXJyYXk8c3RyaW5nPik6IGJvb2xlYW4ge1xyXG5cclxuICAgIGxldCBmaWVsZHNBcmVBdmFpbGFibGU6IG9iamVjdCA9IHt9O1xyXG4gICAgbGV0IG5vRmllbGRzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG5cclxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGZpZWxkc0FyZUF2YWlsYWJsZVtlbGVtZW50Lm5hbWVdID0gdHJ1ZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgIGlmICghZmllbGRzQXJlQXZhaWxhYmxlLmhhc093blByb3BlcnR5KGVsZW1lbnQpKSB7XHJcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG5vRmllbGRzLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcItCjINGE0L7RgNC80Ysg0L7RgtGB0YPRgtGB0LLRg9GO0YIg0YHQu9C10LTRg9GO0YnQuNC1INC+0LHRj9C30LDRgtC10LvRjNC90YvQtSDQtNC70Y8g0LrQvtGA0YDQtdC60YLQvdC+0Lkg0YDQsNCx0L7RgtGLINC80L7QtNGD0LvRjyDQv9C+0LvRjzpcIiwgbm9GaWVsZHMpXHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcclxuICAgIGlmICh0aGlzLmNoZWNrRm9yRmllbGRzKHRoaXMub3JkZXJDYXJ0Ll9kaXJlY3RpdmVzLCB0aGlzLnJlcXVpcmVkRmllbGRzKSkge1xyXG4gICAgICBsZXQgcGF5bWVudDtcclxuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLQndC1INGD0LrQsNC30LDQvVwiXHJcblxyXG4gICAgICBpZiAoZGF0YVRvU2VuZC5jYXNoKSB7XHJcbiAgICAgICAgcGF5bWVudCA9IFwi0J3QsNC70LjRh9C90YvQvNC4INC60YPRgNGM0LXRgNGDXCI7XHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YVRvU2VuZC5iYW5rY2FyZCkge1xyXG4gICAgICAgIHBheW1lbnQgPSBcItCR0LDQvdC60L7QstGB0LrQvtC5INC60LDRgNGC0L7QuSDQutGD0YDRjNC10YDRg1wiO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBheW1lbnQgPSBcItCd0LUg0YPQutCw0LfQsNC9XCI7XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2coZGF0YVRvU2VuZCk7XHJcbiAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXHJcbiAgICAgICAgLy8gVE9ETzog0YLQuNC/INC+0L/Qu9Cw0YLRiyDQvdCw0LTQviDQstGL0L3QtdGB0YLQuCDQsiDQvtGC0LTQtdC70YzQvdGL0Lkg0LzQvtC00YPQu9GMLlxyXG4gICAgICAgIFwiY29tbWVudFwiOiBcIlxcbiDQotC40L8g0L7Qv9C70LDRgtGLOlwiICsgcGF5bWVudCArIFwiXFxu0JrQvtC80LXQvdGC0LDRgNC40Lk6XCIgKyBjb21tZW50LFxyXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xyXG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcclxuICAgICAgICAvLyB9LFxyXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XHJcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcclxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXHJcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcclxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXHJcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcclxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcclxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcclxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcclxuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcclxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxyXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5jYXJ0U2VydmljZS5vcmRlckNhcnQoZGF0YSkuc3Vic2NyaWJlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbiAgY2hlY2tTdHJlZXQoZGF0YVRvU2VuZCkge1xyXG4gICAgY29uc29sZS5sb2coXCI+Pj4+XCIsIGRhdGFUb1NlbmQpO1xyXG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XHJcbiAgICAgIGxldCBkYXRhID0ge1xyXG4gICAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXHJcbiAgICAgICAgXCJjb21tZW50XCI6IGRhdGFUb1NlbmQuY29tbWVudCxcclxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcclxuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXHJcbiAgICAgICAgLy8gfSxcclxuICAgICAgICBcImFkZHJlc3NcIjoge1xyXG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXHJcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxyXG4gICAgICAgICAgXCJob21lXCI6IGRhdGFUb1NlbmQuaG91c2UsXHJcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxyXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxyXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXHJcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXHJcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXHJcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XHJcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXHJcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcclxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuY2FydFNlcnZpY2UuY2hlY2tTdHJlZXQoZGF0YSk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdHJpbmdUb051bWJlcihzdHI6IG51bWJlciB8IGFueSk6IG51bWJlciB7XHJcbiAgICBjb25zb2xlLmxvZyh0eXBlb2Ygc3RyKTtcclxuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xyXG4gICAgICByZXR1cm4gK3N0cjtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0ciA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICByZXR1cm4gc3RyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5lcnJvcihcItCf0LDRgNCw0LzQtdGC0YAgaG9tZSDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0LjQu9C4IHN0cmluZyDQuNC70LggbnVtYmVyXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19