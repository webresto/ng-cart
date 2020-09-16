/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
export class NgRestoCartService {
    /**
     * @param {?} net
     * @param {?} eventer
     */
    constructor(net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.OrderFormChange = new BehaviorSubject(null);
        this.cart = new BehaviorSubject({});
        this.modifires = new BehaviorSubject([]);
        this.modifiresMessage = new BehaviorSubject([]);
        this.initialStorage();
        this.modifiresMessage.subscribe((/**
         * @param {?} messages
         * @return {?}
         */
        messages => this.messages = messages));
    }
    /**
     * @return {?}
     */
    initialStorage() {
        this.cartID = this.getCartId();
        if (this.cartID) {
            this.net
                .get('/cart?cartId=' + this.cartID)
                .subscribe((/**
             * @param {?} cart
             * @return {?}
             */
            cart => this.cart.next(cart.cart)), (/**
             * @param {?} error
             * @return {?}
             */
            error => this.removeCartId()));
        }
    }
    /**
     * @return {?}
     */
    getCartId() {
        return localStorage.getItem('cartID');
    }
    /**
     * @param {?} data
     * @return {?}
     */
    addDishToCart(data) {
        if (this.messages.length) {
            this.messages.forEach((/**
             * @param {?} message
             * @return {?}
             */
            message => {
                this.eventer.emitMessageEvent(message);
            }));
            return;
        }
        this.net.put('/cart/add', data).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
             )*/
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    addDishToCart$(data) {
        if (this.messages.length) {
            this.messages.forEach((/**
             * @param {?} message
             * @return {?}
             */
            message => {
                this.eventer.emitMessageEvent(message);
            }));
            return of(null);
        }
        return this.net.put('/cart/add', data)
            .pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        })));
    }
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    setDishCountToCart(dishId, amount) {
        this.net.post('/cart/set', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Изменено количество')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
             )*/
        }));
    }
    /**
     * @param {?} dishId
     * @param {?} comment
     * @return {?}
     */
    setDishComment(dishId, comment) {
        return this.net.post('/cart/setcomment', {
            "dishId": dishId,
            "cartId": this.cartID,
            "comment": comment
        }).pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
        })));
    }
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    removeDishFromCart$(dishId, amount) {
        return this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        })
            .pipe(tap((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        })));
    }
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    removeDishFromCart(dishId, amount) {
        this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
             )*/
        }));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    checkoutCart(data) {
        /** @type {?} */
        let order = {
            cartId: this.cartID,
            address: {
                streetId: data.street.id,
                home: data.house,
                housing: data.housing,
                // index: "1278",
                entrance: data.entrance,
                floor: data.floor,
                apartment: data.apartment
            },
            customer: {
                phone: data.phone,
                name: data.name,
                mail: data.email || undefined
            }
        };
        return this.orderCart(order);
    }
    /**
     * @param {?} data
     * @return {?}
     */
    orderCart(data) {
        return this.net.post('/order', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            console.log("Ошибка оформления!", error);
            if (error.error && error.error.cart) {
                this.setCartId(error.error.cart.cartId);
                this.cart.next(error.error.cart);
                this.cartID = error.error.cart.cartId;
            }
            /*if (error.message) {
              this.eventer.emitMessageEvent(
                new EventMessage(error.message.type, error.message.title, error.message.body)
              );
            } else {
              this.eventer.emitMessageEvent(
                new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
              );
            }*/
        })));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    checkStreetV2(data) {
        return this.net.post('/check', data)
            .pipe(tap((/**
         * @param {?} result
         * @return {?}
         */
        result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*if (result.message) {
             this.eventer.emitMessageEvent(
             new EventMessage(
             result.message.type,
             result.message.title,
             result.message.body
             )
             );
             }*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            console.error(error);
            //this.eventer.emitMessageEvent(
            //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
            //)
        })));
    }
    /**
     * @param {?} data
     * @return {?}
     */
    checkStreet(data) {
        this.net.post('/check', data).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            if (res.message) {
                this.eventer.emitMessageEvent(new EventMessage(res.message.type, res.message.title, res.message.body));
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        error => {
            if (error.error) {
                if (error.error.cart) {
                    this.setCartId(error.error.cart.cartId);
                    this.cart.next(error.error.cart);
                    this.cartID = error.error.cart.cartId;
                }
                /*this.eventer.emitMessageEvent(
                 new EventMessage(error.error.message.type, error.error.message.title, error.error.message.body)
                 );*/
            }
        }));
    }
    /**
     * @param {?} cartID
     * @return {?}
     */
    setCartId(cartID) {
        localStorage.setItem('cartID', cartID);
    }
    /**
     * @return {?}
     */
    removeCartId() {
        localStorage.removeItem('cartID');
    }
    /**
     * @return {?}
     */
    userCart() {
        return this.cart;
    }
    /**
     * @param {?} modifires
     * @param {?=} messages
     * @return {?}
     */
    setModifires(modifires, messages) {
        this.modifires.next(modifires);
        if (messages)
            this.modifiresMessage.next(messages);
    }
    /**
     * @return {?}
     */
    getModifires() {
        return this.modifires;
    }
}
NgRestoCartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgRestoCartService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];
/** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
if (false) {
    /** @type {?} */
    NgRestoCartService.prototype.cartID;
    /** @type {?} */
    NgRestoCartService.prototype.cart;
    /** @type {?} */
    NgRestoCartService.prototype.modifires;
    /** @type {?} */
    NgRestoCartService.prototype.OrderFormChange;
    /** @type {?} */
    NgRestoCartService.prototype.modifiresMessage;
    /** @type {?} */
    NgRestoCartService.prototype.messages;
    /**
     * @type {?}
     * @private
     */
    NgRestoCartService.prototype.net;
    /**
     * @type {?}
     * @private
     */
    NgRestoCartService.prototype.eventer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsZUFBZSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNuRSxPQUFPLEVBQUUsR0FBRyxFQUFjLE1BQU0sZ0JBQWdCLENBQUM7QUFFakQsT0FBTyxFQUNMLFVBQVUsRUFDVixjQUFjLEVBQ2QsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7OztBQU8zQixNQUFNLE9BQU8sa0JBQWtCOzs7OztJQVM3QixZQUFvQixHQUFjLEVBQ2QsT0FBc0I7UUFEdEIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNkLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFOMUMsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQU8xQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztRQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEVBQUMsQ0FBQztJQUN4RSxDQUFDOzs7O0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFB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Q0FBQzs7O1lBeFNGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7OztZQVRDLFVBQVU7WUFDVixjQUFjOzs7OztJQVVkLG9DQUFjOztJQUNkLGtDQUEwQjs7SUFDMUIsdUNBQStCOztJQUMvQiw2Q0FBNEM7O0lBRTVDLDhDQUFzQzs7SUFDdEMsc0NBQXdCOzs7OztJQUVaLGlDQUFzQjs7Ozs7SUFDdEIscUNBQThCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRTZXJ2aWNlIHtcbiAgY2FydElEOnN0cmluZztcbiAgY2FydDpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbW9kaWZpcmVzOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBPcmRlckZvcm1DaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gIG1vZGlmaXJlc01lc3NhZ2U6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1lc3NhZ2VzOkV2ZW50TWVzc2FnZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSkge1xuICAgIHRoaXMuY2FydCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHRoaXMubW9kaWZpcmVzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmluaXRpYWxTdG9yYWdlKCk7XG5cbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2VzID0+IHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcyk7XG4gIH1cblxuICBpbml0aWFsU3RvcmFnZSgpIHtcbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Q2FydElkKCk7XG4gICAgaWYgKHRoaXMuY2FydElEKSB7XG4gICAgICB0aGlzLm5ldFxuICAgICAgICAuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIGNhcnQgPT4gdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLnJlbW92ZUNhcnRJZCgpXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FydElkKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnRJRCcpO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JHQu9GO0LTQviDQtNC+0LHQsNCy0LvQtdC90L4g0LIg0LrQvtGA0LfQuNC90YMnKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQtNC+0LHQsNCy0LjRgtGMINCx0LvRjtC00L4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQkKGRhdGEpIHtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlcz0+IHtcbiAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JjQt9C80LXQvdC10L3QviDQutC+0LvQuNGH0LXRgdGC0LLQvicpXG4gICAgICAgICApOyovXG5cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LjQt9C80LXQvdC40YLRjCDQutC+0LvQuNGH0LXRgdGC0LLQvicpXG4gICAgICAgICApKi9cbiAgICAgIH0pO1xuICB9XG5cbiAgc2V0RGlzaENvbW1lbnQoZGlzaElkLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jYXJ0L3NldGNvbW1lbnQnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50XG4gICAgfSkucGlwZSh0YXAoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQuNC30LzQtdC90LjRgtGMINC60L7QvNC10L3RgtCw0YDQuNC5JylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICkpXG5cbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tQ2FydCQoZGlzaElkLCBhbW91bnQpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucHV0KCcvY2FydC9yZW1vdmUnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pXG4gICAgICAucGlwZSh0YXAocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgIH0pKTtcblxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucHV0KCcvY2FydC9yZW1vdmUnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CR0LvRjtC00L4g0YPRgdC/0LXRiNC90L4g0YPQtNCw0LvQtdC90L4nKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQsdC70Y7QtNC+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIGNoZWNrb3V0Q2FydChkYXRhKSB7XG4gICAgbGV0IG9yZGVyOk9yZGVyID0ge1xuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgc3RyZWV0SWQ6IGRhdGEuc3RyZWV0LmlkLFxuICAgICAgICBob21lOiBkYXRhLmhvdXNlLFxuICAgICAgICBob3VzaW5nOiBkYXRhLmhvdXNpbmcsXG4gICAgICAgIC8vIGluZGV4OiBcIjEyNzhcIixcbiAgICAgICAgZW50cmFuY2U6IGRhdGEuZW50cmFuY2UsXG4gICAgICAgIGZsb29yOiBkYXRhLmZsb29yLFxuICAgICAgICBhcGFydG1lbnQ6IGRhdGEuYXBhcnRtZW50XG4gICAgICB9LFxuXG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBtYWlsOiBkYXRhLmVtYWlsIHx8IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMub3JkZXJDYXJ0KG9yZGVyKTtcblxuICB9XG5cbiAgb3JkZXJDYXJ0KGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL29yZGVyJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CX0LDQutCw0Lcg0YPQv9C10YjQvdC+INC+0YTQvtGA0LzQu9C10L0nKVxuICAgICAgICAgICAgICk7Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC+0YTQvtGA0LzQu9C10L3QuNGPIVwiLCBlcnJvcik7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgJiYgZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyppZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RhNC+0YDQvNC40YLRjCDQt9Cw0LrQsNC3JylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgLy90aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIC8vbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RhNC+0YDQvNC40YLRjCDQt9Cw0LrQsNC3JylcbiAgICAgICAgICAgIC8vKVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWQge1xuXG4gICAgdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYgKHJlcy5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgKTsqL1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Q2FydElkKGNhcnRJRCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0SUQnLCBjYXJ0SUQpO1xuICB9XG4gIHJlbW92ZUNhcnRJZCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2FydElEJyk7XG4gIH1cblxuICB1c2VyQ2FydCgpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydDtcbiAgfVxuXG4gIHNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2VzPzpFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmIChtZXNzYWdlcykgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLm5leHQobWVzc2FnZXMpO1xuICB9XG5cbiAgZ2V0TW9kaWZpcmVzKCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmlyZXM7XG4gIH1cblxuXG59XG4iXX0=