import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, EventEmitter, ɵɵdirectiveInject, ɵɵdefineDirective, ɵɵlistener, Directive, Input, Output, HostListener, Renderer2, ElementRef, ɵɵNgOnChangesFeature, ɵɵelementContainer, ɵɵelementContainerStart, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, ɵɵelementContainerEnd, ɵɵnextContext, ɵɵadvance, ɵɵproperty, ɵɵpureFunction1, ɵɵtextInterpolate, ɵɵgetCurrentView, ɵɵrestoreView, ɵɵtextInterpolate1, ɵɵtemplate, ɵɵreference, ɵɵpureFunction5, ɵɵpureFunction6, ɵɵtemplateRefExtractor, ɵɵelement, ɵɵstyleProp, ɵɵpureFunction3, ɵɵdefineComponent, Component, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { BehaviorSubject, from, throwError } from 'rxjs';
import { switchMap, catchError, tap, filter, map, debounceTime } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import { NgIf, NgTemplateOutlet, NgClass, NgForOf, CommonModule } from '@angular/common';

class NgRestoCartService {
    constructor(net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.cartID = this.getCartId();
        this.cart = new BehaviorSubject(null);
        this.modifires = new BehaviorSubject([]);
        this.OrderFormChange = new BehaviorSubject(null);
        this.modifiresMessage = new BehaviorSubject([]);
        this.restrictions$ = this.net.get(`/restrictions`);
    }
    getCartId() {
        return localStorage.getItem('cartID');
    }
    getCart() {
        return this.net.get(`/cart${this.cartID ? '?cartId=' + this.cartID : ''}`).pipe(switchMap(data => {
            if (!data) {
                this.removeCartId();
            }
            ;
            return data ? from([data]) : this.net.get(`/cart}`);
        }), switchMap(data => {
            if (data.cart.state == 'ORDER') {
                return throwError(new Error('Cart in order state'));
            }
            else {
                if (!this.cartID) {
                    this.setCartId(data.cart.cartId);
                }
                ;
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
        }, () => { }));
    }
    removeDishFromCart$(dishId, amount) {
        return this.net.put('/cart/remove', {
            dishId: dishId,
            cartId: this.cartID,
            amount: amount
        })
            .pipe(tap(result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
        }));
    }
    removeDishFromCart(dishId, amount) {
        this.net.put('/cart/remove', {
            dishId: dishId,
            cartId: this.cartID,
            amount: amount
        }).subscribe(result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
             );*/
        }, () => {
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
        }, () => { }));
    }
    checkStreet(data) {
        this.net.post('/check', data).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
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
NgRestoCartService.ɵfac = function NgRestoCartService_Factory(t) { return new (t || NgRestoCartService)(ɵɵinject(NetService), ɵɵinject(EventerService)); };
NgRestoCartService.ɵprov = ɵɵdefineInjectable({ token: NgRestoCartService, factory: NgRestoCartService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgRestoCartService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: NetService }, { type: EventerService }]; }, null); })();

class AddDishToCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.loading = new EventEmitter();
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
        this.cartService
            .getModifires()
            .subscribe(res => this.modifires = res);
    }
    onClick() {
        this.addDishToCart(this.dish.id, this.amountDish);
    }
    addDishToCart(dishID, amount) {
        let data = {
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
            .subscribe(() => this.success.emit(true), e => this.error.emit(e), () => this.loading.emit(false));
    }
}
AddDishToCartDirective.ɵfac = function AddDishToCartDirective_Factory(t) { return new (t || AddDishToCartDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
AddDishToCartDirective.ɵdir = ɵɵdefineDirective({ type: AddDishToCartDirective, selectors: [["", "addToCart", ""]], hostBindings: function AddDishToCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function AddDishToCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { modifires: "modifires", dish: "dish", amountDish: "amountDish", comment: "comment" }, outputs: { loading: "loading", success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AddDishToCartDirective, [{
        type: Directive,
        args: [{
                selector: '[addToCart]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { modifires: [{
            type: Input
        }], dish: [{
            type: Input
        }], amountDish: [{
            type: Input
        }], comment: [{
            type: Input
        }], loading: [{
            type: Output
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class AmountCartDirective {
    constructor(cartService, renderer, el) {
        this.cartService = cartService;
        this.renderer = renderer;
        this.el = el;
        this.amount = '0';
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        this.cartService
            .userCart()
            .subscribe(res => {
            this.cart = res;
            this.amount = res.dishesCount || 0;
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        });
    }
}
AmountCartDirective.ɵfac = function AmountCartDirective_Factory(t) { return new (t || AmountCartDirective)(ɵɵdirectiveInject(NgRestoCartService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef)); };
AmountCartDirective.ɵdir = ɵɵdefineDirective({ type: AmountCartDirective, selectors: [["", "amountCart", ""]] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(AmountCartDirective, [{
        type: Directive,
        args: [{
                selector: '[amountCart]'
            }]
    }], function () { return [{ type: NgRestoCartService }, { type: Renderer2 }, { type: ElementRef }]; }, null); })();

class CheckoutDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
        this.isChecking = new EventEmitter();
        this.cartService
            .userCart()
            .subscribe(cart => this.cart = cart);
        this.cartService.OrderFormChange
            .pipe(filter(() => {
            //if((this.locationId || this.streetId) && this.home && this.phone && this.preparePhone(this.phone).length > 11) {
            if (this.locationId || (this.streetId || this.street) && this.home || this.selfService) {
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
        debounceTime(1000))
            .subscribe(() => this.checkStreet());
    }
    onClick() {
        if (!this.locationId && !((this.streetId || this.street) && this.home) && !this.selfService) {
            this.error.emit('Нужно указать адрес');
            return;
        }
        let comment = this.comment || "Не указан";
        let data = {
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
            data['bonuses'] = this.bonuses.map(b => {
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
        const cartId = this.cart.id;
        this.cartService
            .orderCart(data)
            .subscribe(result => {
            if (result.action && result.action.paymentRedirect) {
                window.location.href = result.action.paymentRedirect;
            }
            else {
                this.success.emit(cartId);
            }
        }, error => this.error.emit(error));
    }
    ngOnChanges(changes) {
        this.cartService.OrderFormChange.next(changes);
    }
    checkStreet() {
        //if(this.streetId == '0') return;
        let comment = this.comment || "Не указан";
        let data = {
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
        () => this.isChecking.emit(false), () => this.isChecking.emit(false));
    }
    preparePhone(phone) {
        if (!phone)
            return '';
        phone = '+' + phone.replace(/[^0-9]/gim, '');
        return phone.replace('+8', '+7');
    }
}
CheckoutDirective.ɵfac = function CheckoutDirective_Factory(t) { return new (t || CheckoutDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
CheckoutDirective.ɵdir = ɵɵdefineDirective({ type: CheckoutDirective, selectors: [["", "checkout", ""]], hostBindings: function CheckoutDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function CheckoutDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { cartTotal: "cartTotal", bonuses: "bonuses", name: "name", email: "email", phone: "phone", delivery: "delivery", selfService: "selfService", locationId: "locationId", street: "street", streetId: "streetId", home: "home", housing: "housing", apartment: "apartment", entrance: "entrance", doorphone: "doorphone", floor: "floor", paymentMethod: "paymentMethod", paymentMethodId: "paymentMethodId", personsCount: "personsCount", comment: "comment", date: "date", notifyMethodId: "notifyMethodId" }, outputs: { success: "success", error: "error", isChecking: "isChecking" }, features: [ɵɵNgOnChangesFeature] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CheckoutDirective, [{
        type: Directive,
        args: [{
                selector: '[checkout]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { cartTotal: [{
            type: Input
        }], bonuses: [{
            type: Input
        }], name: [{
            type: Input
        }], email: [{
            type: Input
        }], phone: [{
            type: Input
        }], delivery: [{
            type: Input
        }], selfService: [{
            type: Input
        }], locationId: [{
            type: Input
        }], street: [{
            type: Input
        }], streetId: [{
            type: Input
        }], home: [{
            type: Input
        }], housing: [{
            type: Input
        }], apartment: [{
            type: Input
        }], entrance: [{
            type: Input
        }], doorphone: [{
            type: Input
        }], floor: [{
            type: Input
        }], paymentMethod: [{
            type: Input
        }], paymentMethodId: [{
            type: Input
        }], personsCount: [{
            type: Input
        }], comment: [{
            type: Input
        }], date: [{
            type: Input
        }], notifyMethodId: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], isChecking: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class DeleteFromCartDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.cartService.removeDishFromCart(this.dish.id, this.amountDish);
    }
}
DeleteFromCartDirective.ɵfac = function DeleteFromCartDirective_Factory(t) { return new (t || DeleteFromCartDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
DeleteFromCartDirective.ɵdir = ɵɵdefineDirective({ type: DeleteFromCartDirective, selectors: [["", "deleteFromCart", ""]], hostBindings: function DeleteFromCartDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function DeleteFromCartDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { dish: "dish", amountDish: "amountDish" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DeleteFromCartDirective, [{
        type: Directive,
        args: [{
                selector: '[deleteFromCart]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { dish: [{
            type: Input
        }], amountDish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class DishCalcDirective {
    constructor(renderer, el, cartService) {
        this.renderer = renderer;
        this.el = el;
        this.cartService = cartService;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.amountModifires = {};
        this.stateModifiers = {};
    }
    ngOnInit() {
        this.renderer.addClass(this.el.nativeElement, "dish-calculator");
        this.amountDish = this.amount;
        this.amountDishToAdd.emit(this.amountDish);
        this.price = this.renderer.createElement("div");
        this.renderer.addClass(this.price, "dish-price");
        setTimeout(() => {
            this.renderDish(this.dish);
            this.render(this.dish.modifiers);
        }, 100);
    }
    renderDish(dish) {
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
        let mainItem = this.renderer.createElement("div");
        this.renderer.addClass(mainItem, "dish-wraper");
        this.renderer.appendChild(this.el.nativeElement, mainItem);
        let itemName = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "name");
        this.renderer.appendChild(mainItem, itemName);
        let title = this.renderer.createElement("div");
        this.renderer.addClass(title, "title");
        this.renderer.setProperty(title, "innerHTML", this.dish.name);
        this.renderer.appendChild(itemName, title);
        let weightDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "dish");
        this.renderer.appendChild(mainItem, weightDishWrapper);
        let weightDishValue = this.renderer.createElement("div");
        this.renderer.addClass(weightDishValue, "value");
        this.renderer.setProperty(weightDishValue, "innerHTML", (this.dish.weight * 1000).toFixed(0) + " г.");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightDishValue, "zero");
        }
        this.renderer.appendChild(weightDishWrapper, weightDishValue);
        this.renderer.setProperty(this.price, "innerHTML", this.dish.price);
        let priceDishWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceDishWrapper, "price");
        this.renderer.addClass(priceDishWrapper, "total");
        this.renderer.appendChild(priceDishWrapper, this.price);
        this.renderer.appendChild(mainItem, priceDishWrapper);
        let itemQuant = this.renderer.createElement("div");
        this.renderer.addClass(itemQuant, "quantity");
        this.renderer.appendChild(mainItem, itemQuant);
        let addButton = this.renderer.createElement("a");
        this.renderer.addClass(addButton, "quantity__button");
        this.renderer.addClass(addButton, "minus");
        this.renderer.setProperty(addButton, "innerHTML", "&#8722;");
        this.renderer.listen(addButton, "click", e => {
            this.changeAmountdish(-1);
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
            this.innerTotalWeight(weightTotal);
        });
        this.renderer.appendChild(itemQuant, addButton);
        let counter = this.renderer.createElement("span");
        this.renderer.addClass(counter, "quantity__counter");
        this.renderer.setProperty(counter, "innerHTML", this.amountDish);
        this.renderer.appendChild(itemQuant, counter);
        let minusButton = this.renderer.createElement("a");
        this.renderer.addClass(minusButton, "quantity__button");
        this.renderer.addClass(addButton, "plus");
        this.renderer.setProperty(minusButton, "innerHTML", "&#x2b;");
        this.renderer.listen(minusButton, "click", e => {
            this.changeAmountdish(1);
            this.renderer.setProperty(counter, "innerHTML", this.amountDish);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
            this.innerTotalWeight(weightTotal);
        });
        this.renderer.appendChild(itemQuant, minusButton);
        let weightTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(itemName, "weight");
        this.renderer.addClass(itemName, "total");
        this.renderer.appendChild(mainItem, weightTotalWrapper);
        let weightTotal = this.renderer.createElement("div");
        if (this.dish.weight === 0 || !this.dish.weight) {
            this.renderer.addClass(weightTotal, "zero");
        }
        this.renderer.addClass(weightTotal, "value");
        this.innerTotalWeight(weightTotal); // TODO: total Weight
        this.renderer.appendChild(weightTotalWrapper, weightTotal);
        this.weightTotal = weightTotal;
        this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(dish.price)); // TODO: правильно считать цену
        let priceTotalWrapper = this.renderer.createElement("div");
        this.renderer.addClass(priceTotalWrapper, "price");
        this.renderer.addClass(priceTotalWrapper, "total");
        this.renderer.appendChild(priceTotalWrapper, this.price);
        this.renderer.appendChild(mainItem, priceTotalWrapper);
    }
    generatePrice(priceDish, amount, modifiresPrice) {
        let selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach(element => {
                this.dish.modifiers.forEach(groups => {
                    let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                });
            });
        let modSum = 0;
        selected.forEach(element => {
            modSum = modSum + element.dish.price * this.amountModifires[element.groupId][element.modifierId];
        });
        modSum = modSum * this.amountDish;
        return (priceDish * this.amountDish + modSum + '<div class="currency">&nbsp;&#x20bd;</div>');
    }
    generateTotalWeight() {
        let selected = [];
        if (this.selectedModifiers)
            this.selectedModifiers.forEach(element => {
                this.dish.modifiers.forEach(groups => {
                    let mod = groups.childModifiers.filter(x => x.modifierId === element.id);
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                });
            });
        let modSum = 0;
        selected.forEach(element => {
            modSum = modSum + element.dish.weight * this.amountModifires[element.groupId][element.modifierId] * 1000;
        });
        modSum = parseFloat((modSum * this.amountDish).toFixed(2));
        console.log(modSum, this.dish.weight * 1000 * this.amountDish);
        console.log(this.dish.weight, this.amountDish);
        let weight = (this.dish.weight * 1000 * this.amountDish) + modSum;
        return (weight).toFixed(0) + " г. <div class='separator'></div>";
    }
    innerTotalWeight(totalWeigthDiv) {
        this.renderer.setProperty(totalWeigthDiv, "innerHTML", this.generateTotalWeight());
    }
    changeAmountdish(value) {
        this.amountDish = this.amountDish + value;
        if (this.amountDish <= 0) {
            this.amountDish = 1;
        }
        if (this.amountDish >= 199) {
            this.amountDish = 199;
        }
        this.amountDishToAdd.emit(this.amountDish);
    }
    render(modifires) {
        this.setModifires();
        if (modifires.length > 0) {
            let h = this.renderer.createElement("h5");
            this.renderer.setProperty(h, "innerHTML", "К этому блюду можно добавить:");
            // this.renderer.appendChild(this.el.nativeElement, h);
        }
        modifires.forEach(elementGroup => {
            this.stateModifiers[elementGroup.modifierId] = {};
            this.amountModifires[elementGroup.modifierId] = {};
            if (elementGroup.dish) {
                let groupDiv = this.groupDiv("Одночные модификаторы не поддерживаются");
                this.renderer.appendChild(this.el.nativeElement, groupDiv);
                console.log("elementGroup", elementGroup);
                //TODO: add single modificator logic
            }
            else if (elementGroup.childModifiers) {
                let groupDiv = this.groupDiv(elementGroup.group ? elementGroup.group.name : "Ошибка");
                this.renderer.appendChild(this.el.nativeElement, groupDiv);
                let modArr = elementGroup.childModifiers;
                modArr.forEach(element => {
                    let modifireDiv = this.modifireDiv(element, elementGroup.modifierId);
                    this.renderer.appendChild(groupDiv, modifireDiv);
                    if (element.defaultAmount < 1) {
                        this.stateModifiers[elementGroup.modifierId][element.modifierId] = false;
                    }
                    else {
                        this.stateModifiers[elementGroup.modifierId][element.modifierId] = true;
                    }
                });
            }
        });
        if (modifires.length > 0) {
            let h = this.renderer.createElement("div");
            this.renderer.setProperty(h, "innerHTML", "<p>* — Количество добавленых опций блюда применяется для каждой порции</p>");
            this.renderer.appendChild(this.el.nativeElement, h);
        }
    }
    groupDiv(nameGorup) {
        let div = this.renderer.createElement("div");
        this.renderer.addClass(div, "group-modifires-wraper");
        this.renderer.appendChild(div, this.renderer.createText("" + nameGorup));
        return div;
    }
    modifireDiv(element, groupId) {
        let div = this.renderer.createElement("div");
        this.renderer.addClass(div, "additional-item");
        this.renderOneModifire(element, div, groupId);
        return div;
    }
    renderOneModifire(element, modifireDiv, groupId) {
        console.info('renderOneModifire', element);
        console.info('renderOneModifire selectedModifiers', this.selectedModifiers);
        // Рендер Названия модификатора
        let itemNameDiv = this.renderer.createElement("div");
        this.renderer.addClass(itemNameDiv, "item-name");
        let label = this.renderer.createElement("label");
        this.renderer.setAttribute(label, "for", element.modifierId);
        this.renderer.appendChild(itemNameDiv, label);
        this.renderer.setProperty(label, "innerHTML", element.dish.name);
        this.renderer.appendChild(modifireDiv, itemNameDiv);
        let weigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(weigthModifireWraper, "left-weight-modifire-wraper");
        let weightModifireLeft = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireLeft, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireLeft, 'zero');
        }
        this.renderer.setProperty(weightModifireLeft, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '');
        this.renderer.appendChild(weigthModifireWraper, weightModifireLeft);
        this.renderer.appendChild(modifireDiv, weigthModifireWraper);
        // Рендер блока изминения количества модификатора
        let itemQuantity = this.renderer.createElement("div");
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
        let min = element.minAmount;
        let max = element.maxAmount;
        let def = element.defaultAmount;
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
        let rightweigthModifireWraper = this.renderer.createElement('div');
        this.renderer.addClass(rightweigthModifireWraper, "right-weight-modifire-wraper");
        let weightModifireRight = this.renderer.createElement('div');
        this.renderer.addClass(weightModifireRight, 'weight');
        if (element.dish.weight === 0 || element.dish.weight < 0) {
            this.renderer.addClass(weightModifireRight, 'zero');
        }
        this.renderer.setProperty(weightModifireRight, 'innerHTML', (element.dish.weight * 1000).toFixed(0) + " г." + '<div class="separator"></div>');
        this.renderer.appendChild(rightweigthModifireWraper, weightModifireRight);
        this.renderer.appendChild(modifireDiv, rightweigthModifireWraper);
        let price = this.renderer.createElement("div");
        this.renderer.addClass(price, "item-price");
        let priceValue;
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
    }
    renderCheckbox(element, isActive, itemQuantity, modifireDiv, groupId) {
        let input = this.renderer.createElement("input");
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
        this.renderer.listen(input, "change", e => {
            if (this.idRadioBox(groupId)) {
                for (const key in this.stateModifiers[groupId]) {
                    if (this.stateModifiers[groupId].hasOwnProperty(key)) {
                        this.stateModifiers[groupId][key] = false;
                        // this.renderer.setProperty(input, 'checked',   true);
                    }
                }
                let groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                groupDivBlock.forEach(element => {
                    if (element.id != e.target.id)
                        element.checked = false;
                });
            }
            this.stateModifiers[groupId][e.target.id] = e.target.checked;
            if (e.target.checked) {
                this.amountModifires[groupId][e.target.id] = 1;
            }
            this.setModifires();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
        this.renderer.appendChild(modifireDiv, itemQuantity);
    }
    renderInputButton(element, groupId, itemQuantity, modifireDiv) {
        let startAmount;
        if (element.defaultAmount > 0) {
            startAmount = element.defaultAmount;
        }
        else {
            startAmount = element.minAmount;
        }
        if (startAmount > 0) {
            this.stateModifiers[groupId][element.modifierId] = true;
        }
        let aMinusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aMinusDiv, "quantity__button");
        this.renderer.setProperty(aMinusDiv, "innerHTML", "&#8722;");
        this.renderer.appendChild(itemQuantity, aMinusDiv);
        this.renderer.listen(aMinusDiv, "click", e => {
            let value = +this.amountModifires[groupId][element.modifierId];
            this.amountModifires[groupId][element.modifierId] = value - 1;
            if (this.amountModifires[groupId][element.modifierId] < element.minAmount)
                this.amountModifires[groupId][element.modifierId] = element.minAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifires[groupId][element.modifierId]);
            if (this.amountModifires[groupId][element.modifierId] === 0) {
                this.stateModifiers[groupId][element.modifierId] = false;
            }
            this.setModifires();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
        let span = this.renderer.createElement("span");
        this.renderer.addClass(span, "item-quantity__counter");
        this.amountModifires[groupId][element.modifierId] = startAmount;
        this.renderer.setProperty(span, "innerHTML", this.amountModifires[groupId][element.modifierId]);
        this.renderer.appendChild(itemQuantity, span);
        let aPlusDiv = this.renderer.createElement("a");
        this.renderer.addClass(aPlusDiv, "quantity__button");
        this.renderer.setProperty(aPlusDiv, "innerHTML", "&#x2b;");
        this.renderer.appendChild(itemQuantity, aPlusDiv);
        this.renderer.appendChild(modifireDiv, itemQuantity);
        this.renderer.listen(aPlusDiv, "click", e => {
            let value = +this.amountModifires[groupId][element.modifierId];
            this.amountModifires[groupId][element.modifierId] = value + 1;
            if (this.amountModifires[groupId][element.modifierId] >
                element.maxAmount &&
                element.maxAmount != 0)
                this.amountModifires[groupId][element.modifierId] = element.maxAmount;
            this.renderer.setProperty(span, "innerHTML", this.amountModifires[groupId][element.modifierId]);
            if (this.amountModifires[groupId][element.modifierId] > 0) {
                this.stateModifiers[groupId][element.modifierId] = true;
            }
            this.setModifires();
            this.innerTotalWeight(this.weightTotal);
            this.renderer.setProperty(this.price, "innerHTML", this.generatePrice(this.dish.price));
        });
    }
    setModifires() {
        let modifiersToSelect = [];
        /*if(this.selectedModifiers.length && !(Object.values(this.stateModifiers)).length) {
          modifiersToSelect = this.selectedModifiers;
        }*/
        let modifires = [];
        console.info('setModifires modifiersToSelect', modifiersToSelect);
        console.info('setModifires stateModifiers before', this.stateModifiers);
        console.info('setModifires selectedModifiers before', this.selectedModifiers);
        for (let groupId in this.stateModifiers) {
            for (let modifireId in this.stateModifiers[groupId]) {
                if (this.stateModifiers[groupId][modifireId] || modifiersToSelect.find(item => item.modifierId == modifireId)) {
                    modifires.push({
                        id: modifireId,
                        amount: this.amountModifires[groupId][modifireId],
                        groupId: groupId
                    });
                }
            }
        }
        this.selectedModifiers = modifires;
        if (this.dish.modifiers.length > 0) {
            let message = [];
            this.dish.modifiers.forEach(group => {
                if (group.required) {
                    if (this.stateModifiers[group.modifierId]) {
                        let selectedModif = [];
                        let localModif = this.stateModifiers[group.modifierId]; //.filter(element=>element);
                        for (const mod in localModif) {
                            if (localModif.hasOwnProperty(mod)) {
                                if (localModif[mod]) {
                                    selectedModif.push(localModif[mod]);
                                }
                            }
                        }
                        if (selectedModif.length < group.minAmount) {
                            message.push({
                                type: "warning",
                                title: "Внимание",
                                body: " Обязательно выберите модификаторы из категории: " +
                                    group.group.name
                            });
                            this.validate.emit(false);
                            this.cartService.setModifires(modifires, message);
                        }
                        else {
                            this.validate.emit(true);
                            this.cartService.setModifires(modifires, []);
                        }
                    }
                    else {
                        message.push({
                            type: "warning",
                            title: "Внимание",
                            body: " Обязательно выберите модификаторы из категории: " +
                                group.group.name
                        });
                        this.validate.emit(false);
                        this.cartService.setModifires(modifires, message);
                    }
                }
                else {
                    this.validate.emit(true);
                    this.cartService.setModifires(modifires);
                }
            });
        }
        else {
            this.validate.emit(true);
            this.cartService.setModifires(modifires, []);
        }
        console.info('setModifires stateModifiers after', this.stateModifiers);
        console.info('setModifires selectedModifiers after', this.selectedModifiers);
    }
    /* проверяет соотвествет ли максимальное количество модификаторовб если 1 то реализует поведение радиокнопки,
     если максимальное количество больше 1 то генерирует делает выбор всех остальных модификаторов не возможным, генерирует предупреждение*/
    idRadioBox(groupId) {
        let currentGroup = this.dish.modifiers.find(x => x.modifierId === groupId);
        return currentGroup.minAmount === 1 && currentGroup.maxAmount === 1;
    }
    // Проверяет минимальное количество модификаторовкоторые были выбраны
    checkMinAmountModifires(groupId, modifire) {
    }
    ngOnDestroy() {
        //this.dish.modifiers =[];
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    }
}
DishCalcDirective.ɵfac = function DishCalcDirective_Factory(t) { return new (t || DishCalcDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgRestoCartService)); };
DishCalcDirective.ɵdir = ɵɵdefineDirective({ type: DishCalcDirective, selectors: [["", "dishCalc", ""]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DishCalcDirective, [{
        type: Directive,
        args: [{
                selector: '[dishCalc]'
            }]
    }], function () { return [{ type: Renderer2 }, { type: ElementRef }, { type: NgRestoCartService }]; }, { dish: [{
            type: Input
        }], amount: [{
            type: Input
        }], selectedModifiers: [{
            type: Input
        }], validate: [{
            type: Output
        }], amountDishToAdd: [{
            type: Output
        }] }); })();

class ModifiresDirective {
    constructor(renderer, el, cartService) {
        this.renderer = renderer;
        this.el = el;
        this.cartService = cartService;
        this.amountModifires = {};
        this.stateModifires = {};
        setTimeout(() => {
            this.render(this.modifires);
        }, 100);
    }
    render(modifires) {
        if (modifires.length > 0) {
            let h = this.renderer.createElement('h5');
            this.renderer.setProperty(h, 'innerHTML', 'К этому блюду можно добавить:');
            this.renderer.appendChild(this.el.nativeElement, h);
        }
        modifires.forEach(elementGroup => {
            this.stateModifires[elementGroup.modifierId] = {};
            this.amountModifires[elementGroup.modifierId] = {};
            let groupDiv = this.groupDiv(elementGroup.name);
            this.renderer.appendChild(this.el.nativeElement, groupDiv);
            let modArr;
            if (elementGroup.childModifiers.length > 5) {
                modArr = elementGroup.childModifiers.slice(0, 5);
            }
            else {
                modArr = elementGroup.childModifiers;
            }
            modArr.forEach(element => {
                let modifireDiv = this.modifireDiv(element, elementGroup.modifierId);
                this.renderer.appendChild(groupDiv, modifireDiv);
                this.stateModifires[elementGroup.modifierId][element.modifierId] = false;
            });
        });
    }
    groupDiv(nameGorup) {
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'group-modifires');
        this.renderer.appendChild(div, this.renderer.createText('Название категории модификаторов: ' + nameGorup));
        return div;
    }
    modifireDiv(element, groupId) {
        let div = this.renderer.createElement('div');
        this.renderer.addClass(div, 'additional-item');
        this.renderOneModifire(element, div, groupId);
        return div;
    }
    renderOneModifire(element, modifireDiv, groupId) {
        // Рендер Названия модификатора
        let itemNameDiv = this.renderer.createElement('div');
        this.renderer.addClass(itemNameDiv, 'item-name');
        let input = this.renderer.createElement('input');
        this.renderer.setAttribute(input, 'type', 'checkbox');
        this.renderer.setAttribute(input, 'id', element.modifierId);
        this.renderer.appendChild(itemNameDiv, input);
        this.renderer.listen(input, 'change', e => {
            this.stateModifires[groupId][e.target.id] = e.target.checked;
            this.setModifires();
        });
        let label = this.renderer.createElement('label');
        this.renderer.setAttribute(label, 'for', element.modifierId);
        this.renderer.appendChild(itemNameDiv, label);
        this.renderer.setProperty(label, 'innerHTML', element.dish.name);
        this.renderer.appendChild(modifireDiv, itemNameDiv);
        // Рендер блока изминения количества модификатора
        let itemQuantity = this.renderer.createElement('div');
        let aMinusDiv = this.renderer.createElement('a');
        this.renderer.addClass(aMinusDiv, 'item-quantity__button');
        this.renderer.setProperty(aMinusDiv, 'innerHTML', '&#8722;');
        this.renderer.appendChild(itemQuantity, aMinusDiv);
        this.renderer.listen(aMinusDiv, 'click', e => {
            let value = +this.amountModifires[groupId][element.modifierId];
            this.amountModifires[groupId][element.modifierId] = value - 1;
            if (this.amountModifires[groupId][element.modifierId] < element.minAmount)
                this.amountModifires[groupId][element.modifierId] = element.minAmount;
            this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
            this.setModifires();
        });
        let span = this.renderer.createElement('span');
        this.renderer.addClass(span, 'item-quantity__counter');
        this.amountModifires[groupId][element.modifierId] = element.minAmount;
        this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
        this.renderer.appendChild(itemQuantity, span);
        let aPlusDiv = this.renderer.createElement('a');
        this.renderer.addClass(aPlusDiv, 'item-quantity__button');
        this.renderer.setProperty(aPlusDiv, 'innerHTML', '&#x2b;');
        this.renderer.appendChild(itemQuantity, aPlusDiv);
        this.renderer.appendChild(modifireDiv, itemQuantity);
        this.renderer.listen(aPlusDiv, 'click', e => {
            let value = +this.amountModifires[groupId][element.modifierId];
            this.amountModifires[groupId][element.modifierId] = value + 1;
            this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
            this.setModifires();
        });
        // Рендер блока стоимости и веса модификатора
        let weightPriceDiv = this.renderer.createElement('div');
        this.renderer.addClass(weightPriceDiv, 'weight-price');
        let weightAndPriceHTML = element.dish.weight + " г / " + element.dish.price + "&nbsp;&#x20bd;";
        this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
        this.renderer.appendChild(modifireDiv, weightPriceDiv);
        this.setModifires();
    }
    setModifires() {
        let modifires = [];
        for (let groupId in this.stateModifires) {
            for (let modifireId in this.stateModifires[groupId]) {
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
    }
}
ModifiresDirective.ɵfac = function ModifiresDirective_Factory(t) { return new (t || ModifiresDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgRestoCartService)); };
ModifiresDirective.ɵdir = ɵɵdefineDirective({ type: ModifiresDirective, selectors: [["", "modifires", ""]], inputs: { modifires: "modifires" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ModifiresDirective, [{
        type: Directive,
        args: [{
                selector: '[modifires]'
            }]
    }], function () { return [{ type: Renderer2 }, { type: ElementRef }, { type: NgRestoCartService }]; }, { modifires: [{
            type: Input
        }] }); })();

class OrderCartUserDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.requiredFields = ["name", "phone", "street", "house"];
        this.checkerFields = new BehaviorSubject(undefined);
    }
    onClick() {
        this.order(this.orderCart.value);
        console.log(this.orderCart.value);
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.cartService
                .userCart()
                .subscribe(cart => {
                if (this.cart && this.orderCart.valid && this.cart.cartTotal != cart.cartTotal && cart.cartTotal > 0) {
                    this.checkStreet(this.orderCart.value);
                }
                this.cart = cart;
            });
        }, 100);
        setTimeout(() => {
            this.checkerFields.next(this.checkForFields(this.orderCart._directives, this.requiredFields));
        }, 100);
        this.checkerFields.subscribe(state => {
            if (state) {
                this.orderCart.controls['street'].valueChanges.subscribe(val => {
                    if (typeof val === 'object') {
                        setTimeout(() => {
                            if (this.orderCart.controls['house'].valid) {
                                this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                                this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                                this.checkStreet(this.orderCart.value);
                            }
                        }, 100);
                    }
                });
                this.orderCart.controls['house'].valueChanges.subscribe(val => {
                    setTimeout(() => {
                        if (this.orderCart.controls['street'].valid) {
                            this.orderCart.value.name = this.orderCart.value.name || "Неуказано";
                            this.orderCart.value.phone = this.orderCart.value.phone || "78888888888";
                            this.checkStreet(this.orderCart.value);
                        }
                    }, 100);
                });
            }
        });
    }
    checkForFields(formDirectives, requiredFields) {
        let fieldsAreAvailable = {};
        let noFields = [];
        formDirectives.forEach(element => {
            fieldsAreAvailable[element.name] = true;
        });
        requiredFields.forEach(element => {
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
    }
    order(dataToSend) {
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let payment;
            let comment = dataToSend.comment || "Не указан";
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
            let data = {
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
    }
    checkStreet(dataToSend) {
        console.log(">>>>", dataToSend);
        if (this.checkForFields(this.orderCart._directives, this.requiredFields)) {
            let data = {
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
    }
    stringToNumber(str) {
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
    }
}
OrderCartUserDirective.ɵfac = function OrderCartUserDirective_Factory(t) { return new (t || OrderCartUserDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
OrderCartUserDirective.ɵdir = ɵɵdefineDirective({ type: OrderCartUserDirective, selectors: [["", "orderCart", ""]], hostBindings: function OrderCartUserDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function OrderCartUserDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { orderCart: "orderCart" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(OrderCartUserDirective, [{
        type: Directive,
        args: [{
                selector: '[orderCart]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { orderCart: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class SetAmountDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.cartService
            .userCart()
            .subscribe(res => this.cart = res);
    }
    onClick() {
        this.changeAmount(this.action);
    }
    changeAmount(action) {
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
    }
}
SetAmountDirective.ɵfac = function SetAmountDirective_Factory(t) { return new (t || SetAmountDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
SetAmountDirective.ɵdir = ɵɵdefineDirective({ type: SetAmountDirective, selectors: [["", "setDishAmount", ""]], hostBindings: function SetAmountDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function SetAmountDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { action: "action", dish: "dish" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SetAmountDirective, [{
        type: Directive,
        args: [{
                selector: '[setDishAmount]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { action: [{
            type: Input
        }], dish: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

class SetDishCommentDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.setComment();
    }
    setComment() {
        this.cartService.setDishComment(this.dish.id, this.comment).subscribe(res => this.success.emit(true), err => this.error.emit(err));
    }
}
SetDishCommentDirective.ɵfac = function SetDishCommentDirective_Factory(t) { return new (t || SetDishCommentDirective)(ɵɵdirectiveInject(NgRestoCartService)); };
SetDishCommentDirective.ɵdir = ɵɵdefineDirective({ type: SetDishCommentDirective, selectors: [["", "setDishComment", ""]], hostBindings: function SetDishCommentDirective_HostBindings(rf, ctx) { if (rf & 1) {
        ɵɵlistener("click", function SetDishCommentDirective_click_HostBindingHandler() { return ctx.onClick(); });
    } }, inputs: { comment: "comment", dish: "dish" }, outputs: { success: "success", error: "error" } });
/*@__PURE__*/ (function () { ɵsetClassMetadata(SetDishCommentDirective, [{
        type: Directive,
        args: [{
                selector: '[setDishComment]'
            }]
    }], function () { return [{ type: NgRestoCartService }]; }, { comment: [{
            type: Input
        }], dish: [{
            type: Input
        }], success: [{
            type: Output
        }], error: [{
            type: Output
        }], onClick: [{
            type: HostListener,
            args: ['click']
        }] }); })();

function DishCalcComponent_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { "zero-price": a0 }; };
function DishCalcComponent_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 19);
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵtext(4, " \u20BD ");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c0, !ctx_r10.dish.price));
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r10.dish.price);
} }
const _c1 = function (a0) { return { selected: a0 }; };
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r20 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 23);
    ɵɵlistener("click", function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template_div_click_1_listener() { ɵɵrestoreView(_r20); const childModifier_r18 = ctx.$implicit; const ctx_r19 = ɵɵnextContext(4); return ctx_r19.changeModifierAmount(childModifier_r18, 1, "checkbox"); });
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r18 = ctx.$implicit;
    const modifier_r15 = ɵɵnextContext().ngIf;
    const ctx_r16 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c1, !!ctx_r16.modifiersValueTree[modifier_r15.modifierId][childModifier_r18.modifierId]));
    ɵɵadvance(1);
    ɵɵtextInterpolate1(" ", childModifier_r18.dish == null ? null : childModifier_r18.dish.name, " ");
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 19);
    ɵɵelementStart(2, "span");
    ɵɵtext(3);
    ɵɵelementEnd();
    ɵɵtext(4, " \u20BD ");
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r22 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c0, !(childModifier_r22.dish == null ? null : childModifier_r22.dish.price)));
    ɵɵadvance(2);
    ɵɵtextInterpolate(childModifier_r22.dish == null ? null : childModifier_r22.dish.price);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template, 5, 4, "ng-container", 20);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r22 = ctx.$implicit;
    const modifier_r15 = ɵɵnextContext().ngIf;
    const ctx_r17 = ɵɵnextContext(3);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", !!ctx_r17.modifiersValueTree[modifier_r15.modifierId][childModifier_r22.modifierId]);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 21);
    ɵɵtemplate(2, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template, 3, 4, "ng-container", 22);
    ɵɵelementEnd();
    ɵɵtemplate(3, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template, 2, 1, "ng-container", 22);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r15 = ctx.ngIf;
    ɵɵadvance(2);
    ɵɵproperty("ngForOf", modifier_r15.childModifiers);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", modifier_r15.childModifiers);
} }
function DishCalcComponent_div_0_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, DishCalcComponent_div_0_ng_template_11_ng_container_0_Template, 4, 2, "ng-container", 20);
} if (rf & 2) {
    const ctx_r12 = ɵɵnextContext(2);
    ɵɵproperty("ngIf", ctx_r12.modifiers.custom.fixed);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 30);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = ɵɵnextContext().ngIf;
    ɵɵadvance(1);
    ɵɵtextInterpolate(group_r31.name);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 31);
    ɵɵtext(1);
    ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = ɵɵnextContext().ngIf;
    ɵɵadvance(1);
    ɵɵtextInterpolate(group_r31.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 27);
    ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template, 2, 1, "div", 28);
    ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template, 2, 1, "div", 29);
    ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = ctx.ngIf;
    ɵɵadvance(1);
    ɵɵproperty("ngIf", group_r31.name);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", group_r31.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { "without-images": a0 }; };
const _c3 = function (a0, a2, a3, a4, a5) { return { modifier: a0, groupId: "single", amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 32);
    ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 8);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = ɵɵnextContext().$implicit;
    const ctx_r29 = ɵɵnextContext(3);
    const _r3 = ɵɵreference(4);
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c2, !modifier_r27.childImagesIsset));
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", ɵɵpureFunction5(5, _c3, modifier_r27, ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c4 = function (a0, a1, a2, a3, a4, a5) { return { modifier: a0, groupId: a1, amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r39 = ctx.$implicit;
    const modifier_r27 = ɵɵnextContext(2).$implicit;
    const ctx_r38 = ɵɵnextContext(3);
    const _r3 = ɵɵreference(4);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", ɵɵpureFunction6(2, _c4, childModifier_r39, modifier_r27.modifierId, ctx_r38.modifiersValueTree[modifier_r27.modifierId][childModifier_r39.modifierId], ctx_r38.modifiers.indexById[modifier_r27.modifierId].totalAmount, modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 33);
    ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template, 2, 9, "ng-container", 22);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = ɵɵnextContext().$implicit;
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(2, _c2, !modifier_r27.imagesIsset));
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", modifier_r27.childModifiers);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 25);
    ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template, 3, 2, "div", 26);
    ɵɵtemplate(3, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template, 3, 11, "ng-container", 20);
    ɵɵtemplate(4, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template, 3, 4, "ng-container", 20);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = ctx.$implicit;
    ɵɵadvance(2);
    ɵɵproperty("ngIf", modifier_r27.group);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", modifier_r27.dish);
    ɵɵadvance(1);
    ɵɵproperty("ngIf", modifier_r27.childModifiers == null ? null : modifier_r27.childModifiers.length);
} }
function DishCalcComponent_div_0_div_13_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 24);
    ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_Template, 5, 3, "ng-container", 22);
    ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = ɵɵnextContext(2);
    ɵɵadvance(1);
    ɵɵproperty("ngForOf", ctx_r13.modifiers.baseList);
} }
const _c5 = function (a0) { return { dish: a0 }; };
function DishCalcComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementStart(0, "div", 5);
    ɵɵelementStart(1, "div", 6);
    ɵɵelementStart(2, "div", 7);
    ɵɵtemplate(3, DishCalcComponent_div_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 9);
    ɵɵelementStart(5, "div", 10);
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelementStart(7, "div", 11);
    ɵɵtext(8);
    ɵɵelementEnd();
    ɵɵelementStart(9, "div", 12);
    ɵɵtemplate(10, DishCalcComponent_div_0_ng_container_10_Template, 5, 4, "ng-container", 13);
    ɵɵtemplate(11, DishCalcComponent_div_0_ng_template_11_Template, 1, 1, "ng-template", null, 14, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵtemplate(13, DishCalcComponent_div_0_div_13_Template, 2, 1, "div", 15);
    ɵɵelementStart(14, "div", 16);
    ɵɵelementStart(15, "span", 17);
    ɵɵtext(16, "\u0418\u0422\u041E\u0413\u041E:");
    ɵɵelementEnd();
    ɵɵelementStart(17, "span", 18);
    ɵɵelementStart(18, "span");
    ɵɵtext(19);
    ɵɵelementEnd();
    ɵɵtext(20, " \u20BD ");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementEnd();
} if (rf & 2) {
    const _r11 = ɵɵreference(12);
    const ctx_r0 = ɵɵnextContext();
    const _r1 = ɵɵreference(2);
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ɵɵpureFunction1(8, _c5, ctx_r0.dish));
    ɵɵadvance(3);
    ɵɵtextInterpolate(ctx_r0.dish.name);
    ɵɵadvance(2);
    ɵɵtextInterpolate(ctx_r0.dish.description);
    ɵɵadvance(2);
    ɵɵproperty("ngIf", !ctx_r0.modifiers.custom.fixed)("ngIfElse", _r11);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", ctx_r0.modifiers.baseList == null ? null : ctx_r0.modifiers.baseList.length);
    ɵɵadvance(6);
    ɵɵtextInterpolate(ctx_r0.totalPrice);
} }
function DishCalcComponent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelement(1, "div", 35);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r43 = ɵɵnextContext().dish;
    const ctx_r44 = ɵɵnextContext();
    ɵɵadvance(1);
    ɵɵstyleProp("background-image", "url(" + ctx_r44.imageUrl + dish_r43.images[0].images.small + ")");
} }
function DishCalcComponent_ng_template_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "div", 36);
} }
function DishCalcComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, DishCalcComponent_ng_template_1_ng_container_0_Template, 2, 2, "ng-container", 13);
    ɵɵtemplate(1, DishCalcComponent_ng_template_1_ng_template_1_Template, 1, 0, "ng-template", null, 34, ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const dish_r43 = ctx.dish;
    const _r45 = ɵɵreference(2);
    ɵɵproperty("ngIf", (dish_r43 == null ? null : dish_r43.images) && (dish_r43.images[0] == null ? null : dish_r43.images[0].images == null ? null : dish_r43.images[0].images.small))("ngIfElse", _r45);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
const _c6 = function (a0, a1, a2) { return { modifier: a0, groupId: a1, amount: a2 }; };
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtemplate(1, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template, 1, 0, "ng-container", 8);
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r61 = ɵɵnextContext(2);
    const modifier_r48 = ctx_r61.modifier;
    const groupId_r49 = ctx_r61.groupId;
    const amount_r50 = ctx_r61.amount;
    ɵɵnextContext();
    const _r7 = ɵɵreference(8);
    ɵɵadvance(1);
    ɵɵproperty("ngTemplateOutlet", _r7)("ngTemplateOutletContext", ɵɵpureFunction3(2, _c6, modifier_r48, groupId_r49, amount_r50));
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template, 1, 0, "ng-container", 8);
} if (rf & 2) {
    const ctx_r63 = ɵɵnextContext(2);
    const modifier_r48 = ctx_r63.modifier;
    const groupId_r49 = ctx_r63.groupId;
    const amount_r50 = ctx_r63.amount;
    const groupAmount_r51 = ctx_r63.groupAmount;
    const groupMinAmount_r52 = ctx_r63.groupMinAmount;
    const groupMaxAmount_r53 = ctx_r63.groupMaxAmount;
    ɵɵnextContext();
    const _r5 = ɵɵreference(6);
    ɵɵproperty("ngTemplateOutlet", _r5)("ngTemplateOutletContext", ɵɵpureFunction6(2, _c4, modifier_r48, groupId_r49, amount_r50, groupAmount_r51, groupMinAmount_r52, groupMaxAmount_r53));
} }
function DishCalcComponent_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 37);
    ɵɵelementStart(2, "div", 38);
    ɵɵtemplate(3, DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    ɵɵelementEnd();
    ɵɵelementStart(4, "div", 39);
    ɵɵelementStart(5, "div", 40);
    ɵɵtext(6);
    ɵɵelementEnd();
    ɵɵelementStart(7, "div", 41);
    ɵɵtext(8);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(9, "div", 42);
    ɵɵelementStart(10, "div", 43);
    ɵɵelementStart(11, "span");
    ɵɵtext(12);
    ɵɵelementEnd();
    ɵɵtext(13, " \u20BD ");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementStart(14, "div", 44);
    ɵɵtemplate(15, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template, 2, 6, "ng-container", 13);
    ɵɵtemplate(16, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template, 1, 9, "ng-template", null, 45, ɵɵtemplateRefExtractor);
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r55 = ctx.ngIf;
    const _r58 = ɵɵreference(17);
    const ctx_r64 = ɵɵnextContext();
    const groupMinAmount_r52 = ctx_r64.groupMinAmount;
    const groupMaxAmount_r53 = ctx_r64.groupMaxAmount;
    ɵɵnextContext();
    const _r1 = ɵɵreference(2);
    ɵɵadvance(3);
    ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", ɵɵpureFunction1(8, _c5, dish_r55));
    ɵɵadvance(3);
    ɵɵtextInterpolate(dish_r55.name);
    ɵɵadvance(2);
    ɵɵtextInterpolate1("", dish_r55.weight * 1000, " \u0433\u0440");
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(10, _c0, !dish_r55.price));
    ɵɵadvance(2);
    ɵɵtextInterpolate(dish_r55.price);
    ɵɵadvance(3);
    ɵɵproperty("ngIf", groupMinAmount_r52 <= 1 && groupMaxAmount_r53 == 1)("ngIfElse", _r58);
} }
function DishCalcComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_Template, 18, 12, "ng-container", 20);
} if (rf & 2) {
    const modifier_r48 = ctx.modifier;
    ɵɵproperty("ngIf", modifier_r48.dish);
} }
const _c7 = function (a0) { return { disabled: a0 }; };
function DishCalcComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r73 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 46);
    ɵɵelementStart(2, "div", 47);
    ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_2_listener() { ɵɵrestoreView(_r73); const modifier_r65 = ctx.modifier; const amount_r67 = ctx.amount; const ctx_r72 = ɵɵnextContext(); return ctx_r72.changeModifierAmount(modifier_r65, amount_r67 - 1, "minus"); });
    ɵɵtext(3, "-");
    ɵɵelementEnd();
    ɵɵelement(4, "input", 48, 49);
    ɵɵelementStart(6, "div", 50);
    ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_6_listener() { ɵɵrestoreView(_r73); const modifier_r65 = ctx.modifier; const amount_r67 = ctx.amount; const ctx_r74 = ɵɵnextContext(); return ctx_r74.changeModifierAmount(modifier_r65, amount_r67 + 1, "plus"); });
    ɵɵtext(7, "+");
    ɵɵelementEnd();
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r67 = ctx.amount;
    const groupAmount_r68 = ctx.groupAmount;
    const groupMinAmount_r69 = ctx.groupMinAmount;
    const groupMaxAmount_r70 = ctx.groupMaxAmount;
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(4, _c7, !amount_r67 && groupAmount_r68 >= groupMaxAmount_r70));
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(6, _c7, !amount_r67 || groupAmount_r68 <= groupMinAmount_r69));
    ɵɵadvance(2);
    ɵɵproperty("value", amount_r67);
    ɵɵadvance(2);
    ɵɵproperty("ngClass", ɵɵpureFunction1(8, _c7, groupAmount_r68 >= groupMaxAmount_r70));
} }
function DishCalcComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r79 = ɵɵgetCurrentView();
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 51);
    ɵɵlistener("click", function DishCalcComponent_ng_template_7_Template_div_click_1_listener() { ɵɵrestoreView(_r79); const modifier_r75 = ctx.modifier; const amount_r77 = ctx.amount; const ctx_r78 = ɵɵnextContext(); return ctx_r78.changeModifierAmount(modifier_r75, amount_r77 ? 0 : 1, "checkbox"); });
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r77 = ctx.amount;
    ɵɵadvance(1);
    ɵɵproperty("ngClass", ɵɵpureFunction1(1, _c1, amount_r77));
} }
class DishCalcComponent {
    constructor(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
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
    ngOnInit() {
        this.checkValid();
    }
    ngOnDestroy() {
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    }
    ngOnChanges() {
        this.modifiers = {
            indexById: {},
            custom: {
                fixed: null
            },
            baseList: [],
        };
        this.modifiersValueTree = {};
        if (this.dish && this.dish.modifiers) {
            for (let modifier of this.dish.modifiers) {
                let modifierType = null;
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
                    && modifier.childModifiers.find(m => m.dish)) {
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
                        for (let childModifier of modifier.childModifiers) {
                            // Indexing
                            this.modifiers.indexById[childModifier.modifierId] = childModifier;
                            // Init default value
                            this.modifiersValueTree[modifier.modifierId][childModifier.modifierId] = childModifier.defaultAmount;
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
            this.calculateTotalPrice();
        }
    }
    calculateTotalAmountInGroup(groupId) {
        if (groupId == 'single')
            return;
        this.modifiers.indexById[groupId].totalAmount = Object
            .values(this.modifiersValueTree[groupId])
            .reduce((a, b) => a + b);
        return this.modifiers.indexById[groupId].totalAmount;
    }
    checkImagesInModifier(modifierId) {
        const m = this.modifiers.indexById[modifierId];
        this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length;
        this.modifiers.indexById[modifierId].childImagesIsset = !!Object
            .values(this.modifiersValueTree[modifierId])
            .find((m) => m && m.dish && m.dish.images && m.dish.images.length);
    }
    calculateTotalPrice() {
        let totalPrice = this.dish.price || 0;
        for (let groupId in this.modifiersValueTree) {
            for (let modifierId in this.modifiersValueTree[groupId]) {
                const amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    const modifier = this.modifiers.indexById[modifierId];
                    if (modifier && modifier.dish && modifier.dish.price) {
                        totalPrice += modifier.dish.price * amount;
                    }
                }
            }
        }
        this.totalPrice = totalPrice;
        this.setModifiers();
    }
    getModifiersIds(modifier) {
        return {
            groupId: (modifier.dish && modifier.dish.groupId) ? modifier.dish.groupId : undefined,
            modifierId: modifier.modifierId
        };
    }
    changeModifierAmount(modifier, amount, operation) {
        if (amount < 0)
            return;
        const { groupId = 'single', modifierId } = this.getModifiersIds(modifier);
        const { minAmount, maxAmount } = modifier;
        const { minAmount: groupMinAmount = 0, maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
        const previousAmount = this.modifiersValueTree[groupId][modifierId];
        // For checkbox
        if (operation == 'checkbox' && groupId !== 'single') {
            // If it work like radio button
            if (groupMinAmount <= 1 && groupMaxAmount == 1) {
                if (amount < groupMinAmount) {
                    return;
                }
                // Set zero amount for all options
                for (let itemModifierId in this.modifiersValueTree[groupId]) {
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
            const groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
            if (groupAmount < groupMinAmount) {
                console.warn(`Limit: min ${groupMinAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не менее ${groupMinAmount}`));
                return;
            }
            if (groupAmount > groupMaxAmount) {
                console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`));
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
    }
    setModifiers() {
        const modifiersToSet = [];
        for (let groupId in this.modifiersValueTree) {
            for (let modifierId in this.modifiersValueTree[groupId]) {
                const amount = this.modifiersValueTree[groupId][modifierId];
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
    }
    checkValid() {
        let isValid = true;
        for (let groupId in this.modifiersValueTree) {
            const groupModifier = this.modifiers.indexById[groupId];
            if (groupModifier.required) {
                const totalAmountInGroup = this.calculateTotalAmountInGroup(groupId);
                if (totalAmountInGroup < groupModifier.minAmount) {
                    isValid = false;
                    console.warn(`Modifier ${groupId} min amount: ${groupModifier.minAmount}`);
                }
                if (totalAmountInGroup > groupModifier.maxAmount) {
                    isValid = false;
                    console.warn(`Modifier ${groupId} max amount: ${groupModifier.maxAmount}`);
                }
            }
            //for(let modifierId in this.modifiersValueTree[groupId]) {
            //
            //}
        }
        this.validate.emit(isValid);
    }
}
DishCalcComponent.ɵfac = function DishCalcComponent_Factory(t) { return new (t || DishCalcComponent)(ɵɵdirectiveInject(NgRestoCartService), ɵɵdirectiveInject(EventerService), ɵɵdirectiveInject('ImageUrl')); };
DishCalcComponent.ɵcmp = ɵɵdefineComponent({ type: DishCalcComponent, selectors: [["dish-calc"]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" }, features: [ɵɵNgOnChangesFeature], decls: 9, vars: 1, consts: [["class", "ng-cart-dish-calc", 4, "ngIf"], ["dishImageTemplate", ""], ["modifierTemplate", ""], ["modifierCounterTemplate", ""], ["modifierCheckboxTemplate", ""], [1, "ng-cart-dish-calc"], [1, "dish"], [1, "dish-image-box"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "dish-description-box"], [1, "dish-name"], [1, "dish-ingredients"], [1, "dish-price-box"], [4, "ngIf", "ngIfElse"], ["modifierFixedTemplate", ""], ["class", "modifiers", 4, "ngIf"], [1, "result"], [1, "text"], [1, "price"], [1, "price", 3, "ngClass"], [4, "ngIf"], [1, "modifier-fixed"], [4, "ngFor", "ngForOf"], [1, "item", 3, "ngClass", "click"], [1, "modifiers"], [1, "modifier-group"], ["class", "modifier-header", 4, "ngIf"], [1, "modifier-header"], ["class", "modifier-name", 4, "ngIf"], ["class", "modifier-description", 4, "ngIf"], [1, "modifier-name"], [1, "modifier-description"], [1, "modifier-box", 3, "ngClass"], [1, "modifier-children", 3, "ngClass"], ["imgPlaceholder", ""], [1, "dish-image"], [1, "dish-image-placeholder"], [1, "modifier-dish"], [1, "modifier-dish-image-box"], [1, "modifier-dish-description-box"], [1, "modifier-dish-name"], [1, "modifier-dish-weight"], [1, "modifier-dish-price-box"], [3, "ngClass"], [1, "modifier-dish-action-box"], ["counterTemplate", ""], [1, "modifier-counter", 3, "ngClass"], ["onselectstart", "return false;", 1, "minus", 3, "ngClass", "click"], ["readonly", "", 3, "value"], ["input", ""], ["onselectstart", "return false;", 1, "plus", 3, "ngClass", "click"], [1, "modifier-checkbox", 3, "ngClass", "click"]], template: function DishCalcComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵtemplate(0, DishCalcComponent_div_0_Template, 21, 10, "div", 0);
        ɵɵtemplate(1, DishCalcComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, ɵɵtemplateRefExtractor);
        ɵɵtemplate(3, DishCalcComponent_ng_template_3_Template, 1, 1, "ng-template", null, 2, ɵɵtemplateRefExtractor);
        ɵɵtemplate(5, DishCalcComponent_ng_template_5_Template, 8, 10, "ng-template", null, 3, ɵɵtemplateRefExtractor);
        ɵɵtemplate(7, DishCalcComponent_ng_template_7_Template, 2, 3, "ng-template", null, 4, ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        ɵɵproperty("ngIf", ctx.dish);
    } }, directives: [NgIf, NgTemplateOutlet, NgClass, NgForOf], styles: [".dish[_ngcontent-%COMP%]{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish[_ngcontent-%COMP%]   .dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-ingredients[_ngcontent-%COMP%]{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-price-box[_ngcontent-%COMP%]{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.dish-image[_ngcontent-%COMP%]{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result[_ngcontent-%COMP%]{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{margin-left:76px}.modifiers[_ngcontent-%COMP%]   .modifier-group[_ngcontent-%COMP%]{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]{margin-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-description[_ngcontent-%COMP%]{color:#0a0909;font-size:15px;line-height:17px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-weight[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]   .zero-price[_ngcontent-%COMP%]{display:none}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-action-box[_ngcontent-%COMP%]{display:flex;justify-content:center;width:151px}.modifier-fixed[_ngcontent-%COMP%]{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:first-child{margin-left:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:last-child{margin-right:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item.selected[_ngcontent-%COMP%]{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:not(.selected){cursor:pointer}.modifier-checkbox[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected[_ngcontent-%COMP%]:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled[_ngcontent-%COMP%]{opacity:.3}.modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .minus.disabled[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .plus.disabled[_ngcontent-%COMP%]{cursor:default;opacity:.15}.modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:hover, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:hover{color:#000}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:active, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:active{color:#cc0009}.modifier-counter[_ngcontent-%COMP%]   .minus.loading[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus.loading[_ngcontent-%COMP%]{opacity:.2}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{left:0}.modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{right:0}.without-images[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{height:70px!important}.without-images[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{height:70px}"] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(DishCalcComponent, [{
        type: Component,
        args: [{
                selector: 'dish-calc',
                templateUrl: './dish-calc.component.html',
                styleUrls: ['./dish-calc.component.scss']
            }]
    }], function () { return [{ type: NgRestoCartService }, { type: EventerService }, { type: undefined, decorators: [{
                type: Inject,
                args: ['ImageUrl']
            }] }]; }, { dish: [{
            type: Input
        }], amount: [{
            type: Input
        }], selectedModifiers: [{
            type: Input
        }], validate: [{
            type: Output
        }], amountDishToAdd: [{
            type: Output
        }] }); })();

const DIRECTIVES = [
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
const COMPONENTS = [
    DishCalcComponent
];
const MODULES = [
    CommonModule
];
class NgRestoCartModule {
}
NgRestoCartModule.ɵmod = ɵɵdefineNgModule({ type: NgRestoCartModule });
NgRestoCartModule.ɵinj = ɵɵdefineInjector({ factory: function NgRestoCartModule_Factory(t) { return new (t || NgRestoCartModule)(); }, providers: [], imports: [[MODULES]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgRestoCartModule, { declarations: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective, DishCalcComponent], imports: [CommonModule], exports: [AddDishToCartDirective,
        AmountCartDirective,
        DeleteFromCartDirective,
        OrderCartUserDirective,
        //ModifiresDirective,
        DishCalcDirective,
        SetDishCommentDirective,
        SetAmountDirective,
        CheckoutDirective, DishCalcComponent] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgRestoCartModule, [{
        type: NgModule,
        args: [{
                imports: [MODULES],
                providers: [],
                declarations: [DIRECTIVES, COMPONENTS],
                exports: [DIRECTIVES, COMPONENTS]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-cart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AddDishToCartDirective, AmountCartDirective, CheckoutDirective, DeleteFromCartDirective, DishCalcComponent, DishCalcDirective, ModifiresDirective, NgRestoCartModule, NgRestoCartService, OrderCartUserDirective, SetAmountDirective, SetDishCommentDirective };
//# sourceMappingURL=webresto-ng-cart.js.map
