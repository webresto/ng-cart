/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Renderer2, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
var DishCalcDirective = /** @class */ (function () {
    function DishCalcDirective(renderer, el, cartService) {
        this.renderer = renderer;
        this.el = el;
        this.cartService = cartService;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
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
        setTimeout((/**
         * @return {?}
         */
        function () {
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
        this.renderer.listen(addButton, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        this.renderer.listen(minusButton, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
            this.selectedModifiers.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.dish.modifiers.forEach((/**
                 * @param {?} groups
                 * @return {?}
                 */
                function (groups) {
                    /** @type {?} */
                    var mod = groups.childModifiers.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.modifierId === element.id; }));
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                }));
            }));
        /** @type {?} */
        var modSum = 0;
        selected.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
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
            this.selectedModifiers.forEach((/**
             * @param {?} element
             * @return {?}
             */
            function (element) {
                _this.dish.modifiers.forEach((/**
                 * @param {?} groups
                 * @return {?}
                 */
                function (groups) {
                    /** @type {?} */
                    var mod = groups.childModifiers.filter((/**
                     * @param {?} x
                     * @return {?}
                     */
                    function (x) { return x.modifierId === element.id; }));
                    if (mod.length > 0) {
                        mod[0].groupId = groups.group.id;
                        selected.push(mod[0]);
                    }
                }));
            }));
        /** @type {?} */
        var modSum = 0;
        selected.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
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
        modifires.forEach((/**
         * @param {?} elementGroup
         * @return {?}
         */
        function (elementGroup) {
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
                modArr.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
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
        this.renderer.listen(input, "change", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
            if (_this.idRadioBox(groupId)) {
                for (var key in _this.stateModifiers[groupId]) {
                    if (_this.stateModifiers[groupId].hasOwnProperty(key)) {
                        _this.stateModifiers[groupId][key] = false;
                        // this.renderer.setProperty(input, 'checked',   true);
                    }
                }
                /** @type {?} */
                var groupDivBlock = e.target.parentElement.parentElement.parentElement.querySelectorAll("input");
                groupDivBlock.forEach((/**
                 * @param {?} element
                 * @return {?}
                 */
                function (element) {
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
        this.renderer.listen(aMinusDiv, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
        this.renderer.listen(aPlusDiv, "click", (/**
         * @param {?} e
         * @return {?}
         */
        function (e) {
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
                if (this_1.stateModifiers[groupId][modifireId] || modifiersToSelect.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.modifierId == modifireId; }))) {
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
            this.dish.modifiers.forEach((/**
             * @param {?} group
             * @return {?}
             */
            function (group) {
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
        var currentGroup = this.dish.modifiers.find((/**
         * @param {?} x
         * @return {?}
         */
        function (x) { return x.modifierId === groupId; }));
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
    /** @nocollapse */
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
export { DishCalcDirective };
if (false) {
    /** @type {?} */
    DishCalcDirective.prototype.dish;
    /** @type {?} */
    DishCalcDirective.prototype.amount;
    /** @type {?} */
    DishCalcDirective.prototype.selectedModifiers;
    /** @type {?} */
    DishCalcDirective.prototype.validate;
    /** @type {?} */
    DishCalcDirective.prototype.amountDishToAdd;
    /** @type {?} */
    DishCalcDirective.prototype.weightTotal;
    /** @type {?} */
    DishCalcDirective.prototype.amountDish;
    /** @type {?} */
    DishCalcDirective.prototype.price;
    /** @type {?} */
    DishCalcDirective.prototype.amountModifires;
    /** @type {?} */
    DishCalcDirective.prototype.stateModifiers;
    /** @type {?} */
    DishCalcDirective.prototype.testcountCall;
    /**
     * @type {?}
     * @private
     */
    DishCalcDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    DishCalcDirective.prototype.el;
    /**
     * @type {?}
     * @private
     */
    DishCalcDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0LyIsInNvdXJjZXMiOlsibGliL2RpcmVjdGl2ZXMvZGlzaC1jYWxjLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUNsQixLQUFLLEVBQUUsTUFBTSxFQUMzQixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFdEU7SUFrQkUsMkJBQW9CLFFBQWtCLEVBQ2xCLEVBQWEsRUFDYixXQUE4QjtRQUY5QixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLE9BQUUsR0FBRixFQUFFLENBQVc7UUFDYixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFadkMsYUFBUSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hELG9CQUFlLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLbEUsb0JBQWUsR0FBTyxFQUFFLENBQUM7UUFDekIsbUJBQWMsR0FBTyxFQUFFLENBQUM7SUFPeEIsQ0FBQzs7OztJQUVELG9DQUFROzs7SUFBUjtRQUFBLGlCQWNDO1FBYkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUdqRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxD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QUMsVUFBVSxLQUFLLE9BQU8sRUFBeEIsQ0FBd0IsRUFBQztRQUMxRSxPQUFPLFlBQVksQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxxRUFBcUU7Ozs7Ozs7SUFDckUsbURBQXVCOzs7Ozs7O0lBQXZCLFVBQXdCLE9BQU8sRUFBRSxRQUFRO0lBQ3pDLENBQUM7Ozs7SUFHRCx1Q0FBVzs7O0lBQVg7UUFDRSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2dCQXZxQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxZQUFZO2lCQUN2Qjs7OztnQkFSWSxTQUFTO2dCQUFFLFVBQVU7Z0JBSXpCLGtCQUFrQjs7O3VCQU94QixLQUFLO3lCQUNMLEtBQUs7b0NBQ0wsS0FBSzsyQkFDTCxNQUFNO2tDQUNOLE1BQU07O0lBZ3FCVCx3QkFBQztDQUFBLEFBenFCRCxJQXlxQkM7U0F0cUJZLGlCQUFpQjs7O0lBRTVCLGlDQUFtQjs7SUFDbkIsbUNBQXFCOztJQUNyQiw4Q0FBZ0M7O0lBQ2hDLHFDQUEyRDs7SUFDM0QsNENBQWtFOztJQUVsRSx3Q0FBWTs7SUFDWix1Q0FBVzs7SUFDWCxrQ0FBTTs7SUFDTiw0Q0FBeUI7O0lBQ3pCLDJDQUF3Qjs7SUFDeEIsMENBQWM7Ozs7O0lBRUYscUNBQTBCOzs7OztJQUMxQiwrQkFBcUI7Ozs7O0lBQ3JCLHdDQUFzQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLFxuICBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIE9uRGVzdHJveSxcbiAgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZGlzaENhbGNdJ1xufSlcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgIGRpc2g6YW55O1xuICBASW5wdXQoKSAgYW1vdW50OmFueTtcbiAgQElucHV0KCkgIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpICB2YWxpZGF0ZTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpICBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgd2VpZ2h0VG90YWw7XG4gIGFtb3VudERpc2g7XG4gIHByaWNlO1xuICBhbW91bnRNb2RpZmlyZXM6YW55ID0ge307XG4gIHN0YXRlTW9kaWZpZXJzOmFueSA9IHt9O1xuICB0ZXN0Y291bnRDYWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsOkVsZW1lbnRSZWYsXG4gICAgICAgICAgICAgIHByaXZhdGUgY2FydFNlcnZpY2U6TmdSZXN0b0NhcnRTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBcImRpc2gtY2FsY3VsYXRvclwiKTtcblxuXG4gICAgdGhpcy5hbW91bnREaXNoID0gdGhpcy5hbW91bnQ7XG5cbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5wcmljZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucHJpY2UsIFwiZGlzaC1wcmljZVwiKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJEaXNoKHRoaXMuZGlzaCk7XG4gICAgICB0aGlzLnJlbmRlcih0aGlzLmRpc2gubW9kaWZpZXJzKTtcbiAgICB9LCAxMDApO1xuICB9XG5cbiAgcmVuZGVyRGlzaChkaXNoOmFueSkge1xuICAgIC8qXG4gICAgIDxkaXYgY2xhc3M9XCJtYWluLWl0ZW1cIj5cbiAgICAgPGRpdiBjbGFzcz1cIml0ZW0tbmFtZVwiPlxuICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57e2Rpc2gubmFtZX19PC9kaXY+XG4gICAgIDwvZGl2PlxuICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1xdWFudGl0eVwiPlxuICAgICA8IS0tIGluY3JlYXNlIGJ1dHRvbi0tPlxuICAgICA8YSBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2J1dHRvblwiIChjbGljayk9XCJjaGFuZ2VBbW91bnRkaXNoKC0xKVwiPiYjODcyMjs8L2E+XG4gICAgIDxzcGFuIGNsYXNzPVwiaXRlbS1xdWFudGl0eV9fY291bnRlclwiID57e2Ftb3VudERpc2h9fTwvc3Bhbj5cbiAgICAgPCEtLSBkZWNyZWFzZSBidXR0b24tLT5cbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgxKVwiPiYjeDJiOzwvYT5cbiAgICAgPC9kaXY+XG4gICAgIDxkaXYgY2xhc3M9XCJ3ZWlnaHQtcHJpY2VcIj5cbiAgICAge3tkaXNoLnByaWNlKmFtb3VudERpc2h9fSZuYnNwOyYjeDIwYmQ7XG4gICAgIDwvZGl2PlxuICAgICA8L2Rpdj5cblxuXG4gICAgICovXG4gICAgbGV0IG1haW5JdGVtID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MobWFpbkl0ZW0sIFwiZGlzaC13cmFwZXJcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIG1haW5JdGVtKTtcblxuICAgIGxldCBpdGVtTmFtZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIm5hbWVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbU5hbWUpO1xuXG4gICAgbGV0IHRpdGxlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGl0bGUsIFwidGl0bGVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aXRsZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLm5hbWUpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbU5hbWUsIHRpdGxlKTtcblxuICAgIGxldCB3ZWlnaHREaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcIndlaWdodFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcImRpc2hcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0RGlzaFdyYXBwZXIpO1xuXG4gICAgbGV0IHdlaWdodERpc2hWYWx1ZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodERpc2hWYWx1ZSwgXCJ2YWx1ZVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgd2VpZ2h0RGlzaFZhbHVlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICh0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCkudG9GaXhlZCgwKSArIFwiINCzLlwiXG4gICAgKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHREaXNoVmFsdWUsIFwiemVyb1wiKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHREaXNoV3JhcHBlciwgd2VpZ2h0RGlzaFZhbHVlKTtcblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLnByaWNlKTtcbiAgICBsZXQgcHJpY2VEaXNoV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlRGlzaFdyYXBwZXIsIFwicHJpY2VcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInRvdGFsXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQocHJpY2VEaXNoV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VEaXNoV3JhcHBlcik7XG5cbiAgICBsZXQgaXRlbVF1YW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbVF1YW50LCBcInF1YW50aXR5XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1RdWFudCk7XG5cbiAgICBsZXQgYWRkQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYWRkQnV0dG9uLCBcIm1pbnVzXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYWRkQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYWRkQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VBbW91bnRkaXNoKC0xKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBhZGRCdXR0b24pO1xuXG4gICAgbGV0IGNvdW50ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY291bnRlciwgXCJxdWFudGl0eV9fY291bnRlclwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnQsIGNvdW50ZXIpO1xuXG4gICAgbGV0IG1pbnVzQnV0dG9uID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKG1pbnVzQnV0dG9uLCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicGx1c1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KG1pbnVzQnV0dG9uLCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihtaW51c0J1dHRvbiwgXCJjbGlja1wiLCBlID0+IHtcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgxKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHRoaXMucHJpY2UsXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpXG4gICAgICApO1xuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHdlaWdodFRvdGFsKVxuICAgIH0pO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBtaW51c0J1dHRvbik7XG5cbiAgICBsZXQgd2VpZ2h0VG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgd2VpZ2h0VG90YWxXcmFwcGVyKTtcblxuICAgIGxldCB3ZWlnaHRUb3RhbCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpZiAodGhpcy5kaXNoLndlaWdodCA9PT0gMCB8fCAhdGhpcy5kaXNoLndlaWdodCkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ6ZXJvXCIpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodFRvdGFsLCBcInZhbHVlXCIpO1xuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbCkgLy8gVE9ETzogdG90YWwgV2VpZ2h0XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh3ZWlnaHRUb3RhbFdyYXBwZXIsIHdlaWdodFRvdGFsKTtcbiAgICB0aGlzLndlaWdodFRvdGFsID0gd2VpZ2h0VG90YWw7XG5cblxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICB0aGlzLnByaWNlLFxuICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgIHRoaXMuZ2VuZXJhdGVQcmljZShkaXNoLnByaWNlKVxuICAgICk7IC8vIFRPRE86INC/0YDQsNCy0LjQu9GM0L3QviDRgdGH0LjRgtCw0YLRjCDRhtC10L3Rg1xuICAgIGxldCBwcmljZVRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlVG90YWxXcmFwcGVyLCBcInByaWNlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwidG90YWxcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZVRvdGFsV3JhcHBlciwgdGhpcy5wcmljZSk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgcHJpY2VUb3RhbFdyYXBwZXIpO1xuICB9XG5cbiAgZ2VuZXJhdGVQcmljZShwcmljZURpc2gsIGFtb3VudD8sIG1vZGlmaXJlc1ByaWNlPykge1xuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxuICAgICAgdGhpcy5zZWxlY3RlZE1vZGlmaWVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xuICAgICAgICAgIGxldCBtb2QgPSBncm91cHMuY2hpbGRNb2RpZmllcnMuZmlsdGVyKHg9PngubW9kaWZpZXJJZCA9PT0gZWxlbWVudC5pZCk7XG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcbiAgICAgICAgICAgIHNlbGVjdGVkLnB1c2gobW9kWzBdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XG4gICAgc2VsZWN0ZWQuZm9yRWFjaChlbGVtZW50ID0+IHtcblxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLnByaWNlICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgfSk7XG4gICAgbW9kU3VtID0gbW9kU3VtICogdGhpcy5hbW91bnREaXNoO1xuICAgIHJldHVybiAoXG4gICAgICBwcmljZURpc2ggKiB0aGlzLmFtb3VudERpc2ggKyBtb2RTdW0gKyAnPGRpdiBjbGFzcz1cImN1cnJlbmN5XCI+Jm5ic3A7JiN4MjBiZDs8L2Rpdj4nXG4gICAgKTtcbiAgfVxuXG4gIGdlbmVyYXRlVG90YWxXZWlnaHQoKSB7XG4gICAgbGV0IHNlbGVjdGVkID0gW107XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XG5cbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcbiAgICAgICAgICBpZiAobW9kLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH0pO1xuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gud2VpZ2h0ICogdGhpcy5hbW91bnRNb2RpZmlyZXNbZWxlbWVudC5ncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdICogMTAwMFxuICAgIH0pO1xuICAgIG1vZFN1bSA9IHBhcnNlRmxvYXQoKG1vZFN1bSAqIHRoaXMuYW1vdW50RGlzaCkudG9GaXhlZCgyKSk7XG4gICAgY29uc29sZS5sb2cobW9kU3VtLCB0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaClcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRpc2gud2VpZ2h0LCB0aGlzLmFtb3VudERpc2gpXG4gICAgbGV0IHdlaWdodCA9ICh0aGlzLmRpc2gud2VpZ2h0ICogMTAwMCAqIHRoaXMuYW1vdW50RGlzaCkgKyBtb2RTdW07XG5cbiAgICByZXR1cm4gKHdlaWdodCkudG9GaXhlZCgwKSArIFwiINCzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xuICB9XG5cbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xuXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0b3RhbFdlaWd0aERpdiwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVRvdGFsV2VpZ2h0KCkpO1xuICB9XG5cbiAgY2hhbmdlQW1vdW50ZGlzaCh2YWx1ZSkge1xuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xuICAgIGlmICh0aGlzLmFtb3VudERpc2ggPD0gMCkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTtcblxuICAgIH1cbiAgICBpZiAodGhpcy5hbW91bnREaXNoID49IDE5OSkge1xuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xuXG4gICAgfVxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxuICB9XG5cbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImg1XCIpO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCLQmiDRjdGC0L7QvNGDINCx0LvRjtC00YMg0LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMOlwiXG4gICAgICApO1xuICAgICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGgpO1xuICAgIH1cblxuXG5cbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xuXG4gICAgICBpZiAoZWxlbWVudEdyb3VwLmRpc2gpIHtcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcItCe0LTQvdC+0YfQvdGL0LUg0LzQvtC00LjRhNC40LrQsNGC0L7RgNGLINC90LUg0L/QvtC00LTQtdGA0LbQuNCy0LDRjtGC0YHRj1wiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJlbGVtZW50R3JvdXBcIixlbGVtZW50R3JvdXApO1xuICAgICAgICAvL1RPRE86IGFkZCBzaW5nbGUgbW9kaWZpY2F0b3IgbG9naWNcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXG4gICAgICAgICAgZWxlbWVudEdyb3VwLmdyb3VwID8gZWxlbWVudEdyb3VwLmdyb3VwLm5hbWUgOiBcItCe0YjQuNCx0LrQsFwiXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBncm91cERpdik7XG4gICAgICAgIGxldCBtb2RBcnIgPSBlbGVtZW50R3JvdXAuY2hpbGRNb2RpZmllcnM7XG4gICAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGxldCBtb2RpZmlyZURpdiA9IHRoaXMubW9kaWZpcmVEaXYoZWxlbWVudCwgZWxlbWVudEdyb3VwLm1vZGlmaWVySWQpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZ3JvdXBEaXYsIG1vZGlmaXJlRGl2KTtcbiAgICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgaCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcbiAgICAgICAgaCxcbiAgICAgICAgXCJpbm5lckhUTUxcIixcbiAgICAgICAgXCI8cD4qIOKAlCDQmtC+0LvQuNGH0LXRgdGC0LLQviDQtNC+0LHQsNCy0LvQtdC90YvRhSDQvtC/0YbQuNC5INCx0LvRjtC00LAg0L/RgNC40LzQtdC90Y/QtdGC0YHRjyDQtNC70Y8g0LrQsNC20LTQvtC5INC/0L7RgNGG0LjQuDwvcD5cIlxuICAgICAgKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBoKTtcbiAgICB9XG5cblxuICB9XG5cbiAgZ3JvdXBEaXYobmFtZUdvcnVwKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJncm91cC1tb2RpZmlyZXMtd3JhcGVyXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZGl2LCB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoXCJcIiArIG5hbWVHb3J1cCkpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICBtb2RpZmlyZURpdihlbGVtZW50LCBncm91cElkKSB7XG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGRpdiwgXCJhZGRpdGlvbmFsLWl0ZW1cIik7XG4gICAgdGhpcy5yZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBkaXYsIGdyb3VwSWQpO1xuICAgIHJldHVybiBkaXY7XG4gIH1cblxuICByZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBtb2RpZmlyZURpdiwgZ3JvdXBJZCkge1xuXG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZScsIGVsZW1lbnQpO1xuICAgIGNvbnNvbGUuaW5mbygncmVuZGVyT25lTW9kaWZpcmUgc2VsZWN0ZWRNb2RpZmllcnMnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcbiAgICAvLyDQoNC10L3QtNC10YAg0J3QsNC30LLQsNC90LjRjyDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0LBcbiAgICBsZXQgaXRlbU5hbWVEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZURpdiwgXCJpdGVtLW5hbWVcIik7XG5cbiAgICBsZXQgbGFiZWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICBcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZShsYWJlbCwgXCJmb3JcIiwgZWxlbWVudC5tb2RpZmllcklkKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lRGl2LCBsYWJlbCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShsYWJlbCwgXCJpbm5lckhUTUxcIiwgZWxlbWVudC5kaXNoLm5hbWUpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbU5hbWVEaXYpO1xuXG4gICAgbGV0IHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcImxlZnQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVMZWZ0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3dlaWdodCcpO1xuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlTGVmdCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZUxlZnQsICdpbm5lckhUTUwnLCAoZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDQsy5cIiArICcnKTtcblxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQod2VpZ3RoTW9kaWZpcmVXcmFwZXIsIHdlaWdodE1vZGlmaXJlTGVmdCk7XG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgd2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xuXG4gICAgLy8g0KDQtdC90LTQtdGAINCx0LvQvtC60LAg0LjQt9C80LjQvdC10L3QuNGPINC60L7Qu9C40YfQtdGB0YLQstCwINC80L7QtNC40YTQuNC60LDRgtC+0YDQsFxuICAgIGxldCBpdGVtUXVhbnRpdHkgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgLyogVE9ETzog0L3Rg9C20L3QviDQv9GA0L7QstC10YDQuNGC0Yw6XG4gICAgINC00LAgMCwwLFswXSAtINGC0L7Qu9GM0LrQviDQstGL0LrQu9GO0YfQtdC90YvQuSDRh9C10LrQsdC+0LrRgSBcbiAgICAg0LTQsCAwLDEgWzBdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YFcbiAgICAg0LTQsCAwLDEgW2Q9PT0xXS0g0YLQvtC70YzQutC+INGH0LXQutCx0L7QutGBLCDQstC60LvRjtGH0LXQvdGL0LlcblxuICAgICDQtNCwIDAsbltkPTBdIC0g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gMCDQutC90L7Qv9C60LggKy1cbiAgICAg0LTQsCAwLG5bZD4wPG5dIC0g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gZCwg0LrQvdC+0L/QutC4ICstXG5cblxuXG4gICAgIGssbiBbazxuLGQ9MF0gLSBrINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOISEhINC90YPQttC90L4g0YfRgtC+0LHQstGLINGB0YLQvtGP0LvQsCDRhtGL0YTRgNCwIGsg0LIg0LDQvNCw0YPQvdGCLCDQvNCw0LrRgSBuKNCx0L7Qu9GM0YjQtSBuINC90LUg0L/QvtC00L3QuNCw0LzQsNC70L7RgdGMKSDQutC90L7Qv9C60LggKy0gKNGH0LDRgdGC0L3Ri9C5INGB0LvRg9GH0LDQuSDQutC+0LPQtNCwIGQ9MClcbiAgICAgayxuIFtrPG4sMDxkPTxuXS0gZCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiEhISDQvdGD0LbQvdC+INGH0YLQvtCx0LLRiyDRgdGC0L7Rj9C70LAg0YbRi9GE0YDQsCAxINCyINCw0LzQsNGD0L3Rgiwg0LzQsNC60YEgbijQsdC+0LvRjNGI0LUgbiDQvdC1INC/0L7QtNC90LjQsNC80LDQu9C+0YHRjCkg0LrQvdC+0L/QutC4ICstXG5cblxuXG4gICAgIGRlZmF1bHRBbW91bnQ6MFxuICAgICBoaWRlSWZEZWZhdWx0QW1vdW50OmZhbHNlIC8v0J/RgNC40LfQvdCw0Log0YLQvtCz0L4sINGH0YLQviDQvdC1INC90YPQttC90L4g0L7RgtC+0LHRgNCw0LbQsNGC0Ywg0YHQv9C40YHQvtC6INC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyLCDQtdGB0LvQuCDQuNGFINC60L7Qu9C40YfQtdGB0YLQstC+INGA0LDQstC90L4g0LrQvtC70LjRh9C10YHRgtCy0YNcbiAgICAgbWF4QW1vdW50OjBcbiAgICAgbWluQW1vdW50OjBcblxuICAgICAqL1xuXG4gICAgbGV0IG1pbiA9IGVsZW1lbnQubWluQW1vdW50O1xuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICBsZXQgZGVmID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xuXG4gICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0g0YLQvtC70YzQutC+INCy0YvQutC70Y7Rh9C10L3Ri9C5INGH0LXQutCx0L7QutGBXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgZmFsc2UsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDEgJiYgZGVmID09PSAwOiAvLyAwLDEgWzBdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YFcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDE6IC8vIDAsMSBbZCE9MF0tINGC0L7Qu9GM0LrQviDRh9C10LrQsdC+0LrRgSwg0LLQutC70Y7Rh9C10L3Ri9C5XG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgdHJ1ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIG1pbiA9PT0gMSAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YEsINCy0LrQu9GO0YfQtdC90YvQuVxuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGVsZW1lbnQuZGlzaC5uYW1lLFxuICAgICAgICAgIFwi0JfQvdCw0YfQtdC90LjQtSDQvdC1INC/0L7QtNC00LDQtdGC0YHRjyDQvdCw0YHRgtGA0L7QudC60LU6XCIsXG4gICAgICAgICAgbWluLFxuICAgICAgICAgIG1heCxcbiAgICAgICAgICBkZWZcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOISEhINC90YPQttC90L4g0YfRgtC+0LHQstGLINGB0YLQvtGP0LvQsCDRhtGL0YTRgNCwIDEg0LIg0LDQvNCw0YPQvdGCLCDQvNCw0LrRgSBuKNCx0L7Qu9GM0YjQtSBuINC90LUg0L/QvtC00L3QuNCw0LzQsNC70L7RgdGMKSDQutC90L7Qv9C60LggKy1cbiAgICAgICAgdGhpcy5yZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcbiAgICAgICAgICBcItCe0YjQuNCx0LrQsCDRgNC10L3QtNC10YDQsCDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0LAsINC00LvRjyDQt9C90LDRh9C10L3QuNC5OlwiLFxuICAgICAgICAgIG1pbixcbiAgICAgICAgICBtYXgsXG4gICAgICAgICAgZGVmXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChlbGVtZW50Lm1heEFtb3VudCA+IDAgJiYgZWxlbWVudC5taW5BbW91bnQgPiAwKSB7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgfVxuICAgIC8vINCg0LXQvdC00LXRgCDQsdC70L7QutCwINGB0YLQvtC40LzQvtGB0YLQuCDQuCDQstC10YHQsCDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0LBcbiAgICAvLyBsZXQgd2VpZ2h0UHJpY2VEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0UHJpY2VEaXYsICdtb2RhbC1wcmljZScpO1xuICAgIC8vIGxldCB3ZWlnaHQ7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLndlaWdodD4wKXtcbiAgICAvLyAgIHdlaWdodCA9ICBlbGVtZW50LmRpc2gud2VpZ2h0ICsgXCIg0LMgXCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcbiAgICAvLyBsZXQgcHJpY2U7XG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLnByaWNlPjApe1xuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XG4gICAgLy8gfVxuICAgIC8vIGxldCB3ZWlnaHRBbmRQcmljZUhUTUwgPSAod2VpZ2h0fHwnJykrKHdlaWdodCYmcHJpY2U/IHNsYXNoIDogJycpKyggcHJpY2UgfHwgJycpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xuICAgIC8vIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHdlaWdodFByaWNlRGl2KTtcblxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIsIFwicmlnaHQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcbiAgICBsZXQgd2VpZ2h0TW9kaWZpcmVSaWdodCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XG4gICAgaWYgKGVsZW1lbnQuZGlzaC53ZWlnaHQgPT09IDAgfHwgZWxlbWVudC5kaXNoLndlaWdodCA8IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVSaWdodCwgJ3plcm8nKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnaW5uZXJIVE1MJywgKGVsZW1lbnQuZGlzaC53ZWlnaHQgKiAxMDAwKS50b0ZpeGVkKDApICsgXCIg0LMuXCIgKyAnPGRpdiBjbGFzcz1cInNlcGFyYXRvclwiPjwvZGl2PicpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChyaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZVJpZ2h0KTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyKTtcblxuXG4gICAgbGV0IHByaWNlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2UsIFwiaXRlbS1wcmljZVwiKTtcblxuICAgIGxldCBwcmljZVZhbHVlO1xuICAgIGlmIChlbGVtZW50LmRpc2gucHJpY2UgPiAwKSB7XG4gICAgICBwcmljZVZhbHVlID0gZWxlbWVudC5kaXNoLnByaWNlICsgXCI8ZGl2IGNsYXNzID0gJ2N1cnJlbmN5Jz4mbmJzcDsmI3gyMGJkOzwvZGl2PlwiO1xuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShwcmljZSwgXCJpbm5lckhUTUxcIiwgcHJpY2VWYWx1ZSk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBwcmljZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2UsIFwiemVyby1wcmljZVwiKTtcbiAgICB9XG5cblxuICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuXG4gIH1cblxuICByZW5kZXJDaGVja2JveChlbGVtZW50LCBpc0FjdGl2ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZCkge1xuXG4gICAgbGV0IGlucHV0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaW5wdXQsIFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcImlkXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XG4gICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGlucHV0LCAnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgZWxlbWVudC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMTtcblxuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IDA7XG5cbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpbnB1dCwgXCJtb2RhbC1jaGVja2JveFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgaW5wdXQpO1xuXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oaW5wdXQsIFwiY2hhbmdlXCIsIGUgPT4ge1xuICAgICAgaWYgKHRoaXMuaWRSYWRpb0JveChncm91cElkKSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtrZXldID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoaW5wdXQsICdjaGVja2VkJywgICB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZ3JvdXBEaXZCbG9jayA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgXCJpbnB1dFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgZ3JvdXBEaXZCbG9jay5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgIGlmIChlbGVtZW50LmlkICE9IGUudGFyZ2V0LmlkKSBlbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdW2UudGFyZ2V0LmlkXSA9IGUudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlLnRhcmdldC5pZF0gPSAxO1xuXG4gICAgICB9XG5cblxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG5cbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1vZGlmaXJlRGl2LCBpdGVtUXVhbnRpdHkpO1xuXG4gIH1cblxuICByZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KSB7XG5cbiAgICBsZXQgc3RhcnRBbW91bnQ7XG4gICAgaWYgKGVsZW1lbnQuZGVmYXVsdEFtb3VudCA+IDApIHtcbiAgICAgIHN0YXJ0QW1vdW50ID0gZWxlbWVudC5kZWZhdWx0QW1vdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydEFtb3VudCA9IGVsZW1lbnQubWluQW1vdW50O1xuXG4gICAgfVxuICAgIGlmIChzdGFydEFtb3VudCA+IDApIHtcblxuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICB9XG5cblxuICAgIGxldCBhTWludXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYU1pbnVzRGl2LCBcInF1YW50aXR5X19idXR0b25cIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhTWludXNEaXYsIFwiaW5uZXJIVE1MXCIsIFwiJiM4NzIyO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYU1pbnVzRGl2KTtcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihhTWludXNEaXYsIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSArdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXTtcblxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlIC0gMTtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA8IGVsZW1lbnQubWluQW1vdW50XG4gICAgICApXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBlbGVtZW50Lm1pbkFtb3VudDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHNwYW4sXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID09PSAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xuICAgIH0pO1xuXG4gICAgbGV0IHNwYW4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhbiwgXCJpdGVtLXF1YW50aXR5X19jb3VudGVyXCIpO1xuICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBzdGFydEFtb3VudDtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxuICAgICAgc3BhbixcbiAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXG4gICAgKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgc3Bhbik7XG5cbiAgICBsZXQgYVBsdXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoYVBsdXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFQbHVzRGl2LCBcImlubmVySFRNTFwiLCBcIiYjeDJiO1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYVBsdXNEaXYpO1xuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIGl0ZW1RdWFudGl0eSk7XG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYVBsdXNEaXYsIFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdmFsdWUgPSArdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXTtcbiAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSB2YWx1ZSArIDE7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPlxuICAgICAgICBlbGVtZW50Lm1heEFtb3VudCAmJlxuICAgICAgICBlbGVtZW50Lm1heEFtb3VudCAhPSAwXG4gICAgICApXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPSBlbGVtZW50Lm1heEFtb3VudDtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXG4gICAgICAgIHNwYW4sXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cbiAgICAgICk7XG4gICAgICBpZiAodGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA+IDApIHtcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQodGhpcy53ZWlnaHRUb3RhbCk7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcbiAgICB9KTtcblxuICB9XG5cbiAgc2V0TW9kaWZpcmVzKCkge1xuICAgIGxldCBtb2RpZmllcnNUb1NlbGVjdCA9IFtdO1xuXG4gICAgLyppZih0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmxlbmd0aCAmJiAhKE9iamVjdC52YWx1ZXModGhpcy5zdGF0ZU1vZGlmaWVycykpLmxlbmd0aCkge1xuICAgICAgbW9kaWZpZXJzVG9TZWxlY3QgPSB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzO1xuICAgIH0qL1xuXG4gICAgbGV0IG1vZGlmaXJlcyA9IFtdO1xuXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgbW9kaWZpZXJzVG9TZWxlY3QnLCBtb2RpZmllcnNUb1NlbGVjdCk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYmVmb3JlJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYmVmb3JlJywgdGhpcy5zZWxlY3RlZE1vZGlmaWVycyk7XG5cbiAgICBmb3IgKGxldCBncm91cElkIGluIHRoaXMuc3RhdGVNb2RpZmllcnMpIHtcbiAgICAgIGZvciAobGV0IG1vZGlmaXJlSWQgaW4gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVttb2RpZmlyZUlkXSB8fCBtb2RpZmllcnNUb1NlbGVjdC5maW5kKGl0ZW0gPT4gaXRlbS5tb2RpZmllcklkID09IG1vZGlmaXJlSWQpKSB7XG4gICAgICAgICAgbW9kaWZpcmVzLnB1c2goe1xuICAgICAgICAgICAgaWQ6IG1vZGlmaXJlSWQsXG4gICAgICAgICAgICBhbW91bnQ6IHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW21vZGlmaXJlSWRdLFxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMgPSBtb2RpZmlyZXM7XG5cbiAgICBpZiAodGhpcy5kaXNoLm1vZGlmaWVycy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgbWVzc2FnZSA9IFtdO1xuXG4gICAgICB0aGlzLmRpc2gubW9kaWZpZXJzLmZvckVhY2goZ3JvdXAgPT4ge1xuICAgICAgICBpZiAoZ3JvdXAucmVxdWlyZWQpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cC5tb2RpZmllcklkXSkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkTW9kaWYgPSBbXTtcbiAgICAgICAgICAgIGxldCBsb2NhbE1vZGlmID0gdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cC5tb2RpZmllcklkXTsgLy8uZmlsdGVyKGVsZW1lbnQ9PmVsZW1lbnQpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBtb2QgaW4gbG9jYWxNb2RpZikge1xuICAgICAgICAgICAgICBpZiAobG9jYWxNb2RpZi5oYXNPd25Qcm9wZXJ0eShtb2QpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsTW9kaWZbbW9kXSkge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRNb2RpZi5wdXNoKGxvY2FsTW9kaWZbbW9kXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRNb2RpZi5sZW5ndGggPCBncm91cC5taW5BbW91bnQpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgICB0aXRsZTogXCLQktC90LjQvNCw0L3QuNC1XCIsXG4gICAgICAgICAgICAgICAgYm9keTogXCIg0J7QsdGP0LfQsNGC0LXQu9GM0L3QviDQstGL0LHQtdGA0LjRgtC1INC80L7QtNC40YTQuNC60LDRgtC+0YDRiyDQuNC3INC60LDRgtC10LPQvtGA0LjQuDogXCIgK1xuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xuICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcbiAgICAgICAgICAgICAgdGl0bGU6IFwi0JLQvdC40LzQsNC90LjQtVwiLFxuICAgICAgICAgICAgICBib2R5OiBcIiDQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+INCy0YvQsdC10YDQuNGC0LUg0LzQvtC00LjRhNC40LrQsNGC0L7RgNGLINC40Lcg0LrQsNGC0LXQs9C+0YDQuNC4OiBcIiArXG4gICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBbXSk7XG4gICAgfVxuXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnN0YXRlTW9kaWZpZXJzKTtcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBhZnRlcicsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xuICB9XG5cbiAgLyog0L/RgNC+0LLQtdGA0Y/QtdGCINGB0L7QvtGC0LLQtdGB0YLQstC10YIg0LvQuCDQvNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LLQsSDQtdGB0LvQuCAxINGC0L4g0YDQtdCw0LvQuNC30YPQtdGCINC/0L7QstC10LTQtdC90LjQtSDRgNCw0LTQuNC+0LrQvdC+0L/QutC4LFxuICAg0LXRgdC70Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7Qu9GM0YjQtSAxINGC0L4g0LPQtdC90LXRgNC40YDRg9C10YIg0LTQtdC70LDQtdGCINCy0YvQsdC+0YAg0LLRgdC10YUg0L7RgdGC0LDQu9GM0L3Ri9GFINC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyINC90LUg0LLQvtC30LzQvtC20L3Ri9C8LCDQs9C10L3QtdGA0LjRgNGD0LXRgiDQv9GA0LXQtNGD0L/RgNC10LbQtNC10L3QuNC1Ki9cblxuICBpZFJhZGlvQm94KGdyb3VwSWQpOmJvb2xlYW4ge1xuICAgIGxldCBjdXJyZW50R3JvdXAgPSB0aGlzLmRpc2gubW9kaWZpZXJzLmZpbmQoeCA9PiB4Lm1vZGlmaWVySWQgPT09IGdyb3VwSWQpO1xuICAgIHJldHVybiBjdXJyZW50R3JvdXAubWluQW1vdW50ID09PSAxICYmIGN1cnJlbnRHcm91cC5tYXhBbW91bnQgPT09IDE7XG4gIH1cblxuICAvLyDQn9GA0L7QstC10YDRj9C10YIg0LzQuNC90LjQvNCw0LvRjNC90L7QtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QstC60L7RgtC+0YDRi9C1INCx0YvQu9C4INCy0YvQsdGA0LDQvdGLXG4gIGNoZWNrTWluQW1vdW50TW9kaWZpcmVzKGdyb3VwSWQsIG1vZGlmaXJlKSB7XG4gIH1cblxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIC8vdGhpcy5kaXNoLm1vZGlmaWVycyA9W107XG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XG4gIH1cblxufVxuIl19