import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import {
  NetService,
  EventerService,
  EventMessage
} from '@sails-resto/ng-core';

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

  modifiresMessage:BehaviorSubject<any>;
  messages:EventMessage[];

  constructor(
    private net:NetService,
    private eventer:EventerService
  ) {
    this.cart = new BehaviorSubject({});
    this.modifires = new BehaviorSubject([]);
    this.modifiresMessage = new BehaviorSubject([]);

    this.initialStorage();

    this.modifiresMessage.subscribe(messages => this.messages = messages);
  }

  initialStorage() {

    this.cartID = this.getcartIDFromStorage();

    if (this.cartID) {
      this.net.get('/cart?cartId=' + this.cartID).subscribe(cart=> {
        this.cart.next(cart.cart);
      });
    }

    /*     this.restoStorageService.sub('localStorageService','cartID').subscribe(res=>{

     if(res.changeKey){
     console.log("event",res)
     this.net.get('/cart?cartId='+this.cartID).subscribe(cart=>{
     this.cart.next(cart);
     });}

     });; */


  }

  getcartIDFromStorage():string {
    return localStorage.getItem('cartID');

  }

  addDishToCart(data) {

    if(this.messages.length) {
      this.messages.forEach(message => {
        this.eventer.emitMessageEvent(message);
      });
      return;
    }

    this.net.put('/cart/add', data).subscribe(
      res=> {

        this.setcartIDFromStorage(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        this.eventer.emitMessageEvent(
          new EventMessage('success', 'Успех', 'Блюдо добавлено в корзину')
        );
        console.log(res)

      }, error => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось добавить блюдо')
        )
      });
  }

  setDishCountToCart(dishId, amount) {
    this.net.post('/cart/set', {
        "dishId": dishId,
        "cartId": this.cartID,
        "amount": amount
    }).subscribe(
      res=> {

        this.setcartIDFromStorage(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        /*this.eventer.emitMessageEvent(
          new EventMessage('success', 'Успех', 'Изменено количество')
        );*/
        console.log(res)

      }, error => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось изменить количество')
        )
      });
  }

  removeDishFromCart(dishId, amount) {
    this.net.put('/cart/remove', {
      "dishId": dishId,
      "cartId": this.cartID,
      "amount": amount
    }).subscribe(
      res=> {

        this.setcartIDFromStorage(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;
        this.eventer.emitMessageEvent(
          new EventMessage('success', 'Успех', 'Блюдо успешно удалено')
        );
        console.log(res)

      }, error => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось удалить блюдо')
        )
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
    this.orderCart(order);

  }

  orderCart(data):void {
    this.net.post('/order', data).subscribe(
      res => {

        this.setcartIDFromStorage(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID = res.cart.cartId;

        this.eventer.emitMessageEvent(
          new EventMessage('success', 'Успех', 'Заказ упешно оформлен')
        );
        console.log(res)

      }, error => {
        this.eventer.emitMessageEvent(
          new EventMessage('error', 'Ошибка', 'Не удалось оформить заказ')
        )
      });

  }

  checkStreet(data):void{

    this.net.post('/check', data).subscribe(
      res => {
        this.setcartIDFromStorage(res.cart.cartId);
        this.cart.next(res.cart);
        this.cartID =res.cart.cartId;
        if(res.message){

          this.eventer.emitMessageEvent(
            new EventMessage(res.message.type, res.message.title, res.message.body)
          );

        }

      }, error =>{
        if(error.error) {
          if(error.error.cart) {
            this.setcartIDFromStorage(error.error.cart.cartId);
            this.cart.next(error.error.cart);
            this.cartID =error.error.cart.cartId;
          }

          this.eventer.emitMessageEvent(
            new EventMessage(error.error.message.type, error.error.message.title, error.error.message.body)
          );
        }
      });

  }

  setcartIDFromStorage(cartID) {
    localStorage.setItem('cartID', cartID);

  }

  userCart():Observable<any> {
    return this.cart;
  }

  setModifires(modifires, messages?: EventMessage[]):void {
    this.modifires.next(modifires);
    if(messages) this.modifiresMessage.next(messages);
  }

  getModifires():Observable<any> {
    return this.modifires;
  }


}
