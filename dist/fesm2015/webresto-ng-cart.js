import { ɵɵdefineInjectable, ɵɵinject, Injectable, EventEmitter, Directive, Input, Output, HostListener, Renderer2, ElementRef, Component, Inject, NgModule } from '@angular/core';
import { BehaviorSubject, from, throwError } from 'rxjs';
import { switchMap, catchError, tap, filter, map, debounceTime } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import { CommonModule } from '@angular/common';

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
        this.cartID = cartID;
    }
    removeCartId() {
        localStorage.removeItem('cartID');
        this.cartID = null;
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
    getPickupPoints(cartId) {
        return this.net.get('/pickupaddreses', true, {
            params: {
                cartId
            }
        });
    }
    getPaymentMethods(cartId) {
        return this.net.get('/paymentmethods', true, {
            params: {
                cartId
            }
        });
    }
}
NgRestoCartService.ɵprov = ɵɵdefineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(ɵɵinject(NetService), ɵɵinject(EventerService)); }, token: NgRestoCartService, providedIn: "root" });
NgRestoCartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgRestoCartService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];

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
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAddToCart]'
            },] }
];
AddDishToCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
AddDishToCartDirective.propDecorators = {
    modifires: [{ type: Input }],
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    comment: [{ type: Input }],
    loading: [{ type: Output }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

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
AmountCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAmountCart]'
            },] }
];
AmountCartDirective.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: Renderer2 },
    { type: ElementRef }
];

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
CheckoutDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstCheckout]'
            },] }
];
CheckoutDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
CheckoutDirective.propDecorators = {
    cartTotal: [{ type: Input }],
    bonuses: [{ type: Input }],
    name: [{ type: Input }],
    email: [{ type: Input }],
    phone: [{ type: Input }],
    delivery: [{ type: Input }],
    selfService: [{ type: Input }],
    locationId: [{ type: Input }],
    street: [{ type: Input }],
    streetId: [{ type: Input }],
    home: [{ type: Input }],
    housing: [{ type: Input }],
    apartment: [{ type: Input }],
    entrance: [{ type: Input }],
    doorphone: [{ type: Input }],
    floor: [{ type: Input }],
    paymentMethod: [{ type: Input }],
    paymentMethodId: [{ type: Input }],
    personsCount: [{ type: Input }],
    comment: [{ type: Input }],
    date: [{ type: Input }],
    notifyMethodId: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    isChecking: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

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
DeleteFromCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstDeleteFromCart]'
            },] }
];
DeleteFromCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
DeleteFromCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

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
DishCalcDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstDishCalc]'
            },] }
];
DishCalcDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgRestoCartService }
];
DishCalcDirective.propDecorators = {
    dish: [{ type: Input }],
    amount: [{ type: Input }],
    selectedModifiers: [{ type: Input }],
    validate: [{ type: Output }],
    amountDishToAdd: [{ type: Output }]
};

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
ModifiresDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstModifires]'
            },] }
];
ModifiresDirective.ctorParameters = () => [
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgRestoCartService }
];
ModifiresDirective.propDecorators = {
    modifires: [{ type: Input }]
};

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
OrderCartUserDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstOrderCart]'
            },] }
];
OrderCartUserDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
OrderCartUserDirective.propDecorators = {
    orderCart: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

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
SetAmountDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSetDishAmount]'
            },] }
];
SetAmountDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
SetAmountDirective.propDecorators = {
    action: [{ type: Input }],
    dish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

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
SetDishCommentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSetDishComment]'
            },] }
];
SetDishCommentDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
SetDishCommentDirective.propDecorators = {
    comment: [{ type: Input }],
    dish: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};

