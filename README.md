# Документация ng-RestoCart 
## Установка модуля
Модуль устанавливается с Git репозитория, в папку node_modules
## Подключение модуля в проект
Добавите следующие в ваш app.module.ts

~~~ javascript
import { NgRestoCartModule } from '@sails-resto/ng-cart';
~~~
~~~ javascript
imports: [
  ..........
  NgRestoCartModule,
]
~~~

## Использование корзины в вашем компоненте с помощью сервиса
~~~ javascript
import { NgRestoCartService } from 'ng-restocart';
..........
  ngOnInit() {
     this.ngRestoCart
        .userCart()
        .subscribe(res=>{
            this.cart = res; // каждый раз когда что то происходит с корзиной внутри модуля она будет перезаписана до актуального состояния здесь
            ...........
        });
  }
~~~

## Директивы

### [addToCart] - добавляет блюдо в корзину
Пример использования в компоненте:

~~~ html
 <button addToCart [dish]="dishForCart" [amountDish]="amountDish" (click)="hideModal()"   class="btn btn_confirm">Добавить </button>
~~~
где:dishForCart - объект блюда которое надо добавить в корзину, amountDish - количество "порций" этого блюда для добавления

### [deleteFromCart] - удаляет блюдо из корзины
Пример использования в компоненте:

~~~ html
 <button deleteFromCart [dish]="dishForCart" [amountDish]="amountDish" (click)="hideModal()"   class="btn btn_confirm">Удалить </button>
~~~
где:dishForCart - объект блюда которое надо удалить из корзины, amountDish - количество "порций" этого блюда для удаления

### [amountCart]  - добавляет текущее количество блюд в корзине
Пример использования в компоненте:

~~~ html
<div amountCart class="cart-count-container"> </div>
~~~
Директива добавит внутрь контейнера строку с текущим количеством блюд в корзине

## Сервисы
###Eventer - генерирует события в процессе работы с модулем Ng-RestoCart
Прммер использования:


~~~ javascript
import {EventerService} from 'ng-restocart';
.......
  constructor( private eventerService : EventerService) { }
  ngOnInit() {
     this.eventerService.getMessageEmitter().subscribe( message => {console.log(message)});
  }
~~~
 getMessageEmitter() -  метод который позволяет подписаться на получение сообщений от модуля.




