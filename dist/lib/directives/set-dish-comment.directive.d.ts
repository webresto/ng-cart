import { EventEmitter } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class SetDishCommentDirective {
    private cartService;
    comment: any;
    dish: any;
    success: EventEmitter<boolean>;
    error: EventEmitter<string>;
    onClick(): void;
    constructor(cartService: NgRestoCartService);
    setComment(): void;
    static ɵfac: i0.ɵɵFactoryDef<SetDishCommentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SetDishCommentDirective, "[rstSetDishComment]", never, { "comment": "comment"; "dish": "dish"; }, { "success": "success"; "error": "error"; }, never>;
}
