import { createCommonjsModule, unwrapExports } from ' commonjsHelpers.js';
import '@angular/core';
import 'rxjs';
import 'rxjs/operators';
import '@webresto/ng-core';
import core_1 from ' commonjs-proxy-@angular/core';
import rxjs_1 from ' commonjs-proxy-rxjs';
import operators_1 from ' commonjs-proxy-rxjs/operators';
import ng_core_1 from ' commonjs-proxy-@webresto/ng-core';
import ng_restocart_service_1 from ' commonjs-proxy-../services/ng-restocart.service';
import 'tslib';
import tslib_1 from ' commonjs-proxy-tslib';
import ng_restocart_service_1$1 from ' commonjs-proxy-../../services/ng-restocart.service';
import '@angular/common';
import common_1 from ' commonjs-proxy-@angular/common';
import add_dish_to_cart_directive_1 from ' commonjs-proxy-./directives/add-dish-to-cart.directive';
import amount_cart_directive_1 from ' commonjs-proxy-./directives/amount-cart.directive';
import delete_from_cart_directive_1 from ' commonjs-proxy-./directives/delete-from-cart.directive';
import order_cart_user_directive_1 from ' commonjs-proxy-./directives/order-cart-user.directive';
import set_amount_directive_1 from ' commonjs-proxy-./directives/set-amount.directive';
import dish_calc_directive_1 from ' commonjs-proxy-./directives/dish-calc.directive';
import checkout_directive_1 from ' commonjs-proxy-./directives/checkout.directive';
import set_dish_comment_directive_1 from ' commonjs-proxy-./directives/set-dish-comment.directive';
import dish_calc_component_1 from ' commonjs-proxy-./components/dish-calc/dish-calc.component';
import ng_restocart_service_1$2 from ' commonjs-proxy-./lib/services/ng-restocart.service';
import ng_cart_module_1 from ' commonjs-proxy-./lib/ng-cart.module';
import public_api_1 from ' commonjs-proxy-./public_api';
import dish_calc_component_1$1 from ' commonjs-proxy-./lib/components/dish-calc/dish-calc.component';
import add_dish_to_cart_directive_1$1 from ' commonjs-proxy-./lib/directives/add-dish-to-cart.directive';
import amount_cart_directive_1$1 from ' commonjs-proxy-./lib/directives/amount-cart.directive';
import checkout_directive_1$1 from ' commonjs-proxy-./lib/directives/checkout.directive';
import delete_from_cart_directive_1$1 from ' commonjs-proxy-./lib/directives/delete-from-cart.directive';
import dish_calc_directive_1$1 from ' commonjs-proxy-./lib/directives/dish-calc.directive';
import order_cart_user_directive_1$1 from ' commonjs-proxy-./lib/directives/order-cart-user.directive';
import set_amount_directive_1$1 from ' commonjs-proxy-./lib/directives/set-amount.directive';
import set_dish_comment_directive_1$1 from ' commonjs-proxy-./lib/directives/set-dish-comment.directive';

var ngRestocart_service = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });




var i0 = core_1;
var i1 = ng_core_1;
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

});

unwrapExports(ngRestocart_service);
var ngRestocart_service_1 = ngRestocart_service.NgRestoCartService;

var addDishToCart_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var AddDishToCartDirective = /** @class */ (function () {
    function AddDishToCartDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.loading = new core_1.EventEmitter();
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.cart = res; }));
        this.cartService
            .getModifires()
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.modifires = res; }));
    }
    /**
     * @return {?}
     */
    AddDishToCartDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.addDishToCart(this.dish.id, this.amountDish);
    };
    /**
     * @private
     * @param {?} dishID
     * @param {?} amount
     * @return {?}
     */
    AddDishToCartDirective.prototype.addDishToCart = /**
     * @private
     * @param {?} dishID
     * @param {?} amount
     * @return {?}
     */
    function (dishID, amount) {
        var _this = this;
        /** @type {?} */
        var data = {
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifires,
            "comment": this.comment
        };
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this.success.emit(true); }), (/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.error.emit(e); }), (/**
         * @return {?}
         */
        function () {
            _this.loading.emit(false);
        }));
    };
    AddDishToCartDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[addToCart]'
                },] },
    ];
    /** @nocollapse */
    AddDishToCartDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    AddDishToCartDirective.propDecorators = {
        dish: [{ type: core_1.Input }],
        amountDish: [{ type: core_1.Input }],
        comment: [{ type: core_1.Input }],
        loading: [{ type: core_1.Output }],
        success: [{ type: core_1.Output }],
        error: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return AddDishToCartDirective;
}());
exports.AddDishToCartDirective = AddDishToCartDirective;

});

unwrapExports(addDishToCart_directive);
var addDishToCart_directive_1 = addDishToCart_directive.AddDishToCartDirective;

var amountCart_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var AmountCartDirective = /** @class */ (function () {
    function AmountCartDirective(cartService, renderer, el) {
        var _this = this;
        this.cartService = cartService;
        this.renderer = renderer;
        this.el = el;
        this.amount = '0';
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.cart = res;
            _this.amount = res.dishesCount || 0;
            _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
        }));
    }
    AmountCartDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[amountCart]'
                },] },
    ];
    /** @nocollapse */
    AmountCartDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService },
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef }
    ]; };
    return AmountCartDirective;
}());
exports.AmountCartDirective = AmountCartDirective;

});

unwrapExports(amountCart_directive);
var amountCart_directive_1 = amountCart_directive.AmountCartDirective;

var deleteFromCart_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var DeleteFromCartDirective = /** @class */ (function () {
    function DeleteFromCartDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.cart = res; }));
    }
    /**
     * @return {?}
     */
    DeleteFromCartDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.cartService.removeDishFromCart(this.dish.id, this.amountDish);
    };
    DeleteFromCartDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[deleteFromCart]'
                },] },
    ];
    /** @nocollapse */
    DeleteFromCartDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    DeleteFromCartDirective.propDecorators = {
        dish: [{ type: core_1.Input }],
        amountDish: [{ type: core_1.Input }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return DeleteFromCartDirective;
}());
exports.DeleteFromCartDirective = DeleteFromCartDirective;

});

unwrapExports(deleteFromCart_directive);
var deleteFromCart_directive_1 = deleteFromCart_directive.DeleteFromCartDirective;

var orderCartUser_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });



var OrderCartUserDirective = /** @class */ (function () {
    function OrderCartUserDirective(cartService) {
        this.cartService = cartService;
        this.requiredFields = ["name", "phone", "street", "house"];
        this.checkerFields = new rxjs_1.BehaviorSubject(undefined);
    }
    /**
     * @return {?}
     */
    OrderCartUserDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.order(this.orderCart.value);
        console.log(this.orderCart.value);
    };
    /**
     * @return {?}
     */
    OrderCartUserDirective.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.cartService
                .userCart()
                .subscribe((/**
             * @param {?} cart
             * @return {?}
             */
            function (cart) {
                if (_this.cart && _this.orderCart.valid && _this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                    _this.checkStreet(_this.orderCart.value);
                }
                _this.cart = cart;
            }));
        }), 100);
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.checkerFields.next(_this.checkForFields(_this.orderCart._directives, _this.requiredFields));
        }), 100);
        this.checkerFields.subscribe((/**
         * @param {?} state
         * @return {?}
         */
        function (state) {
            if (state) {
                _this.orderCart.controls['street'].valueChanges.subscribe((/**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) {
                    if (typeof val === 'object') {
                        setTimeout((/**
                         * @return {?}
                         */
                        function () {
                            if (_this.orderCart.controls['house'].valid) {
                                _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                _this.checkStreet(_this.orderCart.value);
                            }
                        }), 100);
                    }
                }));
                _this.orderCart.controls['house'].valueChanges.subscribe((/**
                 * @param {?} val
                 * @return {?}
                 */
                function (val) {
                    setTimeout((/**
                     * @return {?}
                     */
                    function () {
                        if (_this.orderCart.controls['street'].valid) {
                            _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                            _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                            _this.checkStreet(_this.orderCart.value);
                        }
                    }), 100);
                }));
            }
        }));
    };
    /**
     * @param {?} formDirectives
     * @param {?} requiredFields
     * @return {?}
     */
    OrderCartUserDirective.prototype.checkForFields = /**
     * @param {?} formDirectives
     * @param {?} requiredFields
     * @return {?}
     */
    function (formDirectives, requiredFields) {
        /** @type {?} */
        var fieldsAreAvailable = {};
        /** @type {?} */
        var noFields = [];
        formDirectives.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            fieldsAreAvailable[element.name] = true;
        }));
        requiredFields.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (!fieldsAreAvailable.hasOwnProperty(element)) {
                noFields.push(element);
            }
        }));
        if (noFields.length <= 0) {
            return true;
        }
        else {
            console.error("У формы отсутсвуют следующие обязательные для корректной работы модуля поля:", noFields);
            return false;
        }
    };
    /**
     * @param {?} dataToSend
     * @return {?}
     */
    OrderCartUserDirective.prototype.order = /**
     * @param {?} dataToSend
     * @return {?}
     */
    function (dataToSend) {
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            /** @type {?} */
            var payment = void 0;
            /** @type {?} */
            var comment = dataToSend.comment || "Не указан";
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
            /** @type {?} */
            var data = {
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
    };
    /**
     * @param {?} dataToSend
     * @return {?}
     */
    OrderCartUserDirective.prototype.checkStreet = /**
     * @param {?} dataToSend
     * @return {?}
     */
    function (dataToSend) {
        console.log(">>>>", dataToSend);
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            /** @type {?} */
            var data = {
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
    };
    /**
     * @param {?} str
     * @return {?}
     */
    OrderCartUserDirective.prototype.stringToNumber = /**
     * @param {?} str
     * @return {?}
     */
    function (str) {
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
    };
    OrderCartUserDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[orderCart]'
                },] },
    ];
    /** @nocollapse */
    OrderCartUserDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    OrderCartUserDirective.propDecorators = {
        orderCart: [{ type: core_1.Input }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return OrderCartUserDirective;
}());
exports.OrderCartUserDirective = OrderCartUserDirective;

});

unwrapExports(orderCartUser_directive);
var orderCartUser_directive_1 = orderCartUser_directive.OrderCartUserDirective;

var setAmount_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var SetAmountDirective = /** @class */ (function () {
    function SetAmountDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.cart = res; }));
    }
    /**
     * @return {?}
     */
    SetAmountDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.changeAmount(this.action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    SetAmountDirective.prototype.changeAmount = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        switch (action) {
            case '+':
                this.cartService.setDishCountToCart(this.dish.id, this.dish.amount + 1);
                break;
            case '-':
                this.cartService.setDishCountToCart(this.dish.id, this.dish.amount - 1);
                break;
            default:
                console.log("Директива SetDishAmount получила ложное значение action");
                break;
        }
    };
    SetAmountDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[setDishAmount]'
                },] },
    ];
    /** @nocollapse */
    SetAmountDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    SetAmountDirective.propDecorators = {
        action: [{ type: core_1.Input }],
        dish: [{ type: core_1.Input }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return SetAmountDirective;
}());
exports.SetAmountDirective = SetAmountDirective;

});

unwrapExports(setAmount_directive);
var setAmount_directive_1 = setAmount_directive.SetAmountDirective;

