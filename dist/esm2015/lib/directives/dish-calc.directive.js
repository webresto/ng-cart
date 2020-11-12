import { Directive, Input, Output, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/ng-restocart.service";
export class DishCalcDirective {
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
DishCalcDirective.ɵfac = function DishCalcDirective_Factory(t) { return new (t || DishCalcDirective)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.NgRestoCartService)); };
DishCalcDirective.ɵdir = i0.ɵɵdefineDirective({ type: DishCalcDirective, selectors: [["", "dishCalc", ""]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DishCalcDirective, [{
        type: Directive,
        args: [{
                selector: '[dishCalc]'
            }]
    }], function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.NgRestoCartService }]; }, { dish: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9kaXNoLWNhbGMuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ0ssS0FBSyxFQUFFLE1BQU0sRUFDM0IsWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDOzs7QUFNdkIsTUFBTSxPQUFPLGlCQUFpQjtJQWU1QixZQUFvQixRQUFrQixFQUNsQixFQUFhLEVBQ2IsV0FBOEI7UUFGOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQ2IsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBWnZDLGFBQVEsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoRCxvQkFBZSxHQUFxQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBS2xFLG9CQUFlLEdBQU8sRUFBRSxDQUFDO1FBQ3pCLG1CQUFjLEdBQU8sRUFBRSxDQUFDO0lBT3hCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUdqRSxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFFOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVqRCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJ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VyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDOUM7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRDs0SUFDd0k7SUFFeEksVUFBVSxDQUFDLE9BQU87UUFDaEIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxPQUFPLENBQUMsQ0FBQztRQUMzRSxPQUFPLFlBQVksQ0FBQyxTQUFTLEtBQUssQ0FBQyxJQUFJLFlBQVksQ0FBQyxTQUFTLEtBQUssQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxxRUFBcUU7SUFDckUsdUJBQXVCLENBQUMsT0FBTyxFQUFFLFFBQVE7SUFDekMsQ0FBQztJQUdELFdBQVc7UUFDVCwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7O2tGQXBxQlUsaUJBQWlCO3NEQUFqQixpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQUg3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7YUFDdkI7c0hBR1csSUFBSTtrQkFBYixLQUFLO1lBQ0ksTUFBTTtrQkFBZixLQUFLO1lBQ0ksaUJBQWlCO2tCQUExQixLQUFLO1lBQ0ssUUFBUTtrQkFBbEIsTUFBTTtZQUNJLGVBQWU7a0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLFxyXG4gIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgT25EZXN0cm95LFxyXG4gIEV2ZW50RW1pdHRlclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tkaXNoQ2FsY10nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0RpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcblxyXG4gIEBJbnB1dCgpICBkaXNoOmFueTtcclxuICBASW5wdXQoKSAgYW1vdW50OmFueTtcclxuICBASW5wdXQoKSAgc2VsZWN0ZWRNb2RpZmllcnM6YW55O1xyXG4gIEBPdXRwdXQoKSAgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpICBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHdlaWdodFRvdGFsO1xyXG4gIGFtb3VudERpc2g7XHJcbiAgcHJpY2U7XHJcbiAgYW1vdW50TW9kaWZpcmVzOmFueSA9IHt9O1xyXG4gIHN0YXRlTW9kaWZpZXJzOmFueSA9IHt9O1xyXG4gIHRlc3Rjb3VudENhbGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6UmVuZGVyZXIyLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgZWw6RWxlbWVudFJlZixcclxuICAgICAgICAgICAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIFwiZGlzaC1jYWxjdWxhdG9yXCIpO1xyXG5cclxuXHJcbiAgICB0aGlzLmFtb3VudERpc2ggPSB0aGlzLmFtb3VudDtcclxuXHJcbiAgICB0aGlzLmFtb3VudERpc2hUb0FkZC5lbWl0KHRoaXMuYW1vdW50RGlzaCk7XHJcbiAgICB0aGlzLnByaWNlID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnByaWNlLCBcImRpc2gtcHJpY2VcIik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMucmVuZGVyRGlzaCh0aGlzLmRpc2gpO1xyXG4gICAgICB0aGlzLnJlbmRlcih0aGlzLmRpc2gubW9kaWZpZXJzKTtcclxuICAgIH0sIDEwMCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXJEaXNoKGRpc2g6YW55KSB7XHJcbiAgICAvKlxyXG4gICAgIDxkaXYgY2xhc3M9XCJtYWluLWl0ZW1cIj5cclxuICAgICA8ZGl2IGNsYXNzPVwiaXRlbS1uYW1lXCI+XHJcbiAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+e3tkaXNoLm5hbWV9fTwvZGl2PlxyXG4gICAgIDwvZGl2PlxyXG4gICAgIDxkaXYgY2xhc3M9XCJpdGVtLXF1YW50aXR5XCI+XHJcbiAgICAgPCEtLSBpbmNyZWFzZSBidXR0b24tLT5cclxuICAgICA8YSBjbGFzcz1cIml0ZW0tcXVhbnRpdHlfX2J1dHRvblwiIChjbGljayk9XCJjaGFuZ2VBbW91bnRkaXNoKC0xKVwiPiYjODcyMjs8L2E+XHJcbiAgICAgPHNwYW4gY2xhc3M9XCJpdGVtLXF1YW50aXR5X19jb3VudGVyXCIgPnt7YW1vdW50RGlzaH19PC9zcGFuPlxyXG4gICAgIDwhLS0gZGVjcmVhc2UgYnV0dG9uLS0+XHJcbiAgICAgPGEgY2xhc3M9XCJpdGVtLXF1YW50aXR5X19idXR0b25cIiAoY2xpY2spPVwiY2hhbmdlQW1vdW50ZGlzaCgxKVwiPiYjeDJiOzwvYT5cclxuICAgICA8L2Rpdj5cclxuICAgICA8ZGl2IGNsYXNzPVwid2VpZ2h0LXByaWNlXCI+XHJcbiAgICAge3tkaXNoLnByaWNlKmFtb3VudERpc2h9fSZuYnNwOyYjeDIwYmQ7XHJcbiAgICAgPC9kaXY+XHJcbiAgICAgPC9kaXY+XHJcblxyXG5cclxuICAgICAqL1xyXG4gICAgbGV0IG1haW5JdGVtID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhtYWluSXRlbSwgXCJkaXNoLXdyYXBlclwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5lbC5uYXRpdmVFbGVtZW50LCBtYWluSXRlbSk7XHJcblxyXG4gICAgbGV0IGl0ZW1OYW1lID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJuYW1lXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtYWluSXRlbSwgaXRlbU5hbWUpO1xyXG5cclxuICAgIGxldCB0aXRsZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGl0bGUsIFwidGl0bGVcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRpdGxlLCBcImlubmVySFRNTFwiLCB0aGlzLmRpc2gubmFtZSk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lLCB0aXRsZSk7XHJcblxyXG4gICAgbGV0IHdlaWdodERpc2hXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ3ZWlnaHRcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lLCBcImRpc2hcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKG1haW5JdGVtLCB3ZWlnaHREaXNoV3JhcHBlcik7XHJcblxyXG4gICAgbGV0IHdlaWdodERpc2hWYWx1ZSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0RGlzaFZhbHVlLCBcInZhbHVlXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcclxuICAgICAgd2VpZ2h0RGlzaFZhbHVlLFxyXG4gICAgICBcImlubmVySFRNTFwiLFxyXG4gICAgICAodGhpcy5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDQsy5cIlxyXG4gICAgKTtcclxuICAgIGlmICh0aGlzLmRpc2gud2VpZ2h0ID09PSAwIHx8ICF0aGlzLmRpc2gud2VpZ2h0KSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0RGlzaFZhbHVlLCBcInplcm9cIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodERpc2hXcmFwcGVyLCB3ZWlnaHREaXNoVmFsdWUpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5kaXNoLnByaWNlKTtcclxuICAgIGxldCBwcmljZURpc2hXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInByaWNlXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZURpc2hXcmFwcGVyLCBcInRvdGFsXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChwcmljZURpc2hXcmFwcGVyLCB0aGlzLnByaWNlKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlRGlzaFdyYXBwZXIpO1xyXG5cclxuICAgIGxldCBpdGVtUXVhbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1RdWFudCwgXCJxdWFudGl0eVwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIGl0ZW1RdWFudCk7XHJcblxyXG4gICAgbGV0IGFkZEJ1dHRvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImFcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGFkZEJ1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwibWludXNcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGFkZEJ1dHRvbiwgXCJpbm5lckhUTUxcIiwgXCImIzg3MjI7XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4oYWRkQnV0dG9uLCBcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICB0aGlzLmNoYW5nZUFtb3VudGRpc2goLTEpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGNvdW50ZXIsIFwiaW5uZXJIVE1MXCIsIHRoaXMuYW1vdW50RGlzaCk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5wcmljZSwgXCJpbm5lckhUTUxcIiwgdGhpcy5nZW5lcmF0ZVByaWNlKHRoaXMuZGlzaC5wcmljZSkpO1xyXG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBhZGRCdXR0b24pO1xyXG5cclxuICAgIGxldCBjb3VudGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY291bnRlciwgXCJxdWFudGl0eV9fY291bnRlclwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoY291bnRlciwgXCJpbm5lckhUTUxcIiwgdGhpcy5hbW91bnREaXNoKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBjb3VudGVyKTtcclxuXHJcbiAgICBsZXQgbWludXNCdXR0b24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhtaW51c0J1dHRvbiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhZGRCdXR0b24sIFwicGx1c1wiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkobWludXNCdXR0b24sIFwiaW5uZXJIVE1MXCIsIFwiJiN4MmI7XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5saXN0ZW4obWludXNCdXR0b24sIFwiY2xpY2tcIiwgZSA9PiB7XHJcbiAgICAgIHRoaXMuY2hhbmdlQW1vdW50ZGlzaCgxKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShjb3VudGVyLCBcImlubmVySFRNTFwiLCB0aGlzLmFtb3VudERpc2gpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgIHRoaXMucHJpY2UsXHJcbiAgICAgICAgXCJpbm5lckhUTUxcIixcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKVxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLmlubmVyVG90YWxXZWlnaHQod2VpZ2h0VG90YWwpXHJcbiAgICB9KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50LCBtaW51c0J1dHRvbik7XHJcblxyXG4gICAgbGV0IHdlaWdodFRvdGFsV3JhcHBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoaXRlbU5hbWUsIFwid2VpZ2h0XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhpdGVtTmFtZSwgXCJ0b3RhbFwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHdlaWdodFRvdGFsV3JhcHBlcik7XHJcblxyXG4gICAgbGV0IHdlaWdodFRvdGFsID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaWYgKHRoaXMuZGlzaC53ZWlnaHQgPT09IDAgfHwgIXRoaXMuZGlzaC53ZWlnaHQpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ6ZXJvXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRUb3RhbCwgXCJ2YWx1ZVwiKTtcclxuICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh3ZWlnaHRUb3RhbCkgLy8gVE9ETzogdG90YWwgV2VpZ2h0XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWdodFRvdGFsV3JhcHBlciwgd2VpZ2h0VG90YWwpO1xyXG4gICAgdGhpcy53ZWlnaHRUb3RhbCA9IHdlaWdodFRvdGFsO1xyXG5cclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICB0aGlzLnByaWNlLFxyXG4gICAgICBcImlubmVySFRNTFwiLFxyXG4gICAgICB0aGlzLmdlbmVyYXRlUHJpY2UoZGlzaC5wcmljZSlcclxuICAgICk7IC8vIFRPRE86INC/0YDQsNCy0LjQu9GM0L3QviDRgdGH0LjRgtCw0YLRjCDRhtC10L3Rg1xyXG4gICAgbGV0IHByaWNlVG90YWxXcmFwcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZVRvdGFsV3JhcHBlciwgXCJwcmljZVwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocHJpY2VUb3RhbFdyYXBwZXIsIFwidG90YWxcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHByaWNlVG90YWxXcmFwcGVyLCB0aGlzLnByaWNlKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobWFpbkl0ZW0sIHByaWNlVG90YWxXcmFwcGVyKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlUHJpY2UocHJpY2VEaXNoLCBhbW91bnQ/LCBtb2RpZmlyZXNQcmljZT8pIHtcclxuICAgIGxldCBzZWxlY3RlZCA9IFtdO1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuXHJcbiAgICAgICAgdGhpcy5kaXNoLm1vZGlmaWVycy5mb3JFYWNoKGdyb3VwcyA9PiB7XHJcbiAgICAgICAgICBsZXQgbW9kID0gZ3JvdXBzLmNoaWxkTW9kaWZpZXJzLmZpbHRlcih4PT54Lm1vZGlmaWVySWQgPT09IGVsZW1lbnQuaWQpO1xyXG4gICAgICAgICAgaWYgKG1vZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG1vZFswXS5ncm91cElkID0gZ3JvdXBzLmdyb3VwLmlkO1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5wdXNoKG1vZFswXSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KTtcclxuICAgIGxldCBtb2RTdW06bnVtYmVyID0gMDtcclxuICAgIHNlbGVjdGVkLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblxyXG4gICAgICBtb2RTdW0gPSBtb2RTdW0gKyBlbGVtZW50LmRpc2gucHJpY2UgKiB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50Lmdyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cclxuICAgIH0pO1xyXG4gICAgbW9kU3VtID0gbW9kU3VtICogdGhpcy5hbW91bnREaXNoO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgcHJpY2VEaXNoICogdGhpcy5hbW91bnREaXNoICsgbW9kU3VtICsgJzxkaXYgY2xhc3M9XCJjdXJyZW5jeVwiPiZuYnNwOyYjeDIwYmQ7PC9kaXY+J1xyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGdlbmVyYXRlVG90YWxXZWlnaHQoKSB7XHJcbiAgICBsZXQgc2VsZWN0ZWQgPSBbXTtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKVxyXG4gICAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cHMgPT4ge1xyXG4gICAgICAgICAgbGV0IG1vZCA9IGdyb3Vwcy5jaGlsZE1vZGlmaWVycy5maWx0ZXIoeD0+eC5tb2RpZmllcklkID09PSBlbGVtZW50LmlkKTtcclxuICAgICAgICAgIGlmIChtb2QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBtb2RbMF0uZ3JvdXBJZCA9IGdyb3Vwcy5ncm91cC5pZDtcclxuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChtb2RbMF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSk7XHJcbiAgICBsZXQgbW9kU3VtOm51bWJlciA9IDA7XHJcbiAgICBzZWxlY3RlZC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG5cclxuICAgICAgbW9kU3VtID0gbW9kU3VtICsgZWxlbWVudC5kaXNoLndlaWdodCAqIHRoaXMuYW1vdW50TW9kaWZpcmVzW2VsZW1lbnQuZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSAqIDEwMDBcclxuICAgIH0pO1xyXG4gICAgbW9kU3VtID0gcGFyc2VGbG9hdCgobW9kU3VtICogdGhpcy5hbW91bnREaXNoKS50b0ZpeGVkKDIpKTtcclxuICAgIGNvbnNvbGUubG9nKG1vZFN1bSwgdGhpcy5kaXNoLndlaWdodCAqIDEwMDAgKiB0aGlzLmFtb3VudERpc2gpXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmRpc2gud2VpZ2h0LCB0aGlzLmFtb3VudERpc2gpXHJcbiAgICBsZXQgd2VpZ2h0ID0gKHRoaXMuZGlzaC53ZWlnaHQgKiAxMDAwICogdGhpcy5hbW91bnREaXNoKSArIG1vZFN1bTtcclxuXHJcbiAgICByZXR1cm4gKHdlaWdodCkudG9GaXhlZCgwKSArIFwiINCzLiA8ZGl2IGNsYXNzPSdzZXBhcmF0b3InPjwvZGl2PlwiO1xyXG4gIH1cclxuXHJcbiAgaW5uZXJUb3RhbFdlaWdodCh0b3RhbFdlaWd0aERpdikge1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodG90YWxXZWlndGhEaXYsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVUb3RhbFdlaWdodCgpKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUFtb3VudGRpc2godmFsdWUpIHtcclxuICAgIHRoaXMuYW1vdW50RGlzaCA9IHRoaXMuYW1vdW50RGlzaCArIHZhbHVlO1xyXG4gICAgaWYgKHRoaXMuYW1vdW50RGlzaCA8PSAwKSB7XHJcbiAgICAgIHRoaXMuYW1vdW50RGlzaCA9IDE7XHJcblxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuYW1vdW50RGlzaCA+PSAxOTkpIHtcclxuICAgICAgdGhpcy5hbW91bnREaXNoID0gMTk5O1xyXG5cclxuICAgIH1cclxuICAgIHRoaXMuYW1vdW50RGlzaFRvQWRkLmVtaXQodGhpcy5hbW91bnREaXNoKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyKG1vZGlmaXJlczphbnkpIHtcclxuICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XHJcblxyXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBoID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiaDVcIik7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgaCxcclxuICAgICAgICBcImlubmVySFRNTFwiLFxyXG4gICAgICAgIFwi0Jog0Y3RgtC+0LzRgyDQsdC70Y7QtNGDINC80L7QttC90L4g0LTQvtCx0LDQstC40YLRjDpcIlxyXG4gICAgICApO1xyXG4gICAgICAvLyB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBtb2RpZmlyZXMuZm9yRWFjaChlbGVtZW50R3JvdXAgPT4ge1xyXG4gICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXSA9IHt9O1xyXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tlbGVtZW50R3JvdXAubW9kaWZpZXJJZF0gPSB7fTtcclxuXHJcbiAgICAgIGlmIChlbGVtZW50R3JvdXAuZGlzaCkge1xyXG4gICAgICAgIGxldCBncm91cERpdiA9IHRoaXMuZ3JvdXBEaXYoXCLQntC00L3QvtGH0L3Ri9C1INC80L7QtNC40YTQuNC60LDRgtC+0YDRiyDQvdC1INC/0L7QtNC00LXRgNC20LjQstCw0Y7RgtGB0Y9cIik7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImVsZW1lbnRHcm91cFwiLGVsZW1lbnRHcm91cCk7XHJcbiAgICAgICAgLy9UT0RPOiBhZGQgc2luZ2xlIG1vZGlmaWNhdG9yIGxvZ2ljXHJcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzKSB7XHJcbiAgICAgICAgbGV0IGdyb3VwRGl2ID0gdGhpcy5ncm91cERpdihcclxuICAgICAgICAgIGVsZW1lbnRHcm91cC5ncm91cCA/IGVsZW1lbnRHcm91cC5ncm91cC5uYW1lIDogXCLQntGI0LjQsdC60LBcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGdyb3VwRGl2KTtcclxuICAgICAgICBsZXQgbW9kQXJyID0gZWxlbWVudEdyb3VwLmNoaWxkTW9kaWZpZXJzO1xyXG4gICAgICAgIG1vZEFyci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgbGV0IG1vZGlmaXJlRGl2ID0gdGhpcy5tb2RpZmlyZURpdihlbGVtZW50LCBlbGVtZW50R3JvdXAubW9kaWZpZXJJZCk7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGdyb3VwRGl2LCBtb2RpZmlyZURpdik7XHJcbiAgICAgICAgICBpZiAoZWxlbWVudC5kZWZhdWx0QW1vdW50IDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlTW9kaWZpZXJzW2VsZW1lbnRHcm91cC5tb2RpZmllcklkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKG1vZGlmaXJlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGxldCBoID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcclxuICAgICAgICBoLFxyXG4gICAgICAgIFwiaW5uZXJIVE1MXCIsXHJcbiAgICAgICAgXCI8cD4qIOKAlCDQmtC+0LvQuNGH0LXRgdGC0LLQviDQtNC+0LHQsNCy0LvQtdC90YvRhSDQvtC/0YbQuNC5INCx0LvRjtC00LAg0L/RgNC40LzQtdC90Y/QtdGC0YHRjyDQtNC70Y8g0LrQsNC20LTQvtC5INC/0L7RgNGG0LjQuDwvcD5cIlxyXG4gICAgICApO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgaCk7XHJcbiAgICB9XHJcblxyXG5cclxuICB9XHJcblxyXG4gIGdyb3VwRGl2KG5hbWVHb3J1cCkge1xyXG4gICAgbGV0IGRpdiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoZGl2LCBcImdyb3VwLW1vZGlmaXJlcy13cmFwZXJcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGRpdiwgdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFwiXCIgKyBuYW1lR29ydXApKTtcclxuICAgIHJldHVybiBkaXY7XHJcbiAgfVxyXG5cclxuICBtb2RpZmlyZURpdihlbGVtZW50LCBncm91cElkKSB7XHJcbiAgICBsZXQgZGl2ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhkaXYsIFwiYWRkaXRpb25hbC1pdGVtXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJPbmVNb2RpZmlyZShlbGVtZW50LCBkaXYsIGdyb3VwSWQpO1xyXG4gICAgcmV0dXJuIGRpdjtcclxuICB9XHJcblxyXG4gIHJlbmRlck9uZU1vZGlmaXJlKGVsZW1lbnQsIG1vZGlmaXJlRGl2LCBncm91cElkKSB7XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZScsIGVsZW1lbnQpO1xyXG4gICAgY29uc29sZS5pbmZvKCdyZW5kZXJPbmVNb2RpZmlyZSBzZWxlY3RlZE1vZGlmaWVycycsIHRoaXMuc2VsZWN0ZWRNb2RpZmllcnMpO1xyXG4gICAgLy8g0KDQtdC90LTQtdGAINCd0LDQt9Cy0LDQvdC40Y8g0LzQvtC00LjRhNC40LrQsNGC0L7RgNCwXHJcbiAgICBsZXQgaXRlbU5hbWVEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGl0ZW1OYW1lRGl2LCBcIml0ZW0tbmFtZVwiKTtcclxuXHJcbiAgICBsZXQgbGFiZWwgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcclxuICAgIFxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUobGFiZWwsIFwiZm9yXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1OYW1lRGl2LCBsYWJlbCk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KGxhYmVsLCBcImlubmVySFRNTFwiLCBlbGVtZW50LmRpc2gubmFtZSk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbU5hbWVEaXYpO1xyXG5cclxuICAgIGxldCB3ZWlndGhNb2RpZmlyZVdyYXBlciA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCBcImxlZnQtd2VpZ2h0LW1vZGlmaXJlLXdyYXBlclwiKTtcclxuICAgIGxldCB3ZWlnaHRNb2RpZmlyZUxlZnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZUxlZnQsICd3ZWlnaHQnKTtcclxuICAgIGlmIChlbGVtZW50LmRpc2gud2VpZ2h0ID09PSAwIHx8IGVsZW1lbnQuZGlzaC53ZWlnaHQgPCAwKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Mod2VpZ2h0TW9kaWZpcmVMZWZ0LCAnemVybycpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh3ZWlnaHRNb2RpZmlyZUxlZnQsICdpbm5lckhUTUwnLCAoZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDQsy5cIiArICcnKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZUxlZnQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgd2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xyXG5cclxuICAgIC8vINCg0LXQvdC00LXRgCDQsdC70L7QutCwINC40LfQvNC40L3QtdC90LjRjyDQutC+0LvQuNGH0LXRgdGC0LLQsCDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0LBcclxuICAgIGxldCBpdGVtUXVhbnRpdHkgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAvKiBUT0RPOiDQvdGD0LbQvdC+INC/0YDQvtCy0LXRgNC40YLRjDpcclxuICAgICDQtNCwIDAsMCxbMF0gLSDRgtC+0LvRjNC60L4g0LLRi9C60LvRjtGH0LXQvdGL0Lkg0YfQtdC60LHQvtC60YEgXHJcbiAgICAg0LTQsCAwLDEgWzBdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YFcclxuICAgICDQtNCwIDAsMSBbZD09PTFdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YEsINCy0LrQu9GO0YfQtdC90YvQuVxyXG5cclxuICAgICDQtNCwIDAsbltkPTBdIC0g0L/QviDRg9C80L7Qu9GH0LDQvdC40Y4gMCDQutC90L7Qv9C60LggKy1cclxuICAgICDQtNCwIDAsbltkPjA8bl0gLSDQv9C+INGD0LzQvtC70YfQsNC90LjRjiBkLCDQutC90L7Qv9C60LggKy1cclxuXHJcblxyXG5cclxuICAgICBrLG4gW2s8bixkPTBdIC0gayDQv9C+INGD0LzQvtC70YfQsNC90LjRjiEhISDQvdGD0LbQvdC+INGH0YLQvtCx0LLRiyDRgdGC0L7Rj9C70LAg0YbRi9GE0YDQsCBrINCyINCw0LzQsNGD0L3Rgiwg0LzQsNC60YEgbijQsdC+0LvRjNGI0LUgbiDQvdC1INC/0L7QtNC90LjQsNC80LDQu9C+0YHRjCkg0LrQvdC+0L/QutC4ICstICjRh9Cw0YHRgtC90YvQuSDRgdC70YPRh9Cw0Lkg0LrQvtCz0LTQsCBkPTApXHJcbiAgICAgayxuIFtrPG4sMDxkPTxuXS0gZCDQv9C+INGD0LzQvtC70YfQsNC90LjRjiEhISDQvdGD0LbQvdC+INGH0YLQvtCx0LLRiyDRgdGC0L7Rj9C70LAg0YbRi9GE0YDQsCAxINCyINCw0LzQsNGD0L3Rgiwg0LzQsNC60YEgbijQsdC+0LvRjNGI0LUgbiDQvdC1INC/0L7QtNC90LjQsNC80LDQu9C+0YHRjCkg0LrQvdC+0L/QutC4ICstXHJcblxyXG5cclxuXHJcbiAgICAgZGVmYXVsdEFtb3VudDowXHJcbiAgICAgaGlkZUlmRGVmYXVsdEFtb3VudDpmYWxzZSAvL9Cf0YDQuNC30L3QsNC6INGC0L7Qs9C+LCDRh9GC0L4g0L3QtSDQvdGD0LbQvdC+INC+0YLQvtCx0YDQsNC20LDRgtGMINGB0L/QuNGB0L7QuiDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7Qsiwg0LXRgdC70Lgg0LjRhSDQutC+0LvQuNGH0LXRgdGC0LLQviDRgNCw0LLQvdC+INC60L7Qu9C40YfQtdGB0YLQstGDXHJcbiAgICAgbWF4QW1vdW50OjBcclxuICAgICBtaW5BbW91bnQ6MFxyXG5cclxuICAgICAqL1xyXG5cclxuICAgIGxldCBtaW4gPSBlbGVtZW50Lm1pbkFtb3VudDtcclxuICAgIGxldCBtYXggPSBlbGVtZW50Lm1heEFtb3VudDtcclxuICAgIGxldCBkZWYgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XHJcblxyXG4gICAgY29uc29sZS5pbmZvKCdtaW4gbWF4IGRlZicsIG1pbiwgbWF4LCBkZWYpO1xyXG5cclxuICAgIHN3aXRjaCAodHJ1ZSkge1xyXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDAgJiYgZGVmID09PSAwOiAvLyAwLDAsWzBdIC0g0YLQvtC70YzQutC+INCy0YvQutC70Y7Rh9C10L3Ri9C5INGH0LXQutCx0L7QutGBXHJcbiAgICAgICAgdGhpcy5yZW5kZXJDaGVja2JveChlbGVtZW50LCBmYWxzZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgbWluID09PSAwICYmIG1heCA9PT0gMSAmJiBkZWYgPT09IDA6IC8vIDAsMSBbMF0tINGC0L7Qu9GM0LrQviDRh9C10LrQsdC+0LrRgVxyXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgZmFsc2UsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlIG1pbiA9PT0gMCAmJiBtYXggPT09IDEgJiYgZGVmID09PSAxOiAvLyAwLDEgW2QhPTBdLSDRgtC+0LvRjNC60L4g0YfQtdC60LHQvtC60YEsINCy0LrQu9GO0YfQtdC90YvQuVxyXG4gICAgICAgIHRoaXMucmVuZGVyQ2hlY2tib3goZWxlbWVudCwgdHJ1ZSwgaXRlbVF1YW50aXR5LCBtb2RpZmlyZURpdiwgZ3JvdXBJZClcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBtaW4gPT09IDEgJiYgbWF4ID09PSAxICYmIGRlZiA9PT0gMTogLy8gMCwxIFtkIT0wXS0g0YLQvtC70YzQutC+INGH0LXQutCx0L7QutGBLCDQstC60LvRjtGH0LXQvdGL0LlcclxuICAgICAgICBjb25zb2xlLmVycm9yKFxyXG4gICAgICAgICAgZWxlbWVudC5kaXNoLm5hbWUsXHJcbiAgICAgICAgICBcItCX0L3QsNGH0LXQvdC40LUg0L3QtSDQv9C+0LTQtNCw0LXRgtGB0Y8g0L3QsNGB0YLRgNC+0LnQutC1OlwiLFxyXG4gICAgICAgICAgbWluLFxyXG4gICAgICAgICAgbWF4LFxyXG4gICAgICAgICAgZGVmXHJcbiAgICAgICAgKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgbWluIDw9IG1heCAmJiBkZWYgPj0gbWluICYmIGRlZiA8PSBtYXggJiYgbWF4ID4gMTogLy9kINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOISEhINC90YPQttC90L4g0YfRgtC+0LHQstGLINGB0YLQvtGP0LvQsCDRhtGL0YTRgNCwIDEg0LIg0LDQvNCw0YPQvdGCLCDQvNCw0LrRgSBuKNCx0L7Qu9GM0YjQtSBuINC90LUg0L/QvtC00L3QuNCw0LzQsNC70L7RgdGMKSDQutC90L7Qv9C60LggKy1cclxuICAgICAgICB0aGlzLnJlbmRlcklucHV0QnV0dG9uKGVsZW1lbnQsIGdyb3VwSWQsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYpXHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXHJcbiAgICAgICAgICBlbGVtZW50LmRpc2gubmFtZSxcclxuICAgICAgICAgIFwi0J7RiNC40LHQutCwINGA0LXQvdC00LXRgNCwINC80L7QtNC40YTQuNC60LDRgtC+0YDQsCwg0LTQu9GPINC30L3QsNGH0LXQvdC40Lk6XCIsXHJcbiAgICAgICAgICBtaW4sXHJcbiAgICAgICAgICBtYXgsXHJcbiAgICAgICAgICBkZWZcclxuICAgICAgICApO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbGVtZW50Lm1heEFtb3VudCA+IDAgJiYgZWxlbWVudC5taW5BbW91bnQgPiAwKSB7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICB9XHJcbiAgICAvLyDQoNC10L3QtNC10YAg0LHQu9C+0LrQsCDRgdGC0L7QuNC80L7RgdGC0Lgg0Lgg0LLQtdGB0LAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNCwXHJcbiAgICAvLyBsZXQgd2VpZ2h0UHJpY2VEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgLy8gdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRQcmljZURpdiwgJ21vZGFsLXByaWNlJyk7XHJcbiAgICAvLyBsZXQgd2VpZ2h0O1xyXG4gICAgLy8gaWYoZWxlbWVudC5kaXNoLndlaWdodD4wKXtcclxuICAgIC8vICAgd2VpZ2h0ID0gIGVsZW1lbnQuZGlzaC53ZWlnaHQgKyBcIiDQsyBcIjtcclxuICAgIC8vIH1cclxuICAgIC8vIGxldCBzbGFzaCA9IFwiLyBcIjtcclxuICAgIC8vIGxldCBwcmljZTtcclxuICAgIC8vIGlmKGVsZW1lbnQuZGlzaC5wcmljZT4wKXtcclxuICAgIC8vICAgcHJpY2UgPSBlbGVtZW50LmRpc2gucHJpY2UgKyBcIiZuYnNwOyYjeDIwYmQ7XCI7XHJcbiAgICAvLyB9XHJcbiAgICAvLyBsZXQgd2VpZ2h0QW5kUHJpY2VIVE1MID0gKHdlaWdodHx8JycpKyh3ZWlnaHQmJnByaWNlPyBzbGFzaCA6ICcnKSsoIHByaWNlIHx8ICcnKTtcclxuICAgIC8vIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkod2VpZ2h0UHJpY2VEaXYsICdpbm5lckhUTUwnLCB3ZWlnaHRBbmRQcmljZUhUTUwpO1xyXG4gICAgLy8gdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgd2VpZ2h0UHJpY2VEaXYpO1xyXG5cclxuICAgIGxldCByaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MocmlnaHR3ZWlndGhNb2RpZmlyZVdyYXBlciwgXCJyaWdodC13ZWlnaHQtbW9kaWZpcmUtd3JhcGVyXCIpO1xyXG4gICAgbGV0IHdlaWdodE1vZGlmaXJlUmlnaHQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh3ZWlnaHRNb2RpZmlyZVJpZ2h0LCAnd2VpZ2h0Jyk7XHJcbiAgICBpZiAoZWxlbWVudC5kaXNoLndlaWdodCA9PT0gMCB8fCBlbGVtZW50LmRpc2gud2VpZ2h0IDwgMCkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHdlaWdodE1vZGlmaXJlUmlnaHQsICd6ZXJvJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHdlaWdodE1vZGlmaXJlUmlnaHQsICdpbm5lckhUTUwnLCAoZWxlbWVudC5kaXNoLndlaWdodCAqIDEwMDApLnRvRml4ZWQoMCkgKyBcIiDQsy5cIiArICc8ZGl2IGNsYXNzPVwic2VwYXJhdG9yXCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChyaWdodHdlaWd0aE1vZGlmaXJlV3JhcGVyLCB3ZWlnaHRNb2RpZmlyZVJpZ2h0KTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQobW9kaWZpcmVEaXYsIHJpZ2h0d2VpZ3RoTW9kaWZpcmVXcmFwZXIpO1xyXG5cclxuXHJcbiAgICBsZXQgcHJpY2UgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHByaWNlLCBcIml0ZW0tcHJpY2VcIik7XHJcblxyXG4gICAgbGV0IHByaWNlVmFsdWU7XHJcbiAgICBpZiAoZWxlbWVudC5kaXNoLnByaWNlID4gMCkge1xyXG4gICAgICBwcmljZVZhbHVlID0gZWxlbWVudC5kaXNoLnByaWNlICsgXCI8ZGl2IGNsYXNzID0gJ2N1cnJlbmN5Jz4mbmJzcDsmI3gyMGJkOzwvZGl2PlwiO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHByaWNlLCBcImlubmVySFRNTFwiLCBwcmljZVZhbHVlKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgcHJpY2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhwcmljZSwgXCJ6ZXJvLXByaWNlXCIpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLnNldE1vZGlmaXJlcygpO1xyXG4gICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcmVuZGVyQ2hlY2tib3goZWxlbWVudCwgaXNBY3RpdmUsIGl0ZW1RdWFudGl0eSwgbW9kaWZpcmVEaXYsIGdyb3VwSWQpIHtcclxuXHJcbiAgICBsZXQgaW5wdXQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKGlucHV0LCBcImlkXCIsIGVsZW1lbnQubW9kaWZpZXJJZCk7XHJcbiAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgZWxlbWVudC5jaGVja2VkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdHJ1ZTtcclxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IDE7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWxlbWVudC5jaGVja2VkID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gMDtcclxuXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGlucHV0LCBcIm1vZGFsLWNoZWNrYm94XCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChpdGVtUXVhbnRpdHksIGlucHV0KTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyLmxpc3RlbihpbnB1dCwgXCJjaGFuZ2VcIiwgZSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlkUmFkaW9Cb3goZ3JvdXBJZCkpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1ba2V5XSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgLy8gdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShpbnB1dCwgJ2NoZWNrZWQnLCAgIHRydWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGdyb3VwRGl2QmxvY2sgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgICAgICAgXCJpbnB1dFwiXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgZ3JvdXBEaXZCbG9jay5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgaWYgKGVsZW1lbnQuaWQgIT0gZS50YXJnZXQuaWQpIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZS50YXJnZXQuaWRdID0gZS50YXJnZXQuY2hlY2tlZDtcclxuICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlLnRhcmdldC5pZF0gPSAxO1xyXG5cclxuICAgICAgfVxyXG5cclxuXHJcbiAgICAgIHRoaXMuc2V0TW9kaWZpcmVzKCk7XHJcbiAgICAgIHRoaXMuaW5uZXJUb3RhbFdlaWdodCh0aGlzLndlaWdodFRvdGFsKTtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLnByaWNlLCBcImlubmVySFRNTFwiLCB0aGlzLmdlbmVyYXRlUHJpY2UodGhpcy5kaXNoLnByaWNlKSk7XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcclxuXHJcbiAgfVxyXG5cclxuICByZW5kZXJJbnB1dEJ1dHRvbihlbGVtZW50LCBncm91cElkLCBpdGVtUXVhbnRpdHksIG1vZGlmaXJlRGl2KSB7XHJcblxyXG4gICAgbGV0IHN0YXJ0QW1vdW50O1xyXG4gICAgaWYgKGVsZW1lbnQuZGVmYXVsdEFtb3VudCA+IDApIHtcclxuICAgICAgc3RhcnRBbW91bnQgPSBlbGVtZW50LmRlZmF1bHRBbW91bnQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzdGFydEFtb3VudCA9IGVsZW1lbnQubWluQW1vdW50O1xyXG5cclxuICAgIH1cclxuICAgIGlmIChzdGFydEFtb3VudCA+IDApIHtcclxuXHJcbiAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxldCBhTWludXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhTWludXNEaXYsIFwicXVhbnRpdHlfX2J1dHRvblwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoYU1pbnVzRGl2LCBcImlubmVySFRNTFwiLCBcIiYjODcyMjtcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYU1pbnVzRGl2KTtcclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFNaW51c0RpdiwgXCJjbGlja1wiLCBlID0+IHtcclxuICAgICAgbGV0IHZhbHVlID0gK3RoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF07XHJcblxyXG4gICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gdmFsdWUgLSAxO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA8IGVsZW1lbnQubWluQW1vdW50XHJcbiAgICAgIClcclxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZWxlbWVudC5taW5BbW91bnQ7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkoXHJcbiAgICAgICAgc3BhbixcclxuICAgICAgICBcImlubmVySFRNTFwiLFxyXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF1cclxuICAgICAgKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcclxuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzcGFuID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3Moc3BhbiwgXCJpdGVtLXF1YW50aXR5X19jb3VudGVyXCIpO1xyXG4gICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHN0YXJ0QW1vdW50O1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShcclxuICAgICAgc3BhbixcclxuICAgICAgXCJpbm5lckhUTUxcIixcclxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXVxyXG4gICAgKTtcclxuICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoaXRlbVF1YW50aXR5LCBzcGFuKTtcclxuXHJcbiAgICBsZXQgYVBsdXNEaXYgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhhUGx1c0RpdiwgXCJxdWFudGl0eV9fYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRQcm9wZXJ0eShhUGx1c0RpdiwgXCJpbm5lckhUTUxcIiwgXCImI3gyYjtcIik7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGl0ZW1RdWFudGl0eSwgYVBsdXNEaXYpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChtb2RpZmlyZURpdiwgaXRlbVF1YW50aXR5KTtcclxuICAgIHRoaXMucmVuZGVyZXIubGlzdGVuKGFQbHVzRGl2LCBcImNsaWNrXCIsIGUgPT4ge1xyXG4gICAgICBsZXQgdmFsdWUgPSArdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXTtcclxuICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHZhbHVlICsgMTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuYW1vdW50TW9kaWZpcmVzW2dyb3VwSWRdW2VsZW1lbnQubW9kaWZpZXJJZF0gPlxyXG4gICAgICAgIGVsZW1lbnQubWF4QW1vdW50ICYmXHJcbiAgICAgICAgZWxlbWVudC5tYXhBbW91bnQgIT0gMFxyXG4gICAgICApXHJcbiAgICAgICAgdGhpcy5hbW91bnRNb2RpZmlyZXNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IGVsZW1lbnQubWF4QW1vdW50O1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KFxyXG4gICAgICAgIHNwYW4sXHJcbiAgICAgICAgXCJpbm5lckhUTUxcIixcclxuICAgICAgICB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdXHJcbiAgICAgICk7XHJcbiAgICAgIGlmICh0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVtlbGVtZW50Lm1vZGlmaWVySWRdID4gMCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bZWxlbWVudC5tb2RpZmllcklkXSA9IHRydWU7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRNb2RpZmlyZXMoKTtcclxuICAgICAgdGhpcy5pbm5lclRvdGFsV2VpZ2h0KHRoaXMud2VpZ2h0VG90YWwpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMucHJpY2UsIFwiaW5uZXJIVE1MXCIsIHRoaXMuZ2VuZXJhdGVQcmljZSh0aGlzLmRpc2gucHJpY2UpKTtcclxuICAgIH0pO1xyXG5cclxuICB9XHJcblxyXG4gIHNldE1vZGlmaXJlcygpIHtcclxuICAgIGxldCBtb2RpZmllcnNUb1NlbGVjdCA9IFtdO1xyXG5cclxuICAgIC8qaWYodGhpcy5zZWxlY3RlZE1vZGlmaWVycy5sZW5ndGggJiYgIShPYmplY3QudmFsdWVzKHRoaXMuc3RhdGVNb2RpZmllcnMpKS5sZW5ndGgpIHtcclxuICAgICAgbW9kaWZpZXJzVG9TZWxlY3QgPSB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzO1xyXG4gICAgfSovXHJcblxyXG4gICAgbGV0IG1vZGlmaXJlcyA9IFtdO1xyXG5cclxuICAgIGNvbnNvbGUuaW5mbygnc2V0TW9kaWZpcmVzIG1vZGlmaWVyc1RvU2VsZWN0JywgbW9kaWZpZXJzVG9TZWxlY3QpO1xyXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc3RhdGVNb2RpZmllcnMgYmVmb3JlJywgdGhpcy5zdGF0ZU1vZGlmaWVycyk7XHJcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzZWxlY3RlZE1vZGlmaWVycyBiZWZvcmUnLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcclxuXHJcbiAgICBmb3IgKGxldCBncm91cElkIGluIHRoaXMuc3RhdGVNb2RpZmllcnMpIHtcclxuICAgICAgZm9yIChsZXQgbW9kaWZpcmVJZCBpbiB0aGlzLnN0YXRlTW9kaWZpZXJzW2dyb3VwSWRdKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXBJZF1bbW9kaWZpcmVJZF0gfHwgbW9kaWZpZXJzVG9TZWxlY3QuZmluZChpdGVtID0+IGl0ZW0ubW9kaWZpZXJJZCA9PSBtb2RpZmlyZUlkKSkge1xyXG4gICAgICAgICAgbW9kaWZpcmVzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogbW9kaWZpcmVJZCxcclxuICAgICAgICAgICAgYW1vdW50OiB0aGlzLmFtb3VudE1vZGlmaXJlc1tncm91cElkXVttb2RpZmlyZUlkXSxcclxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzID0gbW9kaWZpcmVzO1xyXG5cclxuICAgIGlmICh0aGlzLmRpc2gubW9kaWZpZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgbGV0IG1lc3NhZ2UgPSBbXTtcclxuXHJcbiAgICAgIHRoaXMuZGlzaC5tb2RpZmllcnMuZm9yRWFjaChncm91cCA9PiB7XHJcbiAgICAgICAgaWYgKGdyb3VwLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5zdGF0ZU1vZGlmaWVyc1tncm91cC5tb2RpZmllcklkXSkge1xyXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRNb2RpZiA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbG9jYWxNb2RpZiA9IHRoaXMuc3RhdGVNb2RpZmllcnNbZ3JvdXAubW9kaWZpZXJJZF07IC8vLmZpbHRlcihlbGVtZW50PT5lbGVtZW50KTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBtb2QgaW4gbG9jYWxNb2RpZikge1xyXG4gICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmLmhhc093blByb3BlcnR5KG1vZCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChsb2NhbE1vZGlmW21vZF0pIHtcclxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRNb2RpZi5wdXNoKGxvY2FsTW9kaWZbbW9kXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE1vZGlmLmxlbmd0aCA8IGdyb3VwLm1pbkFtb3VudCkge1xyXG4gICAgICAgICAgICAgIG1lc3NhZ2UucHVzaCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIndhcm5pbmdcIixcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBcItCS0L3QuNC80LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIGJvZHk6IFwiINCe0LHRj9C30LDRgtC10LvRjNC90L4g0LLRi9Cx0LXRgNC40YLQtSDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0Ysg0LjQtyDQutCw0YLQtdCz0L7RgNC40Lg6IFwiICtcclxuICAgICAgICAgICAgICAgIGdyb3VwLmdyb3VwLm5hbWVcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlLmVtaXQoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgbWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaXJlcywgW10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtZXNzYWdlLnB1c2goe1xyXG4gICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBcItCS0L3QuNC80LDQvdC40LVcIixcclxuICAgICAgICAgICAgICBib2R5OiBcIiDQntCx0Y/Qt9Cw0YLQtdC70YzQvdC+INCy0YvQsdC10YDQuNGC0LUg0LzQvtC00LjRhNC40LrQsNGC0L7RgNGLINC40Lcg0LrQsNGC0LXQs9C+0YDQuNC4OiBcIiArXHJcbiAgICAgICAgICAgICAgZ3JvdXAuZ3JvdXAubmFtZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzLCBtZXNzYWdlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xyXG4gICAgICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpcmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xyXG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmlyZXMsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmluZm8oJ3NldE1vZGlmaXJlcyBzdGF0ZU1vZGlmaWVycyBhZnRlcicsIHRoaXMuc3RhdGVNb2RpZmllcnMpO1xyXG4gICAgY29uc29sZS5pbmZvKCdzZXRNb2RpZmlyZXMgc2VsZWN0ZWRNb2RpZmllcnMgYWZ0ZXInLCB0aGlzLnNlbGVjdGVkTW9kaWZpZXJzKTtcclxuICB9XHJcblxyXG4gIC8qINC/0YDQvtCy0LXRgNGP0LXRgiDRgdC+0L7RgtCy0LXRgdGC0LLQtdGCINC70Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCy0LEg0LXRgdC70LggMSDRgtC+INGA0LXQsNC70LjQt9GD0LXRgiDQv9C+0LLQtdC00LXQvdC40LUg0YDQsNC00LjQvtC60L3QvtC/0LrQuCxcclxuICAg0LXRgdC70Lgg0LzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INCx0L7Qu9GM0YjQtSAxINGC0L4g0LPQtdC90LXRgNC40YDRg9C10YIg0LTQtdC70LDQtdGCINCy0YvQsdC+0YAg0LLRgdC10YUg0L7RgdGC0LDQu9GM0L3Ri9GFINC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyINC90LUg0LLQvtC30LzQvtC20L3Ri9C8LCDQs9C10L3QtdGA0LjRgNGD0LXRgiDQv9GA0LXQtNGD0L/RgNC10LbQtNC10L3QuNC1Ki9cclxuXHJcbiAgaWRSYWRpb0JveChncm91cElkKTpib29sZWFuIHtcclxuICAgIGxldCBjdXJyZW50R3JvdXAgPSB0aGlzLmRpc2gubW9kaWZpZXJzLmZpbmQoeCA9PiB4Lm1vZGlmaWVySWQgPT09IGdyb3VwSWQpO1xyXG4gICAgcmV0dXJuIGN1cnJlbnRHcm91cC5taW5BbW91bnQgPT09IDEgJiYgY3VycmVudEdyb3VwLm1heEFtb3VudCA9PT0gMTtcclxuICB9XHJcblxyXG4gIC8vINCf0YDQvtCy0LXRgNGP0LXRgiDQvNC40L3QuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCy0LrQvtGC0L7RgNGL0LUg0LHRi9C70Lgg0LLRi9Cx0YDQsNC90YtcclxuICBjaGVja01pbkFtb3VudE1vZGlmaXJlcyhncm91cElkLCBtb2RpZmlyZSkge1xyXG4gIH1cclxuXHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy90aGlzLmRpc2gubW9kaWZpZXJzID1bXTtcclxuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcclxuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=