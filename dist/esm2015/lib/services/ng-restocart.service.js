import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, from } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { EventMessage } from '@webresto/ng-core';
import { formatDate } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@webresto/ng-core";
export class NgRestoCartService {
    constructor(net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.cartID = this.getCartId();
        this.cart = new BehaviorSubject(null);
        this.modifires = new BehaviorSubject([]);
        this.OrderFormChange = new BehaviorSubject(null);
        this.modifiresMessage = new BehaviorSubject([]);
        this.restrictions$ = new BehaviorSubject(null);
        this.restrictionsLoader$ = this.net.get(`/restrictions`).pipe(map(restictions => formatDate(Date.now() + restictions.periodPossibleForOrder * 1000, 'yyyy-MM-dd', 'en'))).subscribe(this.restrictions$);
    }
    getCartId() {
        return localStorage.getItem('cartID');
    }
    getCart() {
        return this.net.get(`/cart${this.cartID ? '?cartId=' + this.cartID : ''}`).pipe(switchMap(data => {
            if (data.cart.state == 'ORDER') {
                return throwError(new Error('Cart in order state'));
            }
            else {
                this.cart.next(data.cart);
            }
            ;
            return this.cart;
        }), catchError(err => {
            this.removeCartId();
            return throwError(err);
        }));
    }
    addDishToCart(data) {
        if (this.modifiresMessage.value.length) {
            this.modifiresMessage.value.forEach(message => {
                this.eventer.emitMessageEvent(message);
            });
            return;
        }
        this.net.put('/cart/add', data).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
             );*/
        }, () => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
             )*/
        });
    }
    addDishToCart$(data) {
        if (this.modifiresMessage.value.length) {
            this.modifiresMessage.value.forEach(message => {
                this.eventer.emitMessageEvent(message);
            });
            return from([null]);
        }
        return this.net.put('/cart/add', data)
            .pipe(tap(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }));
    }
    setDishCountToCart(dishId, amount) {
        this.net.post('/cart/set', {
            dishId: dishId,
            cartId: this.cartID,
            amount: amount
        }).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Изменено количество')
             );*/
        }, () => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
             )*/
        });
    }
    setDishComment(dishId, comment) {
        return this.net.post('/cart/setcomment', {
            dishId: dishId,
            cartId: this.cartID,
            comment: comment
        }).pipe(tap(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }, () => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
        }));
    }
    removeDishFromCart$(dishId, amount) {
        return this.net.put('/cart/remove', {
            dishId: dishId,
            cartId: this.cartID,
            amount: amount
        })
            .pipe(tap(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }));
    }
    removeDishFromCart(dishId, amount) {
        this.net.put('/cart/remove', {
            dishId: dishId,
            cartId: this.cartID,
            amount: amount
        }).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
             );*/
        }, error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
             )*/
        });
    }
    checkoutCart(data) {
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
    orderCart(data) {
        return this.net.post('/order', data)
            .pipe(tap(result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
             );*/
        }, error => {
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
        }));
    }
    checkStreetV2(data) {
        return this.net.post('/check', data)
            .pipe(tap(result => {
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
        }, error => {
            console.error(error);
            //this.eventer.emitMessageEvent(
            //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
            //)
        }));
    }
    checkStreet(data) {
        this.net.post('/check', data).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            if (res.message) {
                this.eventer.emitMessageEvent(new EventMessage(res.message.type, res.message.title, res.message.body));
            }
        }, error => {
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
        });
    }
    setCartId(cartID) {
        localStorage.setItem('cartID', cartID);
    }
    removeCartId() {
        localStorage.removeItem('cartID');
    }
    userCart() {
        return this.cart;
    }
    setModifires(modifires, messages) {
        this.modifires.next(modifires);
        if (messages) {
            this.modifiresMessage.next(messages);
        }
        ;
    }
    getModifires() {
        return this.modifires.pipe();
    }
    productInCart(product) {
        return this.cart.pipe(filter(cart => 'cartId' in cart), map(cart => {
            var _a;
            return !!(cart && ((_a = cart === null || cart === void 0 ? void 0 : cart.dishes) === null || _a === void 0 ? void 0 : _a.find(dishInCart => dishInCart.dish.id === product.id)));
        }));
    }
    getPickupPoints() {
        return this.net.get('/pickupaddreses?cartId=string');
    }
    getPaymentMethods() {
        return this.net.get('/paymentmethods');
    }
}
NgRestoCartService.ɵfac = function NgRestoCartService_Factory(t) { return new (t || NgRestoCartService)(i0.ɵɵinject(i1.NetService), i0.ɵɵinject(i1.EventerService)); };
NgRestoCartService.ɵprov = i0.ɵɵdefineInjectable({ token: NgRestoCartService, factory: NgRestoCartService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgRestoCartService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.NetService }, { type: i1.EventerService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiQzovVXNlcnMvbGFyY2hlbmtvdi9mcm9udGVuZC9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBYyxlQUFlLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pFLE9BQU8sRUFHTCxZQUFZLEVBQ2IsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQU03QyxNQUFNLE9BQU8sa0JBQWtCO0lBUzdCLFlBQW9CLEdBQWUsRUFBVSxPQUF1QjtRQUFoRCxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFScEUsV0FBTSxHQUFXLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNsQyxTQUFJLEdBQTBCLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhELGNBQVMsR0FBeUIsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUQsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QyxxQkFBZ0IsR0FBb0MsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFJNUUsa0JBQWEsR0FBRyxJQUFJLGVBQWUsQ0FBUyxJQUFJLENBQUMsQ0FBQztRQUVsRCx3QkFBbUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFl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Q0FBQztJQUN0RSxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBa0IsaUJBQWlCLENBQUMsQ0FBQztJQUMxRCxDQUFDOztvRkF6VFUsa0JBQWtCOzBEQUFsQixrQkFBa0IsV0FBbEIsa0JBQWtCLG1CQUZqQixNQUFNO2tEQUVQLGtCQUFrQjtjQUg5QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgdGhyb3dFcnJvciwgZnJvbSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7XHJcbiAgTmV0U2VydmljZSxcclxuICBFdmVudGVyU2VydmljZSxcclxuICBFdmVudE1lc3NhZ2VcclxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XHJcbmltcG9ydCB7IGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XHJcbiAgY2FydElEOiBzdHJpbmcgPSB0aGlzLmdldENhcnRJZCgpO1xyXG4gIGNhcnQ6IEJlaGF2aW9yU3ViamVjdDxDYXJ0PiA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XHJcblxyXG4gIG1vZGlmaXJlczogQmVoYXZpb3JTdWJqZWN0PGFueT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcclxuICBPcmRlckZvcm1DaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xyXG5cclxuICBtb2RpZmlyZXNNZXNzYWdlOiBCZWhhdmlvclN1YmplY3Q8RXZlbnRNZXNzYWdlW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0OiBOZXRTZXJ2aWNlLCBwcml2YXRlIGV2ZW50ZXI6IEV2ZW50ZXJTZXJ2aWNlKSB7IH1cclxuXHJcbiAgcmVzdHJpY3Rpb25zJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPihudWxsKTtcclxuXHJcbiAgcmVzdHJpY3Rpb25zTG9hZGVyJCA9IHRoaXMubmV0LmdldChgL3Jlc3RyaWN0aW9uc2ApLnBpcGUoXHJcbiAgICBtYXAocmVzdGljdGlvbnMgPT4gZm9ybWF0RGF0ZShEYXRlLm5vdygpICsgcmVzdGljdGlvbnMucGVyaW9kUG9zc2libGVGb3JPcmRlciAqIDEwMDAsICd5eXl5LU1NLWRkJywgJ2VuJykpXHJcbiAgKS5zdWJzY3JpYmUodGhpcy5yZXN0cmljdGlvbnMkKVxyXG5cclxuICBnZXRDYXJ0SWQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydElEJyk7XHJcbiAgfVxyXG5cclxuICBnZXRDYXJ0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LmdldDx7Y2FydDpDYXJ0fT4oYC9jYXJ0JHt0aGlzLmNhcnRJRD8nP2NhcnRJZD0nK3RoaXMuY2FydElEIDogJyd9YCkucGlwZShcclxuICAgICAgc3dpdGNoTWFwKFxyXG4gICAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgICAgaWYgKGRhdGEuY2FydC5zdGF0ZSA9PSAnT1JERVInKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQ2FydCBpbiBvcmRlciBzdGF0ZScpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGRhdGEuY2FydCk7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2FydDtcclxuICAgICAgICB9KSxcclxuICAgICAgY2F0Y2hFcnJvcihlcnIgPT4ge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2FydElkKCk7XHJcbiAgICAgICAgcmV0dXJuIHRocm93RXJyb3IoZXJyKTtcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBhZGREaXNoVG9DYXJ0KGRhdGEpIHtcclxuXHJcbiAgICBpZiAodGhpcy5tb2RpZmlyZXNNZXNzYWdlLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2UudmFsdWUuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcclxuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XHJcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XHJcblxyXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQkdC70Y7QtNC+INC00L7QsdCw0LLQu9C10L3QviDQsiDQutC+0YDQt9C40L3RgycpXHJcbiAgICAgICAgICk7Ki9cclxuXHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQtNC+0LHQsNCy0LjRgtGMINCx0LvRjtC00L4nKVxyXG4gICAgICAgICApKi9cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBhZGREaXNoVG9DYXJ0JChkYXRhKSB7XHJcbiAgICBpZiAodGhpcy5tb2RpZmlyZXNNZXNzYWdlLnZhbHVlLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2UudmFsdWUuZm9yRWFjaChtZXNzYWdlID0+IHtcclxuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBmcm9tKFtudWxsXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKHJlcyA9PiB7XHJcbiAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xyXG4gICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xyXG4gICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIHNldERpc2hDb3VudFRvQ2FydChkaXNoSWQsIGFtb3VudCkge1xyXG4gICAgdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Jywge1xyXG4gICAgICBkaXNoSWQ6IGRpc2hJZCxcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcclxuICAgICAgYW1vdW50OiBhbW91bnRcclxuICAgIH0pLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xyXG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcclxuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcclxuXHJcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CY0LfQvNC10L3QtdC90L4g0LrQvtC70LjRh9C10YHRgtCy0L4nKVxyXG4gICAgICAgICApOyovXHJcblxyXG5cclxuICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQvNC10L3QuNGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4nKVxyXG4gICAgICAgICApKi9cclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXREaXNoQ29tbWVudChkaXNoSWQsIGNvbW1lbnQpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXRjb21tZW50Jywge1xyXG4gICAgICBkaXNoSWQ6IGRpc2hJZCxcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcclxuICAgICAgY29tbWVudDogY29tbWVudFxyXG4gICAgfSkucGlwZSh0YXAoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcclxuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XHJcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XHJcblxyXG4gICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQuNC30LzQtdC90LjRgtGMINC60L7QvNC10L3RgtCw0YDQuNC5JylcclxuICAgICAgICApXHJcbiAgICAgIH1cclxuICAgICkpXHJcblxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkaXNoSWQsIGFtb3VudCkge1xyXG4gICAgcmV0dXJuIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xyXG4gICAgICBkaXNoSWQ6IGRpc2hJZCxcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcclxuICAgICAgYW1vdW50OiBhbW91bnRcclxuICAgIH0pXHJcbiAgICAgIC5waXBlKHRhcChyZXMgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XHJcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xyXG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xyXG4gICAgICB9KSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVtb3ZlRGlzaEZyb21DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XHJcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcclxuICAgICAgZGlzaElkOiBkaXNoSWQsXHJcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0SUQsXHJcbiAgICAgIGFtb3VudDogYW1vdW50XHJcbiAgICB9KS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XHJcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xyXG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xyXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQkdC70Y7QtNC+INGD0YHQv9C10YjQvdC+INGD0LTQsNC70LXQvdC+JylcclxuICAgICAgICAgKTsqL1xyXG5cclxuICAgICAgfSwgZXJyb3IgPT4ge1xyXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINGD0LTQsNC70LjRgtGMINCx0LvRjtC00L4nKVxyXG4gICAgICAgICApKi9cclxuICAgICAgfSk7XHJcblxyXG4gIH1cclxuXHJcbiAgY2hlY2tvdXRDYXJ0KGRhdGEpIHtcclxuICAgIGxldCBvcmRlciA9IHtcclxuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcclxuICAgICAgYWRkcmVzczoge1xyXG4gICAgICAgIHN0cmVldElkOiBkYXRhLnN0cmVldC5pZCxcclxuICAgICAgICBob21lOiBkYXRhLmhvdXNlLFxyXG4gICAgICAgIGhvdXNpbmc6IGRhdGEuaG91c2luZyxcclxuICAgICAgICAvLyBpbmRleDogXCIxMjc4XCIsXHJcbiAgICAgICAgZW50cmFuY2U6IGRhdGEuZW50cmFuY2UsXHJcbiAgICAgICAgZmxvb3I6IGRhdGEuZmxvb3IsXHJcbiAgICAgICAgYXBhcnRtZW50OiBkYXRhLmFwYXJ0bWVudFxyXG4gICAgICB9LFxyXG5cclxuICAgICAgY3VzdG9tZXI6IHtcclxuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcclxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXHJcbiAgICAgICAgbWFpbDogZGF0YS5lbWFpbCB8fCB1bmRlZmluZWRcclxuICAgICAgfVxyXG4gICAgfTtcclxuICAgIHJldHVybiB0aGlzLm9yZGVyQ2FydChvcmRlcik7XHJcblxyXG4gIH1cclxuXHJcbiAgb3JkZXJDYXJ0KGRhdGEpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvb3JkZXInLCBkYXRhKVxyXG4gICAgICAucGlwZShcclxuICAgICAgICB0YXAoXHJcbiAgICAgICAgICByZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXN1bHQuY2FydC5jYXJ0SWQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzdWx0LmNhcnQuY2FydElkO1xyXG4gICAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CX0LDQutCw0Lcg0YPQv9C10YjQvdC+INC+0YTQvtGA0LzQu9C10L0nKVxyXG4gICAgICAgICAgICAgKTsqL1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGVycm9yID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQntGI0LjQsdC60LAg0L7RhNC+0YDQvNC70LXQvdC40Y8hXCIsIGVycm9yKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcclxuICAgICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQoZXJyb3IuZXJyb3IuY2FydCk7XHJcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKmlmIChlcnJvci5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IubWVzc2FnZS5ib2R5KVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDQvtGE0L7RgNC80LjRgtGMINC30LDQutCw0LcnKVxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0qL1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcclxuICAgICAgLnBpcGUoXHJcbiAgICAgICAgdGFwKFxyXG4gICAgICAgICAgcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzdWx0LmNhcnQuY2FydElkKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzdWx0LmNhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcclxuICAgICAgICAgICAgLyppZiAocmVzdWx0Lm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcclxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnR5cGUsXHJcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50aXRsZSxcclxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcclxuICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICAvL3RoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgICAvL25ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC+0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQtycpXHJcbiAgICAgICAgICAgIC8vKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICB9XHJcblxyXG4gIGNoZWNrU3RyZWV0KGRhdGEpOiB2b2lkIHtcclxuXHJcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXHJcbiAgICAgIHJlcyA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcclxuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XHJcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XHJcbiAgICAgICAgaWYgKHJlcy5tZXNzYWdlKSB7XHJcbiAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShyZXMubWVzc2FnZS50eXBlLCByZXMubWVzc2FnZS50aXRsZSwgcmVzLm1lc3NhZ2UuYm9keSlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LCBlcnJvciA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yLmVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IuY2FydCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLmVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IuZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IuZXJyb3IubWVzc2FnZS5ib2R5KVxyXG4gICAgICAgICAgICk7Ki9cclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHNldENhcnRJZChjYXJ0SUQpIHtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0SUQnLCBjYXJ0SUQpO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlQ2FydElkKCkge1xyXG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NhcnRJRCcpO1xyXG4gIH1cclxuXHJcbiAgdXNlckNhcnQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgIHJldHVybiB0aGlzLmNhcnQ7XHJcbiAgfVxyXG5cclxuICBzZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlcz86IEV2ZW50TWVzc2FnZVtdKTogdm9pZCB7XHJcbiAgICB0aGlzLm1vZGlmaXJlcy5uZXh0KG1vZGlmaXJlcyk7XHJcbiAgICBpZiAobWVzc2FnZXMpIHtcclxuICAgICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLm5leHQobWVzc2FnZXMpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGdldE1vZGlmaXJlcygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgcmV0dXJuIHRoaXMubW9kaWZpcmVzLnBpcGUoKTtcclxuICB9XHJcblxyXG4gIHByb2R1Y3RJbkNhcnQocHJvZHVjdDpEaXNoTGlzdEl0ZW0pIHtcclxuICAgIHJldHVybiB0aGlzLmNhcnQucGlwZShcclxuICAgICAgZmlsdGVyKGNhcnQgPT4gJ2NhcnRJZCcgaW4gY2FydCksXHJcbiAgICAgIG1hcChjYXJ0ID0+IHtcclxuICAgICAgICByZXR1cm4gISEoY2FydCAmJiBjYXJ0Py5kaXNoZXM/LmZpbmQoZGlzaEluQ2FydCA9PiBkaXNoSW5DYXJ0LmRpc2guaWQgPT09IHByb2R1Y3QuaWQpKVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdldFBpY2t1cFBvaW50cygpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5nZXQ8UGlja3VwUG9pbnRbXT4oJy9waWNrdXBhZGRyZXNlcz9jYXJ0SWQ9c3RyaW5nJyk7XHJcbiAgfVxyXG5cclxuICBnZXRQYXltZW50TWV0aG9kcygpIHtcclxuICAgIHJldHVybiB0aGlzLm5ldC5nZXQ8UGF5bWVudE1ldGhvZFtdPignL3BheW1lbnRtZXRob2RzJyk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGlja3VwUG9pbnQge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBhZGRyZXNzOiBzdHJpbmc7XHJcbiAgb3JkZXI6IG51bWJlcjtcclxuICBlbmFibGU6IGJvb2xlYW47XHJcbiAgY3JlYXRlZEF0OiBzdHJpbmc7XHJcbiAgdXBkYXRlZEF0OiBzdHJpbmc7XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBheW1lbnRNZXRob2Qge1xyXG4gIGlpa29QYXltZW50TWV0aG9kOiBhbnksXHJcbiAgaWQ6IHN0cmluZyxcclxuICB0aXRsZTogc3RyaW5nLFxyXG4gIHR5cGU6IHN0cmluZyxcclxuICBhZGFwdGVyOiBzdHJpbmcsXHJcbiAgb3JkZXI6IG51bWJlcixcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gIGVuYWJsZTogYm9vbGVhbixcclxuICBjcmVhdGVkQXQ6IHN0cmluZyxcclxuICB1cGRhdGVkQXQ6IHN0cmluZ1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBEaXNoSW5DYXJ0IHtcclxuICBhZGRlZEJ5OiBzdHJpbmc7XHJcbiAgYW1vdW50OiBudW1iZXI7XHJcbiAgY2FydDogc3RyaW5nO1xyXG4gIGNvbW1lbnQ6IHN0cmluZztcclxuICBjcmVhdGVkQXQ6IHN0cmluZztcclxuICBkaXNoOiBEaXNoTGlzdEl0ZW07XHJcbiAgaWQ6IG51bWJlcjtcclxuICBpdGVtVG90YWw6IG51bWJlcjtcclxuICBtb2RpZmllcnM6IGFueVtdO1xyXG4gIHBhcmVudDogYW55O1xyXG4gIHRvdGFsV2VpZ2h0OiBudW1iZXI7XHJcbiAgdW5pcXVlSXRlbXM6IG51bWJlcjtcclxuICB1cGRhdGVkQXQ6IHN0cmluZztcclxuICB3ZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgQ2FydCB7XHJcbiAgYWRkcmVzczogYW55XHJcbiAgY2FydElkOiBzdHJpbmdcclxuICBjYXJ0VG90YWw6IG51bWJlclxyXG4gIGNvbW1lbnQ6IHN0cmluZ1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nXHJcbiAgY3VzdG9tZXI6IHN0cmluZ1xyXG4gIGRlbGl2ZXJ5OiBhbnlcclxuICBkZWxpdmVyeURlc2NyaXB0aW9uOiBzdHJpbmdcclxuICBkZWxpdmVyeUl0ZW06IGFueVxyXG4gIGRlbGl2ZXJ5U3RhdHVzOiBhbnlcclxuICBkaXNoZXM6IERpc2hJbkNhcnRbXVxyXG4gIGRpc2hlc0NvdW50OiBudW1iZXJcclxuICBoaXN0b3J5OiBhbnlcclxuICBpZDogc3RyaW5nXHJcbiAgbWVzc2FnZTogYW55XHJcbiAgbW9kaWZpZXJzOiBhbnlcclxuICBuYW1lT2ZNb2RlbDogYW55XHJcbiAgcGVyc29uc0NvdW50OiBudW1iZXJcclxuICBwcm9ibGVtOiBib29sZWFuXHJcbiAgcm1zSWQ6IHN0cmluZ1xyXG4gIHNlbGZEZWxpdmVyeTogYm9vbGVhblxyXG4gIHNlbmRUb0lpa286IGJvb2xlYW5cclxuICBzdGF0ZTogc3RyaW5nXHJcbiAgdG90YWxXZWlnaHQ6IHN0cmluZ1xyXG4gIHVuaXF1ZURpc2hlczogc3RyaW5nXHJcbiAgdXBkYXRlZEF0OiBzdHJpbmdcclxuICB1c2VyOiBhbnlcclxuICBGcmVlRGVsaXZlcnlGcm9tTWVzc2FnZTogc3RyaW5nXHJcbiAgZGF0ZTogbnVsbFxyXG4gIGRlbGl2ZXJ5VGltZU1lc3NhZ2U6IHN0cmluZ1xyXG4gIGRlbGl2ZXJ5VG90YWw6IG51bWJlclxyXG4gIGRpc2NvdW50VG90YWw6IG51bWJlclxyXG4gIGlzUGF5bWVudFByb21pc2U6IGJvb2xlYW5cclxuICBvcmRlckRhdGU6IHN0cmluZ1xyXG4gIG9yZGVyRGF0ZUxpbWl0OiBzdHJpbmdcclxuICBvcmRlclRvdGFsOiBudW1iZXJcclxuICBwYWlkOiBib29sZWFuXHJcbiAgcGF5bWVudE1ldGhvZDogc3RyaW5nXHJcbiAgcGF5bWVudE1ldGhvZFRpdGxlOiBzdHJpbmdcclxuICByZWNvbW1lbmRzOiBEaXNoTGlzdEl0ZW1bXTtcclxuICBybXNEZWxpdmVyZWQ6IGJvb2xlYW5cclxuICBybXNEZWxpdmVyeURhdGU6IG51bGxcclxuICBybXNFcnJvckNvZGU6IG51bGxcclxuICBybXNFcnJvck1lc3NhZ2U6IG51bGxcclxuICBybXNPcmRlckRhdGE6IG51bGxcclxuICBybXNPcmRlck51bWJlcjogbnVsbFxyXG4gIHJtc1N0YXR1c0NvZGU6IG51bGxcclxuICBzZWxmU2VydmljZTogYm9vbGVhblxyXG4gIHNob3J0SWQ6IHN0cmluZ1xyXG4gIHRvdGFsOiBudW1iZXJcclxuICB1bnRpbEZyZWVEZWxpdmVyeU1lc3NhZ2U6IHN0cmluZ1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBEaXNoTGlzdEl0ZW0ge1xyXG4gIGFkZGl0aW9uYWxJbmZvOiBhbnlcclxuICBiYWxhbmNlOiBudW1iZXJcclxuICBjYXJib2h5ZHJhdGVBbW91bnQ6IG51bWJlclxyXG4gIGNhcmJvaHlkcmF0ZUZ1bGxBbW91bnQ6IG51bWJlclxyXG4gIGNvZGU6IHN0cmluZ1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nXHJcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xyXG4gIGRpZmZlcmVudFByaWNlc09uOiBhbnlbXVxyXG4gIGRvTm90UHJpbnRJbkNoZXF1ZTogYm9vbGVhblxyXG4gIGVuZXJneUFtb3VudDogbnVtYmVyXHJcbiAgZW5lcmd5RnVsbEFtb3VudDogbnVtYmVyXHJcbiAgZmF0QW1vdW50OiBudW1iZXJcclxuICBmYXRGdWxsQW1vdW50OiBudW1iZXJcclxuICBmaWJlckFtb3VudDogbnVtYmVyXHJcbiAgZmliZXJGdWxsQW1vdW50OiBudW1iZXJcclxuICBncm91cElkOiBhbnlcclxuICBncm91cE1vZGlmaWVyczogW11cclxuICBoYXNoOiBudW1iZXJcclxuICBpZDogc3RyaW5nXHJcbiAgaW1hZ2VzOiBEaXNoSW1hZ2VJdGVtW11cclxuICBpbWFnZXNMaXN0OiBEaXNoSW1hZ2VJdGVtW11cclxuICBpc0RlbGV0ZWQ6IGJvb2xlYW5cclxuICBpc0luY2x1ZGVkSW5NZW51OiBib29sZWFuXHJcbiAgbWVhc3VyZVVuaXQ6IHN0cmluZ1xyXG4gIG1vZGlmaWVyczogRGlzaE1vZGlmaWVyW11cclxuICBuYW1lOiBzdHJpbmdcclxuICBvcmRlcjogbnVtYmVyXHJcbiAgcGFyZW50R3JvdXA6IHN0cmluZ1xyXG4gIHByaWNlOiBudW1iZXJcclxuICBwcm9kdWN0Q2F0ZWdvcnlJZDogc3RyaW5nXHJcbiAgcHJvaGliaXRlZFRvU2FsZU9uOiBhbnlbXVxyXG4gIHJtc0lkOiBzdHJpbmdcclxuICBzZW9EZXNjcmlwdGlvbjogYW55XHJcbiAgc2VvS2V5d29yZHM6IGFueVxyXG4gIHNlb1RleHQ6IGFueVxyXG4gIHNlb1RpdGxlOiBhbnlcclxuICBzbHVnOiBzdHJpbmdcclxuICB0YWdzOiBhbnlbXVxyXG4gIHRhZ3NMaXN0OiBhbnlbXVxyXG4gIHR5cGU6IHN0cmluZ1xyXG4gIHVwZGF0ZWRBdDogc3RyaW5nXHJcbiAgdXNlQmFsYW5jZUZvclNlbGw6IGJvb2xlYW5cclxuICB3ZWlnaHQ6IG51bWJlclxyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBEaXNoSW1hZ2VVcmxzIHtcclxuICBsYXJnZTogc3RyaW5nXHJcbiAgb3JpZ2luOiBzdHJpbmdcclxuICBzbWFsbDogc3RyaW5nXHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIERpc2hJbWFnZUl0ZW0ge1xyXG4gIGNyZWF0ZWRBdDogc3RyaW5nXHJcbiAgZ3JvdXA6IGFueVxyXG4gIGlkOiBzdHJpbmdcclxuICBpbWFnZXM6IERpc2hJbWFnZVVybHNcclxuICB1cGRhdGVkQXQ6IHN0cmluZ1xyXG4gIHVwbG9hZERhdGU6IHN0cmluZ1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBEaXNoQmFzZU1vZGlmaWVyIHtcclxuICBtYXhBbW91bnQ6IG51bWJlclxyXG4gIG1pbkFtb3VudDogbnVtYmVyXHJcbiAgbW9kaWZpZXJJZDogc3RyaW5nXHJcbiAgcmVxdWlyZWQ6IGJvb2xlYW5cclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgRGlzaE1vZGlmaWVyIGV4dGVuZHMgRGlzaEJhc2VNb2RpZmllciB7XHJcbiAgY2hpbGRNb2RpZmllcnM6IERpc2hDaGlsZE1vZGlmaWVyW11cclxuICBjaGlsZE1vZGlmaWVyc0hhdmVNaW5NYXhSZXN0cmljdGlvbnM6IGJvb2xlYW5cclxuICBncm91cDogRGlzaExpc3RJdGVtXHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIERpc2hDaGlsZE1vZGlmaWVyIGV4dGVuZHMgRGlzaEJhc2VNb2RpZmllciB7XHJcbiAgZGVmYXVsdEFtb3VudDogbnVtYmVyXHJcbiAgaGlkZUlmRGVmYXVsdEFtb3VudDogYm9vbGVhblxyXG4gIGRpc2g6IERpc2hMaXN0SXRlbVxyXG59Il19