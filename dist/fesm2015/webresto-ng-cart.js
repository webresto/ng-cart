import { Injectable, Directive, Renderer2, ElementRef, HostListener, Input, Output, EventEmitter, NgModule, Component, Inject, defineInjectable, inject } from '@angular/core';
import { BehaviorSubject, throwError, of } from 'rxjs';
import { tap, filter, debounceTime } from 'rxjs/operators';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import { CommonModule } from '@angular/common';

class NgRestoCartService {
    constructor(net, eventer) {
        this.net = net;
        this.eventer = eventer;
        this.OrderFormChange = new BehaviorSubject(null);
        this.cart = new BehaviorSubject({});
        this.modifires = new BehaviorSubject([]);
        this.modifiresMessage = new BehaviorSubject([]);
        this.initialStorage();
        this.modifiresMessage.subscribe(messages => this.messages = messages);
    }
    initialStorage() {
        this.cartID = this.getCartId();
        if (this.cartID) {
            this.net
                .get('/cart?cartId=' + this.cartID)
                .pipe(tap(cart => {
                if (cart.state == 'ORDER') {
                    throwError(new Error('Cart in order state'));
                }
            }))
                .subscribe(cart => this.cart.next(cart.cart), error => this.removeCartId());
        }
    }
    getCartId() {
        return localStorage.getItem('cartID');
    }
    addDishToCart(data) {
        if (this.messages.length) {
            this.messages.forEach(message => {
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
        }, error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
             )*/
        });
    }
    addDishToCart$(data) {
        if (this.messages.length) {
            this.messages.forEach(message => {
                this.eventer.emitMessageEvent(message);
            });
            return of(null);
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
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Изменено количество')
             );*/
        }, error => {
            /*this.eventer.emitMessageEvent(
             new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
             )*/
        });
    }
    setDishComment(dishId, comment) {
        return this.net.post('/cart/setcomment', {
            "dishId": dishId,
            "cartId": this.cartID,
            "comment": comment
        }).pipe(tap(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }, error => {
            this.eventer.emitMessageEvent(new EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий'));
        }));
    }
    removeDishFromCart$(dishId, amount) {
        return this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        })
            .pipe(tap(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
        }));
    }
    removeDishFromCart(dishId, amount) {
        this.net.put('/cart/remove', {
            "dishId": dishId,
            "cartId": this.cartID,
            "amount": amount
        }).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
             );*/
        }, error => {
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
            /*if (result.message) {
             this.eventer.emitMessageEvent(
             new EventMessage(
             result.message.type,
             result.message.title,
             result.message.body
             )
             );
             }*/
        }, error => {
            console.error(error);
            //this.eventer.emitMessageEvent(
            //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
            //)
        }));
    }
    checkStreet(data) {
        this.net.post('/check', data).subscribe(res => {
            this.setCartId(res.cart.cartId);
            this.cart.next(res.cart);
            this.cartID = res.cart.cartId;
            if (res.message) {
                this.eventer.emitMessageEvent(new EventMessage(res.message.type, res.message.title, res.message.body));
            }
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
        if (messages)
            this.modifiresMessage.next(messages);
    }
    getModifires() {
        return this.modifires;
    }
}
NgRestoCartService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgRestoCartService.ctorParameters = () => [
    { type: NetService },
    { type: EventerService }
];
NgRestoCartService.ngInjectableDef = defineInjectable({ factory: function NgRestoCartService_Factory() { return new NgRestoCartService(inject(NetService), inject(EventerService)); }, token: NgRestoCartService, providedIn: "root" });

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
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifires,
            "comment": this.comment,
            "replace": this.replaceCartDishId ? true : undefined,
            "cartDishId": this.replaceCartDishId
        };
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(_ => this.success.emit(true), e => this.error.emit(e), () => {
            this.loading.emit(false);
        });
    }
}
AddDishToCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[addToCart]'
            },] },
];
/** @nocollapse */
AddDishToCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
AddDishToCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    comment: [{ type: Input }],
    replaceCartDishId: [{ type: Input }],
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
                selector: '[amountCart]'
            },] },
];
/** @nocollapse */
AmountCartDirective.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: Renderer2 },
    { type: ElementRef }
];

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
                selector: '[deleteFromCart]'
            },] },
];
/** @nocollapse */
DeleteFromCartDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
DeleteFromCartDirective.propDecorators = {
    dish: [{ type: Input }],
    amountDish: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
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
                selector: '[orderCart]'
            },] },
];
/** @nocollapse */
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
                selector: '[setDishAmount]'
            },] },
];
/** @nocollapse */
SetAmountDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
SetAmountDirective.propDecorators = {
    action: [{ type: Input }],
    dish: [{ type: Input }],
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
                selector: '[dishCalc]'
            },] },
];
/** @nocollapse */
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
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
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
        let paymentMethod = this.paymentMethod || "Не указано";
        let data = {
            "cartId": this.cart.cartId,
            "comment": comment,
            "customer": {
                "phone": this.phone ? this.preparePhone(this.phone) : null,
                "mail": this.email,
                "name": this.name || null
            },
            "personsCount": +this.personsCount
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
            .subscribe(
        //() => this.success.emit(true),
        //error => this.error.emit(error)
        result => this.isChecking.emit(false), error => this.isChecking.emit(false));
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
                selector: '[checkout]'
            },] },
];
/** @nocollapse */
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
                selector: '[setDishComment]'
            },] },
];
/** @nocollapse */
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
        //console.log(`this.modifiers.indexById`, this.modifiers.indexById);
        //console.log(`selectedModifiers`, this.selectedModifiers);
        if (this.selectedModifiers && this.selectedModifiers.length) {
            for (let m of this.selectedModifiers) {
                if (!m.amount)
                    continue;
                try {
                    const groupId = m.groupId || 'single';
                    const groupModifier = this.modifiers.indexById[groupId];
                    const modifier = this.modifiers.indexById[m.id];
                    if (groupModifier && groupModifier.minAmount == 2 && groupModifier.maxAmount == 2) {
                        this.selectTwoPartsAssembledModifier(modifier);
                    }
                    else {
                        this.modifiersValueTree[groupId][m.id] = m.amount;
                        this.calculateTotalAmountInGroup(groupId);
                    }
                }
                catch (e) {
                    console.error(`Invalid modifiers amounts`, e);
                }
            }
        }
        this.calculateTotalPrice();
        this.checkValid();
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
                selector: 'dish-calc',
                template: `<div *ngIf="dish" class="ng-cart-dish-calc" [ngClass]="{'ng-cart-dish-calc-two-parts-assembled': isTwoPartsAssembledTemplate}">
    <div class="dish">
        <div class="dish-image-box">
            <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
        </div>
        <div class="dish-description-box">
            <div class="dish-name">{{ dish.name }}</div>
            <div class="dish-ingredients">{{ dish.description }}</div>
            <div class="dish-price-box">
                <ng-container *ngIf="!modifiers.custom.fixed; else modifierFixedTemplate">
                    <div class="price" [ngClass]="{'zero-price': !dish.price}">
                        <span>{{ dish.price }}</span> ₽
                    </div>
                </ng-container>
                <ng-template #modifierFixedTemplate>
                    <ng-container *ngIf="modifiers.custom.fixed as modifier">
                        <div class="modifier-fixed">
                            <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                <div class="item"
                                     [ngClass]="{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                     (click)="changeModifierAmount(childModifier, 1, 'checkbox')">
                                    {{ childModifier.dish?.name }}
                                </div>
                            </ng-container>
                        </div>
                        <ng-container *ngFor="let childModifier of modifier.childModifiers">
                            <ng-container *ngIf="!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                <div class="price" [ngClass]="{'zero-price': !childModifier.dish?.price}">
                                    <span>{{ childModifier.dish?.price }}</span> ₽
                                </div>
                            </ng-container>
                        </ng-container>
                    </ng-container>
                </ng-template>

            </div>
        </div>
    </div>
    <div class="modifiers" *ngIf="modifiers.baseList?.length">
        <ng-container *ngFor="let modifier of modifiers.baseList">
            <div class="modifier-group">
                <ng-container *ngIf="modifier.dish">
                    <div class="modifier-header" *ngIf="modifier.group as group">
                        <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                        <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                    </div>

                    <div class="modifier-box" [ngClass]="{'without-images': !modifier.childImagesIsset}">
                        <!-- Single modifier -->
                        <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: modifier,
                            groupId: 'single',
                            amount: modifiersValueTree['single'][modifier.modifierId],
                            groupAmount: modifiersValueTree['single'][modifier.modifierId],
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>
                    </div>
                </ng-container>

                <ng-container *ngIf="modifier.childModifiers?.length">
                    <ng-container *ngIf="modifier.minAmount == 2 && modifier.maxAmount == 2; then twoPartsAssembledTemplate else groupTemplate">
                    </ng-container>

                    <!-- Base group modifier view -->
                    <ng-template #groupTemplate>
                        <div class="modifier-header" *ngIf="modifier.group as group">
                            <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                            <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                        </div>
                        <div class="modifier-children" [ngClass]="{'without-images': !modifier.imagesIsset}">
                            <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                <!-- Group modifier -->
                                <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: childModifier,
                            groupId: modifier.modifierId,
                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],
                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>

                            </ng-container>
                        </div>
                    </ng-template>

                    <!-- Two parts assembled group modifier view (like pizza from two halves) -->
                    <ng-template #twoPartsAssembledTemplate>
                        <div class="two-parts-assembled">
                            <div class="two-parts-assembled-header" [ngClass]="{empty: !twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId]?.length}">
                                <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                    <ng-container *ngIf="modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                        <ng-container *ngIf="childModifier.dish as dish">
                                            <div class="selected-dish">
                                                <div class="title">{{ dish.name }}</div>
                                                <div class="image-box">
                                                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                                </div>
                                            </div>
                                        </ng-container>
                                        <ng-container *ngIf="modifiers.indexById[modifier.modifierId].totalAmount == 1">
                                            <div class="selected-dish">
                                                <div class="title">Выберите половину</div>
                                                <div class="image-box">
                                                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: {} }"></ng-container>
                                                </div>
                                            </div>
                                        </ng-container>
                                    </ng-container>
                                </ng-container>
                            </div>

                            <div class="two-parts-assembled-body">
                                <div class="two-parts-assembled-body-name">Выберите любые две половинки</div>
                                <div class="two-parts-assembled-body-list">
                                    <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                        <div class="two-parts-assembled-body-list-dish"
                                             (click)="selectTwoPartsAssembledModifier(childModifier)"
                                             [ngClass]="{selected: modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                             *ngIf="childModifier.dish as dish">
                                            <div class="image-box">
                                                <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                            </div>
                                            <div class="dish-name">
                                                {{ dish.name }}
                                            </div>
                                            <div class="dish-price">
                                                <div [ngClass]="{'zero-price': !dish.price}">
                                                    <span>{{ dish.price }}</span> ₽
                                                </div>
                                            </div>
                                        </div>
                                    </ng-container>
                                </div>
                            </div>
                        </div>
                    </ng-template>


                </ng-container>

            </div>
        </ng-container>
    </div>
    <div class="result">
        <span class="text">ИТОГО:</span>
        <span class="price">
            <span>{{ totalPrice}}</span> ₽
        </span>
    </div>
    <div class="comment" *ngIf="isTwoPartsAssembledTemplate">
        <div class="title">Комментарий</div>
        <div class="input-box">
            <input #commentInput type="text" placeholder="" (keyup)="comment.emit(commentInput.value)">
        </div>
    </div>
</div>



<!-- Template block #dishImageTemplate -->

<ng-template #dishImageTemplate let-dish="dish">
    <ng-container *ngIf="dish?.images && dish.images[0]?.images?.small; else imgPlaceholder">
        <div class="dish-image" [style.backgroundImage]="'url(' + imageUrl + dish.images[0].images.small + ')'"></div>
    </ng-container>
    <ng-template #imgPlaceholder>
        <div class="dish-image-placeholder"></div>
    </ng-template>
</ng-template>

<!-- Template block #modifierTemplate -->

<ng-template #modifierTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container *ngIf="modifier.dish as dish">
        <div class="modifier-dish">
            <div class="modifier-dish-image-box">
                <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
            </div>
            <div class="modifier-dish-description-box">
                <div class="modifier-dish-name">{{ dish.name }}</div>
                <div class="modifier-dish-weight" *ngIf="dish.weight">{{ dish.weight * 1000 }} гр</div>
            </div>
            <div class="modifier-dish-price-box">
                <div [ngClass]="{'zero-price': !dish.price}">
                    <span>{{ dish.price }}</span> ₽
                </div>
            </div>
            <div class="modifier-dish-action-box">
                <ng-container *ngIf="groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate">
                    <ng-container *ngTemplateOutlet="modifierCheckboxTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount
                    }"></ng-container>
                </ng-container>

                <ng-template #counterTemplate>
                    <ng-container *ngTemplateOutlet="modifierCounterTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount,
                        groupAmount: groupAmount,
                        groupMinAmount: groupMinAmount,
                        groupMaxAmount: groupMaxAmount
                    }"></ng-container>
                </ng-template>

            </div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCounterTemplate -->

<ng-template #modifierCounterTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container>
        <div class="modifier-counter" [ngClass]="{disabled: !amount && groupAmount >= groupMaxAmount}">
            <div
                    class="minus"
                    [ngClass]="{disabled: !amount || groupAmount <= groupMinAmount}"
                    (click)="changeModifierAmount(modifier, amount - 1, 'minus')"
                    onselectstart="return false;">-</div>
            <input [value]="amount" readonly #input>
            <div
                    class="plus"
                    [ngClass]="{disabled: groupAmount >= groupMaxAmount}"
                    (click)="changeModifierAmount(modifier, amount + 1, 'plus')"
                    onselectstart="return false;">+</div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCheckboxTemplate -->

<ng-template #modifierCheckboxTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount">
    <ng-container>
        <div
                class="modifier-checkbox"
                [ngClass]="{selected: amount}"
                (click)="changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')"></div>
    </ng-container>
</ng-template>
`,
                styles: [`.dish{display:flex;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:flex;flex-direction:column;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;overflow:hidden;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:flex;align-items:center;justify-content:space-between;height:45px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled .dish{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled .dish .dish-image-box{display:none}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box{width:100%;height:auto}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-name{text-align:center;font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-ingredients,.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-price-box{display:none}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.comment{padding-bottom:15px}.comment .title{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;margin:30px 0 20px}.comment .input-box{margin-top:10px}.comment .input-box input{border:2px solid #969696;box-sizing:border-box;border-radius:15px;height:45px;line-height:45px;font-style:italic;font-weight:400;font-size:20px;color:#969696;padding:0 20px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:flex;justify-content:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#fff;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{width:100%;height:100%;background-size:contain;background-position:center}.modifiers .modifier-dish .modifier-dish-description-box{flex-grow:1;display:flex;flex-direction:column;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:flex;justify-content:center}.two-parts-assembled .two-parts-assembled-header{display:flex;align-items:center;justify-content:center;padding-bottom:28px;opacity:1;border-bottom:2px solid #969696;height:230px;overflow:hidden;transition:.5s}.two-parts-assembled .two-parts-assembled-header.empty{border-bottom:none;height:0;opacity:0}.two-parts-assembled .two-parts-assembled-header .selected-dish{display:flex;align-items:center;justify-content:flex-end;width:50%}.two-parts-assembled .two-parts-assembled-header .selected-dish .title{font-size:21px;line-height:25px;color:#0a0909;margin-right:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box{width:100px;height:200px;overflow:hidden}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box .dish-image{width:200%;height:100%}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .title{margin-left:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;padding:20px 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:30px;grid-column-gap:30px;grid-row-gap:24px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{display:flex;flex-direction:column;align-items:center;box-sizing:border-box;cursor:pointer;color:#0a0909;border:1.5px solid rgba(255,255,255,0)}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-name{font-weight:500;font-size:17px;line-height:20px;letter-spacing:2.4px;text-transform:uppercase;text-align:center;padding:0 5px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-price{font-weight:700;font-size:20px;line-height:23px;padding:5px 0 10px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{width:228px;height:228px;border-radius:15px 15px 0 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{width:100%;height:100%;border-radius:15px 15px 0 0}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:flex;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:flex;align-items:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;justify-content:center;align-items:center}.modifier-checkbox.selected:after{content:url("data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")}.modifier-counter{display:flex;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}`]
            },] },
];
/** @nocollapse */
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

