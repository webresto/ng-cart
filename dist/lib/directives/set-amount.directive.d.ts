import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class SetAmountDirective {
    private cartService;
    action: any;
    dish: any;
    onClick(): void;
    private cart;
    constructor(cartService: NgRestoCartService);
    changeAmount(action: any): void;
    static ɵfac: i0.ɵɵFactoryDef<SetAmountDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<SetAmountDirective, "[rstSetDishAmount]", never, { "action": "action"; "dish": "dish"; }, {}, never>;
}
//# sourceMappingURL=set-amount.directive.d.ts.map