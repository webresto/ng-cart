(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@webresto/ng-core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@webresto/ng-cart', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@webresto/ng-core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.webresto = global.webresto || {}, global.webresto['ng-cart'] = {}), global.ng.core, global.rxjs, global.rxjs.operators, global.i1, global.ng.common));
}(this, (function (exports, i0, rxjs, operators, i1, i3) { 'use strict';

    var NgRestoCartService = /** @class */ (function () {
        function NgRestoCartService(net, eventer) {
            this.net = net;
            this.eventer = eventer;
            this.cartID = this.getCartId();
            this.cart = new rxjs.BehaviorSubject(null);
            this.modifires = new rxjs.BehaviorSubject([]);
            this.OrderFormChange = new rxjs.BehaviorSubject(null);
            this.modifiresMessage = new rxjs.BehaviorSubject([]);
        }
        NgRestoCartService.prototype.getCartId = function () {
            return localStorage.getItem('cartID');
        };
        NgRestoCartService.prototype.getCart = function () {
            var _this = this;
            return this.net.get('/cart?cartId=' + this.cartID).pipe(operators.switchMap(function (cart) {
                if (cart.state == 'ORDER') {
                    return rxjs.throwError(new Error('Cart in order state'));
                }
                else {
                    _this.cart.next(cart.cart);
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
            }, function () {
                _this.eventer.emitMessageEvent(new i1.EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
            }));
        };
        NgRestoCartService.prototype.removeDishFromCart$ = function (dishId, amount) {
            var _this = this;
            return this.net.put('/cart/remove', {
                dishId: dishId,
                cartId: this.cartID,
                amount: amount
            })
                .pipe(operators.tap(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
            }));
        };
        NgRestoCartService.prototype.removeDishFromCart = function (dishId, amount) {
            var _this = this;
            this.net.put('/cart/remove', {
                dishId: dishId,
                cartId: this.cartID,
                amount: amount
            }).subscribe(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
                /*this.eventer.emitMessageEvent(
                 new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
                 );*/
            }, function (error) {
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
                /*if (result.message) {
                 this.eventer.emitMessageEvent(
                 new EventMessage(
                 result.message.type,
                 result.message.title,
                 result.message.body
                 )
                 );
                 }*/
            }, function (error) {
                console.error(error);
                //this.eventer.emitMessageEvent(
                //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
                //)
            }));
        };
        NgRestoCartService.prototype.checkStreet = function (data) {
            var _this = this;
            this.net.post('/check', data).subscribe(function (res) {
                _this.setCartId(res.cart.cartId);
                _this.cart.next(res.cart);
                _this.cartID = res.cart.cartId;
                if (res.message) {
                    _this.eventer.emitMessageEvent(new i1.EventMessage(res.message.type, res.message.title, res.message.body));
                }
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
        };
        NgRestoCartService.prototype.removeCartId = function () {
            localStorage.removeItem('cartID');
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
        NgRestoCartService.prototype.getPickupPoints = function () {
            return this.net.get('/pickupaddreses?cartId=string');
        };
        NgRestoCartService.prototype.getPaymentMethods = function () {
            return this.net.get('/paymentmethods');
        };
        return NgRestoCartService;
    }());
    NgRestoCartService.ɵfac = function NgRestoCartService_Factory(t) { return new (t || NgRestoCartService)(i0.ɵɵinject(i1.NetService), i0.ɵɵinject(i1.EventerService)); };
    NgRestoCartService.ɵprov = i0.ɵɵdefineInjectable({ token: NgRestoCartService, factory: NgRestoCartService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgRestoCartService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return [{ type: i1.NetService }, { type: i1.EventerService }]; }, null);
    })();

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
    AddDishToCartDirective.ɵfac = function AddDishToCartDirective_Factory(t) { return new (t || AddDishToCartDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    AddDishToCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: AddDishToCartDirective, selectors: [["", "addToCart", ""]], hostBindings: function AddDishToCartDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function AddDishToCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { modifires: "modifires", dish: "dish", amountDish: "amountDish", comment: "comment" }, outputs: { loading: "loading", success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AddDishToCartDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[addToCart]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { modifires: [{
                    type: i0.Input
                }], dish: [{
                    type: i0.Input
                }], amountDish: [{
                    type: i0.Input
                }], comment: [{
                    type: i0.Input
                }], loading: [{
                    type: i0.Output
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    AmountCartDirective.ɵfac = function AmountCartDirective_Factory(t) { return new (t || AmountCartDirective)(i0.ɵɵdirectiveInject(NgRestoCartService), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef)); };
    AmountCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: AmountCartDirective, selectors: [["", "amountCart", ""]] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(AmountCartDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[amountCart]'
                    }]
            }], function () { return [{ type: NgRestoCartService }, { type: i0.Renderer2 }, { type: i0.ElementRef }]; }, null);
    })();

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
    CheckoutDirective.ɵfac = function CheckoutDirective_Factory(t) { return new (t || CheckoutDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    CheckoutDirective.ɵdir = i0.ɵɵdefineDirective({ type: CheckoutDirective, selectors: [["", "checkout", ""]], hostBindings: function CheckoutDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function CheckoutDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", error: "error", isChecking: "isChecking" }, features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CheckoutDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[checkout]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { cartTotal: [{
                    type: i0.Input
                }], bonuses: [{
                    type: i0.Input
                }], name: [{
                    type: i0.Input
                }], email: [{
                    type: i0.Input
                }], phone: [{
                    type: i0.Input
                }], delivery: [{
                    type: i0.Input
                }], selfService: [{
                    type: i0.Input
                }], locationId: [{
                    type: i0.Input
                }], street: [{
                    type: i0.Input
                }], streetId: [{
                    type: i0.Input
                }], home: [{
                    type: i0.Input
                }], housing: [{
                    type: i0.Input
                }], apartment: [{
                    type: i0.Input
                }], entrance: [{
                    type: i0.Input
                }], doorphone: [{
                    type: i0.Input
                }], floor: [{
                    type: i0.Input
                }], paymentMethod: [{
                    type: i0.Input
                }], paymentMethodId: [{
                    type: i0.Input
                }], personsCount: [{
                    type: i0.Input
                }], comment: [{
                    type: i0.Input
                }], date: [{
                    type: i0.Input
                }], notifyMethodId: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], isChecking: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    DeleteFromCartDirective.ɵfac = function DeleteFromCartDirective_Factory(t) { return new (t || DeleteFromCartDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    DeleteFromCartDirective.ɵdir = i0.ɵɵdefineDirective({ type: DeleteFromCartDirective, selectors: [["", "deleteFromCart", ""]], hostBindings: function DeleteFromCartDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function DeleteFromCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { dish: "dish", amountDish: "amountDish" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DeleteFromCartDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[deleteFromCart]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { dish: [{
                    type: i0.Input
                }], amountDish: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    DishCalcDirective.ɵfac = function DishCalcDirective_Factory(t) { return new (t || DishCalcDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NgRestoCartService)); };
    DishCalcDirective.ɵdir = i0.ɵɵdefineDirective({ type: DishCalcDirective, selectors: [["", "dishCalc", ""]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DishCalcDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[dishCalc]'
                    }]
            }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: NgRestoCartService }]; }, { dish: [{
                    type: i0.Input
                }], amount: [{
                    type: i0.Input
                }], selectedModifiers: [{
                    type: i0.Input
                }], validate: [{
                    type: i0.Output
                }], amountDishToAdd: [{
                    type: i0.Output
                }] });
    })();

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
    ModifiresDirective.ɵfac = function ModifiresDirective_Factory(t) { return new (t || ModifiresDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(NgRestoCartService)); };
    ModifiresDirective.ɵdir = i0.ɵɵdefineDirective({ type: ModifiresDirective, selectors: [["", "modifires", ""]], inputs: { modifires: "modifires" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ModifiresDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[modifires]'
                    }]
            }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: NgRestoCartService }]; }, { modifires: [{
                    type: i0.Input
                }] });
    })();

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
    OrderCartUserDirective.ɵfac = function OrderCartUserDirective_Factory(t) { return new (t || OrderCartUserDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    OrderCartUserDirective.ɵdir = i0.ɵɵdefineDirective({ type: OrderCartUserDirective, selectors: [["", "orderCart", ""]], hostBindings: function OrderCartUserDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function OrderCartUserDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { orderCart: "orderCart" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(OrderCartUserDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[orderCart]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { orderCart: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    SetAmountDirective.ɵfac = function SetAmountDirective_Factory(t) { return new (t || SetAmountDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    SetAmountDirective.ɵdir = i0.ɵɵdefineDirective({ type: SetAmountDirective, selectors: [["", "setDishAmount", ""]], hostBindings: function SetAmountDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function SetAmountDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { action: "action", dish: "dish" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SetAmountDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[setDishAmount]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { action: [{
                    type: i0.Input
                }], dish: [{
                    type: i0.Input
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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
    SetDishCommentDirective.ɵfac = function SetDishCommentDirective_Factory(t) { return new (t || SetDishCommentDirective)(i0.ɵɵdirectiveInject(NgRestoCartService)); };
    SetDishCommentDirective.ɵdir = i0.ɵɵdefineDirective({ type: SetDishCommentDirective, selectors: [["", "setDishComment", ""]], hostBindings: function SetDishCommentDirective_HostBindings(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵlistener("click", function SetDishCommentDirective_click_HostBindingHandler() { return ctx.onClick(); });
            }
        }, inputs: { comment: "comment", dish: "dish" }, outputs: { success: "success", error: "error" } });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SetDishCommentDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[setDishComment]'
                    }]
            }], function () { return [{ type: NgRestoCartService }]; }, { comment: [{
                    type: i0.Input
                }], dish: [{
                    type: i0.Input
                }], success: [{
                    type: i0.Output
                }], error: [{
                    type: i0.Output
                }], onClick: [{
                    type: i0.HostListener,
                    args: ['click']
                }] });
    })();

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

    function DishCalcComponent_div_0_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c0 = function (a0) { return { "zero-price": a0 }; };
    function DishCalcComponent_div_0_ng_container_10_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 19);
            i0.ɵɵelementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(4, " \u20BD ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r10 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !ctx_r10.dish.price));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx_r10.dish.price);
        }
    }
    var _c1 = function (a0) { return { selected: a0 }; };
    function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            var _r20_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 23);
            i0.ɵɵlistener("click", function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r20_1); var childModifier_r18 = ctx.$implicit; var ctx_r19 = i0.ɵɵnextContext(4); return ctx_r19.changeModifierAmount(childModifier_r18, 1, "checkbox"); });
            i0.ɵɵtext(2);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var childModifier_r18 = ctx.$implicit;
            var modifier_r15 = i0.ɵɵnextContext().ngIf;
            var ctx_r16 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, !!ctx_r16.modifiersValueTree[modifier_r15.modifierId][childModifier_r18.modifierId]));
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate1(" ", childModifier_r18.dish == null ? null : childModifier_r18.dish.name, " ");
        }
    }
    function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 19);
            i0.ɵɵelementStart(2, "span");
            i0.ɵɵtext(3);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(4, " \u20BD ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var childModifier_r22 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !(childModifier_r22.dish == null ? null : childModifier_r22.dish.price)));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(childModifier_r22.dish == null ? null : childModifier_r22.dish.price);
        }
    }
    function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template, 5, 4, "ng-container", 20);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var childModifier_r22 = ctx.$implicit;
            var modifier_r15 = i0.ɵɵnextContext().ngIf;
            var ctx_r17 = i0.ɵɵnextContext(3);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", !!ctx_r17.modifiersValueTree[modifier_r15.modifierId][childModifier_r22.modifierId]);
        }
    }
    function DishCalcComponent_div_0_ng_template_11_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 21);
            i0.ɵɵtemplate(2, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template, 3, 4, "ng-container", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(3, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template, 2, 1, "ng-container", 22);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var modifier_r15 = ctx.ngIf;
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", modifier_r15.childModifiers);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", modifier_r15.childModifiers);
        }
    }
    function DishCalcComponent_div_0_ng_template_11_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, DishCalcComponent_div_0_ng_template_11_ng_container_0_Template, 4, 2, "ng-container", 20);
        }
        if (rf & 2) {
            var ctx_r12 = i0.ɵɵnextContext(2);
            i0.ɵɵproperty("ngIf", ctx_r12.modifiers.custom.fixed);
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 30);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var group_r31 = i0.ɵɵnextContext().ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(group_r31.name);
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 31);
            i0.ɵɵtext(1);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var group_r31 = i0.ɵɵnextContext().ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵtextInterpolate(group_r31.description);
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 27);
            i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template, 2, 1, "div", 28);
            i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template, 2, 1, "div", 29);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var group_r31 = ctx.ngIf;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", group_r31.name);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", group_r31.description);
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c2 = function (a0) { return { "without-images": a0 }; };
    var _c3 = function (a0, a2, a3, a4, a5) { return { modifier: a0, groupId: "single", amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
    function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 32);
            i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var modifier_r27 = i0.ɵɵnextContext().$implicit;
            var ctx_r29 = i0.ɵɵnextContext(3);
            var _r3 = i0.ɵɵreference(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c2, !modifier_r27.childImagesIsset));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction5(5, _c3, modifier_r27, ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c4 = function (a0, a1, a2, a3, a4, a5) { return { modifier: a0, groupId: a1, amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
    function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var childModifier_r39 = ctx.$implicit;
            var modifier_r27 = i0.ɵɵnextContext(2).$implicit;
            var ctx_r38 = i0.ɵɵnextContext(3);
            var _r3 = i0.ɵɵreference(4);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, childModifier_r39, modifier_r27.modifierId, ctx_r38.modifiersValueTree[modifier_r27.modifierId][childModifier_r39.modifierId], ctx_r38.modifiers.indexById[modifier_r27.modifierId].totalAmount, modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 33);
            i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template, 2, 9, "ng-container", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var modifier_r27 = i0.ɵɵnextContext().$implicit;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c2, !modifier_r27.imagesIsset));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", modifier_r27.childModifiers);
        }
    }
    function DishCalcComponent_div_0_div_13_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 25);
            i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template, 3, 2, "div", 26);
            i0.ɵɵtemplate(3, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template, 3, 11, "ng-container", 20);
            i0.ɵɵtemplate(4, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template, 3, 4, "ng-container", 20);
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var modifier_r27 = ctx.$implicit;
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", modifier_r27.group);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", modifier_r27.dish);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", modifier_r27.childModifiers == null ? null : modifier_r27.childModifiers.length);
        }
    }
    function DishCalcComponent_div_0_div_13_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 24);
            i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_Template, 5, 3, "ng-container", 22);
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var ctx_r13 = i0.ɵɵnextContext(2);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngForOf", ctx_r13.modifiers.baseList);
        }
    }
    var _c5 = function (a0) { return { dish: a0 }; };
    function DishCalcComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 5);
            i0.ɵɵelementStart(1, "div", 6);
            i0.ɵɵelementStart(2, "div", 7);
            i0.ɵɵtemplate(3, DishCalcComponent_div_0_ng_container_3_Template, 1, 0, "ng-container", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 9);
            i0.ɵɵelementStart(5, "div", 10);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 11);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 12);
            i0.ɵɵtemplate(10, DishCalcComponent_div_0_ng_container_10_Template, 5, 4, "ng-container", 13);
            i0.ɵɵtemplate(11, DishCalcComponent_div_0_ng_template_11_Template, 1, 1, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(13, DishCalcComponent_div_0_div_13_Template, 2, 1, "div", 15);
            i0.ɵɵelementStart(14, "div", 16);
            i0.ɵɵelementStart(15, "span", 17);
            i0.ɵɵtext(16, "\u0418\u0422\u041E\u0413\u041E:");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(17, "span", 18);
            i0.ɵɵelementStart(18, "span");
            i0.ɵɵtext(19);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(20, " \u20BD ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        }
        if (rf & 2) {
            var _r11 = i0.ɵɵreference(12);
            var ctx_r0 = i0.ɵɵnextContext();
            var _r1 = i0.ɵɵreference(2);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, ctx_r0.dish));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(ctx_r0.dish.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx_r0.dish.description);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", !ctx_r0.modifiers.custom.fixed)("ngIfElse", _r11);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx_r0.modifiers.baseList == null ? null : ctx_r0.modifiers.baseList.length);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate(ctx_r0.totalPrice);
        }
    }
    function DishCalcComponent_ng_template_1_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelement(1, "div", 35);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var dish_r43 = i0.ɵɵnextContext().dish;
            var ctx_r44 = i0.ɵɵnextContext();
            i0.ɵɵadvance(1);
            i0.ɵɵstyleProp("background-image", "url(" + ctx_r44.imageUrl + dish_r43.images[0].images.small + ")");
        }
    }
    function DishCalcComponent_ng_template_1_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelement(0, "div", 36);
        }
    }
    function DishCalcComponent_ng_template_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, DishCalcComponent_ng_template_1_ng_container_0_Template, 2, 2, "ng-container", 13);
            i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_ng_template_1_Template, 1, 0, "ng-template", null, 34, i0.ɵɵtemplateRefExtractor);
        }
        if (rf & 2) {
            var dish_r43 = ctx.dish;
            var _r45 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", (dish_r43 == null ? null : dish_r43.images) && (dish_r43.images[0] == null ? null : dish_r43.images[0].images == null ? null : dish_r43.images[0].images.small))("ngIfElse", _r45);
        }
    }
    function DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    var _c6 = function (a0, a1, a2) { return { modifier: a0, groupId: a1, amount: a2 }; };
    function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵtemplate(1, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template, 1, 0, "ng-container", 8);
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var ctx_r61 = i0.ɵɵnextContext(2);
            var modifier_r48 = ctx_r61.modifier;
            var groupId_r49 = ctx_r61.groupId;
            var amount_r50 = ctx_r61.amount;
            i0.ɵɵnextContext();
            var _r7 = i0.ɵɵreference(8);
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngTemplateOutlet", _r7)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c6, modifier_r48, groupId_r49, amount_r50));
        }
    }
    function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainer(0);
        }
    }
    function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template, 1, 0, "ng-container", 8);
        }
        if (rf & 2) {
            var ctx_r63 = i0.ɵɵnextContext(2);
            var modifier_r48 = ctx_r63.modifier;
            var groupId_r49 = ctx_r63.groupId;
            var amount_r50 = ctx_r63.amount;
            var groupAmount_r51 = ctx_r63.groupAmount;
            var groupMinAmount_r52 = ctx_r63.groupMinAmount;
            var groupMaxAmount_r53 = ctx_r63.groupMaxAmount;
            i0.ɵɵnextContext();
            var _r5 = i0.ɵɵreference(6);
            i0.ɵɵproperty("ngTemplateOutlet", _r5)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, modifier_r48, groupId_r49, amount_r50, groupAmount_r51, groupMinAmount_r52, groupMaxAmount_r53));
        }
    }
    function DishCalcComponent_ng_template_3_ng_container_0_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 37);
            i0.ɵɵelementStart(2, "div", 38);
            i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 39);
            i0.ɵɵelementStart(5, "div", 40);
            i0.ɵɵtext(6);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "div", 41);
            i0.ɵɵtext(8);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(9, "div", 42);
            i0.ɵɵelementStart(10, "div", 43);
            i0.ɵɵelementStart(11, "span");
            i0.ɵɵtext(12);
            i0.ɵɵelementEnd();
            i0.ɵɵtext(13, " \u20BD ");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 44);
            i0.ɵɵtemplate(15, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template, 2, 6, "ng-container", 13);
            i0.ɵɵtemplate(16, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template, 1, 9, "ng-template", null, 45, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var dish_r55 = ctx.ngIf;
            var _r58 = i0.ɵɵreference(17);
            var ctx_r64 = i0.ɵɵnextContext();
            var groupMinAmount_r52 = ctx_r64.groupMinAmount;
            var groupMaxAmount_r53 = ctx_r64.groupMaxAmount;
            i0.ɵɵnextContext();
            var _r1 = i0.ɵɵreference(2);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, dish_r55));
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate(dish_r55.name);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate1("", dish_r55.weight * 1000, " \u0433\u0440");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !dish_r55.price));
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(dish_r55.price);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", groupMinAmount_r52 <= 1 && groupMaxAmount_r53 == 1)("ngIfElse", _r58);
        }
    }
    function DishCalcComponent_ng_template_3_Template(rf, ctx) {
        if (rf & 1) {
            i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_Template, 18, 12, "ng-container", 20);
        }
        if (rf & 2) {
            var modifier_r48 = ctx.modifier;
            i0.ɵɵproperty("ngIf", modifier_r48.dish);
        }
    }
    var _c7 = function (a0) { return { disabled: a0 }; };
    function DishCalcComponent_ng_template_5_Template(rf, ctx) {
        if (rf & 1) {
            var _r73_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 46);
            i0.ɵɵelementStart(2, "div", 47);
            i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_2_listener() { i0.ɵɵrestoreView(_r73_1); var modifier_r65 = ctx.modifier; var amount_r67 = ctx.amount; var ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.changeModifierAmount(modifier_r65, amount_r67 - 1, "minus"); });
            i0.ɵɵtext(3, "-");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(4, "input", 48, 49);
            i0.ɵɵelementStart(6, "div", 50);
            i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_6_listener() { i0.ɵɵrestoreView(_r73_1); var modifier_r65 = ctx.modifier; var amount_r67 = ctx.amount; var ctx_r74 = i0.ɵɵnextContext(); return ctx_r74.changeModifierAmount(modifier_r65, amount_r67 + 1, "plus"); });
            i0.ɵɵtext(7, "+");
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var amount_r67 = ctx.amount;
            var groupAmount_r68 = ctx.groupAmount;
            var groupMinAmount_r69 = ctx.groupMinAmount;
            var groupMaxAmount_r70 = ctx.groupMaxAmount;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c7, !amount_r67 && groupAmount_r68 >= groupMaxAmount_r70));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c7, !amount_r67 || groupAmount_r68 <= groupMinAmount_r69));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", amount_r67);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c7, groupAmount_r68 >= groupMaxAmount_r70));
        }
    }
    function DishCalcComponent_ng_template_7_Template(rf, ctx) {
        if (rf & 1) {
            var _r79_1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementContainerStart(0);
            i0.ɵɵelementStart(1, "div", 51);
            i0.ɵɵlistener("click", function DishCalcComponent_ng_template_7_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r79_1); var modifier_r75 = ctx.modifier; var amount_r77 = ctx.amount; var ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.changeModifierAmount(modifier_r75, amount_r77 ? 0 : 1, "checkbox"); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementContainerEnd();
        }
        if (rf & 2) {
            var amount_r77 = ctx.amount;
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1, amount_r77));
        }
    }
    var DishCalcComponent = /** @class */ (function () {
        function DishCalcComponent(cartService, eventer, imageUrl) {
            this.cartService = cartService;
            this.eventer = eventer;
            this.validate = new i0.EventEmitter();
            this.amountDishToAdd = new i0.EventEmitter();
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
            this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length;
            this.modifiers.indexById[modifierId].childImagesIsset = !!Object
                .values(this.modifiersValueTree[modifierId])
                .find(function (m) { return m && m.dish && m.dish.images && m.dish.images.length; });
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
                    this.eventer.emitMessageEvent(new i1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + groupMinAmount));
                    return;
                }
                if (groupAmount > groupMaxAmount) {
                    console.warn("Limit: max " + groupMaxAmount + ". Current " + groupAmount);
                    this.eventer.emitMessageEvent(new i1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + groupMaxAmount));
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
    DishCalcComponent.ɵfac = function DishCalcComponent_Factory(t) { return new (t || DishCalcComponent)(i0.ɵɵdirectiveInject(NgRestoCartService), i0.ɵɵdirectiveInject(i1.EventerService), i0.ɵɵdirectiveInject('ImageUrl')); };
    DishCalcComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DishCalcComponent, selectors: [["dish-calc"]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 1, consts: [["class", "ng-cart-dish-calc", 4, "ngIf"], ["dishImageTemplate", ""], ["modifierTemplate", ""], ["modifierCounterTemplate", ""], ["modifierCheckboxTemplate", ""], [1, "ng-cart-dish-calc"], [1, "dish"], [1, "dish-image-box"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "dish-description-box"], [1, "dish-name"], [1, "dish-ingredients"], [1, "dish-price-box"], [4, "ngIf", "ngIfElse"], ["modifierFixedTemplate", ""], ["class", "modifiers", 4, "ngIf"], [1, "result"], [1, "text"], [1, "price"], [1, "price", 3, "ngClass"], [4, "ngIf"], [1, "modifier-fixed"], [4, "ngFor", "ngForOf"], [1, "item", 3, "ngClass", "click"], [1, "modifiers"], [1, "modifier-group"], ["class", "modifier-header", 4, "ngIf"], [1, "modifier-header"], ["class", "modifier-name", 4, "ngIf"], ["class", "modifier-description", 4, "ngIf"], [1, "modifier-name"], [1, "modifier-description"], [1, "modifier-box", 3, "ngClass"], [1, "modifier-children", 3, "ngClass"], ["imgPlaceholder", ""], [1, "dish-image"], [1, "dish-image-placeholder"], [1, "modifier-dish"], [1, "modifier-dish-image-box"], [1, "modifier-dish-description-box"], [1, "modifier-dish-name"], [1, "modifier-dish-weight"], [1, "modifier-dish-price-box"], [3, "ngClass"], [1, "modifier-dish-action-box"], ["counterTemplate", ""], [1, "modifier-counter", 3, "ngClass"], ["onselectstart", "return false;", 1, "minus", 3, "ngClass", "click"], ["readonly", "", 3, "value"], ["input", ""], ["onselectstart", "return false;", 1, "plus", 3, "ngClass", "click"], [1, "modifier-checkbox", 3, "ngClass", "click"]], template: function DishCalcComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵtemplate(0, DishCalcComponent_div_0_Template, 21, 10, "div", 0);
                i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵtemplate(5, DishCalcComponent_ng_template_5_Template, 8, 10, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
                i0.ɵɵtemplate(7, DishCalcComponent_ng_template_7_Template, 2, 3, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
            }
            if (rf & 2) {
                i0.ɵɵproperty("ngIf", ctx.dish);
            }
        }, directives: [i3.NgIf, i3.NgTemplateOutlet, i3.NgClass, i3.NgForOf], styles: [".dish[_ngcontent-%COMP%]{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish[_ngcontent-%COMP%]   .dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-ingredients[_ngcontent-%COMP%]{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-price-box[_ngcontent-%COMP%]{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.dish-image[_ngcontent-%COMP%]{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result[_ngcontent-%COMP%]{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{margin-left:76px}.modifiers[_ngcontent-%COMP%]   .modifier-group[_ngcontent-%COMP%]{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]{margin-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-description[_ngcontent-%COMP%]{color:#0a0909;font-size:15px;line-height:17px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-weight[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]   .zero-price[_ngcontent-%COMP%]{display:none}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-action-box[_ngcontent-%COMP%]{display:flex;justify-content:center;width:151px}.modifier-fixed[_ngcontent-%COMP%]{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:first-child{margin-left:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:last-child{margin-right:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item.selected[_ngcontent-%COMP%]{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:not(.selected){cursor:pointer}.modifier-checkbox[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected[_ngcontent-%COMP%]:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled[_ngcontent-%COMP%]{opacity:.3}.modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .minus.disabled[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .plus.disabled[_ngcontent-%COMP%]{cursor:default;opacity:.15}.modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:hover, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:hover{color:#000}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:active, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:active{color:#cc0009}.modifier-counter[_ngcontent-%COMP%]   .minus.loading[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus.loading[_ngcontent-%COMP%]{opacity:.2}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{left:0}.modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{right:0}.without-images[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{height:70px!important}.without-images[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{height:70px}"] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(DishCalcComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'dish-calc',
                        templateUrl: './dish-calc.component.html',
                        styleUrls: ['./dish-calc.component.scss']
                    }]
            }], function () {
            return [{ type: NgRestoCartService }, { type: i1.EventerService }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: ['ImageUrl']
                        }] }];
        }, { dish: [{
                    type: i0.Input
                }], amount: [{
                    type: i0.Input
                }], selectedModifiers: [{
                    type: i0.Input
                }], validate: [{
                    type: i0.Output
                }], amountDishToAdd: [{
                    type: i0.Output
                }] });
    })();

    var DIRECTIVES = [
        AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective,
    ];
    var COMPONENTS = [
        DishCalcComponent
    ];
    var MODULES = [
        i3.CommonModule
    ];
    var NgRestoCartModule = /** @class */ (function () {
        function NgRestoCartModule() {
        }
        return NgRestoCartModule;
    }());
    NgRestoCartModule.ɵmod = i0.ɵɵdefineNgModule({ type: NgRestoCartModule });
    NgRestoCartModule.ɵinj = i0.ɵɵdefineInjector({ factory: function NgRestoCartModule_Factory(t) { return new (t || NgRestoCartModule)(); }, providers: [], imports: [[MODULES]] });
    (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(NgRestoCartModule, { declarations: [AddDishToCartDirective,
                AmountCartDirective,
                DeleteFromCartDirective,
                OrderCartUserDirective,
                //ModifiresDirective,
                DishCalcDirective,
                SetDishCommentDirective,
                SetAmountDirective,
                CheckoutDirective, DishCalcComponent], imports: [i3.CommonModule], exports: [AddDishToCartDirective,
                AmountCartDirective,
                DeleteFromCartDirective,
                OrderCartUserDirective,
                //ModifiresDirective,
                DishCalcDirective,
                SetDishCommentDirective,
                SetAmountDirective,
                CheckoutDirective, DishCalcComponent] });
    })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(NgRestoCartModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [MODULES],
                        providers: [],
                        declarations: [DIRECTIVES, COMPONENTS],
                        exports: [DIRECTIVES, COMPONENTS]
                    }]
            }], null, null);
    })();

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
