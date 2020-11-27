import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { EventMessage } from '@webresto/ng-core/dist';
import * as i0 from "@angular/core";
import * as i1 from "../../services/ng-restocart.service";
import * as i2 from "@webresto/ng-core/dist";
import * as i3 from "@angular/common";
function DishCalcComponent_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { "zero-price": a0 }; };
function DishCalcComponent_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 20);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r10 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !ctx_r10.dish.price));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r10.dish.price);
} }
const _c1 = function (a0) { return { selected: a0 }; };
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    const _r21 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 24);
    i0.ɵɵlistener("click", function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r21); const childModifier_r19 = ctx.$implicit; const ctx_r20 = i0.ɵɵnextContext(4); return ctx_r20.changeModifierAmount(childModifier_r19, 1, "checkbox"); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r19 = ctx.$implicit;
    const modifier_r16 = i0.ɵɵnextContext().ngIf;
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, !!ctx_r17.modifiersValueTree[modifier_r16.modifierId][childModifier_r19.modifierId]));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", childModifier_r19.dish == null ? null : childModifier_r19.dish.name, " ");
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 20);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r23 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !(childModifier_r23.dish == null ? null : childModifier_r23.dish.price)));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(childModifier_r23.dish == null ? null : childModifier_r23.dish.price);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template, 5, 4, "ng-container", 21);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r23 = ctx.$implicit;
    const modifier_r16 = i0.ɵɵnextContext().ngIf;
    const ctx_r18 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r18.modifiersValueTree[modifier_r16.modifierId][childModifier_r23.modifierId]);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 22);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template, 3, 4, "ng-container", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template, 2, 1, "ng-container", 23);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r16 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", modifier_r16.childModifiers);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", modifier_r16.childModifiers);
} }
function DishCalcComponent_div_0_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_div_0_ng_template_11_ng_container_0_Template, 4, 2, "ng-container", 21);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", ctx_r12.modifiers.custom.fixed);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r33 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r33.name);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r33 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r33.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_div_1_Template, 2, 1, "div", 30);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_div_2_Template, 2, 1, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r33 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r33.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r33.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { "without-images": a0 }; };
const _c3 = function (a0, a2, a3, a4, a5) { return { modifier: a0, groupId: "single", amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_div_1_Template, 3, 2, "div", 27);
    i0.ɵɵelementStart(2, "div", 28);
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_ng_container_3_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r28 = i0.ɵɵnextContext().$implicit;
    const ctx_r29 = i0.ɵɵnextContext(3);
    const _r3 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", modifier_r28.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c2, !modifier_r28.childImagesIsset));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction5(6, _c3, modifier_r28, ctx_r29.modifiersValueTree["single"][modifier_r28.modifierId], ctx_r29.modifiersValueTree["single"][modifier_r28.modifierId], modifier_r28.minAmount || 0, modifier_r28.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 32);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r46 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r46.name);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 33);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r46 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r46.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 29);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_div_1_Template, 2, 1, "div", 30);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_div_2_Template, 2, 1, "div", 31);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r46 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r46.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r46.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c4 = function (a0, a1, a2, a3, a4, a5) { return { modifier: a0, groupId: a1, amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r51 = ctx.$implicit;
    const modifier_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r45 = i0.ɵɵnextContext(3);
    const _r3 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, childModifier_r51, modifier_r28.modifierId, ctx_r45.modifiersValueTree[modifier_r28.modifierId][childModifier_r51.modifierId], ctx_r45.modifiers.indexById[modifier_r28.modifierId].totalAmount, modifier_r28.minAmount || 0, modifier_r28.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_div_0_Template, 3, 2, "div", 27);
    i0.ɵɵelementStart(1, "div", 37);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_ng_container_2_Template, 2, 9, "ng-container", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const modifier_r28 = i0.ɵɵnextContext(2).$implicit;
    i0.ɵɵproperty("ngIf", modifier_r28.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c2, !modifier_r28.imagesIsset));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", modifier_r28.childModifiers);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_1_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c5 = function (a0) { return { dish: a0 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 43);
    i0.ɵɵelementStart(2, "div", 44);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45);
    i0.ɵɵtemplate(5, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_1_ng_container_5_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r61 = ctx.ngIf;
    i0.ɵɵnextContext(8);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dish_r61.name);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c5, dish_r61));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_2_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c6 = function () { return {}; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 43);
    i0.ɵɵelementStart(2, "div", 44);
    i0.ɵɵtext(3, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0443");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 45);
    i0.ɵɵtemplate(5, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_2_ng_container_5_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(8);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(3, _c5, i0.ɵɵpureFunction0(2, _c6)));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_1_Template, 6, 5, "ng-container", 21);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_ng_container_2_Template, 6, 5, "ng-container", 21);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r57 = i0.ɵɵnextContext().$implicit;
    const modifier_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r58 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", childModifier_r57.dish);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r58.modifiers.indexById[modifier_r28.modifierId].totalAmount == 1);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_ng_container_1_Template, 3, 2, "ng-container", 21);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r57 = ctx.$implicit;
    const modifier_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r55 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", ctx_r55.modifiersValueTree[modifier_r28.modifierId][childModifier_r57.modifierId]);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_div_1_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 47);
    i0.ɵɵlistener("click", function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r73); const childModifier_r67 = i0.ɵɵnextContext().$implicit; const ctx_r71 = i0.ɵɵnextContext(6); return ctx_r71.selectTwoPartsAssembledModifier(childModifier_r67); });
    i0.ɵɵelementStart(1, "div", 45);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_div_1_ng_container_2_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 10);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 48);
    i0.ɵɵelementStart(6, "div", 49);
    i0.ɵɵelementStart(7, "span");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(9, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dish_r69 = ctx.ngIf;
    const childModifier_r67 = i0.ɵɵnextContext().$implicit;
    const modifier_r28 = i0.ɵɵnextContext(3).$implicit;
    const ctx_r68 = i0.ɵɵnextContext(3);
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c1, ctx_r68.modifiersValueTree[modifier_r28.modifierId][childModifier_r67.modifierId]));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, dish_r69));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", dish_r69.name, " ");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !dish_r69.price));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dish_r69.price);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_div_1_Template, 10, 12, "div", 46);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r67 = ctx.$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", childModifier_r67.dish);
} }
const _c7 = function (a0) { return { empty: a0 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 38);
    i0.ɵɵelementStart(1, "div", 39);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_2_Template, 2, 1, "ng-container", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 40);
    i0.ɵɵelementStart(4, "div", 41);
    i0.ɵɵtext(5, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u044E\u0431\u044B\u0435 \u0434\u0432\u0435 \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u043A\u0438");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div", 42);
    i0.ɵɵtemplate(7, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_ng_container_7_Template, 2, 1, "ng-container", 23);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const modifier_r28 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r43 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c7, !(ctx_r43.twoPartsAssembledModifiersIdsByGroupId[modifier_r28.modifierId] == null ? null : ctx_r43.twoPartsAssembledModifiersIdsByGroupId[modifier_r28.modifierId].length)));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", modifier_r28.childModifiers);
    i0.ɵɵadvance(5);
    i0.ɵɵproperty("ngForOf", modifier_r28.childModifiers);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_1_Template, 1, 0, "ng-container", 34);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_2_Template, 3, 5, "ng-template", null, 35, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵtemplate(4, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_template_4_Template, 8, 5, "ng-template", null, 36, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const _r40 = i0.ɵɵreference(3);
    const _r42 = i0.ɵɵreference(5);
    const modifier_r28 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", modifier_r28.minAmount == 2 && modifier_r28.maxAmount == 2)("ngIfThen", _r42)("ngIfElse", _r40);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 26);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_2_Template, 4, 12, "ng-container", 21);
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template, 6, 3, "ng-container", 21);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r28 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", modifier_r28.dish);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", modifier_r28.childModifiers == null ? null : modifier_r28.childModifiers.length);
} }
function DishCalcComponent_div_0_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_Template, 4, 2, "ng-container", 23);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r13.modifiers.baseList);
} }
function DishCalcComponent_div_0_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r80 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 50);
    i0.ɵɵelementStart(1, "div", 44);
    i0.ɵɵtext(2, "\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 51);
    i0.ɵɵelementStart(4, "input", 52, 53);
    i0.ɵɵlistener("keyup", function DishCalcComponent_div_0_div_21_Template_input_keyup_4_listener() { i0.ɵɵrestoreView(_r80); const _r78 = i0.ɵɵreference(5); const ctx_r79 = i0.ɵɵnextContext(2); return ctx_r79.comment.emit(_r78.value); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
} }
const _c8 = function (a0) { return { "ng-cart-dish-calc-two-parts-assembled": a0 }; };
function DishCalcComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 5);
    i0.ɵɵelementStart(1, "div", 6);
    i0.ɵɵelementStart(2, "div", 7);
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 9);
    i0.ɵɵelementStart(5, "div", 10);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 11);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 12);
    i0.ɵɵtemplate(10, DishCalcComponent_div_0_ng_container_10_Template, 5, 4, "ng-container", 13);
    i0.ɵɵtemplate(11, DishCalcComponent_div_0_ng_template_11_Template, 1, 1, "ng-template", null, 14, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(13, DishCalcComponent_div_0_div_13_Template, 2, 1, "div", 15);
    i0.ɵɵelementStart(14, "div", 16);
    i0.ɵɵelementStart(15, "span", 17);
    i0.ɵɵtext(16, "\u0418\u0422\u041E\u0413\u041E:");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "span", 18);
    i0.ɵɵelementStart(18, "span");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(20, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(21, DishCalcComponent_div_0_div_21_Template, 6, 0, "div", 19);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r11 = i0.ɵɵreference(12);
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c8, ctx_r0.isTwoPartsAssembledTemplate));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(12, _c5, ctx_r0.dish));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r0.dish.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r0.dish.description);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r0.modifiers.custom.fixed)("ngIfElse", _r11);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r0.modifiers.baseList == null ? null : ctx_r0.modifiers.baseList.length);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(ctx_r0.totalPrice);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r0.isTwoPartsAssembledTemplate);
} }
function DishCalcComponent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "div", 55);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r81 = i0.ɵɵnextContext().dish;
    const ctx_r82 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r82.imageUrl + dish_r81.images[0].images.small + ")");
} }
function DishCalcComponent_ng_template_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 56);
} }
function DishCalcComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_1_ng_container_0_Template, 2, 2, "ng-container", 13);
    i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_ng_template_1_Template, 1, 0, "ng-template", null, 54, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const dish_r81 = ctx.dish;
    const _r83 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", (dish_r81 == null ? null : dish_r81.images) && (dish_r81.images[0] == null ? null : dish_r81.images[0].images == null ? null : dish_r81.images[0].images.small))("ngIfElse", _r83);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_div_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const dish_r93 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1("", dish_r93.weight * 1000, " \u0433\u0440");
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_14_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c9 = function (a0, a1, a2) { return { modifier: a0, groupId: a1, amount: a2 }; };
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_ng_template_3_ng_container_0_ng_container_14_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r101 = i0.ɵɵnextContext(2);
    const modifier_r86 = ctx_r101.modifier;
    const groupId_r87 = ctx_r101.groupId;
    const amount_r88 = ctx_r101.amount;
    i0.ɵɵnextContext();
    const _r7 = i0.ɵɵreference(8);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r7)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c9, modifier_r86, groupId_r87, amount_r88));
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_15_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_ng_template_15_ng_container_0_Template, 1, 0, "ng-container", 8);
} if (rf & 2) {
    const ctx_r103 = i0.ɵɵnextContext(2);
    const modifier_r86 = ctx_r103.modifier;
    const groupId_r87 = ctx_r103.groupId;
    const amount_r88 = ctx_r103.amount;
    const groupAmount_r89 = ctx_r103.groupAmount;
    const groupMinAmount_r90 = ctx_r103.groupMinAmount;
    const groupMaxAmount_r91 = ctx_r103.groupMaxAmount;
    i0.ɵɵnextContext();
    const _r5 = i0.ɵɵreference(6);
    i0.ɵɵproperty("ngTemplateOutlet", _r5)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, modifier_r86, groupId_r87, amount_r88, groupAmount_r89, groupMinAmount_r90, groupMaxAmount_r91));
} }
function DishCalcComponent_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 57);
    i0.ɵɵelementStart(2, "div", 58);
    i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 59);
    i0.ɵɵelementStart(5, "div", 60);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(7, DishCalcComponent_ng_template_3_ng_container_0_div_7_Template, 2, 1, "div", 61);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "div", 62);
    i0.ɵɵelementStart(9, "div", 49);
    i0.ɵɵelementStart(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(12, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "div", 63);
    i0.ɵɵtemplate(14, DishCalcComponent_ng_template_3_ng_container_0_ng_container_14_Template, 2, 6, "ng-container", 13);
    i0.ɵɵtemplate(15, DishCalcComponent_ng_template_3_ng_container_0_ng_template_15_Template, 1, 9, "ng-template", null, 64, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r93 = ctx.ngIf;
    const _r97 = i0.ɵɵreference(16);
    const ctx_r104 = i0.ɵɵnextContext();
    const groupMinAmount_r90 = ctx_r104.groupMinAmount;
    const groupMaxAmount_r91 = ctx_r104.groupMaxAmount;
    i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, dish_r93));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dish_r93.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", dish_r93.weight);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !dish_r93.price));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dish_r93.price);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", groupMinAmount_r90 <= 1 && groupMaxAmount_r91 == 1)("ngIfElse", _r97);
} }
function DishCalcComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_Template, 17, 12, "ng-container", 21);
} if (rf & 2) {
    const modifier_r86 = ctx.modifier;
    i0.ɵɵproperty("ngIf", modifier_r86.dish);
} }
const _c10 = function (a0) { return { disabled: a0 }; };
function DishCalcComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r113 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 66);
    i0.ɵɵelementStart(2, "div", 67);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_2_listener() { i0.ɵɵrestoreView(_r113); const modifier_r105 = ctx.modifier; const amount_r107 = ctx.amount; const ctx_r112 = i0.ɵɵnextContext(); return ctx_r112.changeModifierAmount(modifier_r105, amount_r107 - 1, "minus"); });
    i0.ɵɵtext(3, "-");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 68, 69);
    i0.ɵɵelementStart(6, "div", 70);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_6_listener() { i0.ɵɵrestoreView(_r113); const modifier_r105 = ctx.modifier; const amount_r107 = ctx.amount; const ctx_r114 = i0.ɵɵnextContext(); return ctx_r114.changeModifierAmount(modifier_r105, amount_r107 + 1, "plus"); });
    i0.ɵɵtext(7, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r107 = ctx.amount;
    const groupAmount_r108 = ctx.groupAmount;
    const groupMinAmount_r109 = ctx.groupMinAmount;
    const groupMaxAmount_r110 = ctx.groupMaxAmount;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c10, !amount_r107 && groupAmount_r108 >= groupMaxAmount_r110));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c10, !amount_r107 || groupAmount_r108 <= groupMinAmount_r109));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", amount_r107);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c10, groupAmount_r108 >= groupMaxAmount_r110));
} }
function DishCalcComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r119 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 71);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_7_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r119); const modifier_r115 = ctx.modifier; const amount_r117 = ctx.amount; const ctx_r118 = i0.ɵɵnextContext(); return ctx_r118.changeModifierAmount(modifier_r115, amount_r117 ? 0 : 1, "checkbox"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r117 = ctx.amount;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1, amount_r117));
} }
export class DishCalcComponent {
    constructor(cartService, eventer, imageUrl) {
        this.cartService = cartService;
        this.eventer = eventer;
        this.validate = new EventEmitter();
        this.amountDishToAdd = new EventEmitter();
        this.comment = new EventEmitter();
        this.modifiers = {
            indexById: {},
            custom: {
                fixed: null
            },
            baseList: [],
        };
        this.modifiersValueTree = {};
        this.twoPartsAssembledModifiersIdsByGroupId = {};
        this.imageUrl = imageUrl;
    }
    ngOnInit() {
        this.checkValid();
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
        if (this.dish && this.dish.modifiers) {
            for (let modifier of this.dish.modifiers) {
                let modifierType = null;
                // Indexing
                this.modifiers.indexById[modifier.modifierId] = modifier;
                // Check Custom modifiers (like Pizza Size)
                if (!this.modifiers.custom.fixed
                    && !this.modifiers.baseList.length
                    && modifier.childModifiers
                    && modifier.childModifiers.length == 2
                    && modifier.maxAmount == modifier.maxAmount
                    && modifier.maxAmount == 1) {
                    // This is Pizza Size modifier
                    modifierType = 'custom';
                    this.modifiers.custom.fixed = modifier;
                    console.info('Custom Fixed modifier:', modifier);
                }
                else if (modifier.group
                    && modifier.childModifiers
                    && modifier.childModifiers.length
                    && modifier.childModifiers.find(m => m.dish)) {
                    // This is Base modifier
                    modifierType = 'group';
                    this.modifiers.baseList.push(modifier);
                    if (modifier.minAmount == 2 && modifier.maxAmount == 2) {
                        this.isTwoPartsAssembledTemplate = true;
                    }
                    console.info('Group modifier:', modifier);
                }
                else if (modifier.dish) {
                    modifierType = 'single';
                    this.modifiers.baseList.push(modifier);
                    console.info('Single modifier:', modifier);
                }
                else {
                    // This is broken modifier
                    modifierType = 'broken';
                    console.warn('Broken modifier:', modifier);
                }
                // Init default values
                switch (modifierType) {
                    case 'group':
                    case 'custom':
                        this.modifiersValueTree[modifier.modifierId] = {};
                        for (let childModifier of modifier.childModifiers) {
                            // Indexing
                            this.modifiers.indexById[childModifier.modifierId] = childModifier;
                            // Init default value
                            this.modifiersValueTree[modifier.modifierId][childModifier.modifierId] = childModifier.defaultAmount;
                        }
                        // Calculate total amount in group
                        this.calculateTotalAmountInGroup(modifier.modifierId);
                        break;
                    case 'single':
                        if (!this.modifiersValueTree['single']) {
                            this.modifiersValueTree['single'] = {};
                        }
                        // Indexing
                        this.modifiers.indexById[modifier.modifierId] = modifier;
                        // Init default value
                        this.modifiersValueTree['single'][modifier.modifierId] = modifier.defaultAmount;
                }
                // Find images and set flags (imagesIsset, childImagesIsset)
                this.checkImagesInModifier(modifier.modifierId);
            }
            this.calculateTotalPrice();
        }
        console.log(`this.modifiers.indexById`, this.modifiers.indexById);
    }
    calculateTotalAmountInGroup(groupId) {
        if (groupId == 'single')
            return;
        this.modifiers.indexById[groupId].totalAmount = Object
            .values(this.modifiersValueTree[groupId])
            .reduce((a, b) => a + b);
        return this.modifiers.indexById[groupId].totalAmount;
    }
    checkImagesInModifier(modifierId) {
        const m = this.modifiers.indexById[modifierId];
        this.modifiers.indexById[modifierId].imagesIsset = m.dish && m.dish.images && m.dish.images.length ? true : false;
        this.modifiers.indexById[modifierId].childImagesIsset = !!this.modifiers.indexById[modifierId]
            .childModifiers
            .find((m) => m && m.dish && m.dish.images && m.dish.images.length ? true : false);
    }
    calculateTotalPrice() {
        let totalPrice = this.dish.price || 0;
        for (let groupId in this.modifiersValueTree) {
            for (let modifierId in this.modifiersValueTree[groupId]) {
                const amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    const modifier = this.modifiers.indexById[modifierId];
                    if (modifier && modifier.dish && modifier.dish.price) {
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
        };
    }
    selectTwoPartsAssembledModifier(modifier) {
        const { groupId = 'single', modifierId } = this.getModifiersIds(modifier);
        const { minAmount, maxAmount } = modifier;
        const { minAmount: groupMinAmount = 0, maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
        const previousAmount = this.modifiersValueTree[groupId][modifierId];
        const amount = previousAmount ? 0 : 1;
        // Init tmp value storage if not exists
        if (!this.twoPartsAssembledModifiersIdsByGroupId[groupId]) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
        }
        // Total amount in group
        const groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
        if (groupAmount > groupMaxAmount) {
            if (this.twoPartsAssembledModifiersIdsByGroupId[groupId].length) {
                for (let mId in this.modifiersValueTree[groupId]) {
                    this.modifiersValueTree[groupId][mId] = 0;
                }
                this.twoPartsAssembledModifiersIdsByGroupId[groupId] = this.twoPartsAssembledModifiersIdsByGroupId[groupId].slice(1, 2);
                this.modifiersValueTree[groupId][this.twoPartsAssembledModifiersIdsByGroupId[groupId][0]] = 1;
            }
            else {
                console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`));
                return;
            }
        }
        else if (groupAmount === 0) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId] = [];
        }
        if (amount && !this.twoPartsAssembledModifiersIdsByGroupId[groupId].find(v => v == modifierId)) {
            this.twoPartsAssembledModifiersIdsByGroupId[groupId].push(modifierId);
        }
        this.modifiersValueTree[groupId][modifierId] = amount;
        this.calculateTotalAmountInGroup(groupId);
        this.calculateTotalPrice();
    }
    changeModifierAmount(modifier, amount, operation) {
        if (amount < 0)
            return;
        const { groupId = 'single', modifierId } = this.getModifiersIds(modifier);
        const { minAmount, maxAmount } = modifier;
        const { minAmount: groupMinAmount = 0, maxAmount: groupMaxAmount = 0 } = this.modifiers.indexById[groupId] || {};
        const previousAmount = this.modifiersValueTree[groupId][modifierId];
        // For checkbox
        if (operation == 'checkbox' && groupId !== 'single') {
            // If it work like radio button
            if (groupMinAmount <= 1 && groupMaxAmount == 1) {
                if (amount < groupMinAmount) {
                    return;
                }
                // Set zero amount for all options
                for (let itemModifierId in this.modifiersValueTree[groupId]) {
                    this.modifiersValueTree[groupId][itemModifierId] = 0;
                }
                this.calculateTotalAmountInGroup(groupId);
            }
            // Not action needed after
            if (amount == 0) {
                this.calculateTotalPrice();
                return;
            }
        }
        // Check Group amount limits
        if (groupMinAmount || groupMaxAmount) {
            // Total amount in group
            const groupAmount = this.modifiers.indexById[groupId].totalAmount - previousAmount + amount;
            if (groupAmount < groupMinAmount) {
                console.warn(`Limit: min ${groupMinAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не менее ${groupMinAmount}`));
                return;
            }
            if (groupAmount > groupMaxAmount) {
                console.warn(`Limit: max ${groupMaxAmount}. Current ${groupAmount}`);
                this.eventer.emitMessageEvent(new EventMessage('warning', 'Ограничение', `Максимальное количество опций для группы
            модификаторов "${this.modifiers.indexById[groupId].group.name}" - не более ${groupMaxAmount}`));
                return;
            }
        }
        // CHeck Modifier amount limits
        if (minAmount || maxAmount) {
            if (amount < minAmount) {
                switch (operation) {
                    case 'plus':
                        amount = minAmount;
                        break;
                    case 'minus':
                        amount = 0;
                        break;
                }
            }
            if (amount > maxAmount) {
                amount = maxAmount;
            }
        }
        this.modifiersValueTree[groupId][modifierId] = amount;
        this.calculateTotalAmountInGroup(groupId);
        this.calculateTotalPrice();
    }
    setModifiers() {
        const modifiersToSet = [];
        for (let groupId in this.modifiersValueTree) {
            for (let modifierId in this.modifiersValueTree[groupId]) {
                const amount = this.modifiersValueTree[groupId][modifierId];
                if (amount) {
                    modifiersToSet.push({
                        id: modifierId,
                        amount: amount,
                        groupId: groupId !== 'single' ? groupId : undefined
                    });
                }
            }
        }
        if (modifiersToSet.length) {
            this.checkValid();
            this.cartService.setModifires(modifiersToSet, []);
        }
    }
    checkValid() {
        let isValid = true;
        for (let groupId in this.modifiersValueTree) {
            const groupModifier = this.modifiers.indexById[groupId];
            if (groupModifier.required) {
                const totalAmountInGroup = this.calculateTotalAmountInGroup(groupId);
                if (totalAmountInGroup < groupModifier.minAmount) {
                    isValid = false;
                    console.warn(`Modifier ${groupId} min amount: ${groupModifier.minAmount}`);
                }
                if (totalAmountInGroup > groupModifier.maxAmount) {
                    isValid = false;
                    console.warn(`Modifier ${groupId} max amount: ${groupModifier.maxAmount}`);
                }
            }
            //for(let modifierId in this.modifiersValueTree[groupId]) {
            //
            //}
        }
        this.validate.emit(isValid);
    }
}
DishCalcComponent.ɵfac = function DishCalcComponent_Factory(t) { return new (t || DishCalcComponent)(i0.ɵɵdirectiveInject(i1.NgRestoCartService), i0.ɵɵdirectiveInject(i2.EventerService), i0.ɵɵdirectiveInject('ImageUrl')); };
DishCalcComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DishCalcComponent, selectors: [["dish-calc"]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd", comment: "comment" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 1, consts: [["class", "ng-cart-dish-calc", 3, "ngClass", 4, "ngIf"], ["dishImageTemplate", ""], ["modifierTemplate", ""], ["modifierCounterTemplate", ""], ["modifierCheckboxTemplate", ""], [1, "ng-cart-dish-calc", 3, "ngClass"], [1, "dish"], [1, "dish-image-box"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "dish-description-box"], [1, "dish-name"], [1, "dish-ingredients"], [1, "dish-price-box"], [4, "ngIf", "ngIfElse"], ["modifierFixedTemplate", ""], ["class", "modifiers", 4, "ngIf"], [1, "result"], [1, "text"], [1, "price"], ["class", "comment", 4, "ngIf"], [1, "price", 3, "ngClass"], [4, "ngIf"], [1, "modifier-fixed"], [4, "ngFor", "ngForOf"], [1, "item", 3, "ngClass", "click"], [1, "modifiers"], [1, "modifier-group"], ["class", "modifier-header", 4, "ngIf"], [1, "modifier-box", 3, "ngClass"], [1, "modifier-header"], ["class", "modifier-name", 4, "ngIf"], ["class", "modifier-description", 4, "ngIf"], [1, "modifier-name"], [1, "modifier-description"], [4, "ngIf", "ngIfThen", "ngIfElse"], ["groupTemplate", ""], ["twoPartsAssembledTemplate", ""], [1, "modifier-children", 3, "ngClass"], [1, "two-parts-assembled"], [1, "two-parts-assembled-header", 3, "ngClass"], [1, "two-parts-assembled-body"], [1, "two-parts-assembled-body-name"], [1, "two-parts-assembled-body-list"], [1, "selected-dish"], [1, "title"], [1, "image-box"], ["class", "two-parts-assembled-body-list-dish", 3, "ngClass", "click", 4, "ngIf"], [1, "two-parts-assembled-body-list-dish", 3, "ngClass", "click"], [1, "dish-price"], [3, "ngClass"], [1, "comment"], [1, "input-box"], ["type", "text", "placeholder", "", 3, "keyup"], ["commentInput", ""], ["imgPlaceholder", ""], [1, "dish-image"], [1, "dish-image-placeholder"], [1, "modifier-dish"], [1, "modifier-dish-image-box"], [1, "modifier-dish-description-box"], [1, "modifier-dish-name"], ["class", "modifier-dish-weight", 4, "ngIf"], [1, "modifier-dish-price-box"], [1, "modifier-dish-action-box"], ["counterTemplate", ""], [1, "modifier-dish-weight"], [1, "modifier-counter", 3, "ngClass"], ["onselectstart", "return false;", 1, "minus", 3, "ngClass", "click"], ["readonly", "", 3, "value"], ["input", ""], ["onselectstart", "return false;", 1, "plus", 3, "ngClass", "click"], [1, "modifier-checkbox", 3, "ngClass", "click"]], template: function DishCalcComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, DishCalcComponent_div_0_Template, 22, 14, "div", 0);
        i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(5, DishCalcComponent_ng_template_5_Template, 8, 10, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(7, DishCalcComponent_ng_template_7_Template, 2, 3, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.dish);
    } }, directives: [i3.NgIf, i3.NgClass, i3.NgTemplateOutlet, i3.NgForOf], styles: [".dish[_ngcontent-%COMP%]{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish[_ngcontent-%COMP%]   .dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-ingredients[_ngcontent-%COMP%]{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-price-box[_ngcontent-%COMP%]{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]   .dish-image-box[_ngcontent-%COMP%]{display:none}.ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]{height:auto;width:100%}.ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px;text-align:center;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-ingredients[_ngcontent-%COMP%], .ng-cart-dish-calc-two-parts-assembled[_ngcontent-%COMP%]   .dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-price-box[_ngcontent-%COMP%]{display:none}.dish-image[_ngcontent-%COMP%]{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result[_ngcontent-%COMP%]{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{margin-left:76px}.comment[_ngcontent-%COMP%]{padding-bottom:15px}.comment[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;margin:30px 0 20px}.comment[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]{margin-top:10px}.comment[_ngcontent-%COMP%]   .input-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:2px solid #969696;border-radius:15px;box-sizing:border-box;color:#969696;font-size:20px;font-style:italic;font-weight:400;height:45px;line-height:45px;padding:0 20px}.modifiers[_ngcontent-%COMP%]   .modifier-group[_ngcontent-%COMP%]{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]{margin-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-description[_ngcontent-%COMP%]{color:#0a0909;font-size:15px;line-height:17px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{background-color:#fff;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]   .dish-image[_ngcontent-%COMP%]{background-position:50%;background-size:contain;height:100%;width:100%}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-weight[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]   .zero-price[_ngcontent-%COMP%]{display:none}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-action-box[_ngcontent-%COMP%]{display:flex;justify-content:center;width:151px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]{align-items:center;border-bottom:2px solid #969696;display:flex;height:230px;justify-content:center;opacity:1;overflow:hidden;padding-bottom:28px;transition:all .5s ease 0s}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header.empty[_ngcontent-%COMP%]{border-bottom:none;height:0;opacity:0}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]{align-items:center;display:flex;justify-content:flex-end;width:50%}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{color:#0a0909;font-size:21px;line-height:25px;margin-right:24px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]   .image-box[_ngcontent-%COMP%]{height:200px;overflow:hidden;width:100px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]   .image-box[_ngcontent-%COMP%]   .dish-image[_ngcontent-%COMP%]{height:100%;width:200%}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]:nth-child(2){flex-direction:row-reverse}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]:nth-child(2)   .title[_ngcontent-%COMP%]{margin-left:24px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-header[_ngcontent-%COMP%]   .selected-dish[_ngcontent-%COMP%]:nth-child(2)   .image-box[_ngcontent-%COMP%]{direction:rtl}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px;padding:20px 0}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]{display:grid;grid-column-gap:30px;grid-row-gap:24px;grid-template-columns:1fr 1fr 1fr;margin-top:30px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish[_ngcontent-%COMP%]{align-items:center;border:1.5px solid hsla(0,0%,100%,0);box-sizing:border-box;color:#0a0909;cursor:pointer;display:flex;flex-direction:column}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish.selected[_ngcontent-%COMP%]{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{font-size:17px;font-weight:500;letter-spacing:2.4px;line-height:20px;padding:0 5px;text-align:center;text-transform:uppercase}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish[_ngcontent-%COMP%]   .dish-price[_ngcontent-%COMP%]{font-size:20px;font-weight:700;line-height:23px;padding:5px 0 10px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish[_ngcontent-%COMP%]   .image-box[_ngcontent-%COMP%]{border-radius:15px 15px 0 0;height:228px;width:228px}.two-parts-assembled[_ngcontent-%COMP%]   .two-parts-assembled-body[_ngcontent-%COMP%]   .two-parts-assembled-body-list[_ngcontent-%COMP%]   .two-parts-assembled-body-list-dish[_ngcontent-%COMP%]   .image-box[_ngcontent-%COMP%]   .dish-image[_ngcontent-%COMP%]{border-radius:15px 15px 0 0;height:100%;width:100%}.modifier-fixed[_ngcontent-%COMP%]{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:first-child{margin-left:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:last-child{margin-right:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item.selected[_ngcontent-%COMP%]{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:not(.selected){cursor:pointer}.modifier-checkbox[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected[_ngcontent-%COMP%]:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled[_ngcontent-%COMP%]{opacity:.3}.modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .minus.disabled[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .plus.disabled[_ngcontent-%COMP%]{cursor:default;opacity:.15}.modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:hover, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:hover{color:#000}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:active, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:active{color:#cc0009}.modifier-counter[_ngcontent-%COMP%]   .minus.loading[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus.loading[_ngcontent-%COMP%]{opacity:.2}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{left:0}.modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{right:0}.without-images[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{height:70px!important}.without-images[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{height:70px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DishCalcComponent, [{
        type: Component,
        args: [{
                selector: 'dish-calc',
                templateUrl: './dish-calc.component.html',
                styleUrls: ['./dish-calc.component.scss']
            }]
    }], function () { return [{ type: i1.NgRestoCartService }, { type: i2.EventerService }, { type: undefined, decorators: [{
                type: Inject,
                args: ['ImageUrl']
            }] }]; }, { dish: [{
            type: Input
        }], amount: [{
            type: Input
        }], selectedModifiers: [{
            type: Input
        }], validate: [{
            type: Output
        }], amountDishToAdd: [{
            type: Output
        }], comment: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdHLE9BQU8sRUFFTCxZQUFZLEVBQ2IsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7O0lDSHBCLHdCQUE0Rjs7OztJQU14Riw2QkFDSTtJQUFBLCtCQUNJO0lBQUEsNEJBQU07SUFBQSxZQUFnQjtJQUFBLGlCQUFPO0lBQUMsd0JBQ2xDO0lBQUEsaUJBQU07SUFDViwwQkFBZTs7O0lBSFEsZUFBdUM7SUFBdkMseUVBQXVDO0lBQ2hELGVBQWdCO0lBQWhCLHdDQUFnQjs7Ozs7SUFNbEIsNkJBQ0k7SUFBQSwrQkFHSTtJQURDLG9TQUE2QyxDQUFDLEVBQUUsVUFBVSxLQUFFO0lBQzdELFlBQ0o7SUFBQSxpQkFBTTtJQUNWLDBCQUFlOzs7OztJQUpOLGVBQTJGO0lBQTNGLHlJQUEyRjtJQUU1RixlQUNKO0lBREksb0dBQ0o7OztJQUlKLDZCQUNJO0lBQUEsK0JBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQStCO0lBQUEsaUJBQU87SUFBQyx3QkFDakQ7SUFBQSxpQkFBTTtJQUNWLDBCQUFlOzs7SUFIUSxlQUFzRDtJQUF0RCw2SEFBc0Q7SUFDL0QsZUFBK0I7SUFBL0IsMEZBQStCOzs7SUFIakQsNkJBQ0k7SUFBQSx3SUFJZTtJQUNuQiwwQkFBZTs7Ozs7SUFMSSxlQUF5RTtJQUF6RSwwR0FBeUU7OztJQVhoRyw2QkFDSTtJQUFBLCtCQUNJO0lBQUEseUhBTWU7SUFDbkIsaUJBQU07SUFDTix5SEFN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QmM7UUFJZCxtSEFVYzs7UUFqUVIsK0JBQVU7O2tERGFILGlCQUFpQjtjQUw3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFdBQVcsRUFBRSw0QkFBNEI7Z0JBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2FBQzFDOztzQkE0QkksTUFBTTt1QkFBQyxVQUFVO3dCQXpCWCxJQUFJO2tCQUFaLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDRyxpQkFBaUI7a0JBQXpCLEtBQUs7WUFDSSxRQUFRO2tCQUFqQixNQUFNO1lBQ0csZUFBZTtrQkFBeEIsTUFBTTtZQUNHLE9BQU87a0JBQWhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHtcclxuICBFdmVudGVyU2VydmljZSxcclxuICBFdmVudE1lc3NhZ2VcclxufSBmcm9tICdAd2VicmVzdG8vbmctY29yZS9kaXN0JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnZGlzaC1jYWxjJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vZGlzaC1jYWxjLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9kaXNoLWNhbGMuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGlzaENhbGNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgZGlzaDphbnk7XHJcbiAgQElucHV0KCkgYW1vdW50OmFueTtcclxuICBASW5wdXQoKSBzZWxlY3RlZE1vZGlmaWVyczphbnk7XHJcbiAgQE91dHB1dCgpIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBhbW91bnREaXNoVG9BZGQ6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGNvbW1lbnQ6RXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIG1vZGlmaWVycyA9IHtcclxuICAgIGluZGV4QnlJZDoge30sXHJcbiAgICBjdXN0b206IHtcclxuICAgICAgZml4ZWQ6IG51bGxcclxuICAgIH0sXHJcbiAgICBiYXNlTGlzdDogW10sXHJcbiAgfTtcclxuXHJcbiAgaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlOiBib29sZWFuO1xyXG5cclxuICB0b3RhbFByaWNlOiBudW1iZXI7XHJcbiAgbW9kaWZpZXJzVmFsdWVUcmVlOiBhbnkgPSB7fTtcclxuICB0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZDogYW55ID0ge307XHJcbiAgaW1hZ2VVcmw6IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBOZ1Jlc3RvQ2FydFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UsXHJcbiAgICBASW5qZWN0KCdJbWFnZVVybCcpIGltYWdlVXJsOnN0cmluZ1xyXG4gICkge1xyXG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KHRydWUpO1xyXG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMoW10sIFtdKTtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5tb2RpZmllcnMgPSB7XHJcbiAgICAgIGluZGV4QnlJZDoge30sXHJcbiAgICAgIGN1c3RvbToge1xyXG4gICAgICAgIGZpeGVkOiBudWxsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJhc2VMaXN0OiBbXSxcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUgPSB7fTtcclxuICAgIGlmKHRoaXMuZGlzaCAmJiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XHJcbiAgICAgIGZvcihsZXQgbW9kaWZpZXIgb2YgdGhpcy5kaXNoLm1vZGlmaWVycykge1xyXG4gICAgICAgIGxldCBtb2RpZmllclR5cGUgPSBudWxsO1xyXG4gICAgICAgIC8vIEluZGV4aW5nXHJcbiAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XHJcbiAgICAgICAgLy8gQ2hlY2sgQ3VzdG9tIG1vZGlmaWVycyAobGlrZSBQaXp6YSBTaXplKVxyXG4gICAgICAgIGlmKCF0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWRcclxuICAgICAgICAgICYmICF0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5sZW5ndGhcclxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGggPT0gMlxyXG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IG1vZGlmaWVyLm1heEFtb3VudFxyXG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDEpIHtcclxuICAgICAgICAgIC8vIFRoaXMgaXMgUGl6emEgU2l6ZSBtb2RpZmllclxyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2N1c3RvbSc7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWQgPSBtb2RpZmllcjtcclxuICAgICAgICAgIGNvbnNvbGUuaW5mbygnQ3VzdG9tIEZpeGVkIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcclxuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZ3JvdXBcclxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5sZW5ndGhcclxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmZpbmQobSA9PiBtLmRpc2gpKSB7XHJcbiAgICAgICAgICAvLyBUaGlzIGlzIEJhc2UgbW9kaWZpZXJcclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdncm91cCc7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5wdXNoKG1vZGlmaWVyKTtcclxuXHJcbiAgICAgICAgICBpZihtb2RpZmllci5taW5BbW91bnQgPT0gMiAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmlzVHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZSA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0dyb3VwIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcclxuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZGlzaCkge1xyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5wdXNoKG1vZGlmaWVyKTtcclxuICAgICAgICAgIGNvbnNvbGUuaW5mbygnU2luZ2xlIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyBicm9rZW4gbW9kaWZpZXJcclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdicm9rZW4nO1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVyVHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxyXG4gICAgICAgICAgY2FzZSAnY3VzdG9tJzpcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSB7fTtcclxuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XHJcbiAgICAgICAgICAgICAgLy8gSW5kZXhpbmdcclxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKG1vZGlmaWVyLm1vZGlmaWVySWQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ10pe1xyXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSA9IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSW5kZXhpbmdcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllci5kZWZhdWx0QW1vdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluZCBpbWFnZXMgYW5kIHNldCBmbGFncyAoaW1hZ2VzSXNzZXQsIGNoaWxkSW1hZ2VzSXNzZXQpXHJcbiAgICAgICAgdGhpcy5jaGVja0ltYWdlc0luTW9kaWZpZXIobW9kaWZpZXIubW9kaWZpZXJJZCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coYHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZGAsIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZCk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCkge1xyXG4gICAgaWYoZ3JvdXBJZCA9PSAnc2luZ2xlJykgcmV0dXJuO1xyXG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XHJcbiAgICAgIC52YWx1ZXModGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pXHJcbiAgICAgIC5yZWR1Y2UoKGE6IGFueSwgYjogYW55KSA9PiBhICsgYik7XHJcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xyXG4gIH1cclxuXHJcbiAgY2hlY2tJbWFnZXNJbk1vZGlmaWVyKG1vZGlmaWVySWQpIHtcclxuICAgIGNvbnN0IG06IGFueSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXTtcclxuICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXS5pbWFnZXNJc3NldCA9IG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmNoaWxkSW1hZ2VzSXNzZXQgPSAhIXRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXVxyXG4gICAgICAuY2hpbGRNb2RpZmllcnNcclxuICAgICAgLmZpbmQoKG06IGFueSkgPT4gbSAmJiBtLmRpc2ggJiYgbS5kaXNoLmltYWdlcyAmJiBtLmRpc2guaW1hZ2VzLmxlbmd0aCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgfVxyXG5cclxuICBjYWxjdWxhdGVUb3RhbFByaWNlKCkge1xyXG4gICAgbGV0IHRvdGFsUHJpY2UgPSB0aGlzLmRpc2gucHJpY2UgfHwgMDtcclxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xyXG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcclxuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcclxuICAgICAgICBpZihhbW91bnQpIHtcclxuICAgICAgICAgIGNvbnN0IG1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xyXG4gICAgICAgICAgaWYobW9kaWZpZXIgJiYgbW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLnByaWNlKSB7XHJcbiAgICAgICAgICAgIHRvdGFsUHJpY2UgKz0gbW9kaWZpZXIuZGlzaC5wcmljZSAqIGFtb3VudDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMudG90YWxQcmljZSA9IHRvdGFsUHJpY2U7XHJcbiAgICB0aGlzLnNldE1vZGlmaWVycygpO1xyXG4gIH1cclxuXHJcbiAgZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBncm91cElkOiAobW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLmdyb3VwSWQpID8gbW9kaWZpZXIuZGlzaC5ncm91cElkIDogdW5kZWZpbmVkLFxyXG4gICAgICBtb2RpZmllcklkOiBtb2RpZmllci5tb2RpZmllcklkXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZWxlY3RUd29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyKG1vZGlmaWVyOiBhbnkpIHtcclxuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XHJcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcclxuICAgIGNvbnN0IHsgbWluQW1vdW50OiBncm91cE1pbkFtb3VudCA9IDAsXHJcbiAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XHJcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XHJcbiAgICBjb25zdCBhbW91bnQ6IG51bWJlciA9IHByZXZpb3VzQW1vdW50ID8gMCA6IDE7XHJcblxyXG4gICAgLy8gSW5pdCB0bXAgdmFsdWUgc3RvcmFnZSBpZiBub3QgZXhpc3RzXHJcbiAgICBpZighdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSkge1xyXG4gICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXHJcbiAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XHJcbiAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XHJcbiAgICAgIGlmKHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ubGVuZ3RoKSB7XHJcbiAgICAgICAgZm9yKGxldCBtSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcclxuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21JZF0gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdID0gdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXS5zbGljZSgxLDIpO1xyXG4gICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW3RoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF1bMF1dID0gMTtcclxuICAgICAgfWVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1heCAke2dyb3VwTWF4QW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcclxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAn0J7Qs9GA0LDQvdC40YfQtdC90LjQtScsXHJcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXHJcbiAgICAgICAgICAgINC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtINC90LUg0LHQvtC70LXQtSAke2dyb3VwTWF4QW1vdW50fWBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfWVsc2UgaWYoZ3JvdXBBbW91bnQgPT09IDApIHtcclxuICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKGFtb3VudCAmJiAhdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXS5maW5kKHYgPT4gdiA9PSBtb2RpZmllcklkKSkge1xyXG4gICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdLnB1c2gobW9kaWZpZXJJZCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXSA9IGFtb3VudDtcclxuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllcjogYW55LCBhbW91bnQ6IG51bWJlciwgb3BlcmF0aW9uOiBzdHJpbmcpIHtcclxuICAgIGlmKGFtb3VudCA8IDApIHJldHVybjtcclxuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XHJcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcclxuICAgIGNvbnN0IHsgbWluQW1vdW50OiBncm91cE1pbkFtb3VudCA9IDAsXHJcbiAgICAgICAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XHJcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XHJcblxyXG4gICAgLy8gRm9yIGNoZWNrYm94XHJcbiAgICBpZihvcGVyYXRpb24gPT0gJ2NoZWNrYm94JyAmJiBncm91cElkICE9PSAnc2luZ2xlJykge1xyXG4gICAgICAvLyBJZiBpdCB3b3JrIGxpa2UgcmFkaW8gYnV0dG9uXHJcbiAgICAgIGlmKGdyb3VwTWluQW1vdW50IDw9IDEgJiYgZ3JvdXBNYXhBbW91bnQgPT0gMSkge1xyXG4gICAgICAgIGlmKGFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFNldCB6ZXJvIGFtb3VudCBmb3IgYWxsIG9wdGlvbnNcclxuICAgICAgICBmb3IobGV0IGl0ZW1Nb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVtpdGVtTW9kaWZpZXJJZF0gPSAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIE5vdCBhY3Rpb24gbmVlZGVkIGFmdGVyXHJcbiAgICAgIGlmKGFtb3VudCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgR3JvdXAgYW1vdW50IGxpbWl0c1xyXG4gICAgaWYoZ3JvdXBNaW5BbW91bnQgfHwgZ3JvdXBNYXhBbW91bnQpIHtcclxuICAgICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXHJcbiAgICAgIGNvbnN0IGdyb3VwQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgLSBwcmV2aW91c0Ftb3VudCArIGFtb3VudDtcclxuXHJcbiAgICAgIGlmKGdyb3VwQW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtaW4gJHtncm91cE1pbkFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcclxuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgJ9Ce0LPRgNCw0L3QuNGH0LXQvdC40LUnLFxyXG4gICAgICAgICAgICBg0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC+0L/RhtC40Lkg0LTQu9GPINCz0YDRg9C/0L/Ri1xyXG4gICAgICAgICAgICDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDQvdC1INC80LXQvdC10LUgJHtncm91cE1pbkFtb3VudH1gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYoZ3JvdXBBbW91bnQgPiBncm91cE1heEFtb3VudCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1heCAke2dyb3VwTWF4QW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcclxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAn0J7Qs9GA0LDQvdC40YfQtdC90LjQtScsXHJcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXHJcbiAgICAgICAgICAgINC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtINC90LUg0LHQvtC70LXQtSAke2dyb3VwTWF4QW1vdW50fWBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENIZWNrIE1vZGlmaWVyIGFtb3VudCBsaW1pdHNcclxuICAgIGlmKG1pbkFtb3VudCB8fCBtYXhBbW91bnQpIHtcclxuICAgICAgaWYoYW1vdW50IDwgbWluQW1vdW50KSB7XHJcbiAgICAgICAgc3dpdGNoIChvcGVyYXRpb24pIHtcclxuICAgICAgICAgIGNhc2UgJ3BsdXMnOiBhbW91bnQgPSBtaW5BbW91bnQ7IGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnbWludXMnOiBhbW91bnQgPSAwOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgaWYoYW1vdW50ID4gbWF4QW1vdW50KSB7XHJcbiAgICAgICAgYW1vdW50ID0gbWF4QW1vdW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcclxuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xyXG4gIH1cclxuXHJcbiAgc2V0TW9kaWZpZXJzKCkge1xyXG4gICAgY29uc3QgbW9kaWZpZXJzVG9TZXQgPSBbXTtcclxuXHJcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcclxuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XHJcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XHJcbiAgICAgICAgaWYoYW1vdW50KSB7XHJcblxyXG4gICAgICAgICAgbW9kaWZpZXJzVG9TZXQucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBtb2RpZmllcklkLFxyXG4gICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCAhPT0gJ3NpbmdsZScgPyBncm91cElkIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYobW9kaWZpZXJzVG9TZXQubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xyXG4gICAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhtb2RpZmllcnNUb1NldCwgW10pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tWYWxpZCgpIHtcclxuXHJcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XHJcblxyXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XHJcblxyXG4gICAgICBjb25zdCBncm91cE1vZGlmaWVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdO1xyXG4gICAgICBpZihncm91cE1vZGlmaWVyLnJlcXVpcmVkKSB7XHJcbiAgICAgICAgY29uc3QgdG90YWxBbW91bnRJbkdyb3VwID0gdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XHJcbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwIDwgZ3JvdXBNb2RpZmllci5taW5BbW91bnQpIHtcclxuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtaW4gYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWluQW1vdW50fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPiBncm91cE1vZGlmaWVyLm1heEFtb3VudCkge1xyXG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1heCBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5tYXhBbW91bnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvL2ZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xyXG4gICAgICAvL1xyXG4gICAgICAvL31cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQoaXNWYWxpZCk7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgKm5nSWY9XCJkaXNoXCIgY2xhc3M9XCJuZy1jYXJ0LWRpc2gtY2FsY1wiIFtuZ0NsYXNzXT1cInsnbmctY2FydC1kaXNoLWNhbGMtdHdvLXBhcnRzLWFzc2VtYmxlZCc6IGlzVHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZX1cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkaXNoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbmdyZWRpZW50c1wiPnt7IGRpc2guZGVzY3JpcHRpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGlmaWVycy5jdXN0b20uZml4ZWQ7IGVsc2UgbW9kaWZpZXJGaXhlZFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21vZGlmaWVyRml4ZWRUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmN1c3RvbS5maXhlZCBhcyBtb2RpZmllclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZml4ZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6ICEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF19XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChjaGlsZE1vZGlmaWVyLCAxLCAnY2hlY2tib3gnKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZE1vZGlmaWVyLmRpc2g/Lm5hbWUgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZSB9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllcnNcIiAqbmdJZj1cIm1vZGlmaWVycy5iYXNlTGlzdD8ubGVuZ3RoXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmRpc2hcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItaGVhZGVyXCIgKm5nSWY9XCJtb2RpZmllci5ncm91cCBhcyBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ib3hcIiBbbmdDbGFzc109XCJ7J3dpdGhvdXQtaW1hZ2VzJzogIW1vZGlmaWVyLmNoaWxkSW1hZ2VzSXNzZXR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gU2luZ2xlIG1vZGlmaWVyIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogJ3NpbmdsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBtb2RpZmllci5tYXhBbW91bnQgfHwgMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5jaGlsZE1vZGlmaWVycz8ubGVuZ3RoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLm1pbkFtb3VudCA9PSAyICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAyOyB0aGVuIHR3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGUgZWxzZSBncm91cFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDwhLS0gQmFzZSBncm91cCBtb2RpZmllciB2aWV3IC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1uYW1lXCIgKm5nSWY9XCJncm91cC5uYW1lXCI+e3sgZ3JvdXAubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY2hpbGRyZW5cIiBbbmdDbGFzc109XCJ7J3dpdGhvdXQtaW1hZ2VzJzogIW1vZGlmaWVyLmltYWdlc0lzc2V0fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gR3JvdXAgbW9kaWZpZXIgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyVGVtcGxhdGU7IGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogbW9kaWZpZXIubW9kaWZpZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBtb2RpZmllci5tYXhBbW91bnQgfHwgMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBUd28gcGFydHMgYXNzZW1ibGVkIGdyb3VwIG1vZGlmaWVyIHZpZXcgKGxpa2UgcGl6emEgZnJvbSB0d28gaGFsdmVzKSAtLT5cclxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI3R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXJcIiBbbmdDbGFzc109XCJ7ZW1wdHk6ICF0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFttb2RpZmllci5tb2RpZmllcklkXT8ubGVuZ3RofVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hpbGRNb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0ZWQtZGlzaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0udG90YWxBbW91bnQgPT0gMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZC1kaXNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPtCS0YvQsdC10YDQuNGC0LUg0L/QvtC70L7QstC40L3RgzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDoge30gfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LW5hbWVcIj7QktGL0LHQtdGA0LjRgtC1INC70Y7QsdGL0LUg0LTQstC1INC/0L7Qu9C+0LLQuNC90LrQuDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3RUd29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyKGNoaWxkTW9kaWZpZXIpXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBkaXNoLm5hbWUgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInRleHRcIj7QmNCi0J7Qk9CeOjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+XHJcbiAgICAgICAgICAgIDxzcGFuPnt7IHRvdGFsUHJpY2V9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudFwiICpuZ0lmPVwiaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0JrQvtC80LzQtdC90YLQsNGA0LjQuTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ib3hcIj5cclxuICAgICAgICAgICAgPGlucHV0ICNjb21tZW50SW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIChrZXl1cCk9XCJjb21tZW50LmVtaXQoY29tbWVudElucHV0LnZhbHVlKVwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PlxyXG5cclxuXHJcblxyXG48IS0tIFRlbXBsYXRlIGJsb2NrICNkaXNoSW1hZ2VUZW1wbGF0ZSAtLT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjZGlzaEltYWdlVGVtcGxhdGUgbGV0LWRpc2g9XCJkaXNoXCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZGlzaD8uaW1hZ2VzICYmIGRpc2guaW1hZ2VzWzBdPy5pbWFnZXM/LnNtYWxsOyBlbHNlIGltZ1BsYWNlaG9sZGVyXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxuZy10ZW1wbGF0ZSAjaW1nUGxhY2Vob2xkZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cclxuICAgIDwvbmctdGVtcGxhdGU+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllclRlbXBsYXRlIC0tPlxyXG5cclxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXHJcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxyXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBBbW91bnQ9XCJncm91cEFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmRpc2ggYXMgZGlzaFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1uYW1lXCI+e3sgZGlzaC5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC13ZWlnaHRcIiAqbmdJZj1cImRpc2gud2VpZ2h0XCI+e3sgZGlzaC53ZWlnaHQgKiAxMDAwIH19INCz0YA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXByaWNlLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDigr1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveFwiPlxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImdyb3VwTWluQW1vdW50IDw9IDEgJiYgZ3JvdXBNYXhBbW91bnQgPT0gMTsgZWxzZSBjb3VudGVyVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDaGVja2JveFRlbXBsYXRlOyBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnRcclxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvdW50ZXJUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJDb3VudGVyVGVtcGxhdGU7IGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBBbW91bnQ6IGdyb3VwQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBncm91cE1heEFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJDb3VudGVyVGVtcGxhdGUgLS0+XHJcblxyXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlXHJcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxyXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBBbW91bnQ9XCJncm91cEFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNaW5BbW91bnQ9XCJncm91cE1pbkFtb3VudFwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxyXG4gICAgPG5nLWNvbnRhaW5lcj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY291bnRlclwiIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCAmJiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIj5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwibWludXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogIWFtb3VudCB8fCBncm91cEFtb3VudCA8PSBncm91cE1pbkFtb3VudH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50IC0gMSwgJ21pbnVzJylcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+LTwvZGl2PlxyXG4gICAgICAgICAgICA8aW5wdXQgW3ZhbHVlXT1cImFtb3VudFwiIHJlYWRvbmx5ICNpbnB1dD5cclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicGx1c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiBncm91cEFtb3VudCA+PSBncm91cE1heEFtb3VudH1cIlxyXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ICsgMSwgJ3BsdXMnKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4rPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZSAtLT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlXHJcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXHJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBJZD1cImdyb3VwSWRcIlxyXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiPlxyXG4gICAgPG5nLWNvbnRhaW5lcj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBjbGFzcz1cIm1vZGlmaWVyLWNoZWNrYm94XCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogYW1vdW50fVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCA/IDAgOiAxLCAnY2hlY2tib3gnKVwiPjwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcbiJdfQ==