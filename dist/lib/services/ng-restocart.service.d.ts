import { Observable, BehaviorSubject } from 'rxjs';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
export declare class NgRestoCartService {
    private net;
    private eventer;
    cartID: string;
    cart: BehaviorSubject<any>;
    cart$: import("rxjs").Subscription | Observable<any>;
    modifires: BehaviorSubject<any>;
    OrderFormChange: BehaviorSubject<any>;
    modifiresMessage: BehaviorSubject<EventMessage[]>;
    constructor(net: NetService, eventer: EventerService);
    getCartId(): string;
    addDishToCart(data: any): void;
    addDishToCart$(data: any): Observable<any>;
    setDishCountToCart(dishId: any, amount: any): void;
    setDishComment(dishId: any, comment: any): Observable<any>;
    removeDishFromCart$(dishId: any, amount: any): Observable<any>;
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
    static ɵfac: i0.ɵɵFactoryDef<NgRestoCartService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgRestoCartService>;
}
//# sourceMappingURL=ng-restocart.service.d.ts.map