class DishCalcComponent {
    constructor(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.comment = new EventEmitter();
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
        console.log(`this.modifiers.indexById`, this.modifiers.indexById);
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
        this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length ? true : false;
        this.modifiers.indexById[modifierId].childImagesIsset = !!this.modifiers.indexById[modifierId]
            .childModifiers
            .find((m) => m && m.dish && m.dish.images && m.dish.images.length ? true : false);
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
    selectTwoPartsAssembledModifier(modifier) {
        const { groupId = 'single', modifierId } = this.getModifiersIds(modifier);
        const { minAmount, maxAmount } = modifier;
        const { minAmount: groupMinAmount = 0, maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
        const previousAmount = this.modifiersValueTree[groupId][modifierId];
        const amount = previousAmount ? 0 : 1;
        // Init tmp value storage if not exists
        if (!this.twoPartsAssembledModifiersIdsByGroupId[groupId]) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
        }
        // Total amount in group
        const groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
        if (groupAmount > groupMaxAmount) {
            if (this.twoPartsAssembledModifiersIdsByGroupId[groupId].length) {
                for (let mId in this.modifiersValueTree[groupId]) {
                    this.modifiersValueTree[groupId][mId] = 0;
                }
                this.twoPartsAssembledModifiersIdsByGroupId[groupId] = this.twoPartsAssembledModifiersIdsByGroupId[groupId].slice(1, 2);
                this.modifiersValueTree[groupId][this.twoPartsAssembledModifiersIdsByGroupId[groupId][0]] = 1;
            }
            else {
                console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`));
                return;
            }
        }
        else if (groupAmount === 0) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
        }
        if (amount && !this.twoPartsAssembledModifiersIdsByGroupId[groupId].find(v => v == modifierId)) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId].push(modifierId);
        }
        this.modifiersValueTree[groupId][modifierId] = amount;
        this.calculateTotalAmountInGroup(groupId);
        this.calculateTotalPrice();
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
DishCalcComponent.decorators = [
    { type: Component, args: [{
                selector: 'rst-dish-calc',
                template: "<div *ngIf=\"dish\" class=\"ng-cart-dish-calc\" [ngClass]=\"{'ng-cart-dish-calc-two-parts-assembled': isTwoPartsAssembledTemplate}\">\r\n    <div class=\"dish\">\r\n        <div class=\"dish-image-box\">\r\n            <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n        </div>\r\n        <div class=\"dish-description-box\">\r\n            <div class=\"dish-name\">{{ dish.name }}</div>\r\n            <div class=\"dish-ingredients\">{{ dish.description }}</div>\r\n            <div class=\"dish-price-box\">\r\n                <ng-container *ngIf=\"!modifiers.custom.fixed; else modifierFixedTemplate\">\r\n                    <div class=\"price\" [ngClass]=\"{'zero-price': !dish.price}\">\r\n                        <span>{{ dish.price }}</span> \u20BD\r\n                    </div>\r\n                </ng-container>\r\n                <ng-template #modifierFixedTemplate>\r\n                    <ng-container *ngIf=\"modifiers.custom.fixed as modifier\">\r\n                        <div class=\"modifier-fixed\">\r\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                <div class=\"item\"\r\n                                     [ngClass]=\"{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\r\n                                     (click)=\"changeModifierAmount(childModifier, 1, 'checkbox')\">\r\n                                    {{ childModifier.dish?.name }}\r\n                                </div>\r\n                            </ng-container>\r\n                        </div>\r\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                            <ng-container *ngIf=\"!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\r\n                                <div class=\"price\" [ngClass]=\"{'zero-price': !childModifier.dish?.price}\">\r\n                                    <span>{{ childModifier.dish?.price }}</span> \u20BD\r\n                                </div>\r\n                            </ng-container>\r\n                        </ng-container>\r\n                    </ng-container>\r\n                </ng-template>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"modifiers\" *ngIf=\"modifiers.baseList?.length\">\r\n        <ng-container *ngFor=\"let modifier of modifiers.baseList\">\r\n            <div class=\"modifier-group\">\r\n                <ng-container *ngIf=\"modifier.dish\">\r\n                    <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\r\n                        <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\r\n                        <div class=\"modifier-description\" *ngIf=\"group.description\">{{ group.description }}</div>\r\n                    </div>\r\n\r\n                    <div class=\"modifier-box\" [ngClass]=\"{'without-images': !modifier.childImagesIsset}\">\r\n                        <!-- Single modifier -->\r\n                        <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\r\n                            modifier: modifier,\r\n                            groupId: 'single',\r\n                            amount: modifiersValueTree['single'][modifier.modifierId],\r\n                            groupAmount: modifiersValueTree['single'][modifier.modifierId],\r\n                            groupMinAmount: modifier.minAmount || 0,\r\n                            groupMaxAmount: modifier.maxAmount || 100\r\n                        }\"></ng-container>\r\n                    </div>\r\n                </ng-container>\r\n\r\n                <ng-container *ngIf=\"modifier.childModifiers?.length\">\r\n                    <ng-container *ngIf=\"modifier.minAmount == 2 && modifier.maxAmount == 2; then twoPartsAssembledTemplate else groupTemplate\">\r\n                    </ng-container>\r\n\r\n                    <!-- Base group modifier view -->\r\n                    <ng-template #groupTemplate>\r\n                        <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\r\n                            <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\r\n                            <div class=\"modifier-description\" *ngIf=\"group.description\">{{ group.description }}</div>\r\n                        </div>\r\n                        <div class=\"modifier-children\" [ngClass]=\"{'without-images': !modifier.imagesIsset}\">\r\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                <!-- Group modifier -->\r\n                                <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\r\n                            modifier: childModifier,\r\n                            groupId: modifier.modifierId,\r\n                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],\r\n                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,\r\n                            groupMinAmount: modifier.minAmount || 0,\r\n                            groupMaxAmount: modifier.maxAmount || 100\r\n                        }\"></ng-container>\r\n\r\n                            </ng-container>\r\n                        </div>\r\n                    </ng-template>\r\n\r\n                    <!-- Two parts assembled group modifier view (like pizza from two halves) -->\r\n                    <ng-template #twoPartsAssembledTemplate>\r\n                        <div class=\"two-parts-assembled\">\r\n                            <div class=\"two-parts-assembled-header\" [ngClass]=\"{empty: !twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId]?.length}\">\r\n                                <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                    <ng-container *ngIf=\"modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\r\n                                        <ng-container *ngIf=\"childModifier.dish as dish\">\r\n                                            <div class=\"selected-dish\">\r\n                                                <div class=\"title\">{{ dish.name }}</div>\r\n                                                <div class=\"image-box\">\r\n                                                    <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n                                                </div>\r\n                                            </div>\r\n                                        </ng-container>\r\n                                        <ng-container *ngIf=\"modifiers.indexById[modifier.modifierId].totalAmount == 1\">\r\n                                            <div class=\"selected-dish\">\r\n                                                <div class=\"title\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0443</div>\r\n                                                <div class=\"image-box\">\r\n                                                    <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: {} }\"></ng-container>\r\n                                                </div>\r\n                                            </div>\r\n                                        </ng-container>\r\n                                    </ng-container>\r\n                                </ng-container>\r\n                            </div>\r\n\r\n                            <div class=\"two-parts-assembled-body\">\r\n                                <div class=\"two-parts-assembled-body-name\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u044B\u0435 \u0434\u0432\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u043A\u0438</div>\r\n                                <div class=\"two-parts-assembled-body-list\">\r\n                                    <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\r\n                                        <div class=\"two-parts-assembled-body-list-dish\"\r\n                                             (click)=\"selectTwoPartsAssembledModifier(childModifier)\"\r\n                                             [ngClass]=\"{selected: modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\r\n                                             *ngIf=\"childModifier.dish as dish\">\r\n                                            <div class=\"image-box\">\r\n                                                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n                                            </div>\r\n                                            <div class=\"dish-name\">\r\n                                                {{ dish.name }}\r\n                                            </div>\r\n                                            <div class=\"dish-price\">\r\n                                                <div [ngClass]=\"{'zero-price': !dish.price}\">\r\n                                                    <span>{{ dish.price }}</span> \u20BD\r\n                                                </div>\r\n                                            </div>\r\n                                        </div>\r\n                                    </ng-container>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </ng-template>\r\n\r\n\r\n                </ng-container>\r\n\r\n            </div>\r\n        </ng-container>\r\n    </div>\r\n    <div class=\"result\">\r\n        <span class=\"text\">\u0418\u0422\u041E\u0413\u041E:</span>\r\n        <span class=\"price\">\r\n            <span>{{ totalPrice}}</span> \u20BD\r\n        </span>\r\n    </div>\r\n    <div class=\"comment\" *ngIf=\"isTwoPartsAssembledTemplate\">\r\n        <div class=\"title\">\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439</div>\r\n        <div class=\"input-box\">\r\n            <input #commentInput type=\"text\" placeholder=\"\" (keyup)=\"comment.emit(commentInput.value)\">\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!-- Template block #dishImageTemplate -->\r\n\r\n<ng-template #dishImageTemplate let-dish=\"dish\">\r\n    <ng-container *ngIf=\"dish?.images && dish.images[0]?.images?.small; else imgPlaceholder\">\r\n        <div class=\"dish-image\" [style.backgroundImage]=\"'url(' + imageUrl + dish.images[0].images.small + ')'\"></div>\r\n    </ng-container>\r\n    <ng-template #imgPlaceholder>\r\n        <div class=\"dish-image-placeholder\"></div>\r\n    </ng-template>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierTemplate -->\r\n\r\n<ng-template #modifierTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\"\r\n             let-groupAmount=\"groupAmount\"\r\n             let-groupMinAmount=\"groupMinAmount\"\r\n             let-groupMaxAmount=\"groupMaxAmount\">\r\n    <ng-container *ngIf=\"modifier.dish as dish\">\r\n        <div class=\"modifier-dish\">\r\n            <div class=\"modifier-dish-image-box\">\r\n                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\r\n            </div>\r\n            <div class=\"modifier-dish-description-box\">\r\n                <div class=\"modifier-dish-name\">{{ dish.name }}</div>\r\n                <div class=\"modifier-dish-weight\" *ngIf=\"dish.weight\">{{ dish.weight * 1000 }} \u0433\u0440</div>\r\n            </div>\r\n            <div class=\"modifier-dish-price-box\">\r\n                <div [ngClass]=\"{'zero-price': !dish.price}\">\r\n                    <span>{{ dish.price }}</span> \u20BD\r\n                </div>\r\n            </div>\r\n            <div class=\"modifier-dish-action-box\">\r\n                <ng-container *ngIf=\"groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate\">\r\n                    <ng-container *ngTemplateOutlet=\"modifierCheckboxTemplate; context: {\r\n                        modifier: modifier,\r\n                        groupId: groupId,\r\n                        amount: amount\r\n                    }\"></ng-container>\r\n                </ng-container>\r\n\r\n                <ng-template #counterTemplate>\r\n                    <ng-container *ngTemplateOutlet=\"modifierCounterTemplate; context: {\r\n                        modifier: modifier,\r\n                        groupId: groupId,\r\n                        amount: amount,\r\n                        groupAmount: groupAmount,\r\n                        groupMinAmount: groupMinAmount,\r\n                        groupMaxAmount: groupMaxAmount\r\n                    }\"></ng-container>\r\n                </ng-template>\r\n\r\n            </div>\r\n        </div>\r\n    </ng-container>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierCounterTemplate -->\r\n\r\n<ng-template #modifierCounterTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\"\r\n             let-groupAmount=\"groupAmount\"\r\n             let-groupMinAmount=\"groupMinAmount\"\r\n             let-groupMaxAmount=\"groupMaxAmount\">\r\n    <ng-container>\r\n        <div class=\"modifier-counter\" [ngClass]=\"{disabled: !amount && groupAmount >= groupMaxAmount}\">\r\n            <div\r\n                    class=\"minus\"\r\n                    [ngClass]=\"{disabled: !amount || groupAmount <= groupMinAmount}\"\r\n                    (click)=\"changeModifierAmount(modifier, amount - 1, 'minus')\"\r\n                    onselectstart=\"return false;\">-</div>\r\n            <input [value]=\"amount\" readonly #input>\r\n            <div\r\n                    class=\"plus\"\r\n                    [ngClass]=\"{disabled: groupAmount >= groupMaxAmount}\"\r\n                    (click)=\"changeModifierAmount(modifier, amount + 1, 'plus')\"\r\n                    onselectstart=\"return false;\">+</div>\r\n        </div>\r\n    </ng-container>\r\n</ng-template>\r\n\r\n<!-- Template block #modifierCheckboxTemplate -->\r\n\r\n<ng-template #modifierCheckboxTemplate\r\n             let-modifier=\"modifier\"\r\n             let-groupId=\"groupId\"\r\n             let-amount=\"amount\">\r\n    <ng-container>\r\n        <div\r\n                class=\"modifier-checkbox\"\r\n                [ngClass]=\"{selected: amount}\"\r\n                (click)=\"changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')\"></div>\r\n    </ng-container>\r\n</ng-template>\r\n",
                styles: [".dish{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish .dish-image-box{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish .dish-description-box{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish .dish-description-box .dish-name{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish .dish-description-box .dish-ingredients{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish .dish-description-box .dish-price-box{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled .dish{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled .dish .dish-image-box{display:none}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box{height:auto;width:100%}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-name{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px;text-align:center;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-ingredients,.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-price-box{display:none}.dish-image{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result .price{margin-left:76px}.comment{padding-bottom:15px}.comment .title{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;margin:30px 0 20px}.comment .input-box{margin-top:10px}.comment .input-box input{border:2px solid #969696;border-radius:15px;box-sizing:border-box;color:#969696;font-size:20px;font-style:italic;font-weight:400;height:45px;line-height:45px;padding:0 20px}.modifiers .modifier-group{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers .modifier-header .modifier-description{color:#0a0909;font-size:15px;line-height:17px}.modifiers .modifier-dish{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers .modifier-dish .modifier-dish-image-box{background-color:#fff;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{background-position:50%;background-size:contain;height:100%;width:100%}.modifiers .modifier-dish .modifier-dish-description-box{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{display:flex;justify-content:center;width:151px}.two-parts-assembled .two-parts-assembled-header{align-items:center;border-bottom:2px solid #969696;display:flex;height:230px;justify-content:center;opacity:1;overflow:hidden;padding-bottom:28px;transition:all .5s ease 0s}.two-parts-assembled .two-parts-assembled-header.empty{border-bottom:none;height:0;opacity:0}.two-parts-assembled .two-parts-assembled-header .selected-dish{align-items:center;display:flex;justify-content:flex-end;width:50%}.two-parts-assembled .two-parts-assembled-header .selected-dish .title{color:#0a0909;font-size:21px;line-height:25px;margin-right:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box{height:200px;overflow:hidden;width:100px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box .dish-image{height:100%;width:200%}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .title{margin-left:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-name{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;padding:20px 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-column-gap:30px;grid-row-gap:24px;grid-template-columns:1fr 1fr 1fr;margin-top:30px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{align-items:center;border:1.5px solid hsla(0,0%,100%,0);box-sizing:border-box;color:#0a0909;cursor:pointer;display:flex;flex-direction:column}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-name{font-size:17px;font-weight:500;letter-spacing:2.4px;line-height:20px;padding:0 5px;text-align:center;text-transform:uppercase}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-price{font-size:20px;font-weight:700;line-height:23px;padding:5px 0 10px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{border-radius:15px 15px 0 0;height:228px;width:228px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{border-radius:15px 15px 0 0;height:100%;width:100%}.modifier-fixed{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed .item{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{cursor:default;opacity:.15}.modifier-counter input{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter .minus,.modifier-counter .plus,.modifier-counter input{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter .minus,.modifier-counter .plus{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}"]
            },] }
];
DishCalcComponent.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: EventerService },
    { type: String, decorators: [{ type: Inject, args: ['ImageUrl',] }] }
];
DishCalcComponent.propDecorators = {
    dish: [{ type: Input }],
    amount: [{ type: Input }],
    selectedModifiers: [{ type: Input }],
    validate: [{ type: Output }],
    amountDishToAdd: [{ type: Output }],
    comment: [{ type: Output }]
};

class NgRestoCartModule {
}
NgRestoCartModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
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

export { AddDishToCartDirective, AmountCartDirective, CheckoutDirective, DeleteFromCartDirective, DishCalcComponent, DishCalcDirective, ModifiresDirective, NgRestoCartModule, NgRestoCartService, OrderCartUserDirective, SetAmountDirective, SetDishCommentDirective };
//# sourceMappingURL=webresto-ng-cart.js.map
