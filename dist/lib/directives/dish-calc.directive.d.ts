import { Renderer2, ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class DishCalcDirective implements OnDestroy {
    private renderer;
    private el;
    private cartService;
    dish: any;
    amount: any;
    selectedModifiers: any;
    validate: EventEmitter<any>;
    amountDishToAdd: EventEmitter<any>;
    weightTotal: any;
    amountDish: any;
    price: any;
    amountModifires: any;
    stateModifiers: any;
    testcountCall: any;
    constructor(renderer: Renderer2, el: ElementRef, cartService: NgRestoCartService);
    ngOnInit(): void;
    renderDish(dish: any): void;
    generatePrice(priceDish: any, amount?: any, modifiresPrice?: any): string;
    generateTotalWeight(): string;
    innerTotalWeight(totalWeigthDiv: any): void;
    changeAmountdish(value: any): void;
    render(modifires: any): void;
    groupDiv(nameGorup: any): any;
    modifireDiv(element: any, groupId: any): any;
    renderOneModifire(element: any, modifireDiv: any, groupId: any): void;
    renderCheckbox(element: any, isActive: any, itemQuantity: any, modifireDiv: any, groupId: any): void;
    renderInputButton(element: any, groupId: any, itemQuantity: any, modifireDiv: any): void;
    setModifires(): void;
    idRadioBox(groupId: any): boolean;
    checkMinAmountModifires(groupId: any, modifire: any): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<DishCalcDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<DishCalcDirective, "[dishCalc]", never, { "dish": "dish"; "amount": "amount"; "selectedModifiers": "selectedModifiers"; }, { "validate": "validate"; "amountDishToAdd": "amountDishToAdd"; }, never>;
}
//# sourceMappingURL=dish-calc.directive.d.ts.map