import { Observable, BehaviorSubject } from 'rxjs';
import { NetService, EventerService, EventMessage } from '@sails-resto/ng-core';
export declare class NgRestoCartService {
    private net;
    private eventer;
    cartID: string;
    cart: BehaviorSubject<any>;
    modifires: BehaviorSubject<any>;
    modifiresMessage: BehaviorSubject<any>;
    messages: EventMessage[];
    constructor(net: NetService, eventer: EventerService);
    initialStorage(): void;
    getcartIDFromStorage(): string;
    addDishToCart(data: any): void;
    setDishCountToCart(dishId: any, amount: any): void;
    removeDishFromCart(dishId: any, amount: any): void;
    checkoutCart(data: any): void;
    orderCart(data: any): void;
    checkStreet(data: any): void;
    setcartIDFromStorage(cartID: any): void;
    userCart(): Observable<any>;
    setModifires(modifires: any, messages?: EventMessage[]): void;
    getModifires(): Observable<any>;
}
