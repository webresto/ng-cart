"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_restocart_service_1 = require("../services/ng-restocart.service");
var AddDishToCartDirective = /** @class */ (function () {
    function AddDishToCartDirective(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.loading = new core_1.EventEmitter();
        this.success = new core_1.EventEmitter();
        this.error = new core_1.EventEmitter();
        this.cartService
            .userCart()
            .subscribe(function (res) { return _this.cart = res; });
        this.cartService
            .getModifires()
            .subscribe(function (res) { return _this.modifires = res; });
    }
    AddDishToCartDirective.prototype.onClick = function () {
        this.addDishToCart(this.dish.id, this.amountDish);
    };
    AddDishToCartDirective.prototype.addDishToCart = function (dishID, amount) {
        var _this = this;
        var data = {
            "dishId": dishID,
            "amount": amount,
            "cartId": undefined,
            "modifiers": this.modifires,
            "comment": this.comment,
            "replace": this.replaceCartDishId ? true : undefined,
            "cartDishId": this.replaceCartDishId
        };
        if (this.cart.cartId)
            data.cartId = this.cart.cartId;
        this.loading.emit(true);
        this.cartService
            .addDishToCart$(data)
            .subscribe(function (_) { return _this.success.emit(true); }, function (e) { return _this.error.emit(e); }, function () {
            _this.loading.emit(false);
        });
    };
    AddDishToCartDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[addToCart]'
                },] },
    ];
    /** @nocollapse */
    AddDishToCartDirective.ctorParameters = function () { return [
        { type: ng_restocart_service_1.NgRestoCartService }
    ]; };
    AddDishToCartDirective.propDecorators = {
        dish: [{ type: core_1.Input }],
        amountDish: [{ type: core_1.Input }],
        comment: [{ type: core_1.Input }],
        replaceCartDishId: [{ type: core_1.Input }],
        loading: [{ type: core_1.Output }],
        success: [{ type: core_1.Output }],
        error: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['click',] }]
    };
    return AddDishToCartDirective;
}());
exports.AddDishToCartDirective = AddDishToCartDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWRpc2gtdG8tY2FydC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ad2VicmVzdG8vbmctY2FydC8iLCJzb3VyY2VzIjpbImxpYi9kaXJlY3RpdmVzL2FkZC1kaXNoLXRvLWNhcnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFGO0FBQ3JGLHlFQUFzRTtBQUd0RTtJQVFFLGdDQUFvQixXQUE4QjtRQUFsRCxpQkFVQztRQVZtQixnQkFBVyxHQUFYLFdBQVcsQ0FBbUI7UUFrQnhDLFlBQU8sR0FBRyxJQUFJLG1CQUFZLEVBQVcsQ0FBQztRQUN0QyxZQUFPLEdBQUcsSUFBSSxtQkFBWSxFQUFXLENBQUM7UUFDdEMsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBTyxDQUFDO1FBbEJ4QyxJQUFJLENBQUMsV0FBVzthQUNiLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBRXJDLElBQUksQ0FBQyxXQUFXO2FBQ2IsWUFBWSxFQUFFO2FBQ2QsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUU1QyxDQUFDO0lBYUQsd0NBQU8sR0FEUDtRQUVFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ25ELENBQUM7SUFFTyw4Q0FBYSxHQUFyQixVQUFzQixNQUFNLEVBQUUsTUFBTTtRQUFwQyxpQkF5QkM7UUF2QkMsSUFBSSxJQUFJLEdBQUc7WUFDVCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDM0IsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztZQUNwRCxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtTQUNyQyxDQUFDO1FBRUYsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXJELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxXQUFXO2FBQ2IsY0FBYyxDQUFDLElBQUksQ0FBQzthQUNwQixTQUFTLENBQ1IsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdkIsQ0FBdUIsRUFDNUIsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBbEIsQ0FBa0IsRUFDdkI7WUFDRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUMxQixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7O2dCQTVERixnQkFBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjs7OztnQkFMUSx5Q0FBa0I7Ozt1QkF3QnhCLFlBQUs7NkJBQ0wsWUFBSzswQkFDTCxZQUFLO29DQUNMLFlBQUs7MEJBRUwsYUFBTTswQkFDTixhQUFNO3dCQUNOLGFBQU07MEJBRU4sbUJBQVksU0FBQyxPQUFPOztJQWlDdkIsNkJBQUM7Q0FBQSxBQS9ERCxJQStEQztBQTVEWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUgLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZSc7XG5cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FkZFRvQ2FydF0nXG59KVxuZXhwb3J0IGNsYXNzIEFkZERpc2hUb0NhcnREaXJlY3RpdmUge1xuXG4gIGNhcnQ7XG4gIG1vZGlmaXJlcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNhcnRTZXJ2aWNlOk5nUmVzdG9DYXJ0U2VydmljZSkge1xuXG4gICAgdGhpcy5jYXJ0U2VydmljZVxuICAgICAgLnVzZXJDYXJ0KClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMuY2FydCA9IHJlcyk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuZ2V0TW9kaWZpcmVzKClcbiAgICAgIC5zdWJzY3JpYmUocmVzID0+IHRoaXMubW9kaWZpcmVzID0gcmVzKTtcblxuICB9XG5cblxuICBASW5wdXQoKSBkaXNoOmFueTtcbiAgQElucHV0KCkgYW1vdW50RGlzaDphbnk7XG4gIEBJbnB1dCgpIGNvbW1lbnQ6c3RyaW5nO1xuICBASW5wdXQoKSByZXBsYWNlQ2FydERpc2hJZDpib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBsb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICBAT3V0cHV0KCkgc3VjY2VzcyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGVycm9yID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxuICBvbkNsaWNrKCkge1xuICAgIHRoaXMuYWRkRGlzaFRvQ2FydCh0aGlzLmRpc2guaWQsIHRoaXMuYW1vdW50RGlzaClcbiAgfVxuXG4gIHByaXZhdGUgYWRkRGlzaFRvQ2FydChkaXNoSUQsIGFtb3VudCkge1xuXG4gICAgbGV0IGRhdGEgPSB7XG4gICAgICBcImRpc2hJZFwiOiBkaXNoSUQsXG4gICAgICBcImFtb3VudFwiOiBhbW91bnQsXG4gICAgICBcImNhcnRJZFwiOiB1bmRlZmluZWQsXG4gICAgICBcIm1vZGlmaWVyc1wiOiB0aGlzLm1vZGlmaXJlcyxcbiAgICAgIFwiY29tbWVudFwiOiB0aGlzLmNvbW1lbnQsXG4gICAgICBcInJlcGxhY2VcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZCA/IHRydWUgOiB1bmRlZmluZWQsXG4gICAgICBcImNhcnREaXNoSWRcIjogdGhpcy5yZXBsYWNlQ2FydERpc2hJZFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jYXJ0LmNhcnRJZCkgZGF0YS5jYXJ0SWQgPSB0aGlzLmNhcnQuY2FydElkO1xuXG4gICAgdGhpcy5sb2FkaW5nLmVtaXQodHJ1ZSk7XG5cbiAgICB0aGlzLmNhcnRTZXJ2aWNlXG4gICAgICAuYWRkRGlzaFRvQ2FydCQoZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIF8gPT4gdGhpcy5zdWNjZXNzLmVtaXQodHJ1ZSksXG4gICAgICAgIGUgPT4gdGhpcy5lcnJvci5lbWl0KGUpLFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nLmVtaXQoZmFsc2UpXG4gICAgICAgIH1cbiAgICAgICk7XG4gIH1cblxuXG59XG4iXX0=