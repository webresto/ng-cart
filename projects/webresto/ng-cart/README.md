# Документация ng-RestoCart 
## Установка модуля
Модуль устанавливается с Git репозитория, в папку node_modules
## Подключение модуля в проект
Добавите следующие в ваш app.module.ts

~~~ javascript
import { NgRestoCartModule } from '@webresto/ng-cart';
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

### [setDishAmount] - изменяет количество порций блюда
Пример использования в компоненте:

~~~ html
<a SetDishAmount [dish]="dish" [action]="'-'" class="main-item__quantity-button">&#8722;</a>
<a SetDishAmount [dish]="dish" [action]="'+'" class="main-item__quantity-button">&#x2b;</a>
~~~
где:dish - объект блюда из корзины action - действие: "+" - добавить порцию, "-" - удалить порцию

### [amountCart]  - добавляет текущее количество блюд в корзине
Пример использования в компоненте:

~~~ html
<div amountCart class="cart-count-container"> </div>
~~~
Директива добавит внутрь контейнера строку с текущим количеством блюд в корзине

### [orderCart] - принимает даные из формы и отправляет заказ на офрмление
Пример использования в компоненте:

~~~ html
<form #myForm="ngForm" >
          <input [(ngModel)]="order.name" name="name" type="text" placeholder="Имя *">
          <input  [(ngModel)]="order.housing" name="housing"  type="text" placeholder="Корпус">
          <input  [(ngModel)]="order.apartment" name="apartment"  type="text" placeholder="Квартира">
          <input  [(ngModel)]="order.entrance" name="entrance" type="text" placeholder="Подъезд">
          <input  [(ngModel)]="order.doorphone" name="doorphone" type="text" placeholder="Код Домофона">
          <input  [(ngModel)]="order.floor" name="floor" type="text" placeholder="Этаж">
          <button class="btn" [disabled]="myForm.invalid" [orderCart]="myForm" >оформить заказ</button>
         
    </form>
~~~
где [orderCart]="myForm" получает поля форму myForm, (Не забудьте импортировать FormModule в app.module.ts).
Ваша форма должна содержать обязательные поля: 
~~~
"name" :"string",
"phone",:"string, обязательно начинается с 7 и содержит 11 цифр"
"street": "объект улицы полученый с бекенда",
"house": "string, цифры".
~~~
Отправка срабатывает при клике на елемент в котором использовалась директива, в даном случае это button.
Будьте внимательны, вы самостоятельно должны реализовать валидацию ввода, обязательных полей.



### [checkout] - оформление заказа с учетом сохраненного адреса
Пример использования в компоненте.

Селект выбора адреса:

~~~ html
        <div class="form-item">
          <label for="">Выберите адрес</label>
          <select [(ngModel)]="selectedAddress">
            <ng-container *ngFor="let address of addresses">
              <option value="{{address.id}}">{{address.name}} ({{address | addressFormated}})</option>
            </ng-container>
            <option value="other">Указать другой адрес</option>
          </select>
        </div>
~~~

Далее если пользователь выбрал свой адрес будет видну следующий button:

~~~ html
        <button checkout *ngIf="selectedAddress != 'other'"
              [name]="name.value"
              [email]="email.value"
              [phone]="phone.value"

              [locationId]="selectedAddress"

              [comment]="comment.value"
              [disabled]="loading || orderForm.invalid || !selectedAddress"

              (error)="loading = false"
              (success)="loading = false; checkoutSuccess = true"
              (click)="loading = true"
              class="btn-yellow-hollow">Оформить</button>
              
~~~

Если же пользователь не авторизирован или захотел другой адрес то сработает это


~~~ html
<ng-container *ngIf="!isLoggedIn || selectedAddress == 'other'">
      <h2 class="align-left" [style.margin]="'50px 0'">Укажите адрес</h2>

      <form [formGroup]="addressForm" novalidate>
        <div class="row">
          <div class="form-item">
            <select #street    formControlName="street">
              <option value="0">Укажите улицу</option>
              <ng-container *ngFor="let street of streets">
                <option value="{{street.id}}">{{street.name}}</option>
              </ng-container>
            </select>
          </div>
          <div class="form-item"><input #home      formControlName="home"  type="text" placeholder="Дом"></div>
        </div>
        <div class="row">
          <div class="form-item"><input #housing   formControlName="housing"  type="text" placeholder="Корпус"></div>
          <div class="form-item"><input #apartment formControlName="apartment"  type="text" placeholder="Квартира"></div>
          <div class="form-item"><input #entrance  formControlName="entrance" type="text" placeholder="Подъезд"></div>
          <div class="form-item"><input #doorphone formControlName="doorphone" type="text" placeholder="Код Домофона"></div>
          <div class="form-item"><input #floor     formControlName="floor" type="text" placeholder="Этаж"></div>
        </div>

        <button checkout class="btn-yellow-hollow"
                [name]="name.value"
                [email]="email.value"
                [phone]="phone.value"
                [streetId]="street.value"
                [home]="home.value"
                [housing]="housing.value"
                [apartment]="apartment.value"
                [entrance]="entrance.value"
                [doorphone]="doorphone.value"
                [floor]="floor.value"
                [personsCount]="personsCount.value"

                [paymentMethod]="paymentMethod.value"
                [comment]="comment.value"
                [disabled]="loading || addressForm.invalid"

                (error)="loading = false"
                (success)="loading = false; checkoutSuccess = true"
                (click)="loading = true"
                class="btn-yellow-hollow">Оформить</button>
      </form>
    </ng-container>
    
~~~


### [modifires]  - реализует логику работы с модификаторами блюд, генерирует дом модификаторов
Пример использования в компоненте:

~~~ html
<div [Modifires]="dish.modifiers"></div>
~~~
Директива использует следующие классы: h5, group-modifires, additional-item, item-name, item-quantity__button, item-quantity__counter, weight-price
~~~ css
   .additional-item,
    .main-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;

      .item-name {
        flex-grow: 1;
      }

      .item-quantity {
        padding: 0 20px;
        min-width: 70px;
        text-align: center;

        &__button {
          padding: 0 6px;
          cursor: pointer;
        }
      }
    }

    .main-item {
      font-size: 22px;
      margin-bottom: 20px;
      padding: 20px 0;
      border-bottom: 1px solid rgba($color: $light, $alpha: 0.7);
    }
    .group-modifires{
      border-bottom: 1px solid rgba(255, 255, 255, 0.7);
      border-top: 1px solid rgba(255, 255, 255, 0.7);
      margin-top: 10px;
    }

    .additional-item {
      font-size: 18px;
      padding: 10px 0;
    }

    [type="checkbox"]:checked + label:before,
    [type="checkbox"]:not(:checked) + label:before {
      border: 1px solid $light;
    }

    [type="checkbox"]:checked + label:after,
    [type="checkbox"]:not(:checked) + label:after {
      background: $light;
    }

    .weight-price {
      min-width: 150px;
    }
~~~





