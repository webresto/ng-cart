"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var ng_core_1 = require("@webresto/ng-core");
var i0 = require("@angular/core");
var i1 = require("@webresto/ng-core");
var NgRestoCartService = /** @class */ (function () {
    function NgRestoCartService(net, eventer) {
        var _this = this;
        this.net = net;
        this.eventer = eventer;
        this.OrderFormChange = new rxjs_1.BehaviorSubject(null);
        this.cart = new rxjs_1.BehaviorSubject({});
        this.modifires = new rxjs_1.BehaviorSubject([]);
        this.modifiresMessage = new rxjs_1.BehaviorSubject([]);
        this.initialStorage();
        this.modifiresMessage.subscribe((/**
         * @param {?} messages
         * @return {?}
         */
        function (messages) { return _this.messages = messages; }));
    }
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.initialStorage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cartID = this.getCartId();
        if (this.cartID) {
            this.net
                .get('/cart?cartId=' + this.cartID)
                .pipe(operators_1.tap((/**
             * @param {?} cart
             * @return {?}
             */
            function (cart) {
                if (cart.state == 'ORDER') {
                    rxjs_1.throwError(new Error('Cart in order state'));
                }
            })))
                .subscribe((/**
             * @param {?} cart
             * @return {?}
             */
            function (cart) { return _this.cart.next(cart.cart); }), (/**
             * @param {?} error
             * @return {?}
             */
            function (error) { return _this.removeCartId(); }));
        }
    };
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.getCartId = /**
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
            this.messages.forEach((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.eventer.emitMessageEvent(message);
            }));
            return;
        }
        this.net.put('/cart/add', data).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
             )*/
        }));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.addDishToCart$ = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (this.messages.length) {
            this.messages.forEach((/**
             * @param {?} message
             * @return {?}
             */
            function (message) {
                _this.eventer.emitMessageEvent(message);
            }));
            return rxjs_1.of(null);
        }
        return this.net.put('/cart/add', data)
            .pipe(operators_1.tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
        })));
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
        }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Изменено количество')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
             )*/
        }));
    };
    /**
     * @param {?} dishId
     * @param {?} comment
     * @return {?}
     */
    NgRestoCartService.prototype.setDishComment = /**
     * @param {?} dishId
     * @param {?} comment
     * @return {?}
     */
    function (dishId, comment) {
        var _this = this;
        return this.net.post('/cart/setcomment', {
            "dishId": dishId,
            "cartId": this.cartID,
            "comment": comment
        }).pipe(operators_1.tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            _this.eventer.emitMessageEvent(new ng_core_1.EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
        })));
    };
    /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    NgRestoCartService.prototype.removeDishFromCart$ = /**
     * @param {?} dishId
     * @param {?} amount
     * @return {?}
     */
    function (dishId, amount) {
        var _this = this;
        return this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        })
            .pipe(operators_1.tap((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
        })));
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
        }).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
             )*/
        }));
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
        return this.orderCart(order);
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
        return this.net.post('/order', data)
            .pipe(operators_1.tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.setCartId(result.cart.cartId);
            _this.cart.next(result.cart);
            _this.cartID = result.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
             );*/
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            console.log("Ошибка оформления!", error);
            if (error.error && error.error.cart) {
                _this.setCartId(error.error.cart.cartId);
                _this.cart.next(error.error.cart);
                _this.cartID = error.error.cart.cartId;
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
    };
    /**
     * @param {?} data
     * @return {?}
     */
    NgRestoCartService.prototype.checkStreetV2 = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.net.post('/check', data)
            .pipe(operators_1.tap((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            _this.setCartId(result.cart.cartId);
            _this.cart.next(result.cart);
            _this.cartID = result.cart.cartId;
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
        function (error) {
            console.error(error);
            //this.eventer.emitMessageEvent(
            //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
            //)
        })));
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
        this.net.post('/check', data).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.setCartId(res.cart.cartId);
            _this.cart.next(res.cart);
            _this.cartID = res.cart.cartId;
            if (res.message) {
                _this.eventer.emitMessageEvent(new ng_core_1.EventMessage(res.message.type, res.message.title, res.message.body));
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) {
            if (error.error) {
                if (error.error.cart) {
                    _this.setCartId(error.error.cart.cartId);
                    _this.cart.next(error.error.cart);
                    _this.cartID = error.error.cart.cartId;
                }
                /*this.eventer.emitMessageEvent(
                 new EventMessage(error.error.message.type, error.error.message.title, error.error.message.body)
                 );*/
            }
        }));
    };
    /**
     * @param {?} cartID
     * @return {?}
     */
    NgRestoCartService.prototype.setCartId = /**
     * @param {?} cartID
     * @return {?}
     */
    function (cartID) {
        localStorage.setItem('cartID', cartID);
    };
    /**
     * @return {?}
     */
    NgRestoCartService.prototype.removeCartId = /**
     * @return {?}
     */
    function () {
        localStorage.removeItem('cartID');
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
        { type: core_1.Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgRestoCartService.ctorParameters = function () { return [
        { type: ng_core_1.NetService },
        { type: ng_core_1.EventerService }
    ]; };
    /** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
    return NgRestoCartService;
}());
exports.NgRestoCartService = NgRestoCartService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcmVzdG9jYXJ0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsNkJBQW1FO0FBQ25FLDRDQUFpRDtBQUVqRCw2Q0FJMkI7OztBQUkzQjtJQVlFLDRCQUFvQixHQUFjLEVBQ2QsT0FBc0I7UUFEMUMsaUJBU0M7UUFUbUIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNkLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFOMUMsb0JBQWUsR0FBRyxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFPMUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLEtBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxFQUF4QixDQUF3QixFQUFDLENBQUM7SUFDeEUsQ0FBQzs7OztJQUVELDJDQUFjOzs7SUFBZDtRQUFBLGlCQWlCQztRQWhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMvQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsR0FBRztpQkFDTCxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7aUJBQ2xDLElBQUksQ0FDSCxlQUFHOzs7O1lBQUMsVUFB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O0lBQ25CLENBQUM7Ozs7OztJQUVELHlDQUFZOzs7OztJQUFaLFVBQWEsU0FBUyxFQUFFLFFBQXdCO1FBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUTtZQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckQsQ0FBQzs7OztJQUVELHlDQUFZOzs7SUFBWjtRQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOztnQkEvU0YsaUJBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7Z0JBVEMsb0JBQVU7Z0JBQ1Ysd0JBQWM7Ozs2QkFOaEI7Q0E4VEMsQUFsVEQsSUFrVEM7QUEvU1ksZ0RBQWtCOzs7SUFDN0Isb0NBQWM7O0lBQ2Qsa0NBQTBCOztJQUMxQix1Q0FBK0I7O0lBQy9CLDZDQUE0Qzs7SUFFNUMsOENBQXNDOztJQUN0QyxzQ0FBd0I7Ozs7O0lBRVosaUNBQXNCOzs7OztJQUN0QixxQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YXAsIGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIE5ldFNlcnZpY2UsXG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5pbXBvcnQgeyBPcmRlciB9IGZyb20gJy4uL2ludGVyZmFjZXMvb3JkZXInO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydFNlcnZpY2Uge1xuICBjYXJ0SUQ6c3RyaW5nO1xuICBjYXJ0OkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtb2RpZmlyZXM6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIE9yZGVyRm9ybUNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG5cbiAgbW9kaWZpcmVzTWVzc2FnZTpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbWVzc2FnZXM6RXZlbnRNZXNzYWdlW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXQ6TmV0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBldmVudGVyOkV2ZW50ZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgdGhpcy5tb2RpZmlyZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuaW5pdGlhbFN0b3JhZ2UoKTtcblxuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZS5zdWJzY3JpYmUobWVzc2FnZXMgPT4gdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzKTtcbiAgfVxuXG4gIGluaXRpYWxTdG9yYWdlKCkge1xuICAgIHRoaXMuY2FydElEID0gdGhpcy5nZXRDYXJ0SWQoKTtcbiAgICBpZiAodGhpcy5jYXJ0SUQpIHtcbiAgICAgIHRoaXMubmV0XG4gICAgICAgIC5nZXQoJy9jYXJ0P2NhcnRJZD0nICsgdGhpcy5jYXJ0SUQpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRhcChjYXJ0ID0+IHtcbiAgICAgICAgICAgIGlmKGNhcnQuc3RhdGUgPT0gJ09SREVSJykge1xuICAgICAgICAgICAgICB0aHJvd0Vycm9yKG5ldyBFcnJvcignQ2FydCBpbiBvcmRlciBzdGF0ZScpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICBjYXJ0ID0+IHRoaXMuY2FydC5uZXh0KGNhcnQuY2FydCksXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5yZW1vdmVDYXJ0SWQoKVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcnRJZCgpOnN0cmluZyB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQoZGF0YSkge1xuXG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uZXQucHV0KCcvY2FydC9hZGQnLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CR0LvRjtC00L4g0LTQvtCx0LDQstC70LXQvdC+INCyINC60L7RgNC30LjQvdGDJylcbiAgICAgICAgICk7Ki9cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LTQvtCx0LDQstC40YLRjCDQsdC70Y7QtNC+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucHV0KCcvY2FydC9hZGQnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXM9PiB7XG4gICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgc2V0RGlzaENvdW50VG9DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfQo9GB0L/QtdGFJywgJ9CY0LfQvNC10L3QtdC90L4g0LrQvtC70LjRh9C10YHRgtCy0L4nKVxuICAgICAgICAgKTsqL1xuXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC40LfQvNC10L3QuNGC0Ywg0LrQvtC70LjRh9C10YHRgtCy0L4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIHNldERpc2hDb21tZW50KGRpc2hJZCwgY29tbWVudCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXRjb21tZW50Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudFxuICAgIH0pLnBpcGUodGFwKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LjQt9C80LXQvdC40YLRjCDQutC+0LzQtdC90YLQsNGA0LjQuScpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApKVxuXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQkKGRpc2hJZCwgYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KVxuICAgICAgLnBpcGUodGFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICB9KSk7XG5cbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tQ2FydChkaXNoSWQsIGFtb3VudCkge1xuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQkdC70Y7QtNC+INGD0YHQv9C10YjQvdC+INGD0LTQsNC70LXQvdC+JylcbiAgICAgICAgICk7Ki9cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAn0J7RiNC40LHQutCwJywgJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0YPQtNCw0LvQuNGC0Ywg0LHQu9GO0LTQvicpXG4gICAgICAgICApKi9cbiAgICAgIH0pO1xuXG4gIH1cblxuICBjaGVja291dENhcnQoZGF0YSkge1xuICAgIGxldCBvcmRlcjpPcmRlciA9IHtcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0SUQsXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHN0cmVldElkOiBkYXRhLnN0cmVldC5pZCxcbiAgICAgICAgaG9tZTogZGF0YS5ob3VzZSxcbiAgICAgICAgaG91c2luZzogZGF0YS5ob3VzaW5nLFxuICAgICAgICAvLyBpbmRleDogXCIxMjc4XCIsXG4gICAgICAgIGVudHJhbmNlOiBkYXRhLmVudHJhbmNlLFxuICAgICAgICBmbG9vcjogZGF0YS5mbG9vcixcbiAgICAgICAgYXBhcnRtZW50OiBkYXRhLmFwYXJ0bWVudFxuICAgICAgfSxcblxuICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbWFpbDogZGF0YS5lbWFpbCB8fCB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm9yZGVyQ2FydChvcmRlcik7XG5cbiAgfVxuXG4gIG9yZGVyQ2FydChkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9vcmRlcicsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXN1bHQuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzdWx0LmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXN1bHQuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAn0KPRgdC/0LXRhScsICfQl9Cw0LrQsNC3INGD0L/QtdGI0L3QviDQvtGE0L7RgNC80LvQtdC9JylcbiAgICAgICAgICAgICApOyovXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcItCe0YjQuNCx0LrQsCDQvtGE0L7RgNC80LvQtdC90LjRjyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC+0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQtycpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1N0cmVldFYyKGRhdGEpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXN1bHQuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzdWx0LmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXN1bHQuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgICAvKmlmIChyZXN1bHQubWVzc2FnZSkge1xuICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50aXRsZSxcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS5ib2R5XG4gICAgICAgICAgICAgKVxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIC8vdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAvL25ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ9Ce0YjQuNCx0LrQsCcsICfQndC1INGD0LTQsNC70L7RgdGMINC+0YTQvtGA0LzQuNGC0Ywg0LfQsNC60LDQtycpXG4gICAgICAgICAgICAvLylcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1N0cmVldChkYXRhKTp2b2lkIHtcblxuICAgIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIGlmIChyZXMubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShyZXMubWVzc2FnZS50eXBlLCByZXMubWVzc2FnZS50aXRsZSwgcmVzLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5lcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoZXJyb3IuZXJyb3IubWVzc2FnZS50eXBlLCBlcnJvci5lcnJvci5tZXNzYWdlLnRpdGxlLCBlcnJvci5lcnJvci5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgICk7Ki9cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHNldENhcnRJZChjYXJ0SUQpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FydElEJywgY2FydElEKTtcbiAgfVxuICByZW1vdmVDYXJ0SWQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NhcnRJRCcpO1xuICB9XG5cbiAgdXNlckNhcnQoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNhcnQ7XG4gIH1cblxuICBzZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlcz86RXZlbnRNZXNzYWdlW10pOnZvaWQge1xuICAgIHRoaXMubW9kaWZpcmVzLm5leHQobW9kaWZpcmVzKTtcbiAgICBpZiAobWVzc2FnZXMpIHRoaXMubW9kaWZpcmVzTWVzc2FnZS5uZXh0KG1lc3NhZ2VzKTtcbiAgfVxuXG4gIGdldE1vZGlmaXJlcygpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZpcmVzO1xuICB9XG5cblxufVxuIl19