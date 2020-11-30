(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core/dist'), require('@webresto/ng-core/dist/public_api'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-cart', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core/dist', '@webresto/ng-core/dist/public_api', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-cart'] = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.dist, global.i1, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, dist, i1, common) { 'use strict';

    var NgRestoCartService = /** @class */ (function () {
        function NgRestoCartService(net, eventer) {
            this.net = net;
            this.eventer = eventer;
            this.cartID = this.getCartId();
            this.cart = new rxjs.BehaviorSubject(null);
            this.modifires = new rxjs.BehaviorSubject([]);
            this.OrderFormChange = new rxjs.BehaviorSubject(null);
            this.modifiresMessage = new rxjs.BehaviorSubject([]);
            this.restrictions$ = this.net.get("/restrictions");
        }
        NgRestoCartService.prototype.getCartId = function () {
            return localStorage.getItem('cartID');
        };
        NgRestoCartService.prototype.getCart = function () {
            var _this = this;
            return this.net.get("/cart" + (this.cartID ? '?cartId=' + this.cartID : '')).pipe(operators.switchMap(function (data) {
                if (!data) {
                    _this.removeCartId();
                }
                ;
                return data ? rxjs.from([data]) : _this.net.get("/cart}");
            }), operators.switchMap(function (data) {
                if (data.cart.state == 'ORDER') {
                    return rxjs.throwError(new Error('Cart in order state'));
                }
                else {
                    if (!_this.cartID) {
                        _this.setCartId(data.cart.cartId);
                    }
                    ;
                    _this.cart.next(data.cart);
                }
                ;
                return _this.cart;
            }), operators.catchError(function (err) {
                _this.removeCartId();
                return rxjs.throwError(err);
            }));
        };
        NgRestoCartService.prototype.addDishToCart = function (data) {
            var _this = this;
            if (this.modifiresMessage.value.length) {
                this.modifiresMessage.value.forEach(function (message) {
                    _this.eventer.emitMessageEvent(message);
                });
                return;
            }
            this.net.put('/cart/add', data).subscribe(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
                /*this.eventer.emitMessageEvent(
                 new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
                 );*/
            }, function () {
                /*this.eventer.emitMessageEvent(
                 new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
                 )*/
            });
        };
        NgRestoCartService.prototype.addDishToCart$ = function (data) {
            var _this = this;
            if (this.modifiresMessage.value.length) {
                this.modifiresMessage.value.forEach(function (message) {
                    _this.eventer.emitMessageEvent(message);
                });
                return rxjs.from([null]);
            }
            return this.net.put('/cart/add', data)
                .pipe(operators.tap(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
            }));
        };
        NgRestoCartService.prototype.setDishCountToCart = function (dishId, amount) {
            var _this = this;
            this.net.post('/cart/set', {
                dishId: dishId,
                cartId: this.cartID,
                amount: amount
            }).subscribe(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
                /*this.eventer.emitMessageEvent(
                 new EventMessage('success', 'Успех', 'Изменено количество')
                 );*/
            }, function () {
                /*this.eventer.emitMessageEvent(
                 new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
                 )*/
            });
        };
        NgRestoCartService.prototype.setDishComment = function (dishId, comment) {
            var _this = this;
            return this.net.post('/cart/setcomment', {
                dishId: dishId,
                cartId: this.cartID,
                comment: comment
            }).pipe(operators.tap(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
            }, function () { }));
        };
        NgRestoCartService.prototype.removeDishFromCart$ = function (dishId, amount) {
            var _this = this;
            return this.net.put('/cart/remove', {
                dishId: dishId,
                cartId: this.cartID,
                amount: amount
            })
                .pipe(operators.tap(function (result) {
                _this.setCartId(result.cart.cartId);
                _this.cart.next(result.cart);
                _this.cartID = result.cart.cartId;
            }));
        };
        NgRestoCartService.prototype.removeDishFromCart = function (dishId, amount) {
            var _this = this;
            this.net.put('/cart/remove', {
                dishId: dishId,
                cartId: this.cartID,
                amount: amount
            }).subscribe(function (result) {
                _this.setCartId(result.cart.cartId);
                _this.cart.next(result.cart);
                _this.cartID = result.cart.cartId;
                /*this.eventer.emitMessageEvent(
                 new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
                 );*/
            }, function () {
                /*this.eventer.emitMessageEvent(
                 new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
                 )*/
            });
        };
        NgRestoCartService.prototype.checkoutCart = function (data) {
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
        NgRestoCartService.prototype.orderCart = function (data) {
            var _this = this;
            return this.net.post('/order', data)
                .pipe(operators.tap(function (result) {
                _this.setCartId(result.cart.cartId);
                _this.cart.next(result.cart);
                _this.cartID = result.cart.cartId;
                /*this.eventer.emitMessageEvent(
                 new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
                 );*/
            }, function (error) {
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
            }));
        };
        NgRestoCartService.prototype.checkStreetV2 = function (data) {
            var _this = this;
            return this.net.post('/check', data)
                .pipe(operators.tap(function (result) {
                _this.setCartId(result.cart.cartId);
                _this.cart.next(result.cart);
                _this.cartID = result.cart.cartId;
            }, function () { }));
        };
        NgRestoCartService.prototype.checkStreet = function (data) {
            var _this = this;
            this.net.post('/check', data).subscribe(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
            }, function (error) {
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
            });
        };
        NgRestoCartService.prototype.setCartId = function (cartID) {
            localStorage.setItem('cartID', cartID);
            this.cartID = cartID;
        };
        NgRestoCartService.prototype.removeCartId = function () {
            localStorage.removeItem('cartID');
            this.cartID = null;
        };
        NgRestoCartService.prototype.userCart = function () {
            return this.cart;
        };
        NgRestoCartService.prototype.setModifires = function (modifires, messages) {
            this.modifires.next(modifires);
            if (messages) {
                this.modifiresMessage.next(messages);
            }
            ;
        };
        NgRestoCartService.prototype.getModifires = function () {
            return this.modifires.pipe();
        };
        NgRestoCartService.prototype.productInCart = function (product) {
            return this.cart.pipe(operators.filter(function (cart) { return 'cartId' in cart; }), operators.map(function (cart) {
                var _a;
                return !!(cart && ((_a = cart === null || cart === void 0 ? void 0 : cart.dishes) === null || _a === void 0 ? void 0 : _a.find(function (dishInCart) { return dishInCart.dish.id === product.id; })));
            }));
        };
        NgRestoCartService.prototype.getPickupPoints = function (cartId) {
            return this.net.get('/pickupaddreses', true, {
                params: {
                    cartId: cartId
                }
            });
        };
        NgRestoCartService.prototype.getPaymentMethods = function (cartId) {
            return this.net.get('/paymentmethods', true, {
                params: {
                    cartId: cartId
                }
            });
        };
        return NgRestoCartService;
    }());
    NgRestoCartService.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(i0.ɵɵinject(i1.NetService), i0.ɵɵinject(i1.EventerService)); }, token: NgRestoCartService, providedIn: "root" });
    NgRestoCartService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgRestoCartService.ctorParameters = function () { return [
        { type: dist.NetService },
        { type: dist.EventerService }
    ]; };

    var AddDishToCartDirective = /** @class */ (function () {
        function AddDishToCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.loading = new i0.EventEmitter();
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
            this.cartService
                .getModifires()
                .subscribe(function (res) { return _this.modifires = res; });
        }
        AddDishToCartDirective.prototype.onClick = function () {
            this.addDishToCart(this.dish.id, this.amountDish);
        };
        AddDishToCartDirective.prototype.addDishToCart = function (dishID, amount) {
            var _this = this;
            var data = {
                dishId: dishID,
                amount: amount,
                cartId: undefined,
                modifiers: this.modifires,
                comment: this.comment
            };
            if (this.cart.cartId)
                data.cartId = this.cart.cartId;
            this.loading.emit(true);
            this.cartService
                .addDishToCart$(data)
                .subscribe(function () { return _this.success.emit(true); }, function (e) { return _this.error.emit(e); }, function () { return _this.loading.emit(false); });
        };
        return AddDishToCartDirective;
    }());
    AddDishToCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstAddToCart]'
                },] }
    ];
    AddDishToCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    AddDishToCartDirective.propDecorators = {
        modifires: [{ type: i0.Input }],
        dish: [{ type: i0.Input }],
        amountDish: [{ type: i0.Input }],
        comment: [{ type: i0.Input }],
        loading: [{ type: i0.Output }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

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
        return AmountCartDirective;
    }());
    AmountCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstAmountCart]'
                },] }
    ];
    AmountCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService },
        { type: i0.Renderer2 },
        { type: i0.ElementRef }
    ]; };

    var CheckoutDirective = /** @class */ (function () {
        function CheckoutDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
            this.isChecking = new i0.EventEmitter();
            this.cartService
                .userCart()
                .subscribe(function (cart) { return _this.cart = cart; });
            this.cartService.OrderFormChange
                .pipe(operators.filter(function () {
                //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
                if (_this.locationId || (_this.streetId || _this.street) && _this.home || _this.selfService) {
                    return true;
                }
            }), 
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
            operators.debounceTime(1000))
                .subscribe(function () { return _this.checkStreet(); });
        }
        CheckoutDirective.prototype.onClick = function () {
            var _this = this;
            if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
                this.error.emit('Нужно указать адрес');
                return;
            }
            var comment = this.comment || "Не указан";
            var data = {
                cartId: this.cart.cartId,
                comment: comment,
                customer: {
                    phone: this.preparePhone(this.phone),
                    mail: this.email,
                    name: this.name
                },
                personsCount: +this.personsCount
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
            data["selfService"] = this.selfService;
            if (this.bonuses) {
                data['bonuses'] = this.bonuses.map(function (b) {
                    return {
                        name: b.name,
                        amount: b.amount
                    };
                });
            }
            if (this.locationId) {
                data["locationId"] = this.locationId;
            }
            else {
                data["address"] = {
                    streetId: this.streetId,
                    street: this.street,
                    home: this.home,
                    housing: this.housing,
                    doorphone: this.doorphone || '',
                    entrance: this.entrance || '',
                    floor: this.floor || '',
                    apartment: this.apartment || ''
                };
            }
            var cartId = this.cart.id;
            this.cartService
                .orderCart(data)
                .subscribe(function (result) {
                if (result.action && result.action.paymentRedirect) {
                    window.location.href = result.action.paymentRedirect;
                }
                else {
                    _this.success.emit(cartId);
                }
            }, function (error) { return _this.error.emit(error); });
        };
        CheckoutDirective.prototype.ngOnChanges = function (changes) {
            this.cartService.OrderFormChange.next(changes);
        };
        CheckoutDirective.prototype.checkStreet = function () {
            var _this = this;
            //if(this.streetId == '0') return;
            var comment = this.comment || "Не указан";
            var data = {
                cartId: this.cart.cartId,
                comment: comment,
                customer: {
                    phone: this.phone ? this.preparePhone(this.phone) : null,
                    mail: this.email,
                    name: this.name || null
                },
                personsCount: +this.personsCount
            };
            data["selfService"] = this.selfService;
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
                    streetId: this.streetId,
                    street: this.street,
                    home: this.home,
                    housing: this.housing,
                    doorphone: this.doorphone || '',
                    entrance: this.entrance || '',
                    floor: this.floor || '',
                    apartment: this.apartment || ''
                };
            }
            this.isChecking.emit(true);
            this.cartService
                .checkStreetV2(data)
                .subscribe(
            //() => this.success.emit(true),
            //error => this.error.emit(error)
            function () { return _this.isChecking.emit(false); }, function () { return _this.isChecking.emit(false); });
        };
        CheckoutDirective.prototype.preparePhone = function (phone) {
            if (!phone)
                return '';
            phone = '+' + phone.replace(/[^0-9]/gim, '');
            return phone.replace('+8', '+7');
        };
        return CheckoutDirective;
    }());
    CheckoutDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstCheckout]'
                },] }
    ];
    CheckoutDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    CheckoutDirective.propDecorators = {
        cartTotal: [{ type: i0.Input }],
        bonuses: [{ type: i0.Input }],
        name: [{ type: i0.Input }],
        email: [{ type: i0.Input }],
        phone: [{ type: i0.Input }],
        delivery: [{ type: i0.Input }],
        selfService: [{ type: i0.Input }],
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
        date: [{ type: i0.Input }],
        notifyMethodId: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        isChecking: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var DeleteFromCartDirective = /** @class */ (function () {
        function DeleteFromCartDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
        }
        DeleteFromCartDirective.prototype.onClick = function () {
            this.cartService.removeDishFromCart(this.dish.id, this.amountDish);
        };
        return DeleteFromCartDirective;
    }());
    DeleteFromCartDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstDeleteFromCart]'
                },] }
    ];
    DeleteFromCartDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    DeleteFromCartDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        amountDish: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

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
        DishCalcDirective.prototype.ngOnInit = function () {
            var _this = this;
            this.renderer.addClass(this.el.nativeElement, "dish-calculator");
            this.amountDish = this.amount;
            this.amountDishToAdd.emit(this.amountDish);
            this.price = this.renderer.createElement("div");
            this.renderer.addClass(this.price, "dish-price");
            setTimeout(function () {
                _this.renderDish(_this.dish);
                _this.render(_this.dish.modifiers);
            }, 100);
        };
        DishCalcDirective.prototype.renderDish = function (dish) {
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
            var mainItem = this.renderer.createElement("div");
            this.renderer.addClass(mainItem, "dish-wraper");
            this.renderer.appendChild(this.el.nativeElement, mainItem);
            var itemName = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "name");
            this.renderer.appendChild(mainItem, itemName);
            var title = this.renderer.createElement("div");
            this.renderer.addClass(title, "title");
            this.renderer.setProperty(title, "innerHTML", this.dish.name);
            this.renderer.appendChild(itemName, title);
            var weightDishWrapper = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "weight");
            this.renderer.addClass(itemName, "dish");
            this.renderer.appendChild(mainItem, weightDishWrapper);
            var weightDishValue = this.renderer.createElement("div");
            this.renderer.addClass(weightDishValue, "value");
            this.renderer.setProperty(weightDishValue, "innerHTML", (this.dish.weight * 1000).toFixed(0) + " г.");
            if (this.dish.weight === 0 || !this.dish.weight) {
                this.renderer.addClass(weightDishValue, "zero");
            }
            this.renderer.appendChild(weightDishWrapper, weightDishValue);
            this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
            var priceDishWrapper = this.renderer.createElement("div");
            this.renderer.addClass(priceDishWrapper, "price");
            this.renderer.addClass(priceDishWrapper, "total");
            this.renderer.appendChild(priceDishWrapper, this.price);
            this.renderer.appendChild(mainItem, priceDishWrapper);
            var itemQuant = this.renderer.createElement("div");
            this.renderer.addClass(itemQuant, "quantity");
            this.renderer.appendChild(mainItem, itemQuant);
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
            var counter = this.renderer.createElement("span");
            this.renderer.addClass(counter, "quantity__counter");
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.appendChild(itemQuant, counter);
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
            var weightTotalWrapper = this.renderer.createElement("div");
            this.renderer.addClass(itemName, "weight");
            this.renderer.addClass(itemName, "total");
            this.renderer.appendChild(mainItem, weightTotalWrapper);
            var weightTotal = this.renderer.createElement("div");
            if (this.dish.weight === 0 || !this.dish.weight) {
                this.renderer.addClass(weightTotal, "zero");
            }
            this.renderer.addClass(weightTotal, "value");
            this.innerTotalWeight(weightTotal); // TODO: total Weight
            this.renderer.appendChild(weightTotalWrapper, weightTotal);
            this.weightTotal = weightTotal;
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(dish.price)); // TODO: правильно считать цену
            var priceTotalWrapper = this.renderer.createElement("div");
            this.renderer.addClass(priceTotalWrapper, "price");
            this.renderer.addClass(priceTotalWrapper, "total");
            this.renderer.appendChild(priceTotalWrapper, this.price);
            this.renderer.appendChild(mainItem, priceTotalWrapper);
        };
        DishCalcDirective.prototype.generatePrice = function (priceDish, amount, modifiresPrice) {
            var _this = this;
            var selected = [];
            if (this.selectedModifiers)
                this.selectedModifiers.forEach(function (element) {
                    _this.dish.modifiers.forEach(function (groups) {
                        var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                        if (mod.length > 0) {
                            mod[0].groupId = groups.group.id;
                            selected.push(mod[0]);
                        }
                    });
                });
            var modSum = 0;
            selected.forEach(function (element) {
                modSum = modSum + element.dish.price * _this.amountModifires[element.groupId][element.modifierId];
            });
            modSum = modSum * this.amountDish;
            return (priceDish * this.amountDish + modSum + '<div class="currency">&nbsp;&#x20bd;</div>');
        };
        DishCalcDirective.prototype.generateTotalWeight = function () {
            var _this = this;
            var selected = [];
            if (this.selectedModifiers)
                this.selectedModifiers.forEach(function (element) {
                    _this.dish.modifiers.forEach(function (groups) {
                        var mod = groups.childModifiers.filter(function (x) { return x.modifierId === element.id; });
                        if (mod.length > 0) {
                            mod[0].groupId = groups.group.id;
                            selected.push(mod[0]);
                        }
                    });
                });
            var modSum = 0;
            selected.forEach(function (element) {
                modSum = modSum + element.dish.weight * _this.amountModifires[element.groupId][element.modifierId] * 1000;
            });
            modSum = parseFloat((modSum * this.amountDish).toFixed(2));
            console.log(modSum, this.dish.weight * 1000 * this.amountDish);
            console.log(this.dish.weight, this.amountDish);
            var weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
            return (weight).toFixed(0) + " г. <div class='separator'></div>";
        };
        DishCalcDirective.prototype.innerTotalWeight = function (totalWeigthDiv) {
            this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
        };
        DishCalcDirective.prototype.changeAmountdish = function (value) {
            this.amountDish = this.amountDish + value;
            if (this.amountDish <= 0) {
                this.amountDish = 1;
            }
            if (this.amountDish >= 199) {
                this.amountDish = 199;
            }
            this.amountDishToAdd.emit(this.amountDish);
        };
        DishCalcDirective.prototype.render = function (modifires) {
            var _this = this;
            this.setModifires();
            if (modifires.length > 0) {
                var h = this.renderer.createElement("h5");
                this.renderer.setProperty(h, "innerHTML", "К этому блюду можно добавить:");
                // this.renderer.appendChild(this.el.nativeElement, h);
            }
            modifires.forEach(function (elementGroup) {
                _this.stateModifiers[elementGroup.modifierId] = {};
                _this.amountModifires[elementGroup.modifierId] = {};
                if (elementGroup.dish) {
                    var groupDiv = _this.groupDiv("Одночные модификаторы не поддерживаются");
                    _this.renderer.appendChild(_this.el.nativeElement, groupDiv);
                    console.log("elementGroup", elementGroup);
                    //TODO: add single modificator logic
                }
                else if (elementGroup.childModifiers) {
                    var groupDiv_1 = _this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                    _this.renderer.appendChild(_this.el.nativeElement, groupDiv_1);
                    var modArr = elementGroup.childModifiers;
                    modArr.forEach(function (element) {
                        var modifireDiv = _this.modifireDiv(element, elementGroup.modifierId);
                        _this.renderer.appendChild(groupDiv_1, modifireDiv);
                        if (element.defaultAmount < 1) {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                        }
                        else {
                            _this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                        }
                    });
                }
            });
            if (modifires.length > 0) {
                var h = this.renderer.createElement("div");
                this.renderer.setProperty(h, "innerHTML", "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>");
                this.renderer.appendChild(this.el.nativeElement, h);
            }
        };
        DishCalcDirective.prototype.groupDiv = function (nameGorup) {
            var div = this.renderer.createElement("div");
            this.renderer.addClass(div, "group-modifires-wraper");
            this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
            return div;
        };
        DishCalcDirective.prototype.modifireDiv = function (element, groupId) {
            var div = this.renderer.createElement("div");
            this.renderer.addClass(div, "additional-item");
            this.renderOneModifire(element, div, groupId);
            return div;
        };
        DishCalcDirective.prototype.renderOneModifire = function (element, modifireDiv, groupId) {
            console.info('renderOneModifire', element);
            console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
            // Рендер Названия модификатора
            var itemNameDiv = this.renderer.createElement("div");
            this.renderer.addClass(itemNameDiv, "item-name");
            var label = this.renderer.createElement("label");
            this.renderer.setAttribute(label, "for", element.modifierId);
            this.renderer.appendChild(itemNameDiv, label);
            this.renderer.setProperty(label, "innerHTML", element.dish.name);
            this.renderer.appendChild(modifireDiv, itemNameDiv);
            var weigthModifireWraper = this.renderer.createElement('div');
            this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
            var weightModifireLeft = this.renderer.createElement('div');
            this.renderer.addClass(weightModifireLeft, 'weight');
            if (element.dish.weight === 0 || element.dish.weight < 0) {
                this.renderer.addClass(weightModifireLeft, 'zero');
            }
            this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');
            this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
            this.renderer.appendChild(modifireDiv, weigthModifireWraper);
            // Рендер блока изминения количества модификатора
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
            var min = element.minAmount;
            var max = element.maxAmount;
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
            if (element.maxAmount > 0 && element.minAmount > 0) {
            }
            else {
            }
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
            var rightweigthModifireWraper = this.renderer.createElement('div');
            this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
            var weightModifireRight = this.renderer.createElement('div');
            this.renderer.addClass(weightModifireRight, 'weight');
            if (element.dish.weight === 0 || element.dish.weight < 0) {
                this.renderer.addClass(weightModifireRight, 'zero');
            }
            this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');
            this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
            this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);
            var price = this.renderer.createElement("div");
            this.renderer.addClass(price, "item-price");
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
        DishCalcDirective.prototype.renderCheckbox = function (element, isActive, itemQuantity, modifireDiv, groupId) {
            var _this = this;
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
        DishCalcDirective.prototype.renderInputButton = function (element, groupId, itemQuantity, modifireDiv) {
            var _this = this;
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
            var aMinusDiv = this.renderer.createElement("a");
            this.renderer.addClass(aMinusDiv, "quantity__button");
            this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
            this.renderer.appendChild(itemQuantity, aMinusDiv);
            this.renderer.listen(aMinusDiv, "click", function (e) {
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
            var span = this.renderer.createElement("span");
            this.renderer.addClass(span, "item-quantity__counter");
            this.amountModifires[groupId][element.modifierId] = startAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifires[groupId][element.modifierId]);
            this.renderer.appendChild(itemQuantity, span);
            var aPlusDiv = this.renderer.createElement("a");
            this.renderer.addClass(aPlusDiv, "quantity__button");
            this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
            this.renderer.appendChild(itemQuantity, aPlusDiv);
            this.renderer.appendChild(modifireDiv, itemQuantity);
            this.renderer.listen(aPlusDiv, "click", function (e) {
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
        DishCalcDirective.prototype.setModifires = function () {
            var _this = this;
            var modifiersToSelect = [];
            /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
              modifiersToSelect = this.selectedModifiers;
            }*/
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
                var message_1 = [];
                this.dish.modifiers.forEach(function (group) {
                    if (group.required) {
                        if (_this.stateModifiers[group.modifierId]) {
                            var selectedModif = [];
                            var localModif = _this.stateModifiers[group.modifierId]; //.filter(element=>element);
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
        DishCalcDirective.prototype.idRadioBox = function (groupId) {
            var currentGroup = this.dish.modifiers.find(function (x) { return x.modifierId === groupId; });
            return currentGroup.minAmount === 1 && currentGroup.maxAmount === 1;
        };
        // Проверяет минимальное количество модификаторовкоторые были выбраны
        DishCalcDirective.prototype.checkMinAmountModifires = function (groupId, modifire) {
        };
        DishCalcDirective.prototype.ngOnDestroy = function () {
            //this.dish.modifiers =[];
            this.validate.emit(true);
            this.cartService.setModifires([], []);
        };
        return DishCalcDirective;
    }());
    DishCalcDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstDishCalc]'
                },] }
    ];
    DishCalcDirective.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: NgRestoCartService }
    ]; };
    DishCalcDirective.propDecorators = {
        dish: [{ type: i0.Input }],
        amount: [{ type: i0.Input }],
        selectedModifiers: [{ type: i0.Input }],
        validate: [{ type: i0.Output }],
        amountDishToAdd: [{ type: i0.Output }]
    };

    var ModifiresDirective = /** @class */ (function () {
        function ModifiresDirective(renderer, el, cartService) {
            var _this = this;
            this.renderer = renderer;
            this.el = el;
            this.cartService = cartService;
            this.amountModifires = {};
            this.stateModifires = {};
            setTimeout(function () {
                _this.render(_this.modifires);
            }, 100);
        }
        ModifiresDirective.prototype.render = function (modifires) {
            var _this = this;
            if (modifires.length > 0) {
                var h = this.renderer.createElement('h5');
                this.renderer.setProperty(h, 'innerHTML', 'К этому блюду можно добавить:');
                this.renderer.appendChild(this.el.nativeElement, h);
            }
            modifires.forEach(function (elementGroup) {
                _this.stateModifires[elementGroup.modifierId] = {};
                _this.amountModifires[elementGroup.modifierId] = {};
                var groupDiv = _this.groupDiv(elementGroup.name);
                _this.renderer.appendChild(_this.el.nativeElement, groupDiv);
                var modArr;
                if (elementGroup.childModifiers.length > 5) {
                    modArr = elementGroup.childModifiers.slice(0, 5);
                }
                else {
                    modArr = elementGroup.childModifiers;
                }
                modArr.forEach(function (element) {
                    var modifireDiv = _this.modifireDiv(element, elementGroup.modifierId);
                    _this.renderer.appendChild(groupDiv, modifireDiv);
                    _this.stateModifires[elementGroup.modifierId][element.modifierId] = false;
                });
            });
        };
        ModifiresDirective.prototype.groupDiv = function (nameGorup) {
            var div = this.renderer.createElement('div');
            this.renderer.addClass(div, 'group-modifires');
            this.renderer.appendChild(div, this.renderer.createText('Название категории модификаторов: ' + nameGorup));
            return div;
        };
        ModifiresDirective.prototype.modifireDiv = function (element, groupId) {
            var div = this.renderer.createElement('div');
            this.renderer.addClass(div, 'additional-item');
            this.renderOneModifire(element, div, groupId);
            return div;
        };
        ModifiresDirective.prototype.renderOneModifire = function (element, modifireDiv, groupId) {
            var _this = this;
            // Рендер Названия модификатора
            var itemNameDiv = this.renderer.createElement('div');
            this.renderer.addClass(itemNameDiv, 'item-name');
            var input = this.renderer.createElement('input');
            this.renderer.setAttribute(input, 'type', 'checkbox');
            this.renderer.setAttribute(input, 'id', element.modifierId);
            this.renderer.appendChild(itemNameDiv, input);
            this.renderer.listen(input, 'change', function (e) {
                _this.stateModifires[groupId][e.target.id] = e.target.checked;
                _this.setModifires();
            });
            var label = this.renderer.createElement('label');
            this.renderer.setAttribute(label, 'for', element.modifierId);
            this.renderer.appendChild(itemNameDiv, label);
            this.renderer.setProperty(label, 'innerHTML', element.dish.name);
            this.renderer.appendChild(modifireDiv, itemNameDiv);
            // Рендер блока изминения количества модификатора
            var itemQuantity = this.renderer.createElement('div');
            var aMinusDiv = this.renderer.createElement('a');
            this.renderer.addClass(aMinusDiv, 'item-quantity__button');
            this.renderer.setProperty(aMinusDiv, 'innerHTML', '&#8722;');
            this.renderer.appendChild(itemQuantity, aMinusDiv);
            this.renderer.listen(aMinusDiv, 'click', function (e) {
                var value = +_this.amountModifires[groupId][element.modifierId];
                _this.amountModifires[groupId][element.modifierId] = value - 1;
                if (_this.amountModifires[groupId][element.modifierId] < element.minAmount)
                    _this.amountModifires[groupId][element.modifierId] = element.minAmount;
                _this.renderer.setProperty(span, 'innerHTML', _this.amountModifires[groupId][element.modifierId]);
                _this.setModifires();
            });
            var span = this.renderer.createElement('span');
            this.renderer.addClass(span, 'item-quantity__counter');
            this.amountModifires[groupId][element.modifierId] = element.minAmount;
            this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
            this.renderer.appendChild(itemQuantity, span);
            var aPlusDiv = this.renderer.createElement('a');
            this.renderer.addClass(aPlusDiv, 'item-quantity__button');
            this.renderer.setProperty(aPlusDiv, 'innerHTML', '&#x2b;');
            this.renderer.appendChild(itemQuantity, aPlusDiv);
            this.renderer.appendChild(modifireDiv, itemQuantity);
            this.renderer.listen(aPlusDiv, 'click', function (e) {
                var value = +_this.amountModifires[groupId][element.modifierId];
                _this.amountModifires[groupId][element.modifierId] = value + 1;
                _this.renderer.setProperty(span, 'innerHTML', _this.amountModifires[groupId][element.modifierId]);
                _this.setModifires();
            });
            // Рендер блока стоимости и веса модификатора
            var weightPriceDiv = this.renderer.createElement('div');
            this.renderer.addClass(weightPriceDiv, 'weight-price');
            var weightAndPriceHTML = element.dish.weight + " г / " + element.dish.price + "&nbsp;&#x20bd;";
            this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
            this.renderer.appendChild(modifireDiv, weightPriceDiv);
            this.setModifires();
        };
        ModifiresDirective.prototype.setModifires = function () {
            var modifires = [];
            for (var groupId in this.stateModifires) {
                for (var modifireId in this.stateModifires[groupId]) {
                    if (this.stateModifires[groupId][modifireId]) {
                        modifires.push({
                            id: modifireId,
                            amount: this.amountModifires[groupId][modifireId],
                            groupId: groupId
                        });
                    }
                }
            }
            console.log("модифікатори після циклу", modifires);
            this.cartService.setModifires(modifires);
        };
        return ModifiresDirective;
    }());
    ModifiresDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstModifires]'
                },] }
    ];
    ModifiresDirective.ctorParameters = function () { return [
        { type: i0.Renderer2 },
        { type: i0.ElementRef },
        { type: NgRestoCartService }
    ]; };
    ModifiresDirective.propDecorators = {
        modifires: [{ type: i0.Input }]
    };

    var OrderCartUserDirective = /** @class */ (function () {
        function OrderCartUserDirective(cartService) {
            this.cartService = cartService;
            this.requiredFields = ["name", "phone", "street", "house"];
            this.checkerFields = new rxjs.BehaviorSubject(undefined);
        }
        OrderCartUserDirective.prototype.onClick = function () {
            this.order(this.orderCart.value);
            console.log(this.orderCart.value);
        };
        OrderCartUserDirective.prototype.ngAfterViewInit = function () {
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
        OrderCartUserDirective.prototype.checkForFields = function (formDirectives, requiredFields) {
            var fieldsAreAvailable = {};
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
        OrderCartUserDirective.prototype.order = function (dataToSend) {
            if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
                var payment = void 0;
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
            else {
            }
        };
        OrderCartUserDirective.prototype.checkStreet = function (dataToSend) {
            console.log(">>>>", dataToSend);
            if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
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
            else {
            }
        };
        OrderCartUserDirective.prototype.stringToNumber = function (str) {
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
        return OrderCartUserDirective;
    }());
    OrderCartUserDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstOrderCart]'
                },] }
    ];
    OrderCartUserDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    OrderCartUserDirective.propDecorators = {
        orderCart: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var SetAmountDirective = /** @class */ (function () {
        function SetAmountDirective(cartService) {
            var _this = this;
            this.cartService = cartService;
            this.cartService
                .userCart()
                .subscribe(function (res) { return _this.cart = res; });
        }
        SetAmountDirective.prototype.onClick = function () {
            this.changeAmount(this.action);
        };
        SetAmountDirective.prototype.changeAmount = function (action) {
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
        return SetAmountDirective;
    }());
    SetAmountDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstSetDishAmount]'
                },] }
    ];
    SetAmountDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    SetAmountDirective.propDecorators = {
        action: [{ type: i0.Input }],
        dish: [{ type: i0.Input }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    var SetDishCommentDirective = /** @class */ (function () {
        function SetDishCommentDirective(cartService) {
            this.cartService = cartService;
            this.success = new i0.EventEmitter();
            this.error = new i0.EventEmitter();
        }
        SetDishCommentDirective.prototype.onClick = function () {
            this.setComment();
        };
        SetDishCommentDirective.prototype.setComment = function () {
            var _this = this;
            this.cartService.setDishComment(this.dish.id, this.comment).subscribe(function (res) { return _this.success.emit(true); }, function (err) { return _this.error.emit(err); });
        };
        return SetDishCommentDirective;
    }());
    SetDishCommentDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[rstSetDishComment]'
                },] }
    ];
    SetDishCommentDirective.ctorParameters = function () { return [
        { type: NgRestoCartService }
    ]; };
    SetDishCommentDirective.propDecorators = {
        comment: [{ type: i0.Input }],
        dish: [{ type: i0.Input }],
        success: [{ type: i0.Output }],
        error: [{ type: i0.Output }],
        onClick: [{ type: i0.HostListener, args: ['click',] }]
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
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
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
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
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
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
    ;
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
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var DishCalcComponent = /** @class */ (function () {
        function DishCalcComponent(cartService, eventer, imageUrl) {
            this.cartService = cartService;
            this.eventer = eventer;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
            this.comment = new i0.EventEmitter();
            this.modifiers = {
                indexById: {},
                custom: {
                    fixed: null
                },
                baseList: [],
            };
            this.modifiersValueTree = {};
            this.twoPartsAssembledModifiersIdsByGroupId = {};
            this.imageUrl = imageUrl;
        }
        DishCalcComponent.prototype.ngOnInit = function () {
            this.checkValid();
        };
        DishCalcComponent.prototype.ngOnDestroy = function () {
            this.validate.emit(true);
            this.cartService.setModifires([], []);
        };
        DishCalcComponent.prototype.ngOnChanges = function () {
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
                    for (var _c = __values(this.dish.modifiers), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var modifier = _d.value;
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
                            && modifier.childModifiers.find(function (m) { return m.dish; })) {
                            // This is Base modifier
                            modifierType = 'group';
                            this.modifiers.baseList.push(modifier);
                            if (modifier.minAmount == 2 && modifier.maxAmount == 2) {
                                this.isTwoPartsAssembledTemplate = true;
                            }
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
                                    for (var _e = (e_2 = void 0, __values(modifier.childModifiers)), _f = _e.next(); !_f.done; _f = _e.next()) {
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
            console.log("this.modifiers.indexById", this.modifiers.indexById);
        };
        DishCalcComponent.prototype.calculateTotalAmountInGroup = function (groupId) {
            if (groupId == 'single')
                return;
            this.modifiers.indexById[groupId].totalAmount = Object
                .values(this.modifiersValueTree[groupId])
                .reduce(function (a, b) { return a + b; });
            return this.modifiers.indexById[groupId].totalAmount;
        };
        DishCalcComponent.prototype.checkImagesInModifier = function (modifierId) {
            var m = this.modifiers.indexById[modifierId];
            this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length ? true : false;
            this.modifiers.indexById[modifierId].childImagesIsset = !!this.modifiers.indexById[modifierId]
                .childModifiers
                .find(function (m) { return m && m.dish && m.dish.images && m.dish.images.length ? true : false; });
        };
        DishCalcComponent.prototype.calculateTotalPrice = function () {
            var totalPrice = this.dish.price || 0;
            for (var groupId in this.modifiersValueTree) {
                for (var modifierId in this.modifiersValueTree[groupId]) {
                    var amount = this.modifiersValueTree[groupId][modifierId];
                    if (amount) {
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
        DishCalcComponent.prototype.getModifiersIds = function (modifier) {
            return {
                groupId: (modifier.dish && modifier.dish.groupId) ? modifier.dish.groupId : undefined,
                modifierId: modifier.modifierId
            };
        };
        DishCalcComponent.prototype.selectTwoPartsAssembledModifier = function (modifier) {
            var _a = this.getModifiersIds(modifier), _b = _a.groupId, groupId = _b === void 0 ? 'single' : _b, modifierId = _a.modifierId;
            var minAmount = modifier.minAmount, maxAmount = modifier.maxAmount;
            var _c = this.modifiers.indexById[groupId] || {}, _d = _c.minAmount, groupMinAmount = _d === void 0 ? 0 : _d, _e = _c.maxAmount, groupMaxAmount = _e === void 0 ? 0 : _e;
            var previousAmount = this.modifiersValueTree[groupId][modifierId];
            var amount = previousAmount ? 0 : 1;
            // Init tmp value storage if not exists
            if (!this.twoPartsAssembledModifiersIdsByGroupId[groupId]) {
                this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
            }
            // Total amount in group
            var groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
            if (groupAmount > groupMaxAmount) {
                if (this.twoPartsAssembledModifiersIdsByGroupId[groupId].length) {
                    for (var mId in this.modifiersValueTree[groupId]) {
                        this.modifiersValueTree[groupId][mId] = 0;
                    }
                    this.twoPartsAssembledModifiersIdsByGroupId[groupId] = this.twoPartsAssembledModifiersIdsByGroupId[groupId].slice(1, 2);
                    this.modifiersValueTree[groupId][this.twoPartsAssembledModifiersIdsByGroupId[groupId][0]] = 1;
                }
                else {
                    console.warn("Limit: max " + groupMaxAmount + ". Current " + groupAmount);
                    this.eventer.emitMessageEvent(new dist.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + groupMaxAmount));
                    return;
                }
            }
            else if (groupAmount === 0) {
                this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
            }
            if (amount && !this.twoPartsAssembledModifiersIdsByGroupId[groupId].find(function (v) { return v == modifierId; })) {
                this.twoPartsAssembledModifiersIdsByGroupId[groupId].push(modifierId);
            }
            this.modifiersValueTree[groupId][modifierId] = amount;
            this.calculateTotalAmountInGroup(groupId);
            this.calculateTotalPrice();
        };
        DishCalcComponent.prototype.changeModifierAmount = function (modifier, amount, operation) {
            if (amount < 0)
                return;
            var _a = this.getModifiersIds(modifier), _b = _a.groupId, groupId = _b === void 0 ? 'single' : _b, modifierId = _a.modifierId;
            var minAmount = modifier.minAmount, maxAmount = modifier.maxAmount;
            var _c = this.modifiers.indexById[groupId] || {}, _d = _c.minAmount, groupMinAmount = _d === void 0 ? 0 : _d, _e = _c.maxAmount, groupMaxAmount = _e === void 0 ? 0 : _e;
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
                var groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
                if (groupAmount < groupMinAmount) {
                    console.warn("Limit: min " + groupMinAmount + ". Current " + groupAmount);
                    this.eventer.emitMessageEvent(new dist.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + groupMinAmount));
                    return;
                }
                if (groupAmount > groupMaxAmount) {
                    console.warn("Limit: max " + groupMaxAmount + ". Current " + groupAmount);
                    this.eventer.emitMessageEvent(new dist.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + groupMaxAmount));
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
        DishCalcComponent.prototype.setModifiers = function () {
            var modifiersToSet = [];
            for (var groupId in this.modifiersValueTree) {
                for (var modifierId in this.modifiersValueTree[groupId]) {
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
        DishCalcComponent.prototype.checkValid = function () {
            var isValid = true;
            for (var groupId in this.modifiersValueTree) {
                var groupModifier = this.modifiers.indexById[groupId];
                if (groupModifier.required) {
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
        return DishCalcComponent;
    }());
    DishCalcComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'rst-dish-calc',
                    template: "<div *ngIf=\"dish\" class=\"ng-cart-dish-calc\" [ngClass]=\"{'ng-cart-dish-calc-two-parts-assembled': isTwoPartsAssembledTemplate}\">\r\n    <div class=\"dish\">\r\n        <div class=\"dish-image-box\">\r\n            <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n        </div>\r\n        <div class=\"dish-description-box\">\r\n            <div class=\"dish-name\">{{ dish.name }}</div>\r\n            <div class=\"dish-ingredients\">{{ dish.description }}</div>\r\n            <div class=\"dish-price-box\">\r\n                <ng-container *ngIf=\"!modifiers.custom.fixed; else modifierFixedTemplate\">\r\n                    <div class=\"price\" [ngClass]=\"{'zero-price': !dish.price}\">\r\n                        <span>{{ dish.price }}</span> \u20BD\r\n                    </div>\r\n                </ng-container>\r\n                <ng-template #modifierFixedTemplate>\r\n                    <ng-container *ngIf=\"modifiers.custom.fixed as modifier\">\r\n                        <div class=\"modifier-fixed\">\r\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                <div class=\"item\"\r\n                                     [ngClass]=\"{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\r\n                                     (click)=\"changeModifierAmount(childModifier, 1, 'checkbox')\">\r\n                                    {{ childModifier.dish?.name }}\r\n                                </div>\r\n                            </ng-container>\r\n                        </div>\r\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                            <ng-container *ngIf=\"!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\r\n                                <div class=\"price\" [ngClass]=\"{'zero-price': !childModifier.dish?.price}\">\r\n                                    <span>{{ childModifier.dish?.price }}</span> \u20BD\r\n                                </div>\r\n                            </ng-container>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                </ng-template>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modifiers\" *ngIf=\"modifiers.baseList?.length\">\r\n        <ng-container *ngFor=\"let modifier of modifiers.baseList\">\r\n            <div class=\"modifier-group\">\r\n                <ng-container *ngIf=\"modifier.dish\">\r\n                    <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\r\n                        <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\r\n                        <div class=\"modifier-description\" *ngIf=\"group.description\">{{ group.description }}</div>\r\n                    </div>\r\n\r\n                    <div class=\"modifier-box\" [ngClass]=\"{'without-images': !modifier.childImagesIsset}\">\r\n                        <!-- Single modifier -->\r\n                        <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\r\n                            modifier: modifier,\r\n                            groupId: 'single',\r\n                            amount: modifiersValueTree['single'][modifier.modifierId],\r\n                            groupAmount: modifiersValueTree['single'][modifier.modifierId],\r\n                            groupMinAmount: modifier.minAmount || 0,\r\n                            groupMaxAmount: modifier.maxAmount || 100\r\n                        }\"></ng-container>\r\n                    </div>\r\n                </ng-container>\r\n\r\n                <ng-container *ngIf=\"modifier.childModifiers?.length\">\r\n                    <ng-container *ngIf=\"modifier.minAmount == 2 && modifier.maxAmount == 2; then twoPartsAssembledTemplate else groupTemplate\">\r\n                    </ng-container>\r\n\r\n                    <!-- Base group modifier view -->\r\n                    <ng-template #groupTemplate>\r\n                        <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\r\n                            <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\r\n                            <div class=\"modifier-description\" *ngIf=\"group.description\">{{ group.description }}</div>\r\n                        </div>\r\n                        <div class=\"modifier-children\" [ngClass]=\"{'without-images': !modifier.imagesIsset}\">\r\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                <!-- Group modifier -->\r\n                                <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\r\n                            modifier: childModifier,\r\n                            groupId: modifier.modifierId,\r\n                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],\r\n                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,\r\n                            groupMinAmount: modifier.minAmount || 0,\r\n                            groupMaxAmount: modifier.maxAmount || 100\r\n                        }\"></ng-container>\r\n\r\n                            </ng-container>\r\n                        </div>\r\n                    </ng-template>\r\n\r\n                    <!-- Two parts assembled group modifier view (like pizza from two halves) -->\r\n                    <ng-template #twoPartsAssembledTemplate>\r\n                        <div class=\"two-parts-assembled\">\r\n                            <div class=\"two-parts-assembled-header\" [ngClass]=\"{empty: !twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId]?.length}\">\r\n                                <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                    <ng-container *ngIf=\"modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\r\n                                        <ng-container *ngIf=\"childModifier.dish as dish\">\r\n                                            <div class=\"selected-dish\">\r\n                                                <div class=\"title\">{{ dish.name }}</div>\r\n                                                <div class=\"image-box\">\r\n                                                    <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n                                                </div>\r\n                                            </div>\r\n                                        </ng-container>\r\n                                        <ng-container *ngIf=\"modifiers.indexById[modifier.modifierId].totalAmount == 1\">\r\n                                            <div class=\"selected-dish\">\r\n                                                <div class=\"title\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0443</div>\r\n                                                <div class=\"image-box\">\r\n                                                    <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: {} }\"></ng-container>\r\n                                                </div>\r\n                                            </div>\r\n                                        </ng-container>\r\n                                    </ng-container>\r\n                                </ng-container>\r\n                            </div>\r\n\r\n                            <div class=\"two-parts-assembled-body\">\r\n                                <div class=\"two-parts-assembled-body-name\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u044B\u0435 \u0434\u0432\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u043A\u0438</div>\r\n                                <div class=\"two-parts-assembled-body-list\">\r\n                                    <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                        <div class=\"two-parts-assembled-body-list-dish\"\r\n                                             (click)=\"selectTwoPartsAssembledModifier(childModifier)\"\r\n                                             [ngClass]=\"{selected: modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\r\n                                             *ngIf=\"childModifier.dish as dish\">\r\n                                            <div class=\"image-box\">\r\n                                                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n                                            </div>\r\n                                            <div class=\"dish-name\">\r\n                                                {{ dish.name }}\r\n                                            </div>\r\n                                            <div class=\"dish-price\">\r\n                                                <div [ngClass]=\"{'zero-price': !dish.price}\">\r\n                                                    <span>{{ dish.price }}</span> \u20BD\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </ng-container>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n\r\n\r\n                </ng-container>\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div class=\"result\">\r\n        <span class=\"text\">\u0418\u0422\u041E\u0413\u041E:</span>\r\n        <span class=\"price\">\r\n            <span>{{ totalPrice}}</span> \u20BD\r\n        </span>\r\n    </div>\r\n    <div class=\"comment\" *ngIf=\"isTwoPartsAssembledTemplate\">\r\n        <div class=\"title\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</div>\r\n        <div class=\"input-box\">\r\n            <input #commentInput type=\"text\" placeholder=\"\" (keyup)=\"comment.emit(commentInput.value)\">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!-- Template block #dishImageTemplate -->\r\n\r\n<ng-template #dishImageTemplate let-dish=\"dish\">\r\n    <ng-container *ngIf=\"dish?.images && dish.images[0]?.images?.small; else imgPlaceholder\">\r\n        <div class=\"dish-image\" [style.backgroundImage]=\"'url(' + imageUrl + dish.images[0].images.small + ')'\"></div>\r\n    </ng-container>\r\n    <ng-template #imgPlaceholder>\r\n        <div class=\"dish-image-placeholder\"></div>\r\n    </ng-template>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierTemplate -->\r\n\r\n<ng-template #modifierTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\"\r\n             let-groupAmount=\"groupAmount\"\r\n             let-groupMinAmount=\"groupMinAmount\"\r\n             let-groupMaxAmount=\"groupMaxAmount\">\r\n    <ng-container *ngIf=\"modifier.dish as dish\">\r\n        <div class=\"modifier-dish\">\r\n            <div class=\"modifier-dish-image-box\">\r\n                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n            </div>\r\n            <div class=\"modifier-dish-description-box\">\r\n                <div class=\"modifier-dish-name\">{{ dish.name }}</div>\r\n                <div class=\"modifier-dish-weight\" *ngIf=\"dish.weight\">{{ dish.weight * 1000 }} \u0433\u0440</div>\r\n            </div>\r\n            <div class=\"modifier-dish-price-box\">\r\n                <div [ngClass]=\"{'zero-price': !dish.price}\">\r\n                    <span>{{ dish.price }}</span> \u20BD\r\n                </div>\r\n            </div>\r\n            <div class=\"modifier-dish-action-box\">\r\n                <ng-container *ngIf=\"groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate\">\r\n                    <ng-container *ngTemplateOutlet=\"modifierCheckboxTemplate; context: {\r\n                        modifier: modifier,\r\n                        groupId: groupId,\r\n                        amount: amount\r\n                    }\"></ng-container>\r\n                </ng-container>\r\n\r\n                <ng-template #counterTemplate>\r\n                    <ng-container *ngTemplateOutlet=\"modifierCounterTemplate; context: {\r\n                        modifier: modifier,\r\n                        groupId: groupId,\r\n                        amount: amount,\r\n                        groupAmount: groupAmount,\r\n                        groupMinAmount: groupMinAmount,\r\n                        groupMaxAmount: groupMaxAmount\r\n                    }\"></ng-container>\r\n                </ng-template>\r\n\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierCounterTemplate -->\r\n\r\n<ng-template #modifierCounterTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\"\r\n             let-groupAmount=\"groupAmount\"\r\n             let-groupMinAmount=\"groupMinAmount\"\r\n             let-groupMaxAmount=\"groupMaxAmount\">\r\n    <ng-container>\r\n        <div class=\"modifier-counter\" [ngClass]=\"{disabled: !amount && groupAmount >= groupMaxAmount}\">\r\n            <div\r\n                    class=\"minus\"\r\n                    [ngClass]=\"{disabled: !amount || groupAmount <= groupMinAmount}\"\r\n                    (click)=\"changeModifierAmount(modifier, amount - 1, 'minus')\"\r\n                    onselectstart=\"return false;\">-</div>\r\n            <input [value]=\"amount\" readonly #input>\r\n            <div\r\n                    class=\"plus\"\r\n                    [ngClass]=\"{disabled: groupAmount >= groupMaxAmount}\"\r\n                    (click)=\"changeModifierAmount(modifier, amount + 1, 'plus')\"\r\n                    onselectstart=\"return false;\">+</div>\r\n        </div>\r\n    </ng-container>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierCheckboxTemplate -->\r\n\r\n<ng-template #modifierCheckboxTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\">\r\n    <ng-container>\r\n        <div\r\n                class=\"modifier-checkbox\"\r\n                [ngClass]=\"{selected: amount}\"\r\n                (click)=\"changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')\"></div>\r\n    </ng-container>\r\n</ng-template>\r\n",
                    styles: [".dish{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish .dish-image-box{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish .dish-description-box{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish .dish-description-box .dish-name{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish .dish-description-box .dish-ingredients{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish .dish-description-box .dish-price-box{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled .dish{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled .dish .dish-image-box{display:none}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box{height:auto;width:100%}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-name{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px;text-align:center;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-ingredients,.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-price-box{display:none}.dish-image{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result .price{margin-left:76px}.comment{padding-bottom:15px}.comment .title{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;margin:30px 0 20px}.comment .input-box{margin-top:10px}.comment .input-box input{border:2px solid #969696;border-radius:15px;box-sizing:border-box;color:#969696;font-size:20px;font-style:italic;font-weight:400;height:45px;line-height:45px;padding:0 20px}.modifiers .modifier-group{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers .modifier-header .modifier-description{color:#0a0909;font-size:15px;line-height:17px}.modifiers .modifier-dish{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers .modifier-dish .modifier-dish-image-box{background-color:#fff;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{background-position:50%;background-size:contain;height:100%;width:100%}.modifiers .modifier-dish .modifier-dish-description-box{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{display:flex;justify-content:center;width:151px}.two-parts-assembled .two-parts-assembled-header{align-items:center;border-bottom:2px solid #969696;display:flex;height:230px;justify-content:center;opacity:1;overflow:hidden;padding-bottom:28px;transition:all .5s ease 0s}.two-parts-assembled .two-parts-assembled-header.empty{border-bottom:none;height:0;opacity:0}.two-parts-assembled .two-parts-assembled-header .selected-dish{align-items:center;display:flex;justify-content:flex-end;width:50%}.two-parts-assembled .two-parts-assembled-header .selected-dish .title{color:#0a0909;font-size:21px;line-height:25px;margin-right:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box{height:200px;overflow:hidden;width:100px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box .dish-image{height:100%;width:200%}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .title{margin-left:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;padding:20px 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-column-gap:30px;grid-row-gap:24px;grid-template-columns:1fr 1fr 1fr;margin-top:30px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{align-items:center;border:1.5px solid hsla(0,0%,100%,0);box-sizing:border-box;color:#0a0909;cursor:pointer;display:flex;flex-direction:column}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-name{font-size:17px;font-weight:500;letter-spacing:2.4px;line-height:20px;padding:0 5px;text-align:center;text-transform:uppercase}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-price{font-size:20px;font-weight:700;line-height:23px;padding:5px 0 10px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{border-radius:15px 15px 0 0;height:228px;width:228px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{border-radius:15px 15px 0 0;height:100%;width:100%}.modifier-fixed{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed .item{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{cursor:default;opacity:.15}.modifier-counter input{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter .minus,.modifier-counter .plus,.modifier-counter input{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter .minus,.modifier-counter .plus{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}"]
                },] }
    ];
    DishCalcComponent.ctorParameters = function () { return [
        { type: NgRestoCartService },
        { type: dist.EventerService },
        { type: String, decorators: [{ type: i0.Inject, args: ['ImageUrl',] }] }
    ]; };
    DishCalcComponent.propDecorators = {
        dish: [{ type: i0.Input }],
        amount: [{ type: i0.Input }],
        selectedModifiers: [{ type: i0.Input }],
        validate: [{ type: i0.Output }],
        amountDishToAdd: [{ type: i0.Output }],
        comment: [{ type: i0.Output }]
    };

    var NgRestoCartModule = /** @class */ (function () {
        function NgRestoCartModule() {
        }
        return NgRestoCartModule;
    }());
    NgRestoCartModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [common.CommonModule],
                    providers: [],
                    declarations: [
                        AddDishToCartDirective,
                        AmountCartDirective,
                        DeleteFromCartDirective,
                        OrderCartUserDirective,
                        ModifiresDirective,
                        DishCalcDirective,
                        SetDishCommentDirective,
                        SetAmountDirective,
                        CheckoutDirective,
                        DishCalcComponent
                    ],
                    exports: [
                        AddDishToCartDirective,
                        AmountCartDirective,
                        DeleteFromCartDirective,
                        OrderCartUserDirective,
                        ModifiresDirective,
                        DishCalcDirective,
                        SetDishCommentDirective,
                        SetAmountDirective,
                        CheckoutDirective,
                        DishCalcComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of ng-cart
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AddDishToCartDirective = AddDishToCartDirective;
    exports.AmountCartDirective = AmountCartDirective;
    exports.CheckoutDirective = CheckoutDirective;
    exports.DeleteFromCartDirective = DeleteFromCartDirective;
    exports.DishCalcComponent = DishCalcComponent;
    exports.DishCalcDirective = DishCalcDirective;
    exports.ModifiresDirective = ModifiresDirective;
    exports.NgRestoCartModule = NgRestoCartModule;
    exports.NgRestoCartService = NgRestoCartService;
    exports.OrderCartUserDirective = OrderCartUserDirective;
    exports.SetAmountDirective = SetAmountDirective;
    exports.SetDishCommentDirective = SetDishCommentDirective;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=webresto-ng-cart.umd.js.map