var dishCalc_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var DishCalcDirective = /** @class */ (function () {
    function DishCalcDirective(renderer, el, cartService) {
        this.renderer = renderer;
        this.el = el;
        this.cartService = cartService;
        this.validate = new core_1.EventEmitter();
        this.amountDishToAdd = new core_1.EventEmitter();
        this.amountModifires = {};
        this.stateModifiers = {};
    }
    /**
     * @return {?}
     */
    DishCalcDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.addClass(this.el.nativeElement, "dish-calculator");
        this.amountDish = this.amount;
        this.amountDishToAdd.emit(this.amountDish);
        this.price = this.renderer.createElement("div");
        this.renderer.addClass(this.price, "dish-price");
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.renderDish(_this.dish);
            _this.render(_this.dish.modifiers);
        }), 100);
    };
    /**
     * @param {?} dish
     * @return {?}
     */
    DishCalcDirective.prototype.renderDish = /**
     * @param {?} dish
     * @return {?}
     */
    function (dish) {
        var _this = this;
        /*
             <div class="main-item">
             <div class="item-name">
             <div class="title">{{dish.name}}</div>
             </div>
             <div class="item-quantity">
             <!-- increase button-->
             <a class="item-quantity__button" (click)="changeAmountdish(-1)">&#8722;</a>
             <span class="item-quantity__counter" >{{amountDish}}</span>
             <!-- decrease button-->
             <a class="item-quantity__button" (click)="changeAmountdish(1)">&#x2b;</a>
             </div>
             <div class="weight-price">
             {{dish.price*amountDish}}&nbsp;&#x20bd;
             </div>
             </div>
        
        
             */
        /** @type {?} */
        var mainItem = this.renderer.createElement("div");
        this.renderer.addClass(mainItem, "dish-wraper");
        this.renderer.appendChild(this.el.nativeElement, mainItem);
        /** @type {?} */
        var itemName = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "name");
        this.renderer.appendChild(mainItem, itemName);
        /** @type {?} */
        var title = this.renderer.createElement("div");
        this.renderer.addClass(title, "title");
        this.renderer.setProperty(title, "innerHTML", this.dish.name);
        this.renderer.appendChild(itemName, title);
        /** @type {?} */
        var weightDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "dish");
        this.renderer.appendChild(mainItem, weightDishWrapper);
        /** @type {?} */
        var weightDishValue = this.renderer.createElement("div");
        this.renderer.addClass(weightDishValue, "value");
        this.renderer.setProperty(weightDishValue, "innerHTML", (this.dish.weight * 1000).toFixed(0) + " г.");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightDishValue, "zero");
        }
        this.renderer.appendChild(weightDishWrapper, weightDishValue);
        this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
        /** @type {?} */
        var priceDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceDishWrapper, "price");
        this.renderer.addClass(priceDishWrapper, "total");
        this.renderer.appendChild(priceDishWrapper, this.price);
        this.renderer.appendChild(mainItem, priceDishWrapper);
        /** @type {?} */
        var itemQuant = this.renderer.createElement("div");
        this.renderer.addClass(itemQuant, "quantity");
        this.renderer.appendChild(mainItem, itemQuant);
        /** @type {?} */
        var addButton = this.renderer.createElement("a");
        this.renderer.addClass(addButton, "quantity__button");
        this.renderer.addClass(addButton, "minus");
        this.renderer.setProperty(addButton, "innerHTML", "&#8722;");
        this.renderer.listen(addButton, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.changeAmountdish(-1);
            _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
            _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
            _this.innerTotalWeight(weightTotal);
        }));
        this.renderer.appendChild(itemQuant, addButton);
        /** @type {?} */
        var counter = this.renderer.createElement("span");
        this.renderer.addClass(counter, "quantity__counter");
        this.renderer.setProperty(counter, "innerHTML", this.amountDish);
        this.renderer.appendChild(itemQuant, counter);
        /** @type {?} */
        var minusButton = this.renderer.createElement("a");
        this.renderer.addClass(minusButton, "quantity__button");
        this.renderer.addClass(addButton, "plus");
        this.renderer.setProperty(minusButton, "innerHTML", "&#x2b;");
        this.renderer.listen(minusButton, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            _this.changeAmountdish(1);
            _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
            _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
            _this.innerTotalWeight(weightTotal);
        }));
        this.renderer.appendChild(itemQuant, minusButton);
        /** @type {?} */
        var weightTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "total");
        this.renderer.appendChild(mainItem, weightTotalWrapper);
        /** @type {?} */
        var weightTotal = this.renderer.createElement("div");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightTotal, "zero");
        }
        this.renderer.addClass(weightTotal, "value");
        this.innerTotalWeight(weightTotal); // TODO: total Weight
        this.renderer.appendChild(weightTotalWrapper, weightTotal);
        this.weightTotal = weightTotal;
        this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(dish.price)); // TODO: правильно считать цену
        // TODO: правильно считать цену
        /** @type {?} */
        var priceTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceTotalWrapper, "price");
        this.renderer.addClass(priceTotalWrapper, "total");
        this.renderer.appendChild(priceTotalWrapper, this.price);
        this.renderer.appendChild(mainItem, priceTotalWrapper);
    };
    /**
     * @param {?} priceDish
     * @param {?=} amount
     * @param {?=} modifiresPrice
     * @return {?}
     */
    DishCalcDirective.prototype.generatePrice = /**
     * @param {?} priceDish
     * @param {?=} amount
     * @param {?=} modifiresPrice
     * @return {?}
     */
    function (priceDish, amount, modifiresPrice) {
        var _this = this;
        /** @type {?} */
        var selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.dish.modifiers.forEach((/**
                 * @param {?} groups
                 * @return {?}
                 */
                function (groups) {
                    /** @type {?} */
                    var mod = groups.childModifiers.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.modifierId === element.id; }));
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                }));
            }));
        /** @type {?} */
        var modSum = 0;
        selected.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            modSum = modSum + element.dish.price * _this.amountModifires[element.groupId][element.modifierId];
        }));
        modSum = modSum * this.amountDish;
        return (priceDish * this.amountDish + modSum + '<div class="currency">&nbsp;&#x20bd;</div>');
    };
    /**
     * @return {?}
     */
    DishCalcDirective.prototype.generateTotalWeight = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.dish.modifiers.forEach((/**
                 * @param {?} groups
                 * @return {?}
                 */
                function (groups) {
                    /** @type {?} */
                    var mod = groups.childModifiers.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.modifierId === element.id; }));
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                }));
            }));
        /** @type {?} */
        var modSum = 0;
        selected.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            modSum = modSum + element.dish.weight * _this.amountModifires[element.groupId][element.modifierId] * 1000;
        }));
        modSum = parseFloat((modSum * this.amountDish).toFixed(2));
        console.log(modSum, this.dish.weight * 1000 * this.amountDish);
        console.log(this.dish.weight, this.amountDish);
        /** @type {?} */
        var weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
        return (weight).toFixed(0) + " г. <div class='separator'></div>";
    };
    /**
     * @param {?} totalWeigthDiv
     * @return {?}
     */
    DishCalcDirective.prototype.innerTotalWeight = /**
     * @param {?} totalWeigthDiv
     * @return {?}
     */
    function (totalWeigthDiv) {
        this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DishCalcDirective.prototype.changeAmountdish = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.amountDish = this.amountDish + value;
        if (this.amountDish <= 0) {
            this.amountDish = 1;
        }
        if (this.amountDish >= 199) {
            this.amountDish = 199;
        }
        this.amountDishToAdd.emit(this.amountDish);
    };
    /**
     * @param {?} modifires
     * @return {?}
     */
    DishCalcDirective.prototype.render = /**
     * @param {?} modifires
     * @return {?}
     */
    function (modifires) {
        var _this = this;
        this.setModifires();
        if (modifires.length > 0) {
            /** @type {?} */
            var h = this.renderer.createElement("h5");
            this.renderer.setProperty(h, "innerHTML", "К этому блюду можно добавить:");
            // this.renderer.appendChild(this.el.nativeElement, h);
        }
        modifires.forEach((/**
         * @param {?} elementGroup
         * @return {?}
         */
        function (elementGroup) {
            _this.stateModifiers[elementGroup.modifierId] = {};
            _this.amountModifires[elementGroup.modifierId] = {};
            if (elementGroup.dish) {
                /** @type {?} */
                var groupDiv = _this.groupDiv("Одночные модификаторы не поддерживаются");
                _this.renderer.appendChild(_this.el.nativeElement, groupDiv);
                console.log("elementGroup", elementGroup);
                //TODO: add single modificator logic
            }
            else if (elementGroup.childModifiers) {
                /** @type {?} */
                var groupDiv_1 = _this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                _this.renderer.appendChild(_this.el.nativeElement, groupDiv_1);
                /** @type {?} */
                var modArr = elementGroup.childModifiers;
                modArr.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
                    /** @type {?} */
                    var modifireDiv = _this.modifireDiv(element, elementGroup.modifierId);
                    _this.renderer.appendChild(groupDiv_1, modifireDiv);
                    if (element.defaultAmount < 1) {
                        _this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                    }
                    else {
                        _this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                    }
                }));
            }
        }));
        if (modifires.length > 0) {
            /** @type {?} */
            var h = this.renderer.createElement("div");
            this.renderer.setProperty(h, "innerHTML", "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>");
            this.renderer.appendChild(this.el.nativeElement, h);
        }
    };
    /**
     * @param {?} nameGorup
     * @return {?}
     */
    DishCalcDirective.prototype.groupDiv = /**
     * @param {?} nameGorup
     * @return {?}
     */
    function (nameGorup) {
        /** @type {?} */
        var div = this.renderer.createElement("div");
        this.renderer.addClass(div, "group-modifires-wraper");
        this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
        return div;
    };
    /**
     * @param {?} element
     * @param {?} groupId
     * @return {?}
     */
    DishCalcDirective.prototype.modifireDiv = /**
     * @param {?} element
     * @param {?} groupId
     * @return {?}
     */
    function (element, groupId) {
        /** @type {?} */
        var div = this.renderer.createElement("div");
        this.renderer.addClass(div, "additional-item");
        this.renderOneModifire(element, div, groupId);
        return div;
    };
    /**
     * @param {?} element
     * @param {?} modifireDiv
     * @param {?} groupId
     * @return {?}
     */
    DishCalcDirective.prototype.renderOneModifire = /**
     * @param {?} element
     * @param {?} modifireDiv
     * @param {?} groupId
     * @return {?}
     */
    function (element, modifireDiv, groupId) {
        console.info('renderOneModifire', element);
        console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
        // Рендер Названия модификатора
        /** @type {?} */
        var itemNameDiv = this.renderer.createElement("div");
        this.renderer.addClass(itemNameDiv, "item-name");
        /** @type {?} */
        var label = this.renderer.createElement("label");
        this.renderer.setAttribute(label, "for", element.modifierId);
        this.renderer.appendChild(itemNameDiv, label);
        this.renderer.setProperty(label, "innerHTML", element.dish.name);
        this.renderer.appendChild(modifireDiv, itemNameDiv);
        /** @type {?} */
        var weigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
        /** @type {?} */
        var weightModifireLeft = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireLeft, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireLeft, 'zero');
        }
        this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');
        this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
        this.renderer.appendChild(modifireDiv, weigthModifireWraper);
        // Рендер блока изминения количества модификатора
        /** @type {?} */
        var itemQuantity = this.renderer.createElement("div");
        /* TODO: нужно проверить:
             да 0,0,[0] - только выключеный чекбокс
             да 0,1 [0]- только чекбокс
             да 0,1 [d===1]- только чекбокс, включеный
        
             да 0,n[d=0] - по умолчанию 0 кнопки +-
             да 0,n[d>0<n] - по умолчанию d, кнопки +-
        
        
        
             k,n [k<n,d=0] - k по умолчанию!!! нужно чтобвы стояла цыфра k в амаунт, макс n(больше n не подниамалось) кнопки +- (частный случай когда d=0)
             k,n [k<n,0<d=<n]- d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-
        
        
        
             defaultAmount:0
             hideIfDefaultAmount:false //Признак того, что не нужно отображать список модификаторов, если их количество равно количеству
             maxAmount:0
             minAmount:0
        
             */
        /** @type {?} */
        var min = element.minAmount;
        /** @type {?} */
        var max = element.maxAmount;
        /** @type {?} */
        var def = element.defaultAmount;
        console.info('min max def', min, max, def);
        switch (true) {
            case min === 0 && max === 0 && def === 0: // 0,0,[0] - только выключеный чекбокс
                this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId);
                break;
            case min === 0 && max === 1 && def === 0: // 0,1 [0]- только чекбокс
                this.renderCheckbox(element, false, itemQuantity, modifireDiv, groupId);
                break;
            case min === 0 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
                this.renderCheckbox(element, true, itemQuantity, modifireDiv, groupId);
                break;
            case min === 1 && max === 1 && def === 1: // 0,1 [d!=0]- только чекбокс, включеный
                console.error(element.dish.name, "Значение не поддается настройке:", min, max, def);
                break;
            case min <= max && def >= min && def <= max && max > 1: //d по умолчанию!!! нужно чтобвы стояла цыфра 1 в амаунт, макс n(больше n не подниамалось) кнопки +-
                this.renderInputButton(element, groupId, itemQuantity, modifireDiv);
                break;
            default:
                console.error(element.dish.name, "Ошибка рендера модификатора, для значений:", min, max, def);
                break;
        }
        if (element.maxAmount > 0 && element.minAmount > 0) ;
        // Рендер блока стоимости и веса модификатора
        // let weightPriceDiv = this.renderer.createElement('div');
        // this.renderer.addClass(weightPriceDiv, 'modal-price');
        // let weight;
        // if(element.dish.weight>0){
        //   weight =  element.dish.weight + " г ";
        // }
        // let slash = "/ ";
        // let price;
        // if(element.dish.price>0){
        //   price = element.dish.price + "&nbsp;&#x20bd;";
        // }
        // let weightAndPriceHTML = (weight||'')+(weight&&price? slash : '')+( price || '');
        // this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
        // this.renderer.appendChild(modifireDiv, weightPriceDiv);
        /** @type {?} */
        var rightweigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
        /** @type {?} */
        var weightModifireRight = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireRight, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireRight, 'zero');
        }
        this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');
        this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
        this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);
        /** @type {?} */
        var price = this.renderer.createElement("div");
        this.renderer.addClass(price, "item-price");
        /** @type {?} */
        var priceValue;
        if (element.dish.price > 0) {
            priceValue = element.dish.price + "<div class = 'currency'>&nbsp;&#x20bd;</div>";
            this.renderer.setProperty(price, "innerHTML", priceValue);
            this.renderer.appendChild(modifireDiv, price);
        }
        else {
            this.renderer.addClass(price, "zero-price");
        }
        this.setModifires();
        this.innerTotalWeight(this.weightTotal);
        this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
    };
    /**
     * @param {?} element
     * @param {?} isActive
     * @param {?} itemQuantity
     * @param {?} modifireDiv
     * @param {?} groupId
     * @return {?}
     */
    DishCalcDirective.prototype.renderCheckbox = /**
     * @param {?} element
     * @param {?} isActive
     * @param {?} itemQuantity
     * @param {?} modifireDiv
     * @param {?} groupId
     * @return {?}
     */
    function (element, isActive, itemQuantity, modifireDiv, groupId) {
        var _this = this;
        /** @type {?} */
        var input = this.renderer.createElement("input");
        this.renderer.setAttribute(input, "type", "checkbox");
        this.renderer.setAttribute(input, "id", element.modifierId);
        if (isActive) {
            this.renderer.setProperty(input, 'checked', true);
            element.checked = true;
            this.stateModifiers[groupId][element.modifierId] = true;
            this.amountModifires[groupId][element.modifierId] = 1;
        }
        else {
            element.checked = false;
            this.stateModifiers[groupId][element.modifierId] = false;
            this.amountModifires[groupId][element.modifierId] = 0;
        }
        this.renderer.addClass(input, "modal-checkbox");
        this.renderer.appendChild(itemQuantity, input);
        this.renderer.listen(input, "change", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this.idRadioBox(groupId)) {
                for (var key in _this.stateModifiers[groupId]) {
                    if (_this.stateModifiers[groupId].hasOwnProperty(key)) {
                        _this.stateModifiers[groupId][key] = false;
                        // this.renderer.setProperty(input, 'checked',   true);
                    }
                }
                /** @type {?} */
                var groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                groupDivBlock.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
                    if (element.id != e.target.id)
                        element.checked = false;
                }));
            }
            _this.stateModifiers[groupId][e.target.id] = e.target.checked;
            if (e.target.checked) {
                _this.amountModifires[groupId][e.target.id] = 1;
            }
            _this.setModifires();
            _this.innerTotalWeight(_this.weightTotal);
            _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
        }));
        this.renderer.appendChild(modifireDiv, itemQuantity);
    };
    /**
     * @param {?} element
     * @param {?} groupId
     * @param {?} itemQuantity
     * @param {?} modifireDiv
     * @return {?}
     */
    DishCalcDirective.prototype.renderInputButton = /**
     * @param {?} element
     * @param {?} groupId
     * @param {?} itemQuantity
     * @param {?} modifireDiv
     * @return {?}
     */
    function (element, groupId, itemQuantity, modifireDiv) {
        var _this = this;
        /** @type {?} */
        var startAmount;
        if (element.defaultAmount > 0) {
            startAmount = element.defaultAmount;
        }
        else {
            startAmount = element.minAmount;
        }
        if (startAmount > 0) {
            this.stateModifiers[groupId][element.modifierId] = true;
        }
        /** @type {?} */
        var aMinusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aMinusDiv, "quantity__button");
        this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
        this.renderer.appendChild(itemQuantity, aMinusDiv);
        this.renderer.listen(aMinusDiv, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var value = +_this.amountModifires[groupId][element.modifierId];
            _this.amountModifires[groupId][element.modifierId] = value - 1;
            if (_this.amountModifires[groupId][element.modifierId] < element.minAmount)
                _this.amountModifires[groupId][element.modifierId] = element.minAmount;
            _this.renderer.setProperty(span, "innerHTML", _this.amountModifires[groupId][element.modifierId]);
            if (_this.amountModifires[groupId][element.modifierId] === 0) {
                _this.stateModifiers[groupId][element.modifierId] = false;
            }
            _this.setModifires();
            _this.innerTotalWeight(_this.weightTotal);
            _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
        }));
        /** @type {?} */
        var span = this.renderer.createElement("span");
        this.renderer.addClass(span, "item-quantity__counter");
        this.amountModifires[groupId][element.modifierId] = startAmount;
        this.renderer.setProperty(span, "innerHTML", this.amountModifires[groupId][element.modifierId]);
        this.renderer.appendChild(itemQuantity, span);
        /** @type {?} */
        var aPlusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aPlusDiv, "quantity__button");
        this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
        this.renderer.appendChild(itemQuantity, aPlusDiv);
        this.renderer.appendChild(modifireDiv, itemQuantity);
        this.renderer.listen(aPlusDiv, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            /** @type {?} */
            var value = +_this.amountModifires[groupId][element.modifierId];
            _this.amountModifires[groupId][element.modifierId] = value + 1;
            if (_this.amountModifires[groupId][element.modifierId] >
                element.maxAmount &&
                element.maxAmount != 0)
                _this.amountModifires[groupId][element.modifierId] = element.maxAmount;
            _this.renderer.setProperty(span, "innerHTML", _this.amountModifires[groupId][element.modifierId]);
            if (_this.amountModifires[groupId][element.modifierId] > 0) {
                _this.stateModifiers[groupId][element.modifierId] = true;
            }
            _this.setModifires();
            _this.innerTotalWeight(_this.weightTotal);
            _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
        }));
    };
    /**
     * @return {?}
     */
    DishCalcDirective.prototype.setModifires = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var modifiersToSelect = [];
        /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
              modifiersToSelect = this.selectedModifiers;
            }*/
        /** @type {?} */
        var modifires = [];
        console.info('setModifires modifiersToSelect', modifiersToSelect);
        console.info('setModifires stateModifiers before', this.stateModifiers);
        console.info('setModifires selectedModifiers before', this.selectedModifiers);
        for (var groupId in this.stateModifiers) {
            var _loop_1 = function (modifireId) {
                if (this_1.stateModifiers[groupId][modifireId] || modifiersToSelect.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.modifierId == modifireId; }))) {
                    modifires.push({
                        id: modifireId,
                        amount: this_1.amountModifires[groupId][modifireId],
                        groupId: groupId
                    });
                }
            };
            var this_1 = this;
            for (var modifireId in this.stateModifiers[groupId]) {
                _loop_1(modifireId);
            }
        }
        this.selectedModifiers = modifires;
        if (this.dish.modifiers.length > 0) {
            /** @type {?} */
            var message_1 = [];
            this.dish.modifiers.forEach((/**
             * @param {?} group
             * @return {?}
             */
            function (group) {
                if (group.required) {
                    if (_this.stateModifiers[group.modifierId]) {
                        /** @type {?} */
                        var selectedModif = [];
                        /** @type {?} */
                        var localModif = _this.stateModifiers[group.modifierId];
                        for (var mod in localModif) {
                            if (localModif.hasOwnProperty(mod)) {
                                if (localModif[mod]) {
                                    selectedModif.push(localModif[mod]);
                                }
                            }
                        }
                        if (selectedModif.length < group.minAmount) {
                            message_1.push({
                                type: "warning",
                                title: "Внимание",
                                body: " Обязательно выберите модификаторы из категории: " +
                                    group.group.name
                            });
                            _this.validate.emit(false);
                            _this.cartService.setModifires(modifires, message_1);
                        }
                        else {
                            _this.validate.emit(true);
                            _this.cartService.setModifires(modifires, []);
                        }
                    }
                    else {
                        message_1.push({
                            type: "warning",
                            title: "Внимание",
                            body: " Обязательно выберите модификаторы из категории: " +
                                group.group.name
                        });
                        _this.validate.emit(false);
                        _this.cartService.setModifires(modifires, message_1);
                    }
                }
                else {
                    _this.validate.emit(true);
                    _this.cartService.setModifires(modifires);
                }
            }));
        }
        else {
            this.validate.emit(true);
            this.cartService.setModifires(modifires, []);
        }
        console.info('setModifires stateModifiers after', this.stateModifiers);
        console.info('setModifires selectedModifiers after', this.selectedModifiers);
    };
    /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
     если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
    /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
       если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
    /**
     * @param {?} groupId
     * @return {?}
     */
    DishCalcDirective.prototype.idRadioBox = /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
       если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
    /**
     * @param {?} groupId
     * @return {?}
     */
    function (groupId) {
        /** @type {?} */
        var currentGroup = this.dish.modifiers.find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.modifierId === groupId; }));
        return currentGroup.minAmount === 1 && currentGroup.maxAmount === 1;
    };
    // Проверяет минимальное количество модификаторовкоторые были выбраны
    // Проверяет минимальное количество модификаторовкоторые были выбраны
    /**
     * @param {?} groupId
     * @param {?} modifire
     * @return {?}
     */
    DishCalcDirective.prototype.checkMinAmountModifires = 
    // Проверяет минимальное количество модификаторовкоторые были выбраны
    /**
     * @param {?} groupId
     * @param {?} modifire
     * @return {?}
     */
    function (groupId, modifire) {
    };
    /**
     * @return {?}
     */
    DishCalcDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        //this.dish.modifiers =[];
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    };
    DishCalcDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[dishCalc]'
                },] },
    ];
    /** @nocollapse */
    DishCalcDirective.ctorParameters = function () { return [
        { type: core_1.Renderer2 },
        { type: core_1.ElementRef },
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    DishCalcDirective.propDecorators = {
        dish: [{ type: core_1.Input }],
        amount: [{ type: core_1.Input }],
        selectedModifiers: [{ type: core_1.Input }],
        validate: [{ type: core_1.Output }],
        amountDishToAdd: [{ type: core_1.Output }]
    };
    return DishCalcDirective;
}());
exports.DishCalcDirective = DishCalcDirective;

});

