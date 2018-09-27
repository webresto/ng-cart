/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NetService, EventerService, EventMessage } from '@sails-resto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "@sails-resto/ng-core";
var NgRestoCartService = /** @class */ (function () {
    function NgRestoCartService(net, eventer) {
        var _this = this;
        this.net = net;
        this.eventer = eventer;
        this.cart = new BehaviorSubject({});
        this.modifires = new BehaviorSubject([]);
        this.modifiresMessage = new BehaviorSubject([]);
        this.initialStorage();
        this.modifiresMessage.subscribe(function (messages) { return _this.messages = messages; });
    }
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.initialStorage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cartID = this.getcartIDFromStorage();
        if (this.cartID) {
            this.net.get('/cart?cartId=' + this.cartID).subscribe(function (cart) {
                _this.cart.next(cart.cart);
            });
        }
        /*     this.restoStorageService.sub('localStorageService','cartID').subscribe(res=>{
        
             if(res.changeKey){
             console.log("event",res)
             this.net.get('/cart?cartId='+this.cartID).subscribe(cart=>{
             this.cart.next(cart);
             });}
        
             });; */
    };
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.getcartIDFromStorage = /**
     * @return {?}
     */
    function () {
        return localStorage.getItem('cartID');
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.addDishToCart = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (this.messages.length) {
            this.messages.forEach(function (message) {
                _this.eventer.emitMessageEvent(message);
            });
            return;
        }
        this.net.put('/cart/add', data).subscribe(function (res) {
            _this.setcartIDFromStorage(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину'));
            console.log(res);
        }, function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо'));
        });
    };
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    NgRestoCartService.prototype.setDishCountToCart = /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    function (dishId, amount) {
        var _this = this;
        this.net.post('/cart/set', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe(function (res) {
            _this.setcartIDFromStorage(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
                      new EventMessage('success', 'Успех', 'Изменено количество')
                    );*/
            console.log(res);
        }, function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось изменить количество'));
        });
    };
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    NgRestoCartService.prototype.removeDishFromCart = /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    function (dishId, amount) {
        var _this = this;
        this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe(function (res) {
            _this.setcartIDFromStorage(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Блюдо успешно удалено'));
            console.log(res);
        }, function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо'));
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.checkoutCart = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var order = {
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
        this.orderCart(order);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.orderCart = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.net.post('/order', data).subscribe(function (res) {
            _this.setcartIDFromStorage(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Заказ упешно оформлен'));
            console.log(res);
        }, function (error) {
            _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ'));
        });
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.checkStreet = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        this.net.post('/check', data).subscribe(function (res) {
            _this.setcartIDFromStorage(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            if (res.message) {
                _this.eventer.emitMessageEvent(new EventMessage(res.message.type, res.message.title, res.message.body));
            }
        }, function (error) {
            if (error.error) {
                if (error.error.cart) {
                    _this.setcartIDFromStorage(error.error.cart.cartId);
                    _this.cart.next(error.error.cart);
                    _this.cartID = error.error.cart.cartId;
                }
                _this.eventer.emitMessageEvent(new EventMessage(error.error.message.type, error.error.message.title, error.error.message.body));
            }
        });
    };
    /**
     * @param {?} cartID
     * @return {?}
     */
    NgRestoCartService.prototype.setcartIDFromStorage = /**
     * @param {?} cartID
     * @return {?}
     */
    function (cartID) {
        localStorage.setItem('cartID', cartID);
    };
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.userCart = /**
     * @return {?}
     */
    function () {
        return this.cart;
    };
    /**
     * @param {?} modifires
     * @param {?=} messages
     * @return {?}
     */
    NgRestoCartService.prototype.setModifires = /**
     * @param {?} modifires
     * @param {?=} messages
     * @return {?}
     */
    function (modifires, messages) {
        this.modifires.next(modifires);
        if (messages)
            this.modifiresMessage.next(messages);
    };
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.getModifires = /**
     * @return {?}
     */
    function () {
        return this.modifires;
    };
    NgRestoCartService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgRestoCartService.ctorParameters = function () { return [
        { type: NetService },
        { type: EventerService }
    ]; };
    /** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
    return NgRestoCartService;
}());
export { NgRestoCartService };
if (false) {
    /** @type {?} */
    NgRestoCartService.prototype.cartID;
    /** @type {?} */
    NgRestoCartService.prototype.cart;
    /** @type {?} */
    NgRestoCartService.prototype.modifires;
    /** @type {?} */
    NgRestoCartService.prototype.modifiresMessage;
    /** @type {?} */
    NgRestoCartService.prototype.messages;
    /** @type {?} */
    NgRestoCartService.prototype.net;
    /** @type {?} */
    NgRestoCartService.prototype.eventer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQWMsZUFBZSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFDTCxVQUFVLEVBQ1YsY0FBYyxFQUNkLFlBQVksRUFDYixNQUFNLHNCQUFzQixDQUFDOzs7O0lBaUI1Qiw0QkFDVSxLQUNBO1FBRlYsaUJBV0M7UUFWUyxRQUFHLEdBQUgsR0FBRztRQUNILFlBQU8sR0FBUCxPQUFPO1FBRWYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUF4QixDQUF3QixDQUFDLENBQUM7S0FDdkU7Ozs7SUFFRCwyQ0FBYzs7O0lBQWQ7UUFBQSxpQkFxQkM7UUFuQkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUUxQyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7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QUFDO1FBQy9CLElBQUcsUUFBUTtZQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbkQ7Ozs7SUFFRCx5Q0FBWTs7O0lBQVo7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdkI7O2dCQTNORixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dCQVhDLFVBQVU7Z0JBQ1YsY0FBYzs7OzZCQUxoQjs7U0FnQmEsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHNhaWxzLXJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvb3JkZXInO1xuLyogIFRPRE86INCSINC10YLQvtC8INC60LvQsNGB0LUg0LXRidC1INC90LDQtNC+INGA0LXQsNC70LjQt9C+0LLQsNGC0Ywg0LvQvtCz0LjQutGDINC/0YDQvtCy0LXRgNC60Lgg0LTQvtGB0YLRg9C/0L3QvtGB0YLQuCDRgNCw0LfQvdGL0YUg0YLQuNC/0L7QsiDQt9GF0YDQsNC90LjQu9C40YnRjCwg0L3QviDQv9C+0LrQsCDQvdC10YLRgyDRhNC40LrRgdCwINC90YPQttC90L7Qs9C+INC90LDQvCDQvNC+0LTRg9C70Y8g0LXRgtC+XG4g0LfQsNGC0YDRg9C00L3QsNGC0LXQu9GM0L3QviDQv9GA0LjQudC00LXRgtGB0Y8g0LbQtNCw0YLRjC4gICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XG4gIGNhcnRJRDpzdHJpbmc7XG4gIGNhcnQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1vZGlmaXJlczpCZWhhdmlvclN1YmplY3Q8YW55PjtcblxuICBtb2RpZmlyZXNNZXNzYWdlOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtZXNzYWdlczpFdmVudE1lc3NhZ2VbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLm1vZGlmaXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5pbml0aWFsU3RvcmFnZSgpO1xuXG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLnN1YnNjcmliZShtZXNzYWdlcyA9PiB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMpO1xuICB9XG5cbiAgaW5pdGlhbFN0b3JhZ2UoKSB7XG5cbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Y2FydElERnJvbVN0b3JhZ2UoKTtcblxuICAgIGlmICh0aGlzLmNhcnRJRCkge1xuICAgICAgdGhpcy5uZXQuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+IHtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qICAgICB0aGlzLnJlc3RvU3RvcmFnZVNlcnZpY2Uuc3ViKCdsb2NhbFN0b3JhZ2VTZXJ2aWNlJywnY2FydElEJykuc3Vic2NyaWJlKHJlcz0+e1xuXG4gICAgIGlmKHJlcy5jaGFuZ2VLZXkpe1xuICAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIscmVzKVxuICAgICB0aGlzLm5ldC5nZXQoJy9jYXJ0P2NhcnRJZD0nK3RoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+e1xuICAgICB0aGlzLmNhcnQubmV4dChjYXJ0KTtcbiAgICAgfSk7fVxuXG4gICAgIH0pOzsgKi9cblxuXG4gIH1cblxuICBnZXRjYXJ0SURGcm9tU3RvcmFnZSgpOnN0cmluZyB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0SUQnKTtcblxuICB9XG5cbiAgYWRkRGlzaFRvQ2FydChkYXRhKSB7XG5cbiAgICBpZih0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Y2FydElERnJvbVN0b3JhZ2UocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JHQu9GO0LTQviDQtNC+0LHQsNCy0LvQtdC90L4g0LIg0LrQvtGA0LfQuNC90YMnKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LTQvtCx0LDQstC40YLRjCDQsdC70Y7QtNC+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JjQt9C80LXQvdC10L3QviDQutC+0LvQuNGH0LXRgdGC0LLQvicpXG4gICAgICAgICk7Ki9cbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQvNC10L3QuNGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4nKVxuICAgICAgICApXG4gICAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tQ2FydChkaXNoSWQsIGFtb3VudCkge1xuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRjYXJ0SURGcm9tU3RvcmFnZShyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ9Cj0YHQv9C10YUnLCAn0JHQu9GO0LTQviDRg9GB0L/QtdGI0L3QviDRg9C00LDQu9C10L3QvicpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfQntGI0LjQsdC60LAnLCAn0J3QtSDRg9C00LDQu9C+0YHRjCDRg9C00LDQu9C40YLRjCDQsdC70Y7QtNC+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIGNoZWNrb3V0Q2FydChkYXRhKSB7XG4gICAgbGV0IG9yZGVyOk9yZGVyID0ge1xuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgc3RyZWV0SWQ6IGRhdGEuc3RyZWV0LmlkLFxuICAgICAgICBob21lOiBkYXRhLmhvdXNlLFxuICAgICAgICBob3VzaW5nOiBkYXRhLmhvdXNpbmcsXG4gICAgICAgIC8vIGluZGV4OiBcIjEyNzhcIixcbiAgICAgICAgZW50cmFuY2U6IGRhdGEuZW50cmFuY2UsXG4gICAgICAgIGZsb29yOiBkYXRhLmZsb29yLFxuICAgICAgICBhcGFydG1lbnQ6IGRhdGEuYXBhcnRtZW50XG4gICAgICB9LFxuXG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBtYWlsOiBkYXRhLmVtYWlsIHx8IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5vcmRlckNhcnQob3JkZXIpO1xuXG4gIH1cblxuICBvcmRlckNhcnQoZGF0YSk6dm9pZCB7XG4gICAgdGhpcy5uZXQucG9zdCgnL29yZGVyJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CX0LDQutCw0Lcg0YPQv9C10YjQvdC+INC+0YTQvtGA0LzQu9C10L0nKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0L7RhNC+0YDQvNC40YLRjCDQt9Cw0LrQsNC3JylcbiAgICAgICAgKVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWR7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPXJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYocmVzLm1lc3NhZ2Upe1xuXG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LCBlcnJvciA9PntcbiAgICAgICAgaWYoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZihlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPWVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Y2FydElERnJvbVN0b3JhZ2UoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG5cbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OiBFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiJdfQ==