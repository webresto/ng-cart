/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
/*  TODO: В етом класе еще надо реализовать логику проверки доступности разных типов зхранилищь, но пока нету фикса нужного нам модуля ето
 затруднательно прийдется ждать.  */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxHQUFHLEVBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQ0wsVUFBVSxFQUNWLGNBQWMsRUFDZCxZQUFZLEVBQ2IsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7QUFTM0IsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFTN0IsWUFBb0IsR0FBYyxFQUNkLE9BQXNCO1FBRHRCLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBTjFDLG9CQUFlLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7UUFBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxN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O0lBQ2Qsa0NBQTBCOztJQUMxQix1Q0FBK0I7O0lBQy9CLDZDQUE0Qzs7SUFFNUMsOENBQXNDOztJQUN0QyxzQ0FBd0I7Ozs7O0lBRVosaUNBQXNCOzs7OztJQUN0QixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgTmV0U2VydmljZSxcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9vcmRlcic7XG4vKiAgVE9ETzog0JIg0LXRgtC+0Lwg0LrQu9Cw0YHQtSDQtdGJ0LUg0L3QsNC00L4g0YDQtdCw0LvQuNC30L7QstCw0YLRjCDQu9C+0LPQuNC60YMg0L/RgNC+0LLQtdGA0LrQuCDQtNC+0YHRgtGD0L/QvdC+0YHRgtC4INGA0LDQt9C90YvRhSDRgtC40L/QvtCyINC30YXRgNCw0L3QuNC70LjRidGMLCDQvdC+INC/0L7QutCwINC90LXRgtGDINGE0LjQutGB0LAg0L3Rg9C20L3QvtCz0L4g0L3QsNC8INC80L7QtNGD0LvRjyDQtdGC0L5cbiDQt9Cw0YLRgNGD0LTQvdCw0YLQtdC70YzQvdC+INC/0YDQuNC50LTQtdGC0YHRjyDQttC00LDRgtGMLiAgKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRTZXJ2aWNlIHtcbiAgY2FydElEOnN0cmluZztcbiAgY2FydDpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbW9kaWZpcmVzOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBPcmRlckZvcm1DaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gIG1vZGlmaXJlc01lc3NhZ2U6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1lc3NhZ2VzOkV2ZW50TWVzc2FnZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSkge1xuICAgIHRoaXMuY2FydCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHRoaXMubW9kaWZpcmVzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmluaXRpYWxTdG9yYWdlKCk7XG5cbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2VzID0+IHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcyk7XG4gIH1cblxuICBpbml0aWFsU3RvcmFnZSgpIHtcbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Q2FydElkKCk7XG4gICAgaWYgKHRoaXMuY2FydElEKSB7XG4gICAgICB0aGlzLm5ldFxuICAgICAgICAuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIGNhcnQgPT4gdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLnJlbW92ZUNhcnRJZCgpXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FydElkKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnRJRCcpO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JHQu9GO0LTQviDQtNC+0LHQsNCy0LvQtdC90L4g0LIg0LrQvtGA0LfQuNC90YMnKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQtNC+0LHQsNCy0LjRgtGMINCx0LvRjtC00L4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIHNldERpc2hDb3VudFRvQ2FydChkaXNoSWQsIGFtb3VudCkge1xuICAgIHRoaXMubmV0LnBvc3QoJy9jYXJ0L3NldCcsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQmNC30LzQtdC90LXQvdC+INC60L7Qu9C40YfQtdGB0YLQstC+JylcbiAgICAgICAgICk7Ki9cblxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQuNC30LzQtdC90LjRgtGMINC60L7Qu9C40YfQtdGB0YLQstC+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ29tbWVudChkaXNoSWQsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Y29tbWVudCcsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnRcbiAgICB9KS5waXBlKHRhcChcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQvNC10L3QuNGC0Ywg0LrQvtC80LXQvdGC0LDRgNC40LknKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSlcblxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucHV0KCcvY2FydC9yZW1vdmUnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CR0LvRjtC00L4g0YPRgdC/0LXRiNC90L4g0YPQtNCw0LvQtdC90L4nKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQsdC70Y7QtNC+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIGNoZWNrb3V0Q2FydChkYXRhKSB7XG4gICAgbGV0IG9yZGVyOk9yZGVyID0ge1xuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgc3RyZWV0SWQ6IGRhdGEuc3RyZWV0LmlkLFxuICAgICAgICBob21lOiBkYXRhLmhvdXNlLFxuICAgICAgICBob3VzaW5nOiBkYXRhLmhvdXNpbmcsXG4gICAgICAgIC8vIGluZGV4OiBcIjEyNzhcIixcbiAgICAgICAgZW50cmFuY2U6IGRhdGEuZW50cmFuY2UsXG4gICAgICAgIGZsb29yOiBkYXRhLmZsb29yLFxuICAgICAgICBhcGFydG1lbnQ6IGRhdGEuYXBhcnRtZW50XG4gICAgICB9LFxuXG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBtYWlsOiBkYXRhLmVtYWlsIHx8IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMub3JkZXJDYXJ0KG9yZGVyKTtcblxuICB9XG5cbiAgb3JkZXJDYXJ0KGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL29yZGVyJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CX0LDQutCw0Lcg0YPQv9C10YjQvdC+INC+0YTQvtGA0LzQu9C10L0nKVxuICAgICAgICAgICAgICk7Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi0J7RiNC40LHQutCwINC+0YTQvtGA0LzQu9C10L3QuNGPIVwiLCBlcnJvcik7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgJiYgZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyppZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RhNC+0YDQvNC40YLRjCDQt9Cw0LrQsNC3JylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgLy90aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIC8vbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RhNC+0YDQvNC40YLRjCDQt9Cw0LrQsNC3JylcbiAgICAgICAgICAgIC8vKVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWQge1xuXG4gICAgdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYgKHJlcy5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgKTsqL1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Q2FydElkKGNhcnRJRCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0SUQnLCBjYXJ0SUQpO1xuICB9XG4gIHJlbW92ZUNhcnRJZCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2FydElEJyk7XG4gIH1cblxuICB1c2VyQ2FydCgpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydDtcbiAgfVxuXG4gIHNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2VzPzpFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmIChtZXNzYWdlcykgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLm5leHQobWVzc2FnZXMpO1xuICB9XG5cbiAgZ2V0TW9kaWZpcmVzKCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmlyZXM7XG4gIH1cblxuXG59XG4iXX0=