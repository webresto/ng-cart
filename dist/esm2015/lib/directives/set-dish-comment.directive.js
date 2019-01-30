/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class SetDishCommentDirective {
    /**
     * @param {?} cartService
     */
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    /**
     * @return {?}
     */
    onClick() {
        this.setComment();
    }
    /**
     * @return {?}
     */
    setComment() {
        this.cartService.setDishComment(this.dish.id, this.comment).subscribe(res => this.success.emit(true), err => this.error.emit(err));
    }
}
SetDishCommentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[setDishComment]'
            },] },
];
SetDishCommentDirective.ctorParameters = () => [
    { type: NgRestoCartService }
];
SetDishCommentDirective.propDecorators = {
    comment: [{ type: Input }],
    dish: [{ type: Input }],
    success: [{ type: Output }],
    error: [{ type: Output }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    SetDishCommentDirective.prototype.comment;
    /** @type {?} */
    SetDishCommentDirective.prototype.dish;
    /** @type {?} */
    SetDishCommentDirective.prototype.success;
    /** @type {?} */
    SetDishCommentDirective.prototype.error;
    /**
     * @type {?}
     * @private
     */
    SetDishCommentDirective.prototype.cartService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac2FpbHMtcmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL3NldC1kaXNoLWNvbW1lbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUt0RSxNQUFNOzs7O0lBV0osWUFBb0IsV0FBOEI7UUFBOUIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO1FBUHhDLFlBQU8sR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO1FBQ3RDLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO0lBTVMsQ0FBQzs7OztJQUpoQyxPQUFPO1FBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDOzs7O0lBSUQsVUFBVTtRQUNSLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQ2xFLEdBQUcsQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzVCLEdBQUcsQ0FBQSxFQUFFLENBQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQzFCLENBQUE7SUFHSCxDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxrQkFBa0I7YUFDN0I7OztZQUpRLGtCQUFrQjs7O3NCQU14QixLQUFLO21CQUNMLEtBQUs7c0JBRUwsTUFBTTtvQkFDTixNQUFNO3NCQUVOLFlBQVksU0FBQyxPQUFPOzs7O0lBTnJCLDBDQUFxQjs7SUFDckIsdUNBQWtCOztJQUVsQiwwQ0FBZ0Q7O0lBQ2hELHdDQUE2Qzs7Ozs7SUFNakMsOENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbc2V0RGlzaENvbW1lbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBTZXREaXNoQ29tbWVudERpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6YW55O1xuICBASW5wdXQoKSBkaXNoOmFueTtcblxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xuICAgIHRoaXMuc2V0Q29tbWVudCgpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjYXJ0U2VydmljZTpOZ1Jlc3RvQ2FydFNlcnZpY2UpIHsgfVxuXG4gIHNldENvbW1lbnQoKXtcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldERpc2hDb21tZW50KHRoaXMuZGlzaC5pZCx0aGlzLmNvbW1lbnQpLnN1YnNjcmliZShcbiAgICAgIHJlcz0+dGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICBlcnI9PnRoaXMuZXJyb3IuZW1pdChlcnIpXG4gICAgKVxuICAgIFxuXG4gIH1cblxufVxuIl19