class DishCalcLnComponent {
    constructor(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.comment = new EventEmitter();
        this.totalPriceChange = new EventEmitter();
        this.worningMessageChange = new EventEmitter();
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
        //console.log(`this.modifiers.indexById`, this.modifiers.indexById);
        //console.log(`selectedModifiers`, this.selectedModifiers);
        if (this.selectedModifiers && this.selectedModifiers.length) {
            for (let m of this.selectedModifiers) {
                if (!m.amount)
                    continue;
                try {
                    const groupId = m.groupId || 'single';
                    const groupModifier = this.modifiers.indexById[groupId];
                    const modifier = this.modifiers.indexById[m.id];
                    if (groupModifier && groupModifier.minAmount == 2 && groupModifier.maxAmount == 2) {
                        this.selectTwoPartsAssembledModifier(modifier);
                    }
                    else {
                        this.modifiersValueTree[groupId][m.id] = m.amount;
                        this.calculateTotalAmountInGroup(groupId);
                    }
                }
                catch (e) {
                    console.error(`Invalid modifiers amounts`, e);
                }
            }
        }
        this.calculateTotalPrice();
        this.checkValid();
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
        this.totalPriceChange.emit(totalPrice);
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
DishCalcLnComponent.decorators = [
    { type: Component, args: [{
                selector: 'dish-calc-ln',
                template: `<div *ngIf="dish" class="ng-cart-dish-calc" [ngClass]="{'ng-cart-dish-calc-two-parts-assembled': isTwoPartsAssembledTemplate}">
    <div class="title-box">{{ dish.name }}</div>
    <div class="view-box">

        <ng-container *ngIf="isTwoPartsAssembledTemplate; then twoPartsAssembledHeaderTemplate else baseHeaderTemplate"></ng-container>
        <ng-template #baseHeaderTemplate>
            <div class="dish">
                <div class="dish-image-box">
                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                </div>
                <div class="dish-description-box">
                    <div class="dish-ingredients">{{ dish.description }}</div>
                    <div class="dish-price-box">
                        <ng-container *ngIf="modifiers.custom.fixed as modifier">
                            <div class="modifier-fixed">
                                <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                    <div class="item"
                                         [ngClass]="{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                         (click)="changeModifierAmount(childModifier, 1, 'checkbox')">
                                        {{ childModifier.dish?.name }}
                                    </div>
                                </ng-container>
                            </div>
                            <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                <ng-container *ngIf="!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                    <div class="price" [ngClass]="{'zero-price': !childModifier.dish?.price}">
                                        <span>{{ childModifier.dish?.price }}</span> ₽
                                    </div>
                                </ng-container>
                            </ng-container>
                        </ng-container>
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template #twoPartsAssembledHeaderTemplate>
            <ng-container *ngFor="let modifier of modifiers.baseList">
                <ng-container *ngIf="modifier.childModifiers?.length && modifier.minAmount == 2 && modifier.maxAmount == 2">
                    <div class="two-parts-assembled-header" [ngClass]="{empty: !twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId]?.length}">
                        <ng-container *ngFor="let childModifier of modifier.childModifiers">
                            <ng-container *ngIf="modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                <ng-container *ngIf="childModifier.dish as dish">
                                    <div class="selected-dish">
                                        <!--<div class="title">{{ dish.name }}</div>-->
                                        <div class="image-box">
                                            <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                        </div>
                                    </div>
                                </ng-container>
                                <ng-container *ngIf="modifiers.indexById[modifier.modifierId].totalAmount == 1">
                                    <div class="selected-dish">
                                        <!--<div class="title">Выберите половину</div>-->
                                        <div class="image-box">
                                            <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: {} }"></ng-container>
                                        </div>
                                    </div>
                                </ng-container>
                            </ng-container>
                        </ng-container>
                    </div>
                    <div class="two-parts-assembled-selected-dishes-names" >
                        <!--twoPartsAssembledModifiersIdsByGroupId: {{ twoPartsAssembledModifiersIdsByGroupId | json }}<br>
                        modifier.modifierId: {{ modifier.modifierId }}<br>-->

                        <div class="selected-dish-item">
                            <div class="type-name">Левая:</div>
                            <div class="dish-name" *ngIf="twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId] && twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId][0]; else noDishTemplate">
                                {{ modifiers.indexById[twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId][0]].dish?.name }}
                            </div>
                        </div>
                        <div class="selected-dish-item">
                            <div class="type-name">Правая:</div>
                            <div class="dish-name" *ngIf="twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId] && twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId][1]; else noDishTemplate">
                                {{ modifiers.indexById[twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId][1]].dish?.name }}
                            </div>
                        </div>
                        <ng-template #noDishTemplate>
                            <div class="dish-name empty">Не выбрана</div>
                        </ng-template>
                    </div>
                </ng-container>
            </ng-container>
        </ng-template>

        <div class="comment" *ngIf="isTwoPartsAssembledTemplate">
            <div class="divider"></div>
            <div class="title">Комментарий</div>
            <div class="input-box">
                <input #commentInput type="text" placeholder="" (keyup)="comment.emit(commentInput.value)">
            </div>
        </div>
    </div>


    <div class="settings-box">
        <div class="modifiers" *ngIf="modifiers.baseList?.length">
            <ng-container *ngFor="let modifier of modifiers.baseList">
                <div class="modifier-group">
                    <ng-container *ngIf="modifier.dish">
                        <div class="modifier-header" *ngIf="modifier.group as group">
                            <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                            <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                        </div>

                        <div class="modifier-box" [ngClass]="{'without-images': !modifier.childImagesIsset}">
                            <!-- Single modifier -->
                            <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: modifier,
                            groupId: 'single',
                            amount: modifiersValueTree['single'][modifier.modifierId],
                            groupAmount: modifiersValueTree['single'][modifier.modifierId],
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>
                        </div>
                    </ng-container>

                    <ng-container *ngIf="modifier.childModifiers?.length">
                        <ng-container *ngIf="modifier.minAmount == 2 && modifier.maxAmount == 2; then twoPartsAssembledTemplate else groupTemplate">
                        </ng-container>

                        <!-- Base group modifier view -->
                        <ng-template #groupTemplate>
                            <div class="modifier-header" *ngIf="modifier.group as group">
                                <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                                <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                            </div>
                            <div class="modifier-children" [ngClass]="{'without-images': !modifier.imagesIsset}">
                                <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                    <!-- Group modifier -->
                                    <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: childModifier,
                            groupId: modifier.modifierId,
                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],
                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>

                                </ng-container>
                            </div>
                        </ng-template>

                        <!-- Two parts assembled group modifier view (like pizza from two halves) -->
                        <ng-template #twoPartsAssembledTemplate>
                            <div class="two-parts-assembled">
                                <div class="two-parts-assembled-body">
                                    <div class="two-parts-assembled-body-name">Выберите любые две половинки</div>
                                    <div class="two-parts-assembled-body-list">
                                        <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                            <div class="two-parts-assembled-body-list-dish"
                                                 (click)="selectTwoPartsAssembledModifier(childModifier)"
                                                 [ngClass]="{selected: modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                                 *ngIf="childModifier.dish as dish">
                                                <div class="image-box">
                                                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                                </div>
                                                <div class="dish-name">
                                                    {{ dish.name }}
                                                </div>
                                                <div class="dish-price">
                                                    <div [ngClass]="{'zero-price': !dish.price}">
                                                        <span>{{ dish.price }}</span> ₽
                                                    </div>
                                                </div>
                                            </div>
                                        </ng-container>
                                    </div>
                                </div>
                            </div>
                        </ng-template>


                    </ng-container>

                </div>
            </ng-container>
        </div>
    </div>


    <!--<div class="result-box result">
        <span class="text">ИТОГО:</span>
        <span class="price">
            <span>{{ totalPrice}}</span> ₽
        </span>
    </div>-->


</div>



<!-- Template block #dishImageTemplate -->

<ng-template #dishImageTemplate let-dish="dish">
    <ng-container *ngIf="dish?.images && dish.images[0]?.images?.small; else imgPlaceholder">
        <div class="dish-image" [style.backgroundImage]="'url(' + imageUrl + dish.images[0].images.small + ')'"></div>
    </ng-container>
    <ng-template #imgPlaceholder>
        <div class="dish-image-placeholder"></div>
    </ng-template>
</ng-template>

<!-- Template block #modifierTemplate -->

<ng-template #modifierTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container *ngIf="modifier.dish as dish">
        <div class="modifier-dish">
            <div class="modifier-dish-image-box">
                <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
            </div>
            <div class="modifier-dish-description-box">
                <div class="modifier-dish-name">{{ dish.name }}</div>
                <div class="modifier-dish-weight" *ngIf="dish.weight">{{ dish.weight * 1000 }} гр</div>
            </div>
            <div class="modifier-dish-price-box">
                <div [ngClass]="{'zero-price': !dish.price}">
                    <span>{{ dish.price }}</span> ₽
                </div>
            </div>
            <div class="modifier-dish-action-box">
                <ng-container *ngIf="groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate">
                    <ng-container *ngTemplateOutlet="modifierCheckboxTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount
                    }"></ng-container>
                </ng-container>

                <ng-template #counterTemplate>
                    <ng-container *ngTemplateOutlet="modifierCounterTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount,
                        groupAmount: groupAmount,
                        groupMinAmount: groupMinAmount,
                        groupMaxAmount: groupMaxAmount
                    }"></ng-container>
                </ng-template>

            </div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCounterTemplate -->

<ng-template #modifierCounterTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container>
        <div class="modifier-counter" [ngClass]="{disabled: !amount && groupAmount >= groupMaxAmount}">
            <div
                    class="minus"
                    [ngClass]="{disabled: !amount || groupAmount <= groupMinAmount}"
                    (click)="changeModifierAmount(modifier, amount - 1, 'minus')"
                    onselectstart="return false;">-</div>
            <input [value]="amount" readonly #input>
            <div
                    class="plus"
                    [ngClass]="{disabled: groupAmount >= groupMaxAmount}"
                    (click)="changeModifierAmount(modifier, amount + 1, 'plus')"
                    onselectstart="return false;">+</div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCheckboxTemplate -->

<ng-template #modifierCheckboxTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount">
    <ng-container>
        <div
                class="modifier-checkbox"
                [ngClass]="{selected: amount}"
                (click)="changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')"></div>
    </ng-container>
</ng-template>
`,
                styles: [`@charset "UTF-8";.title-box{font-size:22px;line-height:25px;letter-spacing:2.4px;font-weight:700;color:#0a0909;text-transform:uppercase;position:fixed;width:calc(100% - 200px);margin-top:-70px;margin-left:40px;text-align:center}.view-box{position:fixed;width:300px;min-height:calc(100% - 280px);border-right:1px solid #e9e7e7;box-sizing:border-box;padding-right:20px}.settings-box{padding-left:320px}.dish{display:flex;flex-direction:column;align-items:center}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{height:170px;display:flex;flex-direction:column;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;font-weight:500;line-height:17px;color:#000;margin-top:15px;overflow:hidden;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:flex;align-items:center;justify-content:space-between;height:45px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled .dish{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled .dish .dish-image-box{display:none}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box{width:100%;height:auto}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-name{text-align:center;font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-ingredients,.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-price-box{display:none}.dish-image{width:250px;height:100%;border-radius:5px;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.comment{padding-bottom:15px;border-top:1px solid #e9e7e7;margin-top:30px}.comment .title{font-weight:500;font-size:18px;line-height:20px;color:#0a0909;margin:30px 0 15px}.comment .input-box{margin-top:10px}.comment .input-box input{border:2px solid #969696;box-sizing:border-box;border-radius:10px;height:35px;line-height:35px;font-style:italic;font-weight:400;font-size:16px;color:#969696;padding:0 20px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;padding-bottom:12px;text-align:center;border-bottom:1px solid #000;margin:0 100px}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:flex;justify-content:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:70px;height:70px;box-sizing:border-box;text-align:center;background-color:#fff;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{width:100%;height:100%;background-size:contain;background-position:center}.modifiers .modifier-dish .modifier-dish-description-box{flex-grow:1;display:flex;flex-direction:column;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:16px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:16px;line-height:23px;color:#0a0909;margin-top:0}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:16px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:102px;display:flex;justify-content:flex-end}.two-parts-assembled-header{display:flex;align-items:center;justify-content:center;padding-bottom:28px;opacity:1;height:230px;overflow:hidden;transition:.5s}.two-parts-assembled-header.empty{border-bottom:none;height:0;opacity:0}.two-parts-assembled-header .selected-dish{display:flex;align-items:center;justify-content:flex-end;width:50%}.two-parts-assembled-header .selected-dish .image-box{width:113px;height:226px;overflow:hidden}.two-parts-assembled-header .selected-dish .image-box .dish-image{width:200%;height:100%}.two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled-selected-dishes-names .selected-dish-item{display:flex}.two-parts-assembled-selected-dishes-names .selected-dish-item:first-child{margin-bottom:12px}.two-parts-assembled-selected-dishes-names .selected-dish-item .type-name{width:70px;font-weight:500;font-size:16px;color:#0a0909;content:'Левая:'}.two-parts-assembled-selected-dishes-names .selected-dish-item .type-name:last-child{content:'Правая:'}.two-parts-assembled-selected-dishes-names .selected-dish-item .dish-name{font-size:16px;color:#0a0909}.two-parts-assembled-selected-dishes-names .selected-dish-item .dish-name.empty{font-style:italic;font-weight:400;font-size:16px;color:#969696}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;padding:20px 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:30px;grid-column-gap:30px;grid-row-gap:24px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{display:flex;flex-direction:column;align-items:center;box-sizing:border-box;cursor:pointer;color:#0a0909;border:1.5px solid rgba(255,255,255,0)}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-name{font-weight:500;font-size:12px;line-height:12px;letter-spacing:2.4px;text-transform:uppercase;text-align:center;padding:0 5px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-price{font-weight:700;font-size:12px;line-height:15px;padding:5px 0 10px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{width:168px;height:168px;border-radius:15px 15px 0 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{width:100%;height:100%;border-radius:15px 15px 0 0}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:flex;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:flex;align-items:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;justify-content:center;align-items:center}.modifier-checkbox.selected:after{content:url("data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")}.modifier-counter{display:flex;align-items:center;position:relative;border:none;width:102px;height:35px;border-radius:10px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:35px;line-height:35px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:35px;line-height:35px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 13px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{display:none}.without-images .modifier-dish{height:70px}`]
            },] },
];
/** @nocollapse */
DishCalcLnComponent.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: EventerService },
    { type: String, decorators: [{ type: Inject, args: ['ImageUrl',] }] }
];
DishCalcLnComponent.propDecorators = {
    dish: [{ type: Input }],
    amount: [{ type: Input }],
    selectedModifiers: [{ type: Input }],
    validate: [{ type: Output }],
    amountDishToAdd: [{ type: Output }],
    comment: [{ type: Output }],
    totalPriceChange: [{ type: Output }],
    worningMessageChange: [{ type: Output }]
};

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
    DishCalcComponent,
    DishCalcLnComponent
];
const MODULES = [
    CommonModule
];
class NgRestoCartModule {
}
NgRestoCartModule.decorators = [
    { type: NgModule, args: [{
                imports: [MODULES],
                providers: [],
                declarations: [DIRECTIVES, COMPONENTS],
                exports: [DIRECTIVES, COMPONENTS]
            },] },
];

/*
 * Public API Surface of ng-cart
 */

/**
 * Generated bundle index. Do not edit.
 */

