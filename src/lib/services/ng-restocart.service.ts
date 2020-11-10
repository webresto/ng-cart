import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, from } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import {
  NetService,
  EventerService,
  EventMessage
} from '@webresto/ng-core';

@Injectable({
  providedIn: 'root'
})
export class NgRestoCartService {
  cartID: string = this.getCartId();
  cart: BehaviorSubject<Cart> = new BehaviorSubject(null);

  modifires: BehaviorSubject<any> = new BehaviorSubject([]);
  OrderFormChange = new BehaviorSubject(null);

  modifiresMessage: BehaviorSubject<EventMessage[]> = new BehaviorSubject([]);

  constructor(private net: NetService, private eventer: EventerService) { }

  getCartId(): string {
    return localStorage.getItem('cartID');
  }

  getCart() {
    return this.net.get<{cart:Cart,state:any}>('/cart?cartId=' + this.cartID).pipe(
      switchMap(
        cart => {
          if (cart.state == 'ORDER') {
            return throwError(new Error('Cart in order state'));
          } else {
            this.cart.next(cart.cart);
          };
          return this.cart;
        }),
      catchError(err => {
        this.removeCartId();
        return throwError(err);
      })
    );
  }

  addDishToCart(data) {

    if (this.modifiresMessage.value.length) {
      this.modifiresMessage.value.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
      return;
    }

    this.net.put('/cart/add', data).subscribe(
      res => {

        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        /*this.eventer.emitMessageEvent(
         new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
         );*/

      }, () => {
        /*this.eventer.emitMessageEvent(
         new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
         )*/
      });
  }

  addDishToCart$(data) {
    if (this.modifiresMessage.value.length) {
      this.modifiresMessage.value.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
      return from([null]);
    }

    return this.net.put('/cart/add', data)
      .pipe(
        tap(res => {
          this.setCartId(res.cart.cartId);
          this.cart.next(res.cart);
          this.cartID = res.cart.cartId;
        })
      );
  }

  setDishCountToCart(dishId, amount) {
    this.net.post('/cart/set', {
      dishId: dishId,
      cartId: this.cartID,
      amount: amount
    }).subscribe(
      res => {
        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        /*this.eventer.emitMessageEvent(
         new EventMessage('success', 'Успех', 'Изменено количество')
         );*/


      }, () => {
        /*this.eventer.emitMessageEvent(
         new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
         )*/
      });
  }

