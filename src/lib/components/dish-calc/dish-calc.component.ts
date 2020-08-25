import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { NgRestoCartService } from "../../services/ng-restocart.service";

import {
  EventerService,
  EventMessage
} from '@webresto/ng-core';

@Component({
  selector: 'dish-calc',
  templateUrl: './dish-calc.component.html',
  styleUrls: ['./dish-calc.component.scss']
})
export class DishCalcComponent implements OnInit, OnChanges, OnDestroy {

  @Input()  dish:any;
  @Input()  amount:any;
  @Input()  selectedModifiers:any;
  @Output()  validate:EventEmitter<any> = new EventEmitter();
  @Output()  amountDishToAdd:EventEmitter<any> = new EventEmitter();

  modifiers = {
    indexById: {},
    custom: {
      fixed: null
    },
    baseList: [],
  };

  totalPrice: number;
  modifiersValueTree: any = {};
  imageUrl: string;

  constructor(
    private cartService: NgRestoCartService,
    private eventer:EventerService,
    @Inject('ImageUrl') imageUrl:string
  ) {
    this.imageUrl = imageUrl;
  }

  ngOnInit() {
    this.validate.emit(true);
  }

  ngOnDestroy() {
    this.validate.emit(true);
    this.cartService.setModifires([], []);
  }

  ngOnChanges() {
    this.modifiers = {
      indexById: {},
      custom: {
        fixed: null
      },
      baseList: [],
    };

    this.modifiersValueTree = {};
    if(this.dish && this.dish.modifiers) {
      for(let modifier of this.dish.modifiers) {
        let modifierType = null;
        // Indexing
        this.modifiers.indexById[modifier.modifierId] = modifier;
        // Check Custom modifiers (like Pizza Size)
        if(!this.modifiers.custom.fixed
          && !this.modifiers.baseList.length
          && modifier.childModifiers
          && modifier.childModifiers.length == 2
          && modifier.maxAmount == modifier.maxAmount
          && modifier.maxAmount == 1) {
          // This is Pizza Size modifier
          modifierType = 'custom';
          this.modifiers.custom.fixed = modifier;
          console.info('Custom Fixed modifier:', modifier);
        } else if(modifier.group
          && modifier.childModifiers
          && modifier.childModifiers.length
          && modifier.childModifiers.find(m => m.dish)) {
          // This is Base modifier
          modifierType = 'group';
          this.modifiers.baseList.push(modifier);
          console.info('Group modifier:', modifier);
        } else if(modifier.dish) {
          modifierType = 'single';
          this.modifiers.baseList.push(modifier);
          console.info('Single modifier:', modifier);
        } else {
          // This is broken modifier
          modifierType = 'broken';
          console.warn('Broken modifier:', modifier);
        }


        // Init default values
        switch (modifierType) {
          case 'group':
          case 'custom':
            this.modifiersValueTree[modifier.modifierId] = {};
            for(let childModifier of modifier.childModifiers) {
              // Indexing
              this.modifiers.indexById[childModifier.modifierId] = childModifier;
              // Init default value
              this.modifiersValueTree[modifier.modifierId][childModifier.modifierId] = childModifier.defaultAmount;
            }
            // Calculate total amount in group
            this.calculateTotalAmountInGroup(modifier.modifierId);
            break;
          case 'single':
            if(!this.modifiersValueTree['single']){
              this.modifiersValueTree['single'] = {}
            }
            // Indexing
            this.modifiers.indexById[modifier.modifierId] = modifier;
            // Init default value
            this.modifiersValueTree['single'][modifier.modifierId] = modifier.defaultAmount;
        }

      }
      this.calculateTotalPrice();
    }
  }

  calculateTotalAmountInGroup(groupId) {
    if(groupId == 'single') return;
    this.modifiers.indexById[groupId].totalAmount = Object
      .values(this.modifiersValueTree[groupId])
      .reduce((a: number, b: number) => a + b);
    return this.modifiers.indexById[groupId].totalAmount;
  }

  calculateTotalPrice() {
    let totalPrice = this.dish.price || 0;
    for(let groupId in this.modifiersValueTree) {
      for(let modifierId in this.modifiersValueTree[groupId]) {
        const amount = this.modifiersValueTree[groupId][modifierId];
        if(amount) {
          const modifier = this.modifiers.indexById[modifierId];
          if(modifier && modifier.dish && modifier.dish.price) {
            totalPrice += modifier.dish.price * amount;
          }
        }
      }
    }
    this.totalPrice = totalPrice;
    this.setModifiers();
  }

  getModifiersIds(modifier) {
    return {
      groupId: (modifier.dish && modifier.dish.groupId) ? modifier.dish.groupId : undefined,
      modifierId: modifier.modifierId
    }
  }

  changeModifierAmount(modifier: any, amount: number, operation: string) {
    if(amount < 0) return;
    const { groupId = 'single', modifierId } = this.getModifiersIds(modifier);
    const { minAmount, maxAmount } = modifier;
    const { minAmount: groupMinAmount = 0,
            maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
    const previousAmount: number = this.modifiersValueTree[groupId][modifierId];

    // For checkbox
    if(operation == 'checkbox' && groupId !== 'single') {
      // If it work like radio button
      if(groupMinAmount <= 1 && groupMaxAmount == 1) {
        if(amount < groupMinAmount) {
          return;
        }
        // Set zero amount for all options
        for(let itemModifierId in this.modifiersValueTree[groupId]) {
          this.modifiersValueTree[groupId][itemModifierId] = 0
        }
        this.calculateTotalAmountInGroup(groupId);
      }
      // Not action needed after
      if(amount == 0) {
        this.calculateTotalPrice();
        return;
      }
    }

    // Check Group amount limits
    if(groupMinAmount || groupMaxAmount) {
      // Total amount in group
      const groupAmount: number = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;

      if(groupAmount < groupMinAmount) {
        console.warn(`Limit: min ${groupMinAmount}. Current ${groupAmount}`);
        this.eventer.emitMessageEvent(
          new EventMessage(
            'warning',
            'Ограничение',
            `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не менее ${groupMinAmount}`
          )
        );
        return;
      }
      if(groupAmount > groupMaxAmount) {
        console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
        this.eventer.emitMessageEvent(
          new EventMessage(
            'warning',
            'Ограничение',
            `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`
          )
        );
        return;
      }
    }

    // CHeck Modifier amount limits
    if(minAmount || maxAmount) {
      if(amount < minAmount) {
        switch (operation) {
          case 'plus': amount = minAmount; break;
          case 'minus': amount = 0; break;
        }
      }
      if(amount > maxAmount) {
        amount = maxAmount;
      }
    }

    this.modifiersValueTree[groupId][modifierId] = amount;
    this.calculateTotalAmountInGroup(groupId);
    this.calculateTotalPrice();
  }

  setModifiers() {
    const modifiersToSet = [];

    for(let groupId in this.modifiersValueTree) {
      for(let modifierId in this.modifiersValueTree[groupId]) {
        const amount = this.modifiersValueTree[groupId][modifierId];
        if(amount) {

          modifiersToSet.push({
            id: modifierId,
            amount: amount,
            groupId: groupId !== 'single' ? groupId : undefined
          });

        }
      }
    }

    if(modifiersToSet.length) {
      this.validate.emit(true);
      this.cartService.setModifires(modifiersToSet, []);
    }
  }
}
