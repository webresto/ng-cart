import { Injectable, Directive, HostListener, Input, Output, EventEmitter, Renderer2, ElementRef, NgModule, Component, Inject, defineInjectable, inject } from '@angular/core';
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
            "comment": this.comment
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
        const { minAmount: groupMinAmount = 0, maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
        const previousAmount = this.modifiersValueTree[groupId][modifierId];
        const amount = previousAmount ? 0 : 1;
        // Total amount in group
        const groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
        if (groupAmount > groupMaxAmount) {
            console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
            this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`));
            return;
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
                template: `<div class="ng-cart-dish-calc" *ngIf="dish">
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
                            <div class="two-parts-assembled-header">
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
                styles: [`.dish{display:flex;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:flex;flex-direction:column;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;overflow:hidden;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:flex;align-items:center;justify-content:space-between;height:45px;margin-right:49px}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:flex;justify-content:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#fff;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{width:100%;height:100%;background-size:contain;background-position:center}.modifiers .modifier-dish .modifier-dish-description-box{flex-grow:1;display:flex;flex-direction:column;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:flex;justify-content:center}.two-parts-assembled .two-parts-assembled-header{display:flex;align-items:center;justify-content:center}.two-parts-assembled .two-parts-assembled-header .selected-dish{display:flex;align-items:center;justify-content:flex-end;width:50%}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box{width:100px;height:200px;overflow:hidden}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box .dish-image{width:200%;height:100%}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:30px;grid-column-gap:30px;grid-row-gap:30px;border:1px solid rgba(255,255,255,0)}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{display:flex;flex-direction:column;align-items:center;box-sizing:border-box;cursor:pointer}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1px solid #000;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{width:200px;height:200px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{width:100%;height:100%}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:flex;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:flex;align-items:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;justify-content:center;align-items:center}.modifier-checkbox.selected:after{content:url("data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")}.modifier-counter{display:flex;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}`]
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
    amountDishToAdd: [{ type: Output }]
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
    DishCalcComponent
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

export { DishCalcComponent as ɵi, AddDishToCartDirective as ɵa, AmountCartDirective as ɵb, CheckoutDirective as ɵh, DeleteFromCartDirective as ɵc, DishCalcDirective as ɵe, OrderCartUserDirective as ɵd, SetAmountDirective as ɵg, SetDishCommentDirective as ɵf, NgRestoCartService, NgRestoCartModule };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VicmVzdG8tbmctY2FydC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9hZGQtZGlzaC10by1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvZGlyZWN0aXZlcy9kZWxldGUtZnJvbS1jYXJ0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWFtb3VudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZS50cyIsIm5nOi8vQHdlYnJlc3RvL25nLWNhcnQvbGliL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L2xpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50LnRzIiwibmc6Ly9Ad2VicmVzdG8vbmctY2FydC9saWIvbmctY2FydC5tb2R1bGUudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L3B1YmxpY19hcGkudHMiLCJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0L3dlYnJlc3RvLW5nLWNhcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0LCB0aHJvd0Vycm9yLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFwLCBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBOZXRTZXJ2aWNlLFxuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL29yZGVyJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdSZXN0b0NhcnRTZXJ2aWNlIHtcbiAgY2FydElEOnN0cmluZztcbiAgY2FydDpCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgbW9kaWZpcmVzOkJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICBPcmRlckZvcm1DaGFuZ2UgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuXG4gIG1vZGlmaXJlc01lc3NhZ2U6QmVoYXZpb3JTdWJqZWN0PGFueT47XG4gIG1lc3NhZ2VzOkV2ZW50TWVzc2FnZVtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbmV0Ok5ldFNlcnZpY2UsXG4gICAgICAgICAgICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSkge1xuICAgIHRoaXMuY2FydCA9IG5ldyBCZWhhdmlvclN1YmplY3Qoe30pO1xuICAgIHRoaXMubW9kaWZpcmVzID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG4gICAgdGhpcy5tb2RpZmlyZXNNZXNzYWdlID0gbmV3IEJlaGF2aW9yU3ViamVjdChbXSk7XG5cbiAgICB0aGlzLmluaXRpYWxTdG9yYWdlKCk7XG5cbiAgICB0aGlzLm1vZGlmaXJlc01lc3NhZ2Uuc3Vic2NyaWJlKG1lc3NhZ2VzID0+IHRoaXMubWVzc2FnZXMgPSBtZXNzYWdlcyk7XG4gIH1cblxuICBpbml0aWFsU3RvcmFnZSgpIHtcbiAgICB0aGlzLmNhcnRJRCA9IHRoaXMuZ2V0Q2FydElkKCk7XG4gICAgaWYgKHRoaXMuY2FydElEKSB7XG4gICAgICB0aGlzLm5ldFxuICAgICAgICAuZ2V0KCcvY2FydD9jYXJ0SWQ9JyArIHRoaXMuY2FydElEKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICB0YXAoY2FydCA9PiB7XG4gICAgICAgICAgICBpZihjYXJ0LnN0YXRlID09ICdPUkRFUicpIHtcbiAgICAgICAgICAgICAgdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0NhcnQgaW4gb3JkZXIgc3RhdGUnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgY2FydCA9PiB0aGlzLmNhcnQubmV4dChjYXJ0LmNhcnQpLFxuICAgICAgICAgIGVycm9yID0+IHRoaXMucmVtb3ZlQ2FydElkKClcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBnZXRDYXJ0SWQoKTpzdHJpbmcge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY2FydElEJyk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0KGRhdGEpIHtcblxuICAgIGlmICh0aGlzLm1lc3NhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5tZXNzYWdlcy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChtZXNzYWdlKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubmV0LnB1dCgnL2NhcnQvYWRkJywgZGF0YSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG5cbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ3N1Y2Nlc3MnLCAnw5DCo8ORwoHDkMK/w5DCtcORwoUnLCAnw5DCkcOQwrvDkcKOw5DCtMOQwr4gw5DCtMOQwr7DkMKxw5DCsMOQwrLDkMK7w5DCtcOQwr3DkMK+IMOQwrIgw5DCusOQwr7DkcKAw5DCt8OQwrjDkMK9w5HCgycpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMIMOQwrHDkMK7w5HCjsOQwrTDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBhZGREaXNoVG9DYXJ0JChkYXRhKSB7XG5cbiAgICBpZiAodGhpcy5tZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMubWVzc2FnZXMuZm9yRWFjaChtZXNzYWdlID0+IHtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQobWVzc2FnZSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBvZihudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uZXQucHV0KCcvY2FydC9hZGQnLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChyZXM9PiB7XG4gICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgc2V0RGlzaENvdW50VG9DYXJ0KGRpc2hJZCwgYW1vdW50KSB7XG4gICAgdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Jywge1xuICAgICAgXCJkaXNoSWRcIjogZGlzaElkLFxuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0SUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnRcbiAgICB9KS5zdWJzY3JpYmUoXG4gICAgICByZXM9PiB7XG5cbiAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzLmNhcnQuY2FydElkKTtcbiAgICAgICAgdGhpcy5jYXJ0Lm5leHQocmVzLmNhcnQpO1xuICAgICAgICB0aGlzLmNhcnRJRCA9IHJlcy5jYXJ0LmNhcnRJZDtcblxuICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZSgnc3VjY2VzcycsICfDkMKjw5HCgcOQwr/DkMK1w5HChScsICfDkMKYw5DCt8OQwrzDkMK1w5DCvcOQwrXDkMK9w5DCviDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgICk7Ki9cblxuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdlcnJvcicsICfDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAnLCAnw5DCncOQwrUgw5HCg8OQwrTDkMKww5DCu8OQwr7DkcKBw5HCjCDDkMK4w5DCt8OQwrzDkMK1w5DCvcOQwrjDkcKCw5HCjCDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+JylcbiAgICAgICAgICkqL1xuICAgICAgfSk7XG4gIH1cblxuICBzZXREaXNoQ29tbWVudChkaXNoSWQsIGNvbW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NhcnQvc2V0Y29tbWVudCcsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnRcbiAgICB9KS5waXBlKHRhcChcbiAgICAgIHJlcz0+IHtcblxuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuXG4gICAgICB9LCBlcnJvciA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwrjDkMK3w5DCvMOQwrXDkMK9w5DCuMORwoLDkcKMIMOQwrrDkMK+w5DCvMOQwrXDkMK9w5HCgsOQwrDDkcKAw5DCuMOQwrknKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKSlcblxuICB9XG5cbiAgcmVtb3ZlRGlzaEZyb21DYXJ0JChkaXNoSWQsIGFtb3VudCkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSlcbiAgICAgIC5waXBlKHRhcChyZXMgPT4ge1xuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgfSkpO1xuXG4gIH1cblxuICByZW1vdmVEaXNoRnJvbUNhcnQoZGlzaElkLCBhbW91bnQpIHtcbiAgICB0aGlzLm5ldC5wdXQoJy9jYXJ0L3JlbW92ZScsIHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJZCxcbiAgICAgIFwiY2FydElkXCI6IHRoaXMuY2FydElELFxuICAgICAgXCJhbW91bnRcIjogYW1vdW50XG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT4ge1xuXG4gICAgICAgIHRoaXMuc2V0Q2FydElkKHJlcy5jYXJ0LmNhcnRJZCk7XG4gICAgICAgIHRoaXMuY2FydC5uZXh0KHJlcy5jYXJ0KTtcbiAgICAgICAgdGhpcy5jYXJ0SUQgPSByZXMuY2FydC5jYXJ0SWQ7XG4gICAgICAgIC8qdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpHDkMK7w5HCjsOQwrTDkMK+IMORwoPDkcKBw5DCv8OQwrXDkcKIw5DCvcOQwr4gw5HCg8OQwrTDkMKww5DCu8OQwrXDkMK9w5DCvicpXG4gICAgICAgICApOyovXG5cbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMORwoPDkMK0w5DCsMOQwrvDkMK4w5HCgsORwowgw5DCscOQwrvDkcKOw5DCtMOQwr4nKVxuICAgICAgICAgKSovXG4gICAgICB9KTtcblxuICB9XG5cbiAgY2hlY2tvdXRDYXJ0KGRhdGEpIHtcbiAgICBsZXQgb3JkZXI6T3JkZXIgPSB7XG4gICAgICBjYXJ0SWQ6IHRoaXMuY2FydElELFxuICAgICAgYWRkcmVzczoge1xuICAgICAgICBzdHJlZXRJZDogZGF0YS5zdHJlZXQuaWQsXG4gICAgICAgIGhvbWU6IGRhdGEuaG91c2UsXG4gICAgICAgIGhvdXNpbmc6IGRhdGEuaG91c2luZyxcbiAgICAgICAgLy8gaW5kZXg6IFwiMTI3OFwiLFxuICAgICAgICBlbnRyYW5jZTogZGF0YS5lbnRyYW5jZSxcbiAgICAgICAgZmxvb3I6IGRhdGEuZmxvb3IsXG4gICAgICAgIGFwYXJ0bWVudDogZGF0YS5hcGFydG1lbnRcbiAgICAgIH0sXG5cbiAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgIHBob25lOiBkYXRhLnBob25lLFxuICAgICAgICBuYW1lOiBkYXRhLm5hbWUsXG4gICAgICAgIG1haWw6IGRhdGEuZW1haWwgfHwgdW5kZWZpbmVkXG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcy5vcmRlckNhcnQob3JkZXIpO1xuXG4gIH1cblxuICBvcmRlckNhcnQoZGF0YSkge1xuICAgIHJldHVybiB0aGlzLm5ldC5wb3N0KCcvb3JkZXInLCBkYXRhKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChcbiAgICAgICAgICByZXN1bHQgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQocmVzdWx0LmNhcnQuY2FydElkKTtcbiAgICAgICAgICAgIHRoaXMuY2FydC5uZXh0KHJlc3VsdC5jYXJ0KTtcbiAgICAgICAgICAgIHRoaXMuY2FydElEID0gcmVzdWx0LmNhcnQuY2FydElkO1xuICAgICAgICAgICAgLyp0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKCdzdWNjZXNzJywgJ8OQwqPDkcKBw5DCv8OQwrXDkcKFJywgJ8OQwpfDkMKww5DCusOQwrDDkMK3IMORwoPDkMK/w5DCtcORwojDkMK9w5DCviDDkMK+w5HChMOQwr7DkcKAw5DCvMOQwrvDkMK1w5DCvScpXG4gICAgICAgICAgICAgKTsqL1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLDkMKew5HCiMOQwrjDkMKxw5DCusOQwrAgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK7w5DCtcOQwr3DkMK4w5HCjyFcIiwgZXJyb3IpO1xuICAgICAgICAgICAgaWYgKGVycm9yLmVycm9yICYmIGVycm9yLmVycm9yLmNhcnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgICB0aGlzLmNhcnQubmV4dChlcnJvci5lcnJvci5jYXJ0KTtcbiAgICAgICAgICAgICAgdGhpcy5jYXJ0SUQgPSBlcnJvci5lcnJvci5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qaWYgKGVycm9yLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShlcnJvci5tZXNzYWdlLnR5cGUsIGVycm9yLm1lc3NhZ2UudGl0bGUsIGVycm9yLm1lc3NhZ2UuYm9keSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoJ2Vycm9yJywgJ8OQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsCcsICfDkMKdw5DCtSDDkcKDw5DCtMOQwrDDkMK7w5DCvsORwoHDkcKMIMOQwr7DkcKEw5DCvsORwoDDkMK8w5DCuMORwoLDkcKMIMOQwrfDkMKww5DCusOQwrDDkMK3JylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgICAgKTtcbiAgfVxuXG4gIGNoZWNrU3RyZWV0VjIoZGF0YSk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5uZXQucG9zdCgnL2NoZWNrJywgZGF0YSlcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoXG4gICAgICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FydElkKHJlc3VsdC5jYXJ0LmNhcnRJZCk7XG4gICAgICAgICAgICB0aGlzLmNhcnQubmV4dChyZXN1bHQuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IHJlc3VsdC5jYXJ0LmNhcnRJZDtcbiAgICAgICAgICAgIC8qaWYgKHJlc3VsdC5tZXNzYWdlKSB7XG4gICAgICAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICByZXN1bHQubWVzc2FnZS50eXBlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLnRpdGxlLFxuICAgICAgICAgICAgIHJlc3VsdC5tZXNzYWdlLmJvZHlcbiAgICAgICAgICAgICApXG4gICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICB9LFxuICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgLy90aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIC8vbmV3IEV2ZW50TWVzc2FnZSgnZXJyb3InLCAnw5DCnsORwojDkMK4w5DCscOQwrrDkMKwJywgJ8OQwp3DkMK1IMORwoPDkMK0w5DCsMOQwrvDkMK+w5HCgcORwowgw5DCvsORwoTDkMK+w5HCgMOQwrzDkMK4w5HCgsORwowgw5DCt8OQwrDDkMK6w5DCsMOQwrcnKVxuICAgICAgICAgICAgLy8pXG4gICAgICAgICAgfVxuICAgICAgICApXG4gICAgICApO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoZGF0YSk6dm9pZCB7XG5cbiAgICB0aGlzLm5ldC5wb3N0KCcvY2hlY2snLCBkYXRhKS5zdWJzY3JpYmUoXG4gICAgICByZXMgPT4ge1xuICAgICAgICB0aGlzLnNldENhcnRJZChyZXMuY2FydC5jYXJ0SWQpO1xuICAgICAgICB0aGlzLmNhcnQubmV4dChyZXMuY2FydCk7XG4gICAgICAgIHRoaXMuY2FydElEID0gcmVzLmNhcnQuY2FydElkO1xuICAgICAgICBpZiAocmVzLm1lc3NhZ2UpIHtcbiAgICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UocmVzLm1lc3NhZ2UudHlwZSwgcmVzLm1lc3NhZ2UudGl0bGUsIHJlcy5tZXNzYWdlLmJvZHkpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoZXJyb3IuZXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3IuZXJyb3IuY2FydCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDYXJ0SWQoZXJyb3IuZXJyb3IuY2FydC5jYXJ0SWQpO1xuICAgICAgICAgICAgdGhpcy5jYXJ0Lm5leHQoZXJyb3IuZXJyb3IuY2FydCk7XG4gICAgICAgICAgICB0aGlzLmNhcnRJRCA9IGVycm9yLmVycm9yLmNhcnQuY2FydElkO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvKnRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKGVycm9yLmVycm9yLm1lc3NhZ2UudHlwZSwgZXJyb3IuZXJyb3IubWVzc2FnZS50aXRsZSwgZXJyb3IuZXJyb3IubWVzc2FnZS5ib2R5KVxuICAgICAgICAgICApOyovXG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gIH1cblxuICBzZXRDYXJ0SWQoY2FydElEKSB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NhcnRJRCcsIGNhcnRJRCk7XG4gIH1cbiAgcmVtb3ZlQ2FydElkKCkge1xuICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdjYXJ0SUQnKTtcbiAgfVxuXG4gIHVzZXJDYXJ0KCk6T2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5jYXJ0O1xuICB9XG5cbiAgc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZXM/OkV2ZW50TWVzc2FnZVtdKTp2b2lkIHtcbiAgICB0aGlzLm1vZGlmaXJlcy5uZXh0KG1vZGlmaXJlcyk7XG4gICAgaWYgKG1lc3NhZ2VzKSB0aGlzLm1vZGlmaXJlc01lc3NhZ2UubmV4dChtZXNzYWdlcyk7XG4gIH1cblxuICBnZXRNb2RpZmlyZXMoKTpPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLm1vZGlmaXJlcztcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSAsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWRkVG9DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQWRkRGlzaFRvQ2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDtcbiAgbW9kaWZpcmVzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5nZXRNb2RpZmlyZXMoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5tb2RpZmlyZXMgPSByZXMpO1xuXG4gIH1cblxuXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuICBASW5wdXQoKSBhbW91bnREaXNoOmFueTtcbiAgQElucHV0KCkgY29tbWVudDpzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGxvYWRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5hZGREaXNoVG9DYXJ0KHRoaXMuZGlzaC5pZCwgdGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcHJpdmF0ZSBhZGREaXNoVG9DYXJ0KGRpc2hJRCwgYW1vdW50KSB7XG5cbiAgICBsZXQgZGF0YSA9IHtcbiAgICAgIFwiZGlzaElkXCI6IGRpc2hJRCxcbiAgICAgIFwiYW1vdW50XCI6IGFtb3VudCxcbiAgICAgIFwiY2FydElkXCI6IHVuZGVmaW5lZCxcbiAgICAgIFwibW9kaWZpZXJzXCI6IHRoaXMubW9kaWZpcmVzLFxuICAgICAgXCJjb21tZW50XCI6dGhpcy5jb21tZW50XG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNhcnQuY2FydElkKSBkYXRhLmNhcnRJZCA9IHRoaXMuY2FydC5jYXJ0SWQ7XG5cbiAgICB0aGlzLmxvYWRpbmcuZW1pdCh0cnVlKTtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5hZGREaXNoVG9DYXJ0JChkYXRhKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgXyA9PiB0aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgICAgZSA9PiB0aGlzLmVycm9yLmVtaXQoZSksXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmcuZW1pdChmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbW91bnRDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgQW1vdW50Q2FydERpcmVjdGl2ZSB7XG5cbiAgY2FydDpvYmplY3Q7XG4gIGFtb3VudDpzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcbiAgKSB7XG5cbiAgICB0aGlzLmFtb3VudCA9ICcwJzsgXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdpbm5lckhUTUwnLCB0aGlzLmFtb3VudCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICB0aGlzLmNhcnQgPSByZXM7XG4gICAgICAgIHRoaXMuYW1vdW50ID0gcmVzLmRpc2hlc0NvdW50IHx8IDA7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xuICAgICAgfSk7XG4gIH1cblxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2RlbGV0ZUZyb21DYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAudXNlckNhcnQoKVxuICAgICAgLnN1YnNjcmliZShyZXMgPT4gdGhpcy5jYXJ0ID0gcmVzKTtcbiAgfVxuXG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudERpc2g6YW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgb25DbGljaygpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnJlbW92ZURpc2hGcm9tQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbb3JkZXJDYXJ0XSdcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgb3JkZXJDYXJ0OmFueTtcbiAgY2FydDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMub3JkZXIodGhpcy5vcmRlckNhcnQudmFsdWUpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJDYXJ0LnZhbHVlKVxuICB9XG5cbiAgcHJpdmF0ZSByZXF1aXJlZEZpZWxkczpBcnJheTxzdHJpbmc+ID0gW1wibmFtZVwiLCBcInBob25lXCIsIFwic3RyZWV0XCIsIFwiaG91c2VcIl07XG4gIHByaXZhdGUgY2hlY2tlckZpZWxkczpCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHtcbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHVuZGVmaW5lZCk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTp2b2lkIHtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgICAudXNlckNhcnQoKVxuICAgICAgICAuc3Vic2NyaWJlKGNhcnQ9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuY2FydCAmJiB0aGlzLm9yZGVyQ2FydC52YWxpZCAmJiB0aGlzLmNhcnQuY2FydFRvdGFsICE9IGNhcnQuY2FydFRvdGFsICYmIGNhcnQuY2FydFRvdGFsID4gMCkge1xuICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgICAgfSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGVja2VyRmllbGRzLm5leHQodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpO1xuICAgIH0sIDEwMCk7XG5cbiAgICB0aGlzLmNoZWNrZXJGaWVsZHMuc3Vic2NyaWJlKHN0YXRlID0+IHtcbiAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICB0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snc3RyZWV0J10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLm9yZGVyQ2FydC5jb250cm9sc1snaG91c2UnXS52YWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDYXJ0LnZhbHVlLm5hbWUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lIHx8IFwiw5DCncOQwrXDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr3DkMK+XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlckNhcnQudmFsdWUucGhvbmUgPSB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSB8fCBcIjc4ODg4ODg4ODg4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vcmRlckNhcnQuY29udHJvbHNbJ2hvdXNlJ10udmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3JkZXJDYXJ0LmNvbnRyb2xzWydzdHJlZXQnXS52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5uYW1lID0gdGhpcy5vcmRlckNhcnQudmFsdWUubmFtZSB8fCBcIsOQwp3DkMK1w5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyQ2FydC52YWx1ZS5waG9uZSA9IHRoaXMub3JkZXJDYXJ0LnZhbHVlLnBob25lIHx8IFwiNzg4ODg4ODg4ODhcIjtcbiAgICAgICAgICAgICAgdGhpcy5jaGVja1N0cmVldCh0aGlzLm9yZGVyQ2FydC52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9KVxuXG5cbiAgfVxuXG5cbiAgY2hlY2tGb3JGaWVsZHMoZm9ybURpcmVjdGl2ZXM6QXJyYXk8YW55PiwgcmVxdWlyZWRGaWVsZHM6QXJyYXk8c3RyaW5nPik6Ym9vbGVhbiB7XG5cbiAgICBsZXQgZmllbGRzQXJlQXZhaWxhYmxlOm9iamVjdCA9IHt9O1xuICAgIGxldCBub0ZpZWxkczpBcnJheTxzdHJpbmc+ID0gW107XG5cblxuICAgIGZvcm1EaXJlY3RpdmVzLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICBmaWVsZHNBcmVBdmFpbGFibGVbZWxlbWVudC5uYW1lXSA9IHRydWU7XG4gICAgfSk7XG5cbiAgICByZXF1aXJlZEZpZWxkcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgaWYgKCFmaWVsZHNBcmVBdmFpbGFibGUuaGFzT3duUHJvcGVydHkoZWxlbWVudCkpIHtcbiAgICAgICAgbm9GaWVsZHMucHVzaChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChub0ZpZWxkcy5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKjIMORwoTDkMK+w5HCgMOQwrzDkcKLIMOQwr7DkcKCw5HCgcORwoPDkcKCw5HCgcOQwrLDkcKDw5HCjsORwoIgw5HCgcOQwrvDkMK1w5DCtMORwoPDkcKOw5HCicOQwrjDkMK1IMOQwr7DkMKxw5HCj8OQwrfDkMKww5HCgsOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCtSDDkMK0w5DCu8ORwo8gw5DCusOQwr7DkcKAw5HCgMOQwrXDkMK6w5HCgsOQwr3DkMK+w5DCuSDDkcKAw5DCsMOQwrHDkMK+w5HCgsORwosgw5DCvMOQwr7DkMK0w5HCg8OQwrvDkcKPIMOQwr/DkMK+w5DCu8ORwo86XCIsIG5vRmllbGRzKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG9yZGVyKGRhdGFUb1NlbmQpIHtcbiAgICBpZiAodGhpcy5jaGVja0ZvckZpZWxkcyh0aGlzLm9yZGVyQ2FydC5fZGlyZWN0aXZlcywgdGhpcy5yZXF1aXJlZEZpZWxkcykpIHtcbiAgICAgIGxldCBwYXltZW50O1xuICAgICAgbGV0IGNvbW1lbnQgPSBkYXRhVG9TZW5kLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIlxuXG4gICAgICBpZiAoZGF0YVRvU2VuZC5jYXNoKSB7XG4gICAgICAgIHBheW1lbnQgPSBcIsOQwp3DkMKww5DCu8OQwrjDkcKHw5DCvcORwovDkMK8w5DCuCDDkMK6w5HCg8ORwoDDkcKMw5DCtcORwoDDkcKDXCI7XG4gICAgICB9IGVsc2UgaWYgKGRhdGFUb1NlbmQuYmFua2NhcmQpIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCkcOQwrDDkMK9w5DCusOQwr7DkMKyw5HCgcOQwrrDkMK+w5DCuSDDkMK6w5DCsMORwoDDkcKCw5DCvsOQwrkgw5DCusORwoPDkcKAw5HCjMOQwrXDkcKAw5HCg1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF5bWVudCA9IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9XCI7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhkYXRhVG9TZW5kKTtcbiAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgICAvLyBUT0RPOiDDkcKCw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLIMOQwr3DkMKww5DCtMOQwr4gw5DCssORwovDkMK9w5DCtcORwoHDkcKCw5DCuCDDkMKyIMOQwr7DkcKCw5DCtMOQwrXDkMK7w5HCjMOQwr3DkcKLw5DCuSDDkMK8w5DCvsOQwrTDkcKDw5DCu8ORwowuXG4gICAgICAgIFwiY29tbWVudFwiOiBcIlxcbiDDkMKiw5DCuMOQwr8gw5DCvsOQwr/DkMK7w5DCsMORwoLDkcKLOlwiICsgcGF5bWVudCArIFwiXFxuw5DCmsOQwr7DkMK8w5DCtcOQwr3DkcKCw5DCsMORwoDDkMK4w5DCuTpcIiArIGNvbW1lbnQsXG4gICAgICAgIC8vIFwiZGVsaXZlcnlcIjoge1xuICAgICAgICAvLyAgIFwidHlwZVwiOiBcInN0cmluZyAoc2VsZiBvciBub3RoaW5nKVwiXG4gICAgICAgIC8vIH0sXG4gICAgICAgIFwiYWRkcmVzc1wiOiB7XG4gICAgICAgICAgLy8gXCJjaXR5XCI6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJzdHJlZXRJZFwiOiBkYXRhVG9TZW5kLnN0cmVldC5pZCxcbiAgICAgICAgICBcImhvbWVcIjogZGF0YVRvU2VuZC5ob3VzZSxcbiAgICAgICAgICBcImhvdXNpbmdcIjogZGF0YVRvU2VuZC5ob3VzaW5nLFxuICAgICAgICAgIC8vIFwiaW5kZXhcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcImRvb3JwaG9uZVwiOiBkYXRhVG9TZW5kLmRvb3JwaG9uZSxcbiAgICAgICAgICBcImVudHJhbmNlXCI6IGRhdGFUb1NlbmQuZW50cmFuY2UsXG4gICAgICAgICAgXCJmbG9vclwiOiBkYXRhVG9TZW5kLmZsb29yLFxuICAgICAgICAgIFwiYXBhcnRtZW50XCI6IGRhdGFUb1NlbmQuYXBhcnRtZW50XG4gICAgICAgIH0sXG4gICAgICAgIFwiY3VzdG9tZXJcIjoge1xuICAgICAgICAgIFwicGhvbmVcIjogJysnICsgZGF0YVRvU2VuZC5waG9uZSxcbiAgICAgICAgICBcIm1haWxcIjogZGF0YVRvU2VuZC5lbWFpbCxcbiAgICAgICAgICBcIm5hbWVcIjogZGF0YVRvU2VuZC5uYW1lXG4gICAgICAgIH0sXG4gICAgICAgIFwicGVyc29uc0NvdW50XCI6IGRhdGFUb1NlbmQucGVyc29uc0NvdW50XG4gICAgICB9O1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5vcmRlckNhcnQoZGF0YSkuc3Vic2NyaWJlKCk7XG4gICAgfSBlbHNlIHtcblxuICAgIH1cblxuXG4gIH1cblxuICBjaGVja1N0cmVldChkYXRhVG9TZW5kKSB7XG4gICAgY29uc29sZS5sb2coXCI+Pj4+XCIsZGF0YVRvU2VuZCk7XG4gICAgaWYgKHRoaXMuY2hlY2tGb3JGaWVsZHModGhpcy5vcmRlckNhcnQuX2RpcmVjdGl2ZXMsIHRoaXMucmVxdWlyZWRGaWVsZHMpKSB7XG4gICAgICBsZXQgZGF0YSA9IHtcbiAgICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgICAgXCJjb21tZW50XCI6IGRhdGFUb1NlbmQuY29tbWVudCxcbiAgICAgICAgLy8gXCJkZWxpdmVyeVwiOiB7XG4gICAgICAgIC8vICAgXCJ0eXBlXCI6IFwic3RyaW5nIChzZWxmIG9yIG5vdGhpbmcpXCJcbiAgICAgICAgLy8gfSxcbiAgICAgICAgXCJhZGRyZXNzXCI6IHtcbiAgICAgICAgICAvLyBcImNpdHlcIjogXCJzdHJpbmdcIixcbiAgICAgICAgICBcInN0cmVldElkXCI6IGRhdGFUb1NlbmQuc3RyZWV0LmlkLFxuICAgICAgICAgIFwiaG9tZVwiOiBkYXRhVG9TZW5kLmhvdXNlLFxuICAgICAgICAgIFwiaG91c2luZ1wiOiBkYXRhVG9TZW5kLmhvdXNpbmcsXG4gICAgICAgICAgLy8gXCJpbmRleFwiOiBcInN0cmluZ1wiLFxuICAgICAgICAgIFwiZG9vcnBob25lXCI6IGRhdGFUb1NlbmQuZG9vcnBob25lLFxuICAgICAgICAgIFwiZW50cmFuY2VcIjogZGF0YVRvU2VuZC5lbnRyYW5jZSxcbiAgICAgICAgICBcImZsb29yXCI6IGRhdGFUb1NlbmQuZmxvb3IsXG4gICAgICAgICAgXCJhcGFydG1lbnRcIjogZGF0YVRvU2VuZC5hcGFydG1lbnRcbiAgICAgICAgfSxcbiAgICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgICAgXCJwaG9uZVwiOiAnKycgKyBkYXRhVG9TZW5kLnBob25lLFxuICAgICAgICAgIFwibWFpbFwiOiBkYXRhVG9TZW5kLmVtYWlsLFxuICAgICAgICAgIFwibmFtZVwiOiBkYXRhVG9TZW5kLm5hbWVcbiAgICAgICAgfSxcbiAgICAgICAgXCJwZXJzb25zQ291bnRcIjogZGF0YVRvU2VuZC5wZXJzb25zQ291bnRcbiAgICAgIH07XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLmNoZWNrU3RyZWV0KGRhdGEpO1xuXG4gICAgfSBlbHNlIHtcblxuICAgIH1cbiAgfVxuXG4gIHN0cmluZ1RvTnVtYmVyKHN0cjpudW1iZXIgfCBhbnkpOm51bWJlciB7XG4gICAgY29uc29sZS5sb2codHlwZW9mIHN0cik7XG4gICAgaWYgKHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gK3N0cjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdHIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCLDkMKfw5DCsMORwoDDkMKww5DCvMOQwrXDkcKCw5HCgCBob21lIMOQwrTDkMK+w5DCu8OQwrbDkMK1w5DCvSDDkMKxw5HCi8ORwoLDkcKMIMOQwrjDkMK7w5DCuCBzdHJpbmcgw5DCuMOQwrvDkMK4IG51bWJlclwiKTtcbiAgICB9XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZXREaXNoQW1vdW50XSdcbn0pXG5leHBvcnQgY2xhc3MgU2V0QW1vdW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgYWN0aW9uOmFueTtcbiAgQElucHV0KCkgZGlzaDphbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIHRoaXMuY2hhbmdlQW1vdW50KHRoaXMuYWN0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FydDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKHJlcyA9PiB0aGlzLmNhcnQgPSByZXMpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50KGFjdGlvbikge1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb3VudFRvQ2FydChcbiAgICAgICAgICB0aGlzLmRpc2guaWQsXG4gICAgICAgICAgdGhpcy5kaXNoLmFtb3VudCArIDFcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXREaXNoQ291bnRUb0NhcnQoXG4gICAgICAgICAgdGhpcy5kaXNoLmlkLFxuICAgICAgICAgIHRoaXMuZGlzaC5hbW91bnQgLSAxXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5sb2coXCLDkMKUw5DCuMORwoDDkMK1w5DCusORwoLDkMK4w5DCssOQwrAgU2V0RGlzaEFtb3VudCDDkMK/w5DCvsOQwrvDkcKDw5HCh8OQwrjDkMK7w5DCsCDDkMK7w5DCvsOQwrbDkMK9w5DCvsOQwrUgw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrUgYWN0aW9uXCIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgfVxuXG59XG4iLCJpbXBvcnQge1xuICBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZixcbiAgSG9zdExpc3RlbmVyLCBJbnB1dCwgT3V0cHV0LCBPbkRlc3Ryb3ksXG4gIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2Rpc2hDYWxjXSdcbn0pXG5leHBvcnQgY2xhc3MgRGlzaENhbGNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHdlaWdodFRvdGFsO1xuICBhbW91bnREaXNoO1xuICBwcmljZTtcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xuICBzdGF0ZU1vZGlmaWVyczphbnkgPSB7fTtcbiAgdGVzdGNvdW50Q2FsbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOlJlbmRlcmVyMixcbiAgICAgICAgICAgICAgcHJpdmF0ZSBlbDpFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgXCJkaXNoLWNhbGN1bGF0b3JcIik7XG5cblxuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50O1xuXG4gICAgdGhpcy5hbW91bnREaXNoVG9BZGQuZW1pdCh0aGlzLmFtb3VudERpc2gpO1xuICAgIHRoaXMucHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnByaWNlLCBcImRpc2gtcHJpY2VcIik7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyRGlzaCh0aGlzLmRpc2gpO1xuICAgICAgdGhpcy5yZW5kZXIodGhpcy5kaXNoLm1vZGlmaWVycyk7XG4gICAgfSwgMTAwKTtcbiAgfVxuXG4gIHJlbmRlckRpc2goZGlzaDphbnkpIHtcbiAgICAvKlxuICAgICA8ZGl2IGNsYXNzPVwibWFpbi1pdGVtXCI+XG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLW5hbWVcIj5cbiAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tkaXNoLm5hbWV9fTwvZGl2PlxuICAgICA8L2Rpdj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlcIj5cbiAgICAgPCEtLSBpbmNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgtMSlcIj4mIzg3MjI7PC9hPlxuICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIiA+e3thbW91bnREaXNofX08L3NwYW4+XG4gICAgIDwhLS0gZGVjcmVhc2UgYnV0dG9uLS0+XG4gICAgIDxhIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fYnV0dG9uXCIgKGNsaWNrKT1cImNoYW5nZUFtb3VudGRpc2goMSlcIj4mI3gyYjs8L2E+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwid2VpZ2h0LXByaWNlXCI+XG4gICAgIHt7ZGlzaC5wcmljZSphbW91bnREaXNofX0mbmJzcDsmI3gyMGJkO1xuICAgICA8L2Rpdj5cbiAgICAgPC9kaXY+XG5cblxuICAgICAqL1xuICAgIGxldCBtYWluSXRlbSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1haW5JdGVtLCBcImRpc2gtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBtYWluSXRlbSk7XG5cbiAgICBsZXQgaXRlbU5hbWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJuYW1lXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1OYW1lKTtcblxuICAgIGxldCB0aXRsZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRpdGxlLCBcInRpdGxlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGl0bGUsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZGlzaC5uYW1lKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lLCB0aXRsZSk7XG5cbiAgICBsZXQgd2VpZ2h0RGlzaFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJkaXNoXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodERpc2hXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHREaXNoVmFsdWUgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwidmFsdWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgIHdlaWdodERpc2hWYWx1ZSxcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAodGhpcy5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDDkMKzLlwiXG4gICAgKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHREaXNoV3JhcHBlciwgd2VpZ2h0RGlzaFZhbHVlKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLnByaWNlKTtcbiAgICBsZXQgcHJpY2VEaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VEaXNoV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VEaXNoV3JhcHBlcik7XG5cbiAgICBsZXQgaXRlbVF1YW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbVF1YW50LCBcInF1YW50aXR5XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1RdWFudCk7XG5cbiAgICBsZXQgYWRkQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcIm1pbnVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYWRkQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYWRkQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKC0xKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBhZGRCdXR0b24pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY291bnRlciwgXCJxdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGNvdW50ZXIpO1xuXG4gICAgbGV0IG1pbnVzQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1pbnVzQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicGx1c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG1pbnVzQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihtaW51c0J1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgxKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHRoaXMucHJpY2UsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpXG4gICAgICApO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBtaW51c0J1dHRvbik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0VG90YWxXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInZhbHVlXCIpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbCkgLy8gVE9ETzogdG90YWwgV2VpZ2h0XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHRUb3RhbFdyYXBwZXIsIHdlaWdodFRvdGFsKTtcbiAgICB0aGlzLndlaWdodFRvdGFsID0gd2VpZ2h0VG90YWw7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB0aGlzLnByaWNlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZShkaXNoLnByaWNlKVxuICAgICk7IC8vIFRPRE86IMOQwr/DkcKAw5DCsMOQwrLDkMK4w5DCu8ORwozDkMK9w5DCviDDkcKBw5HCh8OQwrjDkcKCw5DCsMORwoLDkcKMIMORwobDkMK1w5DCvcORwoNcbiAgICBsZXQgcHJpY2VUb3RhbFdyYXBwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJwcmljZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VUb3RhbFdyYXBwZXIsIHRoaXMucHJpY2UpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlVG90YWxXcmFwcGVyKTtcbiAgfVxuXG4gIGdlbmVyYXRlUHJpY2UocHJpY2VEaXNoLCBhbW91bnQ/LCBtb2RpZmlyZXNQcmljZT8pIHtcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcbiAgICBpZiAodGhpcy5zZWxlY3RlZE1vZGlmaWVycylcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXBzID0+IHtcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbW9kWzBdLmdyb3VwSWQgPSBncm91cHMuZ3JvdXAuaWQ7XG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfSk7XG4gICAgbGV0IG1vZFN1bTpudW1iZXIgPSAwO1xuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgIG1vZFN1bSA9IG1vZFN1bSArIGVsZW1lbnQuZGlzaC5wcmljZSAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgIH0pO1xuICAgIG1vZFN1bSA9IG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaDtcbiAgICByZXR1cm4gKFxuICAgICAgcHJpY2VEaXNoICogdGhpcy5hbW91bnREaXNoICsgbW9kU3VtICsgJzxkaXYgY2xhc3M9XCJjdXJyZW5jeVwiPiZuYnNwOyYjeDIwYmQ7PC9kaXY+J1xuICAgICk7XG4gIH1cblxuICBnZW5lcmF0ZVRvdGFsV2VpZ2h0KCkge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLndlaWdodCAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSAqIDEwMDBcbiAgICB9KTtcbiAgICBtb2RTdW0gPSBwYXJzZUZsb2F0KChtb2RTdW0gKiB0aGlzLmFtb3VudERpc2gpLnRvRml4ZWQoMikpO1xuICAgIGNvbnNvbGUubG9nKG1vZFN1bSwgdGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpXG4gICAgY29uc29sZS5sb2codGhpcy5kaXNoLndlaWdodCwgdGhpcy5hbW91bnREaXNoKVxuICAgIGxldCB3ZWlnaHQgPSAodGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpICsgbW9kU3VtO1xuXG4gICAgcmV0dXJuICh3ZWlnaHQpLnRvRml4ZWQoMCkgKyBcIiDDkMKzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xuICB9XG5cbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0b3RhbFdlaWd0aERpdiwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVRvdGFsV2VpZ2h0KCkpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50ZGlzaCh2YWx1ZSkge1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPD0gMCkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTtcblxuICAgIH1cbiAgICBpZiAodGhpcy5hbW91bnREaXNoID49IDE5OSkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xuXG4gICAgfVxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCLDkMKaIMORwo3DkcKCw5DCvsOQwrzDkcKDIMOQwrHDkMK7w5HCjsOQwrTDkcKDIMOQwrzDkMK+w5DCtsOQwr3DkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCuMORwoLDkcKMOlwiXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG5cbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuXG4gICAgICBpZiAoZWxlbWVudEdyb3VwLmRpc2gpIHtcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcIsOQwp7DkMK0w5DCvcOQwr7DkcKHw5DCvcORwovDkMK1IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5HCiyDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK0w5DCtcORwoDDkMK2w5DCuMOQwrLDkMKww5HCjsORwoLDkcKBw5HCj1wiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlbGVtZW50R3JvdXBcIixlbGVtZW50R3JvdXApO1xuICAgICAgICAvL1RPRE86IGFkZCBzaW5nbGUgbW9kaWZpY2F0b3IgbG9naWNcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXG4gICAgICAgICAgZWxlbWVudEdyb3VwLmdyb3VwID8gZWxlbWVudEdyb3VwLmdyb3VwLm5hbWUgOiBcIsOQwp7DkcKIw5DCuMOQwrHDkMK6w5DCsFwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG4gICAgICAgIGxldCBtb2RBcnIgPSBlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnM7XG4gICAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGxldCBtb2RpZmlyZURpdiA9IHRoaXMubW9kaWZpcmVEaXYoZWxlbWVudCwgZWxlbWVudEdyb3VwLm1vZGlmaWVySWQpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZ3JvdXBEaXYsIG1vZGlmaXJlRGl2KTtcbiAgICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCI8cD4qIMOiwoDClCDDkMKaw5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrTDkMK+w5DCscOQwrDDkMKyw5DCu8OQwrXDkMK9w5HCi8ORwoUgw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCscOQwrvDkcKOw5DCtMOQwrAgw5DCv8ORwoDDkMK4w5DCvMOQwrXDkMK9w5HCj8OQwrXDkcKCw5HCgcORwo8gw5DCtMOQwrvDkcKPIMOQwrrDkMKww5DCtsOQwrTDkMK+w5DCuSDDkMK/w5DCvsORwoDDkcKGw5DCuMOQwrg8L3A+XCJcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XG4gICAgfVxuXG5cbiAgfVxuXG4gIGdyb3VwRGl2KG5hbWVHb3J1cCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiZ3JvdXAtbW9kaWZpcmVzLXdyYXBlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdiwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFwiXCIgKyBuYW1lR29ydXApKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgbW9kaWZpcmVEaXYoZWxlbWVudCwgZ3JvdXBJZCkge1xuICAgIGxldCBkaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiYWRkaXRpb25hbC1pdGVtXCIpO1xuICAgIHRoaXMucmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgZGl2LCBncm91cElkKTtcbiAgICByZXR1cm4gZGl2O1xuICB9XG5cbiAgcmVuZGVyT25lTW9kaWZpcmUoZWxlbWVudCwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcblxuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUnLCBlbGVtZW50KTtcbiAgICBjb25zb2xlLmluZm8oJ3JlbmRlck9uZU1vZGlmaXJlIHNlbGVjdGVkTW9kaWZpZXJzJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwp3DkMKww5DCt8OQwrLDkMKww5DCvcOQwrjDkcKPIMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCsFxuICAgIGxldCBpdGVtTmFtZURpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lRGl2LCBcIml0ZW0tbmFtZVwiKTtcblxuICAgIGxldCBsYWJlbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgIFxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGxhYmVsLCBcImZvclwiLCBlbGVtZW50Lm1vZGlmaWVySWQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWVEaXYsIGxhYmVsKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGxhYmVsLCBcImlubmVySFRNTFwiLCBlbGVtZW50LmRpc2gubmFtZSk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtTmFtZURpdik7XG5cbiAgICBsZXQgd2VpZ3RoTW9kaWZpcmVXcmFwZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwibGVmdC13ZWlnaHQtbW9kaWZpcmUtd3JhcGVyXCIpO1xuICAgIGxldCB3ZWlnaHRNb2RpZmlyZUxlZnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnemVybycpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodE1vZGlmaXJlTGVmdCwgJ2lubmVySFRNTCcsIChlbGVtZW50LmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiIMOQwrMuXCIgKyAnJyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZUxlZnQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuICAgIC8vIMOQwqDDkMK1w5DCvcOQwrTDkMK1w5HCgCDDkMKxw5DCu8OQwr7DkMK6w5DCsCDDkMK4w5DCt8OQwrzDkMK4w5DCvcOQwrXDkMK9w5DCuMORwo8gw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCsCDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwrBcbiAgICBsZXQgaXRlbVF1YW50aXR5ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIC8qIFRPRE86IMOQwr3DkcKDw5DCtsOQwr3DkMK+IMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMOQwrjDkcKCw5HCjDpcbiAgICAgw5DCtMOQwrAgMCwwLFswXSAtIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkMKyw5HCi8OQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoEgXG4gICAgIMOQwrTDkMKwIDAsMSBbMF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBXG4gICAgIMOQwrTDkMKwIDAsMSBbZD09PTFdLSDDkcKCw5DCvsOQwrvDkcKMw5DCusOQwr4gw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgSwgw5DCssOQwrrDkMK7w5HCjsORwofDkMK1w5DCvcORwovDkMK5XG5cbiAgICAgw5DCtMOQwrAgMCxuW2Q9MF0gLSDDkMK/w5DCviDDkcKDw5DCvMOQwr7DkMK7w5HCh8OQwrDDkMK9w5DCuMORwo4gMCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cbiAgICAgw5DCtMOQwrAgMCxuW2Q+MDxuXSAtIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiBkLCDDkMK6w5DCvcOQwr7DkMK/w5DCusOQwrggKy1cblxuXG5cbiAgICAgayxuIFtrPG4sZD0wXSAtIGsgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgayDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstICjDkcKHw5DCsMORwoHDkcKCw5DCvcORwovDkMK5IMORwoHDkMK7w5HCg8ORwofDkMKww5DCuSDDkMK6w5DCvsOQwrPDkMK0w5DCsCBkPTApXG4gICAgIGssbiBbazxuLDA8ZD08bl0tIGQgw5DCv8OQwr4gw5HCg8OQwrzDkMK+w5DCu8ORwofDkMKww5DCvcOQwrjDkcKOISEhIMOQwr3DkcKDw5DCtsOQwr3DkMK+IMORwofDkcKCw5DCvsOQwrHDkMKyw5HCiyDDkcKBw5HCgsOQwr7DkcKPw5DCu8OQwrAgw5HChsORwovDkcKEw5HCgMOQwrAgMSDDkMKyIMOQwrDDkMK8w5DCsMORwoPDkMK9w5HCgiwgw5DCvMOQwrDDkMK6w5HCgSBuKMOQwrHDkMK+w5DCu8ORwozDkcKIw5DCtSBuIMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwr3DkMK4w5DCsMOQwrzDkMKww5DCu8OQwr7DkcKBw5HCjCkgw5DCusOQwr3DkMK+w5DCv8OQwrrDkMK4ICstXG5cblxuXG4gICAgIGRlZmF1bHRBbW91bnQ6MFxuICAgICBoaWRlSWZEZWZhdWx0QW1vdW50OmZhbHNlIC8vw5DCn8ORwoDDkMK4w5DCt8OQwr3DkMKww5DCuiDDkcKCw5DCvsOQwrPDkMK+LCDDkcKHw5HCgsOQwr4gw5DCvcOQwrUgw5DCvcORwoPDkMK2w5DCvcOQwr4gw5DCvsORwoLDkMK+w5DCscORwoDDkMKww5DCtsOQwrDDkcKCw5HCjCDDkcKBw5DCv8OQwrjDkcKBw5DCvsOQwrogw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiwgw5DCtcORwoHDkMK7w5DCuCDDkMK4w5HChSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMORwoDDkMKww5DCssOQwr3DkMK+IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssORwoNcbiAgICAgbWF4QW1vdW50OjBcbiAgICAgbWluQW1vdW50OjBcblxuICAgICAqL1xuXG4gICAgbGV0IG1pbiA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICBsZXQgZGVmID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMOQwrLDkcKLw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrkgw5HCh8OQwrXDkMK6w5DCscOQwr7DkMK6w5HCgVxuICAgICAgICB0aGlzLnJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGZhbHNlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBtaW4gPT09IDAgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMDogLy8gMCwxIFswXS0gw5HCgsOQwr7DkMK7w5HCjMOQwrrDkMK+IMORwofDkMK1w5DCusOQwrHDkMK+w5DCusORwoFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCB0cnVlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgbWluID09PSAxICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tIMORwoLDkMK+w5DCu8ORwozDkMK6w5DCviDDkcKHw5DCtcOQwrrDkMKxw5DCvsOQwrrDkcKBLCDDkMKyw5DCusOQwrvDkcKOw5HCh8OQwrXDkMK9w5HCi8OQwrlcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcIsOQwpfDkMK9w5DCsMORwofDkMK1w5DCvcOQwrjDkMK1IMOQwr3DkMK1IMOQwr/DkMK+w5DCtMOQwrTDkMKww5DCtcORwoLDkcKBw5HCjyDDkMK9w5DCsMORwoHDkcKCw5HCgMOQwr7DkMK5w5DCusOQwrU6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kIMOQwr/DkMK+IMORwoPDkMK8w5DCvsOQwrvDkcKHw5DCsMOQwr3DkMK4w5HCjiEhISDDkMK9w5HCg8OQwrbDkMK9w5DCviDDkcKHw5HCgsOQwr7DkMKxw5DCssORwosgw5HCgcORwoLDkMK+w5HCj8OQwrvDkMKwIMORwobDkcKLw5HChMORwoDDkMKwIDEgw5DCsiDDkMKww5DCvMOQwrDDkcKDw5DCvcORwoIsIMOQwrzDkMKww5DCusORwoEgbijDkMKxw5DCvsOQwrvDkcKMw5HCiMOQwrUgbiDDkMK9w5DCtSDDkMK/w5DCvsOQwrTDkMK9w5DCuMOQwrDDkMK8w5DCsMOQwrvDkMK+w5HCgcORwowpIMOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCArLVxuICAgICAgICB0aGlzLnJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwiw5DCnsORwojDkMK4w5DCscOQwrrDkMKwIMORwoDDkMK1w5DCvcOQwrTDkMK1w5HCgMOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwLCDDkMK0w5DCu8ORwo8gw5DCt8OQwr3DkMKww5HCh8OQwrXDkMK9w5DCuMOQwrk6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGVsZW1lbnQubWF4QW1vdW50ID4gMCAmJiBlbGVtZW50Lm1pbkFtb3VudCA+IDApIHtcblxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG4gICAgLy8gw5DCoMOQwrXDkMK9w5DCtMOQwrXDkcKAIMOQwrHDkMK7w5DCvsOQwrrDkMKwIMORwoHDkcKCw5DCvsOQwrjDkMK8w5DCvsORwoHDkcKCw5DCuCDDkMK4IMOQwrLDkMK1w5HCgcOQwrAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMKwXG4gICAgLy8gbGV0IHdlaWdodFByaWNlRGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFByaWNlRGl2LCAnbW9kYWwtcHJpY2UnKTtcbiAgICAvLyBsZXQgd2VpZ2h0O1xuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC53ZWlnaHQ+MCl7XG4gICAgLy8gICB3ZWlnaHQgPSAgZWxlbWVudC5kaXNoLndlaWdodCArIFwiIMOQwrMgXCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcbiAgICAvLyBsZXQgcHJpY2U7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLnByaWNlPjApe1xuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCB3ZWlnaHRBbmRQcmljZUhUTUwgPSAod2VpZ2h0fHwnJykrKHdlaWdodCYmcHJpY2U/IHNsYXNoIDogJycpKyggcHJpY2UgfHwgJycpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWdodFByaWNlRGl2KTtcblxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwicmlnaHQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVSaWdodCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnaW5uZXJIVE1MJywgKGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIgw5DCsy5cIiArICc8ZGl2IGNsYXNzPVwic2VwYXJhdG9yXCI+PC9kaXY+Jyk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlUmlnaHQpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG5cbiAgICBsZXQgcHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJpdGVtLXByaWNlXCIpO1xuXG4gICAgbGV0IHByaWNlVmFsdWU7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC5wcmljZSA+IDApIHtcbiAgICAgIHByaWNlVmFsdWUgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIjxkaXYgY2xhc3MgPSAnY3VycmVuY3knPiZuYnNwOyYjeDIwYmQ7PC9kaXY+XCI7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHByaWNlLCBcImlubmVySFRNTFwiLCBwcmljZVZhbHVlKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHByaWNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJ6ZXJvLXByaWNlXCIpO1xuICAgIH1cblxuXG4gICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG5cbiAgfVxuXG4gIHJlbmRlckNoZWNrYm94KGVsZW1lbnQsIGlzQWN0aXZlLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XG5cbiAgICBsZXQgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShpbnB1dCwgXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwiaWRcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgdHJ1ZSk7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSAxO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMDtcblxuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0LCBcIm1vZGFsLWNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBpbnB1dCk7XG5cbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgXCJjaGFuZ2VcIiwgZSA9PiB7XG4gICAgICBpZiAodGhpcy5pZFJhZGlvQm94KGdyb3VwSWQpKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0pIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2tleV0gPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCAgIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBncm91cERpdkJsb2NrID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICBcImlucHV0XCJcbiAgICAgICAgKTtcblxuICAgICAgICBncm91cERpdkJsb2NrLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgaWYgKGVsZW1lbnQuaWQgIT0gZS50YXJnZXQuaWQpIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gZS50YXJnZXQuY2hlY2tlZDtcbiAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IDE7XG5cbiAgICAgIH1cblxuXG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG5cbiAgfVxuXG4gIHJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpIHtcblxuICAgIGxldCBzdGFydEFtb3VudDtcbiAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50ID4gMCkge1xuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5taW5BbW91bnQ7XG5cbiAgICB9XG4gICAgaWYgKHN0YXJ0QW1vdW50ID4gMCkge1xuXG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgIH1cblxuXG4gICAgbGV0IGFNaW51c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWludXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFNaW51c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhTWludXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFNaW51c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgLSAxO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdIDwgZWxlbWVudC5taW5BbW91bnRcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPT09IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc3BhbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhzcGFuLCBcIml0ZW0tcXVhbnRpdHlfX2NvdW50ZXJcIik7XG4gICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHN0YXJ0QW1vdW50O1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICBzcGFuLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICApO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBzcGFuKTtcblxuICAgIGxldCBhUGx1c0RpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGx1c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYVBsdXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBhUGx1c0Rpdik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhUGx1c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIGxldCB2YWx1ZSA9ICt0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlICsgMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+XG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICYmXG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICE9IDBcbiAgICAgIClcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWF4QW1vdW50O1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgc3BhbixcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxuICAgICAgKTtcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID4gMCkge1xuICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB0cnVlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gIH1cblxuICBzZXRNb2RpZmlyZXMoKSB7XG4gICAgbGV0IG1vZGlmaWVyc1RvU2VsZWN0ID0gW107XG5cbiAgICAvKmlmKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMubGVuZ3RoICYmICEoT2JqZWN0LnZhbHVlcyh0aGlzLnN0YXRlTW9kaWZpZXJzKSkubGVuZ3RoKSB7XG4gICAgICBtb2RpZmllcnNUb1NlbGVjdCA9IHRoaXMuc2VsZWN0ZWRNb2RpZmllcnM7XG4gICAgfSovXG5cbiAgICBsZXQgbW9kaWZpcmVzID0gW107XG5cbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBtb2RpZmllcnNUb1NlbGVjdCcsIG1vZGlmaWVyc1RvU2VsZWN0KTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcblxuICAgIGZvciAobGV0IGdyb3VwSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVycykge1xuICAgICAgZm9yIChsZXQgbW9kaWZpcmVJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW21vZGlmaXJlSWRdIHx8IG1vZGlmaWVyc1RvU2VsZWN0LmZpbmQoaXRlbSA9PiBpdGVtLm1vZGlmaWVySWQgPT0gbW9kaWZpcmVJZCkpIHtcbiAgICAgICAgICBtb2RpZmlyZXMucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpcmVJZCxcbiAgICAgICAgICAgIGFtb3VudDogdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0sXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyA9IG1vZGlmaXJlcztcblxuICAgIGlmICh0aGlzLmRpc2gubW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBtZXNzYWdlID0gW107XG5cbiAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgIGlmIChncm91cC5yZXF1aXJlZCkge1xuICAgICAgICAgIGlmICh0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RpZiA9IFtdO1xuICAgICAgICAgICAgbGV0IGxvY2FsTW9kaWYgPSB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwLm1vZGlmaWVySWRdOyAvLy5maWx0ZXIoZWxlbWVudD0+ZWxlbWVudCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IG1vZCBpbiBsb2NhbE1vZGlmKSB7XG4gICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmLmhhc093blByb3BlcnR5KG1vZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZlttb2RdKSB7XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZE1vZGlmLnB1c2gobG9jYWxNb2RpZlttb2RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1vZGlmLmxlbmd0aCA8IGdyb3VwLm1pbkFtb3VudCkge1xuICAgICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcIsOQwpLDkMK9w5DCuMOQwrzDkMKww5DCvcOQwrjDkMK1XCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgdGl0bGU6IFwiw5DCksOQwr3DkMK4w5DCvMOQwrDDkMK9w5DCuMOQwrVcIixcbiAgICAgICAgICAgICAgYm9keTogXCIgw5DCnsOQwrHDkcKPw5DCt8OQwrDDkcKCw5DCtcOQwrvDkcKMw5DCvcOQwr4gw5DCssORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkcKLIMOQwrjDkMK3IMOQwrrDkMKww5HCgsOQwrXDkMKzw5DCvsORwoDDkMK4w5DCuDogXCIgK1xuICAgICAgICAgICAgICBncm91cC5ncm91cC5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIG1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgIH1cblxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIHN0YXRlTW9kaWZpZXJzIGFmdGVyJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgfVxuXG4gIC8qIMOQwr/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkcKBw5DCvsOQwr7DkcKCw5DCssOQwrXDkcKBw5HCgsOQwrLDkMK1w5HCgiDDkMK7w5DCuCDDkMK8w5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyw5DCsSDDkMK1w5HCgcOQwrvDkMK4IDEgw5HCgsOQwr4gw5HCgMOQwrXDkMKww5DCu8OQwrjDkMK3w5HCg8OQwrXDkcKCIMOQwr/DkMK+w5DCssOQwrXDkMK0w5DCtcOQwr3DkMK4w5DCtSDDkcKAw5DCsMOQwrTDkMK4w5DCvsOQwrrDkMK9w5DCvsOQwr/DkMK6w5DCuCxcbiAgIMOQwrXDkcKBw5DCu8OQwrggw5DCvMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCscOQwr7DkMK7w5HCjMORwojDkMK1IDEgw5HCgsOQwr4gw5DCs8OQwrXDkMK9w5DCtcORwoDDkMK4w5HCgMORwoPDkMK1w5HCgiDDkMK0w5DCtcOQwrvDkMKww5DCtcORwoIgw5DCssORwovDkMKxw5DCvsORwoAgw5DCssORwoHDkMK1w5HChSDDkMK+w5HCgcORwoLDkMKww5DCu8ORwozDkMK9w5HCi8ORwoUgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiDDkMK9w5DCtSDDkMKyw5DCvsOQwrfDkMK8w5DCvsOQwrbDkMK9w5HCi8OQwrwsIMOQwrPDkMK1w5DCvcOQwrXDkcKAw5DCuMORwoDDkcKDw5DCtcORwoIgw5DCv8ORwoDDkMK1w5DCtMORwoPDkMK/w5HCgMOQwrXDkMK2w5DCtMOQwrXDkMK9w5DCuMOQwrUqL1xuXG4gIGlkUmFkaW9Cb3goZ3JvdXBJZCk6Ym9vbGVhbiB7XG4gICAgbGV0IGN1cnJlbnRHcm91cCA9IHRoaXMuZGlzaC5tb2RpZmllcnMuZmluZCh4ID0+IHgubW9kaWZpZXJJZCA9PT0gZ3JvdXBJZCk7XG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cC5taW5BbW91bnQgPT09IDEgJiYgY3VycmVudEdyb3VwLm1heEFtb3VudCA9PT0gMTtcbiAgfVxuXG4gIC8vIMOQwp/DkcKAw5DCvsOQwrLDkMK1w5HCgMORwo/DkMK1w5HCgiDDkMK8w5DCuMOQwr3DkMK4w5DCvMOQwrDDkMK7w5HCjMOQwr3DkMK+w5DCtSDDkMK6w5DCvsOQwrvDkMK4w5HCh8OQwrXDkcKBw5HCgsOQwrLDkMK+IMOQwrzDkMK+w5DCtMOQwrjDkcKEw5DCuMOQwrrDkMKww5HCgsOQwr7DkcKAw5DCvsOQwrLDkMK6w5DCvsORwoLDkMK+w5HCgMORwovDkMK1IMOQwrHDkcKLw5DCu8OQwrggw5DCssORwovDkMKxw5HCgMOQwrDDkMK9w5HCi1xuICBjaGVja01pbkFtb3VudE1vZGlmaXJlcyhncm91cElkLCBtb2RpZmlyZSkge1xuICB9XG5cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICAvL3RoaXMuZGlzaC5tb2RpZmllcnMgPVtdO1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgSG9zdExpc3RlbmVyLCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCBkZWJvdW5jZVRpbWUsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY2hlY2tvdXRdJ1xufSlcbmV4cG9ydCBjbGFzcyBDaGVja291dERpcmVjdGl2ZSB7XG5cbiAgQElucHV0KCkgY2FydFRvdGFsOmFueTtcblxuICBASW5wdXQoKSBib251c2VzOiBhbnk7XG5cbiAgQElucHV0KCkgbmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSBlbWFpbDogc3RyaW5nO1xuICBASW5wdXQoKSBwaG9uZTogc3RyaW5nO1xuICBASW5wdXQoKSBkZWxpdmVyeTogYW55O1xuICBASW5wdXQoKSBzZWxmU2VydmljZTogYW55O1xuICBASW5wdXQoKSBsb2NhdGlvbklkOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgc3RyZWV0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cmVldElkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGhvbWU6IHN0cmluZztcbiAgQElucHV0KCkgaG91c2luZzogc3RyaW5nO1xuICBASW5wdXQoKSBhcGFydG1lbnQ6IHN0cmluZztcbiAgQElucHV0KCkgZW50cmFuY2U6IHN0cmluZztcbiAgQElucHV0KCkgZG9vcnBob25lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZsb29yOiBzdHJpbmc7XG5cbiAgQElucHV0KCkgcGF5bWVudE1ldGhvZDogc3RyaW5nO1xuICBASW5wdXQoKSBwYXltZW50TWV0aG9kSWQ6IHN0cmluZztcbiAgQElucHV0KCkgcGVyc29uc0NvdW50OiBudW1iZXI7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6IHN0cmluZztcblxuICBASW5wdXQoKSBkYXRlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG5vdGlmeU1ldGhvZElkOiBzdHJpbmc7XG4gIFxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKSBpc0NoZWNraW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG5cbiAgY2FydDogYW55O1xuICBsYXN0Rm9ybUNoYW5nZUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZVxuICApIHtcblxuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC51c2VyQ2FydCgpXG4gICAgICAuc3Vic2NyaWJlKGNhcnQgPT4gdGhpcy5jYXJ0ID0gY2FydCk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB7XG4gICAgICAgICAgLy9pZigodGhpcy5sb2NhdGlvbklkIHx8IHRoaXMuc3RyZWV0SWQpICYmIHRoaXMuaG9tZSAmJiB0aGlzLnBob25lICYmIHRoaXMucHJlcGFyZVBob25lKHRoaXMucGhvbmUpLmxlbmd0aCA+IDExKSB7XG4gICAgICAgICAgaWYodGhpcy5sb2NhdGlvbklkIHx8ICh0aGlzLnN0cmVldElkIHx8IHRoaXMuc3RyZWV0KSAmJiB0aGlzLmhvbWUgfHwgdGhpcy5zZWxmU2VydmljZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgICAgLypmaWx0ZXIoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm1DaGFuZ2VLZXkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAxOiB0aGlzLmxvY2F0aW9uSWQsXG4gICAgICAgICAgICAyOiB0aGlzLnN0cmVldElkLFxuICAgICAgICAgICAgMzogdGhpcy5zdHJlZXQsXG4gICAgICAgICAgICA0OiB0aGlzLmhvbWUsXG4gICAgICAgICAgICA1OiB0aGlzLmNhcnRUb3RhbCxcbiAgICAgICAgICAgIDY6IHRoaXMuYm9udXNlcyxcbiAgICAgICAgICAgIDc6IHRoaXMuZGVsaXZlcnksXG4gICAgICAgICAgICA4OiB0aGlzLnBheW1lbnRNZXRob2RJZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYoZm9ybUNoYW5nZUtleSAhPT0gdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSkge1xuICAgICAgICAgICAgdGhpcy5sYXN0Rm9ybUNoYW5nZUtleSA9IGZvcm1DaGFuZ2VLZXk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLCovXG4gICAgICAgIGRlYm91bmNlVGltZSgxMDAwKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLmNoZWNrU3RyZWV0KCkpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIGlmKCF0aGlzLmxvY2F0aW9uSWQgJiYgISgodGhpcy5zdHJlZXRJZCB8fCB0aGlzLnN0cmVldCkgJiYgdGhpcy5ob21lKSAmJiAhdGhpcy5zZWxmU2VydmljZSkge1xuICAgICAgdGhpcy5lcnJvci5lbWl0KCfDkMKdw5HCg8OQwrbDkMK9w5DCviDDkcKDw5DCusOQwrDDkMK3w5DCsMORwoLDkcKMIMOQwrDDkMK0w5HCgMOQwrXDkcKBJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnQgfHwgXCLDkMKdw5DCtSDDkcKDw5DCusOQwrDDkMK3w5DCsMOQwr1cIjtcbiAgICBsZXQgcGF5bWVudE1ldGhvZCA9IHRoaXMucGF5bWVudE1ldGhvZCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvcOQwr5cIjtcblxuICAgIGxldCBkYXRhID0ge1xuICAgICAgXCJjYXJ0SWRcIjogdGhpcy5jYXJ0LmNhcnRJZCxcbiAgICAgIFwiY29tbWVudFwiOiBjb21tZW50LFxuICAgICAgXCJjdXN0b21lclwiOiB7XG4gICAgICAgIFwicGhvbmVcIjogdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSksXG4gICAgICAgIFwibWFpbFwiOiB0aGlzLmVtYWlsLFxuICAgICAgICBcIm5hbWVcIjogdGhpcy5uYW1lXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogK3RoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGlmKHRoaXMucGF5bWVudE1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wicGF5bWVudE1ldGhvZElkXCJdID0gdGhpcy5wYXltZW50TWV0aG9kSWQ7XG4gICAgfVxuXG4gICAgaWYodGhpcy5kYXRlKSB7XG4gICAgICBkYXRhW1wiZGF0ZVwiXSA9IHRoaXMuZGF0ZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLm5vdGlmeU1ldGhvZElkKSB7XG4gICAgICBkYXRhW1wibm90aWZ5TWV0aG9kSWRcIl0gPSB0aGlzLm5vdGlmeU1ldGhvZElkO1xuICAgIH1cblxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XG5cblxuICAgIGlmKHRoaXMuYm9udXNlcykge1xuICAgICAgZGF0YVsnYm9udXNlcyddID0gdGhpcy5ib251c2VzLm1hcChiID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBuYW1lOiBiLm5hbWUsXG4gICAgICAgICAgYW1vdW50OiBiLmFtb3VudFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cblxuICAgIGlmKHRoaXMubG9jYXRpb25JZCkge1xuICAgICAgZGF0YVtcImxvY2F0aW9uSWRcIl0gPSB0aGlzLmxvY2F0aW9uSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFbXCJhZGRyZXNzXCJdID0ge1xuICAgICAgICBcInN0cmVldElkXCI6IHRoaXMuc3RyZWV0SWQsXG4gICAgICAgIFwic3RyZWV0XCI6IHRoaXMuc3RyZWV0LFxuICAgICAgICBcImhvbWVcIjogdGhpcy5ob21lLFxuICAgICAgICBcImhvdXNpbmdcIjogdGhpcy5ob3VzaW5nLFxuICAgICAgICBcImRvb3JwaG9uZVwiOiB0aGlzLmRvb3JwaG9uZSB8fCAnJyxcbiAgICAgICAgXCJlbnRyYW5jZVwiOiB0aGlzLmVudHJhbmNlIHx8ICcnLFxuICAgICAgICBcImZsb29yXCI6IHRoaXMuZmxvb3IgfHwgJycsXG4gICAgICAgIFwiYXBhcnRtZW50XCI6IHRoaXMuYXBhcnRtZW50IHx8ICcnXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FydElkID0gdGhpcy5jYXJ0LmlkO1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5vcmRlckNhcnQoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYocmVzdWx0LmFjdGlvbiAmJiByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdCkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXN1bHQuYWN0aW9uLnBheW1lbnRSZWRpcmVjdDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdWNjZXNzLmVtaXQoY2FydElkKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5lcnJvci5lbWl0KGVycm9yKVxuICAgICAgKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLk9yZGVyRm9ybUNoYW5nZS5uZXh0KGNoYW5nZXMpO1xuICB9XG5cbiAgY2hlY2tTdHJlZXQoKSB7XG5cbiAgICAvL2lmKHRoaXMuc3RyZWV0SWQgPT0gJzAnKSByZXR1cm47XG5cbiAgICBsZXQgY29tbWVudCA9IHRoaXMuY29tbWVudCB8fCBcIsOQwp3DkMK1IMORwoPDkMK6w5DCsMOQwrfDkMKww5DCvVwiO1xuICAgIGxldCBwYXltZW50TWV0aG9kID0gdGhpcy5wYXltZW50TWV0aG9kIHx8IFwiw5DCncOQwrUgw5HCg8OQwrrDkMKww5DCt8OQwrDDkMK9w5DCvlwiO1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImNhcnRJZFwiOiB0aGlzLmNhcnQuY2FydElkLFxuICAgICAgXCJjb21tZW50XCI6IGNvbW1lbnQsXG4gICAgICBcImN1c3RvbWVyXCI6IHtcbiAgICAgICAgXCJwaG9uZVwiOiB0aGlzLnBob25lID8gdGhpcy5wcmVwYXJlUGhvbmUodGhpcy5waG9uZSkgOiBudWxsLFxuICAgICAgICBcIm1haWxcIjogdGhpcy5lbWFpbCxcbiAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZSB8fCBudWxsXG4gICAgICB9LFxuICAgICAgXCJwZXJzb25zQ291bnRcIjogK3RoaXMucGVyc29uc0NvdW50XG4gICAgfTtcblxuICAgIGRhdGFbXCJzZWxmU2VydmljZVwiXSA9IHRoaXMuc2VsZlNlcnZpY2U7XG5cbiAgICBpZih0aGlzLnBheW1lbnRNZXRob2RJZCkge1xuICAgICAgZGF0YVtcInBheW1lbnRNZXRob2RJZFwiXSA9IHRoaXMucGF5bWVudE1ldGhvZElkO1xuICAgIH1cblxuICAgIGlmKHRoaXMuZGF0ZSkge1xuICAgICAgZGF0YVtcImRhdGVcIl0gPSB0aGlzLmRhdGU7XG4gICAgfVxuXG4gICAgaWYodGhpcy5ub3RpZnlNZXRob2RJZCkge1xuICAgICAgZGF0YVtcIm5vdGlmeU1ldGhvZElkXCJdID0gdGhpcy5ub3RpZnlNZXRob2RJZDtcbiAgICB9XG5cbiAgICBpZih0aGlzLmxvY2F0aW9uSWQpIHtcbiAgICAgIGRhdGFbXCJsb2NhdGlvbklkXCJdID0gdGhpcy5sb2NhdGlvbklkO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhW1wiYWRkcmVzc1wiXSA9IHtcbiAgICAgICAgXCJzdHJlZXRJZFwiOiB0aGlzLnN0cmVldElkLFxuICAgICAgICBcInN0cmVldFwiOiB0aGlzLnN0cmVldCxcbiAgICAgICAgXCJob21lXCI6IHRoaXMuaG9tZSxcbiAgICAgICAgXCJob3VzaW5nXCI6IHRoaXMuaG91c2luZyxcbiAgICAgICAgXCJkb29ycGhvbmVcIjogdGhpcy5kb29ycGhvbmUgfHwgJycsXG4gICAgICAgIFwiZW50cmFuY2VcIjogdGhpcy5lbnRyYW5jZSB8fCAnJyxcbiAgICAgICAgXCJmbG9vclwiOiB0aGlzLmZsb29yIHx8ICcnLFxuICAgICAgICBcImFwYXJ0bWVudFwiOiB0aGlzLmFwYXJ0bWVudCB8fCAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaXNDaGVja2luZy5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2VcbiAgICAgIC5jaGVja1N0cmVldFYyKGRhdGEpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAvLygpID0+IHRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxuICAgICAgICAvL2Vycm9yID0+IHRoaXMuZXJyb3IuZW1pdChlcnJvcilcbiAgICAgICAgcmVzdWx0ID0+IHRoaXMuaXNDaGVja2luZy5lbWl0KGZhbHNlKSxcbiAgICAgICAgZXJyb3IgPT4gdGhpcy5pc0NoZWNraW5nLmVtaXQoZmFsc2UpXG4gICAgICApO1xuICB9XG5cblxuICBwcmVwYXJlUGhvbmUocGhvbmUpIHtcbiAgICBpZighcGhvbmUpIHJldHVybiAnJztcbiAgICBwaG9uZSA9ICcrJyArIHBob25lLnJlcGxhY2UoL1teMC05XS9naW0sJycpO1xuICAgIHJldHVybiBwaG9uZS5yZXBsYWNlKCcrOCcsICcrNycpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tzZXREaXNoQ29tbWVudF0nXG59KVxuZXhwb3J0IGNsYXNzIFNldERpc2hDb21tZW50RGlyZWN0aXZlIHtcbiAgQElucHV0KCkgY29tbWVudDphbnk7XG4gIEBJbnB1dCgpIGRpc2g6YW55O1xuXG4gIEBPdXRwdXQoKSBzdWNjZXNzID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpIG9uQ2xpY2soKSB7XG4gICAgdGhpcy5zZXRDb21tZW50KCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkgeyB9XG5cbiAgc2V0Q29tbWVudCgpe1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvbW1lbnQodGhpcy5kaXNoLmlkLHRoaXMuY29tbWVudCkuc3Vic2NyaWJlKFxuICAgICAgcmVzPT50aGlzLnN1Y2Nlc3MuZW1pdCh0cnVlKSxcbiAgICAgIGVycj0+dGhpcy5lcnJvci5lbWl0KGVycilcbiAgICApXG4gICAgXG5cbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2VcIjtcblxuaW1wb3J0IHtcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Rpc2gtY2FsYycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nLWNhcnQtZGlzaC1jYWxjXCIgKm5nSWY9XCJkaXNoXCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWluZ3JlZGllbnRzXCI+e3sgZGlzaC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb2RpZmllcnMuY3VzdG9tLmZpeGVkOyBlbHNlIG1vZGlmaWVyRml4ZWRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21vZGlmaWVyRml4ZWRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5jdXN0b20uZml4ZWQgYXMgbW9kaWZpZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1maXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChjaGlsZE1vZGlmaWVyLCAxLCAnY2hlY2tib3gnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgY2hpbGRNb2RpZmllci5kaXNoPy5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBjaGlsZE1vZGlmaWVyLmRpc2g/LnByaWNlIH19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllcnNcIiAqbmdJZj1cIm1vZGlmaWVycy5iYXNlTGlzdD8ubGVuZ3RoXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vZGlmaWVyIG9mIG1vZGlmaWVycy5iYXNlTGlzdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1uYW1lXCIgKm5nSWY9XCJncm91cC5uYW1lXCI+e3sgZ3JvdXAubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ib3hcIiBbbmdDbGFzc109XCJ7J3dpdGhvdXQtaW1hZ2VzJzogIW1vZGlmaWVyLmNoaWxkSW1hZ2VzSXNzZXR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFNpbmdsZSBtb2RpZmllciAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICdzaW5nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuY2hpbGRNb2RpZmllcnM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDI7IHRoZW4gdHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZSBlbHNlIGdyb3VwVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBCYXNlIGdyb3VwIG1vZGlmaWVyIHZpZXcgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1oZWFkZXJcIiAqbmdJZj1cIm1vZGlmaWVyLmdyb3VwIGFzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jaGlsZHJlblwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuaW1hZ2VzSXNzZXR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEdyb3VwIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IG1vZGlmaWVyLm1vZGlmaWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBUd28gcGFydHMgYXNzZW1ibGVkIGdyb3VwIG1vZGlmaWVyIHZpZXcgKGxpa2UgcGl6emEgZnJvbSB0d28gaGFsdmVzKSAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0d29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZC1kaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0udG90YWxBbW91bnQgPT0gMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWQtZGlzaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+w5DCksORwovDkMKxw5DCtcORwoDDkMK4w5HCgsOQwrUgw5DCv8OQwr7DkMK7w5DCvsOQwrLDkMK4w5DCvcORwoM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDoge30gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LW5hbWVcIj7DkMKSw5HCi8OQwrHDkMK1w5HCgMOQwrjDkcKCw5DCtSDDkMK7w5HCjsOQwrHDkcKLw5DCtSDDkMK0w5DCssOQwrUgw5DCv8OQwr7DkMK7w5DCvsOQwrLDkMK4w5DCvcOQwrrDkMK4PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUd29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyKGNoaWxkTW9kaWZpZXIpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF19XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY2hpbGRNb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgZGlzaC5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDDosKCwr1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+w5DCmMOQwqLDkMKew5DCk8OQwp46PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyB0b3RhbFByaWNlfX08L3NwYW4+IMOiwoLCvVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI2Rpc2hJbWFnZVRlbXBsYXRlIGxldC1kaXNoPVwiZGlzaFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiICpuZ0lmPVwiZGlzaC53ZWlnaHRcIj57eyBkaXNoLndlaWdodCAqIDEwMDAgfX0gw5DCs8ORwoA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4gw6LCgsK9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWFjdGlvbi1ib3hcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxOyBlbHNlIGNvdW50ZXJUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDaGVja2JveFRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjb3VudGVyVGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNvdW50ZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IGdyb3VwQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZVxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWF4QW1vdW50PVwiZ3JvdXBNYXhBbW91bnRcIj5cbiAgICA8bmctY29udGFpbmVyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY291bnRlclwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCAmJiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtaW51c1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCB8fCBncm91cEFtb3VudCA8PSBncm91cE1pbkFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCAtIDEsICdtaW51cycpXCJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4tPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXQgW3ZhbHVlXT1cImFtb3VudFwiIHJlYWRvbmx5ICNpbnB1dD5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCArIDEsICdwbHVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPis8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1vZGlmaWVyLWNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGFtb3VudH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ID8gMCA6IDEsICdjaGVja2JveCcpXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuYCxcbiAgc3R5bGVzOiBbYC5kaXNoe2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O3BhZGRpbmctYm90dG9tOjM0cHg7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5Nn0uZGlzaCAuZGlzaC1pbWFnZS1ib3h7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjUwcHg7aGVpZ2h0OjE3MHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7YmFja2dyb3VuZC1zaXplOjUwJX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3h7bWFyZ2luLWxlZnQ6MzRweDtoZWlnaHQ6MTcwcHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpzdHJldGNoO3BhZGRpbmc6NXB4IDAgMDtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyOHB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Y29sb3I6IzBhMDkwOX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtaW5ncmVkaWVudHN7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojMDAwO21hcmdpbi10b3A6MTVweDtvdmVyZmxvdzpoaWRkZW47ZmxleC1ncm93OjF9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLXByaWNlLWJveHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2hlaWdodDo0NXB4O21hcmdpbi1yaWdodDo0OXB4fS5kaXNoLWltYWdle3dpZHRoOjI1MHB4O2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjp0b3A7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0fS5yZXN1bHR7bWFyZ2luLXRvcDo0OXB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjRweDtsaW5lLWhlaWdodDoyOHB4O2NvbG9yOiMwYTA5MDk7dGV4dC1hbGlnbjpyaWdodH0ucmVzdWx0IC5wcmljZXttYXJnaW4tbGVmdDo3NnB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWdyb3Vwe21hcmdpbi10b3A6MjVweDtwYWRkaW5nLWJvdHRvbToyNXB4O2JvcmRlci1ib3R0b206MnB4IHNvbGlkICM5Njk2OTZ9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVye21hcmdpbi1ib3R0b206MjVweH0ubW9kaWZpZXJzIC5tb2RpZmllci1oZWFkZXIgLm1vZGlmaWVyLW5hbWV7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOX0ubW9kaWZpZXJzIC5tb2RpZmllci1oZWFkZXIgLm1vZGlmaWVyLWRlc2NyaXB0aW9ue2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6IzBhMDkwOX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoe2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjttYXJnaW4tYm90dG9tOjJweDtoZWlnaHQ6MTAwcHg7Ym94LXNpemluZzpib3JkZXItYm94fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94e3Bvc2l0aW9uOnJlbGF0aXZlO3dpZHRoOjEwMHB4O2hlaWdodDoxMDBweDtib3gtc2l6aW5nOmJvcmRlci1ib3g7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JhY2tncm91bmQtc2l6ZTo1MCU7bWFyZ2luLXJpZ2h0OjI4cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1pbWFnZS1ib3ggLmRpc2gtaW1hZ2V7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLXNpemU6Y29udGFpbjtiYWNrZ3JvdW5kLXBvc2l0aW9uOmNlbnRlcn0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveHtmbGV4LWdyb3c6MTtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3ggLm1vZGlmaWVyLWRpc2gtbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94IC5tb2RpZmllci1kaXNoLXdlaWdodHtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXRvcDoxMHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94e2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXJpZ2h0OjEwNXB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94IC56ZXJvLXByaWNle2Rpc3BsYXk6bm9uZX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWFjdGlvbi1ib3h7d2lkdGg6MTUxcHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXJ9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2h7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6ZmxleC1lbmQ7d2lkdGg6NTAlfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaDpudGgtY2hpbGQoMil7ZmxleC1kaXJlY3Rpb246cm93LXJldmVyc2V9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoOm50aC1jaGlsZCgyKSAuaW1hZ2UtYm94e2RpcmVjdGlvbjpydGx9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC5pbWFnZS1ib3h7d2lkdGg6MTAwcHg7aGVpZ2h0OjIwMHB4O292ZXJmbG93OmhpZGRlbn0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2ggLmltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoyMDAlO2hlaWdodDoxMDAlfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0e2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmciAxZnI7bWFyZ2luLXRvcDozMHB4O2dyaWQtY29sdW1uLWdhcDozMHB4O2dyaWQtcm93LWdhcDozMHB4O2JvcmRlcjoxcHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwwKX0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaHtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmNlbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3g7Y3Vyc29yOnBvaW50ZXJ9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2guc2VsZWN0ZWR7Ym9yZGVyOjFweCBzb2xpZCAjMDAwO2JvcmRlci1yYWRpdXM6MTVweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuaW1hZ2UtYm94e3dpZHRoOjIwMHB4O2hlaWdodDoyMDBweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuaW1hZ2UtYm94IC5kaXNoLWltYWdle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCV9Lm1vZGlmaWVyLWZpeGVke2JvcmRlcjoycHggc29saWQgIzc2NzY3Njtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czoxNXB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpzdHJldGNoO2hlaWdodDo0NXB4fS5tb2RpZmllci1maXhlZCAuaXRlbXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDt3aWR0aDoxNDJweDtoZWlnaHQ6NDVweDtjb2xvcjojNzY3Njc2O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmZpcnN0LWNoaWxke21hcmdpbi1sZWZ0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtLnNlbGVjdGVke2JhY2tncm91bmQ6IzBhMDkwOTtib3JkZXItcmFkaXVzOjE1cHg7Y29sb3I6I2ZmZn0ubW9kaWZpZXItZml4ZWQgLml0ZW06bm90KC5zZWxlY3RlZCl7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94e3dpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZDojZTBlMGUwO2JvcmRlci1yYWRpdXM6MTVweDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94LnNlbGVjdGVkOmFmdGVye2NvbnRlbnQ6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sOyBiYXNlNjQsIFBITjJaeUIzYVdSMGFEMGlNamdpSUdobGFXZG9kRDBpTWpnaUlIWnBaWGRDYjNnOUlqQWdNQ0F5T0NBeU9DSWdabWxzYkQwaWJtOXVaU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLUEhCaGRHZ2daRDBpVFRJZ01UTXVOVXd4TVM0ek1qTXhJREkyVERJMklESWlJSE4wY205clpUMGlZbXhoWTJzaUlITjBjbTlyWlMxM2FXUjBhRDBpTXk0MUlpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlMejRLUEM5emRtYytDZz09XCIpfS5tb2RpZmllci1jb3VudGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyOm5vbmU7d2lkdGg6MTUxcHg7aGVpZ2h0OjUwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQ6I2UwZTBlMH0ubW9kaWZpZXItY291bnRlci5kaXNhYmxlZHtvcGFjaXR5Oi4zfS5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5taW51cy5kaXNhYmxlZCwubW9kaWZpZXItY291bnRlcjpub3QoLmRpc2FibGVkKSAucGx1cy5kaXNhYmxlZHtvcGFjaXR5Oi4xNTtjdXJzb3I6ZGVmYXVsdH0ubW9kaWZpZXItY291bnRlciBpbnB1dHtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOjAgMDt3aWR0aDoxMDAlO3BhZGRpbmc6MDtoZWlnaHQ6NTBweDtsaW5lLWhlaWdodDo1MHB4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MThweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cywubW9kaWZpZXItY291bnRlciAucGx1c3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDk7cGFkZGluZzowIDMwcHg7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmhvdmVyLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmhvdmVye2NvbG9yOiMwMDB9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmFjdGl2ZSwubW9kaWZpZXItY291bnRlciAucGx1czphY3RpdmV7Y29sb3I6I2NjMDAwOX0ubW9kaWZpZXItY291bnRlciAubWludXMubG9hZGluZywubW9kaWZpZXItY291bnRlciAucGx1cy5sb2FkaW5ne29wYWNpdHk6LjJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVze2xlZnQ6MH0ubW9kaWZpZXItY291bnRlciAucGx1c3tyaWdodDowfS53aXRob3V0LWltYWdlcyAubW9kaWZpZXItZGlzaC1pbWFnZS1ib3h7aGVpZ2h0OjcwcHghaW1wb3J0YW50fS53aXRob3V0LWltYWdlcyAubW9kaWZpZXItZGlzaHtoZWlnaHQ6NzBweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpICBzZWxlY3RlZE1vZGlmaWVyczphbnk7XG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG1vZGlmaWVycyA9IHtcbiAgICBpbmRleEJ5SWQ6IHt9LFxuICAgIGN1c3RvbToge1xuICAgICAgZml4ZWQ6IG51bGxcbiAgICB9LFxuICAgIGJhc2VMaXN0OiBbXSxcbiAgfTtcblxuICB0b3RhbFByaWNlOiBudW1iZXI7XG4gIG1vZGlmaWVyc1ZhbHVlVHJlZTogYW55ID0ge307XG4gIGltYWdlVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlLFxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSxcbiAgICBASW5qZWN0KCdJbWFnZVVybCcpIGltYWdlVXJsOnN0cmluZ1xuICApIHtcbiAgICB0aGlzLmltYWdlVXJsID0gaW1hZ2VVcmw7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5tb2RpZmllcnMgPSB7XG4gICAgICBpbmRleEJ5SWQ6IHt9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGZpeGVkOiBudWxsXG4gICAgICB9LFxuICAgICAgYmFzZUxpc3Q6IFtdLFxuICAgIH07XG5cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSA9IHt9O1xuICAgIGlmKHRoaXMuZGlzaCAmJiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVyIG9mIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcbiAgICAgICAgbGV0IG1vZGlmaWVyVHlwZSA9IG51bGw7XG4gICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyO1xuICAgICAgICAvLyBDaGVjayBDdXN0b20gbW9kaWZpZXJzIChsaWtlIFBpenphIFNpemUpXG4gICAgICAgIGlmKCF0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWRcbiAgICAgICAgICAmJiAhdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGggPT0gMlxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSBtb2RpZmllci5tYXhBbW91bnRcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgUGl6emEgU2l6ZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdjdXN0b20nO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZCA9IG1vZGlmaWVyO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnQ3VzdG9tIEZpeGVkIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfSBlbHNlIGlmKG1vZGlmaWVyLmdyb3VwXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGhcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5maW5kKG0gPT4gbS5kaXNoKSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgQmFzZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdncm91cCc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdHcm91cCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYnJva2VuIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0gPSBjaGlsZE1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChtb2RpZmllci5tb2RpZmllcklkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgICAgICBpZighdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddKXtcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgaW1hZ2VzIGFuZCBzZXQgZmxhZ3MgKGltYWdlc0lzc2V0LCBjaGlsZEltYWdlc0lzc2V0KVxuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllci5tb2RpZmllcklkKTtcblxuICAgICAgfVxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRgLCB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWQpO1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxuICAgICAgLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyBiKTtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xuICB9XG5cbiAgY2hlY2tJbWFnZXNJbk1vZGlmaWVyKG1vZGlmaWVySWQpIHtcbiAgICBjb25zdCBtOiBhbnkgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmltYWdlc0lzc2V0ID0gbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmNoaWxkSW1hZ2VzSXNzZXQgPSAhIXRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXVxuICAgICAgLmNoaWxkTW9kaWZpZXJzXG4gICAgICAuZmluZCgobTogYW55KSA9PiBtICYmIG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsUHJpY2UoKSB7XG4gICAgbGV0IHRvdGFsUHJpY2UgPSB0aGlzLmRpc2gucHJpY2UgfHwgMDtcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICAgICAgaWYoYW1vdW50KSB7XG4gICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgICAgICAgaWYobW9kaWZpZXIgJiYgbW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLnByaWNlKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlICs9IG1vZGlmaWVyLmRpc2gucHJpY2UgKiBhbW91bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG90YWxQcmljZSA9IHRvdGFsUHJpY2U7XG4gICAgdGhpcy5zZXRNb2RpZmllcnMoKTtcbiAgfVxuXG4gIGdldE1vZGlmaWVyc0lkcyhtb2RpZmllcikge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cElkOiAobW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLmdyb3VwSWQpID8gbW9kaWZpZXIuZGlzaC5ncm91cElkIDogdW5kZWZpbmVkLFxuICAgICAgbW9kaWZpZXJJZDogbW9kaWZpZXIubW9kaWZpZXJJZFxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIobW9kaWZpZXI6IGFueSkge1xuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcbiAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgIGNvbnN0IGFtb3VudDogbnVtYmVyID0gcHJldmlvdXNBbW91bnQgPyAwIDogMTtcblxuICAgIC8vIFRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgIGNvbnN0IGdyb3VwQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgLSBwcmV2aW91c0Ftb3VudCArIGFtb3VudDtcbiAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XG4gICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAnw5DCnsOQwrPDkcKAw5DCsMOQwr3DkMK4w5HCh8OQwrXDkMK9w5DCuMOQwrUnLFxuICAgICAgICAgIGDDkMKcw5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMK0w5DCu8ORwo8gw5DCs8ORwoDDkcKDw5DCv8OQwr/DkcKLXG4gICAgICAgICAgICDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtIMOQwr3DkMK1IMOQwrHDkMK+w5DCu8OQwrXDkMK1ICR7Z3JvdXBNYXhBbW91bnR9YFxuICAgICAgICApXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdID0gYW1vdW50O1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xuICB9XG5cbiAgY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXI6IGFueSwgYW1vdW50OiBudW1iZXIsIG9wZXJhdGlvbjogc3RyaW5nKSB7XG4gICAgaWYoYW1vdW50IDwgMCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcbiAgICAgICAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuXG4gICAgLy8gRm9yIGNoZWNrYm94XG4gICAgaWYob3BlcmF0aW9uID09ICdjaGVja2JveCcgJiYgZ3JvdXBJZCAhPT0gJ3NpbmdsZScpIHtcbiAgICAgIC8vIElmIGl0IHdvcmsgbGlrZSByYWRpbyBidXR0b25cbiAgICAgIGlmKGdyb3VwTWluQW1vdW50IDw9IDEgJiYgZ3JvdXBNYXhBbW91bnQgPT0gMSkge1xuICAgICAgICBpZihhbW91bnQgPCBncm91cE1pbkFtb3VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgemVybyBhbW91bnQgZm9yIGFsbCBvcHRpb25zXG4gICAgICAgIGZvcihsZXQgaXRlbU1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVtpdGVtTW9kaWZpZXJJZF0gPSAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgICB9XG4gICAgICAvLyBOb3QgYWN0aW9uIG5lZWRlZCBhZnRlclxuICAgICAgaWYoYW1vdW50ID09IDApIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBHcm91cCBhbW91bnQgbGltaXRzXG4gICAgaWYoZ3JvdXBNaW5BbW91bnQgfHwgZ3JvdXBNYXhBbW91bnQpIHtcbiAgICAgIC8vIFRvdGFsIGFtb3VudCBpbiBncm91cFxuICAgICAgY29uc3QgZ3JvdXBBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCAtIHByZXZpb3VzQW1vdW50ICsgYW1vdW50O1xuXG4gICAgICBpZihncm91cEFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1pbiAke2dyb3VwTWluQW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxuICAgICAgICAgICAgJ8OQwp7DkMKzw5HCgMOQwrDDkMK9w5DCuMORwofDkMK1w5DCvcOQwrjDkMK1JyxcbiAgICAgICAgICAgIGDDkMKcw5DCsMOQwrrDkcKBw5DCuMOQwrzDkMKww5DCu8ORwozDkMK9w5DCvsOQwrUgw5DCusOQwr7DkMK7w5DCuMORwofDkMK1w5HCgcORwoLDkMKyw5DCviDDkMK+w5DCv8ORwobDkMK4w5DCuSDDkMK0w5DCu8ORwo8gw5DCs8ORwoDDkcKDw5DCv8OQwr/DkcKLXG4gICAgICAgICAgICDDkMK8w5DCvsOQwrTDkMK4w5HChMOQwrjDkMK6w5DCsMORwoLDkMK+w5HCgMOQwr7DkMKyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtIMOQwr3DkMK1IMOQwrzDkMK1w5DCvcOQwrXDkMK1ICR7Z3JvdXBNaW5BbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZ3JvdXBBbW91bnQgPiBncm91cE1heEFtb3VudCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfDkMKew5DCs8ORwoDDkMKww5DCvcOQwrjDkcKHw5DCtcOQwr3DkMK4w5DCtScsXG4gICAgICAgICAgICBgw5DCnMOQwrDDkMK6w5HCgcOQwrjDkMK8w5DCsMOQwrvDkcKMw5DCvcOQwr7DkMK1IMOQwrrDkMK+w5DCu8OQwrjDkcKHw5DCtcORwoHDkcKCw5DCssOQwr4gw5DCvsOQwr/DkcKGw5DCuMOQwrkgw5DCtMOQwrvDkcKPIMOQwrPDkcKAw5HCg8OQwr/DkMK/w5HCi1xuICAgICAgICAgICAgw5DCvMOQwr7DkMK0w5DCuMORwoTDkMK4w5DCusOQwrDDkcKCw5DCvsORwoDDkMK+w5DCsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDDkMK9w5DCtSDDkMKxw5DCvsOQwrvDkMK1w5DCtSAke2dyb3VwTWF4QW1vdW50fWBcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDSGVjayBNb2RpZmllciBhbW91bnQgbGltaXRzXG4gICAgaWYobWluQW1vdW50IHx8IG1heEFtb3VudCkge1xuICAgICAgaWYoYW1vdW50IDwgbWluQW1vdW50KSB7XG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XG4gICAgICAgICAgY2FzZSAncGx1cyc6IGFtb3VudCA9IG1pbkFtb3VudDsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWludXMnOiBhbW91bnQgPSAwOyBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoYW1vdW50ID4gbWF4QW1vdW50KSB7XG4gICAgICAgIGFtb3VudCA9IG1heEFtb3VudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXSA9IGFtb3VudDtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgfVxuXG4gIHNldE1vZGlmaWVycygpIHtcbiAgICBjb25zdCBtb2RpZmllcnNUb1NldCA9IFtdO1xuXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG4gICAgICAgIGlmKGFtb3VudCkge1xuXG4gICAgICAgICAgbW9kaWZpZXJzVG9TZXQucHVzaCh7XG4gICAgICAgICAgICBpZDogbW9kaWZpZXJJZCxcbiAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCAhPT0gJ3NpbmdsZScgPyBncm91cElkIDogdW5kZWZpbmVkXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKG1vZGlmaWVyc1RvU2V0Lmxlbmd0aCkge1xuICAgICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmllcnNUb1NldCwgW10pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrVmFsaWQoKSB7XG5cbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG5cbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcblxuICAgICAgY29uc3QgZ3JvdXBNb2RpZmllciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXTtcbiAgICAgIGlmKGdyb3VwTW9kaWZpZXIucmVxdWlyZWQpIHtcbiAgICAgICAgY29uc3QgdG90YWxBbW91bnRJbkdyb3VwID0gdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA8IGdyb3VwTW9kaWZpZXIubWluQW1vdW50KSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtaW4gYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWluQW1vdW50fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA+IGdyb3VwTW9kaWZpZXIubWF4QW1vdW50KSB7XG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtYXggYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWF4QW1vdW50fWApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAvL1xuICAgICAgLy99XG4gICAgfVxuXG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KGlzVmFsaWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFkZERpc2hUb0NhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQW1vdW50Q2FydERpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9hbW91bnQtY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGVsZXRlRnJvbUNhcnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVsZXRlLWZyb20tY2FydC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9vcmRlci1jYXJ0LXVzZXIuZGlyZWN0aXZlJztcbi8vaW1wb3J0IHsgTW9kaWZpcmVzRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL21vZGlmaXJlcy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgU2V0QW1vdW50RGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL3NldC1hbW91bnQuZGlyZWN0aXZlJztcbmltcG9ydCB7IERpc2hDYWxjRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2Rpc2gtY2FsYy5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ2hlY2tvdXREaXJlY3RpdmUgfSBmcm9tIFwiLi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZVwiO1xuaW1wb3J0IHsgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgRGlzaENhbGNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQnO1xuXG5jb25zdCBESVJFQ1RJVkVTID0gW1xuICBBZGREaXNoVG9DYXJ0RGlyZWN0aXZlLFxuICBBbW91bnRDYXJ0RGlyZWN0aXZlLFxuICBEZWxldGVGcm9tQ2FydERpcmVjdGl2ZSxcbiAgT3JkZXJDYXJ0VXNlckRpcmVjdGl2ZSxcbiAgLy9Nb2RpZmlyZXNEaXJlY3RpdmUsXG4gIERpc2hDYWxjRGlyZWN0aXZlLFxuICBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSxcbiAgU2V0QW1vdW50RGlyZWN0aXZlLFxuICBDaGVja291dERpcmVjdGl2ZSxcbl07XG5cbmNvbnN0IENPTVBPTkVOVFMgPSBbXG4gIERpc2hDYWxjQ29tcG9uZW50XG5dO1xuXG5jb25zdCBNT0RVTEVTID0gW1xuICBDb21tb25Nb2R1bGVcbl07XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtNT0RVTEVTXSxcbiAgcHJvdmlkZXJzOiBbXSxcbiAgZGVjbGFyYXRpb25zOiBbRElSRUNUSVZFUywgQ09NUE9ORU5UU10sXG4gIGV4cG9ydHM6IFtESVJFQ1RJVkVTLCBDT01QT05FTlRTXVxufSlcbmV4cG9ydCBjbGFzcyBOZ1Jlc3RvQ2FydE1vZHVsZSB7IH1cbiIsIi8qXG4gKiBQdWJsaWMgQVBJIFN1cmZhY2Ugb2YgbmctY2FydFxuICovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlJztcbmV4cG9ydCAqIGZyb20gJy4vbGliL25nLWNhcnQubW9kdWxlJztcbiIsIi8qKlxuICogR2VuZXJhdGVkIGJ1bmRsZSBpbmRleC4gRG8gbm90IGVkaXQuXG4gKi9cblxuZXhwb3J0ICogZnJvbSAnLi9wdWJsaWNfYXBpJztcblxuZXhwb3J0IHtEaXNoQ2FsY0NvbXBvbmVudCBhcyDDicK1aX0gZnJvbSAnLi9saWIvY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudCc7XG5leHBvcnQge0FkZERpc2hUb0NhcnREaXJlY3RpdmUgYXMgw4nCtWF9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUnO1xuZXhwb3J0IHtBbW91bnRDYXJ0RGlyZWN0aXZlIGFzIMOJwrVifSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2Ftb3VudC1jYXJ0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0NoZWNrb3V0RGlyZWN0aXZlIGFzIMOJwrVofSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2NoZWNrb3V0LmRpcmVjdGl2ZSc7XG5leHBvcnQge0RlbGV0ZUZyb21DYXJ0RGlyZWN0aXZlIGFzIMOJwrVjfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL2RlbGV0ZS1mcm9tLWNhcnQuZGlyZWN0aXZlJztcbmV4cG9ydCB7RGlzaENhbGNEaXJlY3RpdmUgYXMgw4nCtWV9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZSc7XG5leHBvcnQge09yZGVyQ2FydFVzZXJEaXJlY3RpdmUgYXMgw4nCtWR9IGZyb20gJy4vbGliL2RpcmVjdGl2ZXMvb3JkZXItY2FydC11c2VyLmRpcmVjdGl2ZSc7XG5leHBvcnQge1NldEFtb3VudERpcmVjdGl2ZSBhcyDDicK1Z30gZnJvbSAnLi9saWIvZGlyZWN0aXZlcy9zZXQtYW1vdW50LmRpcmVjdGl2ZSc7XG5leHBvcnQge1NldERpc2hDb21tZW50RGlyZWN0aXZlIGFzIMOJwrVmfSBmcm9tICcuL2xpYi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlJzsiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O01BZWEsa0JBQWtCO0lBUzdCLFlBQW9CLEdBQWMsRUFDZCxPQUFzQjtRQUR0QixRQUFHLEdBQUgsR0FBRyxDQUFXO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQU4xQyxvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBTzFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJ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