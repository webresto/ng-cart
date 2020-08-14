import { Observable, BehaviorSubject } from 'rxjs';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
export declare class NgRestoCartService {
    private net;
    private eventer;
    cartID: string;
    cart: BehaviorSubject<any>;
    modifires: BehaviorSubject<any>;
    OrderFormChange: BehaviorSubject<any>;
    modifiresMessage: BehaviorSubject<any>;
    messages: EventMessage[];
    constructor(net: NetService, eventer: EventerService);
    initialStorage(): void;
    getCartId(): string;
    addDishToCart(data: any): void;
    setDishCountToCart(dishId: any, amount: any): void;
    setDishComment(dishId: any, comment: any): Observable<any>;
    removeDishFromCart(dishId: any, amount: any): void;
    checkoutCart(data: any): Observable<any>;
    orderCart(data: any): Observable<any>;
    checkStreetV2(data: any): Observable<any>;
    checkStreet(data: any): void;
    setCartId(cartID: any): void;
    removeCartId(): void;
    userCart(): Observable<any>;
    setModifires(modifires: any, messages?: EventMessage[]): void;
    getModifires(): Observable<any>;
}
