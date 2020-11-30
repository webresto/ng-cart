import { Renderer2, ElementRef, OnDestroy, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
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
}
//# sourceMappingURL=dish-calc.directive.d.ts.map