unwrapExports(dishCalc_directive);
var dishCalc_directive_1 = dishCalc_directive.DishCalcDirective;

var checkout_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });



var CheckoutDirective = /** @class */ (function () {
    function CheckoutDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.isChecking = new core_1.EventEmitter();
        this.cartService
            .userCart()
            .subscribe((/**
         * @param {?} cart
         * @return {?}
         */
        function (cart) { return _this.cart = cart; }));
        this.cartService.OrderFormChange
            .pipe(operators_1.filter((/**
         * @return {?}
         */
        function () {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (_this.locationId || (_this.streetId || _this.street) && _this.home || _this.delivery) {
                return true;
            }
        })), 
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
        operators_1.debounceTime(1000))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.checkStreet(); }));
    }
    /**
     * @return {?}
     */
    CheckoutDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.delivery) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        /** @type {?} */
        var comment = this.comment || "Не указан";
        /** @type {?} */
        var paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        var data = {
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
        data["selfDelivery"] = this.delivery;
        if (this.bonuses) {
            data['bonuses'] = this.bonuses.map((/**
             * @param {?} b
             * @return {?}
             */
            function (b) {
                return {
                    name: b.name,
                    amount: b.amount
                };
            }));
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
        /** @type {?} */
        var cartId = this.cart.id;
        this.cartService
            .orderCart(data)
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        function (result) {
            if (result.action && result.action.paymentRedirect) {
                window.location.href = result.action.paymentRedirect;
            }
            else {
                _this.success.emit(cartId);
            }
        }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.error.emit(error); }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    CheckoutDirective.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        this.cartService.OrderFormChange.next(changes);
    };
    /**
     * @return {?}
     */
    CheckoutDirective.prototype.checkStreet = /**
     * @return {?}
     */
    function () {
        //if(this.streetId == '0') return;
        var _this = this;
        //if(this.streetId == '0') return;
        /** @type {?} */
        var comment = this.comment || "Не указан";
        /** @type {?} */
        var paymentMethod = this.paymentMethod || "Не указано";
        /** @type {?} */
        var data = {
            "cartId": this.cart.cartId,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : null,
                "mail": this.email,
                "name": this.name || null
            },
            "personsCount": +this.personsCount
        };
        data["selfDelivery"] = this.delivery;
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
            .subscribe((
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        /**
         * @param {?} result
         * @return {?}
         */
        function (result) { return _this.isChecking.emit(false); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return _this.isChecking.emit(false); }));
    };
    /**
     * @param {?} phone
     * @return {?}
     */
    CheckoutDirective.prototype.preparePhone = /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    };
    CheckoutDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[checkout]'
                },] },
    ];
    /** @nocollapse */
    CheckoutDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        cartTotal: [{ type: core_1.Input }],
        bonuses: [{ type: core_1.Input }],
        name: [{ type: core_1.Input }],
        email: [{ type: core_1.Input }],
        phone: [{ type: core_1.Input }],
        delivery: [{ type: core_1.Input }],
        locationId: [{ type: core_1.Input }],
        street: [{ type: core_1.Input }],
        streetId: [{ type: core_1.Input }],
        home: [{ type: core_1.Input }],
        housing: [{ type: core_1.Input }],
        apartment: [{ type: core_1.Input }],
        entrance: [{ type: core_1.Input }],
        doorphone: [{ type: core_1.Input }],
        floor: [{ type: core_1.Input }],
        paymentMethod: [{ type: core_1.Input }],
        paymentMethodId: [{ type: core_1.Input }],
        personsCount: [{ type: core_1.Input }],
        comment: [{ type: core_1.Input }],
        date: [{ type: core_1.Input }],
        notifyMethodId: [{ type: core_1.Input }],
        success: [{ type: core_1.Output }],
        error: [{ type: core_1.Output }],
        isChecking: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return CheckoutDirective;
}());
exports.CheckoutDirective = CheckoutDirective;

});

unwrapExports(checkout_directive);
var checkout_directive_1$2 = checkout_directive.CheckoutDirective;

var setDishComment_directive = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });


var SetDishCommentDirective = /** @class */ (function () {
    function SetDishCommentDirective(cartService) {
        this.cartService = cartService;
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
    }
    /**
     * @return {?}
     */
    SetDishCommentDirective.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.setComment();
    };
    /**
     * @return {?}
     */
    SetDishCommentDirective.prototype.setComment = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.cartService.setDishComment(this.dish.id, this.comment).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.success.emit(true); }), (/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return _this.error.emit(err); }));
    };
    SetDishCommentDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[setDishComment]'
                },] },
    ];
    /** @nocollapse */
    SetDishCommentDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    SetDishCommentDirective.propDecorators = {
        comment: [{ type: core_1.Input }],
        dish: [{ type: core_1.Input }],
        success: [{ type: core_1.Output }],
        error: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return SetDishCommentDirective;
}());
exports.SetDishCommentDirective = SetDishCommentDirective;

});

unwrapExports(setDishComment_directive);
var setDishComment_directive_1 = setDishComment_directive.SetDishCommentDirective;

var dishCalc_component = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });




