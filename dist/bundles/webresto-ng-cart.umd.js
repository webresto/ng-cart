(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require(' commonjsHelpers.js'), require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core'), require(' commonjs-proxy-@angular/core'), require(' commonjs-proxy-rxjs'), require(' commonjs-proxy-rxjs/operators'), require(' commonjs-proxy-@webresto/ng-core'), require(' commonjs-proxy-../services/ng-restocart.service'), require(' commonjs-proxy-../../services/ng-restocart.service'), require('@angular/common'), require(' commonjs-proxy-@angular/common'), require(' commonjs-proxy-./directives/add-dish-to-cart.directive'), require(' commonjs-proxy-./directives/amount-cart.directive'), require(' commonjs-proxy-./directives/delete-from-cart.directive'), require(' commonjs-proxy-./directives/order-cart-user.directive'), require(' commonjs-proxy-./directives/set-amount.directive'), require(' commonjs-proxy-./directives/dish-calc.directive'), require(' commonjs-proxy-./directives/checkout.directive'), require(' commonjs-proxy-./directives/set-dish-comment.directive'), require(' commonjs-proxy-./components/dish-calc/dish-calc.component'), require(' commonjs-proxy-./lib/services/ng-restocart.service'), require(' commonjs-proxy-./lib/ng-cart.module'), require(' commonjs-proxy-./public_api'), require(' commonjs-proxy-./lib/components/dish-calc/dish-calc.component'), require(' commonjs-proxy-./lib/directives/add-dish-to-cart.directive'), require(' commonjs-proxy-./lib/directives/amount-cart.directive'), require(' commonjs-proxy-./lib/directives/checkout.directive'), require(' commonjs-proxy-./lib/directives/delete-from-cart.directive'), require(' commonjs-proxy-./lib/directives/dish-calc.directive'), require(' commonjs-proxy-./lib/directives/order-cart-user.directive'), require(' commonjs-proxy-./lib/directives/set-amount.directive'), require(' commonjs-proxy-./lib/directives/set-dish-comment.directive')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-cart', ['exports', ' commonjsHelpers.js', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core', ' commonjs-proxy-@angular/core', ' commonjs-proxy-rxjs', ' commonjs-proxy-rxjs/operators', ' commonjs-proxy-@webresto/ng-core', ' commonjs-proxy-../services/ng-restocart.service', ' commonjs-proxy-../../services/ng-restocart.service', '@angular/common', ' commonjs-proxy-@angular/common', ' commonjs-proxy-./directives/add-dish-to-cart.directive', ' commonjs-proxy-./directives/amount-cart.directive', ' commonjs-proxy-./directives/delete-from-cart.directive', ' commonjs-proxy-./directives/order-cart-user.directive', ' commonjs-proxy-./directives/set-amount.directive', ' commonjs-proxy-./directives/dish-calc.directive', ' commonjs-proxy-./directives/checkout.directive', ' commonjs-proxy-./directives/set-dish-comment.directive', ' commonjs-proxy-./components/dish-calc/dish-calc.component', ' commonjs-proxy-./lib/services/ng-restocart.service', ' commonjs-proxy-./lib/ng-cart.module', ' commonjs-proxy-./public_api', ' commonjs-proxy-./lib/components/dish-calc/dish-calc.component', ' commonjs-proxy-./lib/directives/add-dish-to-cart.directive', ' commonjs-proxy-./lib/directives/amount-cart.directive', ' commonjs-proxy-./lib/directives/checkout.directive', ' commonjs-proxy-./lib/directives/delete-from-cart.directive', ' commonjs-proxy-./lib/directives/dish-calc.directive', ' commonjs-proxy-./lib/directives/order-cart-user.directive', ' commonjs-proxy-./lib/directives/set-amount.directive', ' commonjs-proxy-./lib/directives/set-dish-comment.directive'], factory) :
    (factory((global.webresto = global.webresto || {}, global.webresto['ng-cart'] = {}),null,global.ng.core,global.rxjs,global.rxjs.operators,null,null,null,null,null,null,null,global.ng.common,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null));
}(this, (function (exports,commonjsHelpers,core,rxjs,operators,ngCore,core_1,rxjs_1,operators_1,ng_core_1,ng_restocart_service_1,ng_restocart_service_1$1,common,common_1,add_dish_to_cart_directive_1,amount_cart_directive_1,delete_from_cart_directive_1,order_cart_user_directive_1,set_amount_directive_1,dish_calc_directive_1,checkout_directive_1,set_dish_comment_directive_1,dish_calc_component_1,ng_restocart_service_1$2,ng_cart_module_1,public_api_1,dish_calc_component_1$1,add_dish_to_cart_directive_1$1,amount_cart_directive_1$1,checkout_directive_1$1,delete_from_cart_directive_1$1,dish_calc_directive_1$1,order_cart_user_directive_1$1,set_amount_directive_1$1,set_dish_comment_directive_1$1) { 'use strict';

    core_1 = core_1 && core_1.hasOwnProperty('default') ? core_1['default'] : core_1;
    rxjs_1 = rxjs_1 && rxjs_1.hasOwnProperty('default') ? rxjs_1['default'] : rxjs_1;
    operators_1 = operators_1 && operators_1.hasOwnProperty('default') ? operators_1['default'] : operators_1;
    ng_core_1 = ng_core_1 && ng_core_1.hasOwnProperty('default') ? ng_core_1['default'] : ng_core_1;
    ng_restocart_service_1 = ng_restocart_service_1 && ng_restocart_service_1.hasOwnProperty('default') ? ng_restocart_service_1['default'] : ng_restocart_service_1;
    ng_restocart_service_1$1 = ng_restocart_service_1$1 && ng_restocart_service_1$1.hasOwnProperty('default') ? ng_restocart_service_1$1['default'] : ng_restocart_service_1$1;
    common_1 = common_1 && common_1.hasOwnProperty('default') ? common_1['default'] : common_1;
    add_dish_to_cart_directive_1 = add_dish_to_cart_directive_1 && add_dish_to_cart_directive_1.hasOwnProperty('default') ? add_dish_to_cart_directive_1['default'] : add_dish_to_cart_directive_1;
    amount_cart_directive_1 = amount_cart_directive_1 && amount_cart_directive_1.hasOwnProperty('default') ? amount_cart_directive_1['default'] : amount_cart_directive_1;
    delete_from_cart_directive_1 = delete_from_cart_directive_1 && delete_from_cart_directive_1.hasOwnProperty('default') ? delete_from_cart_directive_1['default'] : delete_from_cart_directive_1;
    order_cart_user_directive_1 = order_cart_user_directive_1 && order_cart_user_directive_1.hasOwnProperty('default') ? order_cart_user_directive_1['default'] : order_cart_user_directive_1;
    set_amount_directive_1 = set_amount_directive_1 && set_amount_directive_1.hasOwnProperty('default') ? set_amount_directive_1['default'] : set_amount_directive_1;
    dish_calc_directive_1 = dish_calc_directive_1 && dish_calc_directive_1.hasOwnProperty('default') ? dish_calc_directive_1['default'] : dish_calc_directive_1;
    checkout_directive_1 = checkout_directive_1 && checkout_directive_1.hasOwnProperty('default') ? checkout_directive_1['default'] : checkout_directive_1;
    set_dish_comment_directive_1 = set_dish_comment_directive_1 && set_dish_comment_directive_1.hasOwnProperty('default') ? set_dish_comment_directive_1['default'] : set_dish_comment_directive_1;
    dish_calc_component_1 = dish_calc_component_1 && dish_calc_component_1.hasOwnProperty('default') ? dish_calc_component_1['default'] : dish_calc_component_1;
    ng_restocart_service_1$2 = ng_restocart_service_1$2 && ng_restocart_service_1$2.hasOwnProperty('default') ? ng_restocart_service_1$2['default'] : ng_restocart_service_1$2;
    ng_cart_module_1 = ng_cart_module_1 && ng_cart_module_1.hasOwnProperty('default') ? ng_cart_module_1['default'] : ng_cart_module_1;
    public_api_1 = public_api_1 && public_api_1.hasOwnProperty('default') ? public_api_1['default'] : public_api_1;
    dish_calc_component_1$1 = dish_calc_component_1$1 && dish_calc_component_1$1.hasOwnProperty('default') ? dish_calc_component_1$1['default'] : dish_calc_component_1$1;
    add_dish_to_cart_directive_1$1 = add_dish_to_cart_directive_1$1 && add_dish_to_cart_directive_1$1.hasOwnProperty('default') ? add_dish_to_cart_directive_1$1['default'] : add_dish_to_cart_directive_1$1;
    amount_cart_directive_1$1 = amount_cart_directive_1$1 && amount_cart_directive_1$1.hasOwnProperty('default') ? amount_cart_directive_1$1['default'] : amount_cart_directive_1$1;
    checkout_directive_1$1 = checkout_directive_1$1 && checkout_directive_1$1.hasOwnProperty('default') ? checkout_directive_1$1['default'] : checkout_directive_1$1;
    delete_from_cart_directive_1$1 = delete_from_cart_directive_1$1 && delete_from_cart_directive_1$1.hasOwnProperty('default') ? delete_from_cart_directive_1$1['default'] : delete_from_cart_directive_1$1;
    dish_calc_directive_1$1 = dish_calc_directive_1$1 && dish_calc_directive_1$1.hasOwnProperty('default') ? dish_calc_directive_1$1['default'] : dish_calc_directive_1$1;
    order_cart_user_directive_1$1 = order_cart_user_directive_1$1 && order_cart_user_directive_1$1.hasOwnProperty('default') ? order_cart_user_directive_1$1['default'] : order_cart_user_directive_1$1;
    set_amount_directive_1$1 = set_amount_directive_1$1 && set_amount_directive_1$1.hasOwnProperty('default') ? set_amount_directive_1$1['default'] : set_amount_directive_1$1;
    set_dish_comment_directive_1$1 = set_dish_comment_directive_1$1 && set_dish_comment_directive_1$1.hasOwnProperty('default') ? set_dish_comment_directive_1$1['default'] : set_dish_comment_directive_1$1;

    var ngRestocart_service = commonjsHelpers.createCommonjsModule(function (module, exports) {
        /**
         * @fileoverview added by tsickle
         * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
         */
        Object.defineProperty(exports, "__esModule", { value: true });
        var i0 = core_1;
        var i1 = ng_core_1;
        /*  TODO: В етом класе еще надо реализовать логику проверки доступности разных типов зхранилищь, но пока нету фикса нужного нам модуля ето
         затруднательно прийдется ждать.  */
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
                this.modifiresMessage.subscribe(( /**
                 * @param {?} messages
                 * @return {?}
                 */function (messages) { return _this.messages = messages; }));
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
                            .subscribe(( /**
                     * @param {?} cart
                     * @return {?}
                     */function (cart) { return _this.cart.next(cart.cart); }), ( /**
                         * @param {?} error
                         * @return {?}
                         */function (error) { return _this.removeCartId(); }));
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
                        this.messages.forEach(( /**
                         * @param {?} message
                         * @return {?}
                         */function (message) {
                            _this.eventer.emitMessageEvent(message);
                        }));
                        return;
                    }
                    this.net.put('/cart/add', data).subscribe(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        _this.setCartId(res.cart.cartId);
                        _this.cart.next(res.cart);
                        _this.cartID = res.cart.cartId;
                        /*this.eventer.emitMessageEvent(
                         new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
                         );*/
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                        this.messages.forEach(( /**
                         * @param {?} message
                         * @return {?}
                         */function (message) {
                            _this.eventer.emitMessageEvent(message);
                        }));
                        return rxjs_1.of(null);
                    }
                    return this.net.put('/cart/add', data)
                        .pipe(operators_1.tap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
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
                    }).subscribe(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        _this.setCartId(res.cart.cartId);
                        _this.cart.next(res.cart);
                        _this.cartID = res.cart.cartId;
                        /*this.eventer.emitMessageEvent(
                         new EventMessage('success', 'Успех', 'Изменено количество')
                         );*/
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                    }).pipe(operators_1.tap(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        _this.setCartId(res.cart.cartId);
                        _this.cart.next(res.cart);
                        _this.cartID = res.cart.cartId;
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                        .pipe(operators_1.tap(( /**
                 * @param {?} res
                 * @return {?}
                 */function (res) {
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
                    }).subscribe(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        _this.setCartId(res.cart.cartId);
                        _this.cart.next(res.cart);
                        _this.cartID = res.cart.cartId;
                        /*this.eventer.emitMessageEvent(
                         new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
                         );*/
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                        .pipe(operators_1.tap(( /**
                 * @param {?} result
                 * @return {?}
                 */function (result) {
                        _this.setCartId(result.cart.cartId);
                        _this.cart.next(result.cart);
                        _this.cartID = result.cart.cartId;
                        /*this.eventer.emitMessageEvent(
                         new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
                         );*/
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                        .pipe(operators_1.tap(( /**
                 * @param {?} result
                 * @return {?}
                 */function (result) {
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
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
                    this.net.post('/check', data).subscribe(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) {
                        _this.setCartId(res.cart.cartId);
                        _this.cart.next(res.cart);
                        _this.cartID = res.cart.cartId;
                        if (res.message) {
                            _this.eventer.emitMessageEvent(new ng_core_1.EventMessage(res.message.type, res.message.title, res.message.body));
                        }
                    }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) {
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
            NgRestoCartService.ctorParameters = function () {
                return [
                    { type: ng_core_1.NetService },
                    { type: ng_core_1.EventerService }
                ];
            };
            /** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
            return NgRestoCartService;
        }());
        exports.NgRestoCartService = NgRestoCartService;
        
    });
    commonjsHelpers.unwrapExports(ngRestocart_service);
    var ngRestocart_service_1 = ngRestocart_service.NgRestoCartService;

    var addDishToCart_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return _this.cart = res; }));
                this.cartService
                    .getModifires()
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return _this.modifires = res; }));
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
                        .subscribe(( /**
                 * @param {?} _
                 * @return {?}
                 */function (_) { return _this.success.emit(true); }), ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) { return _this.error.emit(e); }), ( /**
                     * @return {?}
                     */function () {
                        _this.loading.emit(false);
                    }));
                };
            AddDishToCartDirective.decorators = [
                { type: core_1.Directive, args: [{
                            selector: '[addToCart]'
                        },] },
            ];
            /** @nocollapse */
            AddDishToCartDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
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
    commonjsHelpers.unwrapExports(addDishToCart_directive);
    var addDishToCart_directive_1 = addDishToCart_directive.AddDishToCartDirective;

    var amountCart_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) {
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
            AmountCartDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService },
                    { type: core_1.Renderer2 },
                    { type: core_1.ElementRef }
                ];
            };
            return AmountCartDirective;
        }());
        exports.AmountCartDirective = AmountCartDirective;
        
    });
    commonjsHelpers.unwrapExports(amountCart_directive);
    var amountCart_directive_1 = amountCart_directive.AmountCartDirective;

    var deleteFromCart_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return _this.cart = res; }));
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
            DeleteFromCartDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
            DeleteFromCartDirective.propDecorators = {
                dish: [{ type: core_1.Input }],
                amountDish: [{ type: core_1.Input }],
                onClick: [{ type: core_1.HostListener, args: ['click',] }]
            };
            return DeleteFromCartDirective;
        }());
        exports.DeleteFromCartDirective = DeleteFromCartDirective;
        
    });
    commonjsHelpers.unwrapExports(deleteFromCart_directive);
    var deleteFromCart_directive_1 = deleteFromCart_directive.DeleteFromCartDirective;

    var orderCartUser_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.cartService
                            .userCart()
                            .subscribe(( /**
                     * @param {?} cart
                     * @return {?}
                     */function (cart) {
                            if (_this.cart && _this.orderCart.valid && _this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                                _this.checkStreet(_this.orderCart.value);
                            }
                            _this.cart = cart;
                        }));
                    }), 100);
                    setTimeout(( /**
                     * @return {?}
                     */function () {
                        _this.checkerFields.next(_this.checkForFields(_this.orderCart._directives, _this.requiredFields));
                    }), 100);
                    this.checkerFields.subscribe(( /**
                     * @param {?} state
                     * @return {?}
                     */function (state) {
                        if (state) {
                            _this.orderCart.controls['street'].valueChanges.subscribe(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) {
                                if (typeof val === 'object') {
                                    setTimeout(( /**
                                     * @return {?}
                                     */function () {
                                        if (_this.orderCart.controls['house'].valid) {
                                            _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                            _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                            _this.checkStreet(_this.orderCart.value);
                                        }
                                    }), 100);
                                }
                            }));
                            _this.orderCart.controls['house'].valueChanges.subscribe(( /**
                             * @param {?} val
                             * @return {?}
                             */function (val) {
                                setTimeout(( /**
                                 * @return {?}
                                 */function () {
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
                    formDirectives.forEach(( /**
                     * @param {?} element
                     * @return {?}
                     */function (element) {
                        fieldsAreAvailable[element.name] = true;
                    }));
                    requiredFields.forEach(( /**
                     * @param {?} element
                     * @return {?}
                     */function (element) {
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
            OrderCartUserDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
            OrderCartUserDirective.propDecorators = {
                orderCart: [{ type: core_1.Input }],
                onClick: [{ type: core_1.HostListener, args: ['click',] }]
            };
            return OrderCartUserDirective;
        }());
        exports.OrderCartUserDirective = OrderCartUserDirective;
        
    });
    commonjsHelpers.unwrapExports(orderCartUser_directive);
    var orderCartUser_directive_1 = orderCartUser_directive.OrderCartUserDirective;

    var setAmount_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    .subscribe(( /**
             * @param {?} res
             * @return {?}
             */function (res) { return _this.cart = res; }));
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
            SetAmountDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
            SetAmountDirective.propDecorators = {
                action: [{ type: core_1.Input }],
                dish: [{ type: core_1.Input }],
                onClick: [{ type: core_1.HostListener, args: ['click',] }]
            };
            return SetAmountDirective;
        }());
        exports.SetAmountDirective = SetAmountDirective;
        
    });
    commonjsHelpers.unwrapExports(setAmount_directive);
    var setAmount_directive_1 = setAmount_directive.SetAmountDirective;

    var dishCalc_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    setTimeout(( /**
                     * @return {?}
                     */function () {
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
                    this.renderer.listen(addButton, "click", ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) {
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
                    this.renderer.listen(minusButton, "click", ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) {
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
                        this.selectedModifiers.forEach(( /**
                         * @param {?} element
                         * @return {?}
                         */function (element) {
                            _this.dish.modifiers.forEach(( /**
                             * @param {?} groups
                             * @return {?}
                             */function (groups) {
                                /** @type {?} */
                                var mod = groups.childModifiers.filter(( /**
                                 * @param {?} x
                                 * @return {?}
                                 */function (x) { return x.modifierId === element.id; }));
                                if (mod.length > 0) {
                                    mod[0].groupId = groups.group.id;
                                    selected.push(mod[0]);
                                }
                            }));
                        }));
                    /** @type {?} */
                    var modSum = 0;
                    selected.forEach(( /**
                     * @param {?} element
                     * @return {?}
                     */function (element) {
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
                        this.selectedModifiers.forEach(( /**
                         * @param {?} element
                         * @return {?}
                         */function (element) {
                            _this.dish.modifiers.forEach(( /**
                             * @param {?} groups
                             * @return {?}
                             */function (groups) {
                                /** @type {?} */
                                var mod = groups.childModifiers.filter(( /**
                                 * @param {?} x
                                 * @return {?}
                                 */function (x) { return x.modifierId === element.id; }));
                                if (mod.length > 0) {
                                    mod[0].groupId = groups.group.id;
                                    selected.push(mod[0]);
                                }
                            }));
                        }));
                    /** @type {?} */
                    var modSum = 0;
                    selected.forEach(( /**
                     * @param {?} element
                     * @return {?}
                     */function (element) {
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
                    modifires.forEach(( /**
                     * @param {?} elementGroup
                     * @return {?}
                     */function (elementGroup) {
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
                            modArr.forEach(( /**
                             * @param {?} element
                             * @return {?}
                             */function (element) {
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
                    this.renderer.listen(input, "change", ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) {
                        if (_this.idRadioBox(groupId)) {
                            for (var key in _this.stateModifiers[groupId]) {
                                if (_this.stateModifiers[groupId].hasOwnProperty(key)) {
                                    _this.stateModifiers[groupId][key] = false;
                                    // this.renderer.setProperty(input, 'checked',   true);
                                }
                            }
                            /** @type {?} */
                            var groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                            groupDivBlock.forEach(( /**
                             * @param {?} element
                             * @return {?}
                             */function (element) {
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
                    this.renderer.listen(aMinusDiv, "click", ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) {
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
                    this.renderer.listen(aPlusDiv, "click", ( /**
                     * @param {?} e
                     * @return {?}
                     */function (e) {
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
                            if (this_1.stateModifiers[groupId][modifireId] || modifiersToSelect.find(( /**
                             * @param {?} item
                             * @return {?}
                             */function (item) { return item.modifierId == modifireId; }))) {
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
                        this.dish.modifiers.forEach(( /**
                         * @param {?} group
                         * @return {?}
                         */function (group) {
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
                    var currentGroup = this.dish.modifiers.find(( /**
                     * @param {?} x
                     * @return {?}
                     */function (x) { return x.modifierId === groupId; }));
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
            DishCalcDirective.ctorParameters = function () {
                return [
                    { type: core_1.Renderer2 },
                    { type: core_1.ElementRef },
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
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
    commonjsHelpers.unwrapExports(dishCalc_directive);
    var dishCalc_directive_1 = dishCalc_directive.DishCalcDirective;

    var checkout_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    .subscribe(( /**
             * @param {?} cart
             * @return {?}
             */function (cart) { return _this.cart = cart; }));
                this.cartService.OrderFormChange
                    .pipe(operators_1.filter(( /**
             * @return {?}
             */function () {
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
                    .subscribe(( /**
             * @return {?}
             */function () { return _this.checkStreet(); }));
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
                    if (this.orderDate) {
                        data["orderDate"] = this.orderDate;
                    }
                    if (this.notifyMethodId) {
                        data["notifyMethodId"] = this.notifyMethodId;
                    }
                    data["selfDelivery"] = this.delivery;
                    if (this.bonuses) {
                        data['bonuses'] = this.bonuses.map(( /**
                         * @param {?} b
                         * @return {?}
                         */function (b) {
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
                    this.cartService
                        .orderCart(data)
                        .pipe(operators_1.tap(( /**
                 * @param {?} result
                 * @return {?}
                 */function (result) {
                        if (result.action && result.action.paymentRedirect) {
                            window.location.href = result.action.paymentRedirect;
                        }
                    })))
                        .subscribe(( /**
                 * @return {?}
                 */function () { return _this.success.emit(true); }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) { return _this.error.emit(error); }));
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
                            //"phone": this.preparePhone(this.phone),
                            //"name": this.name
                            "phone": '+79999999999',
                            "mail": this.email,
                            "name": this.name || 'Пользователь'
                        },
                        "personsCount": +this.personsCount
                    };
                    // console.log('EEEEEEEEEEEE', this.delivery);
                    data["selfDelivery"] = this.delivery;
                    if (this.paymentMethodId) {
                        data["paymentMethodId"] = this.paymentMethodId;
                    }
                    if (this.orderDate) {
                        data["orderDate"] = this.orderDate;
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
                    function (result) { return _this.isChecking.emit(false); }), ( /**
                     * @param {?} error
                     * @return {?}
                     */function (error) { return _this.isChecking.emit(false); }));
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
            CheckoutDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
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
                orderDate: [{ type: core_1.Input }],
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
    commonjsHelpers.unwrapExports(checkout_directive);
    var checkout_directive_1$2 = checkout_directive.CheckoutDirective;

    var setDishComment_directive = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                    this.cartService.setDishComment(this.dish.id, this.comment).subscribe(( /**
                     * @param {?} res
                     * @return {?}
                     */function (res) { return _this.success.emit(true); }), ( /**
                     * @param {?} err
                     * @return {?}
                     */function (err) { return _this.error.emit(err); }));
                };
            SetDishCommentDirective.decorators = [
                { type: core_1.Directive, args: [{
                            selector: '[setDishComment]'
                        },] },
            ];
            /** @nocollapse */
            SetDishCommentDirective.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1.NgRestoCartService }
                ];
            };
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
    commonjsHelpers.unwrapExports(setDishComment_directive);
    var setDishComment_directive_1 = setDishComment_directive.SetDishCommentDirective;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __exportStar(m, exports) {
        for (var p in m)
            if (!exports.hasOwnProperty(p))
                exports[p] = m[p];
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k))
                    result[k] = mod[k];
        result.default = mod;
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    var tslib_es6 = /*#__PURE__*/Object.freeze({
        __extends: __extends,
        get __assign () { return __assign; },
        __rest: __rest,
        __decorate: __decorate,
        __param: __param,
        __metadata: __metadata,
        __awaiter: __awaiter,
        __generator: __generator,
        __exportStar: __exportStar,
        __values: __values,
        __read: __read,
        __spread: __spread,
        __spreadArrays: __spreadArrays,
        __await: __await,
        __asyncGenerator: __asyncGenerator,
        __asyncDelegator: __asyncDelegator,
        __asyncValues: __asyncValues,
        __makeTemplateObject: __makeTemplateObject,
        __importStar: __importStar,
        __importDefault: __importDefault
    });

    var dishCalc_component = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
                            for (var _c = tslib_es6.__values(this.dish.modifiers), _d = _c.next(); !_d.done; _d = _c.next()) {
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
                                    && modifier.childModifiers.find(( /**
                                     * @param {?} m
                                     * @return {?}
                                     */function (m) { return m.dish; }))) {
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
                                            for (var _e = tslib_es6.__values(modifier.childModifiers), _f = _e.next(); !_f.done; _f = _e.next()) {
                                                var childModifier = _f.value;
                                                // Indexing
                                                this.modifiers.indexById[childModifier.modifierId] = childModifier;
                                                // Init default value
                                                this.modifiersValueTree[modifier.modifierId][childModifier.modifierId] = childModifier.defaultAmount;
                                            }
                                        }
                                        catch (e_2_1) {
                                            e_2 = { error: e_2_1 };
                                        }
                                        finally {
                                            try {
                                                if (_f && !_f.done && (_b = _e.return))
                                                    _b.call(_e);
                                            }
                                            finally {
                                                if (e_2)
                                                    throw e_2.error;
                                            }
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
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return))
                                    _a.call(_c);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
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
                        .reduce(( /**
                 * @param {?} a
                 * @param {?} b
                 * @return {?}
                 */function (a, b) { return a + b; }));
                    return this.modifiers.indexById[groupId].totalAmount;
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
                            template: "<div class=\"ng-cart-dish-calc\" *ngIf=\"dish\">\n    <div class=\"dish\">\n        <div class=\"dish-image-box\">\n            <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n        </div>\n        <div class=\"dish-description-box\">\n            <div class=\"dish-name\">{{ dish.name }}</div>\n            <div class=\"dish-ingredients\">{{ dish.description }}</div>\n            <div class=\"dish-price-box\">\n                <ng-container *ngIf=\"!modifiers.custom.fixed; else modifierFixedTemplate\">\n                    <div class=\"price\" [ngClass]=\"{'zero-price': !dish.price}\">\n                        <span>{{ dish.price }}</span> \u20BD\n                    </div>\n                </ng-container>\n                <ng-template #modifierFixedTemplate>\n                    <ng-container *ngIf=\"modifiers.custom.fixed as modifier\">\n                        <div class=\"modifier-fixed\">\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                                <div class=\"item\"\n                                     [ngClass]=\"{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\n                                     (click)=\"changeModifierAmount(childModifier, 1, 'checkbox')\">\n                                    {{ childModifier.dish?.name }}\n                                </div>\n                            </ng-container>\n                        </div>\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                            <ng-container *ngIf=\"!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\n                                <div class=\"price\" [ngClass]=\"{'zero-price': !childModifier.dish?.price}\">\n                                    <span>{{ childModifier.dish?.price }}</span> \u20BD\n                                </div>\n                            </ng-container>\n                        </ng-container>\n                    </ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </div>\n    <div class=\"modifiers\" *ngIf=\"modifiers.baseList?.length\">\n        <ng-container *ngFor=\"let modifier of modifiers.baseList\">\n            <div class=\"modifier-group\">\n                <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\n                    <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\n                    <div class=\"modifier-description\" *ngIf=\"group.description\">>{{ group.description }}</div>\n                </div>\n                <div class=\"modifier-box\" *ngIf=\"modifier.dish\">\n                    <!-- Single modifier -->\n                    <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: modifier,\n                            groupId: 'single',\n                            amount: modifiersValueTree['single'][modifier.modifierId],\n                            groupAmount: modifiersValueTree['single'][modifier.modifierId],\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n                </div>\n                <div class=\"modifier-children\" *ngIf=\"modifier.childModifiers?.length\">\n                    <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                        <!-- Group modifier -->\n                        <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: childModifier,\n                            groupId: modifier.modifierId,\n                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],\n                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n\n                    </ng-container>\n                </div>\n            </div>\n        </ng-container>\n    </div>\n    <div class=\"result\">\n        <span class=\"text\">\u0418\u0422\u041E\u0413\u041E:</span>\n        <span class=\"price\">\n            <span>{{ totalPrice}}</span> \u20BD\n        </span>\n    </div>\n</div>\n\n\n\n<!-- Template block #dishImageTemplate -->\n\n<ng-template #dishImageTemplate let-dish=\"dish\">\n    <ng-container *ngIf=\"dish?.images && dish.images[0]?.images?.small; else imgPlaceholder\">\n        <div class=\"dish-image\" [style.backgroundImage]=\"'url(' + imageUrl + dish.images[0].images.small + ')'\"></div>\n    </ng-container>\n    <ng-template #imgPlaceholder>\n        <div class=\"dish-image-placeholder\"></div>\n    </ng-template>\n</ng-template>\n\n<!-- Template block #modifierTemplate -->\n\n<ng-template #modifierTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container *ngIf=\"modifier.dish as dish\">\n        <div class=\"modifier-dish\">\n            <div class=\"modifier-dish-image-box\">\n                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n            </div>\n            <div class=\"modifier-dish-description-box\">\n                <div class=\"modifier-dish-name\">{{ dish.name }}</div>\n                <div class=\"modifier-dish-weight\">{{ dish.weight * 1000 }} \u0433\u0440</div>\n            </div>\n            <div class=\"modifier-dish-price-box\">\n                <div [ngClass]=\"{'zero-price': !dish.price}\">\n                    <span>{{ dish.price }}</span> \u20BD\n                </div>\n            </div>\n            <div class=\"modifier-dish-action-box\">\n                <ng-container *ngIf=\"groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate\">\n                    <ng-container *ngTemplateOutlet=\"modifierCheckboxTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount\n                    }\"></ng-container>\n                </ng-container>\n\n                <ng-template #counterTemplate>\n                    <ng-container *ngTemplateOutlet=\"modifierCounterTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount,\n                        groupAmount: groupAmount,\n                        groupMinAmount: groupMinAmount,\n                        groupMaxAmount: groupMaxAmount\n                    }\"></ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCounterTemplate -->\n\n<ng-template #modifierCounterTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container>\n        <div class=\"modifier-counter\" [ngClass]=\"{disabled: !amount && groupAmount >= groupMaxAmount}\">\n            <div\n                    class=\"minus\"\n                    [ngClass]=\"{disabled: !amount || groupAmount <= groupMinAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount - 1, 'minus')\"\n                    onselectstart=\"return false;\">-</div>\n            <input [value]=\"amount\" readonly #input>\n            <div\n                    class=\"plus\"\n                    [ngClass]=\"{disabled: groupAmount >= groupMaxAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount + 1, 'plus')\"\n                    onselectstart=\"return false;\">+</div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCheckboxTemplate -->\n\n<ng-template #modifierCheckboxTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\">\n    <ng-container>\n        <div\n                class=\"modifier-checkbox\"\n                [ngClass]=\"{selected: amount}\"\n                (click)=\"changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')\"></div>\n    </ng-container>\n</ng-template>\n",
                            styles: [".dish{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:stretch;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;overflow:hidden;-webkit-box-flex:1;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;height:45px;margin-right:49px}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-description-box{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:-webkit-box;display:flex;-webkit-box-align:stretch;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.modifier-checkbox.selected:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}"]
                        },] },
            ];
            /** @nocollapse */
            DishCalcComponent.ctorParameters = function () {
                return [
                    { type: ng_restocart_service_1$1.NgRestoCartService },
                    { type: ng_core_1.EventerService },
                    { type: String, decorators: [{ type: core_1.Inject, args: ['ImageUrl',] }] }
                ];
            };
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
    commonjsHelpers.unwrapExports(dishCalc_component);
    var dishCalc_component_1 = dishCalc_component.DishCalcComponent;

    var ngCart_module = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
    commonjsHelpers.unwrapExports(ngCart_module);
    var ngCart_module_1 = ngCart_module.NgRestoCartModule;

    var public_api = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
    commonjsHelpers.unwrapExports(public_api);
    var public_api_1$1 = public_api.NgRestoCartService;
    var public_api_2 = public_api.NgRestoCartModule;

    var webrestoNgCart = commonjsHelpers.createCommonjsModule(function (module, exports) {
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
    var webrestoNgCart$1 = commonjsHelpers.unwrapExports(webrestoNgCart);
    var webrestoNgCart_1 = webrestoNgCart.NgRestoCartService;
    var webrestoNgCart_2 = webrestoNgCart.NgRestoCartModule;

    exports.default = webrestoNgCart$1;
    exports.NgRestoCartService = webrestoNgCart_1;
    exports.NgRestoCartModule = webrestoNgCart_2;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctY2FydC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlLnRzIixudWxsLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50LnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvbmctY2FydC5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L3dlYnJlc3RvLW5nLWNhcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcbi8qICBUT0RPOiDDkMKSIMOQwrXDkcKCw5DCvsOQwrwgw5DCusOQwrvDkMKww5HCgcOQwrUgw5DCtcORwonDkMK1IMOQwr3DkMKww5DCtMOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5DCvsOQwrLDkMKww5HCgsORwowgw5DCu8OQwr7DkMKzw5DCuMOQwrrDkcKDIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrrDkMK4IMOQwrTDkMK+w5HCgcORwoLDkcKDw5DCv8OQwr3DkMK+w5HCgcORwoLDkMK4IMORwoDDkMKww5DCt8OQwr3DkcKLw5HChSDDkcKCw5DCuMOQwr/DkMK+w5DCsiDDkMK3w5HChcORwoDDkMKww5DCvcOQwrjDkMK7w5DCuMORwonDkcKMLCDDkMK9w5DCviDDkMK/w5DCvsOQwrrDkMKwIMOQwr3DkMK1w5HCgsORwoMgw5HChMOQwrjDkMK6w5HCgcOQwrAgw5DCvcORwoPDkMK2w5DCvcOQwr7DkMKzw5DCviDDkMK9w5DCsMOQwrwgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwrXDkcKCw5DCvlxuIMOQwrfDkMKww5HCgsORwoDDkcKDw5DCtMOQwr3DkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkMK+IMOQwr/DkcKAw5DCuMOQwrnDkMK0w5DCtcORwoLDkcKBw5HCjyDDkMK2w5DCtMOQwrDDkcKCw5HCjC4gICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XG4gIGNhcnRJRDpzdHJpbmc7XG4gIGNhcnQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1vZGlmaXJlczpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgT3JkZXJGb3JtQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcblxuICBtb2RpZmlyZXNNZXNzYWdlOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtZXNzYWdlczpFdmVudE1lc3NhZ2VbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLm1vZGlmaXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5pbml0aWFsU3RvcmFnZSgpO1xuXG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLnN1YnNjcmliZShtZXNzYWdlcyA9PiB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMpO1xuICB9XG5cbiAgaW5pdGlhbFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5jYXJ0SUQgPSB0aGlzLmdldENhcnRJZCgpO1xuICAgIGlmICh0aGlzLmNhcnRJRCkge1xuICAgICAgdGhpcy5uZXRcbiAgICAgICAgLmdldCgnL2NhcnQ/Y2FydElkPScgKyB0aGlzLmNhcnRJRClcbiAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICBjYXJ0ID0+IHRoaXMuY2FydC5uZXh0KGNhcnQuY2FydCksXG4gICAgICAgICAgZXJyb3IgPT4gdGhpcy5yZW1vdmVDYXJ0SWQoKVxuICAgICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGdldENhcnRJZCgpOnN0cmluZyB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQoZGF0YSkge1xuXG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5uZXQucHV0KCcvY2FydC9hZGQnLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrvDkMK1w5DCvcOQwr4gw5DCsiDDkMK6w5DCvsORwoDDkMK3w5DCuMOQwr3DkcKDJylcbiAgICAgICAgICk7Ki9cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK4w5HCgsORwowgw5DCscOQwrvDkcKOw5DCtMOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQkKGRhdGEpIHtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIG9mKG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlcz0+IHtcbiAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpjDkMK3w5DCvMOQwrXDkMK9w5DCtcOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICAgKTsqL1xuXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrjDkMK3w5DCvMOQwrXDkMK9w5DCuMORwoLDkcKMIMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIHNldERpc2hDb21tZW50KGRpc2hJZCwgY29tbWVudCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXRjb21tZW50Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudFxuICAgIH0pLnBpcGUodGFwKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCuMOQwrfDkMK8w5DCtcOQwr3DkMK4w5HCgsORwowgw5DCusOQwr7DkMK8w5DCtcOQwr3DkcKCw5DCsMORwoDDkMK4w5DCuScpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApKVxuXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQkKGRpc2hJZCwgYW1vdW50KSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KVxuICAgICAgLnBpcGUodGFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICB9KSk7XG5cbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tQ2FydChkaXNoSWQsIGFtb3VudCkge1xuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvcmVtb3ZlJywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCkcOQwrvDkcKOw5DCtMOQwr4gw5HCg8ORwoHDkMK/w5DCtcORwojDkMK9w5DCviDDkcKDw5DCtMOQwrDDkMK7w5DCtcOQwr3DkMK+JylcbiAgICAgICAgICk7Ki9cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5HCg8OQwrTDkMKww5DCu8OQwrjDkcKCw5HCjCDDkMKxw5DCu8ORwo7DkMK0w5DCvicpXG4gICAgICAgICApKi9cbiAgICAgIH0pO1xuXG4gIH1cblxuICBjaGVja291dENhcnQoZGF0YSkge1xuICAgIGxldCBvcmRlcjpPcmRlciA9IHtcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0SUQsXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHN0cmVldElkOiBkYXRhLnN0cmVldC5pZCxcbiAgICAgICAgaG9tZTogZGF0YS5ob3VzZSxcbiAgICAgICAgaG91c2luZzogZGF0YS5ob3VzaW5nLFxuICAgICAgICAvLyBpbmRleDogXCIxMjc4XCIsXG4gICAgICAgIGVudHJhbmNlOiBkYXRhLmVudHJhbmNlLFxuICAgICAgICBmbG9vcjogZGF0YS5mbG9vcixcbiAgICAgICAgYXBhcnRtZW50OiBkYXRhLmFwYXJ0bWVudFxuICAgICAgfSxcblxuICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbWFpbDogZGF0YS5lbWFpbCB8fCB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm9yZGVyQ2FydChvcmRlcik7XG5cbiAgfVxuXG4gIG9yZGVyQ2FydChkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9vcmRlcicsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXN1bHQuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzdWx0LmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXN1bHQuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCl8OQwrDDkMK6w5DCsMOQwrcgw5HCg8OQwr/DkMK1w5HCiMOQwr3DkMK+IMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCu8OQwrXDkMK9JylcbiAgICAgICAgICAgICApOyovXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvcOQwrjDkcKPIVwiLCBlcnJvcik7XG4gICAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IgJiYgZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyppZiAoZXJyb3IubWVzc2FnZSkge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK4w5HCgsORwowgw5DCt8OQwrDDkMK6w5DCsMOQwrcnKVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSovXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tTdHJlZXRWMihkYXRhKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzdWx0LmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlc3VsdC5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzdWx0LmNhcnQuY2FydElkO1xuICAgICAgICAgICAgLyppZiAocmVzdWx0Lm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnR5cGUsXG4gICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UudGl0bGUsXG4gICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UuYm9keVxuICAgICAgICAgICAgIClcbiAgICAgICAgICAgICApO1xuICAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAvL3RoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgLy9uZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrjDkcKCw5HCjCDDkMK3w5DCsMOQwrrDkMKww5DCtycpXG4gICAgICAgICAgICAvLylcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1N0cmVldChkYXRhKTp2b2lkIHtcblxuICAgIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcyA9PiB7XG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIGlmIChyZXMubWVzc2FnZSkge1xuICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShyZXMubWVzc2FnZS50eXBlLCByZXMubWVzc2FnZS50aXRsZSwgcmVzLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIGlmIChlcnJvci5lcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoZXJyb3IuZXJyb3IubWVzc2FnZS50eXBlLCBlcnJvci5lcnJvci5tZXNzYWdlLnRpdGxlLCBlcnJvci5lcnJvci5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgICk7Ki9cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgfVxuXG4gIHNldENhcnRJZChjYXJ0SUQpIHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnY2FydElEJywgY2FydElEKTtcbiAgfVxuICByZW1vdmVDYXJ0SWQoKSB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2NhcnRJRCcpO1xuICB9XG5cbiAgdXNlckNhcnQoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNhcnQ7XG4gIH1cblxuICBzZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlcz86RXZlbnRNZXNzYWdlW10pOnZvaWQge1xuICAgIHRoaXMubW9kaWZpcmVzLm5leHQobW9kaWZpcmVzKTtcbiAgICBpZiAobWVzc2FnZXMpIHRoaXMubW9kaWZpcmVzTWVzc2FnZS5uZXh0KG1lc3NhZ2VzKTtcbiAgfVxuXG4gIGdldE1vZGlmaXJlcygpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZpcmVzO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuICBtb2RpZmlyZXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaXJlcygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaXJlcyA9IHJlcyk7XG5cbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuICBASW5wdXQoKSBjb21tZW50OnN0cmluZztcblxuICBAT3V0cHV0KCkgbG9hZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmFkZERpc2hUb0NhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXG4gIH1cblxuICBwcml2YXRlIGFkZERpc2hUb0NhcnQoZGlzaElELCBhbW91bnQpIHtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50LFxuICAgICAgXCJjYXJ0SWRcIjogdW5kZWZpbmVkLFxuICAgICAgXCJtb2RpZmllcnNcIjogdGhpcy5tb2RpZmlyZXMsXG4gICAgICBcImNvbW1lbnRcIjp0aGlzLmNvbW1lbnRcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY2FydC5jYXJ0SWQpIGRhdGEuY2FydElkID0gdGhpcy5jYXJ0LmNhcnRJZDtcblxuICAgIHRoaXMubG9hZGluZy5lbWl0KHRydWUpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmFkZERpc2hUb0NhcnQkKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICBfID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICBlID0+IHRoaXMuZXJyb3IuZW1pdChlKSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMubG9hZGluZy5lbWl0KGZhbHNlKVxuICAgICAgICB9XG4gICAgICApO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Ftb3VudENhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBbW91bnRDYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0Om9iamVjdDtcbiAgYW1vdW50OnN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZlxuICApIHtcblxuICAgIHRoaXMuYW1vdW50ID0gJzAnOyBcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuY2FydCA9IHJlcztcbiAgICAgICAgdGhpcy5hbW91bnQgPSByZXMuZGlzaGVzQ291bnQgfHwgMDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG4gICAgICB9KTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGVsZXRlRnJvbUNhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2FydFNlcnZpY2UucmVtb3ZlRGlzaEZyb21DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tvcmRlckNhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBPcmRlckNhcnRVc2VyRGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBvcmRlckNhcnQ6YW55O1xuICBjYXJ0OmFueTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5vcmRlcih0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgY29uc29sZS5sb2codGhpcy5vcmRlckNhcnQudmFsdWUpXG4gIH1cblxuICBwcml2YXRlIHJlcXVpcmVkRmllbGRzOkFycmF5PHN0cmluZz4gPSBbXCJuYW1lXCIsIFwicGhvbmVcIiwgXCJzdHJlZXRcIiwgXCJob3VzZVwiXTtcbiAgcHJpdmF0ZSBjaGVja2VyRmllbGRzOkJlaGF2aW9yU3ViamVjdDxib29sZWFuPjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2hlY2tlckZpZWxkcyA9IG5ldyBCZWhhdmlvclN1YmplY3QodW5kZWZpbmVkKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOnZvaWQge1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAgIC51c2VyQ2FydCgpXG4gICAgICAgIC5zdWJzY3JpYmUoY2FydD0+IHtcbiAgICAgICAgICBpZiAodGhpcy5jYXJ0ICYmIHRoaXMub3JkZXJDYXJ0LnZhbGlkICYmIHRoaXMuY2FydC5jYXJ0VG90YWwgIT0gY2FydC5jYXJ0VG90YWwgJiYgY2FydC5jYXJ0VG90YWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrU3RyZWV0KHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNhcnQgPSBjYXJ0O1xuICAgICAgICB9KTtcbiAgICB9LCAxMDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNoZWNrZXJGaWVsZHMubmV4dCh0aGlzLmNoZWNrRm9yRmllbGRzKHRoaXMub3JkZXJDYXJ0Ll9kaXJlY3RpdmVzLCB0aGlzLnJlcXVpcmVkRmllbGRzKSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHRoaXMuY2hlY2tlckZpZWxkcy5zdWJzY3JpYmUoc3RhdGUgPT4ge1xuICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgIHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydob3VzZSddLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgfHwgXCLDkMKdw5DCtcORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RyZWV0KHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ3N0cmVldCddLnZhbGlkKSB7XG4gICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwiw5DCncOQwrXDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG4gICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lID0gdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgfHwgXCI3ODg4ODg4ODg4OFwiO1xuICAgICAgICAgICAgICB0aGlzLmNoZWNrU3RyZWV0KHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCAxMDApO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0pXG5cblxuICB9XG5cblxuICBjaGVja0ZvckZpZWxkcyhmb3JtRGlyZWN0aXZlczpBcnJheTxhbnk+LCByZXF1aXJlZEZpZWxkczpBcnJheTxzdHJpbmc+KTpib29sZWFuIHtcblxuICAgIGxldCBmaWVsZHNBcmVBdmFpbGFibGU6b2JqZWN0ID0ge307XG4gICAgbGV0IG5vRmllbGRzOkFycmF5PHN0cmluZz4gPSBbXTtcblxuXG4gICAgZm9ybURpcmVjdGl2ZXMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGZpZWxkc0FyZUF2YWlsYWJsZVtlbGVtZW50Lm5hbWVdID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHJlcXVpcmVkRmllbGRzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBpZiAoIWZpZWxkc0FyZUF2YWlsYWJsZS5oYXNPd25Qcm9wZXJ0eShlbGVtZW50KSkge1xuICAgICAgICBub0ZpZWxkcy5wdXNoKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG5vRmllbGRzLmxlbmd0aCA8PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIsOQwqMgw5HChMOQwr7DkcKAw5DCvMORwosgw5DCvsORwoLDkcKBw5HCg8ORwoLDkcKBw5DCssORwoPDkcKOw5HCgiDDkcKBw5DCu8OQwrXDkMK0w5HCg8ORwo7DkcKJw5DCuMOQwrUgw5DCvsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcORwovDkMK1IMOQwrTDkMK7w5HCjyDDkMK6w5DCvsORwoDDkcKAw5DCtcOQwrrDkcKCw5DCvcOQwr7DkMK5IMORwoDDkMKww5DCscOQwr7DkcKCw5HCiyDDkMK8w5DCvsOQwrTDkcKDw5DCu8ORwo8gw5DCv8OQwr7DkMK7w5HCjzpcIiwgbm9GaWVsZHMpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb3JkZXIoZGF0YVRvU2VuZCkge1xuICAgIGlmICh0aGlzLmNoZWNrRm9yRmllbGRzKHRoaXMub3JkZXJDYXJ0Ll9kaXJlY3RpdmVzLCB0aGlzLnJlcXVpcmVkRmllbGRzKSkge1xuICAgICAgbGV0IHBheW1lbnQ7XG4gICAgICBsZXQgY29tbWVudCA9IGRhdGFUb1NlbmQuY29tbWVudCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiXG5cbiAgICAgIGlmIChkYXRhVG9TZW5kLmNhc2gpIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCncOQwrDDkMK7w5DCuMORwofDkMK9w5HCi8OQwrzDkMK4IMOQwrrDkcKDw5HCgMORwozDkMK1w5HCgMORwoNcIjtcbiAgICAgIH0gZWxzZSBpZiAoZGF0YVRvU2VuZC5iYW5rY2FyZCkge1xuICAgICAgICBwYXltZW50ID0gXCLDkMKRw5DCsMOQwr3DkMK6w5DCvsOQwrLDkcKBw5DCusOQwr7DkMK5IMOQwrrDkMKww5HCgMORwoLDkMK+w5DCuSDDkMK6w5HCg8ORwoDDkcKMw5DCtcORwoDDkcKDXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXltZW50ID0gXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIjtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKGRhdGFUb1NlbmQpO1xuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICAgIC8vIFRPRE86IMORwoLDkMK4w5DCvyDDkMK+w5DCv8OQwrvDkMKww5HCgsORwosgw5DCvcOQwrDDkMK0w5DCviDDkMKyw5HCi8OQwr3DkMK1w5HCgcORwoLDkMK4IMOQwrIgw5DCvsORwoLDkMK0w5DCtcOQwrvDkcKMw5DCvcORwovDkMK5IMOQwrzDkMK+w5DCtMORwoPDkMK7w5HCjC5cbiAgICAgICAgXCJjb21tZW50XCI6IFwiXFxuIMOQwqLDkMK4w5DCvyDDkMK+w5DCv8OQwrvDkMKww5HCgsORwos6XCIgKyBwYXltZW50ICsgXCJcXG7DkMKaw5DCvsOQwrzDkMK1w5DCvcORwoLDkMKww5HCgMOQwrjDkMK5OlwiICsgY29tbWVudCxcbiAgICAgICAgLy8gXCJkZWxpdmVyeVwiOiB7XG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxuICAgICAgICAgIFwiaG9tZVwiOiBkYXRhVG9TZW5kLmhvdXNlLFxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwiZG9vcnBob25lXCI6IGRhdGFUb1NlbmQuZG9vcnBob25lLFxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXG4gICAgICAgICAgXCJhcGFydG1lbnRcIjogZGF0YVRvU2VuZC5hcGFydG1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgICAgXCJwaG9uZVwiOiAnKycgKyBkYXRhVG9TZW5kLnBob25lLFxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLm9yZGVyQ2FydChkYXRhKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGFUb1NlbmQpIHtcbiAgICBjb25zb2xlLmxvZyhcIj4+Pj5cIixkYXRhVG9TZW5kKTtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICBcImNvbW1lbnRcIjogZGF0YVRvU2VuZC5jb21tZW50LFxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcbiAgICAgICAgLy8gICBcInR5cGVcIjogXCJzdHJpbmcgKHNlbGYgb3Igbm90aGluZylcIlxuICAgICAgICAvLyB9LFxuICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgIC8vIFwiY2l0eVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXG4gICAgICAgICAgXCJob21lXCI6IGRhdGFUb1NlbmQuaG91c2UsXG4gICAgICAgICAgXCJob3VzaW5nXCI6IGRhdGFUb1NlbmQuaG91c2luZyxcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXG4gICAgICAgICAgXCJlbnRyYW5jZVwiOiBkYXRhVG9TZW5kLmVudHJhbmNlLFxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxuICAgICAgICB9LFxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXG4gICAgICAgICAgXCJtYWlsXCI6IGRhdGFUb1NlbmQuZW1haWwsXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxuICAgICAgICB9LFxuICAgICAgICBcInBlcnNvbnNDb3VudFwiOiBkYXRhVG9TZW5kLnBlcnNvbnNDb3VudFxuICAgICAgfTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2UuY2hlY2tTdHJlZXQoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICB9XG5cbiAgc3RyaW5nVG9OdW1iZXIoc3RyOm51bWJlciB8IGFueSk6bnVtYmVyIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2Ygc3RyKTtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiArc3RyO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0ciA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIsOQwp/DkMKww5HCgMOQwrDDkMK8w5DCtcORwoLDkcKAIGhvbWUgw5DCtMOQwr7DkMK7w5DCtsOQwrXDkMK9IMOQwrHDkcKLw5HCgsORwowgw5DCuMOQwrvDkMK4IHN0cmluZyDDkMK4w5DCu8OQwrggbnVtYmVyXCIpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hBbW91bnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXRBbW91bnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBhY3Rpb246YW55O1xuICBASW5wdXQoKSBkaXNoOmFueTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5jaGFuZ2VBbW91bnQodGhpcy5hY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQoYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnKyc6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0KFxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50ICsgMVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy0nOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcIsOQwpTDkMK4w5HCgMOQwrXDkMK6w5HCgsOQwrjDkMKyw5DCsCBTZXREaXNoQW1vdW50IMOQwr/DkMK+w5DCu8ORwoPDkcKHw5DCuMOQwrvDkMKwIMOQwrvDkMK+w5DCtsOQwr3DkMK+w5DCtSDDkMK3w5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSBhY3Rpb25cIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGlzaENhbGNdJ1xufSlcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgIGRpc2g6YW55O1xuICBASW5wdXQoKSAgYW1vdW50OmFueTtcbiAgQElucHV0KCkgIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpICB2YWxpZGF0ZTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpICBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgd2VpZ2h0VG90YWw7XG4gIGFtb3VudERpc2g7XG4gIHByaWNlO1xuICBhbW91bnRNb2RpZmlyZXM6YW55ID0ge307XG4gIHN0YXRlTW9kaWZpZXJzOmFueSA9IHt9O1xuICB0ZXN0Y291bnRDYWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsOkVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBcImRpc2gtY2FsY3VsYXRvclwiKTtcblxuXG4gICAgdGhpcy5hbW91bnREaXNoID0gdGhpcy5hbW91bnQ7XG5cbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5wcmljZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucHJpY2UsIFwiZGlzaC1wcmljZVwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJEaXNoKHRoaXMuZGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcih0aGlzLmRpc2gubW9kaWZpZXJzKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcmVuZGVyRGlzaChkaXNoOmFueSkge1xuICAgIC8qXG4gICAgIDxkaXYgY2xhc3M9XCJtYWluLWl0ZW1cIj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPlxuICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57e2Rpc2gubmFtZX19PC9kaXY+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1xdWFudGl0eVwiPlxuICAgICA8IS0tIGluY3JlYXNlIGJ1dHRvbi0tPlxuICAgICA8YSBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2J1dHRvblwiIChjbGljayk9XCJjaGFuZ2VBbW91bnRkaXNoKC0xKVwiPiYjODcyMjs8L2E+XG4gICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fY291bnRlclwiID57e2Ftb3VudERpc2h9fTwvc3Bhbj5cbiAgICAgPCEtLSBkZWNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgxKVwiPiYjeDJiOzwvYT5cbiAgICAgPC9kaXY+XG4gICAgIDxkaXYgY2xhc3M9XCJ3ZWlnaHQtcHJpY2VcIj5cbiAgICAge3tkaXNoLnByaWNlKmFtb3VudERpc2h9fSZuYnNwOyYjeDIwYmQ7XG4gICAgIDwvZGl2PlxuICAgICA8L2Rpdj5cblxuXG4gICAgICovXG4gICAgbGV0IG1haW5JdGVtID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobWFpbkl0ZW0sIFwiZGlzaC13cmFwZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIG1haW5JdGVtKTtcblxuICAgIGxldCBpdGVtTmFtZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIm5hbWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbU5hbWUpO1xuXG4gICAgbGV0IHRpdGxlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGl0bGUsIFwidGl0bGVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aXRsZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLm5hbWUpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWUsIHRpdGxlKTtcblxuICAgIGxldCB3ZWlnaHREaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIndlaWdodFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcImRpc2hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0RGlzaFdyYXBwZXIpO1xuXG4gICAgbGV0IHdlaWdodERpc2hWYWx1ZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodERpc2hWYWx1ZSwgXCJ2YWx1ZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgd2VpZ2h0RGlzaFZhbHVlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICh0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiIMOQwrMuXCJcbiAgICApO1xuICAgIGlmICh0aGlzLmRpc2gud2VpZ2h0ID09PSAwIHx8ICF0aGlzLmRpc2gud2VpZ2h0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodERpc2hWYWx1ZSwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodERpc2hXcmFwcGVyLCB3ZWlnaHREaXNoVmFsdWUpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmRpc2gucHJpY2UpO1xuICAgIGxldCBwcmljZURpc2hXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VEaXNoV3JhcHBlciwgXCJwcmljZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZURpc2hXcmFwcGVyLCB0aGlzLnByaWNlKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBwcmljZURpc2hXcmFwcGVyKTtcblxuICAgIGxldCBpdGVtUXVhbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtUXVhbnQsIFwicXVhbnRpdHlcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbVF1YW50KTtcblxuICAgIGxldCBhZGRCdXR0b24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwibWludXNcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhZGRCdXR0b24sIFwiaW5uZXJIVE1MXCIsIFwiJiM4NzIyO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhZGRCdXR0b24sIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUFtb3VudGRpc2goLTEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGFkZEJ1dHRvbik7XG5cbiAgICBsZXQgY291bnRlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjb3VudGVyLCBcInF1YW50aXR5X19jb3VudGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgY291bnRlcik7XG5cbiAgICBsZXQgbWludXNCdXR0b24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobWludXNCdXR0b24sIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJwbHVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobWludXNCdXR0b24sIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG1pbnVzQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKDEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgdGhpcy5wcmljZSxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSlcbiAgICAgICk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIG1pbnVzQnV0dG9uKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCB3ZWlnaHRUb3RhbFdyYXBwZXIpO1xuXG4gICAgbGV0IHdlaWdodFRvdGFsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmICh0aGlzLmRpc2gud2VpZ2h0ID09PSAwIHx8ICF0aGlzLmRpc2gud2VpZ2h0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInplcm9cIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0VG90YWwsIFwidmFsdWVcIik7XG4gICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKSAvLyBUT0RPOiB0b3RhbCBXZWlnaHRcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodFRvdGFsV3JhcHBlciwgd2VpZ2h0VG90YWwpO1xuICAgIHRoaXMud2VpZ2h0VG90YWwgPSB3ZWlnaHRUb3RhbDtcblxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHRoaXMucHJpY2UsXG4gICAgICBcImlubmVySFRNTFwiLFxuICAgICAgdGhpcy5nZW5lcmF0ZVByaWNlKGRpc2gucHJpY2UpXG4gICAgKTsgLy8gVE9ETzogw5DCv8ORwoDDkMKww5DCssOQwrjDkMK7w5HCjMOQwr3DkMK+IMORwoHDkcKHw5DCuMORwoLDkMKww5HCgsORwowgw5HChsOQwrXDkMK9w5HCg1xuICAgIGxldCBwcmljZVRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInByaWNlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZVRvdGFsV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VUb3RhbFdyYXBwZXIpO1xuICB9XG5cbiAgZ2VuZXJhdGVQcmljZShwcmljZURpc2gsIGFtb3VudD8sIG1vZGlmaXJlc1ByaWNlPykge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLnByaWNlICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgfSk7XG4gICAgbW9kU3VtID0gbW9kU3VtICogdGhpcy5hbW91bnREaXNoO1xuICAgIHJldHVybiAoXG4gICAgICBwcmljZURpc2ggKiB0aGlzLmFtb3VudERpc2ggKyBtb2RTdW0gKyAnPGRpdiBjbGFzcz1cImN1cnJlbmN5XCI+Jm5ic3A7JiN4MjBiZDs8L2Rpdj4nXG4gICAgKTtcbiAgfVxuXG4gIGdlbmVyYXRlVG90YWxXZWlnaHQoKSB7XG4gICAgbGV0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobW9kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gud2VpZ2h0ICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdICogMTAwMFxuICAgIH0pO1xuICAgIG1vZFN1bSA9IHBhcnNlRmxvYXQoKG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaCkudG9GaXhlZCgyKSk7XG4gICAgY29uc29sZS5sb2cobW9kU3VtLCB0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaClcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRpc2gud2VpZ2h0LCB0aGlzLmFtb3VudERpc2gpXG4gICAgbGV0IHdlaWdodCA9ICh0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaCkgKyBtb2RTdW07XG5cbiAgICByZXR1cm4gKHdlaWdodCkudG9GaXhlZCgwKSArIFwiIMOQwrMuIDxkaXYgY2xhc3M9J3NlcGFyYXRvcic+PC9kaXY+XCI7XG4gIH1cblxuICBpbm5lclRvdGFsV2VpZ2h0KHRvdGFsV2VpZ3RoRGl2KSB7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRvdGFsV2VpZ3RoRGl2LCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlVG90YWxXZWlnaHQoKSk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnRkaXNoKHZhbHVlKSB7XG4gICAgdGhpcy5hbW91bnREaXNoID0gdGhpcy5hbW91bnREaXNoICsgdmFsdWU7XG4gICAgaWYgKHRoaXMuYW1vdW50RGlzaCA8PSAwKSB7XG4gICAgICB0aGlzLmFtb3VudERpc2ggPSAxO1xuXG4gICAgfVxuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPj0gMTk5KSB7XG4gICAgICB0aGlzLmFtb3VudERpc2ggPSAxOTk7XG5cbiAgICB9XG4gICAgdGhpcy5hbW91bnREaXNoVG9BZGQuZW1pdCh0aGlzLmFtb3VudERpc2gpXG4gIH1cblxuICByZW5kZXIobW9kaWZpcmVzOmFueSkge1xuICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG5cbiAgICBpZiAobW9kaWZpcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBoID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiaDVcIik7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBoLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICBcIsOQwpogw5HCjcORwoLDkMK+w5DCvMORwoMgw5DCscOQwrvDkcKOw5DCtMORwoMgw5DCvMOQwr7DkMK2w5DCvcOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK4w5HCgsORwow6XCJcbiAgICAgICk7XG4gICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XG4gICAgfVxuXG5cblxuICAgIG1vZGlmaXJlcy5mb3JFYWNoKGVsZW1lbnRHcm91cCA9PiB7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdID0ge307XG5cbiAgICAgIGlmIChlbGVtZW50R3JvdXAuZGlzaCkge1xuICAgICAgICBsZXQgZ3JvdXBEaXYgPSB0aGlzLmdyb3VwRGl2KFwiw5DCnsOQwrTDkMK9w5DCvsORwofDkMK9w5HCi8OQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwrTDkMK1w5HCgMOQwrbDkMK4w5DCssOQwrDDkcKOw5HCgsORwoHDkcKPXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZ3JvdXBEaXYpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImVsZW1lbnRHcm91cFwiLGVsZW1lbnRHcm91cCk7XG4gICAgICAgIC8vVE9ETzogYWRkIHNpbmdsZSBtb2RpZmljYXRvciBsb2dpY1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnMpIHtcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcbiAgICAgICAgICBlbGVtZW50R3JvdXAuZ3JvdXAgPyBlbGVtZW50R3JvdXAuZ3JvdXAubmFtZSA6IFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwXCJcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcbiAgICAgICAgbGV0IG1vZEFyciA9IGVsZW1lbnRHcm91cC5jaGlsZE1vZGlmaWVycztcbiAgICAgICAgbW9kQXJyLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgbGV0IG1vZGlmaXJlRGl2ID0gdGhpcy5tb2RpZmlyZURpdihlbGVtZW50LCBlbGVtZW50R3JvdXAubW9kaWZpZXJJZCk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChncm91cERpdiwgbW9kaWZpcmVEaXYpO1xuICAgICAgICAgIGlmIChlbGVtZW50LmRlZmF1bHRBbW91bnQgPCAxKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobW9kaWZpcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBoID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBoLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICBcIjxwPiogw6LCgMKUIMOQwprDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK7w5DCtcOQwr3DkcKLw5HChSDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMKxw5DCu8ORwo7DkMK0w5DCsCDDkMK/w5HCgMOQwrjDkMK8w5DCtcOQwr3DkcKPw5DCtcORwoLDkcKBw5HCjyDDkMK0w5DCu8ORwo8gw5DCusOQwrDDkMK2w5DCtMOQwr7DkMK5IMOQwr/DkMK+w5HCgMORwobDkMK4w5DCuDwvcD5cIlxuICAgICAgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgZ3JvdXBEaXYobmFtZUdvcnVwKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJncm91cC1tb2RpZmlyZXMtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoXCJcIiArIG5hbWVHb3J1cCkpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICBtb2RpZmlyZURpdihlbGVtZW50LCBncm91cElkKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJhZGRpdGlvbmFsLWl0ZW1cIik7XG4gICAgdGhpcy5yZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBkaXYsIGdyb3VwSWQpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICByZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBtb2RpZmlyZURpdiwgZ3JvdXBJZCkge1xuXG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZScsIGVsZW1lbnQpO1xuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUgc2VsZWN0ZWRNb2RpZmllcnMnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgICAvLyDDkMKgw5DCtcOQwr3DkMK0w5DCtcORwoAgw5DCncOQwrDDkMK3w5DCssOQwrDDkMK9w5DCuMORwo8gw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgbGV0IGl0ZW1OYW1lRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWVEaXYsIFwiaXRlbS1uYW1lXCIpO1xuXG4gICAgbGV0IGxhYmVsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGFiZWwsIFwiZm9yXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtTmFtZURpdiwgbGFiZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobGFiZWwsIFwiaW5uZXJIVE1MXCIsIGVsZW1lbnQuZGlzaC5uYW1lKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1OYW1lRGl2KTtcblxuICAgIGxldCB3ZWlndGhNb2RpZmlyZVdyYXBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlndGhNb2RpZmlyZVdyYXBlciwgXCJsZWZ0LXdlaWdodC1tb2RpZmlyZS13cmFwZXJcIik7XG4gICAgbGV0IHdlaWdodE1vZGlmaXJlTGVmdCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZUxlZnQsICd3ZWlnaHQnKTtcbiAgICBpZiAoZWxlbWVudC5kaXNoLndlaWdodCA9PT0gMCB8fCBlbGVtZW50LmRpc2gud2VpZ2h0IDwgMCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZUxlZnQsICd6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnaW5uZXJIVE1MJywgKGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIgw5DCsy5cIiArICcnKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlTGVmdCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgd2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwrHDkMK7w5DCvsOQwrrDkMKwIMOQwrjDkMK3w5DCvMOQwrjDkMK9w5DCtcOQwr3DkMK4w5HCjyDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMKwIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIGxldCBpdGVtUXVhbnRpdHkgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLyogVE9ETzogw5DCvcORwoPDkMK2w5DCvcOQwr4gw5DCv8ORwoDDkMK+w5DCssOQwrXDkcKAw5DCuMORwoLDkcKMOlxuICAgICDDkMK0w5DCsCAwLDAsWzBdIC0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMOQwrLDkcKLw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrkgw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSBcbiAgICAgw5DCtMOQwrAgMCwxIFswXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgw5DCtMOQwrAgMCwxIFtkPT09MV0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcblxuICAgICDDkMK0w5DCsCAwLG5bZD0wXSAtIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiAwIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuICAgICDDkMK0w5DCsCAwLG5bZD4wPG5dIC0gw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOIGQsIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuXG5cblxuICAgICBrLG4gW2s8bixkPTBdIC0gayDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4hISEgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5HCh8ORwoLDkMK+w5DCscOQwrLDkcKLIMORwoHDkcKCw5DCvsORwo/DkMK7w5DCsCDDkcKGw5HCi8ORwoTDkcKAw5DCsCBrIMOQwrIgw5DCsMOQwrzDkMKww5HCg8OQwr3DkcKCLCDDkMK8w5DCsMOQwrrDkcKBIG4ow5DCscOQwr7DkMK7w5HCjMORwojDkMK1IG4gw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCvcOQwrjDkMKww5DCvMOQwrDDkMK7w5DCvsORwoHDkcKMKSDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy0gKMORwofDkMKww5HCgcORwoLDkMK9w5HCi8OQwrkgw5HCgcOQwrvDkcKDw5HCh8OQwrDDkMK5IMOQwrrDkMK+w5DCs8OQwrTDkMKwIGQ9MClcbiAgICAgayxuIFtrPG4sMDxkPTxuXS0gZCDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4hISEgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5HCh8ORwoLDkMK+w5DCscOQwrLDkcKLIMORwoHDkcKCw5DCvsORwo/DkMK7w5DCsCDDkcKGw5HCi8ORwoTDkcKAw5DCsCAxIMOQwrIgw5DCsMOQwrzDkMKww5HCg8OQwr3DkcKCLCDDkMK8w5DCsMOQwrrDkcKBIG4ow5DCscOQwr7DkMK7w5HCjMORwojDkMK1IG4gw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCvcOQwrjDkMKww5DCvMOQwrDDkMK7w5DCvsORwoHDkcKMKSDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cblxuXG5cbiAgICAgZGVmYXVsdEFtb3VudDowXG4gICAgIGhpZGVJZkRlZmF1bHRBbW91bnQ6ZmFsc2UgLy/DkMKfw5HCgMOQwrjDkMK3w5DCvcOQwrDDkMK6IMORwoLDkMK+w5DCs8OQwr4sIMORwofDkcKCw5DCviDDkMK9w5DCtSDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkMK+w5HCgsOQwr7DkMKxw5HCgMOQwrDDkMK2w5DCsMORwoLDkcKMIMORwoHDkMK/w5DCuMORwoHDkMK+w5DCuiDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyLCDDkMK1w5HCgcOQwrvDkMK4IMOQwrjDkcKFIMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5HCgMOQwrDDkMKyw5DCvcOQwr4gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5HCg1xuICAgICBtYXhBbW91bnQ6MFxuICAgICBtaW5BbW91bnQ6MFxuXG4gICAgICovXG5cbiAgICBsZXQgbWluID0gZWxlbWVudC5taW5BbW91bnQ7XG4gICAgbGV0IG1heCA9IGVsZW1lbnQubWF4QW1vdW50O1xuICAgIGxldCBkZWYgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XG5cbiAgICBjb25zb2xlLmluZm8oJ21pbiBtYXggZGVmJywgbWluLCBtYXgsIGRlZik7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMCAmJiBkZWYgPT09IDA6IC8vIDAsMCxbMF0gLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5DCssORwovDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuSDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgZmFsc2UsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDEgJiYgZGVmID09PSAwOiAvLyAwLDEgWzBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGZhbHNlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMTogLy8gMCwxIFtkIT0wXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEsIMOQwrLDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIHRydWUsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBtaW4gPT09IDEgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMTogLy8gMCwxIFtkIT0wXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEsIMOQwrLDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuVxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwiw5DCl8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCtMOQwrDDkMK1w5HCgsORwoHDkcKPIMOQwr3DkMKww5HCgcORwoLDkcKAw5DCvsOQwrnDkMK6w5DCtTpcIixcbiAgICAgICAgICBtaW4sXG4gICAgICAgICAgbWF4LFxuICAgICAgICAgIGRlZlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPD0gbWF4ICYmIGRlZiA+PSBtaW4gJiYgZGVmIDw9IG1heCAmJiBtYXggPiAxOiAvL2Qgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgMSDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG4gICAgICAgIHRoaXMucmVuZGVySW5wdXRCdXR0b24oZWxlbWVudCwgZ3JvdXBJZCwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdilcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgZWxlbWVudC5kaXNoLm5hbWUsXG4gICAgICAgICAgXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5HCgMOQwrXDkMK9w5DCtMOQwrXDkcKAw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrAsIMOQwrTDkMK7w5HCjyDDkMK3w5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCuTpcIixcbiAgICAgICAgICBtaW4sXG4gICAgICAgICAgbWF4LFxuICAgICAgICAgIGRlZlxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudC5tYXhBbW91bnQgPiAwICYmIGVsZW1lbnQubWluQW1vdW50ID4gMCkge1xuXG4gICAgfSBlbHNlIHtcblxuICAgIH1cbiAgICAvLyDDkMKgw5DCtcOQwr3DkMK0w5DCtcORwoAgw5DCscOQwrvDkMK+w5DCusOQwrAgw5HCgcORwoLDkMK+w5DCuMOQwrzDkMK+w5HCgcORwoLDkMK4IMOQwrggw5DCssOQwrXDkcKBw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICAvLyBsZXQgd2VpZ2h0UHJpY2VEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0UHJpY2VEaXYsICdtb2RhbC1wcmljZScpO1xuICAgIC8vIGxldCB3ZWlnaHQ7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLndlaWdodD4wKXtcbiAgICAvLyAgIHdlaWdodCA9ICBlbGVtZW50LmRpc2gud2VpZ2h0ICsgXCIgw5DCsyBcIjtcbiAgICAvLyB9XG4gICAgLy8gbGV0IHNsYXNoID0gXCIvIFwiO1xuICAgIC8vIGxldCBwcmljZTtcbiAgICAvLyBpZihlbGVtZW50LmRpc2gucHJpY2U+MCl7XG4gICAgLy8gICBwcmljZSA9IGVsZW1lbnQuZGlzaC5wcmljZSArIFwiJm5ic3A7JiN4MjBiZDtcIjtcbiAgICAvLyB9XG4gICAgLy8gbGV0IHdlaWdodEFuZFByaWNlSFRNTCA9ICh3ZWlnaHR8fCcnKSsod2VpZ2h0JiZwcmljZT8gc2xhc2ggOiAnJykrKCBwcmljZSB8fCAnJyk7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRQcmljZURpdiwgJ2lubmVySFRNTCcsIHdlaWdodEFuZFByaWNlSFRNTCk7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgd2VpZ2h0UHJpY2VEaXYpO1xuXG4gICAgbGV0IHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciwgXCJyaWdodC13ZWlnaHQtbW9kaWZpcmUtd3JhcGVyXCIpO1xuICAgIGxldCB3ZWlnaHRNb2RpZmlyZVJpZ2h0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlUmlnaHQsICd3ZWlnaHQnKTtcbiAgICBpZiAoZWxlbWVudC5kaXNoLndlaWdodCA9PT0gMCB8fCBlbGVtZW50LmRpc2gud2VpZ2h0IDwgMCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnemVybycpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodE1vZGlmaXJlUmlnaHQsICdpbm5lckhUTUwnLCAoZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDDkMKzLlwiICsgJzxkaXYgY2xhc3M9XCJzZXBhcmF0b3JcIj48L2Rpdj4nKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciwgd2VpZ2h0TW9kaWZpcmVSaWdodCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgcmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlcik7XG5cblxuICAgIGxldCBwcmljZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlLCBcIml0ZW0tcHJpY2VcIik7XG5cbiAgICBsZXQgcHJpY2VWYWx1ZTtcbiAgICBpZiAoZWxlbWVudC5kaXNoLnByaWNlID4gMCkge1xuICAgICAgcHJpY2VWYWx1ZSA9IGVsZW1lbnQuZGlzaC5wcmljZSArIFwiPGRpdiBjbGFzcyA9ICdjdXJyZW5jeSc+Jm5ic3A7JiN4MjBiZDs8L2Rpdj5cIjtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkocHJpY2UsIFwiaW5uZXJIVE1MXCIsIHByaWNlVmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgcHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlLCBcInplcm8tcHJpY2VcIik7XG4gICAgfVxuXG5cbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcblxuICB9XG5cbiAgcmVuZGVyQ2hlY2tib3goZWxlbWVudCwgaXNBY3RpdmUsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcblxuICAgIGxldCBpbnB1dCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJpZFwiLCBlbGVtZW50Lm1vZGlmaWVySWQpO1xuICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IDE7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAwO1xuXG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXQsIFwibW9kYWwtY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGlucHV0KTtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGlucHV0LCBcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmlkUmFkaW9Cb3goZ3JvdXBJZCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXSkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1ba2V5XSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGlucHV0LCAnY2hlY2tlZCcsICAgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyb3VwRGl2QmxvY2sgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwiaW5wdXRcIlxuICAgICAgICApO1xuXG4gICAgICAgIGdyb3VwRGl2QmxvY2suZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5pZCAhPSBlLnRhcmdldC5pZCkgZWxlbWVudC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlLnRhcmdldC5pZF0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gMTtcblxuICAgICAgfVxuXG5cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcblxuICB9XG5cbiAgcmVuZGVySW5wdXRCdXR0b24oZWxlbWVudCwgZ3JvdXBJZCwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdikge1xuXG4gICAgbGV0IHN0YXJ0QW1vdW50O1xuICAgIGlmIChlbGVtZW50LmRlZmF1bHRBbW91bnQgPiAwKSB7XG4gICAgICBzdGFydEFtb3VudCA9IGVsZW1lbnQuZGVmYXVsdEFtb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50Lm1pbkFtb3VudDtcblxuICAgIH1cbiAgICBpZiAoc3RhcnRBbW91bnQgPiAwKSB7XG5cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgYU1pbnVzRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFNaW51c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYU1pbnVzRGl2LCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGFNaW51c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYU1pbnVzRGl2LCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gK3RoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF07XG5cbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB2YWx1ZSAtIDE7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPCBlbGVtZW50Lm1pbkFtb3VudFxuICAgICAgKVxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZWxlbWVudC5taW5BbW91bnQ7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBzcGFuLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9PT0gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuICAgIGxldCBzcGFuID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHNwYW4sIFwiaXRlbS1xdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gc3RhcnRBbW91bnQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHNwYW4sXG4gICAgICBcImlubmVySFRNTFwiLFxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIHNwYW4pO1xuXG4gICAgbGV0IGFQbHVzRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFQbHVzRGl2LCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhUGx1c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImI3gyYjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGFQbHVzRGl2KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtUXVhbnRpdHkpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFQbHVzRGl2LCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gK3RoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF07XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgKyAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID5cbiAgICAgICAgZWxlbWVudC5tYXhBbW91bnQgJiZcbiAgICAgICAgZWxlbWVudC5tYXhBbW91bnQgIT0gMFxuICAgICAgKVxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZWxlbWVudC5tYXhBbW91bnQ7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBzcGFuLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPiAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldE1vZGlmaXJlcygpIHtcbiAgICBsZXQgbW9kaWZpZXJzVG9TZWxlY3QgPSBbXTtcblxuICAgIC8qaWYodGhpcy5zZWxlY3RlZE1vZGlmaWVycy5sZW5ndGggJiYgIShPYmplY3QudmFsdWVzKHRoaXMuc3RhdGVNb2RpZmllcnMpKS5sZW5ndGgpIHtcbiAgICAgIG1vZGlmaWVyc1RvU2VsZWN0ID0gdGhpcy5zZWxlY3RlZE1vZGlmaWVycztcbiAgICB9Ki9cblxuICAgIGxldCBtb2RpZmlyZXMgPSBbXTtcblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIG1vZGlmaWVyc1RvU2VsZWN0JywgbW9kaWZpZXJzVG9TZWxlY3QpO1xuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGJlZm9yZScsIHRoaXMuc3RhdGVNb2RpZmllcnMpO1xuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHNlbGVjdGVkTW9kaWZpZXJzIGJlZm9yZScsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuXG4gICAgZm9yIChsZXQgZ3JvdXBJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzKSB7XG4gICAgICBmb3IgKGxldCBtb2RpZmlyZUlkIGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0gfHwgbW9kaWZpZXJzVG9TZWxlY3QuZmluZChpdGVtID0+IGl0ZW0ubW9kaWZpZXJJZCA9PSBtb2RpZmlyZUlkKSkge1xuICAgICAgICAgIG1vZGlmaXJlcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBtb2RpZmlyZUlkLFxuICAgICAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVttb2RpZmlyZUlkXSxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzID0gbW9kaWZpcmVzO1xuXG4gICAgaWYgKHRoaXMuZGlzaC5tb2RpZmllcnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBbXTtcblxuICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgaWYgKGdyb3VwLnJlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXAubW9kaWZpZXJJZF0pIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE1vZGlmID0gW107XG4gICAgICAgICAgICBsZXQgbG9jYWxNb2RpZiA9IHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXAubW9kaWZpZXJJZF07IC8vLmZpbHRlcihlbGVtZW50PT5lbGVtZW50KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbW9kIGluIGxvY2FsTW9kaWYpIHtcbiAgICAgICAgICAgICAgaWYgKGxvY2FsTW9kaWYuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmW21vZF0pIHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTW9kaWYucHVzaChsb2NhbE1vZGlmW21vZF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTW9kaWYubGVuZ3RoIDwgZ3JvdXAubWluQW1vdW50KSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgICBib2R5OiBcIiDDkMKew5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5DCviDDkMKyw5HCi8OQwrHDkMK1w5HCgMOQwrjDkcKCw5DCtSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMORwosgw5DCuMOQwrcgw5DCusOQwrDDkcKCw5DCtcOQwrPDkMK+w5HCgMOQwrjDkMK4OiBcIiArXG4gICAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXAubmFtZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaCh7XG4gICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICB0aXRsZTogXCLDkMKSw5DCvcOQwrjDkMK8w5DCsMOQwr3DkMK4w5DCtVwiLFxuICAgICAgICAgICAgICBib2R5OiBcIiDDkMKew5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5DCviDDkMKyw5HCi8OQwrHDkMK1w5HCgMOQwrjDkcKCw5DCtSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMORwosgw5DCuMOQwrcgw5DCusOQwrDDkcKCw5DCtcOQwrPDkMK+w5HCgMOQwrjDkMK4OiBcIiArXG4gICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBbXSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBhZnRlcicsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuICB9XG5cbiAgLyogw5DCv8ORwoDDkMK+w5DCssOQwrXDkcKAw5HCj8OQwrXDkcKCIMORwoHDkMK+w5DCvsORwoLDkMKyw5DCtcORwoHDkcKCw5DCssOQwrXDkcKCIMOQwrvDkMK4IMOQwrzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMKxIMOQwrXDkcKBw5DCu8OQwrggMSDDkcKCw5DCviDDkcKAw5DCtcOQwrDDkMK7w5DCuMOQwrfDkcKDw5DCtcORwoIgw5DCv8OQwr7DkMKyw5DCtcOQwrTDkMK1w5DCvcOQwrjDkMK1IMORwoDDkMKww5DCtMOQwrjDkMK+w5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4LFxuICAgw5DCtcORwoHDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgMSDDkcKCw5DCviDDkMKzw5DCtcOQwr3DkMK1w5HCgMOQwrjDkcKAw5HCg8OQwrXDkcKCIMOQwrTDkMK1w5DCu8OQwrDDkMK1w5HCgiDDkMKyw5HCi8OQwrHDkMK+w5HCgCDDkMKyw5HCgcOQwrXDkcKFIMOQwr7DkcKBw5HCgsOQwrDDkMK7w5HCjMOQwr3DkcKLw5HChSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIMOQwr3DkMK1IMOQwrLDkMK+w5DCt8OQwrzDkMK+w5DCtsOQwr3DkcKLw5DCvCwgw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK/w5HCgMOQwrXDkMK0w5HCg8OQwr/DkcKAw5DCtcOQwrbDkMK0w5DCtcOQwr3DkMK4w5DCtSovXG5cbiAgaWRSYWRpb0JveChncm91cElkKTpib29sZWFuIHtcbiAgICBsZXQgY3VycmVudEdyb3VwID0gdGhpcy5kaXNoLm1vZGlmaWVycy5maW5kKHggPT4geC5tb2RpZmllcklkID09PSBncm91cElkKTtcbiAgICByZXR1cm4gY3VycmVudEdyb3VwLm1pbkFtb3VudCA9PT0gMSAmJiBjdXJyZW50R3JvdXAubWF4QW1vdW50ID09PSAxO1xuICB9XG5cbiAgLy8gw5DCn8ORwoDDkMK+w5DCssOQwrXDkcKAw5HCj8OQwrXDkcKCIMOQwrzDkMK4w5DCvcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCssOQwrrDkMK+w5HCgsOQwr7DkcKAw5HCi8OQwrUgw5DCscORwovDkMK7w5DCuCDDkMKyw5HCi8OQwrHDkcKAw5DCsMOQwr3DkcKLXG4gIGNoZWNrTWluQW1vdW50TW9kaWZpcmVzKGdyb3VwSWQsIG1vZGlmaXJlKSB7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vdGhpcy5kaXNoLm1vZGlmaWVycyA9W107XG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRlYm91bmNlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjaGVja291dF0nXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBjYXJ0VG90YWw6YW55O1xuXG4gIEBJbnB1dCgpIGJvbnVzZXM6IGFueTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZztcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIG9yZGVyRGF0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBub3RpZnlNZXRob2RJZDogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xuICAgICAgICAgIGlmKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuZGVsaXZlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIC8qZmlsdGVyKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtQ2hhbmdlS2V5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgMTogdGhpcy5sb2NhdGlvbklkLFxuICAgICAgICAgICAgMjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgICAgIDM6IHRoaXMuc3RyZWV0LFxuICAgICAgICAgICAgNDogdGhpcy5ob21lLFxuICAgICAgICAgICAgNTogdGhpcy5jYXJ0VG90YWwsXG4gICAgICAgICAgICA2OiB0aGlzLmJvbnVzZXMsXG4gICAgICAgICAgICA3OiB0aGlzLmRlbGl2ZXJ5LFxuICAgICAgICAgICAgODogdGhpcy5wYXltZW50TWV0aG9kSWRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkgPSBmb3JtQ2hhbmdlS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwqL1xuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja1N0cmVldCgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuZGVsaXZlcnkpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncORwoPDkMK2w5DCvcOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkMKww5DCtMORwoDDkMK1w5HCgScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMub3JkZXJEYXRlKSB7XG4gICAgICBkYXRhW1wib3JkZXJEYXRlXCJdID0gdGhpcy5vcmRlckRhdGU7XG4gICAgfVxuXG4gICAgaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcbiAgICB9XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuXG4gICAgaWYodGhpcy5ib251c2VzKSB7XG4gICAgICBkYXRhWydib251c2VzJ10gPSB0aGlzLmJvbnVzZXMubWFwKGIgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGIubmFtZSxcbiAgICAgICAgICBhbW91bnQ6IGIuYW1vdW50XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYocmVzdWx0LmFjdGlvbiAmJiByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoKSB7XG5cbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnQsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgLy9cInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICAvL1wibmFtZVwiOiB0aGlzLm5hbWVcbiAgICAgICAgXCJwaG9uZVwiOiAnKzc5OTk5OTk5OTk5JyxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWUgfHwgJ8OQwp/DkMK+w5DCu8ORwozDkMK3w5DCvsOQwrLDkMKww5HCgsOQwrXDkMK7w5HCjCdcbiAgICAgIH0sXG4gICAgICBcInBlcnNvbnNDb3VudFwiOiArdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG5cbiAgICAvLyBjb25zb2xlLmxvZygnRUVFRUVFRUVFRUVFJywgdGhpcy5kZWxpdmVyeSk7XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5vcmRlckRhdGUpIHtcbiAgICAgIGRhdGFbXCJvcmRlckRhdGVcIl0gPSB0aGlzLm9yZGVyRGF0ZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5vdGlmeU1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0NoZWNraW5nLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmNoZWNrU3RyZWV0VjIoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICByZXN1bHQgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSlcbiAgICAgICk7XG4gIH1cblxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIGlmKCFwaG9uZSkgcmV0dXJuICcnO1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hDb21tZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBjb21tZW50OmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLnNldENvbW1lbnQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7IH1cblxuICBzZXRDb21tZW50KCl7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ29tbWVudCh0aGlzLmRpc2guaWQsdGhpcy5jb21tZW50KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PnRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgZXJyPT50aGlzLmVycm9yLmVtaXQoZXJyKVxuICAgIClcbiAgICBcblxuICB9XG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKCFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZVwiO1xuXG5pbXBvcnQge1xuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGlzaC1jYWxjJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibmctY2FydC1kaXNoLWNhbGNcIiAqbmdJZj1cImRpc2hcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGlzaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1ib3hcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWRlc2NyaXB0aW9uLWJveFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW5ncmVkaWVudHNcIj57eyBkaXNoLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGlmaWVycy5jdXN0b20uZml4ZWQ7IGVsc2UgbW9kaWZpZXJGaXhlZFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiIFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJGaXhlZFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmN1c3RvbS5maXhlZCBhcyBtb2RpZmllclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWZpeGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiAhIW1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KGNoaWxkTW9kaWZpZXIsIDEsICdjaGVja2JveCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZE1vZGlmaWVyLmRpc2g/Lm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2UgfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyc1wiICpuZ0lmPVwibW9kaWZpZXJzLmJhc2VMaXN0Py5sZW5ndGhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItaGVhZGVyXCIgKm5nSWY9XCJtb2RpZmllci5ncm91cCBhcyBncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPj57eyBncm91cC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ib3hcIiAqbmdJZj1cIm1vZGlmaWVyLmRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBTaW5nbGUgbW9kaWZpZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICdzaW5nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY2hpbGRyZW5cIiAqbmdJZj1cIm1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzPy5sZW5ndGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBHcm91cCBtb2RpZmllciAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IGNoaWxkTW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogbW9kaWZpZXIubW9kaWZpZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdLnRvdGFsQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogbW9kaWZpZXIubWF4QW1vdW50IHx8IDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+w5DCmMOQwqLDkMKew5DCk8OQwp46PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyB0b3RhbFByaWNlfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI2Rpc2hJbWFnZVRlbXBsYXRlIGxldC1kaXNoPVwiZGlzaFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiPnt7IGRpc2gud2VpZ2h0ICogMTAwMCB9fSDDkMKzw5HCgDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDE7IGVsc2UgY291bnRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNoZWNrYm94VGVtcGxhdGU7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvdW50ZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ291bnRlclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogZ3JvdXBBbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogZ3JvdXBNYXhBbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jb3VudGVyXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50ICYmIGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50IHx8IGdyb3VwQW1vdW50IDw9IGdyb3VwTWluQW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50IC0gMSwgJ21pbnVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPi08L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCBbdmFsdWVdPVwiYW1vdW50XCIgcmVhZG9ubHkgI2lucHV0PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ICsgMSwgJ3BsdXMnKVwiXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+KzwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGVcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCI+XG4gICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibW9kaWZpZXItY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogYW1vdW50fVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgPyAwIDogMSwgJ2NoZWNrYm94JylcIj48L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgLmRpc2h7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246c3RhcnQ7YWxpZ24taXRlbXM6ZmxleC1zdGFydDtwYWRkaW5nLWJvdHRvbTozNHB4O2JvcmRlci1ib3R0b206MnB4IHNvbGlkICM5Njk2OTZ9LmRpc2ggLmRpc2gtaW1hZ2UtYm94e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjI1MHB4O2hlaWdodDoxNzBweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojZWVlO2JhY2tncm91bmQtc2l6ZTo1MCV9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94e21hcmdpbi1sZWZ0OjM0cHg7aGVpZ2h0OjE3MHB4O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LW9yaWVudDp2ZXJ0aWNhbDstd2Via2l0LWJveC1kaXJlY3Rpb246bm9ybWFsO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjstd2Via2l0LWJveC1hbGlnbjpzdHJldGNoO2FsaWduLWl0ZW1zOnN0cmV0Y2g7cGFkZGluZzo1cHggMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtbmFtZXtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI4cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzoyLjRweDtjb2xvcjojMGEwOTA5fS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1pbmdyZWRpZW50c3tmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwMDA7bWFyZ2luLXRvcDoxNXB4O292ZXJmbG93OmhpZGRlbjstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjF9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLXByaWNlLWJveHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyOy13ZWJraXQtYm94LXBhY2s6anVzdGlmeTtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtoZWlnaHQ6NDVweDttYXJnaW4tcmlnaHQ6NDlweH0uZGlzaC1pbWFnZXt3aWR0aDoyNTBweDtoZWlnaHQ6MTAwJTtib3JkZXItcmFkaXVzOjA7YmFja2dyb3VuZC1zaXplOmNvdmVyO2JhY2tncm91bmQtcG9zaXRpb246dG9wO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdH0ucmVzdWx0e21hcmdpbi10b3A6NDlweDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI0cHg7bGluZS1oZWlnaHQ6MjhweDtjb2xvcjojMGEwOTA5O3RleHQtYWxpZ246cmlnaHR9LnJlc3VsdCAucHJpY2V7bWFyZ2luLWxlZnQ6NzZweH0ubW9kaWZpZXJzIC5tb2RpZmllci1ncm91cHttYXJnaW4tdG9wOjI1cHg7cGFkZGluZy1ib3R0b206MjVweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlcnttYXJnaW4tYm90dG9tOjI1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1kZXNjcmlwdGlvbntmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLWJvdHRvbToycHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtiYWNrZ3JvdW5kLXNpemU6NTAlO21hcmdpbi1yaWdodDoyOHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94ey13ZWJraXQtYm94LWZsZXg6MTtmbGV4LWdyb3c6MTtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1vcmllbnQ6dmVydGljYWw7LXdlYmtpdC1ib3gtZGlyZWN0aW9uOm5vcm1hbDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveCAubW9kaWZpZXItZGlzaC1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3ggLm1vZGlmaWVyLWRpc2gtd2VpZ2h0e2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOTttYXJnaW4tdG9wOjEwcHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1wcmljZS1ib3h7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOTttYXJnaW4tcmlnaHQ6MTA1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1wcmljZS1ib3ggLnplcm8tcHJpY2V7ZGlzcGxheTpub25lfS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveHt3aWR0aDoxNTFweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5tb2RpZmllci1maXhlZHtib3JkZXI6MnB4IHNvbGlkICM3Njc2NzY7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1yYWRpdXM6MTVweDtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpzdHJldGNoO2FsaWduLWl0ZW1zOnN0cmV0Y2g7aGVpZ2h0OjQ1cHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVte2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O3dpZHRoOjE0MnB4O2hlaWdodDo0NXB4O2NvbG9yOiM3Njc2NzY7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO21hcmdpbi10b3A6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW0uc2VsZWN0ZWR7YmFja2dyb3VuZDojMGEwOTA5O2JvcmRlci1yYWRpdXM6MTVweDtjb2xvcjojZmZmfS5tb2RpZmllci1maXhlZCAuaXRlbTpub3QoLnNlbGVjdGVkKXtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY2hlY2tib3h7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kOiNlMGUwZTA7Ym9yZGVyLXJhZGl1czoxNXB4O2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ubW9kaWZpZXItY2hlY2tib3guc2VsZWN0ZWQ6YWZ0ZXJ7Y29udGVudDp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7IGJhc2U2NCwgUEhOMlp5QjNhV1IwYUQwaU1qZ2lJR2hsYVdkb2REMGlNamdpSUhacFpYZENiM2c5SWpBZ01DQXlPQ0F5T0NJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtQSEJoZEdnZ1pEMGlUVElnTVRNdU5Vd3hNUzR6TWpNeElESTJUREkySURJaUlITjBjbTlyWlQwaVlteGhZMnNpSUhOMGNtOXJaUzEzYVdSMGFEMGlNeTQxSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUx6NEtQQzl6ZG1jK0NnPT1cIil9Lm1vZGlmaWVyLWNvdW50ZXJ7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXI6bm9uZTt3aWR0aDoxNTFweDtoZWlnaHQ6NTBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZDojZTBlMGUwfS5tb2RpZmllci1jb3VudGVyLmRpc2FibGVke29wYWNpdHk6LjN9Lm1vZGlmaWVyLWNvdW50ZXI6bm90KC5kaXNhYmxlZCkgLm1pbnVzLmRpc2FibGVkLC5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5wbHVzLmRpc2FibGVke29wYWNpdHk6LjE1O2N1cnNvcjpkZWZhdWx0fS5tb2RpZmllci1jb3VudGVyIGlucHV0e2JvcmRlcjpub25lO2JhY2tncm91bmQ6MCAwO3dpZHRoOjEwMCU7cGFkZGluZzowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzLC5tb2RpZmllci1jb3VudGVyIC5wbHVze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjE4cHg7Y29sb3I6IzBhMDkwOTtwYWRkaW5nOjAgMzBweDtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY291bnRlciAubWludXM6aG92ZXIsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXM6aG92ZXJ7Y29sb3I6IzAwMH0ubW9kaWZpZXItY291bnRlciAubWludXM6YWN0aXZlLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmFjdGl2ZXtjb2xvcjojY2MwMDA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cy5sb2FkaW5nLC5tb2RpZmllci1jb3VudGVyIC5wbHVzLmxvYWRpbmd7b3BhY2l0eTouMn0ubW9kaWZpZXItY291bnRlciAubWludXN7bGVmdDowfS5tb2RpZmllci1jb3VudGVyIC5wbHVze3JpZ2h0OjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSAgZGlzaDphbnk7XG4gIEBJbnB1dCgpICBhbW91bnQ6YW55O1xuICBASW5wdXQoKSAgc2VsZWN0ZWRNb2RpZmllcnM6YW55O1xuICBAT3V0cHV0KCkgIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgIGFtb3VudERpc2hUb0FkZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtb2RpZmllcnMgPSB7XG4gICAgaW5kZXhCeUlkOiB7fSxcbiAgICBjdXN0b206IHtcbiAgICAgIGZpeGVkOiBudWxsXG4gICAgfSxcbiAgICBiYXNlTGlzdDogW10sXG4gIH07XG5cbiAgdG90YWxQcmljZTogbnVtYmVyO1xuICBtb2RpZmllcnNWYWx1ZVRyZWU6IGFueSA9IHt9O1xuICBpbWFnZVVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UsXG4gICAgQEluamVjdCgnSW1hZ2VVcmwnKSBpbWFnZVVybDpzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMoW10sIFtdKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubW9kaWZpZXJzID0ge1xuICAgICAgaW5kZXhCeUlkOiB7fSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBmaXhlZDogbnVsbFxuICAgICAgfSxcbiAgICAgIGJhc2VMaXN0OiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUgPSB7fTtcbiAgICBpZih0aGlzLmRpc2ggJiYgdGhpcy5kaXNoLm1vZGlmaWVycykge1xuICAgICAgZm9yKGxldCBtb2RpZmllciBvZiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBtb2RpZmllclR5cGUgPSBudWxsO1xuICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgLy8gQ2hlY2sgQ3VzdG9tIG1vZGlmaWVycyAobGlrZSBQaXp6YSBTaXplKVxuICAgICAgICBpZighdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkXG4gICAgICAgICAgJiYgIXRoaXMubW9kaWZpZXJzLmJhc2VMaXN0Lmxlbmd0aFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoID09IDJcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gbW9kaWZpZXIubWF4QW1vdW50XG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDEpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIFBpenphIFNpemUgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnY3VzdG9tJztcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWQgPSBtb2RpZmllcjtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0N1c3RvbSBGaXhlZCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5ncm91cFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMuZmluZChtID0+IG0uZGlzaCkpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIEJhc2UgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnZ3JvdXAnO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnR3JvdXAgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZGlzaCkge1xuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdzaW5nbGUnO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnU2luZ2xlIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGJyb2tlbiBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdicm9rZW4nO1xuICAgICAgICAgIGNvbnNvbGUud2FybignQnJva2VuIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlc1xuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgICAgICAgIGZvcihsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVycykge1xuICAgICAgICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXI7XG4gICAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllci5kZWZhdWx0QW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAobW9kaWZpZXIubW9kaWZpZXJJZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgICAgICAgaWYoIXRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSl7XG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XG4gICAgICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxuICAgICAgLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyBiKTtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxQcmljZSgpIHtcbiAgICBsZXQgdG90YWxQcmljZSA9IHRoaXMuZGlzaC5wcmljZSB8fCAwO1xuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgICAgICBpZihhbW91bnQpIHtcbiAgICAgICAgICBjb25zdCBtb2RpZmllciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXTtcbiAgICAgICAgICBpZihtb2RpZmllciAmJiBtb2RpZmllci5kaXNoICYmIG1vZGlmaWVyLmRpc2gucHJpY2UpIHtcbiAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gbW9kaWZpZXIuZGlzaC5wcmljZSAqIGFtb3VudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy50b3RhbFByaWNlID0gdG90YWxQcmljZTtcbiAgICB0aGlzLnNldE1vZGlmaWVycygpO1xuICB9XG5cbiAgZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyb3VwSWQ6IChtb2RpZmllci5kaXNoICYmIG1vZGlmaWVyLmRpc2guZ3JvdXBJZCkgPyBtb2RpZmllci5kaXNoLmdyb3VwSWQgOiB1bmRlZmluZWQsXG4gICAgICBtb2RpZmllcklkOiBtb2RpZmllci5tb2RpZmllcklkXG4gICAgfVxuICB9XG5cbiAgY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXI6IGFueSwgYW1vdW50OiBudW1iZXIsIG9wZXJhdGlvbjogc3RyaW5nKSB7XG4gICAgaWYoYW1vdW50IDwgMCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcbiAgICAgICAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuXG4gICAgLy8gRm9yIGNoZWNrYm94XG4gICAgaWYob3BlcmF0aW9uID09ICdjaGVja2JveCcgJiYgZ3JvdXBJZCAhPT0gJ3NpbmdsZScpIHtcbiAgICAgIC8vIElmIGl0IHdvcmsgbGlrZSByYWRpbyBidXR0b25cbiAgICAgIGlmKGdyb3VwTWluQW1vdW50IDw9IDEgJiYgZ3JvdXBNYXhBbW91bnQgPT0gMSkge1xuICAgICAgICBpZihhbW91bnQgPCBncm91cE1pbkFtb3VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgemVybyBhbW91bnQgZm9yIGFsbCBvcHRpb25zXG4gICAgICAgIGZvcihsZXQgaXRlbU1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVtpdGVtTW9kaWZpZXJJZF0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgICB9XG4gICAgICAvLyBOb3QgYWN0aW9uIG5lZWRlZCBhZnRlclxuICAgICAgaWYoYW1vdW50ID09IDApIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBHcm91cCBhbW91bnQgbGltaXRzXG4gICAgaWYoZ3JvdXBNaW5BbW91bnQgfHwgZ3JvdXBNYXhBbW91bnQpIHtcbiAgICAgIC8vIFRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgICAgY29uc3QgZ3JvdXBBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCAtIHByZXZpb3VzQW1vdW50ICsgYW1vdW50O1xuXG4gICAgICBpZihncm91cEFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1pbiAke2dyb3VwTWluQW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICAgICAgJ8OQwp7DkMKzw5HCgMOQwrDDkMK9w5DCuMORwofDkMK1w5DCvcOQwrjDkMK1JyxcbiAgICAgICAgICAgIGDDkMKcw5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMK0w5DCu8ORwo8gw5DCs8ORwoDDkcKDw5DCv8OQwr/DkcKLXG4gICAgICAgICAgICDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtIMOQwr3DkMK1IMOQwrzDkMK1w5DCvcOQwrXDkMK1ICR7Z3JvdXBNaW5BbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZ3JvdXBBbW91bnQgPiBncm91cE1heEFtb3VudCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfDkMKew5DCs8ORwoDDkMKww5DCvcOQwrjDkcKHw5DCtcOQwr3DkMK4w5DCtScsXG4gICAgICAgICAgICBgw5DCnMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCtMOQwrvDkcKPIMOQwrPDkcKAw5HCg8OQwr/DkMK/w5HCi1xuICAgICAgICAgICAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDDkMK9w5DCtSDDkMKxw5DCvsOQwrvDkMK1w5DCtSAke2dyb3VwTWF4QW1vdW50fWBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDSGVjayBNb2RpZmllciBhbW91bnQgbGltaXRzXG4gICAgaWYobWluQW1vdW50IHx8IG1heEFtb3VudCkge1xuICAgICAgaWYoYW1vdW50IDwgbWluQW1vdW50KSB7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XG4gICAgICAgICAgY2FzZSAncGx1cyc6IGFtb3VudCA9IG1pbkFtb3VudDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWludXMnOiBhbW91bnQgPSAwOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoYW1vdW50ID4gbWF4QW1vdW50KSB7XG4gICAgICAgIGFtb3VudCA9IG1heEFtb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXSA9IGFtb3VudDtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgfVxuXG4gIHNldE1vZGlmaWVycygpIHtcbiAgICBjb25zdCBtb2RpZmllcnNUb1NldCA9IFtdO1xuXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG4gICAgICAgIGlmKGFtb3VudCkge1xuXG4gICAgICAgICAgbW9kaWZpZXJzVG9TZXQucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpZXJJZCxcbiAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCAhPT0gJ3NpbmdsZScgPyBncm91cElkIDogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKG1vZGlmaWVyc1RvU2V0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmllcnNUb1NldCwgW10pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG5cbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcblxuICAgICAgY29uc3QgZ3JvdXBNb2RpZmllciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXTtcbiAgICAgIGlmKGdyb3VwTW9kaWZpZXIucmVxdWlyZWQpIHtcbiAgICAgICAgY29uc3QgdG90YWxBbW91bnRJbkdyb3VwID0gdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA8IGdyb3VwTW9kaWZpZXIubWluQW1vdW50KSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtaW4gYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWluQW1vdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA+IGdyb3VwTW9kaWZpZXIubWF4QW1vdW50KSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtYXggYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWF4QW1vdW50fWApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAvL1xuICAgICAgLy99XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KGlzVmFsaWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZSxcbl07XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIERpc2hDYWxjQ29tcG9uZW50XG5dO1xuXG5jb25zdCBNT0RVTEVTID0gW1xuICBDb21tb25Nb2R1bGVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNT0RVTEVTXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtEaXNoQ2FsY0NvbXBvbmVudCBhcyDDicK1aX0gZnJvbSAnLi9saWIvY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudCc7XG5leHBvcnQge0FkZERpc2hUb0NhcnREaXJlY3RpdmUgYXMgw4nCtWF9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtBbW91bnRDYXJ0RGlyZWN0aXZlIGFzIMOJwrVifSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0NoZWNrb3V0RGlyZWN0aXZlIGFzIMOJwrVofSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0RlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIGFzIMOJwrVjfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmV4cG9ydCB7RGlzaENhbGNEaXJlY3RpdmUgYXMgw4nCtWV9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XG5leHBvcnQge09yZGVyQ2FydFVzZXJEaXJlY3RpdmUgYXMgw4nCtWR9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG5leHBvcnQge1NldEFtb3VudERpcmVjdGl2ZSBhcyDDicK1Z30gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5leHBvcnQge1NldERpc2hDb21tZW50RGlyZWN0aXZlIGFzIMOJwrVmfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJzsiXSwibmFtZXMiOlsidHNsaWJfMSIsIm5nX3Jlc3RvY2FydF9zZXJ2aWNlXzEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWNBO1lBWUUsNEJBQW9CLEdBQWMsRUFDZCxPQUFzQjtnQkFEMUMsaUJBU0M7Z0JBVG1CLFFBQUcsR0FBSCxHQUFHLENBQVc7Z0JBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtnQkFOMUMsb0JBQWUsR0FBRyxJQUFJLHNCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBTzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxzQkFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksc0JBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFaEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7O21CQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUEsRUFBQyxDQUFDO2FBQ3ZFOzs7O1lBRUQsMkNBQWM7OztnQkFBZDtvQkFBQSxpQkFVQztvQkFUQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDL0IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO3dCQUNmLElBQUksQ0FBQyxHQUFHOzZCQUNMLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs2QkFDbEMsU0FBUzs7O3VCQUNSLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxD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QUcsRUFBRSxDQUFDOzRCQUFDLE1BQU07d0JBQzlCLEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO3dCQUN4RCxLQUFLLENBQUM7NEJBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDOzRCQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQUMsU0FBUzt3QkFDakQsS0FBSyxDQUFDOzRCQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDOzRCQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsU0FBUzt3QkFDakQ7NEJBQ0ksSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQUMsU0FBUzs2QkFBRTs0QkFDNUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsTUFBTTs2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QUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzFJLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSTtZQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFFO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQUUsRUFBRTtRQUNsRixTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssWUFBWSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hILFNBQVMsT0FBTyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDbEQsU0FBUyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNsRCxTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTTtZQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUN0RixDQUFDO0FBRUQsYUFBZ0IsZ0JBQWdCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDVCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsY0FBYyxPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLFFBQVEsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRTtJQUNuSixDQUFDO0FBRUQsYUFBZ0IsYUFBYSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhO1lBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxjQUFjLE9BQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqTixTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2hLLFNBQVMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUMsSUFBSSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFO0lBQ2hJLENBQUM7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