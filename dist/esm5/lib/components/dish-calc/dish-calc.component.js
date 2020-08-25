"use strict";
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ng_restocart_service_1 = require("../../services/ng-restocart.service");
var ng_core_1 = require("@webresto/ng-core");
var DishCalcComponent = /** @class */ (function () {
    function DishCalcComponent(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new core_1.EventEmitter();
        this.amountDishToAdd = new core_1.EventEmitter();
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
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.validate.emit(true);
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.validate.emit(true);
        this.cartService.setModifires([], []);
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
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
                for (var _c = tslib_1.__values(this.dish.modifiers), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var modifier = _d.value;
                    /** @type {?} */
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
                        && modifier.childModifiers.find((/**
                         * @param {?} m
                         * @return {?}
                         */
                        function (m) { return m.dish; }))) {
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
                                for (var _e = tslib_1.__values(modifier.childModifiers), _f = _e.next(); !_f.done; _f = _e.next()) {
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
    /**
     * @param {?} groupId
     * @return {?}
     */
    DishCalcComponent.prototype.calculateTotalAmountInGroup = /**
     * @param {?} groupId
     * @return {?}
     */
    function (groupId) {
        if (groupId == 'single')
            return;
        this.modifiers.indexById[groupId].totalAmount = Object
            .values(this.modifiersValueTree[groupId])
            .reduce((/**
         * @param {?} a
         * @param {?} b
         * @return {?}
         */
        function (a, b) { return a + b; }));
        return this.modifiers.indexById[groupId].totalAmount;
    };
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.calculateTotalPrice = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var totalPrice = this.dish.price || 0;
        for (var groupId in this.modifiersValueTree) {
            for (var modifierId in this.modifiersValueTree[groupId]) {
                /** @type {?} */
                var amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    /** @type {?} */
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
    /**
     * @param {?} modifier
     * @return {?}
     */
    DishCalcComponent.prototype.getModifiersIds = /**
     * @param {?} modifier
     * @return {?}
     */
    function (modifier) {
        return {
            groupId: (modifier.dish && modifier.dish.groupId) ? modifier.dish.groupId : undefined,
            modifierId: modifier.modifierId
        };
    };
    /**
     * @param {?} modifier
     * @param {?} amount
     * @param {?} operation
     * @return {?}
     */
    DishCalcComponent.prototype.changeModifierAmount = /**
     * @param {?} modifier
     * @param {?} amount
     * @param {?} operation
     * @return {?}
     */
    function (modifier, amount, operation) {
        if (amount < 0)
            return;
        var _a = this.getModifiersIds(modifier), _b = _a.groupId, groupId = _b === void 0 ? 'single' : _b, modifierId = _a.modifierId;
        var minAmount = modifier.minAmount, maxAmount = modifier.maxAmount;
        var _c = this.modifiers.indexById[groupId] || {}, _d = _c.minAmount, groupMinAmount = _d === void 0 ? 0 : _d, _e = _c.maxAmount, groupMaxAmount = _e === void 0 ? 0 : _e;
        /** @type {?} */
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
            /** @type {?} */
            var groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
            if (groupAmount < groupMinAmount) {
                console.warn("Limit: min " + groupMinAmount + ". Current " + groupAmount);
                this.eventer.emitMessageEvent(new ng_core_1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u043C\u0435\u043D\u0435\u0435 " + groupMinAmount));
                return;
            }
            if (groupAmount > groupMaxAmount) {
                console.warn("Limit: max " + groupMaxAmount + ". Current " + groupAmount);
                this.eventer.emitMessageEvent(new ng_core_1.EventMessage('warning', 'Ограничение', "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u043F\u0446\u0438\u0439 \u0434\u043B\u044F \u0433\u0440\u0443\u043F\u043F\u044B\n            \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432 \"" + this.modifiers.indexById[groupId].group.name + "\" - \u043D\u0435 \u0431\u043E\u043B\u0435\u0435 " + groupMaxAmount));
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
    /**
     * @return {?}
     */
    DishCalcComponent.prototype.setModifiers = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var modifiersToSet = [];
        for (var groupId in this.modifiersValueTree) {
            for (var modifierId in this.modifiersValueTree[groupId]) {
                /** @type {?} */
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
            this.validate.emit(true);
            this.cartService.setModifires(modifiersToSet, []);
        }
    };
    DishCalcComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'dish-calc',
                    template: "<div class=\"ng-cart-dish-calc\" *ngIf=\"dish\">\n    <div class=\"dish\">\n        <div class=\"dish-image-box\">\n            <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n        </div>\n        <div class=\"dish-description-box\">\n            <div class=\"dish-name\">{{ dish.name }}</div>\n            <div class=\"dish-ingredients\">{{ dish.description }}</div>\n            <div class=\"dish-price-box\">\n                <ng-container *ngIf=\"!modifiers.custom.fixed; else modifierFixedTemplate\">\n                    <div class=\"price\" [ngClass]=\"{'zero-price': !dish.price}\">\n                        <span>{{ dish.price }}</span> \u20BD\n                    </div>\n                </ng-container>\n                <ng-template #modifierFixedTemplate>\n                    <ng-container *ngIf=\"modifiers.custom.fixed as modifier\">\n                        <div class=\"modifier-fixed\">\n                            <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                                <div class=\"item\"\n                                     [ngClass]=\"{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}\"\n                                     (click)=\"changeModifierAmount(childModifier, 1, 'checkbox')\">\n                                    {{ childModifier.dish?.name }}\n                                </div>\n                            </ng-container>\n                        </div>\n                        <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                            <ng-container *ngIf=\"!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]\">\n                                <div class=\"price\" [ngClass]=\"{'zero-price': !childModifier.dish?.price}\">\n                                    <span>{{ childModifier.dish?.price }}</span> \u20BD\n                                </div>\n                            </ng-container>\n                        </ng-container>\n                    </ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </div>\n    <div class=\"modifiers\" *ngIf=\"modifiers.baseList?.length\">\n        <ng-container *ngFor=\"let modifier of modifiers.baseList\">\n            <div class=\"modifier-group\">\n                <div class=\"modifier-header\" *ngIf=\"modifier.group as group\">\n                    <div class=\"modifier-name\" *ngIf=\"group.name\">{{ group.name }}</div>\n                    <div class=\"modifier-description\" *ngIf=\"group.description\">>{{ group.description }}</div>\n                </div>\n                <div class=\"modifier-box\" *ngIf=\"modifier.dish\">\n                    <!-- Single modifier -->\n                    <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: modifier,\n                            groupId: 'single',\n                            amount: modifiersValueTree['single'][modifier.modifierId],\n                            groupAmount: modifiersValueTree['single'][modifier.modifierId],\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n                </div>\n                <div class=\"modifier-children\" *ngIf=\"modifier.childModifiers?.length\">\n                    <ng-container *ngFor=\"let childModifier of modifier.childModifiers\">\n                        <!-- Group modifier -->\n                        <ng-container *ngTemplateOutlet=\"modifierTemplate; context: {\n                            modifier: childModifier,\n                            groupId: modifier.modifierId,\n                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],\n                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,\n                            groupMinAmount: modifier.minAmount || 0,\n                            groupMaxAmount: modifier.maxAmount || 100\n                        }\"></ng-container>\n\n                    </ng-container>\n                </div>\n            </div>\n        </ng-container>\n    </div>\n    <div class=\"result\">\n        <span class=\"text\">\u0418\u0422\u041E\u0413\u041E:</span>\n        <span class=\"price\">\n            <span>{{ totalPrice}}</span> \u20BD\n        </span>\n    </div>\n</div>\n\n\n\n<!-- Template block #dishImageTemplate -->\n\n<ng-template #dishImageTemplate let-dish=\"dish\">\n    <ng-container *ngIf=\"dish?.images && dish.images[0]?.images?.small; else imgPlaceholder\">\n        <div class=\"dish-image\" [style.backgroundImage]=\"'url(' + imageUrl + dish.images[0].images.small + ')'\"></div>\n    </ng-container>\n    <ng-template #imgPlaceholder>\n        <div class=\"dish-image-placeholder\"></div>\n    </ng-template>\n</ng-template>\n\n<!-- Template block #modifierTemplate -->\n\n<ng-template #modifierTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container *ngIf=\"modifier.dish as dish\">\n        <div class=\"modifier-dish\">\n            <div class=\"modifier-dish-image-box\">\n                <ng-container *ngTemplateOutlet=\"dishImageTemplate; context: { dish: dish }\"></ng-container>\n            </div>\n            <div class=\"modifier-dish-description-box\">\n                <div class=\"modifier-dish-name\">{{ dish.name }}</div>\n                <div class=\"modifier-dish-weight\">{{ dish.weight * 1000 }} \u0433\u0440</div>\n            </div>\n            <div class=\"modifier-dish-price-box\">\n                <div [ngClass]=\"{'zero-price': !dish.price}\">\n                    <span>{{ dish.price }}</span> \u20BD\n                </div>\n            </div>\n            <div class=\"modifier-dish-action-box\">\n                <ng-container *ngIf=\"groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate\">\n                    <ng-container *ngTemplateOutlet=\"modifierCheckboxTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount\n                    }\"></ng-container>\n                </ng-container>\n\n                <ng-template #counterTemplate>\n                    <ng-container *ngTemplateOutlet=\"modifierCounterTemplate; context: {\n                        modifier: modifier,\n                        groupId: groupId,\n                        amount: amount,\n                        groupAmount: groupAmount,\n                        groupMinAmount: groupMinAmount,\n                        groupMaxAmount: groupMaxAmount\n                    }\"></ng-container>\n                </ng-template>\n\n            </div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCounterTemplate -->\n\n<ng-template #modifierCounterTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\"\n             let-groupAmount=\"groupAmount\"\n             let-groupMinAmount=\"groupMinAmount\"\n             let-groupMaxAmount=\"groupMaxAmount\">\n    <ng-container>\n        <div class=\"modifier-counter\" [ngClass]=\"{disabled: !amount && groupAmount >= groupMaxAmount}\">\n            <div\n                    class=\"minus\"\n                    [ngClass]=\"{disabled: !amount || groupAmount <= groupMinAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount - 1, 'minus')\"\n                    onselectstart=\"return false;\">-</div>\n            <input [value]=\"amount\" readonly #input>\n            <div\n                    class=\"plus\"\n                    [ngClass]=\"{disabled: groupAmount >= groupMaxAmount}\"\n                    (click)=\"changeModifierAmount(modifier, amount + 1, 'plus')\"\n                    onselectstart=\"return false;\">+</div>\n        </div>\n    </ng-container>\n</ng-template>\n\n<!-- Template block #modifierCheckboxTemplate -->\n\n<ng-template #modifierCheckboxTemplate\n             let-modifier=\"modifier\"\n             let-groupId=\"groupId\"\n             let-amount=\"amount\">\n    <ng-container>\n        <div\n                class=\"modifier-checkbox\"\n                [ngClass]=\"{selected: amount}\"\n                (click)=\"changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')\"></div>\n    </ng-container>\n</ng-template>\n",
                    styles: [".dish{display:-webkit-box;display:flex;-webkit-box-align:start;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:stretch;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;-webkit-box-flex:1;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between;height:45px;margin-right:49px}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-description-box{-webkit-box-flex:1;flex-grow:1;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:-webkit-box;display:flex;-webkit-box-align:stretch;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center}.modifier-checkbox.selected:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}"]
                },] },
    ];
    /** @nocollapse */
    DishCalcComponent.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService },
        { type: ng_core_1.EventerService },
        { type: String, decorators: [{ type: core_1.Inject, args: ['ImageUrl',] }] }
    ]; };
    DishCalcComponent.propDecorators = {
        dish: [{ type: core_1.Input }],
        amount: [{ type: core_1.Input }],
        selectedModifiers: [{ type: core_1.Input }],
        validate: [{ type: core_1.Output }],
        amountDishToAdd: [{ type: core_1.Output }]
    };
    return DishCalcComponent;
}());
exports.DishCalcComponent = DishCalcComponent;
if (false) {
    /** @type {?} */
    DishCalcComponent.prototype.dish;
    /** @type {?} */
    DishCalcComponent.prototype.amount;
    /** @type {?} */
    DishCalcComponent.prototype.selectedModifiers;
    /** @type {?} */
    DishCalcComponent.prototype.validate;
    /** @type {?} */
    DishCalcComponent.prototype.amountDishToAdd;
    /** @type {?} */
    DishCalcComponent.prototype.modifiers;
    /** @type {?} */
    DishCalcComponent.prototype.totalPrice;
    /** @type {?} */
    DishCalcComponent.prototype.modifiersValueTree;
    /** @type {?} */
    DishCalcComponent.prototype.imageUrl;
    /**
     * @type {?}
     * @private
     */
    DishCalcComponent.prototype.cartService;
    /**
     * @type {?}
     * @private
     */
    DishCalcComponent.prototype.eventer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLHNDQUE2RztBQUM3Ryw0RUFBeUU7QUFFekUsNkNBRzJCO0FBRTNCO0lBOE1FLDJCQUNVLFdBQStCLEVBQy9CLE9BQXNCLEVBQ1YsUUFBZTtRQUYzQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQWpCckIsYUFBUSxHQUFxQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRCxvQkFBZSxHQUFxQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUVsRSxjQUFTLEdBQUc7WUFDVixTQUFTLEVBQUUsRUFBRTtZQUNiLE1BQU0sRUFBRTtnQkFDTixLQUFLLEVBQUUsSUFBSTthQUNaO1lBQ0QsUUFBUSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBR0YsdUJBQWtCLEdBQVEsRUFBRSxDQUFDO1FBUTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7Ozs7SUFFRCxvQ0FBUTs7O0lBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsdUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7SUFFRCx1Q0FBVzs7O0lBQVg7O1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNmLFNBQVMsRUFBRSxFQUFFO1lBQ2IsTUFBTSxFQUFFO2dCQUNOLEtBQUssRUFBRSxJQUFJ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Ozs7OztJQUN2QyxvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2VcIjtcblxuaW1wb3J0IHtcbiAgRXZlbnRlclNlcnZpY2UsXG4gIEV2ZW50TWVzc2FnZVxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2Rpc2gtY2FsYycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIm5nLWNhcnQtZGlzaC1jYWxjXCIgKm5nSWY9XCJkaXNoXCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWluZ3JlZGllbnRzXCI+e3sgZGlzaC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb2RpZmllcnMuY3VzdG9tLmZpeGVkOyBlbHNlIG1vZGlmaWVyRml4ZWRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21vZGlmaWVyRml4ZWRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5jdXN0b20uZml4ZWQgYXMgbW9kaWZpZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1maXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChjaGlsZE1vZGlmaWVyLCAxLCAnY2hlY2tib3gnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgY2hpbGRNb2RpZmllci5kaXNoPy5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBjaGlsZE1vZGlmaWVyLmRpc2g/LnByaWNlIH19PC9zcGFuPiDigr1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllcnNcIiAqbmdJZj1cIm1vZGlmaWVycy5iYXNlTGlzdD8ubGVuZ3RoXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vZGlmaWVyIG9mIG1vZGlmaWVycy5iYXNlTGlzdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kZXNjcmlwdGlvblwiICpuZ0lmPVwiZ3JvdXAuZGVzY3JpcHRpb25cIj4+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItYm94XCIgKm5nSWY9XCJtb2RpZmllci5kaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gU2luZ2xlIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiAnc2luZ2xlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IG1vZGlmaWVyLm1pbkFtb3VudCB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBtb2RpZmllci5tYXhBbW91bnQgfHwgMTAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWNoaWxkcmVuXCIgKm5nSWY9XCJtb2RpZmllci5jaGlsZE1vZGlmaWVycz8ubGVuZ3RoXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gR3JvdXAgbW9kaWZpZXIgLS0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IG1vZGlmaWVyLm1vZGlmaWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPtCY0KLQntCT0J46PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyB0b3RhbFByaWNlfX08L3NwYW4+IOKCvVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI2Rpc2hJbWFnZVRlbXBsYXRlIGxldC1kaXNoPVwiZGlzaFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiPnt7IGRpc2gud2VpZ2h0ICogMTAwMCB9fSDQs9GAPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXByaWNlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1hY3Rpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwTWluQW1vdW50IDw9IDEgJiYgZ3JvdXBNYXhBbW91bnQgPT0gMTsgZWxzZSBjb3VudGVyVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50XG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY291bnRlclRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDb3VudGVyVGVtcGxhdGU7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBncm91cEFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBncm91cE1pbkFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBncm91cE1heEFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJDb3VudGVyVGVtcGxhdGUgLS0+XG5cbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDb3VudGVyVGVtcGxhdGVcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBBbW91bnQ9XCJncm91cEFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWluQW1vdW50PVwiZ3JvdXBNaW5BbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1heEFtb3VudD1cImdyb3VwTWF4QW1vdW50XCI+XG4gICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWNvdW50ZXJcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6ICFhbW91bnQgJiYgZ3JvdXBBbW91bnQgPj0gZ3JvdXBNYXhBbW91bnR9XCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWludXNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6ICFhbW91bnQgfHwgZ3JvdXBBbW91bnQgPD0gZ3JvdXBNaW5BbW91bnR9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgLSAxLCAnbWludXMnKVwiXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+LTwvZGl2PlxuICAgICAgICAgICAgPGlucHV0IFt2YWx1ZV09XCJhbW91bnRcIiByZWFkb25seSAjaW5wdXQ+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGx1c1wiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogZ3JvdXBBbW91bnQgPj0gZ3JvdXBNYXhBbW91bnR9XCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgKyAxLCAncGx1cycpXCJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4rPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZVxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIj5cbiAgICA8bmctY29udGFpbmVyPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3M9XCJtb2RpZmllci1jaGVja2JveFwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiBhbW91bnR9XCJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCA/IDAgOiAxLCAnY2hlY2tib3gnKVwiPjwvZGl2PlxuICAgIDwvbmctY29udGFpbmVyPlxuPC9uZy10ZW1wbGF0ZT5cbmAsXG4gIHN0eWxlczogW2AuZGlzaHtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1hbGlnbjpzdGFydDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O3BhZGRpbmctYm90dG9tOjM0cHg7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5Nn0uZGlzaCAuZGlzaC1pbWFnZS1ib3h7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MjUwcHg7aGVpZ2h0OjE3MHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7YmFja2dyb3VuZC1zaXplOjUwJX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3h7bWFyZ2luLWxlZnQ6MzRweDtoZWlnaHQ6MTcwcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1uOy13ZWJraXQtYm94LWFsaWduOnN0cmV0Y2g7YWxpZ24taXRlbXM6c3RyZXRjaDtwYWRkaW5nOjVweCAwIDA7Ym94LXNpemluZzpib3JkZXItYm94fS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1uYW1le2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjhweDtsaW5lLWhlaWdodDozMnB4O2xldHRlci1zcGFjaW5nOjIuNHB4O2NvbG9yOiMwYTA5MDl9LmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLWluZ3JlZGllbnRze2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjE3cHg7Y29sb3I6IzAwMDttYXJnaW4tdG9wOjE1cHg7LXdlYmtpdC1ib3gtZmxleDoxO2ZsZXgtZ3JvdzoxfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1wcmljZS1ib3h7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjstd2Via2l0LWJveC1wYWNrOmp1c3RpZnk7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjQ1cHg7bWFyZ2luLXJpZ2h0OjQ5cHh9LmRpc2gtaW1hZ2V7d2lkdGg6MjUwcHg7aGVpZ2h0OjEwMCU7Ym9yZGVyLXJhZGl1czowO2JhY2tncm91bmQtc2l6ZTpjb3ZlcjtiYWNrZ3JvdW5kLXBvc2l0aW9uOnRvcDtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXR9LnJlc3VsdHttYXJnaW4tdG9wOjQ5cHg7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyNHB4O2xpbmUtaGVpZ2h0OjI4cHg7Y29sb3I6IzBhMDkwOTt0ZXh0LWFsaWduOnJpZ2h0fS5yZXN1bHQgLnByaWNle21hcmdpbi1sZWZ0Ojc2cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItZ3JvdXB7bWFyZ2luLXRvcDoyNXB4O3BhZGRpbmctYm90dG9tOjI1cHg7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5Nn0ubW9kaWZpZXJzIC5tb2RpZmllci1oZWFkZXJ7bWFyZ2luLWJvdHRvbToyNXB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlciAubW9kaWZpZXItbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlciAubW9kaWZpZXItZGVzY3JpcHRpb257Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTdweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2h7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjstd2Via2l0LWJveC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO21hcmdpbi1ib3R0b206MnB4O2hlaWdodDoxMDBweDtib3gtc2l6aW5nOmJvcmRlci1ib3h9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1pbWFnZS1ib3h7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MTAwcHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7YmFja2dyb3VuZC1zaXplOjUwJTttYXJnaW4tcmlnaHQ6MjhweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveHstd2Via2l0LWJveC1mbGV4OjE7ZmxleC1ncm93OjE7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtb3JpZW50OnZlcnRpY2FsOy13ZWJraXQtYm94LWRpcmVjdGlvbjpub3JtYWw7ZmxleC1kaXJlY3Rpb246Y29sdW1uOy13ZWJraXQtYm94LXBhY2s6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3ggLm1vZGlmaWVyLWRpc2gtbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94IC5tb2RpZmllci1kaXNoLXdlaWdodHtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXRvcDoxMHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94e2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXJpZ2h0OjEwNXB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94IC56ZXJvLXByaWNle2Rpc3BsYXk6bm9uZX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWFjdGlvbi1ib3h7d2lkdGg6MTUxcHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcn0ubW9kaWZpZXItZml4ZWR7Ym9yZGVyOjJweCBzb2xpZCAjNzY3Njc2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7ZGlzcGxheTotd2Via2l0LWJveDtkaXNwbGF5OmZsZXg7LXdlYmtpdC1ib3gtYWxpZ246c3RyZXRjaDthbGlnbi1pdGVtczpzdHJldGNoO2hlaWdodDo0NXB4fS5tb2RpZmllci1maXhlZCAuaXRlbXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDt3aWR0aDoxNDJweDtoZWlnaHQ6NDVweDtjb2xvcjojNzY3Njc2O2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LXdlYmtpdC1ib3gtcGFjazpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjttYXJnaW4tdG9wOi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmZpcnN0LWNoaWxke21hcmdpbi1sZWZ0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtOmxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0Oi0ycHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVtLnNlbGVjdGVke2JhY2tncm91bmQ6IzBhMDkwOTtib3JkZXItcmFkaXVzOjE1cHg7Y29sb3I6I2ZmZn0ubW9kaWZpZXItZml4ZWQgLml0ZW06bm90KC5zZWxlY3RlZCl7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94e3dpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7YmFja2dyb3VuZDojZTBlMGUwO2JvcmRlci1yYWRpdXM6MTVweDtjdXJzb3I6cG9pbnRlcjtkaXNwbGF5Oi13ZWJraXQtYm94O2Rpc3BsYXk6ZmxleDstd2Via2l0LWJveC1wYWNrOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9Lm1vZGlmaWVyLWNoZWNrYm94LnNlbGVjdGVkOmFmdGVye2NvbnRlbnQ6dXJsKFwiZGF0YTppbWFnZS9zdmcreG1sOyBiYXNlNjQsIFBITjJaeUIzYVdSMGFEMGlNamdpSUdobGFXZG9kRDBpTWpnaUlIWnBaWGRDYjNnOUlqQWdNQ0F5T0NBeU9DSWdabWxzYkQwaWJtOXVaU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajRLUEhCaGRHZ2daRDBpVFRJZ01UTXVOVXd4TVM0ek1qTXhJREkyVERJMklESWlJSE4wY205clpUMGlZbXhoWTJzaUlITjBjbTlyWlMxM2FXUjBhRDBpTXk0MUlpQnpkSEp2YTJVdGJHbHVaV05oY0QwaWNtOTFibVFpSUhOMGNtOXJaUzFzYVc1bGFtOXBiajBpY205MWJtUWlMejRLUEM5emRtYytDZz09XCIpfS5tb2RpZmllci1jb3VudGVye2Rpc3BsYXk6LXdlYmtpdC1ib3g7ZGlzcGxheTpmbGV4Oy13ZWJraXQtYm94LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7cG9zaXRpb246cmVsYXRpdmU7Ym9yZGVyOm5vbmU7d2lkdGg6MTUxcHg7aGVpZ2h0OjUwcHg7Ym9yZGVyLXJhZGl1czoxNXB4O2JhY2tncm91bmQ6I2UwZTBlMH0ubW9kaWZpZXItY291bnRlci5kaXNhYmxlZHtvcGFjaXR5Oi4zfS5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5taW51cy5kaXNhYmxlZCwubW9kaWZpZXItY291bnRlcjpub3QoLmRpc2FibGVkKSAucGx1cy5kaXNhYmxlZHtvcGFjaXR5Oi4xNTtjdXJzb3I6ZGVmYXVsdH0ubW9kaWZpZXItY291bnRlciBpbnB1dHtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kOjAgMDt3aWR0aDoxMDAlO3BhZGRpbmc6MDtoZWlnaHQ6NTBweDtsaW5lLWhlaWdodDo1MHB4O3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MThweDtjb2xvcjojMGEwOTA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cywubW9kaWZpZXItY291bnRlciAucGx1c3tkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDk7cGFkZGluZzowIDMwcHg7Y3Vyc29yOnBvaW50ZXJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmhvdmVyLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmhvdmVye2NvbG9yOiMwMDB9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzOmFjdGl2ZSwubW9kaWZpZXItY291bnRlciAucGx1czphY3RpdmV7Y29sb3I6I2NjMDAwOX0ubW9kaWZpZXItY291bnRlciAubWludXMubG9hZGluZywubW9kaWZpZXItY291bnRlciAucGx1cy5sb2FkaW5ne29wYWNpdHk6LjJ9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVze2xlZnQ6MH0ubW9kaWZpZXItY291bnRlciAucGx1c3tyaWdodDowfWBdXG59KVxuZXhwb3J0IGNsYXNzIERpc2hDYWxjQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgIGRpc2g6YW55O1xuICBASW5wdXQoKSAgYW1vdW50OmFueTtcbiAgQElucHV0KCkgIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpICB2YWxpZGF0ZTpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpICBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgbW9kaWZpZXJzID0ge1xuICAgIGluZGV4QnlJZDoge30sXG4gICAgY3VzdG9tOiB7XG4gICAgICBmaXhlZDogbnVsbFxuICAgIH0sXG4gICAgYmFzZUxpc3Q6IFtdLFxuICB9O1xuXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcbiAgbW9kaWZpZXJzVmFsdWVUcmVlOiBhbnkgPSB7fTtcbiAgaW1hZ2VVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBldmVudGVyOkV2ZW50ZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoJ0ltYWdlVXJsJykgaW1hZ2VVcmw6c3RyaW5nXG4gICkge1xuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5tb2RpZmllcnMgPSB7XG4gICAgICBpbmRleEJ5SWQ6IHt9LFxuICAgICAgY3VzdG9tOiB7XG4gICAgICAgIGZpeGVkOiBudWxsXG4gICAgICB9LFxuICAgICAgYmFzZUxpc3Q6IFtdLFxuICAgIH07XG5cbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSA9IHt9O1xuICAgIGlmKHRoaXMuZGlzaCAmJiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVyIG9mIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcbiAgICAgICAgbGV0IG1vZGlmaWVyVHlwZSA9IG51bGw7XG4gICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyO1xuICAgICAgICAvLyBDaGVjayBDdXN0b20gbW9kaWZpZXJzIChsaWtlIFBpenphIFNpemUpXG4gICAgICAgIGlmKCF0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWRcbiAgICAgICAgICAmJiAhdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGggPT0gMlxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSBtb2RpZmllci5tYXhBbW91bnRcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgUGl6emEgU2l6ZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdjdXN0b20nO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZCA9IG1vZGlmaWVyO1xuICAgICAgICAgIGNvbnNvbGUuaW5mbygnQ3VzdG9tIEZpeGVkIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcbiAgICAgICAgfSBlbHNlIGlmKG1vZGlmaWVyLmdyb3VwXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGhcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5maW5kKG0gPT4gbS5kaXNoKSkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgQmFzZSBtb2RpZmllclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdncm91cCc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdHcm91cCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYnJva2VuIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0gPSBjaGlsZE1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChtb2RpZmllci5tb2RpZmllcklkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgICAgICBpZighdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddKXtcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCkge1xuICAgIGlmKGdyb3VwSWQgPT0gJ3NpbmdsZScpIHJldHVybjtcbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgPSBPYmplY3RcbiAgICAgIC52YWx1ZXModGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pXG4gICAgICAucmVkdWNlKChhOiBudW1iZXIsIGI6IG51bWJlcikgPT4gYSArIGIpO1xuICAgIHJldHVybiB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQ7XG4gIH1cblxuICBjYWxjdWxhdGVUb3RhbFByaWNlKCkge1xuICAgIGxldCB0b3RhbFByaWNlID0gdGhpcy5kaXNoLnByaWNlIHx8IDA7XG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG4gICAgICAgIGlmKGFtb3VudCkge1xuICAgICAgICAgIGNvbnN0IG1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xuICAgICAgICAgIGlmKG1vZGlmaWVyICYmIG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5wcmljZSkge1xuICAgICAgICAgICAgdG90YWxQcmljZSArPSBtb2RpZmllci5kaXNoLnByaWNlICogYW1vdW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnRvdGFsUHJpY2UgPSB0b3RhbFByaWNlO1xuICAgIHRoaXMuc2V0TW9kaWZpZXJzKCk7XG4gIH1cblxuICBnZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ3JvdXBJZDogKG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5ncm91cElkKSA/IG1vZGlmaWVyLmRpc2guZ3JvdXBJZCA6IHVuZGVmaW5lZCxcbiAgICAgIG1vZGlmaWVySWQ6IG1vZGlmaWVyLm1vZGlmaWVySWRcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllcjogYW55LCBhbW91bnQ6IG51bWJlciwgb3BlcmF0aW9uOiBzdHJpbmcpIHtcbiAgICBpZihhbW91bnQgPCAwKSByZXR1cm47XG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcbiAgICBjb25zdCB7IG1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQgPSAwLFxuICAgICAgICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG5cbiAgICAvLyBGb3IgY2hlY2tib3hcbiAgICBpZihvcGVyYXRpb24gPT0gJ2NoZWNrYm94JyAmJiBncm91cElkICE9PSAnc2luZ2xlJykge1xuICAgICAgLy8gSWYgaXQgd29yayBsaWtlIHJhZGlvIGJ1dHRvblxuICAgICAgaWYoZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxKSB7XG4gICAgICAgIGlmKGFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB6ZXJvIGFtb3VudCBmb3IgYWxsIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBpdGVtTW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW2l0ZW1Nb2RpZmllcklkXSA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdCBhY3Rpb24gbmVlZGVkIGFmdGVyXG4gICAgICBpZihhbW91bnQgPT0gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIEdyb3VwIGFtb3VudCBsaW1pdHNcbiAgICBpZihncm91cE1pbkFtb3VudCB8fCBncm91cE1heEFtb3VudCkge1xuICAgICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XG5cbiAgICAgIGlmKGdyb3VwQW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWluICR7Z3JvdXBNaW5BbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAn0J7Qs9GA0LDQvdC40YfQtdC90LjQtScsXG4gICAgICAgICAgICBg0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC+0L/RhtC40Lkg0LTQu9GPINCz0YDRg9C/0L/Ri1xuICAgICAgICAgICAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0g0L3QtSDQvNC10L3QtdC1ICR7Z3JvdXBNaW5BbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZ3JvdXBBbW91bnQgPiBncm91cE1heEFtb3VudCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXG4gICAgICAgICAgICDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDQvdC1INCx0L7Qu9C10LUgJHtncm91cE1heEFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ0hlY2sgTW9kaWZpZXIgYW1vdW50IGxpbWl0c1xuICAgIGlmKG1pbkFtb3VudCB8fCBtYXhBbW91bnQpIHtcbiAgICAgIGlmKGFtb3VudCA8IG1pbkFtb3VudCkge1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3BsdXMnOiBhbW91bnQgPSBtaW5BbW91bnQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbnVzJzogYW1vdW50ID0gMDsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGFtb3VudCA+IG1heEFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSBtYXhBbW91bnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gIH1cblxuICBzZXRNb2RpZmllcnMoKSB7XG4gICAgY29uc3QgbW9kaWZpZXJzVG9TZXQgPSBbXTtcblxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgICAgICBpZihhbW91bnQpIHtcblxuICAgICAgICAgIG1vZGlmaWVyc1RvU2V0LnB1c2goe1xuICAgICAgICAgICAgaWQ6IG1vZGlmaWVySWQsXG4gICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQgIT09ICdzaW5nbGUnID8gZ3JvdXBJZCA6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtb2RpZmllcnNUb1NldC5sZW5ndGgpIHtcbiAgICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaWVyc1RvU2V0LCBbXSk7XG4gICAgfVxuICB9XG59XG4iXX0=