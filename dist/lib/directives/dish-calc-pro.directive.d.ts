import { OnDestroy, EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class DishCalcProDirective implements OnDestroy {
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
    constructor(cartService: NgRestoCartService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
