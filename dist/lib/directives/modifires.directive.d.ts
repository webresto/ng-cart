import { Renderer2, ElementRef } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
import * as i0 from "@angular/core";
export declare class ModifiresDirective {
    private renderer;
    private el;
    private cartService;
    modifires: any;
    amountModifires: any;
    stateModifires: any;
    constructor(renderer: Renderer2, el: ElementRef, cartService: NgRestoCartService);
    render(modifires: any): void;
    groupDiv(nameGorup: any): any;
    modifireDiv(element: any, groupId: any): any;
    renderOneModifire(element: any, modifireDiv: any, groupId: any): void;
    setModifires(): void;
    static ɵfac: i0.ɵɵFactoryDef<ModifiresDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<ModifiresDirective, "[modifires]", never, { "modifires": "modifires"; }, {}, never>;
}
//# sourceMappingURL=modifires.directive.d.ts.map