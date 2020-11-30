import { Directive, Renderer2, ElementRef, Input } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';

@Directive({
  selector: '[rstModifires]'
})

export class ModifiresDirective {
  @Input() modifires: any;
  amountModifires:any={};
  stateModifires:any={};

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cartService:NgRestoCartService
  ) {


    setTimeout(() => {

      this.render(this.modifires)

    }, 100);


  }

  render(modifires: any) {

  if(modifires.length>0){  let h = this.renderer.createElement('h5');
    this.renderer.setProperty(h , 'innerHTML', 'К этому блюду можно добавить:');
    this.renderer.appendChild(this.el.nativeElement, h);}


    modifires.forEach(elementGroup => {

      this.stateModifires[elementGroup.modifierId]={};
      this.amountModifires[elementGroup.modifierId]={};


      let groupDiv = this.groupDiv(elementGroup.name);
      this.renderer.appendChild(this.el.nativeElement, groupDiv);

      let modArr;
      if(elementGroup.childModifiers.length>5){
       modArr = elementGroup.childModifiers.slice(0, 5)
      }else{
        modArr = elementGroup.childModifiers;
      }




      modArr.forEach(element => {

      let modifireDiv = this.modifireDiv(element,elementGroup.modifierId);
        this.renderer.appendChild(groupDiv,modifireDiv);


        this.stateModifires[elementGroup.modifierId][element.modifierId]=false;

      });


    });

  }

  groupDiv(nameGorup){
    let div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'group-modifires');
    this.renderer.appendChild(div, this.renderer.createText('Название категории модификаторов: '+nameGorup));
    return div;
  }

  modifireDiv(element, groupId){
    let div = this.renderer.createElement('div');
    this.renderer.addClass(div, 'additional-item');
    this.renderOneModifire(element, div,groupId);
   return div;
  }

  renderOneModifire(element, modifireDiv, groupId){

    // Рендер Названия модификатора
    let itemNameDiv = this.renderer.createElement('div');
    this.renderer.addClass(itemNameDiv, 'item-name');

    let input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'type', 'checkbox');
    this.renderer.setAttribute(input, 'id', element.modifierId);
    this.renderer.appendChild(itemNameDiv, input);
    this.renderer.listen(input,'change',e=>{
      this.stateModifires[groupId][e.target.id]= e.target.checked;
      this.setModifires();
    })

    let label  = this.renderer.createElement('label');
    this.renderer.setAttribute(label, 'for', element.modifierId);
    this.renderer.appendChild(itemNameDiv, label);
    this.renderer.setProperty(label, 'innerHTML', element.dish.name);

    this.renderer.appendChild(modifireDiv, itemNameDiv);
// Рендер блока изминения количества модификатора
    let itemQuantity = this.renderer.createElement('div');

    let aMinusDiv = this.renderer.createElement('a');
    this.renderer.addClass(aMinusDiv, 'item-quantity__button');
    this.renderer.setProperty(aMinusDiv, 'innerHTML', '&#8722;');
    this.renderer.appendChild(itemQuantity, aMinusDiv);
    this.renderer.listen(aMinusDiv,'click',e=>{
      let value =  +this.amountModifires[groupId][element.modifierId];
      this.amountModifires[groupId][element.modifierId] = value-1;
      if(this.amountModifires[groupId][element.modifierId] < element.minAmount)
      this.amountModifires[groupId][element.modifierId]=element.minAmount;
      this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
      this.setModifires();

    })


    let span = this.renderer.createElement('span');
    this.renderer.addClass(span, 'item-quantity__counter');
    this.amountModifires[groupId][element.modifierId] = element.minAmount;
    this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
    this.renderer.appendChild(itemQuantity, span);


    let aPlusDiv = this.renderer.createElement('a');
    this.renderer.addClass(aPlusDiv, 'item-quantity__button');
    this.renderer.setProperty(aPlusDiv, 'innerHTML', '&#x2b;');
    this.renderer.appendChild(itemQuantity, aPlusDiv);
    this.renderer.appendChild(modifireDiv, itemQuantity);
    this.renderer.listen(aPlusDiv,'click',e=>{
      let value =  +this.amountModifires[groupId][element.modifierId];
      this.amountModifires[groupId][element.modifierId] = value+1;
      this.renderer.setProperty(span, 'innerHTML', this.amountModifires[groupId][element.modifierId]);
      this.setModifires();

    })

// Рендер блока стоимости и веса модификатора
    let weightPriceDiv = this.renderer.createElement('div');
    this.renderer.addClass(weightPriceDiv, 'weight-price');
    let weightAndPriceHTML = element.dish.weight + " г / " + element.dish.price + "&nbsp;&#x20bd;"
    this.renderer.setProperty(weightPriceDiv, 'innerHTML', weightAndPriceHTML);
    this.renderer.appendChild(modifireDiv, weightPriceDiv);

    this.setModifires();


  }
  setModifires(){

    let modifires = [];

    for (let groupId in this.stateModifires){
      for(let modifireId in this.stateModifires[groupId]){
        if(this.stateModifires[groupId][modifireId]){
          modifires.push(
            {
                id: modifireId,
                amount: this.amountModifires[groupId][modifireId],
                groupId: groupId
            }

          )
        }

      }


    }
    console.log("модифікатори після циклу",modifires)

    this.cartService.setModifires(modifires);

  }


}
