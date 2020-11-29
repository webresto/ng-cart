import { OnInit, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { NgRestoCartService } from "../../services/ng-restocart.service";
import { EventerService } from '@webresto/ng-core';
export declare class DishCalcLnComponent implements OnInit, OnChanges, OnDestroy {
    private cartService;
    private eventer;
    dish: any;
    amount: any;
    selectedModifiers: any;
    validate: EventEmitter<any>;
    amountDishToAdd: EventEmitter<any>;
    comment: EventEmitter<string>;
    modifiers: {
        indexById: {};
        custom: {
            fixed: any;
        };
        baseList: any[];
    };
    isTwoPartsAssembledTemplate: boolean;
    totalPrice: number;
    modifiersValueTree: any;
    twoPartsAssembledModifiersIdsByGroupId: any;
    imageUrl: string;
    constructor(cartService: NgRestoCartService, eventer: EventerService, imageUrl: string);
    ngOnInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    calculateTotalAmountInGroup(groupId: any): any;
    checkImagesInModifier(modifierId: any): void;
    calculateTotalPrice(): void;
    getModifiersIds(modifier: any): {
        groupId: any;
        modifierId: any;
    };
    selectTwoPartsAssembledModifier(modifier: any): void;
    changeModifierAmount(modifier: any, amount: number, operation: string): void;
    setModifiers(): void;
    checkValid(): void;
}