var DishCalcComponent = /** @class */ (function () {
    function DishCalcComponent(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new core_1.EventEmitter();
        this.amountDishToAdd = new core_1.EventEmitter();
        this.modifiers = {
            indexById: {},
            custom: {
                fixed: null
            },
            baseList: [],
        };
        this.modifiersValueTree = {};
        this.imageUrl = imageUrl;
    }
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.checkValid();
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var e_1, _a, e_2, _b;
        this.modifiers = {
            indexById: {},
            custom: {
                fixed: null
            },
            baseList: [],
        };
        this.modifiersValueTree = {};
        if (this.dish && this.dish.modifiers) {
            try {
                for (var _c = tslib_1.__values(this.dish.modifiers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var modifier = _d.value;
                    /** @type {?} */
                    var modifierType = null;
                    // Indexing
                    this.modifiers.indexById[modifier.modifierId] = modifier;
                    // Check Custom modifiers (like Pizza Size)
                    if (!this.modifiers.custom.fixed
                        && !this.modifiers.baseList.length
                        && modifier.childModifiers
                        && modifier.childModifiers.length == 2
                        && modifier.maxAmount == modifier.maxAmount
                        && modifier.maxAmount == 1) {
                        // This is Pizza Size modifier
                        modifierType = 'custom';
                        this.modifiers.custom.fixed = modifier;
                        console.info('Custom Fixed modifier:', modifier);
                    }
                    else if (modifier.group
                        && modifier.childModifiers
                        && modifier.childModifiers.length
                        && modifier.childModifiers.find((/**
                         * @param {?} m
                         * @return {?}
                         */
                        function (m) { return m.dish; }))) {
                        // This is Base modifier
                        modifierType = 'group';
                        this.modifiers.baseList.push(modifier);
                        console.info('Group modifier:', modifier);
                    }
                    else if (modifier.dish) {
                        modifierType = 'single';
                        this.modifiers.baseList.push(modifier);
                        console.info('Single modifier:', modifier);
                    }
                    else {
                        // This is broken modifier
                        modifierType = 'broken';
                        console.warn('Broken modifier:', modifier);
                    }
                    // Init default values
                    switch (modifierType) {
                        case 'group':
                        case 'custom':
                            this.modifiersValueTree[modifier.modifierId] = {};
                            try {
                                for (var _e = tslib_1.__values(modifier.childModifiers), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    var childModifier = _f.value;
                                    // Indexing
                                    this.modifiers.indexById[childModifier.modifierId] = childModifier;
                                    // Init default value
                                    this.modifiersValueTree[modifier.modifierId][childModifier.modifierId] = childModifier.defaultAmount;
                                }
                            }
                            catch (e_2_1) { e_2 = { error: e_2_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                                }
                                finally { if (e_2) throw e_2.error; }
                            }
                            // Calculate total amount in group
                            this.calculateTotalAmountInGroup(modifier.modifierId);
                            break;
                        case 'single':
                            if (!this.modifiersValueTree['single']) {
                                this.modifiersValueTree['single'] = {};
                            }
                            // Indexing
                            this.modifiers.indexById[modifier.modifierId] = modifier;
                            // Init default value
                            this.modifiersValueTree['single'][modifier.modifierId] = modifier.defaultAmount;
                    }
                    // Find images and set flags (imagesIsset, childImagesIsset)
                    this.checkImagesInModifier(modifier.modifierId);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.calculateTotalPrice();
        }
    };
    /**
     * @param {?} groupId
     * @return {?}
     */
    DishCalcComponent.prototype.calculateTotalAmountInGroup = /**
     * @param {?} groupId
     * @return {?}
     */
    function (groupId) {
        if (groupId == 'single')
            return;
        this.modifiers.indexById[groupId].totalAmount = Object
            .values(this.modifiersValueTree[groupId])
            .reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a + b; }));
        return this.modifiers.indexById[groupId].totalAmount;
    };
    /**
     * @param {?} modifierId
     * @return {?}
     */
    DishCalcComponent.prototype.checkImagesInModifier = /**
     * @param {?} modifierId
     * @return {?}
     */
    function (modifierId) {
        /** @type {?} */
        var m = this.modifiers.indexById[modifierId];
        this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length;
        this.modifiers.indexById[modifierId].childImagesIsset = !!Object
            .values(this.modifiersValueTree[modifierId])
            .find((/**
         * @param {?} m
         * @return {?}
         */
        function (m) { return m && m.dish && m.dish.images && m.dish.images.length; }));
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.calculateTotalPrice = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var totalPrice = this.dish.price || 0;
        for (var groupId in this.modifiersValueTree) {
            for (var modifierId in this.modifiersValueTree[groupId]) {
                /** @type {?} */
                var amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    /** @type {?} */
                    var modifier = this.modifiers.indexById[modifierId];
                    if (modifier && modifier.dish && modifier.dish.price) {
                        totalPrice += modifier.dish.price * amount;
                    }
                }
            }
        }
        this.totalPrice = totalPrice;
        this.setModifiers();
    };
    /**
     * @param {?} modifier
     * @return {?}
     */
    DishCalcComponent.prototype.getModifiersIds = /**
     * @param {?} modifier
     * @return {?}
     */
    function (modifier) {
        return {
            groupId: (modifier.dish && modifier.dish.groupId) ? modifier.dish.groupId : undefined,
            modifierId: modifier.modifierId
        };
    };
    /**
     * @param {?} modifier
     * @param {?} amount
     * @param {?} operation
     * @return {?}
     */
    DishCalcComponent.prototype.changeModifierAmount = /**
     * @param {?} modifier
     * @param {?} amount
     * @param {?} operation
     * @return {?}
     */
    function (modifier, amount, operation) {
        if (amount < 0)
            return;
        var _a = this.getModifiersIds(modifier), _b = _a.groupId, groupId = _b === void 0 ? 'single' : _b, modifierId = _a.modifierId;
        var minAmount = modifier.minAmount, maxAmount = modifier.maxAmount;
        var _c = this.modifiers.indexById[groupId] || {}, _d = _c.minAmount, groupMinAmount = _d === void 0 ? 0 : _d, _e = _c.maxAmount, groupMaxAmount = _e === void 0 ? 0 : _e;
        /** @type {?} */
        var previousAmount = this.modifiersValueTree[groupId][modifierId];
        // For checkbox
        if (operation == 'checkbox' && groupId !== 'single') {
            // If it work like radio button
            if (groupMinAmount <= 1 && groupMaxAmount == 1) {
                if (amount < groupMinAmount) {
                    return;
                }
                // Set zero amount for all options
                for (var itemModifierId in this.modifiersValueTree[groupId]) {
                    this.modifiersValueTree[groupId][itemModifierId] = 0;
                }
                this.calculateTotalAmountInGroup(groupId);
            }
            // Not action needed after
            if (amount == 0) {
                this.calculateTotalPrice();
                return;
            }
        }
        // Check Group amount limits
        if (groupMinAmount || groupMaxAmount) {
            // Total amount in group
            /** @type {?} */
            var groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
            if (groupAmount < groupMinAmount) {
                console.warn("Limit: min " + groupMinAmount + ". Current " + groupAmount);
                this.eventer.emitMessageEvent(new ng_core_1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + groupMinAmount));
                return;
            }
            if (groupAmount > groupMaxAmount) {
                console.warn("Limit: max " + groupMaxAmount + ". Current " + groupAmount);
                this.eventer.emitMessageEvent(new ng_core_1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + groupMaxAmount));
                return;
            }
        }
        // CHeck Modifier amount limits
        if (minAmount || maxAmount) {
            if (amount < minAmount) {
                switch (operation) {
                    case 'plus':
                        amount = minAmount;
                        break;
                    case 'minus':
                        amount = 0;
                        break;
                }
            }
            if (amount > maxAmount) {
                amount = maxAmount;
            }
        }
        this.modifiersValueTree[groupId][modifierId] = amount;
        this.calculateTotalAmountInGroup(groupId);
        this.calculateTotalPrice();
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.setModifiers = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var modifiersToSet = [];
        for (var groupId in this.modifiersValueTree) {
            for (var modifierId in this.modifiersValueTree[groupId]) {
                /** @type {?} */
                var amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    modifiersToSet.push({
                        id: modifierId,
                        amount: amount,
                        groupId: groupId !== 'single' ? groupId : undefined
                    });
                }
            }
        }
        if (modifiersToSet.length) {
            this.checkValid();
            this.cartService.setModifires(modifiersToSet, []);
        }
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.checkValid = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var isValid = true;
        for (var groupId in this.modifiersValueTree) {
            /** @type {?} */
            var groupModifier = this.modifiers.indexById[groupId];
            if (groupModifier.required) {
                /** @type {?} */
                var totalAmountInGroup = this.calculateTotalAmountInGroup(groupId);
                if (totalAmountInGroup < groupModifier.minAmount) {
                    isValid = false;
                    console.warn("Modifier " + groupId + " min amount: " + groupModifier.minAmount);
                }
                if (totalAmountInGroup > groupModifier.maxAmount) {
                    isValid = false;
                    console.warn("Modifier " + groupId + " max amount: " + groupModifier.maxAmount);
                }
            }
            //for(let modifierId in this.modifiersValueTree[groupId]) {
            //
            //}
        }
        this.validate.emit(isValid);
    };
    DishCalcComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dish-calc',
                    template: "<div class=\"ng-cart-dish-calc\" *ngIf=\"dish\">\n    <div class=\"dish\">\n        <div class=\"dish-image-box\">\n            <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n        </div>\n        <div class=\"dish-description-box\">\n            <div class=\"dish-name\">{{ dish.name }}</div>\n            <div class=\"dish-ingredients\">{{ dish.description }}</div>\n            <div class=\"dish-price-box\">\n                <ng-container *ngIf=\"!modifiers.custom.fixed; else modifierFixedTemplate\">\n                    <div class=\"price\" [ngClass]=\"{'zero-price': !dish.price}\">\n                        <span>{{ dish.price }}</span> \u20BD\n                    </div>\n                </ng-container>\n                <ng-template #modifierFixedTemplate>\n                    <ng-container *ngIf=\"modifiers.custom.fixed as modifier\">\n                        <div class=\"modifier-fixed\">\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                                <div class=\"item\"\n                                     [ngClass]=\"{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\n                                     (click)=\"changeModifierAmount(childModifier, 1, 'checkbox')\">\n                                    {{ childModifier.dish?.name }}\n                                </div>\n                            </ng-container>\n                        </div>\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                            <ng-container *ngIf=\"!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\n                                <div class=\"price\" [ngClass]=\"{'zero-price': !childModifier.dish?.price}\">\n                                    <span>{{ childModifier.dish?.price }}</span> \u20BD\n                                </div>\n                            </ng-container>\n                        </ng-container>\n                    </ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </div>\n    <div class=\"modifiers\" *ngIf=\"modifiers.baseList?.length\">\n        <ng-container *ngFor=\"let modifier of modifiers.baseList\">\n            <div class=\"modifier-group\">\n                <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\n                    <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\n                    <div class=\"modifier-description\" *ngIf=\"group.description\">{{ group.description }}</div>\n                </div>\n\n                <ng-container *ngIf=\"modifier.dish\">\n                    <div class=\"modifier-box\" [ngClass]=\"{'without-images': !modifier.childImagesIsset}\">\n                        <!-- Single modifier -->\n                        <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: modifier,\n                            groupId: 'single',\n                            amount: modifiersValueTree['single'][modifier.modifierId],\n                            groupAmount: modifiersValueTree['single'][modifier.modifierId],\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n                    </div>\n                </ng-container>\n\n                <ng-container *ngIf=\"modifier.childModifiers?.length\">\n                    <div class=\"modifier-children\" [ngClass]=\"{'without-images': !modifier.imagesIsset}\">\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                            <!-- Group modifier -->\n                            <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: childModifier,\n                            groupId: modifier.modifierId,\n                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],\n                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n\n                        </ng-container>\n                    </div>\n                </ng-container>\n\n            </div>\n        </ng-container>\n    </div>\n    <div class=\"result\">\n        <span class=\"text\">\u0418\u0422\u041E\u0413\u041E:</span>\n        <span class=\"price\">\n            <span>{{ totalPrice}}</span> \u20BD\n        </span>\n    </div>\n</div>\n\n\n\n<!-- Template block #dishImageTemplate -->\n\n<ng-template #dishImageTemplate let-dish=\"dish\">\n    <ng-container *ngIf=\"dish?.images && dish.images[0]?.images?.small; else imgPlaceholder\">\n        <div class=\"dish-image\" [style.backgroundImage]=\"'url(' + imageUrl + dish.images[0].images.small + ')'\"></div>\n    </ng-container>\n    <ng-template #imgPlaceholder>\n        <div class=\"dish-image-placeholder\"></div>\n    </ng-template>\n</ng-template>\n\n<!-- Template block #modifierTemplate -->\n\n<ng-template #modifierTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container *ngIf=\"modifier.dish as dish\">\n        <div class=\"modifier-dish\">\n            <div class=\"modifier-dish-image-box\">\n                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n            </div>\n            <div class=\"modifier-dish-description-box\">\n                <div class=\"modifier-dish-name\">{{ dish.name }}</div>\n                <div class=\"modifier-dish-weight\">{{ dish.weight * 1000 }} \u0433\u0440</div>\n            </div>\n            <div class=\"modifier-dish-price-box\">\n                <div [ngClass]=\"{'zero-price': !dish.price}\">\n                    <span>{{ dish.price }}</span> \u20BD\n                </div>\n            </div>\n            <div class=\"modifier-dish-action-box\">\n                <ng-container *ngIf=\"groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate\">\n                    <ng-container *ngTemplateOutlet=\"modifierCheckboxTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount\n                    }\"></ng-container>\n                </ng-container>\n\n                <ng-template #counterTemplate>\n                    <ng-container *ngTemplateOutlet=\"modifierCounterTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount,\n                        groupAmount: groupAmount,\n                        groupMinAmount: groupMinAmount,\n                        groupMaxAmount: groupMaxAmount\n                    }\"></ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCounterTemplate -->\n\n<ng-template #modifierCounterTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container>\n        <div class=\"modifier-counter\" [ngClass]=\"{disabled: !amount && groupAmount >= groupMaxAmount}\">\n            <div\n                    class=\"minus\"\n                    [ngClass]=\"{disabled: !amount || groupAmount <= groupMinAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount - 1, 'minus')\"\n                    onselectstart=\"return false;\">-</div>\n            <input [value]=\"amount\" readonly #input>\n            <div\n                    class=\"plus\"\n                    [ngClass]=\"{disabled: groupAmount >= groupMaxAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount + 1, 'plus')\"\n                    onselectstart=\"return false;\">+</div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCheckboxTemplate -->\n\n<ng-template #modifierCheckboxTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\">\n    <ng-container>\n        <div\n                class=\"modifier-checkbox\"\n                [ngClass]=\"{selected: amount}\"\n                (click)=\"changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')\"></div>\n    </ng-container>\n</ng-template>\n",
                    styles: [".dish{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:stretch;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;overflow:hidden;-webkit-box-flex:1;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;height:45px;margin-right:49px}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-description-box{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:-webkit-box;display:flex;-webkit-box-align:stretch;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.modifier-checkbox.selected:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}"]
                },] },
    ];
    /** @nocollapse */
    DishCalcComponent.ctorParameters = function () { return [
        { type: ng_restocart_service_1$1.NgRestoCartService },
        { type: ng_core_1.EventerService },
        { type: String, decorators: [{ type: core_1.Inject, args: ['ImageUrl',] }] }
    ]; };
    DishCalcComponent.propDecorators = {
        dish: [{ type: core_1.Input }],
        amount: [{ type: core_1.Input }],
        selectedModifiers: [{ type: core_1.Input }],
        validate: [{ type: core_1.Output }],
        amountDishToAdd: [{ type: core_1.Output }]
    };
    return DishCalcComponent;
}());
exports.DishCalcComponent = DishCalcComponent;

});

unwrapExports(dishCalc_component);
var dishCalc_component_1 = dishCalc_component.DishCalcComponent;

var ngCart_module = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });






//import { ModifiresDirective } from './directives/modifires.directive';





/** @type {?} */
var DIRECTIVES = [
    add_dish_to_cart_directive_1.AddDishToCartDirective,
    amount_cart_directive_1.AmountCartDirective,
    delete_from_cart_directive_1.DeleteFromCartDirective,
    order_cart_user_directive_1.OrderCartUserDirective,
    //ModifiresDirective,
    dish_calc_directive_1.DishCalcDirective,
    set_dish_comment_directive_1.SetDishCommentDirective,
    set_amount_directive_1.SetAmountDirective,
    checkout_directive_1.CheckoutDirective,
];
/** @type {?} */
var COMPONENTS = [
    dish_calc_component_1.DishCalcComponent
];
/** @type {?} */
var MODULES = [
    common_1.CommonModule
];
var NgRestoCartModule = /** @class */ (function () {
    function NgRestoCartModule() {
    }
    NgRestoCartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [MODULES],
                    providers: [],
                    declarations: [DIRECTIVES, COMPONENTS],
                    exports: [DIRECTIVES, COMPONENTS]
                },] },
    ];
    return NgRestoCartModule;
}());
exports.NgRestoCartModule = NgRestoCartModule;

});

unwrapExports(ngCart_module);
var ngCart_module_1 = ngCart_module.NgRestoCartModule;

var public_api = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Public API Surface of ng-cart
 */

exports.NgRestoCartService = ng_restocart_service_1$2.NgRestoCartService;

exports.NgRestoCartModule = ng_cart_module_1.NgRestoCartModule;

});

unwrapExports(public_api);
var public_api_1$1 = public_api.NgRestoCartService;
var public_api_2 = public_api.NgRestoCartModule;

