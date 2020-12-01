import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class SetDishCommentDirective {
    constructor(cartService) {
        this.cartService = cartService;
        this.success = new EventEmitter();
        this.error = new EventEmitter();
    }
    onClick() {
        this.setComment();
    }
    setComment() {
        this.cartService.setDishComment(this.dish.id, this.comment).subscribe(res => this.success.emit(true), err => this.error.emit(err));
    }
}
SetDishCommentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstSetDishComment]'
            },] }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LWRpc2gtY29tbWVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvIiwic291cmNlcyI6WyJsaWIvZGlyZWN0aXZlcy9zZXQtZGlzaC1jb21tZW50LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUt0RSxNQUFNLE9BQU8sdUJBQXVCO0lBV2xDLFlBQW9CLFdBQThCO1FBQTlCLGdCQUFXLEdBQVgsV0FBVyxDQUFtQjtRQVB4QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUN0QyxVQUFLLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQU1TLENBQUM7SUFKaEMsT0FBTztRQUM1QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUlELFVBQVU7UUFDUixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUNsRSxHQUFHLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUM1QixHQUFHLENBQUEsRUFBRSxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUMxQixDQUFBO0lBR0gsQ0FBQzs7O1lBdkJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUscUJBQXFCO2FBQ2hDOzs7WUFKUSxrQkFBa0I7OztzQkFNeEIsS0FBSzttQkFDTCxLQUFLO3NCQUVMLE1BQU07b0JBQ04sTUFBTTtzQkFFTixZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcnN0U2V0RGlzaENvbW1lbnRdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgU2V0RGlzaENvbW1lbnREaXJlY3RpdmUge1xyXG4gIEBJbnB1dCgpIGNvbW1lbnQ6YW55O1xyXG4gIEBJbnB1dCgpIGRpc2g6YW55O1xyXG5cclxuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICBAT3V0cHV0KCkgZXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKSBvbkNsaWNrKCkge1xyXG4gICAgdGhpcy5zZXRDb21tZW50KCk7XHJcbiAgfVxyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkgeyB9XHJcblxyXG4gIHNldENvbW1lbnQoKXtcclxuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0RGlzaENvbW1lbnQodGhpcy5kaXNoLmlkLHRoaXMuY29tbWVudCkuc3Vic2NyaWJlKFxyXG4gICAgICByZXM9PnRoaXMuc3VjY2Vzcy5lbWl0KHRydWUpLFxyXG4gICAgICBlcnI9PnRoaXMuZXJyb3IuZW1pdChlcnIpXHJcbiAgICApXHJcblxyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==