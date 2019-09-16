import { EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export declare class SetDishCommentDirective {
    private cartService;
    comment: any;
    dish: any;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    onClick(): void;
    constructor(cartService: NgRestoCartService);
    setComment(): void;
}
