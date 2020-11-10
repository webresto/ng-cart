import { Observable, BehaviorSubject } from 'rxjs';
import { NetService, EventerService, EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
export declare class NgRestoCartService {
    private net;
    private eventer;
    cartID: string;
    cart: BehaviorSubject<Cart>;
    modifires: BehaviorSubject<any>;
    OrderFormChange: BehaviorSubject<any>;
    modifiresMessage: BehaviorSubject<EventMessage[]>;
    constructor(net: NetService, eventer: EventerService);
    restrictions$: BehaviorSubject<string>;
    restrictionsLoader$: import("rxjs").Subscription;
    getCartId(): string;
    getCart(): Observable<Cart>;
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
    productInCart(product: DishListItem): Observable<boolean>;
    getPickupPoints(): Observable<PickupPoint[]>;
    getPaymentMethods(): Observable<PaymentMethod[]>;
    static ɵfac: i0.ɵɵFactoryDef<NgRestoCartService, never>;
    static ɵprov: i0.ɵɵInjectableDef<NgRestoCartService>;
}
declare interface PickupPoint {
    id: string;
    title: string;
    address: string;
    order: number;
    enable: boolean;
    createdAt: string;
    updatedAt: string;
}
declare interface PaymentMethod {
    iikoPaymentMethod: any;
    id: string;
    title: string;
    type: string;
    adapter: string;
    order: number;
    description: string;
    enable: boolean;
    createdAt: string;
    updatedAt: string;
}
declare interface DishInCart {
    addedBy: string;
    amount: number;
    cart: string;
    comment: string;
    createdAt: string;
    dish: DishListItem;
    id: number;
    itemTotal: number;
    modifiers: any[];
    parent: any;
    totalWeight: number;
    uniqueItems: number;
    updatedAt: string;
    weight: number;
}
declare interface Cart {
    address: any;
    cartId: string;
    cartTotal: number;
    comment: string;
    createdAt: string;
    customer: string;
    delivery: any;
    deliveryDescription: string;
    deliveryItem: any;
    deliveryStatus: any;
    dishes: DishInCart[];
    dishesCount: number;
    history: any;
    id: string;
    message: any;
    modifiers: any;
    nameOfModel: any;
    personsCount: number;
    problem: boolean;
    rmsId: string;
    selfDelivery: boolean;
    sendToIiko: boolean;
    state: string;
    totalWeight: string;
    uniqueDishes: string;
    updatedAt: string;
    user: any;
    FreeDeliveryFromMessage: string;
    date: null;
    deliveryTimeMessage: string;
    deliveryTotal: number;
    discountTotal: number;
    isPaymentPromise: boolean;
    orderDate: string;
    orderDateLimit: string;
    orderTotal: number;
    paid: boolean;
    paymentMethod: string;
    paymentMethodTitle: string;
    recommends: DishListItem[];
    rmsDelivered: boolean;
    rmsDeliveryDate: null;
    rmsErrorCode: null;
    rmsErrorMessage: null;
    rmsOrderData: null;
    rmsOrderNumber: null;
    rmsStatusCode: null;
    selfService: boolean;
    shortId: string;
    total: number;
    untilFreeDeliveryMessage: string;
}
declare interface DishListItem {
    additionalInfo: any;
    balance: number;
    carbohydrateAmount: number;
    carbohydrateFullAmount: number;
    code: string;
    createdAt: string;
    description: string;
    differentPricesOn: any[];
    doNotPrintInCheque: boolean;
    energyAmount: number;
    energyFullAmount: number;
    fatAmount: number;
    fatFullAmount: number;
    fiberAmount: number;
    fiberFullAmount: number;
    groupId: any;
    groupModifiers: [];
    hash: number;
    id: string;
    images: DishImageItem[];
    imagesList: DishImageItem[];
    isDeleted: boolean;
    isIncludedInMenu: boolean;
    measureUnit: string;
    modifiers: DishModifier[];
    name: string;
    order: number;
    parentGroup: string;
    price: number;
    productCategoryId: string;
    prohibitedToSaleOn: any[];
    rmsId: string;
    seoDescription: any;
    seoKeywords: any;
    seoText: any;
    seoTitle: any;
    slug: string;
    tags: any[];
    tagsList: any[];
    type: string;
    updatedAt: string;
    useBalanceForSell: boolean;
    weight: number;
}
declare interface DishImageUrls {
    large: string;
    origin: string;
    small: string;
}
declare interface DishImageItem {
    createdAt: string;
    group: any;
    id: string;
    images: DishImageUrls;
    updatedAt: string;
    uploadDate: string;
}
declare interface DishBaseModifier {
    maxAmount: number;
    minAmount: number;
    modifierId: string;
    required: boolean;
}
declare interface DishModifier extends DishBaseModifier {
    childModifiers: DishChildModifier[];
    childModifiersHaveMinMaxRestrictions: boolean;
    group: DishListItem;
}
declare interface DishChildModifier extends DishBaseModifier {
    defaultAmount: number;
    hideIfDefaultAmount: boolean;
    dish: DishListItem;
}
export {};
//# sourceMappingURL=ng-restocart.service.d.ts.map