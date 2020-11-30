import { Renderer2, ElementRef } from '@angular/core';
import { NgRestoCartService } from '../services/ng-restocart.service';
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
}
