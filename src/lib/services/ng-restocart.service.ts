import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import {
  NetService,
  EventerService,
  EventMessage
} from '@webresto/ng-core';

import { Order } from '../interfaces/order';
/*  TODO: В етом класе еще надо реализовать логику проверки доступности разных типов зхранилищь, но пока нету фикса нужного нам модуля ето
 затруднательно прийдется ждать.  */

@Injectable({
  providedIn: 'root'
})
export class NgRestoCartService {
  cartID:string;
  cart:BehaviorSubject<any>;
  modifires:BehaviorSubject<any>;
  OrderFormChange = new BehaviorSubject(null);

  modifiresMessage:BehaviorSubject<any>;
  messages:EventMessage[];

  constructor(private net:NetService,
              private eventer:EventerService) {
    this.cart = new BehaviorSubject({});
    this.modifires = new BehaviorSubject([]);
    this.modifiresMessage = new BehaviorSubject([]);

    this.initialStorage();

    this.modifiresMessage.subscribe(messages => this.messages = messages);
  }

  initialStorage() {
    this.cartID = this.getCartId();
    if (this.cartID) {
      this.net
        .get('/cart?cartId=' + this.cartID)
        .subscribe(
          cart => this.cart.next(cart.cart),
          error => this.removeCartId()
        );
    }
  }

  getCartId():string {
    return localStorage.getItem('cartID');
  }

  addDishToCart(data) {

    if (this.messages.length) {
      this.messages.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
      return;
    }

    this.net.put('/cart/add', data).subscribe(
      res=> {

        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        /*this.eventer.emitMessageEvent(
         new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
         );*/

      }, error => {
        /*this.eventer.emitMessageEvent(
         new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
         )*/
      });
  }

  addDishToCart$(data) {

    if (this.messages.length) {
      this.messages.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
      return of(null);
    }

    return this.net.put('/cart/add', data)
      .pipe(
        tap(res=> {
          this.setCartId(res.cart.cartId);
          this.cart.next(res.cart);
          this.cartID = res.cart.cartId;
        })
      );
  }

  setDishCountToCart(dishId, amount) {
    this.net.post('/cart/set', {
      "dishId": dishId,
      "cartId": this.cartID,
      "amount": amount
    }).subscribe(
      res=> {

        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        /*this.eventer.emitMessageEvent(
         new EventMessage('success', 'Успех', 'Изменено количество')
         );*/


      }, error => {
        /*this.eventer.emitMessageEvent(
         new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
         )*/
      });
  }

  setDishComment(dishId, comment) {
    return this.net.post('/cart/setcomment', {
      "dishId": dishId,
      "cartId": this.cartID,
      "comment": comment
    }).pipe(tap(
      res=> {

        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

      }, error => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось изменить коментарий')
        )
      }
    ))

  }

  removeDishFromCart$(dishId, amount) {
    return this.net.put('/cart/remove', {
      "dishId": dishId,
      "cartId": this.cartID,
      "amount": amount
    })
      .pipe(tap(res => {
        this.setCartId(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;
      }));

  }

  removeDishFromCart(dishId, amount) {
    this.net.put('/cart/remove', {
      "dishId": dishId,
      "cartId": this.cartID,
      "amount": amount
    }).subscribe(
      res=> {

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
    let order:Order = {
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

  checkStreetV2(data):Observable<any> {
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

  checkStreet(data):void {

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

  userCart():Observable<any> {
    return this.cart;
  }

  setModifires(modifires, messages?:EventMessage[]):void {
    this.modifires.next(modifires);
    if (messages) this.modifiresMessage.next(messages);
  }

  getModifires():Observable<any> {
    return this.modifires;
  }


}
