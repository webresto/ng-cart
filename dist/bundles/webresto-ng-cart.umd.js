(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-cart', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core'], factory) :
    (factory((global.webresto = global.webresto || {}, global.webresto['ng-cart'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,null));
}(this, (function (exports,i0,rxjs,operators,i1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*  TODO: В етом класе еще надо реализовать логику проверки доступности разных типов зхранилищь, но пока нету фикса нужного нам модуля ето
     затруднательно прийдется ждать.  */
    var NgRestoCartService = /** @class */ (function () {
        function NgRestoCartService(net, eventer) {
            var _this = this;
            this.net = net;
            this.eventer = eventer;
            this.OrderFormChange = new rxjs.BehaviorSubject(null);
            this.cart = new rxjs.BehaviorSubject({});
            this.modifires = new rxjs.BehaviorSubject([]);
            this.modifiresMessage = new rxjs.BehaviorSubject([]);
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
                }).pipe(operators.tap(( /**
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
                    _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
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
                    .pipe(operators.tap(( /**
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
                    .pipe(operators.tap(( /**
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
                        _this.eventer.emitMessageEvent(new i1.EventMessage(res.message.type, res.message.title, res.message.body));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgRestoCartService.ctorParameters = function () {
            return [
                { type: i1.NetService },
                { type: i1.EventerService }
            ];
        };
        /** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
        return NgRestoCartService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AddDishToCartDirective = /** @class */ (function () {
        function AddDishToCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
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
                /** @type {?} */
                var data = {
                    "dishId": dishID,
                    "amount": amount,
                    "cartId": undefined,
                    "modifiers": this.modifires,
                    "comment": this.comment
                };
                //console.log("другие даные", data)
                if (this.cart.cartId)
                    data.cartId = this.cart.cartId;
                this.cartService.addDishToCart(data);
            };
        AddDishToCartDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[addToCart]'
                    },] },
        ];
        /** @nocollapse */
        AddDishToCartDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        AddDishToCartDirective.propDecorators = {
            dish: [{ type: i0.Input }],
            amountDish: [{ type: i0.Input }],
            comment: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return AddDishToCartDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: i0.Directive, args: [{
                        selector: '[amountCart]'
                    },] },
        ];
        /** @nocollapse */
        AmountCartDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService },
                { type: i0.Renderer2 },
                { type: i0.ElementRef }
            ];
        };
        return AmountCartDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: i0.Directive, args: [{
                        selector: '[deleteFromCart]'
                    },] },
        ];
        /** @nocollapse */
        DeleteFromCartDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        DeleteFromCartDirective.propDecorators = {
            dish: [{ type: i0.Input }],
            amountDish: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return DeleteFromCartDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OrderCartUserDirective = /** @class */ (function () {
        function OrderCartUserDirective(cartService) {
            this.cartService = cartService;
            this.requiredFields = ["name", "phone", "street", "house"];
            this.checkerFields = new rxjs.BehaviorSubject(undefined);
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
            { type: i0.Directive, args: [{
                        selector: '[orderCart]'
                    },] },
        ];
        /** @nocollapse */
        OrderCartUserDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        OrderCartUserDirective.propDecorators = {
            orderCart: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return OrderCartUserDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: i0.Directive, args: [{
                        selector: '[setDishAmount]'
                    },] },
        ];
        /** @nocollapse */
        SetAmountDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        SetAmountDirective.propDecorators = {
            action: [{ type: i0.Input }],
            dish: [{ type: i0.Input }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return SetAmountDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DishCalcDirective = /** @class */ (function () {
        function DishCalcDirective(renderer, el, cartService) {
            this.renderer = renderer;
            this.el = el;
            this.cartService = cartService;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[dishCalc]'
                    },] },
        ];
        /** @nocollapse */
        DishCalcDirective.ctorParameters = function () {
            return [
                { type: i0.Renderer2 },
                { type: i0.ElementRef },
                { type: NgRestoCartService }
            ];
        };
        DishCalcDirective.propDecorators = {
            dish: [{ type: i0.Input }],
            amount: [{ type: i0.Input }],
            selectedModifiers: [{ type: i0.Input }],
            validate: [{ type: i0.Output }],
            amountDishToAdd: [{ type: i0.Output }]
        };
        return DishCalcDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DishCalcProDirective = /** @class */ (function () {
        function DishCalcProDirective(cartService) {
            this.cartService = cartService;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
            this.amountModifires = {};
            this.stateModifiers = {};
        }
        /**
         * @return {?}
         */
        DishCalcProDirective.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        /**
         * @return {?}
         */
        DishCalcProDirective.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.validate.emit(true);
                this.cartService.setModifires([], []);
            };
        DishCalcProDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[dishCalcPro]'
                    },] },
        ];
        /** @nocollapse */
        DishCalcProDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        DishCalcProDirective.propDecorators = {
            dish: [{ type: i0.Input }],
            amount: [{ type: i0.Input }],
            selectedModifiers: [{ type: i0.Input }],
            validate: [{ type: i0.Output }],
            amountDishToAdd: [{ type: i0.Output }]
        };
        return DishCalcProDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CheckoutDirective = /** @class */ (function () {
        function CheckoutDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.isChecking = new i0.EventEmitter();
            this.cartService
                .userCart()
                .subscribe(( /**
         * @param {?} cart
         * @return {?}
         */function (cart) { return _this.cart = cart; }));
            this.cartService.OrderFormChange
                .pipe(operators.filter(( /**
         * @return {?}
         */function () {
                //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
                if (_this.locationId || (_this.streetId || _this.street) && _this.home || _this.delivery) {
                    return true;
                }
            })), operators.filter(( /**
             * @return {?}
             */function () {
                /** @type {?} */
                var formChangeKey = JSON.stringify({
                    1: _this.locationId,
                    2: _this.streetId,
                    3: _this.street,
                    4: _this.home,
                    5: _this.cartTotal,
                    6: _this.bonuses,
                    7: _this.delivery
                });
                if (formChangeKey !== _this.lastFormChangeKey) {
                    _this.lastFormChangeKey = formChangeKey;
                    return true;
                }
            })), operators.debounceTime(1000))
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
                    "comment": comment + "\r\n\u041E\u043F\u043B\u0430\u0442\u0430: " + paymentMethod,
                    "customer": {
                        "phone": this.preparePhone(this.phone),
                        "mail": this.email,
                        "name": this.name
                    },
                    "personsCount": this.personsCount
                };
                if (this.paymentMethodId) {
                    data["paymentMethodId"] = this.paymentMethodId;
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
                    .pipe(operators.tap(( /**
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
                    "comment": comment + "\r\n\u041E\u043F\u043B\u0430\u0442\u0430: " + paymentMethod,
                    "customer": {
                        //"phone": this.preparePhone(this.phone),
                        //"name": this.name
                        "phone": '+79999999999',
                        "mail": this.email,
                        "name": 'Васа'
                    },
                    "personsCount": this.personsCount
                };
                // console.log('EEEEEEEEEEEE', this.delivery);
                data["selfDelivery"] = this.delivery;
                if (this.paymentMethodId) {
                    data["paymentMethodId"] = this.paymentMethodId;
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
            { type: i0.Directive, args: [{
                        selector: '[checkout]'
                    },] },
        ];
        /** @nocollapse */
        CheckoutDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        CheckoutDirective.propDecorators = {
            cartTotal: [{ type: i0.Input }],
            bonuses: [{ type: i0.Input }],
            name: [{ type: i0.Input }],
            email: [{ type: i0.Input }],
            phone: [{ type: i0.Input }],
            delivery: [{ type: i0.Input }],
            locationId: [{ type: i0.Input }],
            street: [{ type: i0.Input }],
            streetId: [{ type: i0.Input }],
            home: [{ type: i0.Input }],
            housing: [{ type: i0.Input }],
            apartment: [{ type: i0.Input }],
            entrance: [{ type: i0.Input }],
            doorphone: [{ type: i0.Input }],
            floor: [{ type: i0.Input }],
            paymentMethod: [{ type: i0.Input }],
            paymentMethodId: [{ type: i0.Input }],
            personsCount: [{ type: i0.Input }],
            comment: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            isChecking: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return CheckoutDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SetDishCommentDirective = /** @class */ (function () {
        function SetDishCommentDirective(cartService) {
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
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
            { type: i0.Directive, args: [{
                        selector: '[setDishComment]'
                    },] },
        ];
        /** @nocollapse */
        SetDishCommentDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        SetDishCommentDirective.propDecorators = {
            comment: [{ type: i0.Input }],
            dish: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return SetDishCommentDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DishCalcComponent = /** @class */ (function () {
        function DishCalcComponent() {
        }
        /**
         * @return {?}
         */
        DishCalcComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () { };
        DishCalcComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'dish-calc',
                        template: "<div>DISH CALC COMPONENT</div>\n",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        DishCalcComponent.ctorParameters = function () { return []; };
        return DishCalcComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DIRECTIVES = [
        AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        DishCalcProDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective,
    ];
    /** @type {?} */
    var COMPONENTS = [
        DishCalcComponent
    ];
    /** @type {?} */
    var MODULES = [];
    var NgRestoCartModule = /** @class */ (function () {
        function NgRestoCartModule() {
        }
        NgRestoCartModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [MODULES],
                        providers: [],
                        declarations: [DIRECTIVES, COMPONENTS],
                        exports: [DIRECTIVES, COMPONENTS]
                    },] },
        ];
        return NgRestoCartModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgRestoCartService = NgRestoCartService;
    exports.NgRestoCartModule = NgRestoCartModule;
    exports.ɵj = DishCalcComponent;
    exports.ɵa = AddDishToCartDirective;
    exports.ɵb = AmountCartDirective;
    exports.ɵi = CheckoutDirective;
    exports.ɵc = DeleteFromCartDirective;
    exports.ɵf = DishCalcProDirective;
    exports.ɵe = DishCalcDirective;
    exports.ɵd = OrderCartUserDirective;
    exports.ɵh = SetAmountDirective;
    exports.ɵg = SetDishCommentDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctY2FydC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kaXNoLWNhbGMtcHJvLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvY2hlY2tvdXQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9uZy1jYXJ0Lm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBCZWhhdmlvclN1YmplY3QsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgTmV0U2VydmljZSxcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9vcmRlcic7XG4vKiAgVE9ETzogw5DCkiDDkMK1w5HCgsOQwr7DkMK8IMOQwrrDkMK7w5DCsMORwoHDkMK1IMOQwrXDkcKJw5DCtSDDkMK9w5DCsMOQwrTDkMK+IMORwoDDkMK1w5DCsMOQwrvDkMK4w5DCt8OQwr7DkMKyw5DCsMORwoLDkcKMIMOQwrvDkMK+w5DCs8OQwrjDkMK6w5HCgyDDkMK/w5HCgMOQwr7DkMKyw5DCtcORwoDDkMK6w5DCuCDDkMK0w5DCvsORwoHDkcKCw5HCg8OQwr/DkMK9w5DCvsORwoHDkcKCw5DCuCDDkcKAw5DCsMOQwrfDkMK9w5HCi8ORwoUgw5HCgsOQwrjDkMK/w5DCvsOQwrIgw5DCt8ORwoXDkcKAw5DCsMOQwr3DkMK4w5DCu8OQwrjDkcKJw5HCjCwgw5DCvcOQwr4gw5DCv8OQwr7DkMK6w5DCsCDDkMK9w5DCtcORwoLDkcKDIMORwoTDkMK4w5DCusORwoHDkMKwIMOQwr3DkcKDw5DCtsOQwr3DkMK+w5DCs8OQwr4gw5DCvcOQwrDDkMK8IMOQwrzDkMK+w5DCtMORwoPDkMK7w5HCjyDDkMK1w5HCgsOQwr5cbiDDkMK3w5DCsMORwoLDkcKAw5HCg8OQwrTDkMK9w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5DCviDDkMK/w5HCgMOQwrjDkMK5w5DCtMOQwrXDkcKCw5HCgcORwo8gw5DCtsOQwrTDkMKww5HCgsORwowuICAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydFNlcnZpY2Uge1xuICBjYXJ0SUQ6c3RyaW5nO1xuICBjYXJ0OkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtb2RpZmlyZXM6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIE9yZGVyRm9ybUNoYW5nZSA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG5cbiAgbW9kaWZpcmVzTWVzc2FnZTpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbWVzc2FnZXM6RXZlbnRNZXNzYWdlW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBuZXQ6TmV0U2VydmljZSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBldmVudGVyOkV2ZW50ZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0ID0gbmV3IEJlaGF2aW9yU3ViamVjdCh7fSk7XG4gICAgdGhpcy5tb2RpZmlyZXMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KFtdKTtcblxuICAgIHRoaXMuaW5pdGlhbFN0b3JhZ2UoKTtcblxuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZS5zdWJzY3JpYmUobWVzc2FnZXMgPT4gdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzKTtcbiAgfVxuXG4gIGluaXRpYWxTdG9yYWdlKCkge1xuICAgIHRoaXMuY2FydElEID0gdGhpcy5nZXRDYXJ0SWQoKTtcbiAgICBpZiAodGhpcy5jYXJ0SUQpIHtcbiAgICAgIHRoaXMubmV0XG4gICAgICAgIC5nZXQoJy9jYXJ0P2NhcnRJZD0nICsgdGhpcy5jYXJ0SUQpXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgY2FydCA9PiB0aGlzLmNhcnQubmV4dChjYXJ0LmNhcnQpLFxuICAgICAgICAgIGVycm9yID0+IHRoaXMucmVtb3ZlQ2FydElkKClcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJ0SWQoKTpzdHJpbmcge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydElEJyk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0KGRhdGEpIHtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCkcOQwrvDkcKOw5DCtMOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK7w5DCtcOQwr3DkMK+IMOQwrIgw5DCusOQwr7DkcKAw5DCt8OQwrjDkMK9w5HCgycpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpjDkMK3w5DCvMOQwrXDkMK9w5DCtcOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICAgKTsqL1xuXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrjDkMK3w5DCvMOQwrXDkMK9w5DCuMORwoLDkcKMIMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcbiAgfVxuXG4gIHNldERpc2hDb21tZW50KGRpc2hJZCwgY29tbWVudCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXRjb21tZW50Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudFxuICAgIH0pLnBpcGUodGFwKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCuMOQwrfDkMK8w5DCtcOQwr3DkMK4w5HCgsORwowgw5DCusOQwr7DkMK8w5DCtcOQwr3DkcKCw5DCsMORwoDDkMK4w5DCuScpXG4gICAgICAgIClcbiAgICAgIH1cbiAgICApKVxuXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpHDkMK7w5HCjsOQwrTDkMK+IMORwoPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5HCg8OQwrTDkMKww5DCu8OQwrXDkMK9w5DCvicpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMORwoPDkMK0w5DCsMOQwrvDkMK4w5HCgsORwowgw5DCscOQwrvDkcKOw5DCtMOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcblxuICB9XG5cbiAgY2hlY2tvdXRDYXJ0KGRhdGEpIHtcbiAgICBsZXQgb3JkZXI6T3JkZXIgPSB7XG4gICAgICBjYXJ0SWQ6IHRoaXMuY2FydElELFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICBzdHJlZXRJZDogZGF0YS5zdHJlZXQuaWQsXG4gICAgICAgIGhvbWU6IGRhdGEuaG91c2UsXG4gICAgICAgIGhvdXNpbmc6IGRhdGEuaG91c2luZyxcbiAgICAgICAgLy8gaW5kZXg6IFwiMTI3OFwiLFxuICAgICAgICBlbnRyYW5jZTogZGF0YS5lbnRyYW5jZSxcbiAgICAgICAgZmxvb3I6IGRhdGEuZmxvb3IsXG4gICAgICAgIGFwYXJ0bWVudDogZGF0YS5hcGFydG1lbnRcbiAgICAgIH0sXG5cbiAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgIHBob25lOiBkYXRhLnBob25lLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIG1haWw6IGRhdGEuZW1haWwgfHwgdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5vcmRlckNhcnQob3JkZXIpO1xuXG4gIH1cblxuICBvcmRlckNhcnQoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvb3JkZXInLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzdWx0LmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlc3VsdC5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzdWx0LmNhcnQuY2FydElkO1xuICAgICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpfDkMKww5DCusOQwrDDkMK3IMORwoPDkMK/w5DCtcORwojDkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvScpXG4gICAgICAgICAgICAgKTsqL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr3DkMK4w5HCjyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgLy90aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIC8vbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK4w5HCgsORwowgw5DCt8OQwrDDkMK6w5DCsMOQwrcnKVxuICAgICAgICAgICAgLy8pXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoZGF0YSk6dm9pZCB7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICBpZiAocmVzLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UocmVzLm1lc3NhZ2UudHlwZSwgcmVzLm1lc3NhZ2UudGl0bGUsIHJlcy5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQoZXJyb3IuZXJyb3IuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLmVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IuZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IuZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICApOyovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIH1cblxuICBzZXRDYXJ0SWQoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG4gIH1cbiAgcmVtb3ZlQ2FydElkKCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OkV2ZW50TWVzc2FnZVtdKTp2b2lkIHtcbiAgICB0aGlzLm1vZGlmaXJlcy5uZXh0KG1vZGlmaXJlcyk7XG4gICAgaWYgKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuICBtb2RpZmlyZXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaXJlcygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaXJlcyA9IHJlcyk7XG5cbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuICBASW5wdXQoKSBjb21tZW50OnN0cmluZztcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcblxuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcblxuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRCwgYW1vdW50KSB7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudCxcbiAgICAgIFwiY2FydElkXCI6IHVuZGVmaW5lZCxcbiAgICAgIFwibW9kaWZpZXJzXCI6IHRoaXMubW9kaWZpcmVzLFxuICAgICAgXCJjb21tZW50XCI6dGhpcy5jb21tZW50XG4gICAgfTtcbiAgICAvL2NvbnNvbGUubG9nKFwiw5DCtMORwoDDkcKDw5DCs8OQwrjDkMK1IMOQwrTDkMKww5DCvcORwovDkMK1XCIsIGRhdGEpXG5cbiAgICBpZiAodGhpcy5jYXJ0LmNhcnRJZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuY2FydElkO1xuICAgIHRoaXMuY2FydFNlcnZpY2UuYWRkRGlzaFRvQ2FydChkYXRhKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbW91bnRDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQW1vdW50Q2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDpvYmplY3Q7XG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG5cbiAgICB0aGlzLmFtb3VudCA9ICcwJzsgXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNhcnQgPSByZXM7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gcmVzLmRpc2hlc0NvdW50IHx8IDA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlbGV0ZUZyb21DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZURpc2hGcm9tQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3JkZXJDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgb3JkZXJDYXJ0OmFueTtcbiAgY2FydDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMub3JkZXIodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1aXJlZEZpZWxkczpBcnJheTxzdHJpbmc+ID0gW1wibmFtZVwiLCBcInBob25lXCIsIFwic3RyZWV0XCIsIFwiaG91c2VcIl07XG4gIHByaXZhdGUgY2hlY2tlckZpZWxkczpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAudXNlckNhcnQoKVxuICAgICAgICAuc3Vic2NyaWJlKGNhcnQ9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VyRmllbGRzLm5leHQodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpO1xuICAgIH0sIDEwMCk7XG5cbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwiw5DCncOQwrXDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgfVxuXG5cbiAgY2hlY2tGb3JGaWVsZHMoZm9ybURpcmVjdGl2ZXM6QXJyYXk8YW55PiwgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbiB7XG5cbiAgICBsZXQgZmllbGRzQXJlQXZhaWxhYmxlOm9iamVjdCA9IHt9O1xuICAgIGxldCBub0ZpZWxkczpBcnJheTxzdHJpbmc+ID0gW107XG5cblxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmaWVsZHNBcmVBdmFpbGFibGVbZWxlbWVudC5uYW1lXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKCFmaWVsZHNBcmVBdmFpbGFibGUuaGFzT3duUHJvcGVydHkoZWxlbWVudCkpIHtcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub0ZpZWxkcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKjIMORwoTDkMK+w5HCgMOQwrzDkcKLIMOQwr7DkcKCw5HCgcORwoPDkcKCw5HCgcOQwrLDkcKDw5HCjsORwoIgw5HCgcOQwrvDkMK1w5DCtMORwoPDkcKOw5HCicOQwrjDkMK1IMOQwr7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCtSDDkMK0w5DCu8ORwo8gw5DCusOQwr7DkcKAw5HCgMOQwrXDkMK6w5HCgsOQwr3DkMK+w5DCuSDDkcKAw5DCsMOQwrHDkMK+w5HCgsORwosgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwr/DkMK+w5DCu8ORwo86XCIsIG5vRmllbGRzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBwYXltZW50O1xuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIlxuXG4gICAgICBpZiAoZGF0YVRvU2VuZC5jYXNoKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMKww5DCu8OQwrjDkcKHw5DCvcORwovDkMK8w5DCuCDDkMK6w5HCg8ORwoDDkcKMw5DCtcORwoDDkcKDXCI7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFUb1NlbmQuYmFua2NhcmQpIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCkcOQwrDDkMK9w5DCusOQwr7DkMKyw5HCgcOQwrrDkMK+w5DCuSDDkMK6w5DCsMORwoDDkcKCw5DCvsOQwrkgw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhVG9TZW5kKTtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICAvLyBUT0RPOiDDkcKCw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLIMOQwr3DkMKww5DCtMOQwr4gw5DCssORwovDkMK9w5DCtcORwoHDkcKCw5DCuCDDkMKyIMOQwr7DkcKCw5DCtMOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCuSDDkMK8w5DCvsOQwrTDkcKDw5DCu8ORwowuXG4gICAgICAgIFwiY29tbWVudFwiOiBcIlxcbiDDkMKiw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLOlwiICsgcGF5bWVudCArIFwiXFxuw5DCmsOQwr7DkMK8w5DCtcOQwr3DkcKCw5DCsMORwoDDkMK4w5DCuTpcIiArIGNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5vcmRlckNhcnQoZGF0YSkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcblxuICAgIH1cblxuXG4gIH1cblxuICBjaGVja1N0cmVldChkYXRhVG9TZW5kKSB7XG4gICAgY29uc29sZS5sb2coXCI+Pj4+XCIsZGF0YVRvU2VuZCk7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgICAgXCJjb21tZW50XCI6IGRhdGFUb1NlbmQuY29tbWVudCxcbiAgICAgICAgLy8gXCJkZWxpdmVyeVwiOiB7XG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxuICAgICAgICAgIFwiaG9tZVwiOiBkYXRhVG9TZW5kLmhvdXNlLFxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwiZG9vcnBob25lXCI6IGRhdGFUb1NlbmQuZG9vcnBob25lLFxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXG4gICAgICAgICAgXCJhcGFydG1lbnRcIjogZGF0YVRvU2VuZC5hcGFydG1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgICAgXCJwaG9uZVwiOiAnKycgKyBkYXRhVG9TZW5kLnBob25lLFxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLmNoZWNrU3RyZWV0KGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ1RvTnVtYmVyKHN0cjpudW1iZXIgfCBhbnkpOm51bWJlciB7XG4gICAgY29uc29sZS5sb2codHlwZW9mIHN0cik7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gK3N0cjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKfw5DCsMORwoDDkMKww5DCvMOQwrXDkcKCw5HCgCBob21lIMOQwrTDkMK+w5DCu8OQwrbDkMK1w5DCvSDDkMKxw5HCi8ORwoLDkcKMIMOQwrjDkMK7w5DCuCBzdHJpbmcgw5DCuMOQwrvDkMK4IG51bWJlclwiKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZXREaXNoQW1vdW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0QW1vdW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYWN0aW9uOmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2hhbmdlQW1vdW50KHRoaXMuYWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FydDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCArIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCLDkMKUw5DCuMORwoDDkMK1w5DCusORwoLDkMK4w5DCssOQwrAgU2V0RGlzaEFtb3VudCDDkMK/w5DCvsOQwrvDkcKDw5HCh8OQwrjDkMK7w5DCsCDDkMK7w5DCvsOQwrbDkMK9w5DCvsOQwrUgw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgYWN0aW9uXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpc2hDYWxjXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdlaWdodFRvdGFsO1xuICBhbW91bnREaXNoO1xuICBwcmljZTtcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xuICBzdGF0ZU1vZGlmaWVyczphbnkgPSB7fTtcbiAgdGVzdGNvdW50Q2FsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgXCJkaXNoLWNhbGN1bGF0b3JcIik7XG5cblxuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50O1xuXG4gICAgdGhpcy5hbW91bnREaXNoVG9BZGQuZW1pdCh0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnByaWNlLCBcImRpc2gtcHJpY2VcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyRGlzaCh0aGlzLmRpc2gpO1xuICAgICAgdGhpcy5yZW5kZXIodGhpcy5kaXNoLm1vZGlmaWVycyk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlbmRlckRpc2goZGlzaDphbnkpIHtcbiAgICAvKlxuICAgICA8ZGl2IGNsYXNzPVwibWFpbi1pdGVtXCI+XG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5cbiAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tkaXNoLm5hbWV9fTwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlcIj5cbiAgICAgPCEtLSBpbmNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgtMSlcIj4mIzg3MjI7PC9hPlxuICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIiA+e3thbW91bnREaXNofX08L3NwYW4+XG4gICAgIDwhLS0gZGVjcmVhc2UgYnV0dG9uLS0+XG4gICAgIDxhIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUFtb3VudGRpc2goMSlcIj4mI3gyYjs8L2E+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwid2VpZ2h0LXByaWNlXCI+XG4gICAgIHt7ZGlzaC5wcmljZSphbW91bnREaXNofX0mbmJzcDsmI3gyMGJkO1xuICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+XG5cblxuICAgICAqL1xuICAgIGxldCBtYWluSXRlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1haW5JdGVtLCBcImRpc2gtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBtYWluSXRlbSk7XG5cbiAgICBsZXQgaXRlbU5hbWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJuYW1lXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1OYW1lKTtcblxuICAgIGxldCB0aXRsZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRpdGxlLCBcInRpdGxlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGl0bGUsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5uYW1lKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lLCB0aXRsZSk7XG5cbiAgICBsZXQgd2VpZ2h0RGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJkaXNoXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodERpc2hXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHREaXNoVmFsdWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwidmFsdWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHdlaWdodERpc2hWYWx1ZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAodGhpcy5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDDkMKzLlwiXG4gICAgKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHREaXNoV3JhcHBlciwgd2VpZ2h0RGlzaFZhbHVlKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLnByaWNlKTtcbiAgICBsZXQgcHJpY2VEaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VEaXNoV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VEaXNoV3JhcHBlcik7XG5cbiAgICBsZXQgaXRlbVF1YW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbVF1YW50LCBcInF1YW50aXR5XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1RdWFudCk7XG5cbiAgICBsZXQgYWRkQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcIm1pbnVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYWRkQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYWRkQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKC0xKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBhZGRCdXR0b24pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY291bnRlciwgXCJxdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGNvdW50ZXIpO1xuXG4gICAgbGV0IG1pbnVzQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1pbnVzQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicGx1c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG1pbnVzQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihtaW51c0J1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgxKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHRoaXMucHJpY2UsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpXG4gICAgICApO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBtaW51c0J1dHRvbik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0VG90YWxXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInZhbHVlXCIpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbCkgLy8gVE9ETzogdG90YWwgV2VpZ2h0XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHRUb3RhbFdyYXBwZXIsIHdlaWdodFRvdGFsKTtcbiAgICB0aGlzLndlaWdodFRvdGFsID0gd2VpZ2h0VG90YWw7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB0aGlzLnByaWNlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZShkaXNoLnByaWNlKVxuICAgICk7IC8vIFRPRE86IMOQwr/DkcKAw5DCsMOQwrLDkMK4w5DCu8ORwozDkMK9w5DCviDDkcKBw5HCh8OQwrjDkcKCw5DCsMORwoLDkcKMIMORwobDkMK1w5DCvcORwoNcbiAgICBsZXQgcHJpY2VUb3RhbFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJwcmljZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VUb3RhbFdyYXBwZXIsIHRoaXMucHJpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlVG90YWxXcmFwcGVyKTtcbiAgfVxuXG4gIGdlbmVyYXRlUHJpY2UocHJpY2VEaXNoLCBhbW91bnQ/LCBtb2RpZmlyZXNQcmljZT8pIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGlmaWVycylcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXBzID0+IHtcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kWzBdLmdyb3VwSWQgPSBncm91cHMuZ3JvdXAuaWQ7XG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgbGV0IG1vZFN1bTpudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgIG1vZFN1bSA9IG1vZFN1bSArIGVsZW1lbnQuZGlzaC5wcmljZSAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgIH0pO1xuICAgIG1vZFN1bSA9IG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaDtcbiAgICByZXR1cm4gKFxuICAgICAgcHJpY2VEaXNoICogdGhpcy5hbW91bnREaXNoICsgbW9kU3VtICsgJzxkaXYgY2xhc3M9XCJjdXJyZW5jeVwiPiZuYnNwOyYjeDIwYmQ7PC9kaXY+J1xuICAgICk7XG4gIH1cblxuICBnZW5lcmF0ZVRvdGFsV2VpZ2h0KCkge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLndlaWdodCAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSAqIDEwMDBcbiAgICB9KTtcbiAgICBtb2RTdW0gPSBwYXJzZUZsb2F0KChtb2RTdW0gKiB0aGlzLmFtb3VudERpc2gpLnRvRml4ZWQoMikpO1xuICAgIGNvbnNvbGUubG9nKG1vZFN1bSwgdGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpXG4gICAgY29uc29sZS5sb2codGhpcy5kaXNoLndlaWdodCwgdGhpcy5hbW91bnREaXNoKVxuICAgIGxldCB3ZWlnaHQgPSAodGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpICsgbW9kU3VtO1xuXG4gICAgcmV0dXJuICh3ZWlnaHQpLnRvRml4ZWQoMCkgKyBcIiDDkMKzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xuICB9XG5cbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0b3RhbFdlaWd0aERpdiwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVRvdGFsV2VpZ2h0KCkpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50ZGlzaCh2YWx1ZSkge1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPD0gMCkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTtcblxuICAgIH1cbiAgICBpZiAodGhpcy5hbW91bnREaXNoID49IDE5OSkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xuXG4gICAgfVxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCLDkMKaIMORwo3DkcKCw5DCvsOQwrzDkcKDIMOQwrHDkMK7w5HCjsOQwrTDkcKDIMOQwrzDkMK+w5DCtsOQwr3DkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMOlwiXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG5cbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuXG4gICAgICBpZiAoZWxlbWVudEdyb3VwLmRpc2gpIHtcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcIsOQwp7DkMK0w5DCvcOQwr7DkcKHw5DCvcORwovDkMK1IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5HCiyDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK0w5DCtcORwoDDkMK2w5DCuMOQwrLDkMKww5HCjsORwoLDkcKBw5HCj1wiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlbGVtZW50R3JvdXBcIixlbGVtZW50R3JvdXApO1xuICAgICAgICAvL1RPRE86IGFkZCBzaW5nbGUgbW9kaWZpY2F0b3IgbG9naWNcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXG4gICAgICAgICAgZWxlbWVudEdyb3VwLmdyb3VwID8gZWxlbWVudEdyb3VwLmdyb3VwLm5hbWUgOiBcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsFwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG4gICAgICAgIGxldCBtb2RBcnIgPSBlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnM7XG4gICAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGxldCBtb2RpZmlyZURpdiA9IHRoaXMubW9kaWZpcmVEaXYoZWxlbWVudCwgZWxlbWVudEdyb3VwLm1vZGlmaWVySWQpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZ3JvdXBEaXYsIG1vZGlmaXJlRGl2KTtcbiAgICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCI8cD4qIMOiwoDClCDDkMKaw5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCu8OQwrXDkMK9w5HCi8ORwoUgw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCscOQwrvDkcKOw5DCtMOQwrAgw5DCv8ORwoDDkMK4w5DCvMOQwrXDkMK9w5HCj8OQwrXDkcKCw5HCgcORwo8gw5DCtMOQwrvDkcKPIMOQwrrDkMKww5DCtsOQwrTDkMK+w5DCuSDDkMK/w5DCvsORwoDDkcKGw5DCuMOQwrg8L3A+XCJcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIGdyb3VwRGl2KG5hbWVHb3J1cCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiZ3JvdXAtbW9kaWZpcmVzLXdyYXBlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdiwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFwiXCIgKyBuYW1lR29ydXApKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgbW9kaWZpcmVEaXYoZWxlbWVudCwgZ3JvdXBJZCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiYWRkaXRpb25hbC1pdGVtXCIpO1xuICAgIHRoaXMucmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgZGl2LCBncm91cElkKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgcmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcblxuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUnLCBlbGVtZW50KTtcbiAgICBjb25zb2xlLmluZm8oJ3JlbmRlck9uZU1vZGlmaXJlIHNlbGVjdGVkTW9kaWZpZXJzJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwp3DkMKww5DCt8OQwrLDkMKww5DCvcOQwrjDkcKPIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIGxldCBpdGVtTmFtZURpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lRGl2LCBcIml0ZW0tbmFtZVwiKTtcblxuICAgIGxldCBsYWJlbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIFxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGxhYmVsLCBcImZvclwiLCBlbGVtZW50Lm1vZGlmaWVySWQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWVEaXYsIGxhYmVsKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGxhYmVsLCBcImlubmVySFRNTFwiLCBlbGVtZW50LmRpc2gubmFtZSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtTmFtZURpdik7XG5cbiAgICBsZXQgd2VpZ3RoTW9kaWZpcmVXcmFwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwibGVmdC13ZWlnaHQtbW9kaWZpcmUtd3JhcGVyXCIpO1xuICAgIGxldCB3ZWlnaHRNb2RpZmlyZUxlZnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnemVybycpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodE1vZGlmaXJlTGVmdCwgJ2lubmVySFRNTCcsIChlbGVtZW50LmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiIMOQwrMuXCIgKyAnJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZUxlZnQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkMK4w5DCt8OQwrzDkMK4w5DCvcOQwrXDkMK9w5DCuMORwo8gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbVF1YW50aXR5ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8qIFRPRE86IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrjDkcKCw5HCjDpcbiAgICAgw5DCtMOQwrAgMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEgXG4gICAgIMOQwrTDkMKwIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgIMOQwrTDkMKwIDAsMSBbZD09PTFdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG5cbiAgICAgw5DCtMOQwrAgMCxuW2Q9MF0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gMCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgw5DCtMOQwrAgMCxuW2Q+MDxuXSAtIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiBkLCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cblxuXG5cbiAgICAgayxuIFtrPG4sZD0wXSAtIGsgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgayDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstICjDkcKHw5DCsMORwoHDkcKCw5DCvcORwovDkMK5IMORwoHDkMK7w5HCg8ORwofDkMKww5DCuSDDkMK6w5DCvsOQwrPDkMK0w5DCsCBkPTApXG4gICAgIGssbiBbazxuLDA8ZD08bl0tIGQgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgMSDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGRlZmF1bHRBbW91bnQ6MFxuICAgICBoaWRlSWZEZWZhdWx0QW1vdW50OmZhbHNlIC8vw5DCn8ORwoDDkMK4w5DCt8OQwr3DkMKww5DCuiDDkcKCw5DCvsOQwrPDkMK+LCDDkcKHw5HCgsOQwr4gw5DCvcOQwrUgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrDDkcKCw5HCjCDDkcKBw5DCv8OQwrjDkcKBw5DCvsOQwrogw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiwgw5DCtcORwoHDkMK7w5DCuCDDkMK4w5HChSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMORwoDDkMKww5DCssOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssORwoNcbiAgICAgbWF4QW1vdW50OjBcbiAgICAgbWluQW1vdW50OjBcblxuICAgICAqL1xuXG4gICAgbGV0IG1pbiA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICBsZXQgZGVmID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMOQwrLDkcKLw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrkgw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGZhbHNlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMDogLy8gMCwxIFswXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCB0cnVlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbWluID09PSAxICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwrTDkMKww5DCtcORwoLDkcKBw5HCjyDDkMK9w5DCsMORwoHDkcKCw5HCgMOQwr7DkMK5w5DCusOQwrU6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuICAgICAgICB0aGlzLnJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwIMORwoDDkMK1w5DCvcOQwrTDkMK1w5HCgMOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwLCDDkMK0w5DCu8ORwo8gw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrk6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubWF4QW1vdW50ID4gMCAmJiBlbGVtZW50Lm1pbkFtb3VudCA+IDApIHtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwrHDkMK7w5DCvsOQwrrDkMKwIMORwoHDkcKCw5DCvsOQwrjDkMK8w5DCvsORwoHDkcKCw5DCuCDDkMK4IMOQwrLDkMK1w5HCgcOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgLy8gbGV0IHdlaWdodFByaWNlRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFByaWNlRGl2LCAnbW9kYWwtcHJpY2UnKTtcbiAgICAvLyBsZXQgd2VpZ2h0O1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC53ZWlnaHQ+MCl7XG4gICAgLy8gICB3ZWlnaHQgPSAgZWxlbWVudC5kaXNoLndlaWdodCArIFwiIMOQwrMgXCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcbiAgICAvLyBsZXQgcHJpY2U7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLnByaWNlPjApe1xuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCB3ZWlnaHRBbmRQcmljZUhUTUwgPSAod2VpZ2h0fHwnJykrKHdlaWdodCYmcHJpY2U/IHNsYXNoIDogJycpKyggcHJpY2UgfHwgJycpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWdodFByaWNlRGl2KTtcblxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwicmlnaHQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVSaWdodCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnaW5uZXJIVE1MJywgKGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIgw5DCsy5cIiArICc8ZGl2IGNsYXNzPVwic2VwYXJhdG9yXCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG5cbiAgICBsZXQgcHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJpdGVtLXByaWNlXCIpO1xuXG4gICAgbGV0IHByaWNlVmFsdWU7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC5wcmljZSA+IDApIHtcbiAgICAgIHByaWNlVmFsdWUgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIjxkaXYgY2xhc3MgPSAnY3VycmVuY3knPiZuYnNwOyYjeDIwYmQ7PC9kaXY+XCI7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHByaWNlLCBcImlubmVySFRNTFwiLCBwcmljZVZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJ6ZXJvLXByaWNlXCIpO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG5cbiAgfVxuXG4gIHJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGlzQWN0aXZlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBsZXQgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwiaWRcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAxO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMDtcblxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0LCBcIm1vZGFsLWNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBpbnB1dCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICBpZiAodGhpcy5pZFJhZGlvQm94KGdyb3VwSWQpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2tleV0gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCAgIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncm91cERpdkJsb2NrID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcImlucHV0XCJcbiAgICAgICAgKTtcblxuICAgICAgICBncm91cERpdkJsb2NrLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuaWQgIT0gZS50YXJnZXQuaWQpIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IDE7XG5cbiAgICAgIH1cblxuXG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG5cbiAgfVxuXG4gIHJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpIHtcblxuICAgIGxldCBzdGFydEFtb3VudDtcbiAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50ID4gMCkge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5taW5BbW91bnQ7XG5cbiAgICB9XG4gICAgaWYgKHN0YXJ0QW1vdW50ID4gMCkge1xuXG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IGFNaW51c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWludXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFNaW51c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhTWludXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFNaW51c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgLSAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdIDwgZWxlbWVudC5taW5BbW91bnRcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPT09IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzcGFuLCBcIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHN0YXJ0QW1vdW50O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICBzcGFuLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBzcGFuKTtcblxuICAgIGxldCBhUGx1c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGx1c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYVBsdXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhUGx1c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUGx1c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlICsgMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+XG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICYmXG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICE9IDBcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWF4QW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID4gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRNb2RpZmlyZXMoKSB7XG4gICAgbGV0IG1vZGlmaWVyc1RvU2VsZWN0ID0gW107XG5cbiAgICAvKmlmKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMubGVuZ3RoICYmICEoT2JqZWN0LnZhbHVlcyh0aGlzLnN0YXRlTW9kaWZpZXJzKSkubGVuZ3RoKSB7XG4gICAgICBtb2RpZmllcnNUb1NlbGVjdCA9IHRoaXMuc2VsZWN0ZWRNb2RpZmllcnM7XG4gICAgfSovXG5cbiAgICBsZXQgbW9kaWZpcmVzID0gW107XG5cbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBtb2RpZmllcnNUb1NlbGVjdCcsIG1vZGlmaWVyc1RvU2VsZWN0KTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcblxuICAgIGZvciAobGV0IGdyb3VwSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVycykge1xuICAgICAgZm9yIChsZXQgbW9kaWZpcmVJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW21vZGlmaXJlSWRdIHx8IG1vZGlmaWVyc1RvU2VsZWN0LmZpbmQoaXRlbSA9PiBpdGVtLm1vZGlmaWVySWQgPT0gbW9kaWZpcmVJZCkpIHtcbiAgICAgICAgICBtb2RpZmlyZXMucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpcmVJZCxcbiAgICAgICAgICAgIGFtb3VudDogdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0sXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyA9IG1vZGlmaXJlcztcblxuICAgIGlmICh0aGlzLmRpc2gubW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBtZXNzYWdlID0gW107XG5cbiAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGlmIChncm91cC5yZXF1aXJlZCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RpZiA9IFtdO1xuICAgICAgICAgICAgbGV0IGxvY2FsTW9kaWYgPSB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdOyAvLy5maWx0ZXIoZWxlbWVudD0+ZWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZCBpbiBsb2NhbE1vZGlmKSB7XG4gICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZlttb2RdKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZE1vZGlmLnB1c2gobG9jYWxNb2RpZlttb2RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1vZGlmLmxlbmd0aCA8IGdyb3VwLm1pbkFtb3VudCkge1xuICAgICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOQwpLDkMK9w5DCuMOQwrzDkMKww5DCvcOQwrjDkMK1XCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICBncm91cC5ncm91cC5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgIH1cblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGFmdGVyJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgfVxuXG4gIC8qIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkcKBw5DCvsOQwr7DkcKCw5DCssOQwrXDkcKBw5HCgsOQwrLDkMK1w5HCgiDDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyw5DCsSDDkMK1w5HCgcOQwrvDkMK4IDEgw5HCgsOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5HCg8OQwrXDkcKCIMOQwr/DkMK+w5DCssOQwrXDkMK0w5DCtcOQwr3DkMK4w5DCtSDDkcKAw5DCsMOQwrTDkMK4w5DCvsOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCxcbiAgIMOQwrXDkcKBw5DCu8OQwrggw5DCvMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCscOQwr7DkMK7w5HCjMORwojDkMK1IDEgw5HCgsOQwr4gw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK0w5DCtcOQwrvDkMKww5DCtcORwoIgw5DCssORwovDkMKxw5DCvsORwoAgw5DCssORwoHDkMK1w5HChSDDkMK+w5HCgcORwoLDkMKww5DCu8ORwozDkMK9w5HCi8ORwoUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiDDkMK9w5DCtSDDkMKyw5DCvsOQwrfDkMK8w5DCvsOQwrbDkMK9w5HCi8OQwrwsIMOQwrPDkMK1w5DCvcOQwrXDkcKAw5DCuMORwoDDkcKDw5DCtcORwoIgw5DCv8ORwoDDkMK1w5DCtMORwoPDkMK/w5HCgMOQwrXDkMK2w5DCtMOQwrXDkMK9w5DCuMOQwrUqL1xuXG4gIGlkUmFkaW9Cb3goZ3JvdXBJZCk6Ym9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRHcm91cCA9IHRoaXMuZGlzaC5tb2RpZmllcnMuZmluZCh4ID0+IHgubW9kaWZpZXJJZCA9PT0gZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cC5taW5BbW91bnQgPT09IDEgJiYgY3VycmVudEdyb3VwLm1heEFtb3VudCA9PT0gMTtcbiAgfVxuXG4gIC8vIMOQwp/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkMK8w5DCuMOQwr3DkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMK6w5DCvsORwoLDkMK+w5HCgMORwovDkMK1IMOQwrHDkcKLw5DCu8OQwrggw5DCssORwovDkMKxw5HCgMOQwrDDkMK9w5HCi1xuICBjaGVja01pbkFtb3VudE1vZGlmaXJlcyhncm91cElkLCBtb2RpZmlyZSkge1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL3RoaXMuZGlzaC5tb2RpZmllcnMgPVtdO1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpc2hDYWxjUHJvXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNQcm9EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdlaWdodFRvdGFsO1xuICBhbW91bnREaXNoO1xuICBwcmljZTtcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xuICBzdGF0ZU1vZGlmaWVyczphbnkgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHt9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIGRlYm91bmNlVGltZSwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjaGVja291dF0nXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBjYXJ0VG90YWw6YW55O1xuXG4gIEBJbnB1dCgpIGJvbnVzZXM6IGFueTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OiBhbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6IHN0cmluZztcblxuICBASW5wdXQoKSBzdHJlZXQ6IHN0cmluZztcbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTogc3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFwYXJ0bWVudDogc3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTogc3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZmxvb3I6IHN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2RJZDogc3RyaW5nO1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6IG51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xuICAgICAgICAgIGlmKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuZGVsaXZlcnkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybUNoYW5nZUtleSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIDE6IHRoaXMubG9jYXRpb25JZCxcbiAgICAgICAgICAgIDI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgICAgICAzOiB0aGlzLnN0cmVldCxcbiAgICAgICAgICAgIDQ6IHRoaXMuaG9tZSxcbiAgICAgICAgICAgIDU6IHRoaXMuY2FydFRvdGFsLFxuICAgICAgICAgICAgNjogdGhpcy5ib251c2VzLFxuICAgICAgICAgICAgNzogdGhpcy5kZWxpdmVyeVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja1N0cmVldCgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuZGVsaXZlcnkpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncORwoPDkMK2w5DCvcOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkMKww5DCtMORwoDDkMK1w5HCgScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7DkMKew5DCv8OQwrvDkMKww5HCgsOQwrA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuXG4gICAgaWYodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcbiAgICB9XG5cbiAgICBkYXRhW1wic2VsZkRlbGl2ZXJ5XCJdID0gdGhpcy5kZWxpdmVyeTtcblxuXG4gICAgaWYodGhpcy5ib251c2VzKSB7XG4gICAgICBkYXRhWydib251c2VzJ10gPSB0aGlzLmJvbnVzZXMubWFwKGIgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGIubmFtZSxcbiAgICAgICAgICBhbW91bnQ6IGIuYW1vdW50XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYocmVzdWx0LmFjdGlvbiAmJiByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoKSB7XG5cbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGAke2NvbW1lbnR9XFxyXFxuw5DCnsOQwr/DkMK7w5DCsMORwoLDkMKwOiAke3BheW1lbnRNZXRob2R9YCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAvL1wicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIC8vXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgICBcInBob25lXCI6ICcrNzk5OTk5OTk5OTknLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6ICfDkMKSw5DCsMORwoHDkMKwJ1xuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6IHRoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuXG4gICAgLy8gY29uc29sZS5sb2coJ0VFRUVFRUVFRUVFRScsIHRoaXMuZGVsaXZlcnkpO1xuXG4gICAgZGF0YVtcInNlbGZEZWxpdmVyeVwiXSA9IHRoaXMuZGVsaXZlcnk7XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pc0NoZWNraW5nLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmNoZWNrU3RyZWV0VjIoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIC8vKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIC8vZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgICByZXN1bHQgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpLFxuICAgICAgICBlcnJvciA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSlcbiAgICAgICk7XG4gIH1cblxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIGlmKCFwaG9uZSkgcmV0dXJuICcnO1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJys3Jyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hDb21tZW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBjb21tZW50OmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLnNldENvbW1lbnQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7IH1cblxuICBzZXRDb21tZW50KCl7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ29tbWVudCh0aGlzLmRpc2guaWQsdGhpcy5jb21tZW50KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PnRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgZXJyPT50aGlzLmVycm9yLmVtaXQoZXJyKVxuICAgIClcbiAgICBcblxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Rpc2gtY2FsYycsXG4gIHRlbXBsYXRlOiBgPGRpdj5ESVNIIENBTEMgQ09NUE9ORU5UPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIG5nT25Jbml0KCkge31cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNQcm9EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLXByby5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBEaXNoQ2FsY1Byb0RpcmVjdGl2ZSxcbiAgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUsXG4gIFNldEFtb3VudERpcmVjdGl2ZSxcbiAgQ2hlY2tvdXREaXJlY3RpdmUsXG5dO1xuXG5jb25zdCBDT01QT05FTlRTID0gW1xuICBEaXNoQ2FsY0NvbXBvbmVudFxuXTtcblxuY29uc3QgTU9EVUxFUyA9IFtcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNT0RVTEVTXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJCZWhhdmlvclN1YmplY3QiLCJ0YXAiLCJFdmVudE1lc3NhZ2UiLCJJbmplY3RhYmxlIiwiTmV0U2VydmljZSIsIkV2ZW50ZXJTZXJ2aWNlIiwiRGlyZWN0aXZlIiwiSW5wdXQiLCJIb3N0TGlzdGVuZXIiLCJSZW5kZXJlcjIiLCJFbGVtZW50UmVmIiwiRXZlbnRFbWl0dGVyIiwiT3V0cHV0IiwiZmlsdGVyIiwiZGVib3VuY2VUaW1lIiwiQ29tcG9uZW50IiwiTmdNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFjQTtRQVlFLDRCQUFvQixHQUFjLEVBQ2QsT0FBc0I7WUFEMUMsaUJBU0M7WUFUbUIsUUFB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