export { DishCalcLnComponent as ɵj, DishCalcComponent as ɵi, AddDishToCartDirective as ɵa, AmountCartDirective as ɵb, CheckoutDirective as ɵh, DeleteFromCartDirective as ɵc, DishCalcDirective as ɵe, OrderCartUserDirective as ɵd, SetAmountDirective as ɵg, SetDishCommentDirective as ɵf, NgRestoCartService, NgRestoCartModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctY2FydC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50LnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvY29tcG9uZW50cy9kaXNoLWNhbGMtbG4vZGlzaC1jYWxjLWxuLmNvbXBvbmVudC50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL25nLWNhcnQubW9kdWxlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9wdWJsaWNfYXBpLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC93ZWJyZXN0by1uZy1jYXJ0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIEJlaGF2aW9yU3ViamVjdCwgdGhyb3dFcnJvciwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRhcCwgY2F0Y2hFcnJvciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgTmV0U2VydmljZSxcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbmltcG9ydCB7IE9yZGVyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9vcmRlcic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nUmVzdG9DYXJ0U2VydmljZSB7XG4gIGNhcnRJRDpzdHJpbmc7XG4gIGNhcnQ6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1vZGlmaXJlczpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgT3JkZXJGb3JtQ2hhbmdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcblxuICBtb2RpZmlyZXNNZXNzYWdlOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBtZXNzYWdlczpFdmVudE1lc3NhZ2VbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5ldDpOZXRTZXJ2aWNlLFxuICAgICAgICAgICAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHt9KTtcbiAgICB0aGlzLm1vZGlmaXJlcyA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuICAgIHRoaXMubW9kaWZpcmVzTWVzc2FnZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoW10pO1xuXG4gICAgdGhpcy5pbml0aWFsU3RvcmFnZSgpO1xuXG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLnN1YnNjcmliZShtZXNzYWdlcyA9PiB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXMpO1xuICB9XG5cbiAgaW5pdGlhbFN0b3JhZ2UoKSB7XG4gICAgdGhpcy5jYXJ0SUQgPSB0aGlzLmdldENhcnRJZCgpO1xuICAgIGlmICh0aGlzLmNhcnRJRCkge1xuICAgICAgdGhpcy5uZXRcbiAgICAgICAgLmdldCgnL2NhcnQ/Y2FydElkPScgKyB0aGlzLmNhcnRJRClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgdGFwKGNhcnQgPT4ge1xuICAgICAgICAgICAgaWYoY2FydC5zdGF0ZSA9PSAnT1JERVInKSB7XG4gICAgICAgICAgICAgIHRocm93RXJyb3IobmV3IEVycm9yKCdDYXJ0IGluIG9yZGVyIHN0YXRlJykpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgIGNhcnQgPT4gdGhpcy5jYXJ0Lm5leHQoY2FydC5jYXJ0KSxcbiAgICAgICAgICBlcnJvciA9PiB0aGlzLnJlbW92ZUNhcnRJZCgpXG4gICAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2FydElkKCk6c3RyaW5nIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NhcnRJRCcpO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L2FkZCcsIGRhdGEpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpHDkMK7w5HCjsOQwrTDkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCu8OQwrXDkMK9w5DCviDDkMKyIMOQwrrDkMK+w5HCgMOQwrfDkMK4w5DCvcORwoMnKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrjDkcKCw5HCjCDDkMKxw5DCu8ORwo7DkMK0w5DCvicpXG4gICAgICAgICApKi9cbiAgICAgIH0pO1xuICB9XG5cbiAgYWRkRGlzaFRvQ2FydCQoZGF0YSkge1xuXG4gICAgaWYgKHRoaXMubWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KG1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gb2YobnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAocmVzPT4ge1xuICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHNldERpc2hDb3VudFRvQ2FydChkaXNoSWQsIGFtb3VudCkge1xuICAgIHRoaXMubmV0LnBvc3QoJy9jYXJ0L3NldCcsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCmMOQwrfDkMK8w5DCtcOQwr3DkMK1w5DCvcOQwr4gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCvicpXG4gICAgICAgICApOyovXG5cblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCuMOQwrfDkMK8w5DCtcOQwr3DkMK4w5HCgsORwowgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCvicpXG4gICAgICAgICApKi9cbiAgICAgIH0pO1xuICB9XG5cbiAgc2V0RGlzaENvbW1lbnQoZGlzaElkLCBjb21tZW50KSB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jYXJ0L3NldGNvbW1lbnQnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50XG4gICAgfSkucGlwZSh0YXAoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK4w5DCt8OQwrzDkMK1w5DCvcOQwrjDkcKCw5HCjCDDkMK6w5DCvsOQwrzDkMK1w5DCvcORwoLDkMKww5HCgMOQwrjDkMK5JylcbiAgICAgICAgKVxuICAgICAgfVxuICAgICkpXG5cbiAgfVxuXG4gIHJlbW92ZURpc2hGcm9tQ2FydCQoZGlzaElkLCBhbW91bnQpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucHV0KCcvY2FydC9yZW1vdmUnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pXG4gICAgICAucGlwZSh0YXAocmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgIH0pKTtcblxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucHV0KCcvY2FydC9yZW1vdmUnLCB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSWQsXG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnRJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudFxuICAgIH0pLnN1YnNjcmliZShcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKRw5DCu8ORwo7DkMK0w5DCviDDkcKDw5HCgcOQwr/DkMK1w5HCiMOQwr3DkMK+IMORwoPDkMK0w5DCsMOQwrvDkMK1w5DCvcOQwr4nKVxuICAgICAgICAgKTsqL1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkcKDw5DCtMOQwrDDkMK7w5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG5cbiAgfVxuXG4gIGNoZWNrb3V0Q2FydChkYXRhKSB7XG4gICAgbGV0IG9yZGVyOk9yZGVyID0ge1xuICAgICAgY2FydElkOiB0aGlzLmNhcnRJRCxcbiAgICAgIGFkZHJlc3M6IHtcbiAgICAgICAgc3RyZWV0SWQ6IGRhdGEuc3RyZWV0LmlkLFxuICAgICAgICBob21lOiBkYXRhLmhvdXNlLFxuICAgICAgICBob3VzaW5nOiBkYXRhLmhvdXNpbmcsXG4gICAgICAgIC8vIGluZGV4OiBcIjEyNzhcIixcbiAgICAgICAgZW50cmFuY2U6IGRhdGEuZW50cmFuY2UsXG4gICAgICAgIGZsb29yOiBkYXRhLmZsb29yLFxuICAgICAgICBhcGFydG1lbnQ6IGRhdGEuYXBhcnRtZW50XG4gICAgICB9LFxuXG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBwaG9uZTogZGF0YS5waG9uZSxcbiAgICAgICAgbmFtZTogZGF0YS5uYW1lLFxuICAgICAgICBtYWlsOiBkYXRhLmVtYWlsIHx8IHVuZGVmaW5lZFxuICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIHRoaXMub3JkZXJDYXJ0KG9yZGVyKTtcblxuICB9XG5cbiAgb3JkZXJDYXJ0KGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL29yZGVyJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKXw5DCsMOQwrrDkMKww5DCtyDDkcKDw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr0nKVxuICAgICAgICAgICAgICk7Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCu8OQwrXDkMK9w5DCuMORwo8hXCIsIGVycm9yKTtcbiAgICAgICAgICAgIGlmIChlcnJvci5lcnJvciAmJiBlcnJvci5lcnJvci5jYXJ0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQoZXJyb3IuZXJyb3IuY2FydCk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydElEID0gZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKmlmIChlcnJvci5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoZXJyb3IubWVzc2FnZS50eXBlLCBlcnJvci5tZXNzYWdlLnRpdGxlLCBlcnJvci5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrjDkcKCw5HCjCDDkMK3w5DCsMOQwrrDkMKww5DCtycpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICk7XG4gIH1cblxuICBjaGVja1N0cmVldFYyKGRhdGEpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMubmV0LnBvc3QoJy9jaGVjaycsIGRhdGEpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKFxuICAgICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldENhcnRJZChyZXN1bHQuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzdWx0LmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXN1bHQuY2FydC5jYXJ0SWQ7XG4gICAgICAgICAgICAvKmlmIChyZXN1bHQubWVzc2FnZSkge1xuICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAgcmVzdWx0Lm1lc3NhZ2UudHlwZSxcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50aXRsZSxcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS5ib2R5XG4gICAgICAgICAgICAgKVxuICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgfSovXG4gICAgICAgICAgfSxcbiAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIC8vdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAvL25ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgIC8vKVxuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KGRhdGEpOnZvaWQge1xuXG4gICAgdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcbiAgICAgICAgaWYgKHJlcy5tZXNzYWdlKSB7XG4gICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKHJlcy5tZXNzYWdlLnR5cGUsIHJlcy5tZXNzYWdlLnRpdGxlLCByZXMubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yLmVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKGVycm9yLmVycm9yLmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KGVycm9yLmVycm9yLmNhcnQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5lcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLmVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLmVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgKTsqL1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICB9XG5cbiAgc2V0Q2FydElkKGNhcnRJRCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdjYXJ0SUQnLCBjYXJ0SUQpO1xuICB9XG4gIHJlbW92ZUNhcnRJZCgpIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnY2FydElEJyk7XG4gIH1cblxuICB1c2VyQ2FydCgpOk9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydDtcbiAgfVxuXG4gIHNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2VzPzpFdmVudE1lc3NhZ2VbXSk6dm9pZCB7XG4gICAgdGhpcy5tb2RpZmlyZXMubmV4dChtb2RpZmlyZXMpO1xuICAgIGlmIChtZXNzYWdlcykgdGhpcy5tb2RpZmlyZXNNZXNzYWdlLm5leHQobWVzc2FnZXMpO1xuICB9XG5cbiAgZ2V0TW9kaWZpcmVzKCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmlyZXM7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FkZFRvQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFkZERpc2hUb0NhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG4gIG1vZGlmaXJlcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuZ2V0TW9kaWZpcmVzKClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMubW9kaWZpcmVzID0gcmVzKTtcblxuICB9XG5cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSByZXBsYWNlQ2FydERpc2hJZDpib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBsb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGlzaFRvQ2FydChkaXNoSUQsIGFtb3VudCkge1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnQsXG4gICAgICBcImNhcnRJZFwiOiB1bmRlZmluZWQsXG4gICAgICBcIm1vZGlmaWVyc1wiOiB0aGlzLm1vZGlmaXJlcyxcbiAgICAgIFwiY29tbWVudFwiOiB0aGlzLmNvbW1lbnQsXG4gICAgICBcInJlcGxhY2VcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZCA/IHRydWUgOiB1bmRlZmluZWQsXG4gICAgICBcImNhcnREaXNoSWRcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jYXJ0LmNhcnRJZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuY2FydElkO1xuXG4gICAgdGhpcy5sb2FkaW5nLmVtaXQodHJ1ZSk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvQ2FydCQoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIF8gPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGUgPT4gdGhpcy5lcnJvci5lbWl0KGUpLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nLmVtaXQoZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYW1vdW50Q2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFtb3VudENhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ6b2JqZWN0O1xuICBhbW91bnQ6c3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmXG4gICkge1xuXG4gICAgdGhpcy5hbW91bnQgPSAnMCc7IFxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHtcbiAgICAgICAgdGhpcy5jYXJ0ID0gcmVzO1xuICAgICAgICB0aGlzLmFtb3VudCA9IHJlcy5kaXNoZXNDb3VudCB8fCAwO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2lubmVySFRNTCcsIHRoaXMuYW1vdW50KTtcbiAgICAgIH0pO1xuICB9XG5cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlICwgSG9zdExpc3RlbmVyLCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkZWxldGVGcm9tQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIHtcblxuICBjYXJ0O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG4gIH1cblxuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBASW5wdXQoKSBhbW91bnREaXNoOmFueTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5yZW1vdmVEaXNoRnJvbUNhcnQodGhpcy5kaXNoLmlkLCB0aGlzLmFtb3VudERpc2gpXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW29yZGVyQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIG9yZGVyQ2FydDphbnk7XG4gIGNhcnQ6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLm9yZGVyKHRoaXMub3JkZXJDYXJ0LnZhbHVlKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPiA9IFtcIm5hbWVcIiwgXCJwaG9uZVwiLCBcInN0cmVldFwiLCBcImhvdXNlXCJdO1xuICBwcml2YXRlIGNoZWNrZXJGaWVsZHM6QmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG4gICAgdGhpcy5jaGVja2VyRmllbGRzID0gbmV3IEJlaGF2aW9yU3ViamVjdCh1bmRlZmluZWQpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6dm9pZCB7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgICAgLnVzZXJDYXJ0KClcbiAgICAgICAgLnN1YnNjcmliZShjYXJ0PT4ge1xuICAgICAgICAgIGlmICh0aGlzLmNhcnQgJiYgdGhpcy5vcmRlckNhcnQudmFsaWQgJiYgdGhpcy5jYXJ0LmNhcnRUb3RhbCAhPSBjYXJ0LmNhcnRUb3RhbCAmJiBjYXJ0LmNhcnRUb3RhbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuY2FydCA9IGNhcnQ7XG4gICAgICAgIH0pO1xuICAgIH0sIDEwMCk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hlY2tlckZpZWxkcy5uZXh0KHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKTtcbiAgICB9LCAxMDApO1xuXG4gICAgdGhpcy5jaGVja2VyRmllbGRzLnN1YnNjcmliZShzdGF0ZSA9PiB7XG4gICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ3N0cmVldCddLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lID0gdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgfHwgXCI3ODg4ODg4ODg4OFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydob3VzZSddLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsaWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgfHwgXCLDkMKdw5DCtcORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcbiAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgIHRoaXMuY2hlY2tTdHJlZXQodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSlcblxuXG4gIH1cblxuXG4gIGNoZWNrRm9yRmllbGRzKGZvcm1EaXJlY3RpdmVzOkFycmF5PGFueT4sIHJlcXVpcmVkRmllbGRzOkFycmF5PHN0cmluZz4pOmJvb2xlYW4ge1xuXG4gICAgbGV0IGZpZWxkc0FyZUF2YWlsYWJsZTpvYmplY3QgPSB7fTtcbiAgICBsZXQgbm9GaWVsZHM6QXJyYXk8c3RyaW5nPiA9IFtdO1xuXG5cbiAgICBmb3JtRGlyZWN0aXZlcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgZmllbGRzQXJlQXZhaWxhYmxlW2VsZW1lbnQubmFtZV0gPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgcmVxdWlyZWRGaWVsZHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIGlmICghZmllbGRzQXJlQXZhaWxhYmxlLmhhc093blByb3BlcnR5KGVsZW1lbnQpKSB7XG4gICAgICAgIG5vRmllbGRzLnB1c2goZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAobm9GaWVsZHMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiw5DCoyDDkcKEw5DCvsORwoDDkMK8w5HCiyDDkMK+w5HCgsORwoHDkcKDw5HCgsORwoHDkMKyw5HCg8ORwo7DkcKCIMORwoHDkMK7w5DCtcOQwrTDkcKDw5HCjsORwonDkMK4w5DCtSDDkMK+w5DCscORwo/DkMK3w5DCsMORwoLDkMK1w5DCu8ORwozDkMK9w5HCi8OQwrUgw5DCtMOQwrvDkcKPIMOQwrrDkMK+w5HCgMORwoDDkMK1w5DCusORwoLDkMK9w5DCvsOQwrkgw5HCgMOQwrDDkMKxw5DCvsORwoLDkcKLIMOQwrzDkMK+w5DCtMORwoPDkMK7w5HCjyDDkMK/w5DCvsOQwrvDkcKPOlwiLCBub0ZpZWxkcylcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBvcmRlcihkYXRhVG9TZW5kKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XG4gICAgICBsZXQgcGF5bWVudDtcbiAgICAgIGxldCBjb21tZW50ID0gZGF0YVRvU2VuZC5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCJcblxuICAgICAgaWYgKGRhdGFUb1NlbmQuY2FzaCkge1xuICAgICAgICBwYXltZW50ID0gXCLDkMKdw5DCsMOQwrvDkMK4w5HCh8OQwr3DkcKLw5DCvMOQwrggw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIGlmIChkYXRhVG9TZW5kLmJhbmtjYXJkKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwpHDkMKww5DCvcOQwrrDkMK+w5DCssORwoHDkMK6w5DCvsOQwrkgw5DCusOQwrDDkcKAw5HCgsOQwr7DkMK5IMOQwrrDkcKDw5HCgMORwozDkMK1w5HCgMORwoNcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0YVRvU2VuZCk7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgICAgLy8gVE9ETzogw5HCgsOQwrjDkMK/IMOQwr7DkMK/w5DCu8OQwrDDkcKCw5HCiyDDkMK9w5DCsMOQwrTDkMK+IMOQwrLDkcKLw5DCvcOQwrXDkcKBw5HCgsOQwrggw5DCsiDDkMK+w5HCgsOQwrTDkMK1w5DCu8ORwozDkMK9w5HCi8OQwrkgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKMLlxuICAgICAgICBcImNvbW1lbnRcIjogXCJcXG4gw5DCosOQwrjDkMK/IMOQwr7DkMK/w5DCu8OQwrDDkcKCw5HCizpcIiArIHBheW1lbnQgKyBcIlxcbsOQwprDkMK+w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrk6XCIgKyBjb21tZW50LFxuICAgICAgICAvLyBcImRlbGl2ZXJ5XCI6IHtcbiAgICAgICAgLy8gICBcInR5cGVcIjogXCJzdHJpbmcgKHNlbGYgb3Igbm90aGluZylcIlxuICAgICAgICAvLyB9LFxuICAgICAgICBcImFkZHJlc3NcIjoge1xuICAgICAgICAgIC8vIFwiY2l0eVwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwic3RyZWV0SWRcIjogZGF0YVRvU2VuZC5zdHJlZXQuaWQsXG4gICAgICAgICAgXCJob21lXCI6IGRhdGFUb1NlbmQuaG91c2UsXG4gICAgICAgICAgXCJob3VzaW5nXCI6IGRhdGFUb1NlbmQuaG91c2luZyxcbiAgICAgICAgICAvLyBcImluZGV4XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJkb29ycGhvbmVcIjogZGF0YVRvU2VuZC5kb29ycGhvbmUsXG4gICAgICAgICAgXCJlbnRyYW5jZVwiOiBkYXRhVG9TZW5kLmVudHJhbmNlLFxuICAgICAgICAgIFwiZmxvb3JcIjogZGF0YVRvU2VuZC5mbG9vcixcbiAgICAgICAgICBcImFwYXJ0bWVudFwiOiBkYXRhVG9TZW5kLmFwYXJ0bWVudFxuICAgICAgICB9LFxuICAgICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgICBcInBob25lXCI6ICcrJyArIGRhdGFUb1NlbmQucGhvbmUsXG4gICAgICAgICAgXCJtYWlsXCI6IGRhdGFUb1NlbmQuZW1haWwsXG4gICAgICAgICAgXCJuYW1lXCI6IGRhdGFUb1NlbmQubmFtZVxuICAgICAgICB9LFxuICAgICAgICBcInBlcnNvbnNDb3VudFwiOiBkYXRhVG9TZW5kLnBlcnNvbnNDb3VudFxuICAgICAgfTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uub3JkZXJDYXJ0KGRhdGEpLnN1YnNjcmliZSgpO1xuICAgIH0gZWxzZSB7XG5cbiAgICB9XG5cblxuICB9XG5cbiAgY2hlY2tTdHJlZXQoZGF0YVRvU2VuZCkge1xuICAgIGNvbnNvbGUubG9nKFwiPj4+PlwiLGRhdGFUb1NlbmQpO1xuICAgIGlmICh0aGlzLmNoZWNrRm9yRmllbGRzKHRoaXMub3JkZXJDYXJ0Ll9kaXJlY3RpdmVzLCB0aGlzLnJlcXVpcmVkRmllbGRzKSkge1xuICAgICAgbGV0IGRhdGEgPSB7XG4gICAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICAgIFwiY29tbWVudFwiOiBkYXRhVG9TZW5kLmNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5jaGVja1N0cmVldChkYXRhKTtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gIH1cblxuICBzdHJpbmdUb051bWJlcihzdHI6bnVtYmVyIHwgYW55KTpudW1iZXIge1xuICAgIGNvbnNvbGUubG9nKHR5cGVvZiBzdHIpO1xuICAgIGlmICh0eXBlb2Ygc3RyID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuICtzdHI7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyID09PSBcIm51bWJlclwiKSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiw5DCn8OQwrDDkcKAw5DCsMOQwrzDkMK1w5HCgsORwoAgaG9tZSDDkMK0w5DCvsOQwrvDkMK2w5DCtcOQwr0gw5DCscORwovDkcKCw5HCjCDDkMK4w5DCu8OQwrggc3RyaW5nIMOQwrjDkMK7w5DCuCBudW1iZXJcIik7XG4gICAgfVxuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaEFtb3VudF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldEFtb3VudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGFjdGlvbjphbnk7XG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJykgb25DbGljaygpIHtcbiAgICB0aGlzLmNoYW5nZUFtb3VudCh0aGlzLmFjdGlvbik7XG4gIH1cblxuICBwcml2YXRlIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudChhY3Rpb24pIHtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICcrJzpcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgKyAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnLSc6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvdW50VG9DYXJ0KFxuICAgICAgICAgIHRoaXMuZGlzaC5pZCxcbiAgICAgICAgICB0aGlzLmRpc2guYW1vdW50IC0gMVxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnNvbGUubG9nKFwiw5DClMOQwrjDkcKAw5DCtcOQwrrDkcKCw5DCuMOQwrLDkMKwIFNldERpc2hBbW91bnQgw5DCv8OQwr7DkMK7w5HCg8ORwofDkMK4w5DCu8OQwrAgw5DCu8OQwr7DkMK2w5DCvcOQwr7DkMK1IMOQwrfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IGFjdGlvblwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYsXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tkaXNoQ2FsY10nXG59KVxuZXhwb3J0IGNsYXNzIERpc2hDYWxjRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSAgZGlzaDphbnk7XG4gIEBJbnB1dCgpICBhbW91bnQ6YW55O1xuICBASW5wdXQoKSAgc2VsZWN0ZWRNb2RpZmllcnM6YW55O1xuICBAT3V0cHV0KCkgIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgIGFtb3VudERpc2hUb0FkZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICB3ZWlnaHRUb3RhbDtcbiAgYW1vdW50RGlzaDtcbiAgcHJpY2U7XG4gIGFtb3VudE1vZGlmaXJlczphbnkgPSB7fTtcbiAgc3RhdGVNb2RpZmllcnM6YW55ID0ge307XG4gIHRlc3Rjb3VudENhbGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZW5kZXJlcjpSZW5kZXJlcjIsXG4gICAgICAgICAgICAgIHByaXZhdGUgZWw6RWxlbWVudFJlZixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFwiZGlzaC1jYWxjdWxhdG9yXCIpO1xuXG5cbiAgICB0aGlzLmFtb3VudERpc2ggPSB0aGlzLmFtb3VudDtcblxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKTtcbiAgICB0aGlzLnByaWNlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5wcmljZSwgXCJkaXNoLXByaWNlXCIpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlckRpc2godGhpcy5kaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyKHRoaXMuZGlzaC5tb2RpZmllcnMpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICByZW5kZXJEaXNoKGRpc2g6YW55KSB7XG4gICAgLypcbiAgICAgPGRpdiBjbGFzcz1cIm1haW4taXRlbVwiPlxuICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+XG4gICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7ZGlzaC5uYW1lfX08L2Rpdj5cbiAgICAgPC9kaXY+XG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLXF1YW50aXR5XCI+XG4gICAgIDwhLS0gaW5jcmVhc2UgYnV0dG9uLS0+XG4gICAgIDxhIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUFtb3VudGRpc2goLTEpXCI+JiM4NzIyOzwvYT5cbiAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXF1YW50aXR5X19jb3VudGVyXCIgPnt7YW1vdW50RGlzaH19PC9zcGFuPlxuICAgICA8IS0tIGRlY3JlYXNlIGJ1dHRvbi0tPlxuICAgICA8YSBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2J1dHRvblwiIChjbGljayk9XCJjaGFuZ2VBbW91bnRkaXNoKDEpXCI+JiN4MmI7PC9hPlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cIndlaWdodC1wcmljZVwiPlxuICAgICB7e2Rpc2gucHJpY2UqYW1vdW50RGlzaH19Jm5ic3A7JiN4MjBiZDtcbiAgICAgPC9kaXY+XG4gICAgIDwvZGl2PlxuXG5cbiAgICAgKi9cbiAgICBsZXQgbWFpbkl0ZW0gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhtYWluSXRlbSwgXCJkaXNoLXdyYXBlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgbWFpbkl0ZW0pO1xuXG4gICAgbGV0IGl0ZW1OYW1lID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwibmFtZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBpdGVtTmFtZSk7XG5cbiAgICBsZXQgdGl0bGUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aXRsZSwgXCJ0aXRsZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRpdGxlLCBcImlubmVySFRNTFwiLCB0aGlzLmRpc2gubmFtZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtTmFtZSwgdGl0bGUpO1xuXG4gICAgbGV0IHdlaWdodERpc2hXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwiZGlzaFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCB3ZWlnaHREaXNoV3JhcHBlcik7XG5cbiAgICBsZXQgd2VpZ2h0RGlzaFZhbHVlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0RGlzaFZhbHVlLCBcInZhbHVlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB3ZWlnaHREaXNoVmFsdWUsXG4gICAgICBcImlubmVySFRNTFwiLFxuICAgICAgKHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIgw5DCsy5cIlxuICAgICk7XG4gICAgaWYgKHRoaXMuZGlzaC53ZWlnaHQgPT09IDAgfHwgIXRoaXMuZGlzaC53ZWlnaHQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0RGlzaFZhbHVlLCBcInplcm9cIik7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ2h0RGlzaFdyYXBwZXIsIHdlaWdodERpc2hWYWx1ZSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5wcmljZSk7XG4gICAgbGV0IHByaWNlRGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInByaWNlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VEaXNoV3JhcHBlciwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHByaWNlRGlzaFdyYXBwZXIsIHRoaXMucHJpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlRGlzaFdyYXBwZXIpO1xuXG4gICAgbGV0IGl0ZW1RdWFudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1RdWFudCwgXCJxdWFudGl0eVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBpdGVtUXVhbnQpO1xuXG4gICAgbGV0IGFkZEJ1dHRvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJtaW51c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFkZEJ1dHRvbiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFkZEJ1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgtMSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbClcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgYWRkQnV0dG9uKTtcblxuICAgIGxldCBjb3VudGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNvdW50ZXIsIFwicXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBjb3VudGVyKTtcblxuICAgIGxldCBtaW51c0J1dHRvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhtaW51c0J1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcInBsdXNcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShtaW51c0J1dHRvbiwgXCJpbm5lckhUTUxcIiwgXCImI3gyYjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obWludXNCdXR0b24sIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICB0aGlzLmNoYW5nZUFtb3VudGRpc2goMSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgICB0aGlzLnByaWNlLFxuICAgICAgICBcImlubmVySFRNTFwiLFxuICAgICAgICB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKVxuICAgICAgKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbClcbiAgICB9KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudCwgbWludXNCdXR0b24pO1xuXG4gICAgbGV0IHdlaWdodFRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIndlaWdodFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodFRvdGFsV3JhcHBlcik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaWYgKHRoaXMuZGlzaC53ZWlnaHQgPT09IDAgfHwgIXRoaXMuZGlzaC53ZWlnaHQpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0VG90YWwsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ2YWx1ZVwiKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpIC8vIFRPRE86IHRvdGFsIFdlaWdodFxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ2h0VG90YWxXcmFwcGVyLCB3ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy53ZWlnaHRUb3RhbCA9IHdlaWdodFRvdGFsO1xuXG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgdGhpcy5wcmljZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICB0aGlzLmdlbmVyYXRlUHJpY2UoZGlzaC5wcmljZSlcbiAgICApOyAvLyBUT0RPOiDDkMK/w5HCgMOQwrDDkMKyw5DCuMOQwrvDkcKMw5DCvcOQwr4gw5HCgcORwofDkMK4w5HCgsOQwrDDkcKCw5HCjCDDkcKGw5DCtcOQwr3DkcKDXG4gICAgbGV0IHByaWNlVG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJ0b3RhbFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHByaWNlVG90YWxXcmFwcGVyLCB0aGlzLnByaWNlKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCBwcmljZVRvdGFsV3JhcHBlcik7XG4gIH1cblxuICBnZW5lcmF0ZVByaWNlKHByaWNlRGlzaCwgYW1vdW50PywgbW9kaWZpcmVzUHJpY2U/KSB7XG4gICAgbGV0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobW9kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gucHJpY2UgKiB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50Lmdyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICB9KTtcbiAgICBtb2RTdW0gPSBtb2RTdW0gKiB0aGlzLmFtb3VudERpc2g7XG4gICAgcmV0dXJuIChcbiAgICAgIHByaWNlRGlzaCAqIHRoaXMuYW1vdW50RGlzaCArIG1vZFN1bSArICc8ZGl2IGNsYXNzPVwiY3VycmVuY3lcIj4mbmJzcDsmI3gyMGJkOzwvZGl2PidcbiAgICApO1xuICB9XG5cbiAgZ2VuZXJhdGVUb3RhbFdlaWdodCgpIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGlmaWVycylcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXBzID0+IHtcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kWzBdLmdyb3VwSWQgPSBncm91cHMuZ3JvdXAuaWQ7XG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgbGV0IG1vZFN1bTpudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgIG1vZFN1bSA9IG1vZFN1bSArIGVsZW1lbnQuZGlzaC53ZWlnaHQgKiB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50Lmdyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gKiAxMDAwXG4gICAgfSk7XG4gICAgbW9kU3VtID0gcGFyc2VGbG9hdCgobW9kU3VtICogdGhpcy5hbW91bnREaXNoKS50b0ZpeGVkKDIpKTtcbiAgICBjb25zb2xlLmxvZyhtb2RTdW0sIHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICogdGhpcy5hbW91bnREaXNoKVxuICAgIGNvbnNvbGUubG9nKHRoaXMuZGlzaC53ZWlnaHQsIHRoaXMuYW1vdW50RGlzaClcbiAgICBsZXQgd2VpZ2h0ID0gKHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICogdGhpcy5hbW91bnREaXNoKSArIG1vZFN1bTtcblxuICAgIHJldHVybiAod2VpZ2h0KS50b0ZpeGVkKDApICsgXCIgw5DCsy4gPGRpdiBjbGFzcz0nc2VwYXJhdG9yJz48L2Rpdj5cIjtcbiAgfVxuXG4gIGlubmVyVG90YWxXZWlnaHQodG90YWxXZWlndGhEaXYpIHtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodG90YWxXZWlndGhEaXYsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVUb3RhbFdlaWdodCgpKTtcbiAgfVxuXG4gIGNoYW5nZUFtb3VudGRpc2godmFsdWUpIHtcbiAgICB0aGlzLmFtb3VudERpc2ggPSB0aGlzLmFtb3VudERpc2ggKyB2YWx1ZTtcbiAgICBpZiAodGhpcy5hbW91bnREaXNoIDw9IDApIHtcbiAgICAgIHRoaXMuYW1vdW50RGlzaCA9IDE7XG5cbiAgICB9XG4gICAgaWYgKHRoaXMuYW1vdW50RGlzaCA+PSAxOTkpIHtcbiAgICAgIHRoaXMuYW1vdW50RGlzaCA9IDE5OTtcblxuICAgIH1cbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG4gIHJlbmRlcihtb2RpZmlyZXM6YW55KSB7XG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcblxuICAgIGlmIChtb2RpZmlyZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGggPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIGgsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIFwiw5DCmiDDkcKNw5HCgsOQwr7DkMK8w5HCgyDDkMKxw5DCu8ORwo7DkMK0w5HCgyDDkMK8w5DCvsOQwrbDkMK9w5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrjDkcKCw5HCjDpcIlxuICAgICAgKTtcbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBoKTtcbiAgICB9XG5cblxuXG4gICAgbW9kaWZpcmVzLmZvckVhY2goZWxlbWVudEdyb3VwID0+IHtcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdID0ge307XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcblxuICAgICAgaWYgKGVsZW1lbnRHcm91cC5kaXNoKSB7XG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXCLDkMKew5DCtMOQwr3DkMK+w5HCh8OQwr3DkcKLw5DCtSDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMORwosgw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCtMOQwrXDkcKAw5DCtsOQwrjDkMKyw5DCsMORwo7DkcKCw5HCgcORwo9cIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZWxlbWVudEdyb3VwXCIsZWxlbWVudEdyb3VwKTtcbiAgICAgICAgLy9UT0RPOiBhZGQgc2luZ2xlIG1vZGlmaWNhdG9yIGxvZ2ljXG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnRHcm91cC5jaGlsZE1vZGlmaWVycykge1xuICAgICAgICBsZXQgZ3JvdXBEaXYgPSB0aGlzLmdyb3VwRGl2KFxuICAgICAgICAgIGVsZW1lbnRHcm91cC5ncm91cCA/IGVsZW1lbnRHcm91cC5ncm91cC5uYW1lIDogXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrBcIlxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZ3JvdXBEaXYpO1xuICAgICAgICBsZXQgbW9kQXJyID0gZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzO1xuICAgICAgICBtb2RBcnIuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICBsZXQgbW9kaWZpcmVEaXYgPSB0aGlzLm1vZGlmaXJlRGl2KGVsZW1lbnQsIGVsZW1lbnRHcm91cC5tb2RpZmllcklkKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGdyb3VwRGl2LCBtb2RpZmlyZURpdik7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuZGVmYXVsdEFtb3VudCA8IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZWxlbWVudEdyb3VwLm1vZGlmaWVySWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBmYWxzZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChtb2RpZmlyZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGggPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIGgsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIFwiPHA+KiDDosKAwpQgw5DCmsOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK0w5DCvsOQwrHDkMKww5DCssOQwrvDkMK1w5DCvcORwovDkcKFIMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrHDkMK7w5HCjsOQwrTDkMKwIMOQwr/DkcKAw5DCuMOQwrzDkMK1w5DCvcORwo/DkMK1w5HCgsORwoHDkcKPIMOQwrTDkMK7w5HCjyDDkMK6w5DCsMOQwrbDkMK0w5DCvsOQwrkgw5DCv8OQwr7DkcKAw5HChsOQwrjDkMK4PC9wPlwiXG4gICAgICApO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG4gIH1cblxuICBncm91cERpdihuYW1lR29ydXApIHtcbiAgICBsZXQgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2LCBcImdyb3VwLW1vZGlmaXJlcy13cmFwZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkaXYsIHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dChcIlwiICsgbmFtZUdvcnVwKSk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIG1vZGlmaXJlRGl2KGVsZW1lbnQsIGdyb3VwSWQpIHtcbiAgICBsZXQgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2LCBcImFkZGl0aW9uYWwtaXRlbVwiKTtcbiAgICB0aGlzLnJlbmRlck9uZU1vZGlmaXJlKGVsZW1lbnQsIGRpdiwgZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIHJlbmRlck9uZU1vZGlmaXJlKGVsZW1lbnQsIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBjb25zb2xlLmluZm8oJ3JlbmRlck9uZU1vZGlmaXJlJywgZWxlbWVudCk7XG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZSBzZWxlY3RlZE1vZGlmaWVycycsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKdw5DCsMOQwrfDkMKyw5DCsMOQwr3DkMK4w5HCjyDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbU5hbWVEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZURpdiwgXCJpdGVtLW5hbWVcIik7XG5cbiAgICBsZXQgbGFiZWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShsYWJlbCwgXCJmb3JcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lRGl2LCBsYWJlbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShsYWJlbCwgXCJpbm5lckhUTUxcIiwgZWxlbWVudC5kaXNoLm5hbWUpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbU5hbWVEaXYpO1xuXG4gICAgbGV0IHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcImxlZnQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVMZWZ0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3dlaWdodCcpO1xuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZUxlZnQsICdpbm5lckhUTUwnLCAoZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDDkMKzLlwiICsgJycpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlndGhNb2RpZmlyZVdyYXBlciwgd2VpZ2h0TW9kaWZpcmVMZWZ0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCB3ZWlndGhNb2RpZmlyZVdyYXBlcik7XG5cbiAgICAvLyDDkMKgw5DCtcOQwr3DkMK0w5DCtcORwoAgw5DCscOQwrvDkMK+w5DCusOQwrAgw5DCuMOQwrfDkMK8w5DCuMOQwr3DkMK1w5DCvcOQwrjDkcKPIMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgbGV0IGl0ZW1RdWFudGl0eSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAvKiBUT0RPOiDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkMK/w5HCgMOQwr7DkMKyw5DCtcORwoDDkMK4w5HCgsORwow6XG4gICAgIMOQwrTDkMKwIDAsMCxbMF0gLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5DCssORwovDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuSDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBIFxuICAgICDDkMK0w5DCsCAwLDEgWzBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICDDkMK0w5DCsCAwLDEgW2Q9PT0xXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEsIMOQwrLDkMK6w5DCu8ORwo7DkcKHw5DCtcOQwr3DkcKLw5DCuVxuXG4gICAgIMOQwrTDkMKwIDAsbltkPTBdIC0gw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOIDAgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG4gICAgIMOQwrTDkMKwIDAsbltkPjA8bl0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gZCwgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGssbiBbazxuLGQ9MF0gLSBrIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIGsgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLSAow5HCh8OQwrDDkcKBw5HCgsOQwr3DkcKLw5DCuSDDkcKBw5DCu8ORwoPDkcKHw5DCsMOQwrkgw5DCusOQwr7DkMKzw5DCtMOQwrAgZD0wKVxuICAgICBrLG4gW2s8biwwPGQ9PG5dLSBkIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuXG5cblxuICAgICBkZWZhdWx0QW1vdW50OjBcbiAgICAgaGlkZUlmRGVmYXVsdEFtb3VudDpmYWxzZSAvL8OQwp/DkcKAw5DCuMOQwrfDkMK9w5DCsMOQwrogw5HCgsOQwr7DkMKzw5DCviwgw5HCh8ORwoLDkMK+IMOQwr3DkMK1IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr7DkcKCw5DCvsOQwrHDkcKAw5DCsMOQwrbDkMKww5HCgsORwowgw5HCgcOQwr/DkMK4w5HCgcOQwr7DkMK6IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIsIMOQwrXDkcKBw5DCu8OQwrggw5DCuMORwoUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkcKAw5DCsMOQwrLDkMK9w5DCviDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkcKDXG4gICAgIG1heEFtb3VudDowXG4gICAgIG1pbkFtb3VudDowXG5cbiAgICAgKi9cblxuICAgIGxldCBtaW4gPSBlbGVtZW50Lm1pbkFtb3VudDtcbiAgICBsZXQgbWF4ID0gZWxlbWVudC5tYXhBbW91bnQ7XG4gICAgbGV0IGRlZiA9IGVsZW1lbnQuZGVmYXVsdEFtb3VudDtcblxuICAgIGNvbnNvbGUuaW5mbygnbWluIG1heCBkZWYnLCBtaW4sIG1heCwgZGVmKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAwICYmIGRlZiA9PT0gMDogLy8gMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDA6IC8vIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgZmFsc2UsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgdHJ1ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG1pbiA9PT0gMSAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgZWxlbWVudC5kaXNoLm5hbWUsXG4gICAgICAgICAgXCLDkMKXw5DCvcOQwrDDkcKHw5DCtcOQwr3DkMK4w5DCtSDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK0w5DCsMOQwrXDkcKCw5HCgcORwo8gw5DCvcOQwrDDkcKBw5HCgsORwoDDkMK+w5DCucOQwrrDkMK1OlwiLFxuICAgICAgICAgIG1pbixcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgZGVmXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA8PSBtYXggJiYgZGVmID49IG1pbiAmJiBkZWYgPD0gbWF4ICYmIG1heCA+IDE6IC8vZCDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4hISEgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5HCh8ORwoLDkMK+w5DCscOQwrLDkcKLIMORwoHDkcKCw5DCvsORwo/DkMK7w5DCsCDDkcKGw5HCi8ORwoTDkcKAw5DCsCAxIMOQwrIgw5DCsMOQwrzDkMKww5HCg8OQwr3DkcKCLCDDkMK8w5DCsMOQwrrDkcKBIG4ow5DCscOQwr7DkMK7w5HCjMORwojDkMK1IG4gw5DCvcOQwrUgw5DCv8OQwr7DkMK0w5DCvcOQwrjDkMKww5DCvMOQwrDDkMK7w5DCvsORwoHDkcKMKSDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgICAgdGhpcy5yZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCDDkcKAw5DCtcOQwr3DkMK0w5DCtcORwoDDkMKwIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsCwgw5DCtMOQwrvDkcKPIMOQwrfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK5OlwiLFxuICAgICAgICAgIG1pbixcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgZGVmXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm1heEFtb3VudCA+IDAgJiYgZWxlbWVudC5taW5BbW91bnQgPiAwKSB7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkcKBw5HCgsOQwr7DkMK4w5DCvMOQwr7DkcKBw5HCgsOQwrggw5DCuCDDkMKyw5DCtcORwoHDkMKwIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIC8vIGxldCB3ZWlnaHRQcmljZURpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgLy8gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRQcmljZURpdiwgJ21vZGFsLXByaWNlJyk7XG4gICAgLy8gbGV0IHdlaWdodDtcbiAgICAvLyBpZihlbGVtZW50LmRpc2gud2VpZ2h0PjApe1xuICAgIC8vICAgd2VpZ2h0ID0gIGVsZW1lbnQuZGlzaC53ZWlnaHQgKyBcIiDDkMKzIFwiO1xuICAgIC8vIH1cbiAgICAvLyBsZXQgc2xhc2ggPSBcIi8gXCI7XG4gICAgLy8gbGV0IHByaWNlO1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC5wcmljZT4wKXtcbiAgICAvLyAgIHByaWNlID0gZWxlbWVudC5kaXNoLnByaWNlICsgXCImbmJzcDsmI3gyMGJkO1wiO1xuICAgIC8vIH1cbiAgICAvLyBsZXQgd2VpZ2h0QW5kUHJpY2VIVE1MID0gKHdlaWdodHx8JycpKyh3ZWlnaHQmJnByaWNlPyBzbGFzaCA6ICcnKSsoIHByaWNlIHx8ICcnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodFByaWNlRGl2LCAnaW5uZXJIVE1MJywgd2VpZ2h0QW5kUHJpY2VIVE1MKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCB3ZWlnaHRQcmljZURpdik7XG5cbiAgICBsZXQgcmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhyaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcInJpZ2h0LXdlaWdodC1tb2RpZmlyZS13cmFwZXJcIik7XG4gICAgbGV0IHdlaWdodE1vZGlmaXJlUmlnaHQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3dlaWdodCcpO1xuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlUmlnaHQsICd6ZXJvJyk7XG4gICAgfVxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ2lubmVySFRNTCcsIChlbGVtZW50LmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiIMOQwrMuXCIgKyAnPGRpdiBjbGFzcz1cInNlcGFyYXRvclwiPjwvZGl2PicpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChyaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZVJpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuXG4gICAgbGV0IHByaWNlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2UsIFwiaXRlbS1wcmljZVwiKTtcblxuICAgIGxldCBwcmljZVZhbHVlO1xuICAgIGlmIChlbGVtZW50LmRpc2gucHJpY2UgPiAwKSB7XG4gICAgICBwcmljZVZhbHVlID0gZWxlbWVudC5kaXNoLnByaWNlICsgXCI8ZGl2IGNsYXNzID0gJ2N1cnJlbmN5Jz4mbmJzcDsmI3gyMGJkOzwvZGl2PlwiO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShwcmljZSwgXCJpbm5lckhUTUxcIiwgcHJpY2VWYWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBwcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2UsIFwiemVyby1wcmljZVwiKTtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuXG4gIH1cblxuICByZW5kZXJDaGVja2JveChlbGVtZW50LCBpc0FjdGl2ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZCkge1xuXG4gICAgbGV0IGlucHV0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcImlkXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGlucHV0LCAnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgZWxlbWVudC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IDA7XG5cbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dCwgXCJtb2RhbC1jaGVja2JveFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgaW5wdXQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oaW5wdXQsIFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuaWRSYWRpb0JveChncm91cElkKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtrZXldID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgICB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JvdXBEaXZCbG9jayA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJpbnB1dFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgZ3JvdXBEaXZCbG9jay5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGlmIChlbGVtZW50LmlkICE9IGUudGFyZ2V0LmlkKSBlbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlLnRhcmdldC5pZF0gPSAxO1xuXG4gICAgICB9XG5cblxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtUXVhbnRpdHkpO1xuXG4gIH1cblxuICByZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KSB7XG5cbiAgICBsZXQgc3RhcnRBbW91bnQ7XG4gICAgaWYgKGVsZW1lbnQuZGVmYXVsdEFtb3VudCA+IDApIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydEFtb3VudCA9IGVsZW1lbnQubWluQW1vdW50O1xuXG4gICAgfVxuICAgIGlmIChzdGFydEFtb3VudCA+IDApIHtcblxuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGxldCBhTWludXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYU1pbnVzRGl2LCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhTWludXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiM4NzIyO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYU1pbnVzRGl2KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhTWludXNEaXYsIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSArdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXTtcblxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlIC0gMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA8IGVsZW1lbnQubWluQW1vdW50XG4gICAgICApXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBlbGVtZW50Lm1pbkFtb3VudDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHNwYW4sXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID09PSAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhbiwgXCJpdGVtLXF1YW50aXR5X19jb3VudGVyXCIpO1xuICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBzdGFydEFtb3VudDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgc3BhbixcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgc3Bhbik7XG5cbiAgICBsZXQgYVBsdXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYVBsdXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFQbHVzRGl2LCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYVBsdXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYVBsdXNEaXYsIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSArdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB2YWx1ZSArIDE7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPlxuICAgICAgICBlbGVtZW50Lm1heEFtb3VudCAmJlxuICAgICAgICBlbGVtZW50Lm1heEFtb3VudCAhPSAwXG4gICAgICApXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHNwYW4sXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc2V0TW9kaWZpcmVzKCkge1xuICAgIGxldCBtb2RpZmllcnNUb1NlbGVjdCA9IFtdO1xuXG4gICAgLyppZih0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmxlbmd0aCAmJiAhKE9iamVjdC52YWx1ZXModGhpcy5zdGF0ZU1vZGlmaWVycykpLmxlbmd0aCkge1xuICAgICAgbW9kaWZpZXJzVG9TZWxlY3QgPSB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzO1xuICAgIH0qL1xuXG4gICAgbGV0IG1vZGlmaXJlcyA9IFtdO1xuXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgbW9kaWZpZXJzVG9TZWxlY3QnLCBtb2RpZmllcnNUb1NlbGVjdCk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYmVmb3JlJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYmVmb3JlJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG5cbiAgICBmb3IgKGxldCBncm91cElkIGluIHRoaXMuc3RhdGVNb2RpZmllcnMpIHtcbiAgICAgIGZvciAobGV0IG1vZGlmaXJlSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVttb2RpZmlyZUlkXSB8fCBtb2RpZmllcnNUb1NlbGVjdC5maW5kKGl0ZW0gPT4gaXRlbS5tb2RpZmllcklkID09IG1vZGlmaXJlSWQpKSB7XG4gICAgICAgICAgbW9kaWZpcmVzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IG1vZGlmaXJlSWQsXG4gICAgICAgICAgICBhbW91bnQ6IHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW21vZGlmaXJlSWRdLFxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMgPSBtb2RpZmlyZXM7XG5cbiAgICBpZiAodGhpcy5kaXNoLm1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IFtdO1xuXG4gICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBpZiAoZ3JvdXAucmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cC5tb2RpZmllcklkXSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkTW9kaWYgPSBbXTtcbiAgICAgICAgICAgIGxldCBsb2NhbE1vZGlmID0gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cC5tb2RpZmllcklkXTsgLy8uZmlsdGVyKGVsZW1lbnQ9PmVsZW1lbnQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtb2QgaW4gbG9jYWxNb2RpZikge1xuICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZi5oYXNPd25Qcm9wZXJ0eShtb2QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsTW9kaWZbbW9kXSkge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRNb2RpZi5wdXNoKGxvY2FsTW9kaWZbbW9kXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRNb2RpZi5sZW5ndGggPCBncm91cC5taW5BbW91bnQpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLDkMKSw5DCvcOQwrjDkMK8w5DCsMOQwr3DkMK4w5DCtVwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IFwiIMOQwp7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkMK+IMOQwrLDkcKLw5DCscOQwrXDkcKAw5DCuMORwoLDkMK1IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5HCiyDDkMK4w5DCtyDDkMK6w5DCsMORwoLDkMK1w5DCs8OQwr7DkcKAw5DCuMOQwrg6IFwiICtcbiAgICAgICAgICAgICAgICBncm91cC5ncm91cC5uYW1lXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIFtdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZS5wdXNoKHtcbiAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICAgIHRpdGxlOiBcIsOQwpLDkMK9w5DCuMOQwrzDkMKww5DCvcOQwrjDkMK1XCIsXG4gICAgICAgICAgICAgIGJvZHk6IFwiIMOQwp7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkMK+IMOQwrLDkcKLw5DCscOQwrXDkcKAw5DCuMORwoLDkMK1IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5HCiyDDkMK4w5DCtyDDkMK6w5DCsMORwoLDkMK1w5DCs8OQwr7DkcKAw5DCuMOQwrg6IFwiICtcbiAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXAubmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIFtdKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBhZnRlcicsIHRoaXMuc3RhdGVNb2RpZmllcnMpO1xuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHNlbGVjdGVkTW9kaWZpZXJzIGFmdGVyJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG4gIH1cblxuICAvKiDDkMK/w5HCgMOQwr7DkMKyw5DCtcORwoDDkcKPw5DCtcORwoIgw5HCgcOQwr7DkMK+w5HCgsOQwrLDkMK1w5HCgcORwoLDkMKyw5DCtcORwoIgw5DCu8OQwrggw5DCvMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCssOQwrEgw5DCtcORwoHDkMK7w5DCuCAxIMORwoLDkMK+IMORwoDDkMK1w5DCsMOQwrvDkMK4w5DCt8ORwoPDkMK1w5HCgiDDkMK/w5DCvsOQwrLDkMK1w5DCtMOQwrXDkMK9w5DCuMOQwrUgw5HCgMOQwrDDkMK0w5DCuMOQwr7DkMK6w5DCvcOQwr7DkMK/w5DCusOQwrgsXG4gICDDkMK1w5HCgcOQwrvDkMK4IMOQwrzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSAxIMORwoLDkMK+IMOQwrPDkMK1w5DCvcOQwrXDkcKAw5DCuMORwoDDkcKDw5DCtcORwoIgw5DCtMOQwrXDkMK7w5DCsMOQwrXDkcKCIMOQwrLDkcKLw5DCscOQwr7DkcKAIMOQwrLDkcKBw5DCtcORwoUgw5DCvsORwoHDkcKCw5DCsMOQwrvDkcKMw5DCvcORwovDkcKFIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIgw5DCvcOQwrUgw5DCssOQwr7DkMK3w5DCvMOQwr7DkMK2w5DCvcORwovDkMK8LCDDkMKzw5DCtcOQwr3DkMK1w5HCgMOQwrjDkcKAw5HCg8OQwrXDkcKCIMOQwr/DkcKAw5DCtcOQwrTDkcKDw5DCv8ORwoDDkMK1w5DCtsOQwrTDkMK1w5DCvcOQwrjDkMK1Ki9cblxuICBpZFJhZGlvQm94KGdyb3VwSWQpOmJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50R3JvdXAgPSB0aGlzLmRpc2gubW9kaWZpZXJzLmZpbmQoeCA9PiB4Lm1vZGlmaWVySWQgPT09IGdyb3VwSWQpO1xuICAgIHJldHVybiBjdXJyZW50R3JvdXAubWluQW1vdW50ID09PSAxICYmIGN1cnJlbnRHcm91cC5tYXhBbW91bnQgPT09IDE7XG4gIH1cblxuICAvLyDDkMKfw5HCgMOQwr7DkMKyw5DCtcORwoDDkcKPw5DCtcORwoIgw5DCvMOQwrjDkMK9w5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyw5DCusOQwr7DkcKCw5DCvsORwoDDkcKLw5DCtSDDkMKxw5HCi8OQwrvDkMK4IMOQwrLDkcKLw5DCscORwoDDkMKww5DCvcORwotcbiAgY2hlY2tNaW5BbW91bnRNb2RpZmlyZXMoZ3JvdXBJZCwgbW9kaWZpcmUpIHtcbiAgfVxuXG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgLy90aGlzLmRpc2gubW9kaWZpZXJzID1bXTtcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMoW10sIFtdKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEhvc3RMaXN0ZW5lciwgRXZlbnRFbWl0dGVyLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgZGVib3VuY2VUaW1lLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2NoZWNrb3V0XSdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXREaXJlY3RpdmUge1xuXG4gIEBJbnB1dCgpIGNhcnRUb3RhbDphbnk7XG5cbiAgQElucHV0KCkgYm9udXNlczogYW55O1xuXG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgZW1haWw6IHN0cmluZztcbiAgQElucHV0KCkgcGhvbmU6IHN0cmluZztcbiAgQElucHV0KCkgZGVsaXZlcnk6IGFueTtcbiAgQElucHV0KCkgc2VsZlNlcnZpY2U6IGFueTtcbiAgQElucHV0KCkgbG9jYXRpb25JZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHN0cmVldDogc3RyaW5nO1xuICBASW5wdXQoKSBzdHJlZXRJZDogc3RyaW5nO1xuICBASW5wdXQoKSBob21lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvdXNpbmc6IHN0cmluZztcbiAgQElucHV0KCkgYXBhcnRtZW50OiBzdHJpbmc7XG4gIEBJbnB1dCgpIGVudHJhbmNlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRvb3JwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBmbG9vcjogc3RyaW5nO1xuXG4gIEBJbnB1dCgpIHBheW1lbnRNZXRob2Q6IHN0cmluZztcbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBlcnNvbnNDb3VudDogbnVtYmVyO1xuICBASW5wdXQoKSBjb21tZW50OiBzdHJpbmc7XG5cbiAgQElucHV0KCkgZGF0ZTogc3RyaW5nO1xuICBASW5wdXQoKSBub3RpZnlNZXRob2RJZDogc3RyaW5nO1xuICBcbiAgQE91dHB1dCgpIHN1Y2Nlc3MgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBlcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuICBAT3V0cHV0KCkgaXNDaGVja2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuXG4gIGNhcnQ6IGFueTtcbiAgbGFzdEZvcm1DaGFuZ2VLZXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2VcbiAgKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShjYXJ0ID0+IHRoaXMuY2FydCA9IGNhcnQpO1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2VcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIC8vaWYoKHRoaXMubG9jYXRpb25JZCB8fCB0aGlzLnN0cmVldElkKSAmJiB0aGlzLmhvbWUgJiYgdGhpcy5waG9uZSAmJiB0aGlzLnByZXBhcmVQaG9uZSh0aGlzLnBob25lKS5sZW5ndGggPiAxMSkge1xuICAgICAgICAgIGlmKHRoaXMubG9jYXRpb25JZCB8fCAodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lIHx8IHRoaXMuc2VsZlNlcnZpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIC8qZmlsdGVyKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtQ2hhbmdlS2V5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgMTogdGhpcy5sb2NhdGlvbklkLFxuICAgICAgICAgICAgMjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgICAgIDM6IHRoaXMuc3RyZWV0LFxuICAgICAgICAgICAgNDogdGhpcy5ob21lLFxuICAgICAgICAgICAgNTogdGhpcy5jYXJ0VG90YWwsXG4gICAgICAgICAgICA2OiB0aGlzLmJvbnVzZXMsXG4gICAgICAgICAgICA3OiB0aGlzLmRlbGl2ZXJ5LFxuICAgICAgICAgICAgODogdGhpcy5wYXltZW50TWV0aG9kSWRcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmKGZvcm1DaGFuZ2VLZXkgIT09IHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkpIHtcbiAgICAgICAgICAgIHRoaXMubGFzdEZvcm1DaGFuZ2VLZXkgPSBmb3JtQ2hhbmdlS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSwqL1xuICAgICAgICBkZWJvdW5jZVRpbWUoMTAwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jaGVja1N0cmVldCgpKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICBpZighdGhpcy5sb2NhdGlvbklkICYmICEoKHRoaXMuc3RyZWV0SWQgfHwgdGhpcy5zdHJlZXQpICYmIHRoaXMuaG9tZSkgJiYgIXRoaXMuc2VsZlNlcnZpY2UpIHtcbiAgICAgIHRoaXMuZXJyb3IuZW1pdCgnw5DCncORwoPDkMK2w5DCvcOQwr4gw5HCg8OQwrrDkMKww5DCt8OQwrDDkcKCw5HCjCDDkMKww5DCtMORwoDDkMK1w5HCgScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjb21tZW50ID0gdGhpcy5jb21tZW50IHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgbGV0IHBheW1lbnRNZXRob2QgPSB0aGlzLnBheW1lbnRNZXRob2QgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydC5jYXJ0SWQsXG4gICAgICBcImNvbW1lbnRcIjogY29tbWVudCxcbiAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICBcInBob25lXCI6IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZVxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMuZGF0ZSkge1xuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XG4gICAgfVxuXG4gICAgaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcbiAgICB9XG5cbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xuXG5cbiAgICBpZih0aGlzLmJvbnVzZXMpIHtcbiAgICAgIGRhdGFbJ2JvbnVzZXMnXSA9IHRoaXMuYm9udXNlcy5tYXAoYiA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmFtZTogYi5uYW1lLFxuICAgICAgICAgIGFtb3VudDogYi5hbW91bnRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNhcnRJZCA9IHRoaXMuY2FydC5pZDtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAub3JkZXJDYXJ0KGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgIGlmKHJlc3VsdC5hY3Rpb24gJiYgcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3QpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdWx0LmFjdGlvbi5wYXltZW50UmVkaXJlY3Q7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3VjY2Vzcy5lbWl0KGNhcnRJZClcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5PcmRlckZvcm1DaGFuZ2UubmV4dChjaGFuZ2VzKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0KCkge1xuXG4gICAgLy9pZih0aGlzLnN0cmVldElkID09ICcwJykgcmV0dXJuO1xuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50LFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5waG9uZSA/IHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpIDogbnVsbCxcbiAgICAgICAgXCJtYWlsXCI6IHRoaXMuZW1haWwsXG4gICAgICAgIFwibmFtZVwiOiB0aGlzLm5hbWUgfHwgbnVsbFxuICAgICAgfSxcbiAgICAgIFwicGVyc29uc0NvdW50XCI6ICt0aGlzLnBlcnNvbnNDb3VudFxuICAgIH07XG5cbiAgICBkYXRhW1wic2VsZlNlcnZpY2VcIl0gPSB0aGlzLnNlbGZTZXJ2aWNlO1xuXG4gICAgaWYodGhpcy5wYXltZW50TWV0aG9kSWQpIHtcbiAgICAgIGRhdGFbXCJwYXltZW50TWV0aG9kSWRcIl0gPSB0aGlzLnBheW1lbnRNZXRob2RJZDtcbiAgICB9XG5cbiAgICBpZih0aGlzLmRhdGUpIHtcbiAgICAgIGRhdGFbXCJkYXRlXCJdID0gdGhpcy5kYXRlO1xuICAgIH1cblxuICAgIGlmKHRoaXMubm90aWZ5TWV0aG9kSWQpIHtcbiAgICAgIGRhdGFbXCJub3RpZnlNZXRob2RJZFwiXSA9IHRoaXMubm90aWZ5TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5sb2NhdGlvbklkKSB7XG4gICAgICBkYXRhW1wibG9jYXRpb25JZFwiXSA9IHRoaXMubG9jYXRpb25JZDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YVtcImFkZHJlc3NcIl0gPSB7XG4gICAgICAgIFwic3RyZWV0SWRcIjogdGhpcy5zdHJlZXRJZCxcbiAgICAgICAgXCJzdHJlZXRcIjogdGhpcy5zdHJlZXQsXG4gICAgICAgIFwiaG9tZVwiOiB0aGlzLmhvbWUsXG4gICAgICAgIFwiaG91c2luZ1wiOiB0aGlzLmhvdXNpbmcsXG4gICAgICAgIFwiZG9vcnBob25lXCI6IHRoaXMuZG9vcnBob25lIHx8ICcnLFxuICAgICAgICBcImVudHJhbmNlXCI6IHRoaXMuZW50cmFuY2UgfHwgJycsXG4gICAgICAgIFwiZmxvb3JcIjogdGhpcy5mbG9vciB8fCAnJyxcbiAgICAgICAgXCJhcGFydG1lbnRcIjogdGhpcy5hcGFydG1lbnQgfHwgJydcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlzQ2hlY2tpbmcuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuY2hlY2tTdHJlZXRWMihkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgLy8oKSA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgLy9lcnJvciA9PiB0aGlzLmVycm9yLmVtaXQoZXJyb3IpXG4gICAgICAgIHJlc3VsdCA9PiB0aGlzLmlzQ2hlY2tpbmcuZW1pdChmYWxzZSksXG4gICAgICAgIGVycm9yID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKVxuICAgICAgKTtcbiAgfVxuXG5cbiAgcHJlcGFyZVBob25lKHBob25lKSB7XG4gICAgaWYoIXBob25lKSByZXR1cm4gJyc7XG4gICAgcGhvbmUgPSAnKycgKyBwaG9uZS5yZXBsYWNlKC9bXjAtOV0vZ2ltLCcnKTtcbiAgICByZXR1cm4gcGhvbmUucmVwbGFjZSgnKzgnLCAnKzcnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaENvbW1lbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6YW55O1xuICBASW5wdXQoKSBkaXNoOmFueTtcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIHRoaXMuc2V0Q29tbWVudCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHsgfVxuXG4gIHNldENvbW1lbnQoKXtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb21tZW50KHRoaXMuZGlzaC5pZCx0aGlzLmNvbW1lbnQpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+dGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICBlcnI9PnRoaXMuZXJyb3IuZW1pdChlcnIpXG4gICAgKVxuICAgIFxuXG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7XG4gIEV2ZW50ZXJTZXJ2aWNlLFxuICBFdmVudE1lc3NhZ2Vcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkaXNoLWNhbGMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJkaXNoXCIgY2xhc3M9XCJuZy1jYXJ0LWRpc2gtY2FsY1wiIFtuZ0NsYXNzXT1cInsnbmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCc6IGlzVHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiZGlzaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1ib3hcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWRlc2NyaXB0aW9uLWJveFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW5ncmVkaWVudHNcIj57eyBkaXNoLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGlmaWVycy5jdXN0b20uZml4ZWQ7IGVsc2UgbW9kaWZpZXJGaXhlZFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiIFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJGaXhlZFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmN1c3RvbS5maXhlZCBhcyBtb2RpZmllclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWZpeGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiAhIW1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KGNoaWxkTW9kaWZpZXIsIDEsICdjaGVja2JveCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZE1vZGlmaWVyLmRpc2g/Lm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2UgfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyc1wiICpuZ0lmPVwibW9kaWZpZXJzLmJhc2VMaXN0Py5sZW5ndGhcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItaGVhZGVyXCIgKm5nSWY9XCJtb2RpZmllci5ncm91cCBhcyBncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWJveFwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuY2hpbGRJbWFnZXNJc3NldH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gU2luZ2xlIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyVGVtcGxhdGU7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogJ3NpbmdsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogbW9kaWZpZXIubWF4QW1vdW50IHx8IDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5jaGlsZE1vZGlmaWVycz8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5taW5BbW91bnQgPT0gMiAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMjsgdGhlbiB0d29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlIGVsc2UgZ3JvdXBUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIEJhc2UgZ3JvdXAgbW9kaWZpZXIgdmlldyAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWNoaWxkcmVuXCIgW25nQ2xhc3NdPVwieyd3aXRob3V0LWltYWdlcyc6ICFtb2RpZmllci5pbWFnZXNJc3NldH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gR3JvdXAgbW9kaWZpZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IGNoaWxkTW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogbW9kaWZpZXIubW9kaWZpZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdLnRvdGFsQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogbW9kaWZpZXIubWF4QW1vdW50IHx8IDEwMFxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgICAgICA8IS0tIFR3byBwYXJ0cyBhc3NlbWJsZWQgZ3JvdXAgbW9kaWZpZXIgdmlldyAobGlrZSBwaXp6YSBmcm9tIHR3byBoYWx2ZXMpIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlclwiIFtuZ0NsYXNzXT1cIntlbXB0eTogIXR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW21vZGlmaWVyLm1vZGlmaWVySWRdPy5sZW5ndGh9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGlsZE1vZGlmaWVyLmRpc2ggYXMgZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWQtZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3sgZGlzaC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdLnRvdGFsQW1vdW50ID09IDFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPsOQwpLDkcKLw5DCscOQwrXDkcKAw5DCuMORwoLDkMK1IMOQwr/DkMK+w5DCu8OQwr7DkMKyw5DCuMOQwr3DkcKDPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IHt9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1uYW1lXCI+w5DCksORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCu8ORwo7DkMKxw5HCi8OQwrUgw5DCtMOQwrLDkMK1IMOQwr/DkMK+w5DCu8OQwr7DkMKyw5DCuMOQwr3DkMK6w5DCuDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0VHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcihjaGlsZE1vZGlmaWVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGRpc2gubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPsOQwpjDkMKiw5DCnsOQwpPDkMKeOjwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJwcmljZVwiPlxuICAgICAgICAgICAgPHNwYW4+e3sgdG90YWxQcmljZX19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50XCIgKm5nSWY9XCJpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGVcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+w5DCmsOQwr7DkMK8w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrk8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWJveFwiPlxuICAgICAgICAgICAgPGlucHV0ICNjb21tZW50SW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJjb21tZW50LmVtaXQoY29tbWVudElucHV0LnZhbHVlKVwiPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuXG5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjZGlzaEltYWdlVGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjZGlzaEltYWdlVGVtcGxhdGUgbGV0LWRpc2g9XCJkaXNoXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImRpc2g/LmltYWdlcyAmJiBkaXNoLmltYWdlc1swXT8uaW1hZ2VzPy5zbWFsbDsgZWxzZSBpbWdQbGFjZWhvbGRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZVwiIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiJ3VybCgnICsgaW1hZ2VVcmwgKyBkaXNoLmltYWdlc1swXS5pbWFnZXMuc21hbGwgKyAnKSdcIj48L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2ltZ1BsYWNlaG9sZGVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1wbGFjZWhvbGRlclwiPjwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllclRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI21vZGlmaWVyVGVtcGxhdGVcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBBbW91bnQ9XCJncm91cEFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWluQW1vdW50PVwiZ3JvdXBNaW5BbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1heEFtb3VudD1cImdyb3VwTWF4QW1vdW50XCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmRpc2ggYXMgZGlzaFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1uYW1lXCI+e3sgZGlzaC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtd2VpZ2h0XCIgKm5nSWY9XCJkaXNoLndlaWdodFwiPnt7IGRpc2gud2VpZ2h0ICogMTAwMCB9fSDDkMKzw5HCgDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDE7IGVsc2UgY291bnRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNoZWNrYm94VGVtcGxhdGU7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvdW50ZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ291bnRlclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogZ3JvdXBBbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogZ3JvdXBNYXhBbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jb3VudGVyXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50ICYmIGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50IHx8IGdyb3VwQW1vdW50IDw9IGdyb3VwTWluQW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50IC0gMSwgJ21pbnVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPi08L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCBbdmFsdWVdPVwiYW1vdW50XCIgcmVhZG9ubHkgI2lucHV0PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ICsgMSwgJ3BsdXMnKVwiXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+KzwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGVcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCI+XG4gICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibW9kaWZpZXItY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogYW1vdW50fVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgPyAwIDogMSwgJ2NoZWNrYm94JylcIj48L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgLmRpc2h7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7cGFkZGluZy1ib3R0b206MzRweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5kaXNoIC5kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyNTBweDtoZWlnaHQ6MTcwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtiYWNrZ3JvdW5kLXNpemU6NTAlfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveHttYXJnaW4tbGVmdDozNHB4O2hlaWdodDoxNzBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOnN0cmV0Y2g7cGFkZGluZzo1cHggMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtbmFtZXtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI4cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzoyLjRweDtjb2xvcjojMGEwOTA5fS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1pbmdyZWRpZW50c3tmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwMDA7bWFyZ2luLXRvcDoxNXB4O292ZXJmbG93OmhpZGRlbjtmbGV4LWdyb3c6MX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtcHJpY2UtYm94e2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjQ1cHg7bWFyZ2luLXJpZ2h0OjQ5cHh9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2h7Ym9yZGVyOm5vbmU7bWFyZ2luLWxlZnQ6MDtwYWRkaW5nLWJvdHRvbTowfS5uZy1jYXJ0LWRpc2gtY2FsYy10d28tcGFydHMtYXNzZW1ibGVkIC5kaXNoIC5kaXNoLWltYWdlLWJveHtkaXNwbGF5Om5vbmV9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94e3dpZHRoOjEwMCU7aGVpZ2h0OmF1dG99Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLW5hbWV7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyOHB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Y29sb3I6IzBhMDkwOTt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLWluZ3JlZGllbnRzLC5uZy1jYXJ0LWRpc2gtY2FsYy10d28tcGFydHMtYXNzZW1ibGVkIC5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1wcmljZS1ib3h7ZGlzcGxheTpub25lfS5kaXNoLWltYWdle3dpZHRoOjI1MHB4O2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjp0b3A7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0fS5yZXN1bHR7bWFyZ2luLXRvcDo0OXB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjRweDtsaW5lLWhlaWdodDoyOHB4O2NvbG9yOiMwYTA5MDk7dGV4dC1hbGlnbjpyaWdodH0ucmVzdWx0IC5wcmljZXttYXJnaW4tbGVmdDo3NnB4fS5jb21tZW50e3BhZGRpbmctYm90dG9tOjE1cHh9LmNvbW1lbnQgLnRpdGxle2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luOjMwcHggMCAyMHB4fS5jb21tZW50IC5pbnB1dC1ib3h7bWFyZ2luLXRvcDoxMHB4fS5jb21tZW50IC5pbnB1dC1ib3ggaW5wdXR7Ym9yZGVyOjJweCBzb2xpZCAjOTY5Njk2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7aGVpZ2h0OjQ1cHg7bGluZS1oZWlnaHQ6NDVweDtmb250LXN0eWxlOml0YWxpYztmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjIwcHg7Y29sb3I6Izk2OTY5NjtwYWRkaW5nOjAgMjBweH0ubW9kaWZpZXJzIC5tb2RpZmllci1ncm91cHttYXJnaW4tdG9wOjI1cHg7cGFkZGluZy1ib3R0b206MjVweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlcnttYXJnaW4tYm90dG9tOjI1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1kZXNjcmlwdGlvbntmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLWJvdHRvbToycHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2ZmZjtiYWNrZ3JvdW5kLXNpemU6NTAlO21hcmdpbi1yaWdodDoyOHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94IC5kaXNoLWltYWdle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3h7ZmxleC1ncm93OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94IC5tb2RpZmllci1kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveCAubW9kaWZpZXItZGlzaC13ZWlnaHR7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O21hcmdpbi10b3A6MTBweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLXByaWNlLWJveHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O21hcmdpbi1yaWdodDoxMDVweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLXByaWNlLWJveCAuemVyby1wcmljZXtkaXNwbGF5Om5vbmV9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1hY3Rpb24tYm94e3dpZHRoOjE1MXB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZy1ib3R0b206MjhweDtvcGFjaXR5OjE7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5NjtoZWlnaHQ6MjMwcHg7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zaXRpb246LjVzfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlci5lbXB0eXtib3JkZXItYm90dG9tOm5vbmU7aGVpZ2h0OjA7b3BhY2l0eTowfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDt3aWR0aDo1MCV9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC50aXRsZXtmb250LXNpemU6MjFweDtsaW5lLWhlaWdodDoyNXB4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXJpZ2h0OjI0cHh9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC5pbWFnZS1ib3h7d2lkdGg6MTAwcHg7aGVpZ2h0OjIwMHB4O292ZXJmbG93OmhpZGRlbn0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2ggLmltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoyMDAlO2hlaWdodDoxMDAlfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaDpudGgtY2hpbGQoMil7ZmxleC1kaXJlY3Rpb246cm93LXJldmVyc2V9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoOm50aC1jaGlsZCgyKSAudGl0bGV7bWFyZ2luLWxlZnQ6MjRweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2g6bnRoLWNoaWxkKDIpIC5pbWFnZS1ib3h7ZGlyZWN0aW9uOnJ0bH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O3BhZGRpbmc6MjBweCAwfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0e2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmciAxZnI7bWFyZ2luLXRvcDozMHB4O2dyaWQtY29sdW1uLWdhcDozMHB4O2dyaWQtcm93LWdhcDoyNHB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoe2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtjdXJzb3I6cG9pbnRlcjtjb2xvcjojMGEwOTA5O2JvcmRlcjoxLjVweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDApfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoLnNlbGVjdGVke2JvcmRlcjoxLjVweCBzb2xpZCAjMGEwOTA5O2JvcmRlci1yYWRpdXM6MTVweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuZGlzaC1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTdweDtsaW5lLWhlaWdodDoyMHB4O2xldHRlci1zcGFjaW5nOjIuNHB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjAgNXB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoIC5kaXNoLXByaWNle2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O3BhZGRpbmc6NXB4IDAgMTBweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuaW1hZ2UtYm94e3dpZHRoOjIyOHB4O2hlaWdodDoyMjhweDtib3JkZXItcmFkaXVzOjE1cHggMTVweCAwIDB9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2ggLmltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MTVweCAxNXB4IDAgMH0ubW9kaWZpZXItZml4ZWR7Ym9yZGVyOjJweCBzb2xpZCAjNzY3Njc2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOnN0cmV0Y2g7aGVpZ2h0OjQ1cHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVte2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O3dpZHRoOjE0MnB4O2hlaWdodDo0NXB4O2NvbG9yOiM3Njc2NzY7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO21hcmdpbi10b3A6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW0uc2VsZWN0ZWR7YmFja2dyb3VuZDojMGEwOTA5O2JvcmRlci1yYWRpdXM6MTVweDtjb2xvcjojZmZmfS5tb2RpZmllci1maXhlZCAuaXRlbTpub3QoLnNlbGVjdGVkKXtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY2hlY2tib3h7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kOiNlMGUwZTA7Ym9yZGVyLXJhZGl1czoxNXB4O2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ubW9kaWZpZXItY2hlY2tib3guc2VsZWN0ZWQ6YWZ0ZXJ7Y29udGVudDp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7IGJhc2U2NCwgUEhOMlp5QjNhV1IwYUQwaU1qZ2lJR2hsYVdkb2REMGlNamdpSUhacFpYZENiM2c5SWpBZ01DQXlPQ0F5T0NJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtQSEJoZEdnZ1pEMGlUVElnTVRNdU5Vd3hNUzR6TWpNeElESTJUREkySURJaUlITjBjbTlyWlQwaVlteGhZMnNpSUhOMGNtOXJaUzEzYVdSMGFEMGlNeTQxSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUx6NEtQQzl6ZG1jK0NnPT1cIil9Lm1vZGlmaWVyLWNvdW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXI6bm9uZTt3aWR0aDoxNTFweDtoZWlnaHQ6NTBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZDojZTBlMGUwfS5tb2RpZmllci1jb3VudGVyLmRpc2FibGVke29wYWNpdHk6LjN9Lm1vZGlmaWVyLWNvdW50ZXI6bm90KC5kaXNhYmxlZCkgLm1pbnVzLmRpc2FibGVkLC5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5wbHVzLmRpc2FibGVke29wYWNpdHk6LjE1O2N1cnNvcjpkZWZhdWx0fS5tb2RpZmllci1jb3VudGVyIGlucHV0e2JvcmRlcjpub25lO2JhY2tncm91bmQ6MCAwO3dpZHRoOjEwMCU7cGFkZGluZzowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzLC5tb2RpZmllci1jb3VudGVyIC5wbHVze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjE4cHg7Y29sb3I6IzBhMDkwOTtwYWRkaW5nOjAgMzBweDtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY291bnRlciAubWludXM6aG92ZXIsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXM6aG92ZXJ7Y29sb3I6IzAwMH0ubW9kaWZpZXItY291bnRlciAubWludXM6YWN0aXZlLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmFjdGl2ZXtjb2xvcjojY2MwMDA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cy5sb2FkaW5nLC5tb2RpZmllci1jb3VudGVyIC5wbHVzLmxvYWRpbmd7b3BhY2l0eTouMn0ubW9kaWZpZXItY291bnRlciAubWludXN7bGVmdDowfS5tb2RpZmllci1jb3VudGVyIC5wbHVze3JpZ2h0OjB9LndpdGhvdXQtaW1hZ2VzIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtoZWlnaHQ6NzBweCFpbXBvcnRhbnR9LndpdGhvdXQtaW1hZ2VzIC5tb2RpZmllci1kaXNoe2hlaWdodDo3MHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERpc2hDYWxjQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29tbWVudDpFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtb2RpZmllcnMgPSB7XG4gICAgaW5kZXhCeUlkOiB7fSxcbiAgICBjdXN0b206IHtcbiAgICAgIGZpeGVkOiBudWxsXG4gICAgfSxcbiAgICBiYXNlTGlzdDogW10sXG4gIH07XG5cbiAgaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlOiBib29sZWFuO1xuXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcbiAgbW9kaWZpZXJzVmFsdWVUcmVlOiBhbnkgPSB7fTtcbiAgdHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWQ6IGFueSA9IHt9O1xuICBpbWFnZVVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UsXG4gICAgQEluamVjdCgnSW1hZ2VVcmwnKSBpbWFnZVVybDpzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMoW10sIFtdKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubW9kaWZpZXJzID0ge1xuICAgICAgaW5kZXhCeUlkOiB7fSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBmaXhlZDogbnVsbFxuICAgICAgfSxcbiAgICAgIGJhc2VMaXN0OiBbXSxcbiAgICB9O1xuXG5cblxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlID0ge307XG4gICAgaWYodGhpcy5kaXNoICYmIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXIgb2YgdGhpcy5kaXNoLm1vZGlmaWVycykge1xuICAgICAgICBsZXQgbW9kaWZpZXJUeXBlID0gbnVsbDtcbiAgICAgICAgLy8gSW5kZXhpbmdcbiAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XG4gICAgICAgIC8vIENoZWNrIEN1c3RvbSBtb2RpZmllcnMgKGxpa2UgUGl6emEgU2l6ZSlcbiAgICAgICAgaWYoIXRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZFxuICAgICAgICAgICYmICF0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5sZW5ndGhcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1xuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmxlbmd0aCA9PSAyXG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IG1vZGlmaWVyLm1heEFtb3VudFxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAxKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBQaXp6YSBTaXplIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2N1c3RvbSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkID0gbW9kaWZpZXI7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdDdXN0b20gRml4ZWQgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZ3JvdXBcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1xuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmxlbmd0aFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmZpbmQobSA9PiBtLmRpc2gpKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBCYXNlIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2dyb3VwJztcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5wdXNoKG1vZGlmaWVyKTtcblxuICAgICAgICAgIGlmKG1vZGlmaWVyLm1pbkFtb3VudCA9PSAyICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAyKSB7XG4gICAgICAgICAgICB0aGlzLmlzVHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUuaW5mbygnR3JvdXAgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZGlzaCkge1xuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdzaW5nbGUnO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnU2luZ2xlIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIGJyb2tlbiBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdicm9rZW4nO1xuICAgICAgICAgIGNvbnNvbGUud2FybignQnJva2VuIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlc1xuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVyVHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2dyb3VwJzpcbiAgICAgICAgICBjYXNlICdjdXN0b20nOlxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgICAgICAgIGZvcihsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVycykge1xuICAgICAgICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXI7XG4gICAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllci5kZWZhdWx0QW1vdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAobW9kaWZpZXIubW9kaWZpZXJJZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdzaW5nbGUnOlxuICAgICAgICAgICAgaWYoIXRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSl7XG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSA9IHt9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XG4gICAgICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaW5kIGltYWdlcyBhbmQgc2V0IGZsYWdzIChpbWFnZXNJc3NldCwgY2hpbGRJbWFnZXNJc3NldClcbiAgICAgICAgdGhpcy5jaGVja0ltYWdlc0luTW9kaWZpZXIobW9kaWZpZXIubW9kaWZpZXJJZCk7XG5cbiAgICAgIH1cbiAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICAgIH1cblxuICAgIC8vY29uc29sZS5sb2coYHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZGAsIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZCk7XG4gICAgLy9jb25zb2xlLmxvZyhgc2VsZWN0ZWRNb2RpZmllcnNgLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcblxuICAgIGlmKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMgJiYgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5sZW5ndGgpIHtcbiAgICAgIGZvcihsZXQgbSBvZiB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKSB7XG4gICAgICAgIGlmKCFtLmFtb3VudCkgY29udGludWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZ3JvdXBJZCA9IG0uZ3JvdXBJZCB8fCAnc2luZ2xlJztcbiAgICAgICAgICBjb25zdCBncm91cE1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdO1xuICAgICAgICAgIGNvbnN0IG1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW20uaWRdO1xuXG4gICAgICAgICAgaWYoZ3JvdXBNb2RpZmllciAmJiBncm91cE1vZGlmaWVyLm1pbkFtb3VudCA9PSAyICYmIGdyb3VwTW9kaWZpZXIubWF4QW1vdW50ID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcihtb2RpZmllcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW20uaWRdID0gbS5hbW91bnQ7XG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgbW9kaWZpZXJzIGFtb3VudHNgLCBlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKSB7XG4gICAgaWYoZ3JvdXBJZCA9PSAnc2luZ2xlJykgcmV0dXJuO1xuICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCA9IE9iamVjdFxuICAgICAgLnZhbHVlcyh0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSlcbiAgICAgIC5yZWR1Y2UoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhICsgYik7XG4gICAgcmV0dXJuIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudDtcbiAgfVxuXG4gIGNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllcklkKSB7XG4gICAgY29uc3QgbTogYW55ID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xuICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXS5pbWFnZXNJc3NldCA9IG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xuICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXS5jaGlsZEltYWdlc0lzc2V0ID0gISF0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF1cbiAgICAgIC5jaGlsZE1vZGlmaWVyc1xuICAgICAgLmZpbmQoKG06IGFueSkgPT4gbSAmJiBtLmRpc2ggJiYgbS5kaXNoLmltYWdlcyAmJiBtLmRpc2guaW1hZ2VzLmxlbmd0aCA/IHRydWUgOiBmYWxzZSk7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFByaWNlKCkge1xuICAgIGxldCB0b3RhbFByaWNlID0gdGhpcy5kaXNoLnByaWNlIHx8IDA7XG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG4gICAgICAgIGlmKGFtb3VudCkge1xuICAgICAgICAgIGNvbnN0IG1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xuICAgICAgICAgIGlmKG1vZGlmaWVyICYmIG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5wcmljZSkge1xuICAgICAgICAgICAgdG90YWxQcmljZSArPSBtb2RpZmllci5kaXNoLnByaWNlICogYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRvdGFsUHJpY2UgPSB0b3RhbFByaWNlO1xuICAgIHRoaXMuc2V0TW9kaWZpZXJzKCk7XG4gIH1cblxuICBnZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JvdXBJZDogKG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5ncm91cElkKSA/IG1vZGlmaWVyLmRpc2guZ3JvdXBJZCA6IHVuZGVmaW5lZCxcbiAgICAgIG1vZGlmaWVySWQ6IG1vZGlmaWVyLm1vZGlmaWVySWRcbiAgICB9XG4gIH1cblxuICBzZWxlY3RUd29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyKG1vZGlmaWVyOiBhbnkpIHtcbiAgICBjb25zdCB7IGdyb3VwSWQgPSAnc2luZ2xlJywgbW9kaWZpZXJJZCB9ID0gdGhpcy5nZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpO1xuICAgIGNvbnN0IHsgbWluQW1vdW50LCBtYXhBbW91bnQgfSA9IG1vZGlmaWVyO1xuICAgIGNvbnN0IHsgbWluQW1vdW50OiBncm91cE1pbkFtb3VudCA9IDAsXG4gICAgICBtYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50ID0gMCB9ID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdIHx8IHt9O1xuICAgIGNvbnN0IHByZXZpb3VzQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICBjb25zdCBhbW91bnQ6IG51bWJlciA9IHByZXZpb3VzQW1vdW50ID8gMCA6IDE7XG5cbiAgICAvLyBJbml0IHRtcCB2YWx1ZSBzdG9yYWdlIGlmIG5vdCBleGlzdHNcbiAgICBpZighdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSkge1xuICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSA9IFtdO1xuICAgIH1cblxuICAgIC8vIFRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgIGNvbnN0IGdyb3VwQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgLSBwcmV2aW91c0Ftb3VudCArIGFtb3VudDtcbiAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XG4gICAgICBpZih0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdLmxlbmd0aCkge1xuICAgICAgICBmb3IobGV0IG1JZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21JZF0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0gPSB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdLnNsaWNlKDEsMik7XG4gICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW3RoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF1bMF1dID0gMTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWF4ICR7Z3JvdXBNYXhBbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAnw5DCnsOQwrPDkcKAw5DCsMOQwr3DkMK4w5HCh8OQwrXDkMK9w5DCuMOQwrUnLFxuICAgICAgICAgICAgYMOQwpzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrTDkMK7w5HCjyDDkMKzw5HCgMORwoPDkMK/w5DCv8ORwotcbiAgICAgICAgICAgIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0gw5DCvcOQwrUgw5DCscOQwr7DkMK7w5DCtcOQwrUgJHtncm91cE1heEFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfWVsc2UgaWYoZ3JvdXBBbW91bnQgPT09IDApIHtcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0gPSBbXTtcbiAgICB9XG5cbiAgICBpZihhbW91bnQgJiYgIXRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0uZmluZCh2ID0+IHYgPT0gbW9kaWZpZXJJZCkpIHtcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ucHVzaChtb2RpZmllcklkKTtcbiAgICB9XG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gIH1cblxuICBjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllcjogYW55LCBhbW91bnQ6IG51bWJlciwgb3BlcmF0aW9uOiBzdHJpbmcpIHtcbiAgICBpZihhbW91bnQgPCAwKSByZXR1cm47XG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcbiAgICBjb25zdCB7IG1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQgPSAwLFxuICAgICAgICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG5cbiAgICAvLyBGb3IgY2hlY2tib3hcbiAgICBpZihvcGVyYXRpb24gPT0gJ2NoZWNrYm94JyAmJiBncm91cElkICE9PSAnc2luZ2xlJykge1xuICAgICAgLy8gSWYgaXQgd29yayBsaWtlIHJhZGlvIGJ1dHRvblxuICAgICAgaWYoZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxKSB7XG4gICAgICAgIGlmKGFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB6ZXJvIGFtb3VudCBmb3IgYWxsIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBpdGVtTW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW2l0ZW1Nb2RpZmllcklkXSA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdCBhY3Rpb24gbmVlZGVkIGFmdGVyXG4gICAgICBpZihhbW91bnQgPT0gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIEdyb3VwIGFtb3VudCBsaW1pdHNcbiAgICBpZihncm91cE1pbkFtb3VudCB8fCBncm91cE1heEFtb3VudCkge1xuICAgICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XG5cbiAgICAgIGlmKGdyb3VwQW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWluICR7Z3JvdXBNaW5BbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAnw5DCnsOQwrPDkcKAw5DCsMOQwr3DkMK4w5HCh8OQwrXDkMK9w5DCuMOQwrUnLFxuICAgICAgICAgICAgYMOQwpzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrTDkMK7w5HCjyDDkMKzw5HCgMORwoPDkMK/w5DCv8ORwotcbiAgICAgICAgICAgIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0gw5DCvcOQwrUgw5DCvMOQwrXDkMK9w5DCtcOQwrUgJHtncm91cE1pbkFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1heCAke2dyb3VwTWF4QW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICAgICAgJ8OQwp7DkMKzw5HCgMOQwrDDkMK9w5DCuMORwofDkMK1w5DCvcOQwrjDkMK1JyxcbiAgICAgICAgICAgIGDDkMKcw5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMK0w5DCu8ORwo8gw5DCs8ORwoDDkcKDw5DCv8OQwr/DkcKLXG4gICAgICAgICAgICDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtIMOQwr3DkMK1IMOQwrHDkMK+w5DCu8OQwrXDkMK1ICR7Z3JvdXBNYXhBbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENIZWNrIE1vZGlmaWVyIGFtb3VudCBsaW1pdHNcbiAgICBpZihtaW5BbW91bnQgfHwgbWF4QW1vdW50KSB7XG4gICAgICBpZihhbW91bnQgPCBtaW5BbW91bnQpIHtcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcbiAgICAgICAgICBjYXNlICdwbHVzJzogYW1vdW50ID0gbWluQW1vdW50OyBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW51cyc6IGFtb3VudCA9IDA7IGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZihhbW91bnQgPiBtYXhBbW91bnQpIHtcbiAgICAgICAgYW1vdW50ID0gbWF4QW1vdW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdID0gYW1vdW50O1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICB9XG5cbiAgc2V0TW9kaWZpZXJzKCkge1xuICAgIGNvbnN0IG1vZGlmaWVyc1RvU2V0ID0gW107XG5cbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICAgICAgaWYoYW1vdW50KSB7XG5cbiAgICAgICAgICBtb2RpZmllcnNUb1NldC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBtb2RpZmllcklkLFxuICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkICE9PSAnc2luZ2xlJyA/IGdyb3VwSWQgOiB1bmRlZmluZWRcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYobW9kaWZpZXJzVG9TZXQubGVuZ3RoKSB7XG4gICAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaWVyc1RvU2V0LCBbXSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tWYWxpZCgpIHtcblxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcblxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuXG4gICAgICBjb25zdCBncm91cE1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdO1xuICAgICAgaWYoZ3JvdXBNb2RpZmllci5yZXF1aXJlZCkge1xuICAgICAgICBjb25zdCB0b3RhbEFtb3VudEluR3JvdXAgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwIDwgZ3JvdXBNb2RpZmllci5taW5BbW91bnQpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1pbiBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5taW5BbW91bnR9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwID4gZ3JvdXBNb2RpZmllci5tYXhBbW91bnQpIHtcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1heCBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5tYXhBbW91bnR9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9mb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgIC8vXG4gICAgICAvL31cbiAgICB9XG5cbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQoaXNWYWxpZCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZVwiO1xuXG5pbXBvcnQge1xuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGlzaC1jYWxjLWxuJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZGlzaFwiIGNsYXNzPVwibmctY2FydC1kaXNoLWNhbGNcIiBbbmdDbGFzc109XCJ7J25nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQnOiBpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGV9XCI+XG4gICAgPGRpdiBjbGFzcz1cInRpdGxlLWJveFwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ2aWV3LWJveFwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU7IHRoZW4gdHdvUGFydHNBc3NlbWJsZWRIZWFkZXJUZW1wbGF0ZSBlbHNlIGJhc2VIZWFkZXJUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI2Jhc2VIZWFkZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW5ncmVkaWVudHNcIj57eyBkaXNoLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLXByaWNlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5jdXN0b20uZml4ZWQgYXMgbW9kaWZpZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZml4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6ICEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KGNoaWxkTW9kaWZpZXIsIDEsICdjaGVja2JveCcpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgY2hpbGRNb2RpZmllci5kaXNoPy5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPG5nLXRlbXBsYXRlICN0d29QYXJ0c0Fzc2VtYmxlZEhlYWRlclRlbXBsYXRlPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzPy5sZW5ndGggJiYgbW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyXCIgW25nQ2xhc3NdPVwie2VtcHR5OiAhdHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbbW9kaWZpZXIubW9kaWZpZXJJZF0/Lmxlbmd0aH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWQtZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0udG90YWxBbW91bnQgPT0gMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cInRpdGxlXCI+w5DCksORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCv8OQwr7DkMK7w5DCvsOQwrLDkMK4w5DCvcORwoM8L2Rpdj4tLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiB7fSB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLXNlbGVjdGVkLWRpc2hlcy1uYW1lc1wiID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS10d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZDoge3sgdHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWQgfCBqc29uIH19PGJyPlxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXIubW9kaWZpZXJJZDoge3sgbW9kaWZpZXIubW9kaWZpZXJJZCB9fTxicj4tLT5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWRpc2gtaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0eXBlLW5hbWVcIj7DkMKbw5DCtcOQwrLDkMKww5HCjzo8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1uYW1lXCIgKm5nSWY9XCJ0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFttb2RpZmllci5tb2RpZmllcklkXSAmJiB0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFttb2RpZmllci5tb2RpZmllcklkXVswXTsgZWxzZSBub0Rpc2hUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBtb2RpZmllcnMuaW5kZXhCeUlkW3R3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW21vZGlmaWVyLm1vZGlmaWVySWRdWzBdXS5kaXNoPy5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZC1kaXNoLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHlwZS1uYW1lXCI+w5DCn8ORwoDDkMKww5DCssOQwrDDkcKPOjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIiAqbmdJZj1cInR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW21vZGlmaWVyLm1vZGlmaWVySWRdICYmIHR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW21vZGlmaWVyLm1vZGlmaWVySWRdWzFdOyBlbHNlIG5vRGlzaFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IG1vZGlmaWVycy5pbmRleEJ5SWRbdHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbbW9kaWZpZXIubW9kaWZpZXJJZF1bMV1dLmRpc2g/Lm5hbWUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNub0Rpc2hUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1uYW1lIGVtcHR5XCI+w5DCncOQwrUgw5DCssORwovDkMKxw5HCgMOQwrDDkMK9w5DCsDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudFwiICpuZ0lmPVwiaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGl2aWRlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+w5DCmsOQwr7DkMK8w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrk8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ib3hcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NvbW1lbnRJbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cImNvbW1lbnQuZW1pdChjb21tZW50SW5wdXQudmFsdWUpXCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cblxuICAgIDxkaXYgY2xhc3M9XCJzZXR0aW5ncy1ib3hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyc1wiICpuZ0lmPVwibW9kaWZpZXJzLmJhc2VMaXN0Py5sZW5ndGhcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vZGlmaWVyIG9mIG1vZGlmaWVycy5iYXNlTGlzdFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ncm91cFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItYm94XCIgW25nQ2xhc3NdPVwieyd3aXRob3V0LWltYWdlcyc6ICFtb2RpZmllci5jaGlsZEltYWdlc0lzc2V0fVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gU2luZ2xlIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICdzaW5nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuY2hpbGRNb2RpZmllcnM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLm1pbkFtb3VudCA9PSAyICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAyOyB0aGVuIHR3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGUgZWxzZSBncm91cFRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBCYXNlIGdyb3VwIG1vZGlmaWVyIHZpZXcgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2dyb3VwVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kZXNjcmlwdGlvblwiICpuZ0lmPVwiZ3JvdXAuZGVzY3JpcHRpb25cIj57eyBncm91cC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jaGlsZHJlblwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuaW1hZ2VzSXNzZXR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gR3JvdXAgbW9kaWZpZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IG1vZGlmaWVyLm1vZGlmaWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gVHdvIHBhcnRzIGFzc2VtYmxlZCBncm91cCBtb2RpZmllciB2aWV3IChsaWtlIHBpenphIGZyb20gdHdvIGhhbHZlcykgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1uYW1lXCI+w5DCksORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCu8ORwo7DkMKxw5HCi8OQwrUgw5DCtMOQwrLDkMK1IMOQwr/DkMK+w5DCu8OQwr7DkMKyw5DCuMOQwr3DkMK6w5DCuDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIoY2hpbGRNb2RpZmllcilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZGlzaC5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLXByaWNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuXG4gICAgPCEtLTxkaXYgY2xhc3M9XCJyZXN1bHQtYm94IHJlc3VsdFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj7DkMKYw5DCosOQwp7DkMKTw5DCnjo8L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj5cbiAgICAgICAgICAgIDxzcGFuPnt7IHRvdGFsUHJpY2V9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgIDwvc3Bhbj5cbiAgICA8L2Rpdj4tLT5cblxuXG48L2Rpdj5cblxuXG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI2Rpc2hJbWFnZVRlbXBsYXRlIGxldC1kaXNoPVwiZGlzaFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiICpuZ0lmPVwiZGlzaC53ZWlnaHRcIj57eyBkaXNoLndlaWdodCAqIDEwMDAgfX0gw5DCs8ORwoA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWFjdGlvbi1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxOyBlbHNlIGNvdW50ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDaGVja2JveFRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjb3VudGVyVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNvdW50ZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IGdyb3VwQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZVxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWF4QW1vdW50PVwiZ3JvdXBNYXhBbW91bnRcIj5cbiAgICA8bmctY29udGFpbmVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY291bnRlclwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCAmJiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtaW51c1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCB8fCBncm91cEFtb3VudCA8PSBncm91cE1pbkFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCAtIDEsICdtaW51cycpXCJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4tPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgW3ZhbHVlXT1cImFtb3VudFwiIHJlYWRvbmx5ICNpbnB1dD5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCArIDEsICdwbHVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPis8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1vZGlmaWVyLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGFtb3VudH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ID8gMCA6IDEsICdjaGVja2JveCcpXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYEBjaGFyc2V0IFwiVVRGLThcIjsudGl0bGUtYm94e2ZvbnQtc2l6ZToyMnB4O2xpbmUtaGVpZ2h0OjI1cHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiMwYTA5MDk7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3Bvc2l0aW9uOmZpeGVkO3dpZHRoOmNhbGMoMTAwJSAtIDIwMHB4KTttYXJnaW4tdG9wOi03MHB4O21hcmdpbi1sZWZ0OjQwcHg7dGV4dC1hbGlnbjpjZW50ZXJ9LnZpZXctYm94e3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjMwMHB4O21pbi1oZWlnaHQ6Y2FsYygxMDAlIC0gMjgwcHgpO2JvcmRlci1yaWdodDoxcHggc29saWQgI2U5ZTdlNztib3gtc2l6aW5nOmJvcmRlci1ib3g7cGFkZGluZy1yaWdodDoyMHB4fS5zZXR0aW5ncy1ib3h7cGFkZGluZy1sZWZ0OjMyMHB4fS5kaXNoe2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyfS5kaXNoIC5kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyNTBweDtoZWlnaHQ6MTcwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtiYWNrZ3JvdW5kLXNpemU6NTAlfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveHtoZWlnaHQ6MTcwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpzdHJldGNoO3BhZGRpbmc6NXB4IDAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyOHB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Y29sb3I6IzBhMDkwOX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtaW5ncmVkaWVudHN7Zm9udC1zaXplOjE1cHg7Zm9udC13ZWlnaHQ6NTAwO2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6IzAwMDttYXJnaW4tdG9wOjE1cHg7b3ZlcmZsb3c6aGlkZGVuO2ZsZXgtZ3JvdzoxfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1wcmljZS1ib3h7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtoZWlnaHQ6NDVweDttYXJnaW4tcmlnaHQ6NDlweH0ubmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCAuZGlzaHtib3JkZXI6bm9uZTttYXJnaW4tbGVmdDowO3BhZGRpbmctYm90dG9tOjB9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtaW1hZ2UtYm94e2Rpc3BsYXk6bm9uZX0ubmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCAuZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3h7d2lkdGg6MTAwJTtoZWlnaHQ6YXV0b30ubmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCAuZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtbmFtZXt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI4cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzoyLjRweDtjb2xvcjojMGEwOTA5O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0ubmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCAuZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtaW5ncmVkaWVudHMsLm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLXByaWNlLWJveHtkaXNwbGF5Om5vbmV9LmRpc2gtaW1hZ2V7d2lkdGg6MjUwcHg7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czo1cHg7YmFja2dyb3VuZC1zaXplOmNvdmVyO2JhY2tncm91bmQtcG9zaXRpb246dG9wO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdH0ucmVzdWx0e21hcmdpbi10b3A6NDlweDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI0cHg7bGluZS1oZWlnaHQ6MjhweDtjb2xvcjojMGEwOTA5O3RleHQtYWxpZ246cmlnaHR9LnJlc3VsdCAucHJpY2V7bWFyZ2luLWxlZnQ6NzZweH0uY29tbWVudHtwYWRkaW5nLWJvdHRvbToxNXB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNlOWU3ZTc7bWFyZ2luLXRvcDozMHB4fS5jb21tZW50IC50aXRsZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE4cHg7bGluZS1oZWlnaHQ6MjBweDtjb2xvcjojMGEwOTA5O21hcmdpbjozMHB4IDAgMTVweH0uY29tbWVudCAuaW5wdXQtYm94e21hcmdpbi10b3A6MTBweH0uY29tbWVudCAuaW5wdXQtYm94IGlucHV0e2JvcmRlcjoycHggc29saWQgIzk2OTY5Njtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czoxMHB4O2hlaWdodDozNXB4O2xpbmUtaGVpZ2h0OjM1cHg7Zm9udC1zdHlsZTppdGFsaWM7Zm9udC13ZWlnaHQ6NDAwO2ZvbnQtc2l6ZToxNnB4O2NvbG9yOiM5Njk2OTY7cGFkZGluZzowIDIwcHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZ3JvdXB7bWFyZ2luLXRvcDoyNXB4O3BhZGRpbmctYm90dG9tOjI1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVye21hcmdpbi1ib3R0b206MjVweH0ubW9kaWZpZXJzIC5tb2RpZmllci1oZWFkZXIgLm1vZGlmaWVyLW5hbWV7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOTtwYWRkaW5nLWJvdHRvbToxMnB4O3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwMDA7bWFyZ2luOjAgMTAwcHh9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1kZXNjcmlwdGlvbntmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLWJvdHRvbToycHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDo3MHB4O2hlaWdodDo3MHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7YmFja2dyb3VuZC1zaXplOjUwJTttYXJnaW4tcmlnaHQ6MjhweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JhY2tncm91bmQtc2l6ZTpjb250YWluO2JhY2tncm91bmQtcG9zaXRpb246Y2VudGVyfS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94e2ZsZXgtZ3JvdzoxO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveCAubW9kaWZpZXItZGlzaC1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTZweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3ggLm1vZGlmaWVyLWRpc2gtd2VpZ2h0e2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOTttYXJnaW4tdG9wOjB9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1wcmljZS1ib3h7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxNnB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOTttYXJnaW4tcmlnaHQ6MTA1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1wcmljZS1ib3ggLnplcm8tcHJpY2V7ZGlzcGxheTpub25lfS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveHt3aWR0aDoxMDJweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmZsZXgtZW5kfS50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZy1ib3R0b206MjhweDtvcGFjaXR5OjE7aGVpZ2h0OjIzMHB4O292ZXJmbG93OmhpZGRlbjt0cmFuc2l0aW9uOi41c30udHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIuZW1wdHl7Ym9yZGVyLWJvdHRvbTpub25lO2hlaWdodDowO29wYWNpdHk6MH0udHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2h7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7d2lkdGg6NTAlfS50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaCAuaW1hZ2UtYm94e3dpZHRoOjExM3B4O2hlaWdodDoyMjZweDtvdmVyZmxvdzpoaWRkZW59LnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC5pbWFnZS1ib3ggLmRpc2gtaW1hZ2V7d2lkdGg6MjAwJTtoZWlnaHQ6MTAwJX0udHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2g6bnRoLWNoaWxkKDIpe2ZsZXgtZGlyZWN0aW9uOnJvdy1yZXZlcnNlfS50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaDpudGgtY2hpbGQoMikgLmltYWdlLWJveHtkaXJlY3Rpb246cnRsfS50d28tcGFydHMtYXNzZW1ibGVkLXNlbGVjdGVkLWRpc2hlcy1uYW1lcyAuc2VsZWN0ZWQtZGlzaC1pdGVte2Rpc3BsYXk6ZmxleH0udHdvLXBhcnRzLWFzc2VtYmxlZC1zZWxlY3RlZC1kaXNoZXMtbmFtZXMgLnNlbGVjdGVkLWRpc2gtaXRlbTpmaXJzdC1jaGlsZHttYXJnaW4tYm90dG9tOjEycHh9LnR3by1wYXJ0cy1hc3NlbWJsZWQtc2VsZWN0ZWQtZGlzaGVzLW5hbWVzIC5zZWxlY3RlZC1kaXNoLWl0ZW0gLnR5cGUtbmFtZXt3aWR0aDo3MHB4O2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTZweDtjb2xvcjojMGEwOTA5O2NvbnRlbnQ6J8OQwpvDkMK1w5DCssOQwrDDkcKPOid9LnR3by1wYXJ0cy1hc3NlbWJsZWQtc2VsZWN0ZWQtZGlzaGVzLW5hbWVzIC5zZWxlY3RlZC1kaXNoLWl0ZW0gLnR5cGUtbmFtZTpsYXN0LWNoaWxke2NvbnRlbnQ6J8OQwp/DkcKAw5DCsMOQwrLDkMKww5HCjzonfS50d28tcGFydHMtYXNzZW1ibGVkLXNlbGVjdGVkLWRpc2hlcy1uYW1lcyAuc2VsZWN0ZWQtZGlzaC1pdGVtIC5kaXNoLW5hbWV7Zm9udC1zaXplOjE2cHg7Y29sb3I6IzBhMDkwOX0udHdvLXBhcnRzLWFzc2VtYmxlZC1zZWxlY3RlZC1kaXNoZXMtbmFtZXMgLnNlbGVjdGVkLWRpc2gtaXRlbSAuZGlzaC1uYW1lLmVtcHR5e2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtd2VpZ2h0OjQwMDtmb250LXNpemU6MTZweDtjb2xvcjojOTY5Njk2fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7cGFkZGluZzoyMHB4IDB9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3R7ZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyIDFmcjttYXJnaW4tdG9wOjMwcHg7Z3JpZC1jb2x1bW4tZ2FwOjMwcHg7Z3JpZC1yb3ctZ2FwOjI0cHh9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2h7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpjZW50ZXI7Ym94LXNpemluZzpib3JkZXItYm94O2N1cnNvcjpwb2ludGVyO2NvbG9yOiMwYTA5MDk7Ym9yZGVyOjEuNXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMCl9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2guc2VsZWN0ZWR7Ym9yZGVyOjEuNXB4IHNvbGlkICMwYTA5MDk7Ym9yZGVyLXJhZGl1czoxNXB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoIC5kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6MCA1cHh9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2ggLmRpc2gtcHJpY2V7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjE1cHg7cGFkZGluZzo1cHggMCAxMHB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoIC5pbWFnZS1ib3h7d2lkdGg6MTY4cHg7aGVpZ2h0OjE2OHB4O2JvcmRlci1yYWRpdXM6MTVweCAxNXB4IDAgMH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuaW1hZ2UtYm94IC5kaXNoLWltYWdle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czoxNXB4IDE1cHggMCAwfS5tb2RpZmllci1maXhlZHtib3JkZXI6MnB4IHNvbGlkICM3Njc2NzY7Ym94LXNpemluZzpib3JkZXItYm94O2JvcmRlci1yYWRpdXM6MTVweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6c3RyZXRjaDtoZWlnaHQ6NDVweH0ubW9kaWZpZXItZml4ZWQgLml0ZW17Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7d2lkdGg6MTQycHg7aGVpZ2h0OjQ1cHg7Y29sb3I6Izc2NzY3NjtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLXRvcDotMnB4fS5tb2RpZmllci1maXhlZCAuaXRlbTpmaXJzdC1jaGlsZHttYXJnaW4tbGVmdDotMnB4fS5tb2RpZmllci1maXhlZCAuaXRlbTpsYXN0LWNoaWxke21hcmdpbi1yaWdodDotMnB4fS5tb2RpZmllci1maXhlZCAuaXRlbS5zZWxlY3RlZHtiYWNrZ3JvdW5kOiMwYTA5MDk7Ym9yZGVyLXJhZGl1czoxNXB4O2NvbG9yOiNmZmZ9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOm5vdCguc2VsZWN0ZWQpe2N1cnNvcjpwb2ludGVyfS5tb2RpZmllci1jaGVja2JveHt3aWR0aDo1MHB4O2hlaWdodDo1MHB4O2JhY2tncm91bmQ6I2UwZTBlMDtib3JkZXItcmFkaXVzOjE1cHg7Y3Vyc29yOnBvaW50ZXI7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfS5tb2RpZmllci1jaGVja2JveC5zZWxlY3RlZDphZnRlcntjb250ZW50OnVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDsgYmFzZTY0LCBQSE4yWnlCM2FXUjBhRDBpTWpnaUlHaGxhV2RvZEQwaU1qZ2lJSFpwWlhkQ2IzZzlJakFnTUNBeU9DQXlPQ0lnWm1sc2JEMGlibTl1WlNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0S1BIQmhkR2dnWkQwaVRUSWdNVE11TlV3eE1TNHpNak14SURJMlRESTJJRElpSUhOMGNtOXJaVDBpWW14aFkyc2lJSE4wY205clpTMTNhV1IwYUQwaU15NDFJaUJ6ZEhKdmEyVXRiR2x1WldOaGNEMGljbTkxYm1RaUlITjBjbTlyWlMxc2FXNWxhbTlwYmowaWNtOTFibVFpTHo0S1BDOXpkbWMrQ2c9PVwiKX0ubW9kaWZpZXItY291bnRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO3Bvc2l0aW9uOnJlbGF0aXZlO2JvcmRlcjpub25lO3dpZHRoOjEwMnB4O2hlaWdodDozNXB4O2JvcmRlci1yYWRpdXM6MTBweDtiYWNrZ3JvdW5kOiNlMGUwZTB9Lm1vZGlmaWVyLWNvdW50ZXIuZGlzYWJsZWR7b3BhY2l0eTouM30ubW9kaWZpZXItY291bnRlcjpub3QoLmRpc2FibGVkKSAubWludXMuZGlzYWJsZWQsLm1vZGlmaWVyLWNvdW50ZXI6bm90KC5kaXNhYmxlZCkgLnBsdXMuZGlzYWJsZWR7b3BhY2l0eTouMTU7Y3Vyc29yOmRlZmF1bHR9Lm1vZGlmaWVyLWNvdW50ZXIgaW5wdXR7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZDowIDA7d2lkdGg6MTAwJTtwYWRkaW5nOjA7aGVpZ2h0OjM1cHg7bGluZS1oZWlnaHQ6MzVweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjE4cHg7Y29sb3I6IzBhMDkwOX0ubW9kaWZpZXItY291bnRlciAubWludXMsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXN7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtoZWlnaHQ6MzVweDtsaW5lLWhlaWdodDozNXB4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MThweDtjb2xvcjojMGEwOTA5O3BhZGRpbmc6MCAxM3B4O2N1cnNvcjpwb2ludGVyfS5tb2RpZmllci1jb3VudGVyIC5taW51czpob3ZlciwubW9kaWZpZXItY291bnRlciAucGx1czpob3Zlcntjb2xvcjojMDAwfS5tb2RpZmllci1jb3VudGVyIC5taW51czphY3RpdmUsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXM6YWN0aXZle2NvbG9yOiNjYzAwMDl9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzLmxvYWRpbmcsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXMubG9hZGluZ3tvcGFjaXR5Oi4yfS5tb2RpZmllci1jb3VudGVyIC5taW51c3tsZWZ0OjB9Lm1vZGlmaWVyLWNvdW50ZXIgLnBsdXN7cmlnaHQ6MH0ud2l0aG91dC1pbWFnZXMgLm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94e2Rpc3BsYXk6bm9uZX0ud2l0aG91dC1pbWFnZXMgLm1vZGlmaWVyLWRpc2h7aGVpZ2h0OjcwcHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNMbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBASW5wdXQoKSBhbW91bnQ6YW55O1xuICBASW5wdXQoKSBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSB2YWxpZGF0ZTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFtb3VudERpc2hUb0FkZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGNvbW1lbnQ6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQE91dHB1dCgpIHRvdGFsUHJpY2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgd29ybmluZ01lc3NhZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1vZGlmaWVycyA9IHtcbiAgICBpbmRleEJ5SWQ6IHt9LFxuICAgIGN1c3RvbToge1xuICAgICAgZml4ZWQ6IG51bGxcbiAgICB9LFxuICAgIGJhc2VMaXN0OiBbXSxcbiAgfTtcblxuICBpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU6IGJvb2xlYW47XG5cbiAgdG90YWxQcmljZTogbnVtYmVyO1xuICBtb2RpZmllcnNWYWx1ZVRyZWU6IGFueSA9IHt9O1xuICB0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZDogYW55ID0ge307XG4gIGltYWdlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSxcbiAgICBASW5qZWN0KCdJbWFnZVVybCcpIGltYWdlVXJsOnN0cmluZ1xuICApIHtcbiAgICB0aGlzLmltYWdlVXJsID0gaW1hZ2VVcmw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5tb2RpZmllcnMgPSB7XG4gICAgICBpbmRleEJ5SWQ6IHt9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGZpeGVkOiBudWxsXG4gICAgICB9LFxuICAgICAgYmFzZUxpc3Q6IFtdLFxuICAgIH07XG5cblxuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUgPSB7fTtcbiAgICBpZih0aGlzLmRpc2ggJiYgdGhpcy5kaXNoLm1vZGlmaWVycykge1xuICAgICAgZm9yKGxldCBtb2RpZmllciBvZiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBtb2RpZmllclR5cGUgPSBudWxsO1xuICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgLy8gQ2hlY2sgQ3VzdG9tIG1vZGlmaWVycyAobGlrZSBQaXp6YSBTaXplKVxuICAgICAgICBpZighdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkXG4gICAgICAgICAgJiYgIXRoaXMubW9kaWZpZXJzLmJhc2VMaXN0Lmxlbmd0aFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoID09IDJcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gbW9kaWZpZXIubWF4QW1vdW50XG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDEpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIFBpenphIFNpemUgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnY3VzdG9tJztcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWQgPSBtb2RpZmllcjtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0N1c3RvbSBGaXhlZCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5ncm91cFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMuZmluZChtID0+IG0uZGlzaCkpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIEJhc2UgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnZ3JvdXAnO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xuXG4gICAgICAgICAgaWYobW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdHcm91cCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYnJva2VuIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0gPSBjaGlsZE1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChtb2RpZmllci5tb2RpZmllcklkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgICAgICBpZighdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddKXtcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgaW1hZ2VzIGFuZCBzZXQgZmxhZ3MgKGltYWdlc0lzc2V0LCBjaGlsZEltYWdlc0lzc2V0KVxuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllci5tb2RpZmllcklkKTtcblxuICAgICAgfVxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZyhgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkYCwgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkKTtcbiAgICAvL2NvbnNvbGUubG9nKGBzZWxlY3RlZE1vZGlmaWVyc2AsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuXG4gICAgaWYodGhpcy5zZWxlY3RlZE1vZGlmaWVycyAmJiB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmxlbmd0aCkge1xuICAgICAgZm9yKGxldCBtIG9mIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpIHtcbiAgICAgICAgaWYoIW0uYW1vdW50KSBjb250aW51ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBncm91cElkID0gbS5ncm91cElkIHx8ICdzaW5nbGUnO1xuICAgICAgICAgIGNvbnN0IGdyb3VwTW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF07XG4gICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbS5pZF07XG5cbiAgICAgICAgICBpZihncm91cE1vZGlmaWVyICYmIGdyb3VwTW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgZ3JvdXBNb2RpZmllci5tYXhBbW91bnQgPT0gMikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RUd29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyKG1vZGlmaWVyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbS5pZF0gPSBtLmFtb3VudDtcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBtb2RpZmllcnMgYW1vdW50c2AsIGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxuICAgICAgLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyBiKTtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xuICB9XG5cbiAgY2hlY2tJbWFnZXNJbk1vZGlmaWVyKG1vZGlmaWVySWQpIHtcbiAgICBjb25zdCBtOiBhbnkgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmltYWdlc0lzc2V0ID0gbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmNoaWxkSW1hZ2VzSXNzZXQgPSAhIXRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXVxuICAgICAgLmNoaWxkTW9kaWZpZXJzXG4gICAgICAuZmluZCgobTogYW55KSA9PiBtICYmIG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsUHJpY2UoKSB7XG4gICAgbGV0IHRvdGFsUHJpY2UgPSB0aGlzLmRpc2gucHJpY2UgfHwgMDtcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICAgICAgaWYoYW1vdW50KSB7XG4gICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgICAgICAgaWYobW9kaWZpZXIgJiYgbW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLnByaWNlKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlICs9IG1vZGlmaWVyLmRpc2gucHJpY2UgKiBhbW91bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG90YWxQcmljZSA9IHRvdGFsUHJpY2U7XG4gICAgdGhpcy50b3RhbFByaWNlQ2hhbmdlLmVtaXQodG90YWxQcmljZSk7XG4gICAgdGhpcy5zZXRNb2RpZmllcnMoKTtcbiAgfVxuXG4gIGdldE1vZGlmaWVyc0lkcyhtb2RpZmllcikge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cElkOiAobW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLmdyb3VwSWQpID8gbW9kaWZpZXIuZGlzaC5ncm91cElkIDogdW5kZWZpbmVkLFxuICAgICAgbW9kaWZpZXJJZDogbW9kaWZpZXIubW9kaWZpZXJJZFxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIobW9kaWZpZXI6IGFueSkge1xuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcbiAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgIGNvbnN0IGFtb3VudDogbnVtYmVyID0gcHJldmlvdXNBbW91bnQgPyAwIDogMTtcblxuICAgIC8vIEluaXQgdG1wIHZhbHVlIHN0b3JhZ2UgaWYgbm90IGV4aXN0c1xuICAgIGlmKCF0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdKSB7XG4gICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdID0gW107XG4gICAgfVxuXG4gICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgY29uc3QgZ3JvdXBBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCAtIHByZXZpb3VzQW1vdW50ICsgYW1vdW50O1xuICAgIGlmKGdyb3VwQW1vdW50ID4gZ3JvdXBNYXhBbW91bnQpIHtcbiAgICAgIGlmKHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ubGVuZ3RoKSB7XG4gICAgICAgIGZvcihsZXQgbUlkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbUlkXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSA9IHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0uc2xpY2UoMSwyKTtcbiAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXVswXV0gPSAxO1xuICAgICAgfWVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfDkMKew5DCs8ORwoDDkMKww5DCvcOQwrjDkcKHw5DCtcOQwr3DkMK4w5DCtScsXG4gICAgICAgICAgICBgw5DCnMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCtMOQwrvDkcKPIMOQwrPDkcKAw5HCg8OQwr/DkMK/w5HCi1xuICAgICAgICAgICAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDDkMK9w5DCtSDDkMKxw5DCvsOQwrvDkMK1w5DCtSAke2dyb3VwTWF4QW1vdW50fWBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9ZWxzZSBpZihncm91cEFtb3VudCA9PT0gMCkge1xuICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSA9IFtdO1xuICAgIH1cblxuICAgIGlmKGFtb3VudCAmJiAhdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXS5maW5kKHYgPT4gdiA9PSBtb2RpZmllcklkKSkge1xuICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXS5wdXNoKG1vZGlmaWVySWQpO1xuICAgIH1cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXSA9IGFtb3VudDtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgfVxuXG4gIGNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyOiBhbnksIGFtb3VudDogbnVtYmVyLCBvcGVyYXRpb246IHN0cmluZykge1xuICAgIGlmKGFtb3VudCA8IDApIHJldHVybjtcbiAgICBjb25zdCB7IGdyb3VwSWQgPSAnc2luZ2xlJywgbW9kaWZpZXJJZCB9ID0gdGhpcy5nZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpO1xuICAgIGNvbnN0IHsgbWluQW1vdW50LCBtYXhBbW91bnQgfSA9IG1vZGlmaWVyO1xuICAgIGNvbnN0IHsgbWluQW1vdW50OiBncm91cE1pbkFtb3VudCA9IDAsXG4gICAgICAgICAgICBtYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50ID0gMCB9ID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdIHx8IHt9O1xuICAgIGNvbnN0IHByZXZpb3VzQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcblxuICAgIC8vIEZvciBjaGVja2JveFxuICAgIGlmKG9wZXJhdGlvbiA9PSAnY2hlY2tib3gnICYmIGdyb3VwSWQgIT09ICdzaW5nbGUnKSB7XG4gICAgICAvLyBJZiBpdCB3b3JrIGxpa2UgcmFkaW8gYnV0dG9uXG4gICAgICBpZihncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDEpIHtcbiAgICAgICAgaWYoYW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHplcm8gYW1vdW50IGZvciBhbGwgb3B0aW9uc1xuICAgICAgICBmb3IobGV0IGl0ZW1Nb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1baXRlbU1vZGlmaWVySWRdID0gMFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgICAgfVxuICAgICAgLy8gTm90IGFjdGlvbiBuZWVkZWQgYWZ0ZXJcbiAgICAgIGlmKGFtb3VudCA9PSAwKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgR3JvdXAgYW1vdW50IGxpbWl0c1xuICAgIGlmKGdyb3VwTWluQW1vdW50IHx8IGdyb3VwTWF4QW1vdW50KSB7XG4gICAgICAvLyBUb3RhbCBhbW91bnQgaW4gZ3JvdXBcbiAgICAgIGNvbnN0IGdyb3VwQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgLSBwcmV2aW91c0Ftb3VudCArIGFtb3VudDtcblxuICAgICAgaWYoZ3JvdXBBbW91bnQgPCBncm91cE1pbkFtb3VudCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtaW4gJHtncm91cE1pbkFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfDkMKew5DCs8ORwoDDkMKww5DCvcOQwrjDkcKHw5DCtcOQwr3DkMK4w5DCtScsXG4gICAgICAgICAgICBgw5DCnMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCtMOQwrvDkcKPIMOQwrPDkcKAw5HCg8OQwr/DkMK/w5HCi1xuICAgICAgICAgICAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDDkMK9w5DCtSDDkMK8w5DCtcOQwr3DkMK1w5DCtSAke2dyb3VwTWluQW1vdW50fWBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmKGdyb3VwQW1vdW50ID4gZ3JvdXBNYXhBbW91bnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWF4ICR7Z3JvdXBNYXhBbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAnw5DCnsOQwrPDkcKAw5DCsMOQwr3DkMK4w5HCh8OQwrXDkMK9w5DCuMOQwrUnLFxuICAgICAgICAgICAgYMOQwpzDkMKww5DCusORwoHDkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwr7DkMK/w5HChsOQwrjDkMK5IMOQwrTDkMK7w5HCjyDDkMKzw5HCgMORwoPDkMK/w5DCv8ORwotcbiAgICAgICAgICAgIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0gw5DCvcOQwrUgw5DCscOQwr7DkMK7w5DCtcOQwrUgJHtncm91cE1heEFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ0hlY2sgTW9kaWZpZXIgYW1vdW50IGxpbWl0c1xuICAgIGlmKG1pbkFtb3VudCB8fCBtYXhBbW91bnQpIHtcbiAgICAgIGlmKGFtb3VudCA8IG1pbkFtb3VudCkge1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3BsdXMnOiBhbW91bnQgPSBtaW5BbW91bnQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbnVzJzogYW1vdW50ID0gMDsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGFtb3VudCA+IG1heEFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSBtYXhBbW91bnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gIH1cblxuICBzZXRNb2RpZmllcnMoKSB7XG4gICAgY29uc3QgbW9kaWZpZXJzVG9TZXQgPSBbXTtcblxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgICAgICBpZihhbW91bnQpIHtcblxuICAgICAgICAgIG1vZGlmaWVyc1RvU2V0LnB1c2goe1xuICAgICAgICAgICAgaWQ6IG1vZGlmaWVySWQsXG4gICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQgIT09ICdzaW5nbGUnID8gZ3JvdXBJZCA6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtb2RpZmllcnNUb1NldC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpZXJzVG9TZXQsIFtdKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG5cbiAgICAgIGNvbnN0IGdyb3VwTW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF07XG4gICAgICBpZihncm91cE1vZGlmaWVyLnJlcXVpcmVkKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsQW1vdW50SW5Hcm91cCA9IHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPCBncm91cE1vZGlmaWVyLm1pbkFtb3VudCkge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWluIGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1pbkFtb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPiBncm91cE1vZGlmaWVyLm1heEFtb3VudCkge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWF4IGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1heEFtb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2ZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgLy9cbiAgICAgIC8vfVxuICAgIH1cblxuICAgIHRoaXMudmFsaWRhdGUuZW1pdChpc1ZhbGlkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IEFtb3VudENhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IE9yZGVyQ2FydFVzZXJEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG4vL2ltcG9ydCB7IE1vZGlmaXJlc0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9tb2RpZmlyZXMuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNldEFtb3VudERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBEaXNoQ2FsY0RpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlJztcbmltcG9ydCB7IENoZWNrb3V0RGlyZWN0aXZlIH0gZnJvbSBcIi4vZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmVcIjtcbmltcG9ydCB7IFNldERpc2hDb21tZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50JztcbmltcG9ydCB7IERpc2hDYWxjTG5Db21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjLWxuL2Rpc2gtY2FsYy1sbi5jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZSxcbl07XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIERpc2hDYWxjQ29tcG9uZW50LFxuICBEaXNoQ2FsY0xuQ29tcG9uZW50XG5dO1xuXG5jb25zdCBNT0RVTEVTID0gW1xuICBDb21tb25Nb2R1bGVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNT0RVTEVTXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgbmctY2FydFxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL25nLWNhcnQubW9kdWxlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtEaXNoQ2FsY0xuQ29tcG9uZW50IGFzIMOJwrVqfSBmcm9tICcuL2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy1sbi9kaXNoLWNhbGMtbG4uY29tcG9uZW50JztcbmV4cG9ydCB7RGlzaENhbGNDb21wb25lbnQgYXMgw4nCtWl9IGZyb20gJy4vbGliL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xuZXhwb3J0IHtBZGREaXNoVG9DYXJ0RGlyZWN0aXZlIGFzIMOJwrVhfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlJztcbmV4cG9ydCB7QW1vdW50Q2FydERpcmVjdGl2ZSBhcyDDicK1Yn0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtDaGVja291dERpcmVjdGl2ZSBhcyDDicK1aH0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9jaGVja291dC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSBhcyDDicK1Y30gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0Rpc2hDYWxjRGlyZWN0aXZlIGFzIMOJwrVlfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuZXhwb3J0IHtPcmRlckNhcnRVc2VyRGlyZWN0aXZlIGFzIMOJwrVkfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL29yZGVyLWNhcnQtdXNlci5kaXJlY3RpdmUnO1xuZXhwb3J0IHtTZXRBbW91bnREaXJlY3RpdmUgYXMgw4nCtWd9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtTZXREaXNoQ29tbWVudERpcmVjdGl2ZSBhcyDDicK1Zn0gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZSc7Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztNQWVhLGtCQUFrQjtJQVM3QixZQUFvQixHQUFjLEVBQ2QsT0FBc0I7UUFEdEIsUUFBRyxHQUFILEdBQUcsQ0FBVztRQUNkLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFOMUMsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQU8xQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWhELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxDQUFDO0tBQ3ZFO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQy9CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxHQUFHO2lCQUNMLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztpQkFDbEMsSUFBSSxDQUNILEdBQUcsQ0FBQyxJQUFJO2dCQUNOLElBQUcsSUFBSSxDQUFD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