var webrestoNgCart = createCommonjsModule(function (module, exports) {
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generated bundle index. Do not edit.
 */

exports.NgRestoCartService = public_api_1.NgRestoCartService;
exports.NgRestoCartModule = public_api_1.NgRestoCartModule;

exports.ɵi = dish_calc_component_1$1.DishCalcComponent;

exports.ɵa = add_dish_to_cart_directive_1$1.AddDishToCartDirective;

exports.ɵb = amount_cart_directive_1$1.AmountCartDirective;

exports.ɵh = checkout_directive_1$1.CheckoutDirective;

exports.ɵc = delete_from_cart_directive_1$1.DeleteFromCartDirective;

exports.ɵe = dish_calc_directive_1$1.DishCalcDirective;

exports.ɵd = order_cart_user_directive_1$1.OrderCartUserDirective;

exports.ɵg = set_amount_directive_1$1.SetAmountDirective;

exports.ɵf = set_dish_comment_directive_1$1.SetDishCommentDirective;

});

var webrestoNgCart$1 = unwrapExports(webrestoNgCart);
var webrestoNgCart_1 = webrestoNgCart.NgRestoCartService;
var webrestoNgCart_2 = webrestoNgCart.NgRestoCartModule;

export default webrestoNgCart$1;
export { webrestoNgCart_1 as NgRestoCartService, webrestoNgCart_2 as NgRestoCartModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctY2FydC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50LnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvbmctY2FydC5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L3dlYnJlc3RvLW5nLWNhcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRTZXJ2aWNlIHtcbiAgY2FydElEOnN0cmluZztcbiAgY2FydDpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbW9kaWZpcmVzOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBPcmRlckZvcm1DaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gIG1vZGlmaXJlc01lc3NhZ2U6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1lc3NhZ2VzOkV2ZW50TWVzc2FnZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSkge1xuICAgIHRoaXMuY2FydCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHRoaXMubW9kaWZpcmVzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmluaXRpYWxTdG9yYWdlKCk7XG5cbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2VzID0+IHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcyk7XG4gIH1cblxuICBpbml0aWFsU3RvcmFnZSgpIHtcbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Q2FydElkKCk7XG4gICAgaWYgKHRoaXMuY2FydElEKSB7XG4gICAgICB0aGlzLm5ldFxuICAgICAgICAuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoY2FydCA9PiB7XG4gICAgICAgICAgICBpZihjYXJ0LnN0YXRlID09ICdPUkRFUicpIHtcbiAgICAgICAgICAgICAgdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0NhcnQgaW4gb3JkZXIgc3RhdGUnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgY2FydCA9PiB0aGlzLmNhcnQubmV4dChjYXJ0LmNhcnQpLFxuICAgICAgICAgIGVycm9yID0+IHRoaXMucmVtb3ZlQ2FydElkKClcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJ0SWQoKTpzdHJpbmcge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydElEJyk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0KGRhdGEpIHtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCkcOQwrvDkcKOw5DCtMOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK7w5DCtcOQwr3DkMK+IMOQwrIgw5DCusOQwr7DkcKAw5DCt8OQwrjDkMK9w5HCgycpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucHV0KCcvY2FydC9hZGQnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXM9PiB7XG4gICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgc2V0RGlzaENvdW50VG9DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKYw5DCt8OQwrzDkMK1w5DCvcOQwrXDkMK9w5DCviDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgICk7Ki9cblxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK4w5DCt8OQwrzDkMK1w5DCvcOQwrjDkcKCw5HCjCDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ29tbWVudChkaXNoSWQsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Y29tbWVudCcsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnRcbiAgICB9KS5waXBlKHRhcChcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrjDkMK3w5DCvMOQwrXDkMK9w5DCuMORwoLDkcKMIMOQwrrDkMK+w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrknKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSlcblxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkaXNoSWQsIGFtb3VudCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSlcbiAgICAgIC5waXBlKHRhcChyZXMgPT4ge1xuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgfSkpO1xuXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpHDkMK7w5HCjsOQwrTDkMK+IMORwoPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5HCg8OQwrTDkMKww5DCu8OQwrXDkMK9w5DCvicpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMORwoPDkMK0w5DCsMOQwrvDkMK4w5HCgsORwowgw5DCscOQwrvDkcKOw5DCtMOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcblxuICB9XG5cbiAgY2hlY2tvdXRDYXJ0KGRhdGEpIHtcbiAgICBsZXQgb3JkZXI6T3JkZXIgPSB7XG4gICAgICBjYXJ0SWQ6IHRoaXMuY2FydElELFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICBzdHJlZXRJZDogZGF0YS5zdHJlZXQuaWQsXG4gICAgICAgIGhvbWU6IGRhdGEuaG91c2UsXG4gICAgICAgIGhvdXNpbmc6IGRhdGEuaG91c2luZyxcbiAgICAgICAgLy8gaW5kZXg6IFwiMTI3OFwiLFxuICAgICAgICBlbnRyYW5jZTogZGF0YS5lbnRyYW5jZSxcbiAgICAgICAgZmxvb3I6IGRhdGEuZmxvb3IsXG4gICAgICAgIGFwYXJ0bWVudDogZGF0YS5hcGFydG1lbnRcbiAgICAgIH0sXG5cbiAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgIHBob25lOiBkYXRhLnBob25lLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIG1haWw6IGRhdGEuZW1haWwgfHwgdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5vcmRlckNhcnQob3JkZXIpO1xuXG4gIH1cblxuICBvcmRlckNhcnQoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvb3JkZXInLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzdWx0LmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlc3VsdC5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzdWx0LmNhcnQuY2FydElkO1xuICAgICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpfDkMKww5DCusOQwrDDkMK3IMORwoPDkMK/w5DCtcORwojDkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvScpXG4gICAgICAgICAgICAgKTsqL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr3DkMK4w5HCjyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgLy90aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIC8vbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK4w5HCgsORwowgw5DCt8OQwrDDkMK6w5DCsMOQwrcnKVxuICAgICAgICAgICAgLy8pXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoZGF0YSk6dm9pZCB7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICBpZiAocmVzLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UocmVzLm1lc3NhZ2UudHlwZSwgcmVzLm1lc3NhZ2UudGl0bGUsIHJlcy5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQoZXJyb3IuZXJyb3IuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLmVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IuZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IuZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICApOyovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIH1cblxuICBzZXRDYXJ0SWQoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG4gIH1cbiAgcmVtb3ZlQ2FydElkKCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OkV2ZW50TWVzc2FnZVtdKTp2b2lkIHtcbiAgICB0aGlzLm1vZGlmaXJlcy5uZXh0KG1vZGlmaXJlcyk7XG4gICAgaWYgKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWRkVG9DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDtcbiAgbW9kaWZpcmVzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5nZXRNb2RpZmlyZXMoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5tb2RpZmlyZXMgPSByZXMpO1xuXG4gIH1cblxuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBASW5wdXQoKSBhbW91bnREaXNoOmFueTtcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5hZGREaXNoVG9DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRCwgYW1vdW50KSB7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudCxcbiAgICAgIFwiY2FydElkXCI6IHVuZGVmaW5lZCxcbiAgICAgIFwibW9kaWZpZXJzXCI6IHRoaXMubW9kaWZpcmVzLFxuICAgICAgXCJjb21tZW50XCI6dGhpcy5jb21tZW50XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNhcnQuY2FydElkKSBkYXRhLmNhcnRJZCA9IHRoaXMuY2FydC5jYXJ0SWQ7XG5cbiAgICB0aGlzLmxvYWRpbmcuZW1pdCh0cnVlKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9DYXJ0JChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgXyA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZSA9PiB0aGlzLmVycm9yLmVtaXQoZSksXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcuZW1pdChmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbW91bnRDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQW1vdW50Q2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDpvYmplY3Q7XG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG5cbiAgICB0aGlzLmFtb3VudCA9ICcwJzsgXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNhcnQgPSByZXM7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gcmVzLmRpc2hlc0NvdW50IHx8IDA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlbGV0ZUZyb21DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZURpc2hGcm9tQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3JkZXJDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgb3JkZXJDYXJ0OmFueTtcbiAgY2FydDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMub3JkZXIodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1aXJlZEZpZWxkczpBcnJheTxzdHJpbmc+ID0gW1wibmFtZVwiLCBcInBob25lXCIsIFwic3RyZWV0XCIsIFwiaG91c2VcIl07XG4gIHByaXZhdGUgY2hlY2tlckZpZWxkczpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAudXNlckNhcnQoKVxuICAgICAgICAuc3Vic2NyaWJlKGNhcnQ9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VyRmllbGRzLm5leHQodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpO1xuICAgIH0sIDEwMCk7XG5cbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwiw5DCncOQwrXDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgfVxuXG5cbiAgY2hlY2tGb3JGaWVsZHMoZm9ybURpcmVjdGl2ZXM6QXJyYXk8YW55PiwgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbiB7XG5cbiAgICBsZXQgZmllbGRzQXJlQXZhaWxhYmxlOm9iamVjdCA9IHt9O1xuICAgIGxldCBub0ZpZWxkczpBcnJheTxzdHJpbmc+ID0gW107XG5cblxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmaWVsZHNBcmVBdmFpbGFibGVbZWxlbWVudC5uYW1lXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKCFmaWVsZHNBcmVBdmFpbGFibGUuaGFzT3duUHJvcGVydHkoZWxlbWVudCkpIHtcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub0ZpZWxkcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKjIMORwoTDkMK+w5HCgMOQwrzDkcKLIMOQwr7DkcKCw5HCgcORwoPDkcKCw5HCgcOQwrLDkcKDw5HCjsORwoIgw5HCgcOQwrvDkMK1w5DCtMORwoPDkcKOw5HCicOQwrjDkMK1IMOQwr7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCtSDDkMK0w5DCu8ORwo8gw5DCusOQwr7DkcKAw5HCgMOQwrXDkMK6w5HCgsOQwr3DkMK+w5DCuSDDkcKAw5DCsMOQwrHDkMK+w5HCgsORwosgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwr/DkMK+w5DCu8ORwo86XCIsIG5vRmllbGRzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBwYXltZW50O1xuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIlxuXG4gICAgICBpZiAoZGF0YVRvU2VuZC5jYXNoKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMKww5DCu8OQwrjDkcKHw5DCvcORwovDkMK8w5DCuCDDkMK6w5HCg8ORwoDDkcKMw5DCtcORwoDDkcKDXCI7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFUb1NlbmQuYmFua2NhcmQpIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCkcOQwrDDkMK9w5DCusOQwr7DkMKyw5HCgcOQwrrDkMK+w5DCuSDDkMK6w5DCsMORwoDDkcKCw5DCvsOQwrkgw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhVG9TZW5kKTtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICAvLyBUT0RPOiDDkcKCw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLIMOQwr3DkMKww5DCtMOQwr4gw5DCssORwovDkMK9w5DCtcORwoHDkcKCw5DCuCDDkMKyIMOQwr7DkcKCw5DCtMOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCuSDDkMK8w5DCvsOQwrTDkcKDw5DCu8ORwowuXG4gICAgICAgIFwiY29tbWVudFwiOiBcIlxcbiDDkMKiw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLOlwiICsgcGF5bWVudCArIFwiXFxuw5DCmsOQwr7DkMK8w5DCtcOQwr3DkcKCw5DCsMORwoDDkMK4w5DCuTpcIiArIGNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5vcmRlckNhcnQoZGF0YSkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcblxuICAgIH1cblxuXG4gIH1cblxuICBjaGVja1N0cmVldChkYXRhVG9TZW5kKSB7XG4gICAgY29uc29sZS5sb2coXCI+Pj4+XCIsZGF0YVRvU2VuZCk7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgICAgXCJjb21tZW50XCI6IGRhdGFUb1NlbmQuY29tbWVudCxcbiAgICAgICAgLy8gXCJkZWxpdmVyeVwiOiB7XG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxuICAgICAgICAgIFwiaG9tZVwiOiBkYXRhVG9TZW5kLmhvdXNlLFxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwiZG9vcnBob25lXCI6IGRhdGFUb1NlbmQuZG9vcnBob25lLFxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXG4gICAgICAgICAgXCJhcGFydG1lbnRcIjogZGF0YVRvU2VuZC5hcGFydG1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgICAgXCJwaG9uZVwiOiAnKycgKyBkYXRhVG9TZW5kLnBob25lLFxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLmNoZWNrU3RyZWV0KGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ1RvTnVtYmVyKHN0cjpudW1iZXIgfCBhbnkpOm51bWJlciB7XG4gICAgY29uc29sZS5sb2codHlwZW9mIHN0cik7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gK3N0cjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKfw5DCsMORwoDDkMKww5DCvMOQwrXDkcKCw5HCgCBob21lIMOQwrTDkMK+w5DCu8OQwrbDkMK1w5DCvSDDkMKxw5HCi8ORwoLDkcKMIMOQwrjDkMK7w5DCuCBzdHJpbmcgw5DCuMOQwrvDkMK4IG51bWJlclwiKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZXREaXNoQW1vdW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0QW1vdW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYWN0aW9uOmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2hhbmdlQW1vdW50KHRoaXMuYWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FydDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCArIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCLDkMKUw5DCuMORwoDDkMK1w5DCusORwoLDkMK4w5DCssOQwrAgU2V0RGlzaEFtb3VudCDDkMK/w5DCvsOQwrvDkcKDw5HCh8OQwrjDkMK7w5DCsCDDkMK7w5DCvsOQwrbDkMK9w5DCvsOQwrUgw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgYWN0aW9uXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpc2hDYWxjXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdlaWdodFRvdGFsO1xuICBhbW91bnREaXNoO1xuICBwcmljZTtcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xuICBzdGF0ZU1vZGlmaWVyczphbnkgPSB7fTtcbiAgdGVzdGNvdW50Q2FsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgXCJkaXNoLWNhbGN1bGF0b3JcIik7XG5cblxuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50O1xuXG4gICAgdGhpcy5hbW91bnREaXNoVG9BZGQuZW1pdCh0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnByaWNlLCBcImRpc2gtcHJpY2VcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyRGlzaCh0aGlzLmRpc2gpO1xuICAgICAgdGhpcy5yZW5kZXIodGhpcy5kaXNoLm1vZGlmaWVycyk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlbmRlckRpc2goZGlzaDphbnkpIHtcbiAgICAvKlxuICAgICA8ZGl2IGNsYXNzPVwibWFpbi1pdGVtXCI+XG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5cbiAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tkaXNoLm5hbWV9fTwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlcIj5cbiAgICAgPCEtLSBpbmNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgtMSlcIj4mIzg3MjI7PC9hPlxuICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIiA+e3thbW91bnREaXNofX08L3NwYW4+XG4gICAgIDwhLS0gZGVjcmVhc2UgYnV0dG9uLS0+XG4gICAgIDxhIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUFtb3VudGRpc2goMSlcIj4mI3gyYjs8L2E+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwid2VpZ2h0LXByaWNlXCI+XG4gICAgIHt7ZGlzaC5wcmljZSphbW91bnREaXNofX0mbmJzcDsmI3gyMGJkO1xuICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+XG5cblxuICAgICAqL1xuICAgIGxldCBtYWluSXRlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1haW5JdGVtLCBcImRpc2gtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBtYWluSXRlbSk7XG5cbiAgICBsZXQgaXRlbU5hbWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJuYW1lXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1OYW1lKTtcblxuICAgIGxldCB0aXRsZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRpdGxlLCBcInRpdGxlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGl0bGUsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5uYW1lKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lLCB0aXRsZSk7XG5cbiAgICBsZXQgd2VpZ2h0RGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJkaXNoXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodERpc2hXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHREaXNoVmFsdWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwidmFsdWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHdlaWdodERpc2hWYWx1ZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAodGhpcy5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDDkMKzLlwiXG4gICAgKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHREaXNoV3JhcHBlciwgd2VpZ2h0RGlzaFZhbHVlKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLnByaWNlKTtcbiAgICBsZXQgcHJpY2VEaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VEaXNoV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VEaXNoV3JhcHBlcik7XG5cbiAgICBsZXQgaXRlbVF1YW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbVF1YW50LCBcInF1YW50aXR5XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1RdWFudCk7XG5cbiAgICBsZXQgYWRkQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcIm1pbnVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYWRkQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYWRkQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKC0xKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBhZGRCdXR0b24pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY291bnRlciwgXCJxdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGNvdW50ZXIpO1xuXG4gICAgbGV0IG1pbnVzQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1pbnVzQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicGx1c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG1pbnVzQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihtaW51c0J1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgxKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHRoaXMucHJpY2UsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpXG4gICAgICApO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBtaW51c0J1dHRvbik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0VG90YWxXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInZhbHVlXCIpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbCkgLy8gVE9ETzogdG90YWwgV2VpZ2h0XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHRUb3RhbFdyYXBwZXIsIHdlaWdodFRvdGFsKTtcbiAgICB0aGlzLndlaWdodFRvdGFsID0gd2VpZ2h0VG90YWw7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB0aGlzLnByaWNlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZShkaXNoLnByaWNlKVxuICAgICk7IC8vIFRPRE86IMOQwr/DkcKAw5DCsMOQwrLDkMK4w5DCu8ORwozDkMK9w5DCviDDkcKBw5HCh8OQwrjDkcKCw5DCsMORwoLDkcKMIMORwobDkMK1w5DCvcORwoNcbiAgICBsZXQgcHJpY2VUb3RhbFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJwcmljZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VUb3RhbFdyYXBwZXIsIHRoaXMucHJpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlVG90YWxXcmFwcGVyKTtcbiAgfVxuXG4gIGdlbmVyYXRlUHJpY2UocHJpY2VEaXNoLCBhbW91bnQ/LCBtb2RpZmlyZXNQcmljZT8pIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGlmaWVycylcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXBzID0+IHtcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kWzBdLmdyb3VwSWQgPSBncm91cHMuZ3JvdXAuaWQ7XG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgbGV0IG1vZFN1bTpudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgIG1vZFN1bSA9IG1vZFN1bSArIGVsZW1lbnQuZGlzaC5wcmljZSAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgIH0pO1xuICAgIG1vZFN1bSA9IG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaDtcbiAgICByZXR1cm4gKFxuICAgICAgcHJpY2VEaXNoICogdGhpcy5hbW91bnREaXNoICsgbW9kU3VtICsgJzxkaXYgY2xhc3M9XCJjdXJyZW5jeVwiPiZuYnNwOyYjeDIwYmQ7PC9kaXY+J1xuICAgICk7XG4gIH1cblxuICBnZW5lcmF0ZVRvdGFsV2VpZ2h0KCkge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLndlaWdodCAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSAqIDEwMDBcbiAgICB9KTtcbiAgICBtb2RTdW0gPSBwYXJzZUZsb2F0KChtb2RTdW0gKiB0aGlzLmFtb3VudERpc2gpLnRvRml4ZWQoMikpO1xuICAgIGNvbnNvbGUubG9nKG1vZFN1bSwgdGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpXG4gICAgY29uc29sZS5sb2codGhpcy5kaXNoLndlaWdodCwgdGhpcy5hbW91bnREaXNoKVxuICAgIGxldCB3ZWlnaHQgPSAodGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpICsgbW9kU3VtO1xuXG4gICAgcmV0dXJuICh3ZWlnaHQpLnRvRml4ZWQoMCkgKyBcIiDDkMKzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xuICB9XG5cbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0b3RhbFdlaWd0aERpdiwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVRvdGFsV2VpZ2h0KCkpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50ZGlzaCh2YWx1ZSkge1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPD0gMCkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTtcblxuICAgIH1cbiAgICBpZiAodGhpcy5hbW91bnREaXNoID49IDE5OSkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xuXG4gICAgfVxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCLDkMKaIMORwo3DkcKCw5DCvsOQwrzDkcKDIMOQwrHDkMK7w5HCjsOQwrTDkcKDIMOQwrzDkMK+w5DCtsOQwr3DkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMOlwiXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG5cbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuXG4gICAgICBpZiAoZWxlbWVudEdyb3VwLmRpc2gpIHtcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcIsOQwp7DkMK0w5DCvcOQwr7DkcKHw5DCvcORwovDkMK1IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5HCiyDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK0w5DCtcORwoDDkMK2w5DCuMOQwrLDkMKww5HCjsORwoLDkcKBw5HCj1wiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlbGVtZW50R3JvdXBcIixlbGVtZW50R3JvdXApO1xuICAgICAgICAvL1RPRE86IGFkZCBzaW5nbGUgbW9kaWZpY2F0b3IgbG9naWNcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXG4gICAgICAgICAgZWxlbWVudEdyb3VwLmdyb3VwID8gZWxlbWVudEdyb3VwLmdyb3VwLm5hbWUgOiBcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsFwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG4gICAgICAgIGxldCBtb2RBcnIgPSBlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnM7XG4gICAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGxldCBtb2RpZmlyZURpdiA9IHRoaXMubW9kaWZpcmVEaXYoZWxlbWVudCwgZWxlbWVudEdyb3VwLm1vZGlmaWVySWQpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZ3JvdXBEaXYsIG1vZGlmaXJlRGl2KTtcbiAgICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCI8cD4qIMOiwoDClCDDkMKaw5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCu8OQwrXDkMK9w5HCi8ORwoUgw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCscOQwrvDkcKOw5DCtMOQwrAgw5DCv8ORwoDDkMK4w5DCvMOQwrXDkMK9w5HCj8OQwrXDkcKCw5HCgcORwo8gw5DCtMOQwrvDkcKPIMOQwrrDkMKww5DCtsOQwrTDkMK+w5DCuSDDkMK/w5DCvsORwoDDkcKGw5DCuMOQwrg8L3A+XCJcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIGdyb3VwRGl2KG5hbWVHb3J1cCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiZ3JvdXAtbW9kaWZpcmVzLXdyYXBlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdiwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFwiXCIgKyBuYW1lR29ydXApKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgbW9kaWZpcmVEaXYoZWxlbWVudCwgZ3JvdXBJZCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiYWRkaXRpb25hbC1pdGVtXCIpO1xuICAgIHRoaXMucmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgZGl2LCBncm91cElkKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgcmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcblxuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUnLCBlbGVtZW50KTtcbiAgICBjb25zb2xlLmluZm8oJ3JlbmRlck9uZU1vZGlmaXJlIHNlbGVjdGVkTW9kaWZpZXJzJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwp3DkMKww5DCt8OQwrLDkMKww5DCvcOQwrjDkcKPIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIGxldCBpdGVtTmFtZURpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lRGl2LCBcIml0ZW0tbmFtZVwiKTtcblxuICAgIGxldCBsYWJlbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIFxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGxhYmVsLCBcImZvclwiLCBlbGVtZW50Lm1vZGlmaWVySWQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWVEaXYsIGxhYmVsKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGxhYmVsLCBcImlubmVySFRNTFwiLCBlbGVtZW50LmRpc2gubmFtZSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtTmFtZURpdik7XG5cbiAgICBsZXQgd2VpZ3RoTW9kaWZpcmVXcmFwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwibGVmdC13ZWlnaHQtbW9kaWZpcmUtd3JhcGVyXCIpO1xuICAgIGxldCB3ZWlnaHRNb2RpZmlyZUxlZnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnemVybycpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodE1vZGlmaXJlTGVmdCwgJ2lubmVySFRNTCcsIChlbGVtZW50LmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiIMOQwrMuXCIgKyAnJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZUxlZnQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkMK4w5DCt8OQwrzDkMK4w5DCvcOQwrXDkMK9w5DCuMORwo8gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbVF1YW50aXR5ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8qIFRPRE86IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrjDkcKCw5HCjDpcbiAgICAgw5DCtMOQwrAgMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEgXG4gICAgIMOQwrTDkMKwIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgIMOQwrTDkMKwIDAsMSBbZD09PTFdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG5cbiAgICAgw5DCtMOQwrAgMCxuW2Q9MF0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gMCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgw5DCtMOQwrAgMCxuW2Q+MDxuXSAtIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiBkLCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cblxuXG5cbiAgICAgayxuIFtrPG4sZD0wXSAtIGsgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgayDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstICjDkcKHw5DCsMORwoHDkcKCw5DCvcORwovDkMK5IMORwoHDkMK7w5HCg8ORwofDkMKww5DCuSDDkMK6w5DCvsOQwrPDkMK0w5DCsCBkPTApXG4gICAgIGssbiBbazxuLDA8ZD08bl0tIGQgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgMSDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGRlZmF1bHRBbW91bnQ6MFxuICAgICBoaWRlSWZEZWZhdWx0QW1vdW50OmZhbHNlIC8vw5DCn8ORwoDDkMK4w5DCt8OQwr3DkMKww5DCuiDDkcKCw5DCvsOQwrPDkMK+LCDDkcKHw5HCgsOQwr4gw5DCvcOQwrUgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrDDkcKCw5HCjCDDkcKBw5DCv8OQwrjDkcKBw5DCvsOQwrogw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiwgw5DCtcORwoHDkMK7w5DCuCDDkMK4w5HChSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMORwoDDkMKww5DCssOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssORwoNcbiAgICAgbWF4QW1vdW50OjBcbiAgICAgbWluQW1vdW50OjBcblxuICAgICAqL1xuXG4gICAgbGV0IG1pbiA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICBsZXQgZGVmID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMOQwrLDkcKLw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrkgw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGZhbHNlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMDogLy8gMCwxIFswXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCB0cnVlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbWluID09PSAxICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwrTDkMKww5DCtcORwoLDkcKBw5HCjyDDkMK9w5DCsMORwoHDkcKCw5HCgMOQwr7DkMK5w5DCusOQwrU6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuICAgICAgICB0aGlzLnJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwIMORwoDDkMK1w5DCvcOQwrTDkMK1w5HCgMOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwLCDDkMK0w5DCu8ORwo8gw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrk6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubWF4QW1vdW50ID4gMCAmJiBlbGVtZW50Lm1pbkFtb3VudCA+IDApIHtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwrHDkMK7w5DCvsOQwrrDkMKwIMORwoHDkcKCw5DCvsOQwrjDkMK8w5DCvsORwoHDkcKCw5DCuCDDkMK4IMOQwrLDkMK1w5HCgcOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgLy8gbGV0IHdlaWdodFByaWNlRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFByaWNlRGl2LCAnbW9kYWwtcHJpY2UnKTtcbiAgICAvLyBsZXQgd2VpZ2h0O1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC53ZWlnaHQ+MCl7XG4gICAgLy8gICB3ZWlnaHQgPSAgZWxlbWVudC5kaXNoLndlaWdodCArIFwiIMOQwrMgXCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcbiAgICAvLyBsZXQgcHJpY2U7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLnByaWNlPjApe1xuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCB3ZWlnaHRBbmRQcmljZUhUTUwgPSAod2VpZ2h0fHwnJykrKHdlaWdodCYmcHJpY2U/IHNsYXNoIDogJycpKyggcHJpY2UgfHwgJycpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWdodFByaWNlRGl2KTtcblxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwicmlnaHQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVSaWdodCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnaW5uZXJIVE1MJywgKGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIgw5DCsy5cIiArICc8ZGl2IGNsYXNzPVwic2VwYXJhdG9yXCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG5cbiAgICBsZXQgcHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJpdGVtLXByaWNlXCIpO1xuXG4gICAgbGV0IHByaWNlVmFsdWU7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC5wcmljZSA+IDApIHtcbiAgICAgIHByaWNlVmFsdWUgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIjxkaXYgY2xhc3MgPSAnY3VycmVuY3knPiZuYnNwOyYjeDIwYmQ7PC9kaXY+XCI7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHByaWNlLCBcImlubmVySFRNTFwiLCBwcmljZVZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJ6ZXJvLXByaWNlXCIpO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG5cbiAgfVxuXG4gIHJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGlzQWN0aXZlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBsZXQgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwiaWRcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAxO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMDtcblxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0LCBcIm1vZGFsLWNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBpbnB1dCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICBpZiAodGhpcy5pZFJhZGlvQm94KGdyb3VwSWQpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2tleV0gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCAgIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncm91cERpdkJsb2NrID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcImlucHV0XCJcbiAgICAgICAgKTtcblxuICAgICAgICBncm91cERpdkJsb2NrLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuaWQgIT0gZS50YXJnZXQuaWQpIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IDE7XG5cbiAgICAgIH1cblxuXG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG5cbiAgfVxuXG4gIHJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpIHtcblxuICAgIGxldCBzdGFydEFtb3VudDtcbiAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50ID4gMCkge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5taW5BbW91bnQ7XG5cbiAgICB9XG4gICAgaWYgKHN0YXJ0QW1vdW50ID4gMCkge1xuXG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IGFNaW51c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWludXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFNaW51c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhTWludXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFNaW51c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgLSAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdIDwgZWxlbWVudC5taW5BbW91bnRcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPT09IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzcGFuLCBcIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHN0YXJ0QW1vdW50O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICBzcGFuLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBzcGFuKTtcblxuICAgIGxldCBhUGx1c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGx1c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYVBsdXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhUGx1c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUGx1c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlICsgMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+XG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICYmXG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICE9IDBcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWF4QW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID4gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRNb2RpZmlyZXMoKSB7XG4gICAgbGV0IG1vZGlmaWVyc1RvU2VsZWN0ID0gW107XG5cbiAgICAvKmlmKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMubGVuZ3RoICYmICEoT2JqZWN0LnZhbHVlcyh0aGlzLnN0YXRlTW9kaWZpZXJzKSkubGVuZ3RoKSB7XG4gICAgICBtb2RpZmllcnNUb1NlbGVjdCA9IHRoaXMuc2VsZWN0ZWRNb2RpZmllcnM7XG4gICAgfSovXG5cbiAgICBsZXQgbW9kaWZpcmVzID0gW107XG5cbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBtb2RpZmllcnNUb1NlbGVjdCcsIG1vZGlmaWVyc1RvU2VsZWN0KTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcblxuICAgIGZvciAobGV0IGdyb3VwSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVycykge1xuICAgICAgZm9yIChsZXQgbW9kaWZpcmVJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW21vZGlmaXJlSWRdIHx8IG1vZGlmaWVyc1RvU2VsZWN0LmZpbmQoaXRlbSA9PiBpdGVtLm1vZGlmaWVySWQgPT0gbW9kaWZpcmVJZCkpIHtcbiAgICAgICAgICBtb2RpZmlyZXMucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpcmVJZCxcbiAgICAgICAgICAgIGFtb3VudDogdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0sXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyA9IG1vZGlmaXJlcztcblxuICAgIGlmICh0aGlzLmRpc2gubW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBtZXNzYWdlID0gW107XG5cbiAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGlmIChncm91cC5yZXF1aXJlZCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RpZiA9IFtdO1xuICAgICAgICAgICAgbGV0IGxvY2FsTW9kaWYgPSB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdOyAvLy5maWx0ZXIoZWxlbWVudD0+ZWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZCBpbiBsb2NhbE1vZGlmKSB7XG4gICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZlttb2RdKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZE1vZGlmLnB1c2gobG9jYWxNb2RpZlttb2RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1vZGlmLmxlbmd0aCA8IGdyb3VwLm1pbkFtb3VudCkge1xuICAgICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOQwpLDkMK9w5DCuMOQwrzDkMKww5DCvcOQwrjDkMK1XCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICBncm91cC5ncm91cC5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgIH1cblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGFmdGVyJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgfVxuXG4gIC8qIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkcKBw5DCvsOQwr7DkcKCw5DCssOQwrXDkcKBw5HCgsOQwrLDkMK1w5HCgiDDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyw5DCsSDDkMK1w5HCgcOQwrvDkMK4IDEgw5HCgsOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5HCg8OQwrXDkcKCIMOQwr/DkMK+w5DCssOQwrXDkMK0w5DCtcOQwr3DkMK4w5DCtSDDkcKAw5DCsMOQwrTDkMK4w5DCvsOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCxcbiAgIMOQwrXDkcKBw5DCu8OQwrggw5DCvMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCscOQwr7DkMK7w5HCjMORwojDkMK1IDEgw5HCgsOQwr4gw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK0w5DCtcOQwrvDkMKww5DCtcORwoIgw5DCssORwovDkMKxw5DCvsORwoAgw5DCssORwoHDkMK1w5HChSDDkMK+w5HCgcORwoLDkMKww5DCu8ORwozDkMK9w5HCi8ORwoUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiDDkMK9w5DCtSDDkMKyw5DCvsOQwrfDkMK8w5DCvsOQwrbDkMK9w5HCi8OQwrwsIMOQwrPDkMK1w5DCvcOQwrXDkcKAw5DCuMORwoDDkcKDw5DCtcORwoIgw5DCv8ORwoDDkMK1w5DCtMORwoPDkMK/w5HCgMOQwrXDkMK2w5DCtMOQwrXDkMK9w5DCuMOQwrUqL1xuXG4gIGlkUmFkaW9Cb3goZ3JvdXBJZCk6Ym9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRHcm91cCA9IHRoaXMuZGlzaC5tb2RpZmllcnMuZmluZCh4ID0+IHgubW9kaWZpZXJJZCA9PT0gZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cC5taW5BbW91bnQgPT09IDEgJiYgY3VycmVudEdyb3VwLm1heEFtb3VudCA9PT0gMTtcbiAgfVxuXG4gIC8vIMOQwp/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkMK8w5DCuMOQwr3DkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMK6w5DCvsORwoLDkMK+w5HCgMORwovDkMK1IMOQwrHDkcKLw5DCu8OQwrggw5DCssORwovDkMKxw5HCgMOQwrDDkMK9w5HCi1xuICBjaGVja01pbkFtb3VudE1vZGlmaXJlcyhncm91cElkLCBtb2RpZmlyZSkge1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL3RoaXMuZGlzaC5tb2RpZmllcnMgPVtdO1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBkZWJvdW5jZVRpbWUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBkZWxpdmVyeTogYW55O1xuICBASW5wdXQoKSBsb2NhdGlvbklkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6IHN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xuICBASW5wdXQoKSBwYXltZW50TWV0aG9kSWQ6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uc0NvdW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBkYXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5vdGlmeU1ldGhvZElkOiBzdHJpbmc7XG4gIFxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBpc0NoZWNraW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cbiAgY2FydDogYW55O1xuICBsYXN0Rm9ybUNoYW5nZUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZVxuICApIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XG4gICAgICAgICAgaWYodGhpcy5sb2NhdGlvbklkIHx8ICh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUgfHwgdGhpcy5kZWxpdmVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgLypmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnksXG4gICAgICAgICAgICA4OiB0aGlzLnBheW1lbnRNZXRob2RJZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCovXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLmxvY2F0aW9uSWQgJiYgISgodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lKSAmJiAhdGhpcy5kZWxpdmVyeSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfDkMKdw5HCg8OQwrbDkMK9w5DCviDDkcKDw5DCusOQwrDDkMK3w5DCsMORwoLDkcKMIMOQwrDDkMK0w5HCgMOQwrXDkcKBJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50LFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogK3RoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5kYXRlKSB7XG4gICAgICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5vdGlmeU1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIH1cblxuICAgIGRhdGFbXCJzZWxmRGVsaXZlcnlcIl0gPSB0aGlzLmRlbGl2ZXJ5O1xuXG5cbiAgICBpZih0aGlzLmJvbnVzZXMpIHtcbiAgICAgIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxuICAgICAgICAgIGFtb3VudDogYi5hbW91bnRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhcnRJZCA9IHRoaXMuY2FydC5pZDtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgIGlmKHJlc3VsdC5hY3Rpb24gJiYgcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3QpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzcy5lbWl0KGNhcnRJZClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2UubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KCkge1xuXG4gICAgLy9pZih0aGlzLnN0cmVldElkID09ICcwJykgcmV0dXJuO1xuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50LFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5waG9uZSA/IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpIDogbnVsbCxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWUgfHwgbnVsbFxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5kYXRlKSB7XG4gICAgICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5vdGlmeU1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0NoZWNraW5nLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmNoZWNrU3RyZWV0VjIoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICByZXN1bHQgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSlcbiAgICAgICk7XG4gIH1cblxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIGlmKCFwaG9uZSkgcmV0dXJuICcnO1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hDb21tZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBjb21tZW50OmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLnNldENvbW1lbnQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7IH1cblxuICBzZXRDb21tZW50KCl7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ29tbWVudCh0aGlzLmRpc2guaWQsdGhpcy5jb21tZW50KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PnRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgZXJyPT50aGlzLmVycm9yLmVtaXQoZXJyKVxuICAgIClcbiAgICBcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZVwiO1xuXG5pbXBvcnQge1xuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGlzaC1jYWxjJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctY2FydC1kaXNoLWNhbGNcIiAqbmdJZj1cImRpc2hcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGlzaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1ib3hcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWRlc2NyaXB0aW9uLWJveFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW5ncmVkaWVudHNcIj57eyBkaXNoLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGlmaWVycy5jdXN0b20uZml4ZWQ7IGVsc2UgbW9kaWZpZXJGaXhlZFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiIFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJGaXhlZFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmN1c3RvbS5maXhlZCBhcyBtb2RpZmllclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWZpeGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiAhIW1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KGNoaWxkTW9kaWZpZXIsIDEsICdjaGVja2JveCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZE1vZGlmaWVyLmRpc2g/Lm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2UgfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyc1wiICpuZ0lmPVwibW9kaWZpZXJzLmJhc2VMaXN0Py5sZW5ndGhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItaGVhZGVyXCIgKm5nSWY9XCJtb2RpZmllci5ncm91cCBhcyBncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItYm94XCIgW25nQ2xhc3NdPVwieyd3aXRob3V0LWltYWdlcyc6ICFtb2RpZmllci5jaGlsZEltYWdlc0lzc2V0fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTaW5nbGUgbW9kaWZpZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiAnc2luZ2xlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IG1vZGlmaWVyLm1pbkFtb3VudCB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBtb2RpZmllci5tYXhBbW91bnQgfHwgMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWNoaWxkcmVuXCIgW25nQ2xhc3NdPVwieyd3aXRob3V0LWltYWdlcyc6ICFtb2RpZmllci5pbWFnZXNJc3NldH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEdyb3VwIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IGNoaWxkTW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogbW9kaWZpZXIubW9kaWZpZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdLnRvdGFsQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogbW9kaWZpZXIubWF4QW1vdW50IHx8IDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPsOQwpjDkMKiw5DCnsOQwpPDkMKeOjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPlxuICAgICAgICAgICAgPHNwYW4+e3sgdG90YWxQcmljZX19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuPC9kaXY+XG5cblxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNkaXNoSW1hZ2VUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNkaXNoSW1hZ2VUZW1wbGF0ZSBsZXQtZGlzaD1cImRpc2hcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzaD8uaW1hZ2VzICYmIGRpc2guaW1hZ2VzWzBdPy5pbWFnZXM/LnNtYWxsOyBlbHNlIGltZ1BsYWNlaG9sZGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWltYWdlXCIgW3N0eWxlLmJhY2tncm91bmRJbWFnZV09XCIndXJsKCcgKyBpbWFnZVVybCArIGRpc2guaW1hZ2VzWzBdLmltYWdlcy5zbWFsbCArICcpJ1wiPjwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjaW1nUGxhY2Vob2xkZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWltYWdlLXBsYWNlaG9sZGVyXCI+PC9kaXY+XG4gICAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyVGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJUZW1wbGF0ZVxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWF4QW1vdW50PVwiZ3JvdXBNYXhBbW91bnRcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1pbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC13ZWlnaHRcIj57eyBkaXNoLndlaWdodCAqIDEwMDAgfX0gw5DCs8ORwoA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWFjdGlvbi1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxOyBlbHNlIGNvdW50ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDaGVja2JveFRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjb3VudGVyVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNvdW50ZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IGdyb3VwQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZVxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWF4QW1vdW50PVwiZ3JvdXBNYXhBbW91bnRcIj5cbiAgICA8bmctY29udGFpbmVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY291bnRlclwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCAmJiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtaW51c1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCB8fCBncm91cEFtb3VudCA8PSBncm91cE1pbkFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCAtIDEsICdtaW51cycpXCJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4tPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgW3ZhbHVlXT1cImFtb3VudFwiIHJlYWRvbmx5ICNpbnB1dD5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCArIDEsICdwbHVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPis8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1vZGlmaWVyLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGFtb3VudH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ID8gMCA6IDEsICdjaGVja2JveCcpXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kaXNoe2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOnN0YXJ0O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7cGFkZGluZy1ib3R0b206MzRweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5kaXNoIC5kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyNTBweDtoZWlnaHQ6MTcwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtiYWNrZ3JvdW5kLXNpemU6NTAlfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveHttYXJnaW4tbGVmdDozNHB4O2hlaWdodDoxNzBweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LXdlYmtpdC1ib3gtYWxpZ246c3RyZXRjaDthbGlnbi1pdGVtczpzdHJldGNoO3BhZGRpbmc6NXB4IDAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyOHB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Y29sb3I6IzBhMDkwOX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtaW5ncmVkaWVudHN7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojMDAwO21hcmdpbi10b3A6MTVweDtvdmVyZmxvdzpoaWRkZW47LXdlYmtpdC1ib3gtZmxleDoxO2ZsZXgtZ3JvdzoxfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1wcmljZS1ib3h7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjQ1cHg7bWFyZ2luLXJpZ2h0OjQ5cHh9LmRpc2gtaW1hZ2V7d2lkdGg6MjUwcHg7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czowO2JhY2tncm91bmQtc2l6ZTpjb3ZlcjtiYWNrZ3JvdW5kLXBvc2l0aW9uOnRvcDtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXR9LnJlc3VsdHttYXJnaW4tdG9wOjQ5cHg7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyNHB4O2xpbmUtaGVpZ2h0OjI4cHg7Y29sb3I6IzBhMDkwOTt0ZXh0LWFsaWduOnJpZ2h0fS5yZXN1bHQgLnByaWNle21hcmdpbi1sZWZ0Ojc2cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZ3JvdXB7bWFyZ2luLXRvcDoyNXB4O3BhZGRpbmctYm90dG9tOjI1cHg7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5Nn0ubW9kaWZpZXJzIC5tb2RpZmllci1oZWFkZXJ7bWFyZ2luLWJvdHRvbToyNXB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlciAubW9kaWZpZXItbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlciAubW9kaWZpZXItZGVzY3JpcHRpb257Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2h7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MnB4O2hlaWdodDoxMDBweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1pbWFnZS1ib3h7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7YmFja2dyb3VuZC1zaXplOjUwJTttYXJnaW4tcmlnaHQ6MjhweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveHstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjE7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1uOy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3ggLm1vZGlmaWVyLWRpc2gtbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94IC5tb2RpZmllci1kaXNoLXdlaWdodHtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXRvcDoxMHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94e2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXJpZ2h0OjEwNXB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94IC56ZXJvLXByaWNle2Rpc3BsYXk6bm9uZX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWFjdGlvbi1ib3h7d2lkdGg6MTUxcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubW9kaWZpZXItZml4ZWR7Ym9yZGVyOjJweCBzb2xpZCAjNzY3Njc2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246c3RyZXRjaDthbGlnbi1pdGVtczpzdHJldGNoO2hlaWdodDo0NXB4fS5tb2RpZmllci1maXhlZCAuaXRlbXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDt3aWR0aDoxNDJweDtoZWlnaHQ6NDVweDtjb2xvcjojNzY3Njc2O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmZpcnN0LWNoaWxke21hcmdpbi1sZWZ0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtLnNlbGVjdGVke2JhY2tncm91bmQ6IzBhMDkwOTtib3JkZXItcmFkaXVzOjE1cHg7Y29sb3I6I2ZmZn0ubW9kaWZpZXItZml4ZWQgLml0ZW06bm90KC5zZWxlY3RlZCl7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94e3dpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZDojZTBlMGUwO2JvcmRlci1yYWRpdXM6MTVweDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94LnNlbGVjdGVkOmFmdGVye2NvbnRlbnQ6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sOyBiYXNlNjQsIFBITjJaeUIzYVdSMGFEMGlNamdpSUdobGFXZG9kRDBpTWpnaUlIWnBaWGRDYjNnOUlqQWdNQ0F5T0NBeU9DSWdabWxzYkQwaWJtOXVaU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLUEhCaGRHZ2daRDBpVFRJZ01UTXVOVXd4TVM0ek1qTXhJREkyVERJMklESWlJSE4wY205clpUMGlZbXhoWTJzaUlITjBjbTlyWlMxM2FXUjBhRDBpTXk0MUlpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlMejRLUEM5emRtYytDZz09XCIpfS5tb2RpZmllci1jb3VudGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyOm5vbmU7d2lkdGg6MTUxcHg7aGVpZ2h0OjUwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQ6I2UwZTBlMH0ubW9kaWZpZXItY291bnRlci5kaXNhYmxlZHtvcGFjaXR5Oi4zfS5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5taW51cy5kaXNhYmxlZCwubW9kaWZpZXItY291bnRlcjpub3QoLmRpc2FibGVkKSAucGx1cy5kaXNhYmxlZHtvcGFjaXR5Oi4xNTtjdXJzb3I6ZGVmYXVsdH0ubW9kaWZpZXItY291bnRlciBpbnB1dHtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOjAgMDt3aWR0aDoxMDAlO3BhZGRpbmc6MDtoZWlnaHQ6NTBweDtsaW5lLWhlaWdodDo1MHB4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MThweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cywubW9kaWZpZXItY291bnRlciAucGx1c3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDk7cGFkZGluZzowIDMwcHg7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmhvdmVyLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmhvdmVye2NvbG9yOiMwMDB9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmFjdGl2ZSwubW9kaWZpZXItY291bnRlciAucGx1czphY3RpdmV7Y29sb3I6I2NjMDAwOX0ubW9kaWZpZXItY291bnRlciAubWludXMubG9hZGluZywubW9kaWZpZXItY291bnRlciAucGx1cy5sb2FkaW5ne29wYWNpdHk6LjJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVze2xlZnQ6MH0ubW9kaWZpZXItY291bnRlciAucGx1c3tyaWdodDowfS53aXRob3V0LWltYWdlcyAubW9kaWZpZXItZGlzaC1pbWFnZS1ib3h7aGVpZ2h0OjcwcHghaW1wb3J0YW50fS53aXRob3V0LWltYWdlcyAubW9kaWZpZXItZGlzaHtoZWlnaHQ6NzBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1vZGlmaWVycyA9IHtcbiAgICBpbmRleEJ5SWQ6IHt9LFxuICAgIGN1c3RvbToge1xuICAgICAgZml4ZWQ6IG51bGxcbiAgICB9LFxuICAgIGJhc2VMaXN0OiBbXSxcbiAgfTtcblxuICB0b3RhbFByaWNlOiBudW1iZXI7XG4gIG1vZGlmaWVyc1ZhbHVlVHJlZTogYW55ID0ge307XG4gIGltYWdlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSxcbiAgICBASW5qZWN0KCdJbWFnZVVybCcpIGltYWdlVXJsOnN0cmluZ1xuICApIHtcbiAgICB0aGlzLmltYWdlVXJsID0gaW1hZ2VVcmw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5tb2RpZmllcnMgPSB7XG4gICAgICBpbmRleEJ5SWQ6IHt9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGZpeGVkOiBudWxsXG4gICAgICB9LFxuICAgICAgYmFzZUxpc3Q6IFtdLFxuICAgIH07XG5cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSA9IHt9O1xuICAgIGlmKHRoaXMuZGlzaCAmJiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVyIG9mIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcbiAgICAgICAgbGV0IG1vZGlmaWVyVHlwZSA9IG51bGw7XG4gICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyO1xuICAgICAgICAvLyBDaGVjayBDdXN0b20gbW9kaWZpZXJzIChsaWtlIFBpenphIFNpemUpXG4gICAgICAgIGlmKCF0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWRcbiAgICAgICAgICAmJiAhdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGggPT0gMlxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSBtb2RpZmllci5tYXhBbW91bnRcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgUGl6emEgU2l6ZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdjdXN0b20nO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZCA9IG1vZGlmaWVyO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnQ3VzdG9tIEZpeGVkIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfSBlbHNlIGlmKG1vZGlmaWVyLmdyb3VwXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGhcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5maW5kKG0gPT4gbS5kaXNoKSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgQmFzZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdncm91cCc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdHcm91cCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYnJva2VuIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0gPSBjaGlsZE1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChtb2RpZmllci5tb2RpZmllcklkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgICAgICBpZighdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddKXtcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgaW1hZ2VzIGFuZCBzZXQgZmxhZ3MgKGltYWdlc0lzc2V0LCBjaGlsZEltYWdlc0lzc2V0KVxuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllci5tb2RpZmllcklkKTtcblxuICAgICAgfVxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxuICAgICAgLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyBiKTtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xuICB9XG5cbiAgY2hlY2tJbWFnZXNJbk1vZGlmaWVyKG1vZGlmaWVySWQpIHtcbiAgICBjb25zdCBtOiBhbnkgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmltYWdlc0lzc2V0ID0gbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGg7XG5cbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF0uY2hpbGRJbWFnZXNJc3NldCA9ICEhT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVySWRdKVxuICAgICAgLmZpbmQoKG06IGFueSkgPT4gbSAmJiBtLmRpc2ggJiYgbS5kaXNoLmltYWdlcyAmJiBtLmRpc2guaW1hZ2VzLmxlbmd0aCk7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFByaWNlKCkge1xuICAgIGxldCB0b3RhbFByaWNlID0gdGhpcy5kaXNoLnByaWNlIHx8IDA7XG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG4gICAgICAgIGlmKGFtb3VudCkge1xuICAgICAgICAgIGNvbnN0IG1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xuICAgICAgICAgIGlmKG1vZGlmaWVyICYmIG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5wcmljZSkge1xuICAgICAgICAgICAgdG90YWxQcmljZSArPSBtb2RpZmllci5kaXNoLnByaWNlICogYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRvdGFsUHJpY2UgPSB0b3RhbFByaWNlO1xuICAgIHRoaXMuc2V0TW9kaWZpZXJzKCk7XG4gIH1cblxuICBnZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JvdXBJZDogKG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5ncm91cElkKSA/IG1vZGlmaWVyLmRpc2guZ3JvdXBJZCA6IHVuZGVmaW5lZCxcbiAgICAgIG1vZGlmaWVySWQ6IG1vZGlmaWVyLm1vZGlmaWVySWRcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllcjogYW55LCBhbW91bnQ6IG51bWJlciwgb3BlcmF0aW9uOiBzdHJpbmcpIHtcbiAgICBpZihhbW91bnQgPCAwKSByZXR1cm47XG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcbiAgICBjb25zdCB7IG1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQgPSAwLFxuICAgICAgICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG5cbiAgICAvLyBGb3IgY2hlY2tib3hcbiAgICBpZihvcGVyYXRpb24gPT0gJ2NoZWNrYm94JyAmJiBncm91cElkICE9PSAnc2luZ2xlJykge1xuICAgICAgLy8gSWYgaXQgd29yayBsaWtlIHJhZGlvIGJ1dHRvblxuICAgICAgaWYoZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxKSB7XG4gICAgICAgIGlmKGFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB6ZXJvIGFtb3VudCBmb3IgYWxsIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBpdGVtTW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW2l0ZW1Nb2RpZmllcklkXSA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdCBhY3Rpb24gbmVlZGVkIGFmdGVyXG4gICAgICBpZihhbW91bnQgPT0gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIEdyb3VwIGFtb3VudCBsaW1pdHNcbiAgICBpZihncm91cE1pbkFtb3VudCB8fCBncm91cE1heEFtb3VudCkge1xuICAgICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XG5cbiAgICAgIGlmKGdyb3VwQW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWluICR7Z3JvdXBNaW5BbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAnw5DCnsOQwrPDkcKAw5DCsMOQwr3DkMK4w5HCh8OQwrXDkMK9w5DCuMOQwrUnLFxuICAgICAgICAgICAgYMOQwpzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrTDkMK7w5HCjyDDkMKzw5HCgMORwoPDkMK/w5DCv8ORwotcbiAgICAgICAgICAgIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0gw5DCvcOQwrUgw5DCvMOQwrXDkMK9w5DCtcOQwrUgJHtncm91cE1pbkFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1heCAke2dyb3VwTWF4QW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICAgICAgJ8OQwp7DkMKzw5HCgMOQwrDDkMK9w5DCuMORwofDkMK1w5DCvcOQwrjDkMK1JyxcbiAgICAgICAgICAgIGDDkMKcw5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMK0w5DCu8ORwo8gw5DCs8ORwoDDkcKDw5DCv8OQwr/DkcKLXG4gICAgICAgICAgICDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtIMOQwr3DkMK1IMOQwrHDkMK+w5DCu8OQwrXDkMK1ICR7Z3JvdXBNYXhBbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENIZWNrIE1vZGlmaWVyIGFtb3VudCBsaW1pdHNcbiAgICBpZihtaW5BbW91bnQgfHwgbWF4QW1vdW50KSB7XG4gICAgICBpZihhbW91bnQgPCBtaW5BbW91bnQpIHtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcbiAgICAgICAgICBjYXNlICdwbHVzJzogYW1vdW50ID0gbWluQW1vdW50OyBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW51cyc6IGFtb3VudCA9IDA7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihhbW91bnQgPiBtYXhBbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdID0gYW1vdW50O1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICB9XG5cbiAgc2V0TW9kaWZpZXJzKCkge1xuICAgIGNvbnN0IG1vZGlmaWVyc1RvU2V0ID0gW107XG5cbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICAgICAgaWYoYW1vdW50KSB7XG5cbiAgICAgICAgICBtb2RpZmllcnNUb1NldC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBtb2RpZmllcklkLFxuICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkICE9PSAnc2luZ2xlJyA/IGdyb3VwSWQgOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYobW9kaWZpZXJzVG9TZXQubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaWVyc1RvU2V0LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcblxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuXG4gICAgICBjb25zdCBncm91cE1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdO1xuICAgICAgaWYoZ3JvdXBNb2RpZmllci5yZXF1aXJlZCkge1xuICAgICAgICBjb25zdCB0b3RhbEFtb3VudEluR3JvdXAgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwIDwgZ3JvdXBNb2RpZmllci5taW5BbW91bnQpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1pbiBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5taW5BbW91bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwID4gZ3JvdXBNb2RpZmllci5tYXhBbW91bnQpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1heCBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5tYXhBbW91bnR9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9mb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgIC8vXG4gICAgICAvL31cbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQoaXNWYWxpZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBBbW91bnRDYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBPcmRlckNhcnRVc2VyRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUnO1xuLy9pbXBvcnQgeyBNb2RpZmlyZXNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvbW9kaWZpcmVzLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTZXRBbW91bnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDaGVja291dERpcmVjdGl2ZSB9IGZyb20gXCIuL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudCc7XG5cbmNvbnN0IERJUkVDVElWRVMgPSBbXG4gIEFkZERpc2hUb0NhcnREaXJlY3RpdmUsXG4gIEFtb3VudENhcnREaXJlY3RpdmUsXG4gIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlLFxuICBPcmRlckNhcnRVc2VyRGlyZWN0aXZlLFxuICAvL01vZGlmaXJlc0RpcmVjdGl2ZSxcbiAgRGlzaENhbGNEaXJlY3RpdmUsXG4gIFNldERpc2hDb21tZW50RGlyZWN0aXZlLFxuICBTZXRBbW91bnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlLFxuXTtcblxuY29uc3QgQ09NUE9ORU5UUyA9IFtcbiAgRGlzaENhbGNDb21wb25lbnRcbl07XG5cbmNvbnN0IE1PRFVMRVMgPSBbXG4gIENvbW1vbk1vZHVsZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01PRFVMRVNdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXSxcbiAgZXhwb3J0czogW0RJUkVDVElWRVMsIENPTVBPTkVOVFNdXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0TW9kdWxlIHsgfVxuIiwiLyoqXG4gKiBHZW5lcmF0ZWQgYnVuZGxlIGluZGV4LiBEbyBub3QgZWRpdC5cbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL3B1YmxpY19hcGknO1xuXG5leHBvcnQge0Rpc2hDYWxjQ29tcG9uZW50IGFzIMOJwrVpfSBmcm9tICcuL2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50JztcbmV4cG9ydCB7QWRkRGlzaFRvQ2FydERpcmVjdGl2ZSBhcyDDicK1YX0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0Ftb3VudENhcnREaXJlY3RpdmUgYXMgw4nCtWJ9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlJztcbmV4cG9ydCB7Q2hlY2tvdXREaXJlY3RpdmUgYXMgw4nCtWh9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlJztcbmV4cG9ydCB7RGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgYXMgw4nCtWN9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtEaXNoQ2FsY0RpcmVjdGl2ZSBhcyDDicK1ZX0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcbmV4cG9ydCB7T3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSBhcyDDicK1ZH0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbmV4cG9ydCB7U2V0QW1vdW50RGlyZWN0aXZlIGFzIMOJwrVnfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmV4cG9ydCB7U2V0RGlzaENvbW1lbnREaXJlY3RpdmUgYXMgw4nCtWZ9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnOyJdLCJuYW1lcyI6WyJuZ19yZXN0b2NhcnRfc2VydmljZV8xIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUE7SUFZRSw0QkFBb0IsR0FBYyxFQUNkLE9BQXNCO1FBRDFDLGlCQVNDO1FBVG1CLFFBQUcsR0FBSCxHQUFHLENBQVc7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBTjFDLG9CQUFlLEdBQUcsSUFBSSxzQkFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLHNCQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUks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