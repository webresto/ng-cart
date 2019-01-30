import { Injectable, Directive, HostListener, Input, Renderer2, ElementRef, Output, EventEmitter, NgModule, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@sails-resto/ng-core';
import { __spread } from 'tslib';

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
            .pipe(tap(function (result) {
            _this.setcartIDFromStorage(result.cart.cartId);
            _this.cart.next(result.cart);
            _this.cartID = result.cart.cartId;
            _this.eventer.emitMessageEvent(new EventMessage('success', 'Успех', 'Заказ упешно оформлен'));
        }, function (error) {
            console.log("Ошибка оформления!", error);
            if (error.error && error.error.cart) {
                _this.setcartIDFromStorage(error.error.cart.cartId);
                _this.cart.next(error.error.cart);
                _this.cartID = error.error.cart.cartId;
            }
            if (error.message) {
                _this.eventer.emitMessageEvent(new EventMessage(error.message.type, error.message.title, error.message.body));
            }
            else {
                _this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ'));
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
    NgRestoCartService.ctorParameters = function () { return [
        { type: NetService },
        { type: EventerService }
    ]; };
    /** @nocollapse */ NgRestoCartService.ngInjectableDef = defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(inject(NetService), inject(EventerService)); }, token: NgRestoCartService, providedIn: "root" });
    return NgRestoCartService;
}());

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
        { type: Directive, args: [{
                    selector: '[addToCart]'
                },] },
    ];
    AddDishToCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    AddDishToCartDirective.propDecorators = {
        dish: [{ type: Input }],
        amountDish: [{ type: Input }],
        comment: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
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
        { type: Directive, args: [{
                    selector: '[amountCart]'
                },] },
    ];
    AmountCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService },
        { type: Renderer2 },
        { type: ElementRef }
    ]; };
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
        { type: Directive, args: [{
                    selector: '[deleteFromCart]'
                },] },
    ];
    DeleteFromCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    DeleteFromCartDirective.propDecorators = {
        dish: [{ type: Input }],
        amountDish: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
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
        this.checkerFields = new BehaviorSubject(undefined);
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
        { type: Directive, args: [{
                    selector: '[orderCart]'
                },] },
    ];
    OrderCartUserDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    OrderCartUserDirective.propDecorators = {
        orderCart: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
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
        { type: Directive, args: [{
                    selector: '[setDishAmount]'
                },] },
    ];
    SetAmountDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    SetAmountDirective.propDecorators = {
        action: [{ type: Input }],
        dish: [{ type: Input }],
        onClick: [{ type: HostListener, args: ['click',] }]
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
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
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
        { type: Directive, args: [{
                    selector: '[dishCalc]'
                },] },
    ];
    DishCalcDirective.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgRestoCartService }
    ]; };
    DishCalcDirective.propDecorators = {
        dish: [{ type: Input }],
        amount: [{ type: Input }],
        selectedModifiers: [{ type: Input }],
        validate: [{ type: Output }],
        amountDishToAdd: [{ type: Output }]
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
        this.success = new EventEmitter();
        this.error = new EventEmitter();
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
        { type: Directive, args: [{
                    selector: '[checkout]'
                },] },
    ];
    CheckoutDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        name: [{ type: Input }],
        email: [{ type: Input }],
        phone: [{ type: Input }],
        delivery: [{ type: Input }],
        locationId: [{ type: Input }],
        streetId: [{ type: Input }],
        home: [{ type: Input }],
        housing: [{ type: Input }],
        apartment: [{ type: Input }],
        entrance: [{ type: Input }],
        doorphone: [{ type: Input }],
        floor: [{ type: Input }],
        paymentMethod: [{ type: Input }],
        personsCount: [{ type: Input }],
        comment: [{ type: Input }],
        success: [{ type: Output }],
        error: [{ type: Output }],
        onClick: [{ type: HostListener, args: ['click',] }]
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
        { type: NgModule, args: [{
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

export { NgRestoCartService, NgRestoCartModule, AddDishToCartDirective as ɵa, AmountCartDirective as ɵb, CheckoutDirective as ɵg, DeleteFromCartDirective as ɵc, DishCalcDirective as ɵe, OrderCartUserDirective as ɵd, SetAmountDirective as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2FpbHMtcmVzdG8tbmctY2FydC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUudHMiLCJuZzovL0BzYWlscy1yZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHNhaWxzLXJlc3RvL25nLWNhcnQvbGliL25nLWNhcnQubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0BzYWlscy1yZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcbi8qICBUT0RPOiDDkMKSIMOQwrXDkcKCw5DCvsOQwrwgw5DCusOQwrvDkMKww5HCgcOQwrUgw5DCtcORwonDkMK1IMOQwr3DkMKww5DCtMOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5DCvsOQwrLDkMKww5HCgsORwowgw5DCu8OQwr7DkMKzw5DCuMOQwrrDkcKDIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrrDkMK4IMOQwrTDkMK+w5HCgcORwoLDkcKDw5DCv8OQwr3DkMK+w5HCgcORwoLDkMK4IMORwoDDkMKww5DCt8OQwr3DkcKLw5HChSDDkcKCw5DCuMOQwr/DkMK+w5DCsiDDkMK3w5HChcORwoDDkMKww5DCvcOQwrjDkMK7w5DCuMORwonDkcKMLCDDkMK9w5DCviDDkMK/w5DCvsOQwrrDkMKwIMOQwr3DkMK1w5HCgsORwoMgw5HChMOQwrjDkMK6w5HCgcOQwrAgw5DCvcORwoPDkMK2w5DCvcOQwr7DkMKzw5DCviDDkMK9w5DCsMOQwrwgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwrXDkcKCw5DCvlxuIMOQwrfDkMKww5HCgsORwoDDkcKDw5DCtMOQwr3DkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkMK+IMOQwr/DkcKAw5DCuMOQwrnDkMK0w5DCtcORwoLDkcKBw5HCjyDDkMK2w5DCtMOQwrDDkcKCw5HCjC4gICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XG4gIGNhcnRJRDpzdHJpbmc7XG4gIGNhcnQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1vZGlmaXJlczpCZWhhdmlvclN1YmplY3Q8YW55PjtcblxuICBtb2RpZmlyZXNNZXNzYWdlOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtZXNzYWdlczpFdmVudE1lc3NhZ2VbXTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLm1vZGlmaXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5pbml0aWFsU3RvcmFnZSgpO1xuXG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLnN1YnNjcmliZShtZXNzYWdlcyA9PiB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMpO1xuICB9XG5cbiAgaW5pdGlhbFN0b3JhZ2UoKSB7XG5cbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Y2FydElERnJvbVN0b3JhZ2UoKTtcblxuICAgIGlmICh0aGlzLmNhcnRJRCkge1xuICAgICAgdGhpcy5uZXQuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+IHtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qICAgICB0aGlzLnJlc3RvU3RvcmFnZVNlcnZpY2Uuc3ViKCdsb2NhbFN0b3JhZ2VTZXJ2aWNlJywnY2FydElEJykuc3Vic2NyaWJlKHJlcz0+e1xuXG4gICAgIGlmKHJlcy5jaGFuZ2VLZXkpe1xuICAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIscmVzKVxuICAgICB0aGlzLm5ldC5nZXQoJy9jYXJ0P2NhcnRJZD0nK3RoaXMuY2FydElEKS5zdWJzY3JpYmUoY2FydD0+e1xuICAgICB0aGlzLmNhcnQubmV4dChjYXJ0KTtcbiAgICAgfSk7fVxuXG4gICAgIH0pOzsgKi9cblxuXG4gIH1cblxuICBnZXRjYXJ0SURGcm9tU3RvcmFnZSgpOnN0cmluZyB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIGFkZERpc2hUb0NhcnQoZGF0YSkge1xuXG4gICAgaWYodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrvDkMK1w5DCvcOQwr4gw5DCsiDDkMK6w5DCvsORwoDDkMK3w5DCuMOQwr3DkcKDJylcbiAgICAgICAgKTtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ291bnRUb0NhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wb3N0KCcvY2FydC9zZXQnLCB7XG4gICAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpjDkMK3w5DCvMOQwrXDkMK9w5DCtcOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4nKVxuICAgICAgICApOyovXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK4w5DCt8OQwrzDkMK1w5DCvcOQwrjDkcKCw5HCjCDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Y2FydElERnJvbVN0b3JhZ2UocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkcKDw5HCgcOQwr/DkMK1w5HCiMOQwr3DkMK+IMORwoPDkMK0w5DCsMOQwrvDkMK1w5DCvcOQwr4nKVxuICAgICAgICApO1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5HCg8OQwrTDkMKww5DCu8OQwrjDkcKCw5HCjCDDkMKxw5DCu8ORwo7DkMK0w5DCvicpXG4gICAgICAgIClcbiAgICAgIH0pO1xuXG4gIH1cblxuICBjaGVja291dENhcnQoZGF0YSkge1xuICAgIGxldCBvcmRlcjpPcmRlciA9IHtcbiAgICAgIGNhcnRJZDogdGhpcy5jYXJ0SUQsXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgIHN0cmVldElkOiBkYXRhLnN0cmVldC5pZCxcbiAgICAgICAgaG9tZTogZGF0YS5ob3VzZSxcbiAgICAgICAgaG91c2luZzogZGF0YS5ob3VzaW5nLFxuICAgICAgICAvLyBpbmRleDogXCIxMjc4XCIsXG4gICAgICAgIGVudHJhbmNlOiBkYXRhLmVudHJhbmNlLFxuICAgICAgICBmbG9vcjogZGF0YS5mbG9vcixcbiAgICAgICAgYXBhcnRtZW50OiBkYXRhLmFwYXJ0bWVudFxuICAgICAgfSxcblxuICAgICAgY3VzdG9tZXI6IHtcbiAgICAgICAgcGhvbmU6IGRhdGEucGhvbmUsXG4gICAgICAgIG5hbWU6IGRhdGEubmFtZSxcbiAgICAgICAgbWFpbDogZGF0YS5lbWFpbCB8fCB1bmRlZmluZWRcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB0aGlzLm9yZGVyQ2FydChvcmRlcik7XG5cbiAgfVxuXG4gIG9yZGVyQ2FydChkYXRhKSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9vcmRlcicsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpfDkMKww5DCusOQwrDDkMK3IMORwoPDkMK/w5DCtcORwojDkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvScpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4geyAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr3DkMK4w5HCjyFcIixlcnJvcikgICAgICBcbiAgICAgICAgICAgIGlmKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRjYXJ0SURGcm9tU3RvcmFnZShlcnJvci5lcnJvci5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRJRCA9ZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGVycm9yLm1lc3NhZ2Upe1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoZXJyb3IubWVzc2FnZS50eXBlLCBlcnJvci5tZXNzYWdlLnRpdGxlLCBlcnJvci5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIC8qY2hlY2tTdHJlZXQoZGF0YSk6dm9pZCB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIGlmIChyZXN1bHQubWVzc2FnZSkge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UuYm9keVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH0qL1xuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWR7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPXJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYocmVzLm1lc3NhZ2Upe1xuXG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgfVxuXG4gICAgICB9LCBlcnJvciA9PntcbiAgICAgICAgaWYoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZihlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICB0aGlzLnNldGNhcnRJREZyb21TdG9yYWdlKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPWVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Y2FydElERnJvbVN0b3JhZ2UoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG5cbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OiBFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thZGRUb0NhcnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuICBtb2RpZmlyZXM7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLmdldE1vZGlmaXJlcygpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLm1vZGlmaXJlcyA9IHJlcyk7XG5cbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuICBASW5wdXQoKSBjb21tZW50OmFueTtcblxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcblxuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcblxuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRCwgYW1vdW50KSB7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudCxcbiAgICAgIFwiY2FydElkXCI6IHVuZGVmaW5lZCxcbiAgICAgIFwibW9kaWZpZXJzXCI6IHRoaXMubW9kaWZpcmVzLFxuICAgICAgXCJjb21tZW50XCI6dGhpcy5jb21tZW50XG4gICAgfTtcbiAgICBjb25zb2xlLmxvZyhcIsOQwrTDkcKAw5HCg8OQwrPDkMK4w5DCtSDDkMK0w5DCsMOQwr3DkcKLw5DCtVwiLCBkYXRhKVxuXG4gICAgaWYgKHRoaXMuY2FydC5jYXJ0SWQpIGRhdGEuY2FydElkID0gdGhpcy5jYXJ0LmNhcnRJZDtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLmFkZERpc2hUb0NhcnQoZGF0YSk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYW1vdW50Q2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFtb3VudENhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ6b2JqZWN0O1xuICBhbW91bnQ6c3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge1xuXG4gICAgdGhpcy5hbW91bnQgPSAnMCc7IFxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5jYXJ0ID0gcmVzO1xuICAgICAgICB0aGlzLmFtb3VudCA9IHJlcy5kaXNoZXNDb3VudCB8fCAwO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcbiAgICAgIH0pO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWxldGVGcm9tQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gIH1cblxuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBASW5wdXQoKSBhbW91bnREaXNoOmFueTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW29yZGVyQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG9yZGVyQ2FydDphbnk7XG4gIGNhcnQ6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm9yZGVyKHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPiA9IFtcIm5hbWVcIiwgXCJwaG9uZVwiLCBcInN0cmVldFwiLCBcImhvdXNlXCJdO1xuICBwcml2YXRlIGNoZWNrZXJGaWVsZHM6QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jaGVja2VyRmllbGRzID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6dm9pZCB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgICAgLnVzZXJDYXJ0KClcbiAgICAgICAgLnN1YnNjcmliZShjYXJ0PT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnQgJiYgdGhpcy5vcmRlckNhcnQudmFsaWQgJiYgdGhpcy5jYXJ0LmNhcnRUb3RhbCAhPSBjYXJ0LmNhcnRUb3RhbCAmJiBjYXJ0LmNhcnRUb3RhbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FydCA9IGNhcnQ7XG4gICAgICAgIH0pO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlckZpZWxkcy5uZXh0KHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKTtcbiAgICB9LCAxMDApO1xuXG4gICAgdGhpcy5jaGVja2VyRmllbGRzLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ3N0cmVldCddLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lID0gdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgfHwgXCI3ODg4ODg4ODg4OFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydob3VzZSddLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsaWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgfHwgXCLDkMKdw5DCtcORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcbiAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSlcblxuXG4gIH1cblxuXG4gIGNoZWNrRm9yRmllbGRzKGZvcm1EaXJlY3RpdmVzOkFycmF5PGFueT4sIHJlcXVpcmVkRmllbGRzOkFycmF5PHN0cmluZz4pOmJvb2xlYW4ge1xuXG4gICAgbGV0IGZpZWxkc0FyZUF2YWlsYWJsZTpvYmplY3QgPSB7fTtcbiAgICBsZXQgbm9GaWVsZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xuXG5cbiAgICBmb3JtRGlyZWN0aXZlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZmllbGRzQXJlQXZhaWxhYmxlW2VsZW1lbnQubmFtZV0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmICghZmllbGRzQXJlQXZhaWxhYmxlLmhhc093blByb3BlcnR5KGVsZW1lbnQpKSB7XG4gICAgICAgIG5vRmllbGRzLnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobm9GaWVsZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiw5DCoyDDkcKEw5DCvsORwoDDkMK8w5HCiyDDkMK+w5HCgsORwoHDkcKDw5HCgsORwoHDkMKyw5HCg8ORwo7DkcKCIMORwoHDkMK7w5DCtcOQwrTDkcKDw5HCjsORwonDkMK4w5DCtSDDkMK+w5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5HCi8OQwrUgw5DCtMOQwrvDkcKPIMOQwrrDkMK+w5HCgMORwoDDkMK1w5DCusORwoLDkMK9w5DCvsOQwrkgw5HCgMOQwrDDkMKxw5DCvsORwoLDkcKLIMOQwrzDkMK+w5DCtMORwoPDkMK7w5HCjyDDkMK/w5DCvsOQwrvDkcKPOlwiLCBub0ZpZWxkcylcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcmRlcihkYXRhVG9TZW5kKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XG4gICAgICBsZXQgcGF5bWVudDtcbiAgICAgIGxldCBjb21tZW50ID0gZGF0YVRvU2VuZC5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCJcblxuICAgICAgaWYgKGRhdGFUb1NlbmQuY2FzaCkge1xuICAgICAgICBwYXltZW50ID0gXCLDkMKdw5DCsMOQwrvDkMK4w5HCh8OQwr3DkcKLw5DCvMOQwrggw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIGlmIChkYXRhVG9TZW5kLmJhbmtjYXJkKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwpHDkMKww5DCvcOQwrrDkMK+w5DCssORwoHDkMK6w5DCvsOQwrkgw5DCusOQwrDDkcKAw5HCgsOQwr7DkMK5IMOQwrrDkcKDw5HCgMORwozDkMK1w5HCgMORwoNcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YVRvU2VuZCk7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgICAgXCJjb21tZW50XCI6IFwiXFxuIMOQwqLDkMK4w5DCvyDDkMK+w5DCv8OQwrvDkMKww5HCgsORwos6XCIgKyBwYXltZW50ICsgXCJcXG7DkMKaw5DCvsOQwrzDkMK1w5DCvcORwoLDkMKww5HCgMOQwrjDkMK5OlwiICsgY29tbWVudCxcbiAgICAgICAgLy8gXCJkZWxpdmVyeVwiOiB7XG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxuICAgICAgICAgIFwiaG9tZVwiOiB0aGlzLnN0cmluZ1RvTnVtYmVyKGRhdGFUb1NlbmQuaG91c2UpLFxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwiZG9vcnBob25lXCI6IGRhdGFUb1NlbmQuZG9vcnBob25lLFxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXG4gICAgICAgICAgXCJhcGFydG1lbnRcIjogZGF0YVRvU2VuZC5hcGFydG1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgICAgXCJwaG9uZVwiOiAnKycgKyBkYXRhVG9TZW5kLnBob25lLFxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLm9yZGVyQ2FydChkYXRhKS5zdWJzY3JpYmUoKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuXG5cbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGFUb1NlbmQpIHtcbiAgICBjb25zb2xlLmluZm8odGhpcy5jYXJ0KTtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICBcImNvbW1lbnRcIjogZGF0YVRvU2VuZC5jb21tZW50LFxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcbiAgICAgICAgLy8gICBcInR5cGVcIjogXCJzdHJpbmcgKHNlbGYgb3Igbm90aGluZylcIlxuICAgICAgICAvLyB9LFxuICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgIC8vIFwiY2l0eVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXG4gICAgICAgICAgXCJob21lXCI6IHRoaXMuc3RyaW5nVG9OdW1iZXIoZGF0YVRvU2VuZC5ob3VzZSksXG4gICAgICAgICAgXCJob3VzaW5nXCI6IGRhdGFUb1NlbmQuaG91c2luZyxcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXG4gICAgICAgICAgXCJlbnRyYW5jZVwiOiBkYXRhVG9TZW5kLmVudHJhbmNlLFxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxuICAgICAgICB9LFxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXG4gICAgICAgICAgXCJtYWlsXCI6IGRhdGFUb1NlbmQuZW1haWwsXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxuICAgICAgICB9LFxuICAgICAgICBcInBlcnNvbnNDb3VudFwiOiBkYXRhVG9TZW5kLnBlcnNvbnNDb3VudFxuICAgICAgfTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2UuY2hlY2tTdHJlZXQoZGF0YSk7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICB9XG5cbiAgc3RyaW5nVG9OdW1iZXIoc3RyOm51bWJlciB8IGFueSk6bnVtYmVyIHtcbiAgICBjb25zb2xlLmxvZyh0eXBlb2Ygc3RyKTtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiArc3RyO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN0ciA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5lcnJvcihcIsOQwp/DkMKww5HCgMOQwrDDkMK8w5DCtcORwoLDkcKAIGhvbWUgw5DCtMOQwr7DkMK7w5DCtsOQwrXDkMK9IMOQwrHDkcKLw5HCgsORwowgw5DCuMOQwrvDkMK4IHN0cmluZyDDkMK4w5DCu8OQwrggbnVtYmVyXCIpO1xuICAgIH1cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3NldERpc2hBbW91bnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXRBbW91bnREaXJlY3RpdmUge1xuICBASW5wdXQoKSBhY3Rpb246YW55O1xuICBASW5wdXQoKSBkaXNoOmFueTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5jaGFuZ2VBbW91bnQodGhpcy5hY3Rpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBjYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gIH1cblxuICBjaGFuZ2VBbW91bnQoYWN0aW9uKSB7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnKyc6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0KFxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50ICsgMVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJy0nOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCAtIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmxvZyhcIsOQwpTDkMK4w5HCgMOQwrXDkMK6w5HCgsOQwrjDkMKyw5DCsCBTZXREaXNoQW1vdW50IMOQwr/DkMK+w5DCu8ORwoPDkcKHw5DCuMOQwrvDkMKwIMOQwrvDkMK+w5DCtsOQwr3DkMK+w5DCtSDDkMK3w5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSBhY3Rpb25cIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGlzaENhbGNdJ1xufSlcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgIGRpc2g6YW55O1xuICBASW5wdXQoKSAgYW1vdW50OmFueTtcbiAgQElucHV0KCkgIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpICB2YWxpZGF0ZTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpICBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgd2VpZ2h0VG90YWw7XG4gIGFtb3VudERpc2g7XG4gIHByaWNlO1xuICBhbW91bnRNb2RpZmlyZXM6YW55ID0ge307XG4gIHN0YXRlTW9kaWZpZXJzOmFueSA9IHt9O1xuICB0ZXN0Y291bnRDYWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsOkVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFwiZGlzaC1jYWxjdWxhdG9yXCIpO1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IDE7XG4gICAgdGhpcy5hbW91bnREaXNoVG9BZGQuZW1pdCh0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnByaWNlLCBcImRpc2gtcHJpY2VcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyRGlzaCh0aGlzLmRpc2gpO1xuICAgICAgdGhpcy5yZW5kZXIodGhpcy5kaXNoLm1vZGlmaWVycyk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlbmRlckRpc2goZGlzaDphbnkpIHtcbiAgICAvKlxuICAgICA8ZGl2IGNsYXNzPVwibWFpbi1pdGVtXCI+XG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5cbiAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tkaXNoLm5hbWV9fTwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlcIj5cbiAgICAgPCEtLSBpbmNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgtMSlcIj4mIzg3MjI7PC9hPlxuICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIiA+e3thbW91bnREaXNofX08L3NwYW4+XG4gICAgIDwhLS0gZGVjcmVhc2UgYnV0dG9uLS0+XG4gICAgIDxhIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUFtb3VudGRpc2goMSlcIj4mI3gyYjs8L2E+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwid2VpZ2h0LXByaWNlXCI+XG4gICAgIHt7ZGlzaC5wcmljZSphbW91bnREaXNofX0mbmJzcDsmI3gyMGJkO1xuICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+XG5cblxuICAgICAqL1xuICAgIGxldCBtYWluSXRlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1haW5JdGVtLCBcImRpc2gtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBtYWluSXRlbSk7XG5cbiAgICBsZXQgaXRlbU5hbWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJuYW1lXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1OYW1lKTtcblxuICAgIGxldCB0aXRsZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRpdGxlLCBcInRpdGxlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGl0bGUsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5uYW1lKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lLCB0aXRsZSk7XG5cbiAgICBsZXQgd2VpZ2h0RGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJkaXNoXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodERpc2hXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHREaXNoVmFsdWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwidmFsdWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHdlaWdodERpc2hWYWx1ZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICB0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCArIFwiIMOQwrMuXCJcbiAgICApO1xuICAgIGlmICh0aGlzLmRpc2gud2VpZ2h0ID09PSAwIHx8ICF0aGlzLmRpc2gud2VpZ2h0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodERpc2hWYWx1ZSwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodERpc2hXcmFwcGVyLCB3ZWlnaHREaXNoVmFsdWUpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmRpc2gucHJpY2UpO1xuICAgIGxldCBwcmljZURpc2hXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VEaXNoV3JhcHBlciwgXCJwcmljZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZURpc2hXcmFwcGVyLCB0aGlzLnByaWNlKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBwcmljZURpc2hXcmFwcGVyKTtcblxuICAgIGxldCBpdGVtUXVhbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtUXVhbnQsIFwicXVhbnRpdHlcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbVF1YW50KTtcblxuICAgIGxldCBhZGRCdXR0b24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwibWludXNcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhZGRCdXR0b24sIFwiaW5uZXJIVE1MXCIsIFwiJiM4NzIyO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhZGRCdXR0b24sIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUFtb3VudGRpc2goLTEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGFkZEJ1dHRvbik7XG5cbiAgICBsZXQgY291bnRlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjb3VudGVyLCBcInF1YW50aXR5X19jb3VudGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgY291bnRlcik7XG5cbiAgICBsZXQgbWludXNCdXR0b24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobWludXNCdXR0b24sIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJwbHVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobWludXNCdXR0b24sIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKG1pbnVzQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKDEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgdGhpcy5wcmljZSxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSlcbiAgICAgICk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXG4gICAgfSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIG1pbnVzQnV0dG9uKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCB3ZWlnaHRUb3RhbFdyYXBwZXIpO1xuXG4gICAgbGV0IHdlaWdodFRvdGFsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlmICh0aGlzLmRpc2gud2VpZ2h0ID09PSAwIHx8ICF0aGlzLmRpc2gud2VpZ2h0KSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInplcm9cIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0VG90YWwsIFwidmFsdWVcIik7XG4gICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKSAvLyBUT0RPOiB0b3RhbCBXZWlnaHRcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodFRvdGFsV3JhcHBlciwgd2VpZ2h0VG90YWwpO1xuICAgIHRoaXMud2VpZ2h0VG90YWwgPSB3ZWlnaHRUb3RhbDtcblxuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHRoaXMucHJpY2UsXG4gICAgICBcImlubmVySFRNTFwiLFxuICAgICAgdGhpcy5nZW5lcmF0ZVByaWNlKGRpc2gucHJpY2UpXG4gICAgKTsgLy8gVE9ETzogw5DCv8ORwoDDkMKww5DCssOQwrjDkMK7w5HCjMOQwr3DkMK+IMORwoHDkcKHw5DCuMORwoLDkMKww5HCgsORwowgw5HChsOQwrXDkMK9w5HCg1xuICAgIGxldCBwcmljZVRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInByaWNlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZVRvdGFsV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VUb3RhbFdyYXBwZXIpO1xuICB9XG5cbiAgZ2VuZXJhdGVQcmljZShwcmljZURpc2gsIGFtb3VudD8sIG1vZGlmaXJlc1ByaWNlPykge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLnByaWNlICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgfSk7XG4gICAgbW9kU3VtID0gbW9kU3VtICogdGhpcy5hbW91bnREaXNoO1xuICAgIHJldHVybiAoXG4gICAgICBwcmljZURpc2ggKiB0aGlzLmFtb3VudERpc2ggKyBtb2RTdW0gKyAnPGRpdiBjbGFzcz1cImN1cnJlbmN5XCI+Jm5ic3A7JiN4MjBiZDs8L2Rpdj4nXG4gICAgKTtcbiAgfVxuXG4gIGdlbmVyYXRlVG90YWxXZWlnaHQoKSB7XG4gICAgbGV0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobW9kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gud2VpZ2h0ICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdICogMTAwMFxuICAgIH0pO1xuICAgIG1vZFN1bSA9IHBhcnNlRmxvYXQoKG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaCkudG9GaXhlZCgyKSk7XG4gICAgY29uc29sZS5sb2cobW9kU3VtLCB0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaClcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRpc2gud2VpZ2h0LCB0aGlzLmFtb3VudERpc2gpXG4gICAgbGV0IHdlaWdodCA9ICh0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaCkgKyBtb2RTdW07XG5cbiAgICByZXR1cm4gd2VpZ2h0ICsgXCIgw5DCsy4gPGRpdiBjbGFzcz0nc2VwYXJhdG9yJz48L2Rpdj5cIjtcbiAgfVxuXG4gIGlubmVyVG90YWxXZWlnaHQodG90YWxXZWlndGhEaXYpIHtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodG90YWxXZWlndGhEaXYsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVUb3RhbFdlaWdodCgpKTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudGRpc2godmFsdWUpIHtcbiAgICB0aGlzLmFtb3VudERpc2ggPSB0aGlzLmFtb3VudERpc2ggKyB2YWx1ZTtcbiAgICBpZiAodGhpcy5hbW91bnREaXNoIDw9IDApIHtcbiAgICAgIHRoaXMuYW1vdW50RGlzaCA9IDE7XG5cbiAgICB9XG4gICAgaWYgKHRoaXMuYW1vdW50RGlzaCA+PSAxOTkpIHtcbiAgICAgIHRoaXMuYW1vdW50RGlzaCA9IDE5OTtcblxuICAgIH1cbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG4gIHJlbmRlcihtb2RpZmlyZXM6YW55KSB7XG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcblxuICAgIGlmIChtb2RpZmlyZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGggPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIGgsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIFwiw5DCmiDDkcKNw5HCgsOQwr7DkMK8w5HCgyDDkMKxw5DCu8ORwo7DkMK0w5HCgyDDkMK8w5DCvsOQwrbDkMK9w5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrjDkcKCw5HCjDpcIlxuICAgICAgKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBoKTtcbiAgICB9XG5cbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuXG4gICAgICBsZXQgZ3JvdXBEaXYgPSB0aGlzLmdyb3VwRGl2KFxuICAgICAgICBlbGVtZW50R3JvdXAuZ3JvdXAgPyBlbGVtZW50R3JvdXAuZ3JvdXAubmFtZSA6IFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwXCJcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZ3JvdXBEaXYpO1xuXG4gICAgICBsZXQgbW9kQXJyID0gZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzO1xuXG4gICAgICBtb2RBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgbGV0IG1vZGlmaXJlRGl2ID0gdGhpcy5tb2RpZmlyZURpdihlbGVtZW50LCBlbGVtZW50R3JvdXAubW9kaWZpZXJJZCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZ3JvdXBEaXYsIG1vZGlmaXJlRGl2KTtcbiAgICAgICAgaWYgKGVsZW1lbnQuZGVmYXVsdEFtb3VudCA8IDEpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpZiAobW9kaWZpcmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBoID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICBoLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICBcIjxwPiogw6LCgMKUIMOQwprDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK7w5DCtcOQwr3DkcKLw5HChSDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMKxw5DCu8ORwo7DkMK0w5DCsCDDkMK/w5HCgMOQwrjDkMK8w5DCtcOQwr3DkcKPw5DCtcORwoLDkcKBw5HCjyDDkMK0w5DCu8ORwo8gw5DCusOQwrDDkMK2w5DCtMOQwr7DkMK5IMOQwr/DkMK+w5HCgMORwobDkMK4w5DCuDwvcD5cIlxuICAgICAgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgZ3JvdXBEaXYobmFtZUdvcnVwKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJncm91cC1tb2RpZmlyZXMtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoXCJcIiArIG5hbWVHb3J1cCkpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICBtb2RpZmlyZURpdihlbGVtZW50LCBncm91cElkKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJhZGRpdGlvbmFsLWl0ZW1cIik7XG4gICAgdGhpcy5yZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBkaXYsIGdyb3VwSWQpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICByZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBtb2RpZmlyZURpdiwgZ3JvdXBJZCkge1xuXG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZScsIGVsZW1lbnQpO1xuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUgc2VsZWN0ZWRNb2RpZmllcnMnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgICAvLyDDkMKgw5DCtcOQwr3DkMK0w5DCtcORwoAgw5DCncOQwrDDkMK3w5DCssOQwrDDkMK9w5DCuMORwo8gw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgbGV0IGl0ZW1OYW1lRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWVEaXYsIFwiaXRlbS1uYW1lXCIpO1xuXG4gICAgbGV0IGxhYmVsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGFiZWwsIFwiZm9yXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtTmFtZURpdiwgbGFiZWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobGFiZWwsIFwiaW5uZXJIVE1MXCIsIGVsZW1lbnQuZGlzaC5uYW1lKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1OYW1lRGl2KTtcblxuICAgIGxldCB3ZWlndGhNb2RpZmlyZVdyYXBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlndGhNb2RpZmlyZVdyYXBlciwgXCJsZWZ0LXdlaWdodC1tb2RpZmlyZS13cmFwZXJcIik7XG4gICAgbGV0IHdlaWdodE1vZGlmaXJlTGVmdCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZUxlZnQsICd3ZWlnaHQnKTtcbiAgICBpZiAoZWxlbWVudC5kaXNoLndlaWdodCA9PT0gMCB8fCBlbGVtZW50LmRpc2gud2VpZ2h0IDwgMCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZUxlZnQsICd6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnaW5uZXJIVE1MJywgZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDAgKyBcIiDDkMKzLlwiICsgJycpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlndGhNb2RpZmlyZVdyYXBlciwgd2VpZ2h0TW9kaWZpcmVMZWZ0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCB3ZWlndGhNb2RpZmlyZVdyYXBlcik7XG5cbiAgICAvLyDDkMKgw5DCtcOQwr3DkMK0w5DCtcORwoAgw5DCscOQwrvDkMK+w5DCusOQwrAgw5DCuMOQwrfDkMK8w5DCuMOQwr3DkMK1w5DCvcOQwrjDkcKPIMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgbGV0IGl0ZW1RdWFudGl0eSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvKiBUT0RPOiDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkMK/w5HCgMOQwr7DkMKyw5DCtcORwoDDkMK4w5HCgsORwow6XG4gICAgIMOQwrTDkMKwIDAsMCxbMF0gLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5DCssORwovDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuSDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBIFxuICAgICDDkMK0w5DCsCAwLDEgWzBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICDDkMK0w5DCsCAwLDEgW2Q9PT0xXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEsIMOQwrLDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuVxuXG4gICAgIMOQwrTDkMKwIDAsbltkPTBdIC0gw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOIDAgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG4gICAgIMOQwrTDkMKwIDAsbltkPjA8bl0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gZCwgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGssbiBbazxuLGQ9MF0gLSBrIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIGsgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLSAow5HCh8OQwrDDkcKBw5HCgsOQwr3DkcKLw5DCuSDDkcKBw5DCu8ORwoPDkcKHw5DCsMOQwrkgw5DCusOQwr7DkMKzw5DCtMOQwrAgZD0wKVxuICAgICBrLG4gW2s8biwwPGQ9PG5dLSBkIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuXG5cblxuICAgICBkZWZhdWx0QW1vdW50OjBcbiAgICAgaGlkZUlmRGVmYXVsdEFtb3VudDpmYWxzZSAvL8OQwp/DkcKAw5DCuMOQwrfDkMK9w5DCsMOQwrogw5HCgsOQwr7DkMKzw5DCviwgw5HCh8ORwoLDkMK+IMOQwr3DkMK1IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMKww5HCgsORwowgw5HCgcOQwr/DkMK4w5HCgcOQwr7DkMK6IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIsIMOQwrXDkcKBw5DCu8OQwrggw5DCuMORwoUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkcKAw5DCsMOQwrLDkMK9w5DCviDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkcKDXG4gICAgIG1heEFtb3VudDowXG4gICAgIG1pbkFtb3VudDowXG5cbiAgICAgKi9cblxuICAgIGxldCBtaW4gPSBlbGVtZW50Lm1pbkFtb3VudDtcbiAgICBsZXQgbWF4ID0gZWxlbWVudC5tYXhBbW91bnQ7XG4gICAgbGV0IGRlZiA9IGVsZW1lbnQuZGVmYXVsdEFtb3VudDtcblxuICAgIGNvbnNvbGUuaW5mbygnbWluIG1heCBkZWYnLCBtaW4sIG1heCwgZGVmKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAwICYmIGRlZiA9PT0gMDogLy8gMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDA6IC8vIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgZmFsc2UsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgdHJ1ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG1pbiA9PT0gMSAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgZWxlbWVudC5kaXNoLm5hbWUsXG4gICAgICAgICAgXCLDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK0w5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCvcOQwrDDkcKBw5HCgsORwoDDkMK+w5DCucOQwrrDkMK1OlwiLFxuICAgICAgICAgIG1pbixcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgZGVmXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA8PSBtYXggJiYgZGVmID49IG1pbiAmJiBkZWYgPD0gbWF4ICYmIG1heCA+IDE6IC8vZCDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4hISEgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5HCh8ORwoLDkMK+w5DCscOQwrLDkcKLIMORwoHDkcKCw5DCvsORwo/DkMK7w5DCsCDDkcKGw5HCi8ORwoTDkcKAw5DCsCAxIMOQwrIgw5DCsMOQwrzDkMKww5HCg8OQwr3DkcKCLCDDkMK8w5DCsMOQwrrDkcKBIG4ow5DCscOQwr7DkMK7w5HCjMORwojDkMK1IG4gw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCvcOQwrjDkMKww5DCvMOQwrDDkMK7w5DCvsORwoHDkcKMKSDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgICAgdGhpcy5yZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCDDkcKAw5DCtcOQwr3DkMK0w5DCtcORwoDDkMKwIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsCwgw5DCtMOQwrvDkcKPIMOQwrfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK5OlwiLFxuICAgICAgICAgIG1pbixcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgZGVmXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm1heEFtb3VudCA+IDAgJiYgZWxlbWVudC5taW5BbW91bnQgPiAwKSB7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkcKBw5HCgsOQwr7DkMK4w5DCvMOQwr7DkcKBw5HCgsOQwrggw5DCuCDDkMKyw5DCtcORwoHDkMKwIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIC8vIGxldCB3ZWlnaHRQcmljZURpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRQcmljZURpdiwgJ21vZGFsLXByaWNlJyk7XG4gICAgLy8gbGV0IHdlaWdodDtcbiAgICAvLyBpZihlbGVtZW50LmRpc2gud2VpZ2h0PjApe1xuICAgIC8vICAgd2VpZ2h0ID0gIGVsZW1lbnQuZGlzaC53ZWlnaHQgKyBcIiDDkMKzIFwiO1xuICAgIC8vIH1cbiAgICAvLyBsZXQgc2xhc2ggPSBcIi8gXCI7XG4gICAgLy8gbGV0IHByaWNlO1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC5wcmljZT4wKXtcbiAgICAvLyAgIHByaWNlID0gZWxlbWVudC5kaXNoLnByaWNlICsgXCImbmJzcDsmI3gyMGJkO1wiO1xuICAgIC8vIH1cbiAgICAvLyBsZXQgd2VpZ2h0QW5kUHJpY2VIVE1MID0gKHdlaWdodHx8JycpKyh3ZWlnaHQmJnByaWNlPyBzbGFzaCA6ICcnKSsoIHByaWNlIHx8ICcnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodFByaWNlRGl2LCAnaW5uZXJIVE1MJywgd2VpZ2h0QW5kUHJpY2VIVE1MKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCB3ZWlnaHRQcmljZURpdik7XG5cbiAgICBsZXQgcmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhyaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcInJpZ2h0LXdlaWdodC1tb2RpZmlyZS13cmFwZXJcIik7XG4gICAgbGV0IHdlaWdodE1vZGlmaXJlUmlnaHQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3dlaWdodCcpO1xuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlUmlnaHQsICd6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ2lubmVySFRNTCcsIGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwICsgXCIgw5DCsy5cIiArICc8ZGl2IGNsYXNzPVwic2VwYXJhdG9yXCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG5cbiAgICBsZXQgcHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJpdGVtLXByaWNlXCIpO1xuXG4gICAgbGV0IHByaWNlVmFsdWU7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC5wcmljZSA+IDApIHtcbiAgICAgIHByaWNlVmFsdWUgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIjxkaXYgY2xhc3MgPSAnY3VycmVuY3knPiZuYnNwOyYjeDIwYmQ7PC9kaXY+XCI7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHByaWNlLCBcImlubmVySFRNTFwiLCBwcmljZVZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJ6ZXJvLXByaWNlXCIpO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG5cbiAgfVxuXG4gIHJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGlzQWN0aXZlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBsZXQgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwiaWRcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAxO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMDtcblxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0LCBcIm1vZGFsLWNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBpbnB1dCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICBpZiAodGhpcy5pZFJhZGlvQm94KGdyb3VwSWQpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2tleV0gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCAgIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncm91cERpdkJsb2NrID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcImlucHV0XCJcbiAgICAgICAgKTtcblxuICAgICAgICBncm91cERpdkJsb2NrLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuaWQgIT0gZS50YXJnZXQuaWQpIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IDE7XG5cbiAgICAgIH1cblxuXG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG5cbiAgfVxuXG4gIHJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpIHtcblxuICAgIGxldCBzdGFydEFtb3VudDtcbiAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50ID4gMCkge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5taW5BbW91bnQ7XG5cbiAgICB9XG4gICAgaWYgKHN0YXJ0QW1vdW50ID4gMCkge1xuXG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IGFNaW51c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWludXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFNaW51c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhTWludXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFNaW51c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgLSAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdIDwgZWxlbWVudC5taW5BbW91bnRcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPT09IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzcGFuLCBcIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHN0YXJ0QW1vdW50O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICBzcGFuLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBzcGFuKTtcblxuICAgIGxldCBhUGx1c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGx1c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYVBsdXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhUGx1c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUGx1c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlICsgMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+XG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICYmXG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICE9IDBcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWF4QW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID4gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRNb2RpZmlyZXMoKSB7XG4gICAgbGV0IG1vZGlmaWVyc1RvU2VsZWN0ID0gW107XG5cbiAgICAvKmlmKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMubGVuZ3RoICYmICEoT2JqZWN0LnZhbHVlcyh0aGlzLnN0YXRlTW9kaWZpZXJzKSkubGVuZ3RoKSB7XG4gICAgICBtb2RpZmllcnNUb1NlbGVjdCA9IHRoaXMuc2VsZWN0ZWRNb2RpZmllcnM7XG4gICAgfSovXG5cbiAgICBsZXQgbW9kaWZpcmVzID0gW107XG5cbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBtb2RpZmllcnNUb1NlbGVjdCcsIG1vZGlmaWVyc1RvU2VsZWN0KTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcblxuICAgIGZvciAobGV0IGdyb3VwSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVycykge1xuICAgICAgZm9yIChsZXQgbW9kaWZpcmVJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW21vZGlmaXJlSWRdIHx8IG1vZGlmaWVyc1RvU2VsZWN0LmZpbmQoaXRlbSA9PiBpdGVtLm1vZGlmaWVySWQgPT0gbW9kaWZpcmVJZCkpIHtcbiAgICAgICAgICBtb2RpZmlyZXMucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpcmVJZCxcbiAgICAgICAgICAgIGFtb3VudDogdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0sXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyA9IG1vZGlmaXJlcztcblxuICAgIGlmICh0aGlzLmRpc2gubW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBtZXNzYWdlID0gW107XG5cbiAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGlmIChncm91cC5yZXF1aXJlZCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RpZiA9IFtdO1xuICAgICAgICAgICAgbGV0IGxvY2FsTW9kaWYgPSB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdOyAvLy5maWx0ZXIoZWxlbWVudD0+ZWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZCBpbiBsb2NhbE1vZGlmKSB7XG4gICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZlttb2RdKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZE1vZGlmLnB1c2gobG9jYWxNb2RpZlttb2RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1vZGlmLmxlbmd0aCA8IGdyb3VwLm1pbkFtb3VudCkge1xuICAgICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOQwpLDkMK9w5DCuMOQwrzDkMKww5DCvcOQwrjDkMK1XCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICBncm91cC5ncm91cC5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgIH1cblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGFmdGVyJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgfVxuXG4gIC8qIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkcKBw5DCvsOQwr7DkcKCw5DCssOQwrXDkcKBw5HCgsOQwrLDkMK1w5HCgiDDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyw5DCsSDDkMK1w5HCgcOQwrvDkMK4IDEgw5HCgsOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5HCg8OQwrXDkcKCIMOQwr/DkMK+w5DCssOQwrXDkMK0w5DCtcOQwr3DkMK4w5DCtSDDkcKAw5DCsMOQwrTDkMK4w5DCvsOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCxcbiAgIMOQwrXDkcKBw5DCu8OQwrggw5DCvMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCscOQwr7DkMK7w5HCjMORwojDkMK1IDEgw5HCgsOQwr4gw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK0w5DCtcOQwrvDkMKww5DCtcORwoIgw5DCssORwovDkMKxw5DCvsORwoAgw5DCssORwoHDkMK1w5HChSDDkMK+w5HCgcORwoLDkMKww5DCu8ORwozDkMK9w5HCi8ORwoUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiDDkMK9w5DCtSDDkMKyw5DCvsOQwrfDkMK8w5DCvsOQwrbDkMK9w5HCi8OQwrwsIMOQwrPDkMK1w5DCvcOQwrXDkcKAw5DCuMORwoDDkcKDw5DCtcORwoIgw5DCv8ORwoDDkMK1w5DCtMORwoPDkMK/w5HCgMOQwrXDkMK2w5DCtMOQwrXDkMK9w5DCuMOQwrUqL1xuXG4gIGlkUmFkaW9Cb3goZ3JvdXBJZCk6Ym9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRHcm91cCA9IHRoaXMuZGlzaC5tb2RpZmllcnMuZmluZCh4ID0+IHgubW9kaWZpZXJJZCA9PT0gZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cC5taW5BbW91bnQgPT09IDEgJiYgY3VycmVudEdyb3VwLm1heEFtb3VudCA9PT0gMTtcbiAgfVxuXG4gIC8vIMOQwp/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkMK8w5DCuMOQwr3DkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMK6w5DCvsORwoLDkMK+w5HCgMORwovDkMK1IMOQwrHDkcKLw5DCu8OQwrggw5DCssORwovDkMKxw5HCgMOQwrDDkMK9w5HCi1xuICBjaGVja01pbkFtb3VudE1vZGlmaXJlcyhncm91cElkLCBtb2RpZmlyZSkge1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL3RoaXMuZGlzaC5tb2RpZmllcnMgPVtdO1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgbmFtZTpzdHJpbmc7XG4gIEBJbnB1dCgpIGVtYWlsOnN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBkZWxpdmVyeTphbnk7XG4gIEBJbnB1dCgpIGxvY2F0aW9uSWQ6c3RyaW5nO1xuXG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWU6c3RyaW5nO1xuICBASW5wdXQoKSBob3VzaW5nOnN0cmluZztcbiAgQElucHV0KCkgYXBhcnRtZW50OnN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6c3RyaW5nO1xuICBASW5wdXQoKSBkb29ycGhvbmU6c3RyaW5nO1xuICBASW5wdXQoKSBmbG9vcjpzdHJpbmc7XG5cbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDpzdHJpbmdcbiAgQElucHV0KCkgcGVyc29uc0NvdW50Om51bWJlcjtcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmc7XG4gIFxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY2FydDogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZVxuICApIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpXG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG5cbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEodGhpcy5zdHJlZXRJZCAmJiB0aGlzLmhvbWUpKSB7XG4gICAgICB0aGlzLmVycm9yLmVtaXQoJ8OQwp3DkcKDw5DCtsOQwr3DkMK+IMORwoPDkMK6w5DCsMOQwrfDkMKww5HCgsORwowgw5DCsMOQwrTDkcKAw5DCtcORwoEnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGAke2NvbW1lbnR9XFxyXFxuw5DCnsOQwr/DkMK7w5DCsMORwoLDkMKwOiAke3BheW1lbnRNZXRob2R9YCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6IHRoaXMucGVyc29uc0NvdW50XG4gICAgfTtcbiAgICAgaWYodGhpcy5kZWxpdmVyeSl7XG4gICAgICAgZGF0YVtcImRlbGl2ZXJ5XCJdID0geyBcInR5cGVcIjogXCJzZWxmXCJ9XG4gICAgIH1cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwiaG9tZVwiOiArdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLm9yZGVyQ2FydChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgKCkgPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuXG4gIHByZXBhcmVQaG9uZShwaG9uZSkge1xuICAgIHBob25lID0gJysnICsgcGhvbmUucmVwbGFjZSgvW14wLTldL2dpbSwnJyk7XG4gICAgcmV0dXJuIHBob25lLnJlcGxhY2UoJys4JywgJycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFtb3VudENhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG4vL2ltcG9ydCB7IE1vZGlmaXJlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2RpZmlyZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNldEFtb3VudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmVcIjtcblxuY29uc3QgRElSRUNUSVZFUyA9IFtcbiAgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSxcbiAgQW1vdW50Q2FydERpcmVjdGl2ZSxcbiAgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUsXG4gIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUsXG4gIC8vTW9kaWZpcmVzRGlyZWN0aXZlLFxuICBEaXNoQ2FsY0RpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZVxuXTtcblxuY29uc3QgTU9EVUxFUyA9IFtcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFsuLi5NT0RVTEVTXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbLi4uRElSRUNUSVZFU10sXG4gIGV4cG9ydHM6IFsuLi5ESVJFQ1RJVkVTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7O0FBY0E7SUFXRSw0QkFDVSxHQUFjLEVBQ2QsT0FBc0I7UUFGaEMsaUJBV0M7UUFWUyxRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUU5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUEsQ0FBQyxDQUFDO0tBQ3ZFOzs7O0lBRUQsMkNBQWM7OztJQUFkO1FBQUEsaUJBcUJDO1FBbkJDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFMUMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUN4RCxLQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0IsQ0FBQyxDQUFDO1NBQ0o7Ozs7Ozs7Ozs7S0FhRjs7OztJQUVELGlEQUFvQjs7O0lBQXBCO1FBQ0UsT0FBTyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZDOzs7OztJ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