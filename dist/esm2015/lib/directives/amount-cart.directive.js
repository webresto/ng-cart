import { Directive, Renderer2, ElementRef } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
export class AmountCartDirective {
    constructor(cartService, renderer, el) {
        this.cartService = cartService;
        this.renderer = renderer;
        this.el = el;
        this.amount = '0';
        this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        const sub = this.cartService.userCart().subscribe(res => {
            this.cart = res;
            this.amount = String(res.dishesCount || 0);
            this.renderer.setProperty(this.el.nativeElement, 'innerHTML', this.amount);
        }, () => { }, () => sub.unsubscribe());
    }
}
AmountCartDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rstAmountCart]'
            },] }
];
AmountCartDirective.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: Renderer2 },
    { type: ElementRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1vdW50LWNhcnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvd2VicmVzdG8vbmctY2FydC9zcmMvbGliL2RpcmVjdGl2ZXMvYW1vdW50LWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQVEsa0JBQWtCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUs1RSxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQ1UsV0FBK0IsRUFDL0IsUUFBbUIsRUFDbkIsRUFBYztRQUZkLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLE9BQUUsR0FBRixFQUFFLENBQVk7UUFHdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsQ0FDL0MsR0FBRyxDQUFDLEVBQUU7WUFDSixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0UsQ0FBQyxFQUNELEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQ25DLENBQUM7SUFDSixDQUFDOzs7WUF2QkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7YUFDNUI7OztZQUpjLGtCQUFrQjtZQURiLFNBQVM7WUFBRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBSZW5kZXJlcjIsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ2FydCwgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbcnN0QW1vdW50Q2FydF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBbW91bnRDYXJ0RGlyZWN0aXZlIHtcclxuICBjYXJ0OiBDYXJ0O1xyXG4gIGFtb3VudDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgZWw6IEVsZW1lbnRSZWZcclxuICApIHtcclxuXHJcbiAgICB0aGlzLmFtb3VudCA9ICcwJztcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xyXG4gICAgY29uc3Qgc3ViID0gdGhpcy5jYXJ0U2VydmljZS51c2VyQ2FydCgpLnN1YnNjcmliZShcclxuICAgICAgcmVzID0+IHtcclxuICAgICAgICB0aGlzLmNhcnQgPSByZXM7XHJcbiAgICAgICAgdGhpcy5hbW91bnQgPSBTdHJpbmcocmVzLmRpc2hlc0NvdW50IHx8IDApO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnaW5uZXJIVE1MJywgdGhpcy5hbW91bnQpO1xyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7IH0sICgpID0+IHN1Yi51bnN1YnNjcmliZSgpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcblxyXG59XHJcbiJdfQ==