  setDishComment(dishId, comment) {
    return this.net.post('/cart/setcomment', {
      dishId: dishId,
      cartId: this.cartID,
      comment: comment
    }).pipe(tap(
      res => {
        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

      }, () => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий')
        )
      }
    ))

  }

  removeDishFromCart$(dishId, amount) {
    return this.net.put('/cart/remove', {
      dishId: dishId,
      cartId: this.cartID,
      amount: amount
    })
      .pipe(tap(res => {
        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;
      }));

  }

  removeDishFromCart(dishId, amount) {
    this.net.put('/cart/remove', {
      dishId: dishId,
      cartId: this.cartID,
      amount: amount
    }).subscribe(
      res => {

        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;
        /*this.eventer.emitMessageEvent(
         new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
         );*/

      }, error => {
        /*this.eventer.emitMessageEvent(
         new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
         )*/
      });

  }

  checkoutCart(data) {
    let order = {
      cartId: this.cartID,
      address: {
        streetId: data.street.id,
        home: data.house,
        housing: data.housing,
        // index: "1278",
        entrance: data.entrance,
        floor: data.floor,
        apartment: data.apartment
      },

      customer: {
        phone: data.phone,
        name: data.name,
        mail: data.email || undefined
      }
    };
    return this.orderCart(order);

  }

  orderCart(data) {
    return this.net.post('/order', data)
      .pipe(
        tap(
          result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*this.eventer.emitMessageEvent(
             new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
             );*/
          },
          error => {
            console.log("Ошибка оформления!", error);
            if (error.error && error.error.cart) {
              this.setCartId(error.error.cart.cartId);
              this.cart.next(error.error.cart);
              this.cartID = error.error.cart.cartId;
            }
            /*if (error.message) {
              this.eventer.emitMessageEvent(
                new EventMessage(error.message.type, error.message.title, error.message.body)
              );
            } else {
              this.eventer.emitMessageEvent(
                new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
              );
            }*/
          }
        )
      );
  }

  checkStreetV2(data): Observable<any> {
    return this.net.post('/check', data)
      .pipe(
        tap(
          result => {
            this.setCartId(result.cart.cartId);
            this.cart.next(result.cart);
            this.cartID = result.cart.cartId;
            /*if (result.message) {
             this.eventer.emitMessageEvent(
             new EventMessage(
             result.message.type,
             result.message.title,
             result.message.body
             )
             );
             }*/
          },
          error => {
            console.error(error);
            //this.eventer.emitMessageEvent(
            //new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
            //)
          }
        )
      );
  }

  checkStreet(data): void {

    this.net.post('/check', data).subscribe(
      res => {
        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;
        if (res.message) {
          this.eventer.emitMessageEvent(
            new EventMessage(res.message.type, res.message.title, res.message.body)
          );
        }
      }, error => {
        if (error.error) {
          if (error.error.cart) {
            this.setCartId(error.error.cart.cartId);
            this.cart.next(error.error.cart);
            this.cartID = error.error.cart.cartId;
          }
          /*this.eventer.emitMessageEvent(
           new EventMessage(error.error.message.type, error.error.message.title, error.error.message.body)
           );*/
        }
      });

  }

  setCartId(cartID) {
    localStorage.setItem('cartID', cartID);
  }

  removeCartId() {
    localStorage.removeItem('cartID');
  }

  userCart(): Observable<any> {
    return this.cart;
  }

  setModifires(modifires, messages?: EventMessage[]): void {
    this.modifires.next(modifires);
    if (messages) {
      this.modifiresMessage.next(messages);
    };
  }

  getModifires(): Observable<any> {
    return this.modifires.pipe();
  }

  productInCart(product:DishListItem) {
    return this.cart.pipe(
      filter(cart => 'cartId' in cart),
      map(cart => {
        return !!(cart && cart?.dishes?.find(dishInCart => dishInCart.dish.id === product.id))
      })
    );
  }

  getPickupPoints() {
    return this.net.get<PickupPoint[]>('/pickupaddreses?cartId=string');
  }

  getPaymentMethods() {
    return this.net.get<PaymentMethod[]>('/paymentmethods');
  }

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
  iikoPaymentMethod: any,
  id: string,
  title: string,
  type: string,
  adapter: string,
  order: number,
  description: string,
  enable: boolean,
  createdAt: string,
  updatedAt: string
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
  address: any
  cartId: string
  cartTotal: number
  comment: string
  createdAt: string
  customer: string
  delivery: any
  deliveryDescription: string
  deliveryItem: any
  deliveryStatus: any
  dishes: DishInCart[]
  dishesCount: number
  history: any
  id: string
  message: any
  modifiers: any
  nameOfModel: any
  personsCount: number
  problem: boolean
  rmsId: string
  selfDelivery: boolean
  sendToIiko: boolean
  state: string
  totalWeight: string
  uniqueDishes: string
  updatedAt: string
  user: any
  FreeDeliveryFromMessage: string
  date: null
  deliveryTimeMessage: string
  deliveryTotal: number
  discountTotal: number
  isPaymentPromise: boolean
  orderDate: string
  orderDateLimit: string
  orderTotal: number
  paid: boolean
  paymentMethod: string
  paymentMethodTitle: string
  recommends: DishListItem[];
  rmsDelivered: boolean
  rmsDeliveryDate: null
  rmsErrorCode: null
  rmsErrorMessage: null
  rmsOrderData: null
  rmsOrderNumber: null
  rmsStatusCode: null
  selfService: boolean
  shortId: string
  total: number
  untilFreeDeliveryMessage: string
}

declare interface DishListItem {
  additionalInfo: any
  balance: number
  carbohydrateAmount: number
  carbohydrateFullAmount: number
  code: string
  createdAt: string
  description: string
  differentPricesOn: any[]
  doNotPrintInCheque: boolean
  energyAmount: number
  energyFullAmount: number
  fatAmount: number
  fatFullAmount: number
  fiberAmount: number
  fiberFullAmount: number
  groupId: any
  groupModifiers: []
  hash: number
  id: string
  images: DishImageItem[]
  imagesList: DishImageItem[]
  isDeleted: boolean
  isIncludedInMenu: boolean
  measureUnit: string
  modifiers: DishModifier[]
  name: string
  order: number
  parentGroup: string
  price: number
  productCategoryId: string
  prohibitedToSaleOn: any[]
  rmsId: string
  seoDescription: any
  seoKeywords: any
  seoText: any
  seoTitle: any
  slug: string
  tags: any[]
  tagsList: any[]
  type: string
  updatedAt: string
  useBalanceForSell: boolean
  weight: number
}

declare interface DishImageUrls {
  large: string
  origin: string
  small: string
}

declare interface DishImageItem {
  createdAt: string
  group: any
  id: string
  images: DishImageUrls
  updatedAt: string
  uploadDate: string
}

declare interface DishBaseModifier {
  maxAmount: number
  minAmount: number
  modifierId: string
  required: boolean
}

declare interface DishModifier extends DishBaseModifier {
  childModifiers: DishChildModifier[]
  childModifiersHaveMinMaxRestrictions: boolean
  group: DishListItem
}

declare interface DishChildModifier extends DishBaseModifier {
  defaultAmount: number
  hideIfDefaultAmount: boolean
  dish: DishListItem
}