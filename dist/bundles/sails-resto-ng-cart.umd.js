(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@sails-resto/ng-core')) :
    typeof define === 'function' && define.amd ? define('@sails-resto/ng-cart', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@sails-resto/ng-core'], factory) :
    (factory((global['sails-resto'] = global['sails-resto'] || {}, global['sails-resto']['ng-cart'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,null));
}(this, (function (exports,i0,rxjs,operators,i1) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /*  TODO: В етом класе еще надо реализовать логику проверки доступности разных типов зхранилищь, но пока нету фикса нужного нам модуля ето
     затруднательно прийдется ждать.  */
    var NgRestoCartService = /** @class */ (function () {
        function NgRestoCartService(net, eventer) {
            var _this = this;
            this.net = net;
            this.eventer = eventer;
            this.cart = new rxjs.BehaviorSubject({});
            this.modifires = new rxjs.BehaviorSubject([]);
            this.modifiresMessage = new rxjs.BehaviorSubject([]);
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
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Блюдо добавлено в корзину'));
                    console.log(res);
                }, function (error) {
                    _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо'));
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
                    _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось изменить количество'));
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
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Блюдо успешно удалено'));
                    console.log(res);
                }, function (error) {
                    _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо'));
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
                    .pipe(operators.tap(function (result) {
                    _this.setcartIDFromStorage(result.cart.cartId);
                    _this.cart.next(result.cart);
                    _this.cartID = result.cart.cartId;
                    _this.eventer.emitMessageEvent(new i1.EventMessage('success', 'Успех', 'Заказ упешно оформлен'));
                }, function (error) {
                    console.log("Ошибка оформления!", error);
                    if (error.error && error.error.cart) {
                        _this.setcartIDFromStorage(error.error.cart.cartId);
                        _this.cart.next(error.error.cart);
                        _this.cartID = error.error.cart.cartId;
                    }
                    if (error.message) {
                        _this.eventer.emitMessageEvent(new i1.EventMessage(error.message.type, error.message.title, error.message.body));
                    }
                    else {
                        _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось оформить заказ'));
                    }
                }));
            };
        /*checkStreet(data):void {
          return this.net.post('/check', data)
            .pipe(
              tap(
                result => {
                  this.setcartIDFromStorage(result.cart.cartId);
                  this.cart.next(result.cart);
                  this.cartID = result.cart.cartId;
                  if (result.message) {
                    this.eventer.emitMessageEvent(
                      new EventMessage(
                        result.message.type,
                        result.message.title,
                        result.message.body
                      )
                    );
                  }
                },
                error => {
                  console.error(error);
                  this.eventer.emitMessageEvent(
                    new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
                  )
                }
              )
            );
        }*/
        /*checkStreet(data):void {
            return this.net.post('/check', data)
              .pipe(
                tap(
                  result => {
                    this.setcartIDFromStorage(result.cart.cartId);
                    this.cart.next(result.cart);
                    this.cartID = result.cart.cartId;
                    if (result.message) {
                      this.eventer.emitMessageEvent(
                        new EventMessage(
                          result.message.type,
                          result.message.title,
                          result.message.body
                        )
                      );
                    }
                  },
                  error => {
                    console.error(error);
                    this.eventer.emitMessageEvent(
                      new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
                    )
                  }
                )
              );
          }*/
        /**
         * @param {?} data
         * @return {?}
         */
        NgRestoCartService.prototype.checkStreet = /*checkStreet(data):void {
            return this.net.post('/check', data)
              .pipe(
                tap(
                  result => {
                    this.setcartIDFromStorage(result.cart.cartId);
                    this.cart.next(result.cart);
                    this.cartID = result.cart.cartId;
                    if (result.message) {
                      this.eventer.emitMessageEvent(
                        new EventMessage(
                          result.message.type,
                          result.message.title,
                          result.message.body
                        )
                      );
                    }
                  },
                  error => {
                    console.error(error);
                    this.eventer.emitMessageEvent(
                      new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
                    )
                  }
                )
              );
          }*/
            /**
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
                        _this.eventer.emitMessageEvent(new i1.EventMessage(res.message.type, res.message.title, res.message.body));
                    }
                }, function (error) {
                    if (error.error) {
                        if (error.error.cart) {
                            _this.setcartIDFromStorage(error.error.cart.cartId);
                            _this.cart.next(error.error.cart);
                            _this.cartID = error.error.cart.cartId;
                        }
                        _this.eventer.emitMessageEvent(new i1.EventMessage(error.error.message.type, error.error.message.title, error.error.message.body));
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        NgRestoCartService.ctorParameters = function () {
            return [
                { type: i1.NetService },
                { type: i1.EventerService }
            ];
        };
        /** @nocollapse */ NgRestoCartService.ngInjectableDef = i0.defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.inject(i1.NetService), i0.inject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
        return NgRestoCartService;
    }());

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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AddDishToCartDirective = /** @class */ (function () {
        function AddDishToCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
            this.cartService
                .getModifires()
                .subscribe(function (res) { return _this.modifires = res; });
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
                console.log("другие даные", data);
                if (this.cart.cartId)
                    data.cartId = this.cart.cartId;
                this.cartService.addDishToCart(data);
            };
        AddDishToCartDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[addToCart]'
                    },] },
        ];
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                .subscribe(function (res) {
                _this.cart = res;
                _this.amount = res.dishesCount || 0;
                _this.renderer.setProperty(_this.el.nativeElement, 'innerHTML', _this.amount);
            });
        }
        AmountCartDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[amountCart]'
                    },] },
        ];
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DeleteFromCartDirective = /** @class */ (function () {
        function DeleteFromCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                setTimeout(function () {
                    _this.cartService
                        .userCart()
                        .subscribe(function (cart) {
                        if (_this.cart && _this.orderCart.valid && _this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                            _this.checkStreet(_this.orderCart.value);
                        }
                        _this.cart = cart;
                    });
                }, 100);
                setTimeout(function () {
                    _this.checkerFields.next(_this.checkForFields(_this.orderCart._directives, _this.requiredFields));
                }, 100);
                this.checkerFields.subscribe(function (state) {
                    if (state) {
                        _this.orderCart.controls['street'].valueChanges.subscribe(function (val) {
                            if (typeof val === 'object') {
                                setTimeout(function () {
                                    if (_this.orderCart.controls['house'].valid) {
                                        _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                        _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                        _this.checkStreet(_this.orderCart.value);
                                    }
                                }, 100);
                            }
                        });
                        _this.orderCart.controls['house'].valueChanges.subscribe(function (val) {
                            setTimeout(function () {
                                if (_this.orderCart.controls['street'].valid) {
                                    _this.orderCart.value.name = _this.orderCart.value.name || "Неуказано";
                                    _this.orderCart.value.phone = _this.orderCart.value.phone || "78888888888";
                                    _this.checkStreet(_this.orderCart.value);
                                }
                            }, 100);
                        });
                    }
                });
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
                formDirectives.forEach(function (element) {
                    fieldsAreAvailable[element.name] = true;
                });
                requiredFields.forEach(function (element) {
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
                        "comment": "\n Тип оплаты:" + payment + "\nКоментарий:" + comment,
                        // "delivery": {
                        //   "type": "string (self or nothing)"
                        // },
                        "address": {
                            // "city": "string",
                            "streetId": dataToSend.street.id,
                            "home": this.stringToNumber(dataToSend.house),
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
                console.info(this.cart);
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
                            "home": this.stringToNumber(dataToSend.house),
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SetAmountDirective = /** @class */ (function () {
        function SetAmountDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var DishCalcDirective = /** @class */ (function () {
        function DishCalcDirective(renderer, el, cartService) {
            var _this = this;
            this.renderer = renderer;
            this.el = el;
            this.cartService = cartService;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
            this.amountModifires = {};
            this.stateModifiers = {};
            this.renderer.addClass(this.el.nativeElement, "dish-calculator");
            this.amountDish = 1;
            this.amountDishToAdd.emit(this.amountDish);
            this.price = this.renderer.createElement("div");
            this.renderer.addClass(this.price, "dish-price");
            setTimeout(function () {
                _this.renderDish(_this.dish);
                _this.render(_this.dish.modifiers);
            }, 100);
        }
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
                this.renderer.setProperty(weightDishValue, "innerHTML", this.dish.weight * 1000 + " г.");
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
                this.renderer.listen(addButton, "click", function (e) {
                    _this.changeAmountdish(-1);
                    _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
                    _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
                    _this.innerTotalWeight(weightTotal);
                });
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
                this.renderer.listen(minusButton, "click", function (e) {
                    _this.changeAmountdish(1);
                    _this.renderer.setProperty(counter, "innerHTML", _this.amountDish);
                    _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
                    _this.innerTotalWeight(weightTotal);
                });
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
                    this.selectedModifiers.forEach(function (element) {
                        _this.dish.modifiers.forEach(function (groups) {
                            /** @type {?} */
                            var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                            if (mod.length > 0) {
                                mod[0].groupId = groups.group.id;
                                selected.push(mod[0]);
                            }
                        });
                    });
                /** @type {?} */
                var modSum = 0;
                selected.forEach(function (element) {
                    modSum = modSum + element.dish.price * _this.amountModifires[element.groupId][element.modifierId];
                });
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
                    this.selectedModifiers.forEach(function (element) {
                        _this.dish.modifiers.forEach(function (groups) {
                            /** @type {?} */
                            var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                            if (mod.length > 0) {
                                mod[0].groupId = groups.group.id;
                                selected.push(mod[0]);
                            }
                        });
                    });
                /** @type {?} */
                var modSum = 0;
                selected.forEach(function (element) {
                    modSum = modSum + element.dish.weight * _this.amountModifires[element.groupId][element.modifierId] * 1000;
                });
                modSum = parseFloat((modSum * this.amountDish).toFixed(2));
                console.log(modSum, this.dish.weight * 1000 * this.amountDish);
                console.log(this.dish.weight, this.amountDish);
                /** @type {?} */
                var weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
                return weight + " г. <div class='separator'></div>";
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
                modifires.forEach(function (elementGroup) {
                    _this.stateModifiers[elementGroup.modifierId] = {};
                    _this.amountModifires[elementGroup.modifierId] = {};
                    /** @type {?} */
                    var groupDiv = _this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                    _this.renderer.appendChild(_this.el.nativeElement, groupDiv);
                    /** @type {?} */
                    var modArr = elementGroup.childModifiers;
                    modArr.forEach(function (element) {
                        /** @type {?} */
                        var modifireDiv = _this.modifireDiv(element, elementGroup.modifierId);
                        _this.renderer.appendChild(groupDiv, modifireDiv);
                        if (element.defaultAmount < 1) {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                        }
                        else {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                        }
                    });
                });
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
                this.renderer.setProperty(weightModifireLeft, 'innerHTML', element.dish.weight * 1000 + " г." + '');
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
                this.renderer.setProperty(weightModifireRight, 'innerHTML', element.dish.weight * 1000 + " г." + '<div class="separator"></div>');
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
                this.renderer.listen(input, "change", function (e) {
                    if (_this.idRadioBox(groupId)) {
                        for (var key in _this.stateModifiers[groupId]) {
                            if (_this.stateModifiers[groupId].hasOwnProperty(key)) {
                                _this.stateModifiers[groupId][key] = false;
                                // this.renderer.setProperty(input, 'checked',   true);
                            }
                        }
                        /** @type {?} */
                        var groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                        groupDivBlock.forEach(function (element) {
                            if (element.id != e.target.id)
                                element.checked = false;
                        });
                    }
                    _this.stateModifiers[groupId][e.target.id] = e.target.checked;
                    if (e.target.checked) {
                        _this.amountModifires[groupId][e.target.id] = 1;
                    }
                    _this.setModifires();
                    _this.innerTotalWeight(_this.weightTotal);
                    _this.renderer.setProperty(_this.price, "innerHTML", _this.generatePrice(_this.dish.price));
                });
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
                this.renderer.listen(aMinusDiv, "click", function (e) {
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
                });
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
                this.renderer.listen(aPlusDiv, "click", function (e) {
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
                });
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
                        if (this_1.stateModifiers[groupId][modifireId] || modifiersToSelect.find(function (item) { return item.modifierId == modifireId; })) {
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
                    this.dish.modifiers.forEach(function (group) {
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
                    });
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
                var currentGroup = this.dish.modifiers.find(function (x) { return x.modifierId === groupId; });
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
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CheckoutDirective = /** @class */ (function () {
        function CheckoutDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.cartService
                .userCart()
                .subscribe(function (cart) { return _this.cart = cart; });
        }
        /**
         * @return {?}
         */
        CheckoutDirective.prototype.onClick = /**
         * @return {?}
         */
            function () {
                var _this = this;
                if (!this.locationId && !(this.streetId && this.home)) {
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
                if (this.delivery) {
                    data["delivery"] = { "type": "self" };
                }
                if (this.locationId) {
                    data["locationId"] = this.locationId;
                }
                else {
                    data["address"] = {
                        "streetId": this.streetId,
                        "home": +this.home,
                        "housing": this.housing,
                        "doorphone": this.doorphone || '',
                        "entrance": this.entrance || '',
                        "floor": this.floor || '',
                        "apartment": this.apartment || ''
                    };
                }
                this.cartService
                    .orderCart(data)
                    .subscribe(function () { return _this.success.emit(true); }, function (error) { return _this.error.emit(error); });
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
                phone = '+' + phone.replace(/[^0-9]/gim, '');
                return phone.replace('+8', '');
            };
        CheckoutDirective.decorators = [
            { type: i0.Directive, args: [{
                        selector: '[checkout]'
                    },] },
        ];
        CheckoutDirective.ctorParameters = function () {
            return [
                { type: NgRestoCartService }
            ];
        };
        CheckoutDirective.propDecorators = {
            name: [{ type: i0.Input }],
            email: [{ type: i0.Input }],
            phone: [{ type: i0.Input }],
            delivery: [{ type: i0.Input }],
            locationId: [{ type: i0.Input }],
            streetId: [{ type: i0.Input }],
            home: [{ type: i0.Input }],
            housing: [{ type: i0.Input }],
            apartment: [{ type: i0.Input }],
            entrance: [{ type: i0.Input }],
            doorphone: [{ type: i0.Input }],
            floor: [{ type: i0.Input }],
            paymentMethod: [{ type: i0.Input }],
            personsCount: [{ type: i0.Input }],
            comment: [{ type: i0.Input }],
            success: [{ type: i0.Output }],
            error: [{ type: i0.Output }],
            onClick: [{ type: i0.HostListener, args: ['click',] }]
        };
        return CheckoutDirective;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var DIRECTIVES = [
        AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetAmountDirective,
        CheckoutDirective
    ];
    /** @type {?} */
    var MODULES = [];
    var NgRestoCartModule = /** @class */ (function () {
        function NgRestoCartModule() {
        }
        NgRestoCartModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: __spread(MODULES),
                        providers: [],
                        declarations: __spread(DIRECTIVES),
                        exports: __spread(DIRECTIVES)
                    },] },
        ];
        return NgRestoCartModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.NgRestoCartService = NgRestoCartService;
    exports.NgRestoCartModule = NgRestoCartModule;
    exports.ɵa = AddDishToCartDirective;
    exports.ɵb = AmountCartDirective;
    exports.ɵg = CheckoutDirective;
    exports.ɵc = DeleteFromCartDirective;
    exports.ɵe = DishCalcDirective;
    exports.ɵd = OrderCartUserDirective;
    exports.ɵf = SetAmountDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FpbHMtcmVzdG8tbmctY2FydC51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BzYWlscy1yZXN0by9uZy1jYXJ0L2xpYi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZS50cyIsbnVsbCwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL25nLWNhcnQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0BzYWlscy1yZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcbi8qICBUT0RPOiDDkMKSIMOQwrXDkcKCw5DCvsOQwrwgw5DCusOQwrvDkMKww5HCgcOQwrUgw5DCtcORwonDkMK1IMOQwr3DkMKww5DCtMOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5DCvsOQwrLDkMKww5HCgsORwowgw5DCu8OQwr7DkMKzw5DCuMOQwrrDkcKDIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrrDkMK4IMOQwrTDkMK+w5HCgcORwoLDkcKDw5DCv8OQwr3DkMK+w5HCgcORwoLDkMK4IMORwoDDkMKww5DCt8OQwr3DkcKLw5HChSDDkcKCw5DCuMOQwr/DkMK+w5DCsiDDkMK3w5HChcORwoDDkMKww5DCvcOQwrjDkMK7w5DCuMORwonDkcKMLCDDkMK9w5DCviDDkMK/w5DCvsOQwrrDkMKwIMOQwr3DkMK1w5HCgsORwoMgw5HChMOQwrjDkMK6w5HCgcOQwrAgw5DCvcORwoPDkMK2w5DCvcOQwr7DkMKzw5DCviDDkMK9w5DCsMOQwrwgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwrXDkcKCw5DCvlxuIMOQwrfDkMKww5HCgsORwoDDkcKDw5DCtMOQwr3DkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkMK+IMOQwr/DkcKAw5DCuMOQwrnDkMK0w5DCtcORwoLDkcKBw5HCjyDDkMK2w5DCtMOQwrDDkcKCw5HCjC4gICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XG4gIGNhcnRJRDpzdHJpbmc7XG4gIGNhcnQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1vZGlmaXJlczpCZWhhdmlvclN1YmplY3Q8YW55PjtcblxuICBtb2RpZmlyZXNNZXNzYWdlOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtZXNzYWdlczpFdmVudE1lc3NhZ2VbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLm1vZGlmaXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5pbml0aWFsU3RvcmFnZSgpO1xuXG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLnN1YnNjcmliZShtZXNzYWdlcyA9PiB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMpO1xuICB9XG5cbiAgaW5pdGlhbFN0b3JhZ2UoKSB7XG5cbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Y2FydElERnJvbVN0b3JhZ2UoKTtcblxuICAgIGlmICh0aGlzLmNhcnRJRCkge1xuICAgICAgdGhpcy5uZXQuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+IHtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qICAgICB0aGlzLnJlc3RvU3RvcmFnZVNlcnZpY2Uuc3ViKCdsb2NhbFN0b3JhZ2VTZXJ2aWNlJywnY2FydElEJykuc3Vic2NyaWJlKHJlcz0+e1xuXG4gICAgIGlmKHJlcy5jaGFuZ2VLZXkpe1xuICAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIscmVzKVxuICAgICB0aGlzLm5ldC5nZXQoJy9jYXJ0P2NhcnRJZD0nK3RoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+e1xuICAgICB0aGlzLmNhcnQubmV4dChjYXJ0KTtcbiAgICAgfSk7fVxuXG4gICAgIH0pOzsgKi9cblxuXG4gIH1cblxuICBnZXRjYXJ0SURGcm9tU3RvcmFnZSgpOnN0cmluZyB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQoZGF0YSkge1xuXG4gICAgaWYodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrvDkMK1w5DCvcOQwr4gw5DCsiDDkMK6w5DCvsORwoDDkMK3w5DCuMOQwr3DkcKDJylcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpjDkMK3w5DCvMOQwrXDkMK9w5DCtcOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICApOyovXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK4w5DCt8OQwrzDkMK1w5DCvcOQwrjDkcKCw5HCjCDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Y2FydElERnJvbVN0b3JhZ2UocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkcKDw5HCgcOQwr/DkMK1w5HCiMOQwr3DkMK+IMORwoPDkMK0w5DCsMOQwrvDkMK1w5DCvcOQwr4nKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5HCg8OQwrTDkMKww5DCu8OQwrjDkcKCw5HCjCDDkMKxw5DCu8ORwo7DkMK0w5DCvicpXG4gICAgICAgIClcbiAgICAgIH0pO1xuXG4gIH1cblxuICBjaGVja291dENhcnQoZGF0YSkge1xuICAgIGxldCBvcmRlcjpPcmRlciA9IHtcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0SUQsXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHN0cmVldElkOiBkYXRhLnN0cmVldC5pZCxcbiAgICAgICAgaG9tZTogZGF0YS5ob3VzZSxcbiAgICAgICAgaG91c2luZzogZGF0YS5ob3VzaW5nLFxuICAgICAgICAvLyBpbmRleDogXCIxMjc4XCIsXG4gICAgICAgIGVudHJhbmNlOiBkYXRhLmVudHJhbmNlLFxuICAgICAgICBmbG9vcjogZGF0YS5mbG9vcixcbiAgICAgICAgYXBhcnRtZW50OiBkYXRhLmFwYXJ0bWVudFxuICAgICAgfSxcblxuICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbWFpbDogZGF0YS5lbWFpbCB8fCB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm9yZGVyQ2FydChvcmRlcik7XG5cbiAgfVxuXG4gIG9yZGVyQ2FydChkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9vcmRlcicsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpfDkMKww5DCusOQwrDDkMK3IMORwoPDkMK/w5DCtcORwojDkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvScpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4geyAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr3DkMK4w5HCjyFcIixlcnJvcikgICAgICBcbiAgICAgICAgICAgIGlmKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRjYXJ0SURGcm9tU3RvcmFnZShlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJRCA9ZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGVycm9yLm1lc3NhZ2Upe1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoZXJyb3IubWVzc2FnZS50eXBlLCBlcnJvci5tZXNzYWdlLnRpdGxlLCBlcnJvci5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIC8qY2hlY2tTdHJlZXQoZGF0YSk6dm9pZCB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubWVzc2FnZSkge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UuYm9keVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH0qL1xuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWR7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPXJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYocmVzLm1lc3NhZ2Upe1xuXG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LCBlcnJvciA9PntcbiAgICAgICAgaWYoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZihlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPWVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Y2FydElERnJvbVN0b3JhZ2UoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG5cbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OiBFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiIsIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FkZFRvQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFkZERpc2hUb0NhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG4gIG1vZGlmaXJlcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuZ2V0TW9kaWZpcmVzKClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMubW9kaWZpcmVzID0gcmVzKTtcblxuICB9XG5cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6YW55O1xuXG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuXG4gICAgdGhpcy5hZGREaXNoVG9DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxuXG4gIH1cblxuICBwcml2YXRlIGFkZERpc2hUb0NhcnQoZGlzaElELCBhbW91bnQpIHtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50LFxuICAgICAgXCJjYXJ0SWRcIjogdW5kZWZpbmVkLFxuICAgICAgXCJtb2RpZmllcnNcIjogdGhpcy5tb2RpZmlyZXMsXG4gICAgICBcImNvbW1lbnRcIjp0aGlzLmNvbW1lbnRcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKFwiw5DCtMORwoDDkcKDw5DCs8OQwrjDkMK1IMOQwrTDkMKww5DCvcORwovDkMK1XCIsIGRhdGEpXG5cbiAgICBpZiAodGhpcy5jYXJ0LmNhcnRJZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuY2FydElkO1xuICAgIHRoaXMuY2FydFNlcnZpY2UuYWRkRGlzaFRvQ2FydChkYXRhKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbW91bnRDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQW1vdW50Q2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDpvYmplY3Q7XG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG5cbiAgICB0aGlzLmFtb3VudCA9ICcwJzsgXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNhcnQgPSByZXM7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gcmVzLmRpc2hlc0NvdW50IHx8IDA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlbGV0ZUZyb21DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZURpc2hGcm9tQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3JkZXJDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgb3JkZXJDYXJ0OmFueTtcbiAgY2FydDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMub3JkZXIodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1aXJlZEZpZWxkczpBcnJheTxzdHJpbmc+ID0gW1wibmFtZVwiLCBcInBob25lXCIsIFwic3RyZWV0XCIsIFwiaG91c2VcIl07XG4gIHByaXZhdGUgY2hlY2tlckZpZWxkczpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAudXNlckNhcnQoKVxuICAgICAgICAuc3Vic2NyaWJlKGNhcnQ9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VyRmllbGRzLm5leHQodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpO1xuICAgIH0sIDEwMCk7XG5cbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwiw5DCncOQwrXDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgfVxuXG5cbiAgY2hlY2tGb3JGaWVsZHMoZm9ybURpcmVjdGl2ZXM6QXJyYXk8YW55PiwgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbiB7XG5cbiAgICBsZXQgZmllbGRzQXJlQXZhaWxhYmxlOm9iamVjdCA9IHt9O1xuICAgIGxldCBub0ZpZWxkczpBcnJheTxzdHJpbmc+ID0gW107XG5cblxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmaWVsZHNBcmVBdmFpbGFibGVbZWxlbWVudC5uYW1lXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKCFmaWVsZHNBcmVBdmFpbGFibGUuaGFzT3duUHJvcGVydHkoZWxlbWVudCkpIHtcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub0ZpZWxkcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKjIMORwoTDkMK+w5HCgMOQwrzDkcKLIMOQwr7DkcKCw5HCgcORwoPDkcKCw5HCgcOQwrLDkcKDw5HCjsORwoIgw5HCgcOQwrvDkMK1w5DCtMORwoPDkcKOw5HCicOQwrjDkMK1IMOQwr7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCtSDDkMK0w5DCu8ORwo8gw5DCusOQwr7DkcKAw5HCgMOQwrXDkMK6w5HCgsOQwr3DkMK+w5DCuSDDkcKAw5DCsMOQwrHDkMK+w5HCgsORwosgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwr/DkMK+w5DCu8ORwo86XCIsIG5vRmllbGRzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBwYXltZW50O1xuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIlxuXG4gICAgICBpZiAoZGF0YVRvU2VuZC5jYXNoKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMKww5DCu8OQwrjDkcKHw5DCvcORwovDkMK8w5DCuCDDkMK6w5HCg8ORwoDDkcKMw5DCtcORwoDDkcKDXCI7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFUb1NlbmQuYmFua2NhcmQpIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCkcOQwrDDkMK9w5DCusOQwr7DkMKyw5HCgcOQwrrDkMK+w5DCuSDDkMK6w5DCsMORwoDDkcKCw5DCvsOQwrkgw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhVG9TZW5kKTtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICBcImNvbW1lbnRcIjogXCJcXG4gw5DCosOQwrjDkMK/IMOQwr7DkMK/w5DCu8OQwrDDkcKCw5HCizpcIiArIHBheW1lbnQgKyBcIlxcbsOQwprDkMK+w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrk6XCIgKyBjb21tZW50LFxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcbiAgICAgICAgLy8gICBcInR5cGVcIjogXCJzdHJpbmcgKHNlbGYgb3Igbm90aGluZylcIlxuICAgICAgICAvLyB9LFxuICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgIC8vIFwiY2l0eVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXG4gICAgICAgICAgXCJob21lXCI6IHRoaXMuc3RyaW5nVG9OdW1iZXIoZGF0YVRvU2VuZC5ob3VzZSksXG4gICAgICAgICAgXCJob3VzaW5nXCI6IGRhdGFUb1NlbmQuaG91c2luZyxcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXG4gICAgICAgICAgXCJlbnRyYW5jZVwiOiBkYXRhVG9TZW5kLmVudHJhbmNlLFxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxuICAgICAgICB9LFxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXG4gICAgICAgICAgXCJtYWlsXCI6IGRhdGFUb1NlbmQuZW1haWwsXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxuICAgICAgICB9LFxuICAgICAgICBcInBlcnNvbnNDb3VudFwiOiBkYXRhVG9TZW5kLnBlcnNvbnNDb3VudFxuICAgICAgfTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uub3JkZXJDYXJ0KGRhdGEpLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgY2hlY2tTdHJlZXQoZGF0YVRvU2VuZCkge1xuICAgIGNvbnNvbGUuaW5mbyh0aGlzLmNhcnQpO1xuICAgIGlmICh0aGlzLmNoZWNrRm9yRmllbGRzKHRoaXMub3JkZXJDYXJ0Ll9kaXJlY3RpdmVzLCB0aGlzLnJlcXVpcmVkRmllbGRzKSkge1xuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICAgIFwiY29tbWVudFwiOiBkYXRhVG9TZW5kLmNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogdGhpcy5zdHJpbmdUb051bWJlcihkYXRhVG9TZW5kLmhvdXNlKSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5jaGVja1N0cmVldChkYXRhKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gIH1cblxuICBzdHJpbmdUb051bWJlcihzdHI6bnVtYmVyIHwgYW55KTpudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBzdHIpO1xuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuICtzdHI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiw5DCn8OQwrDDkcKAw5DCsMOQwrzDkMK1w5HCgsORwoAgaG9tZSDDkMK0w5DCvsOQwrvDkMK2w5DCtcOQwr0gw5DCscORwovDkcKCw5HCjCDDkMK4w5DCu8OQwrggc3RyaW5nIMOQwrjDkMK7w5DCuCBudW1iZXJcIik7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaEFtb3VudF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldEFtb3VudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGFjdGlvbjphbnk7XG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLmNoYW5nZUFtb3VudCh0aGlzLmFjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudChhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLSc6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0KFxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50IC0gMVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiw5DClMOQwrjDkcKAw5DCtcOQwrrDkcKCw5DCuMOQwrLDkMKwIFNldERpc2hBbW91bnQgw5DCv8OQwr7DkMK7w5HCg8ORwofDkMK4w5DCu8OQwrAgw5DCu8OQwr7DkMK2w5DCvcOQwr7DkMK1IMOQwrfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IGFjdGlvblwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkaXNoQ2FsY10nXG59KVxuZXhwb3J0IGNsYXNzIERpc2hDYWxjRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSAgZGlzaDphbnk7XG4gIEBJbnB1dCgpICBhbW91bnQ6YW55O1xuICBASW5wdXQoKSAgc2VsZWN0ZWRNb2RpZmllcnM6YW55O1xuICBAT3V0cHV0KCkgIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgIGFtb3VudERpc2hUb0FkZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB3ZWlnaHRUb3RhbDtcbiAgYW1vdW50RGlzaDtcbiAgcHJpY2U7XG4gIGFtb3VudE1vZGlmaXJlczphbnkgPSB7fTtcbiAgc3RhdGVNb2RpZmllcnM6YW55ID0ge307XG4gIHRlc3Rjb3VudENhbGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWw6RWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgXCJkaXNoLWNhbGN1bGF0b3JcIik7XG4gICAgdGhpcy5hbW91bnREaXNoID0gMTtcbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5wcmljZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucHJpY2UsIFwiZGlzaC1wcmljZVwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJEaXNoKHRoaXMuZGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcih0aGlzLmRpc2gubW9kaWZpZXJzKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcmVuZGVyRGlzaChkaXNoOmFueSkge1xuICAgIC8qXG4gICAgIDxkaXYgY2xhc3M9XCJtYWluLWl0ZW1cIj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPlxuICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57e2Rpc2gubmFtZX19PC9kaXY+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1xdWFudGl0eVwiPlxuICAgICA8IS0tIGluY3JlYXNlIGJ1dHRvbi0tPlxuICAgICA8YSBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2J1dHRvblwiIChjbGljayk9XCJjaGFuZ2VBbW91bnRkaXNoKC0xKVwiPiYjODcyMjs8L2E+XG4gICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fY291bnRlclwiID57e2Ftb3VudERpc2h9fTwvc3Bhbj5cbiAgICAgPCEtLSBkZWNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgxKVwiPiYjeDJiOzwvYT5cbiAgICAgPC9kaXY+XG4gICAgIDxkaXYgY2xhc3M9XCJ3ZWlnaHQtcHJpY2VcIj5cbiAgICAge3tkaXNoLnByaWNlKmFtb3VudERpc2h9fSZuYnNwOyYjeDIwYmQ7XG4gICAgIDwvZGl2PlxuICAgICA8L2Rpdj5cblxuXG4gICAgICovXG4gICAgbGV0IG1haW5JdGVtID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobWFpbkl0ZW0sIFwiZGlzaC13cmFwZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIG1haW5JdGVtKTtcblxuICAgIGxldCBpdGVtTmFtZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIm5hbWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbU5hbWUpO1xuXG4gICAgbGV0IHRpdGxlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGl0bGUsIFwidGl0bGVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aXRsZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLm5hbWUpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWUsIHRpdGxlKTtcblxuICAgIGxldCB3ZWlnaHREaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIndlaWdodFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcImRpc2hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0RGlzaFdyYXBwZXIpO1xuXG4gICAgbGV0IHdlaWdodERpc2hWYWx1ZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodERpc2hWYWx1ZSwgXCJ2YWx1ZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgd2VpZ2h0RGlzaFZhbHVlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICsgXCIgw5DCsy5cIlxuICAgICk7XG4gICAgaWYgKHRoaXMuZGlzaC53ZWlnaHQgPT09IDAgfHwgIXRoaXMuZGlzaC53ZWlnaHQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0RGlzaFZhbHVlLCBcInplcm9cIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ2h0RGlzaFdyYXBwZXIsIHdlaWdodERpc2hWYWx1ZSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5wcmljZSk7XG4gICAgbGV0IHByaWNlRGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInByaWNlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VEaXNoV3JhcHBlciwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHByaWNlRGlzaFdyYXBwZXIsIHRoaXMucHJpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlRGlzaFdyYXBwZXIpO1xuXG4gICAgbGV0IGl0ZW1RdWFudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1RdWFudCwgXCJxdWFudGl0eVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBpdGVtUXVhbnQpO1xuXG4gICAgbGV0IGFkZEJ1dHRvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJtaW51c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFkZEJ1dHRvbiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFkZEJ1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgtMSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbClcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgYWRkQnV0dG9uKTtcblxuICAgIGxldCBjb3VudGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNvdW50ZXIsIFwicXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBjb3VudGVyKTtcblxuICAgIGxldCBtaW51c0J1dHRvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhtaW51c0J1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcInBsdXNcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShtaW51c0J1dHRvbiwgXCJpbm5lckhUTUxcIiwgXCImI3gyYjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obWludXNCdXR0b24sIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUFtb3VudGRpc2goMSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICB0aGlzLnByaWNlLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKVxuICAgICAgKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbClcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgbWludXNCdXR0b24pO1xuXG4gICAgbGV0IHdlaWdodFRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIndlaWdodFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodFRvdGFsV3JhcHBlcik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKHRoaXMuZGlzaC53ZWlnaHQgPT09IDAgfHwgIXRoaXMuZGlzaC53ZWlnaHQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0VG90YWwsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ2YWx1ZVwiKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpIC8vIFRPRE86IHRvdGFsIFdlaWdodFxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ2h0VG90YWxXcmFwcGVyLCB3ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy53ZWlnaHRUb3RhbCA9IHdlaWdodFRvdGFsO1xuXG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgdGhpcy5wcmljZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICB0aGlzLmdlbmVyYXRlUHJpY2UoZGlzaC5wcmljZSlcbiAgICApOyAvLyBUT0RPOiDDkMK/w5HCgMOQwrDDkMKyw5DCuMOQwrvDkcKMw5DCvcOQwr4gw5HCgcORwofDkMK4w5HCgsOQwrDDkcKCw5HCjCDDkcKGw5DCtcOQwr3DkcKDXG4gICAgbGV0IHByaWNlVG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHByaWNlVG90YWxXcmFwcGVyLCB0aGlzLnByaWNlKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBwcmljZVRvdGFsV3JhcHBlcik7XG4gIH1cblxuICBnZW5lcmF0ZVByaWNlKHByaWNlRGlzaCwgYW1vdW50PywgbW9kaWZpcmVzUHJpY2U/KSB7XG4gICAgbGV0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobW9kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gucHJpY2UgKiB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50Lmdyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICB9KTtcbiAgICBtb2RTdW0gPSBtb2RTdW0gKiB0aGlzLmFtb3VudERpc2g7XG4gICAgcmV0dXJuIChcbiAgICAgIHByaWNlRGlzaCAqIHRoaXMuYW1vdW50RGlzaCArIG1vZFN1bSArICc8ZGl2IGNsYXNzPVwiY3VycmVuY3lcIj4mbmJzcDsmI3gyMGJkOzwvZGl2PidcbiAgICApO1xuICB9XG5cbiAgZ2VuZXJhdGVUb3RhbFdlaWdodCgpIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGlmaWVycylcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXBzID0+IHtcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kWzBdLmdyb3VwSWQgPSBncm91cHMuZ3JvdXAuaWQ7XG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgbGV0IG1vZFN1bTpudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgIG1vZFN1bSA9IG1vZFN1bSArIGVsZW1lbnQuZGlzaC53ZWlnaHQgKiB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50Lmdyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gKiAxMDAwXG4gICAgfSk7XG4gICAgbW9kU3VtID0gcGFyc2VGbG9hdCgobW9kU3VtICogdGhpcy5hbW91bnREaXNoKS50b0ZpeGVkKDIpKTtcbiAgICBjb25zb2xlLmxvZyhtb2RTdW0sIHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICogdGhpcy5hbW91bnREaXNoKVxuICAgIGNvbnNvbGUubG9nKHRoaXMuZGlzaC53ZWlnaHQsIHRoaXMuYW1vdW50RGlzaClcbiAgICBsZXQgd2VpZ2h0ID0gKHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICogdGhpcy5hbW91bnREaXNoKSArIG1vZFN1bTtcblxuICAgIHJldHVybiB3ZWlnaHQgKyBcIiDDkMKzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xuICB9XG5cbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0b3RhbFdlaWd0aERpdiwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVRvdGFsV2VpZ2h0KCkpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50ZGlzaCh2YWx1ZSkge1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPD0gMCkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTtcblxuICAgIH1cbiAgICBpZiAodGhpcy5hbW91bnREaXNoID49IDE5OSkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xuXG4gICAgfVxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCLDkMKaIMORwo3DkcKCw5DCvsOQwrzDkcKDIMOQwrHDkMK7w5HCjsOQwrTDkcKDIMOQwrzDkMK+w5DCtsOQwr3DkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMOlwiXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuICAgIG1vZGlmaXJlcy5mb3JFYWNoKGVsZW1lbnRHcm91cCA9PiB7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdID0ge307XG5cbiAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXG4gICAgICAgIGVsZW1lbnRHcm91cC5ncm91cCA/IGVsZW1lbnRHcm91cC5ncm91cC5uYW1lIDogXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrBcIlxuICAgICAgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG5cbiAgICAgIGxldCBtb2RBcnIgPSBlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnM7XG5cbiAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICBsZXQgbW9kaWZpcmVEaXYgPSB0aGlzLm1vZGlmaXJlRGl2KGVsZW1lbnQsIGVsZW1lbnRHcm91cC5tb2RpZmllcklkKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChncm91cERpdiwgbW9kaWZpcmVEaXYpO1xuICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xuICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGlmIChtb2RpZmlyZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGggPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIGgsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIFwiPHA+KiDDosKAwpQgw5DCmsOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrvDkMK1w5DCvcORwovDkcKFIMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrHDkMK7w5HCjsOQwrTDkMKwIMOQwr/DkcKAw5DCuMOQwrzDkMK1w5DCvcORwo/DkMK1w5HCgsORwoHDkcKPIMOQwrTDkMK7w5HCjyDDkMK6w5DCsMOQwrbDkMK0w5DCvsOQwrkgw5DCv8OQwr7DkcKAw5HChsOQwrjDkMK4PC9wPlwiXG4gICAgICApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG4gIH1cblxuICBncm91cERpdihuYW1lR29ydXApIHtcbiAgICBsZXQgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2LCBcImdyb3VwLW1vZGlmaXJlcy13cmFwZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkaXYsIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChcIlwiICsgbmFtZUdvcnVwKSk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIG1vZGlmaXJlRGl2KGVsZW1lbnQsIGdyb3VwSWQpIHtcbiAgICBsZXQgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2LCBcImFkZGl0aW9uYWwtaXRlbVwiKTtcbiAgICB0aGlzLnJlbmRlck9uZU1vZGlmaXJlKGVsZW1lbnQsIGRpdiwgZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIHJlbmRlck9uZU1vZGlmaXJlKGVsZW1lbnQsIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBjb25zb2xlLmluZm8oJ3JlbmRlck9uZU1vZGlmaXJlJywgZWxlbWVudCk7XG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZSBzZWxlY3RlZE1vZGlmaWVycycsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKdw5DCsMOQwrfDkMKyw5DCsMOQwr3DkMK4w5HCjyDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbU5hbWVEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZURpdiwgXCJpdGVtLW5hbWVcIik7XG5cbiAgICBsZXQgbGFiZWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShsYWJlbCwgXCJmb3JcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lRGl2LCBsYWJlbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShsYWJlbCwgXCJpbm5lckhUTUxcIiwgZWxlbWVudC5kaXNoLm5hbWUpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbU5hbWVEaXYpO1xuXG4gICAgbGV0IHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcImxlZnQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVMZWZ0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3dlaWdodCcpO1xuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZUxlZnQsICdpbm5lckhUTUwnLCBlbGVtZW50LmRpc2gud2VpZ2h0ICogMTAwMCArIFwiIMOQwrMuXCIgKyAnJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZUxlZnQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkMK4w5DCt8OQwrzDkMK4w5DCvcOQwrXDkMK9w5DCuMORwo8gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbVF1YW50aXR5ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8qIFRPRE86IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrjDkcKCw5HCjDpcbiAgICAgw5DCtMOQwrAgMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEgXG4gICAgIMOQwrTDkMKwIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgIMOQwrTDkMKwIDAsMSBbZD09PTFdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG5cbiAgICAgw5DCtMOQwrAgMCxuW2Q9MF0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gMCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgw5DCtMOQwrAgMCxuW2Q+MDxuXSAtIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiBkLCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cblxuXG5cbiAgICAgayxuIFtrPG4sZD0wXSAtIGsgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgayDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstICjDkcKHw5DCsMORwoHDkcKCw5DCvcORwovDkMK5IMORwoHDkMK7w5HCg8ORwofDkMKww5DCuSDDkMK6w5DCvsOQwrPDkMK0w5DCsCBkPTApXG4gICAgIGssbiBbazxuLDA8ZD08bl0tIGQgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgMSDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGRlZmF1bHRBbW91bnQ6MFxuICAgICBoaWRlSWZEZWZhdWx0QW1vdW50OmZhbHNlIC8vw5DCn8ORwoDDkMK4w5DCt8OQwr3DkMKww5DCuiDDkcKCw5DCvsOQwrPDkMK+LCDDkcKHw5HCgsOQwr4gw5DCvcOQwrUgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrDDkcKCw5HCjCDDkcKBw5DCv8OQwrjDkcKBw5DCvsOQwrogw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiwgw5DCtcORwoHDkMK7w5DCuCDDkMK4w5HChSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMORwoDDkMKww5DCssOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssORwoNcbiAgICAgbWF4QW1vdW50OjBcbiAgICAgbWluQW1vdW50OjBcblxuICAgICAqL1xuXG4gICAgbGV0IG1pbiA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICBsZXQgZGVmID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMOQwrLDkcKLw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrkgw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGZhbHNlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMDogLy8gMCwxIFswXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCB0cnVlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbWluID09PSAxICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwrTDkMKww5DCtcORwoLDkcKBw5HCjyDDkMK9w5DCsMORwoHDkcKCw5HCgMOQwr7DkMK5w5DCusOQwrU6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuICAgICAgICB0aGlzLnJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwIMORwoDDkMK1w5DCvcOQwrTDkMK1w5HCgMOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwLCDDkMK0w5DCu8ORwo8gw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrk6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubWF4QW1vdW50ID4gMCAmJiBlbGVtZW50Lm1pbkFtb3VudCA+IDApIHtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwrHDkMK7w5DCvsOQwrrDkMKwIMORwoHDkcKCw5DCvsOQwrjDkMK8w5DCvsORwoHDkcKCw5DCuCDDkMK4IMOQwrLDkMK1w5HCgcOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgLy8gbGV0IHdlaWdodFByaWNlRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFByaWNlRGl2LCAnbW9kYWwtcHJpY2UnKTtcbiAgICAvLyBsZXQgd2VpZ2h0O1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC53ZWlnaHQ+MCl7XG4gICAgLy8gICB3ZWlnaHQgPSAgZWxlbWVudC5kaXNoLndlaWdodCArIFwiIMOQwrMgXCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcbiAgICAvLyBsZXQgcHJpY2U7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLnByaWNlPjApe1xuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCB3ZWlnaHRBbmRQcmljZUhUTUwgPSAod2VpZ2h0fHwnJykrKHdlaWdodCYmcHJpY2U/IHNsYXNoIDogJycpKyggcHJpY2UgfHwgJycpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWdodFByaWNlRGl2KTtcblxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwicmlnaHQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVSaWdodCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnaW5uZXJIVE1MJywgZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDAgKyBcIiDDkMKzLlwiICsgJzxkaXYgY2xhc3M9XCJzZXBhcmF0b3JcIj48L2Rpdj4nKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciwgd2VpZ2h0TW9kaWZpcmVSaWdodCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgcmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlcik7XG5cblxuICAgIGxldCBwcmljZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlLCBcIml0ZW0tcHJpY2VcIik7XG5cbiAgICBsZXQgcHJpY2VWYWx1ZTtcbiAgICBpZiAoZWxlbWVudC5kaXNoLnByaWNlID4gMCkge1xuICAgICAgcHJpY2VWYWx1ZSA9IGVsZW1lbnQuZGlzaC5wcmljZSArIFwiPGRpdiBjbGFzcyA9ICdjdXJyZW5jeSc+Jm5ic3A7JiN4MjBiZDs8L2Rpdj5cIjtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkocHJpY2UsIFwiaW5uZXJIVE1MXCIsIHByaWNlVmFsdWUpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgcHJpY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlLCBcInplcm8tcHJpY2VcIik7XG4gICAgfVxuXG5cbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcblxuICB9XG5cbiAgcmVuZGVyQ2hlY2tib3goZWxlbWVudCwgaXNBY3RpdmUsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcblxuICAgIGxldCBpbnB1dCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJpZFwiLCBlbGVtZW50Lm1vZGlmaWVySWQpO1xuICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IHRydWU7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IDE7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jaGVja2VkID0gZmFsc2U7XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAwO1xuXG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaW5wdXQsIFwibW9kYWwtY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGlucHV0KTtcblxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGlucHV0LCBcImNoYW5nZVwiLCBlID0+IHtcbiAgICAgIGlmICh0aGlzLmlkUmFkaW9Cb3goZ3JvdXBJZCkpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXSkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1ba2V5XSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGlucHV0LCAnY2hlY2tlZCcsICAgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGdyb3VwRGl2QmxvY2sgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgIFwiaW5wdXRcIlxuICAgICAgICApO1xuXG4gICAgICAgIGdyb3VwRGl2QmxvY2suZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICBpZiAoZWxlbWVudC5pZCAhPSBlLnRhcmdldC5pZCkgZWxlbWVudC5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlLnRhcmdldC5pZF0gPSBlLnRhcmdldC5jaGVja2VkO1xuICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gMTtcblxuICAgICAgfVxuXG5cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcblxuICB9XG5cbiAgcmVuZGVySW5wdXRCdXR0b24oZWxlbWVudCwgZ3JvdXBJZCwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdikge1xuXG4gICAgbGV0IHN0YXJ0QW1vdW50O1xuICAgIGlmIChlbGVtZW50LmRlZmF1bHRBbW91bnQgPiAwKSB7XG4gICAgICBzdGFydEFtb3VudCA9IGVsZW1lbnQuZGVmYXVsdEFtb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50Lm1pbkFtb3VudDtcblxuICAgIH1cbiAgICBpZiAoc3RhcnRBbW91bnQgPiAwKSB7XG5cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgfVxuXG5cbiAgICBsZXQgYU1pbnVzRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFNaW51c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYU1pbnVzRGl2LCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGFNaW51c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYU1pbnVzRGl2LCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gK3RoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF07XG5cbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB2YWx1ZSAtIDE7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPCBlbGVtZW50Lm1pbkFtb3VudFxuICAgICAgKVxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZWxlbWVudC5taW5BbW91bnQ7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBzcGFuLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgICApO1xuXG4gICAgICBpZiAodGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9PT0gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuICAgIGxldCBzcGFuID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHNwYW4sIFwiaXRlbS1xdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gc3RhcnRBbW91bnQ7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHNwYW4sXG4gICAgICBcImlubmVySFRNTFwiLFxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIHNwYW4pO1xuXG4gICAgbGV0IGFQbHVzRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFQbHVzRGl2LCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhUGx1c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImI3gyYjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGFQbHVzRGl2KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtUXVhbnRpdHkpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFQbHVzRGl2LCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gK3RoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF07XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgKyAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID5cbiAgICAgICAgZWxlbWVudC5tYXhBbW91bnQgJiZcbiAgICAgICAgZWxlbWVudC5tYXhBbW91bnQgIT0gMFxuICAgICAgKVxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZWxlbWVudC5tYXhBbW91bnQ7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBzcGFuLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgICApO1xuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPiAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldE1vZGlmaXJlcygpIHtcbiAgICBsZXQgbW9kaWZpZXJzVG9TZWxlY3QgPSBbXTtcblxuICAgIC8qaWYodGhpcy5zZWxlY3RlZE1vZGlmaWVycy5sZW5ndGggJiYgIShPYmplY3QudmFsdWVzKHRoaXMuc3RhdGVNb2RpZmllcnMpKS5sZW5ndGgpIHtcbiAgICAgIG1vZGlmaWVyc1RvU2VsZWN0ID0gdGhpcy5zZWxlY3RlZE1vZGlmaWVycztcbiAgICB9Ki9cblxuICAgIGxldCBtb2RpZmlyZXMgPSBbXTtcblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIG1vZGlmaWVyc1RvU2VsZWN0JywgbW9kaWZpZXJzVG9TZWxlY3QpO1xuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGJlZm9yZScsIHRoaXMuc3RhdGVNb2RpZmllcnMpO1xuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHNlbGVjdGVkTW9kaWZpZXJzIGJlZm9yZScsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuXG4gICAgZm9yIChsZXQgZ3JvdXBJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzKSB7XG4gICAgICBmb3IgKGxldCBtb2RpZmlyZUlkIGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0gfHwgbW9kaWZpZXJzVG9TZWxlY3QuZmluZChpdGVtID0+IGl0ZW0ubW9kaWZpZXJJZCA9PSBtb2RpZmlyZUlkKSkge1xuICAgICAgICAgIG1vZGlmaXJlcy5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBtb2RpZmlyZUlkLFxuICAgICAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVttb2RpZmlyZUlkXSxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWRcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzID0gbW9kaWZpcmVzO1xuXG4gICAgaWYgKHRoaXMuZGlzaC5tb2RpZmllcnMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBbXTtcblxuICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgaWYgKGdyb3VwLnJlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXAubW9kaWZpZXJJZF0pIHtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZE1vZGlmID0gW107XG4gICAgICAgICAgICBsZXQgbG9jYWxNb2RpZiA9IHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXAubW9kaWZpZXJJZF07IC8vLmZpbHRlcihlbGVtZW50PT5lbGVtZW50KTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbW9kIGluIGxvY2FsTW9kaWYpIHtcbiAgICAgICAgICAgICAgaWYgKGxvY2FsTW9kaWYuaGFzT3duUHJvcGVydHkobW9kKSkge1xuICAgICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmW21vZF0pIHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTW9kaWYucHVzaChsb2NhbE1vZGlmW21vZF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkTW9kaWYubGVuZ3RoIDwgZ3JvdXAubWluQW1vdW50KSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgICBib2R5OiBcIiDDkMKew5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5DCviDDkMKyw5HCi8OQwrHDkMK1w5HCgMOQwrjDkcKCw5DCtSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMORwosgw5DCuMOQwrcgw5DCusOQwrDDkcKCw5DCtcOQwrPDkMK+w5HCgMOQwrjDkMK4OiBcIiArXG4gICAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXAubmFtZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBbXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UucHVzaCh7XG4gICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICB0aXRsZTogXCLDkMKSw5DCvcOQwrjDkMK8w5DCsMOQwr3DkMK4w5DCtVwiLFxuICAgICAgICAgICAgICBib2R5OiBcIiDDkMKew5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5DCviDDkMKyw5HCi8OQwrHDkMK1w5HCgMOQwrjDkcKCw5DCtSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMORwosgw5DCuMOQwrcgw5DCusOQwrDDkcKCw5DCtcOQwrPDkMK+w5HCgMOQwrjDkMK4OiBcIiArXG4gICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBbXSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBhZnRlcicsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuICB9XG5cbiAgLyogw5DCv8ORwoDDkMK+w5DCssOQwrXDkcKAw5HCj8OQwrXDkcKCIMORwoHDkMK+w5DCvsORwoLDkMKyw5DCtcORwoHDkcKCw5DCssOQwrXDkcKCIMOQwrvDkMK4IMOQwrzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMKxIMOQwrXDkcKBw5DCu8OQwrggMSDDkcKCw5DCviDDkcKAw5DCtcOQwrDDkMK7w5DCuMOQwrfDkcKDw5DCtcORwoIgw5DCv8OQwr7DkMKyw5DCtcOQwrTDkMK1w5DCvcOQwrjDkMK1IMORwoDDkMKww5DCtMOQwrjDkMK+w5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4LFxuICAgw5DCtcORwoHDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgMSDDkcKCw5DCviDDkMKzw5DCtcOQwr3DkMK1w5HCgMOQwrjDkcKAw5HCg8OQwrXDkcKCIMOQwrTDkMK1w5DCu8OQwrDDkMK1w5HCgiDDkMKyw5HCi8OQwrHDkMK+w5HCgCDDkMKyw5HCgcOQwrXDkcKFIMOQwr7DkcKBw5HCgsOQwrDDkMK7w5HCjMOQwr3DkcKLw5HChSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIMOQwr3DkMK1IMOQwrLDkMK+w5DCt8OQwrzDkMK+w5DCtsOQwr3DkcKLw5DCvCwgw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK/w5HCgMOQwrXDkMK0w5HCg8OQwr/DkcKAw5DCtcOQwrbDkMK0w5DCtcOQwr3DkMK4w5DCtSovXG5cbiAgaWRSYWRpb0JveChncm91cElkKTpib29sZWFuIHtcbiAgICBsZXQgY3VycmVudEdyb3VwID0gdGhpcy5kaXNoLm1vZGlmaWVycy5maW5kKHggPT4geC5tb2RpZmllcklkID09PSBncm91cElkKTtcbiAgICByZXR1cm4gY3VycmVudEdyb3VwLm1pbkFtb3VudCA9PT0gMSAmJiBjdXJyZW50R3JvdXAubWF4QW1vdW50ID09PSAxO1xuICB9XG5cbiAgLy8gw5DCn8ORwoDDkMK+w5DCssOQwrXDkcKAw5HCj8OQwrXDkcKCIMOQwrzDkMK4w5DCvcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCssOQwrrDkMK+w5HCgsOQwr7DkcKAw5HCi8OQwrUgw5DCscORwovDkMK7w5DCuCDDkMKyw5HCi8OQwrHDkcKAw5DCsMOQwr3DkcKLXG4gIGNoZWNrTWluQW1vdW50TW9kaWZpcmVzKGdyb3VwSWQsIG1vZGlmaXJlKSB7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vdGhpcy5kaXNoLm1vZGlmaWVycyA9W107XG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBIb3N0TGlzdGVuZXIsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tjaGVja291dF0nXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrb3V0RGlyZWN0aXZlIHtcblxuICBASW5wdXQoKSBuYW1lOnN0cmluZztcbiAgQElucHV0KCkgZW1haWw6c3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGRlbGl2ZXJ5OmFueTtcbiAgQElucHV0KCkgbG9jYXRpb25JZDpzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0SWQ6IHN0cmluZztcbiAgQElucHV0KCkgaG9tZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6c3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSBlbnRyYW5jZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGRvb3JwaG9uZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOnN0cmluZztcblxuICBASW5wdXQoKSBwYXltZW50TWV0aG9kOnN0cmluZ1xuICBASW5wdXQoKSBwZXJzb25zQ291bnQ6bnVtYmVyO1xuICBASW5wdXQoKSBjb21tZW50OnN0cmluZztcbiAgXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjYXJ0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydClcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcblxuICAgIGlmKCF0aGlzLmxvY2F0aW9uSWQgJiYgISh0aGlzLnN0cmVldElkICYmIHRoaXMuaG9tZSkpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncORwoPDkMK2w5DCvcOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkMKww5DCtMORwoDDkMK1w5HCgScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogYCR7Y29tbWVudH1cXHJcXG7DkMKew5DCv8OQwrvDkMKww5HCgsOQwrA6ICR7cGF5bWVudE1ldGhvZH1gLFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogdGhpcy5wZXJzb25zQ291bnRcbiAgICB9O1xuICAgICBpZih0aGlzLmRlbGl2ZXJ5KXtcbiAgICAgICBkYXRhW1wiZGVsaXZlcnlcIl0gPSB7IFwidHlwZVwiOiBcInNlbGZcIn1cbiAgICAgfVxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJob21lXCI6ICt0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBTZXRBbW91bnREaXJlY3RpdmUsXG4gIENoZWNrb3V0RGlyZWN0aXZlXG5dO1xuXG5jb25zdCBNT0RVTEVTID0gW1xuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogWy4uLk1PRFVMRVNdLFxuICBwcm92aWRlcnM6IFtdLFxuICBkZWNsYXJhdGlvbnM6IFsuLi5ESVJFQ1RJVkVTXSxcbiAgZXhwb3J0czogWy4uLkRJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0TW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkJlaGF2aW9yU3ViamVjdCIsIkV2ZW50TWVzc2FnZSIsInRhcCIsIkluamVjdGFibGUiLCJOZXRTZXJ2aWNlIiwiRXZlbnRlclNlcnZpY2UiLCJEaXJlY3RpdmUiLCJJbnB1dCIsIkhvc3RMaXN0ZW5lciIsIlJlbmRlcmVyMiIsIkVsZW1lbnRSZWYiLCJFdmVudEVtaXR0ZXIiLCJPdXRwdXQiLCJOZ01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQWNBO1FBV0UsNEJBQ1UsR0FBYyxFQUNkLE9BQXNCO1lBRmhDLGlCQVdDO1lBVlMsUUFBRyxHQUFILEdBQUcsQ0FBVztZQUNkLFlBQU8sR0FBUCxPQUFPLENBQWU7WUFFOUIsSUFBSSxDQUFD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