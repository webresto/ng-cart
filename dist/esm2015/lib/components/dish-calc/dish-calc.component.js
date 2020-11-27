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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi9wcm9qZWN0cy93ZWJyZXN0by9uZy1jYXJ0L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50LnRzIiwibGliL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFnQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0csT0FBTyxFQUVMLFlBQVksRUFDYixNQUFNLHdCQUF3QixDQUFDOzs7Ozs7SUNIcEIsd0JBQTRGOzs7O0lBTXhGLDZCQUNJO0lBQUEsK0JBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQWdCO0lBQUEsaUJBQU87SUFBQyx3QkFDbEM7SUFBQSxpQkFBTTtJQUNWLDBCQUFlOzs7SUFIUSxlQUF1QztJQUF2Qyx5RUFBdUM7SUFDaEQsZUFBZ0I7SUFBaEIsd0NBQWdCOzs7OztJQU1sQiw2QkFDSTtJQUFBLCtCQUdJO0lBREMsb1NBQTZDLENBQUMsRUFBRSxVQUFVLEtBQUU7SUFDN0QsWUFDSjtJQUFBLGlCQUFNO0lBQ1YsMEJBQWU7Ozs7O0lBSk4sZUFBMkY7SUFBM0YseUlBQTJGO0lBRTVGLGVBQ0o7SUFESSxvR0FDSjs7O0lBSUosNkJBQ0k7SUFBQSwrQkFDSTtJQUFBLDRCQUFNO0lBQUEsWUFBK0I7SUFBQSxpQkFBTztJQUFDLHdCQUNqRDtJQUFBLGlCQUFNO0lBQ1YsMEJBQWU7OztJQUhRLGVBQXNEO0lBQXRELDZIQUFzRDtJQUMvRCxlQUErQjtJQUEvQiwwRkFBK0I7OztJQUhqRCw2QkFDSTtJQUFBLHdJQUllO0lBQ25CLDBCQUFlOzs7OztJQUxJLGVBQXlFO0lBQXpFLDBHQUF5RTs7O0lBWGhHLDZCQUNJO0lBQUEsK0JBQ0k7SUFBQSx5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SEFPYztRQUlkLG1IQTRDYztRQUlkLG9IQXNCYztRQUlkLG1IQVVjOztRQWpRUiwrQkFBVTs7a0REYUgsaUJBQWlCO2NBTDdCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLDRCQUE0QjtnQkFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7YUFDMUM7O3NCQTRCSSxNQUFNO3VCQUFDLFVBQVU7d0JBekJYLElBQUk7a0JBQVosS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQUNHLGlCQUFpQjtrQkFBekIsS0FBSztZQUNJLFFBQVE7a0JBQWpCLE1BQU07WUFDRyxlQUFlO2tCQUF4QixNQUFNO1lBQ0csT0FBTztrQkFBaEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdSZXN0b0NhcnRTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL25nLXJlc3RvY2FydC5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gIEV2ZW50ZXJTZXJ2aWNlLFxyXG4gIEV2ZW50TWVzc2FnZVxyXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlL2Rpc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkaXNoLWNhbGMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaXNoLWNhbGMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Rpc2gtY2FsYy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSBkaXNoOmFueTtcclxuICBASW5wdXQoKSBhbW91bnQ6YW55O1xyXG4gIEBJbnB1dCgpIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcclxuICBAT3V0cHV0KCkgdmFsaWRhdGU6RXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGFtb3VudERpc2hUb0FkZDpFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgY29tbWVudDpFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgbW9kaWZpZXJzID0ge1xyXG4gICAgaW5kZXhCeUlkOiB7fSxcclxuICAgIGN1c3RvbToge1xyXG4gICAgICBmaXhlZDogbnVsbFxyXG4gICAgfSxcclxuICAgIGJhc2VMaXN0OiBbXSxcclxuICB9O1xyXG5cclxuICBpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGU6IGJvb2xlYW47XHJcblxyXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcclxuICBtb2RpZmllcnNWYWx1ZVRyZWU6IGFueSA9IHt9O1xyXG4gIHR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkOiBhbnkgPSB7fTtcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSxcclxuICAgIHByaXZhdGUgZXZlbnRlcjpFdmVudGVyU2VydmljZSxcclxuICAgIEBJbmplY3QoJ0ltYWdlVXJsJykgaW1hZ2VVcmw6c3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLmltYWdlVXJsID0gaW1hZ2VVcmw7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XHJcbiAgICB0aGlzLmNhcnRTZXJ2aWNlLnNldE1vZGlmaXJlcyhbXSwgW10pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm1vZGlmaWVycyA9IHtcclxuICAgICAgaW5kZXhCeUlkOiB7fSxcclxuICAgICAgY3VzdG9tOiB7XHJcbiAgICAgICAgZml4ZWQ6IG51bGxcclxuICAgICAgfSxcclxuICAgICAgYmFzZUxpc3Q6IFtdLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSA9IHt9O1xyXG4gICAgaWYodGhpcy5kaXNoICYmIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcclxuICAgICAgZm9yKGxldCBtb2RpZmllciBvZiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XHJcbiAgICAgICAgbGV0IG1vZGlmaWVyVHlwZSA9IG51bGw7XHJcbiAgICAgICAgLy8gSW5kZXhpbmdcclxuICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcclxuICAgICAgICAvLyBDaGVjayBDdXN0b20gbW9kaWZpZXJzIChsaWtlIFBpenphIFNpemUpXHJcbiAgICAgICAgaWYoIXRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZFxyXG4gICAgICAgICAgJiYgIXRoaXMubW9kaWZpZXJzLmJhc2VMaXN0Lmxlbmd0aFxyXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcclxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmxlbmd0aCA9PSAyXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gbW9kaWZpZXIubWF4QW1vdW50XHJcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gMSkge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyBQaXp6YSBTaXplIG1vZGlmaWVyXHJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnY3VzdG9tJztcclxuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmN1c3RvbS5maXhlZCA9IG1vZGlmaWVyO1xyXG4gICAgICAgICAgY29uc29sZS5pbmZvKCdDdXN0b20gRml4ZWQgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5ncm91cFxyXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcclxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzLmxlbmd0aFxyXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMuZmluZChtID0+IG0uZGlzaCkpIHtcclxuICAgICAgICAgIC8vIFRoaXMgaXMgQmFzZSBtb2RpZmllclxyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2dyb3VwJztcclxuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xyXG5cclxuICAgICAgICAgIGlmKG1vZGlmaWVyLm1pbkFtb3VudCA9PSAyICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlID0gdHJ1ZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUuaW5mbygnR3JvdXAgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xyXG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XHJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnc2luZ2xlJztcclxuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xyXG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBUaGlzIGlzIGJyb2tlbiBtb2RpZmllclxyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0Jyb2tlbiBtb2RpZmllcjonLCBtb2RpZmllcik7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlc1xyXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdncm91cCc6XHJcbiAgICAgICAgICBjYXNlICdjdXN0b20nOlxyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IobGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMpIHtcclxuICAgICAgICAgICAgICAvLyBJbmRleGluZ1xyXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcclxuICAgICAgICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVcclxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllci5kZWZhdWx0QW1vdW50O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0b3RhbCBhbW91bnQgaW4gZ3JvdXBcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAobW9kaWZpZXIubW9kaWZpZXJJZCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnc2luZ2xlJzpcclxuICAgICAgICAgICAgaWYoIXRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSl7XHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBJbmRleGluZ1xyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcclxuICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXHJcbiAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5kIGltYWdlcyBhbmQgc2V0IGZsYWdzIChpbWFnZXNJc3NldCwgY2hpbGRJbWFnZXNJc3NldClcclxuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllci5tb2RpZmllcklkKTtcclxuXHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZyhgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkYCwgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKSB7XHJcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XHJcbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgPSBPYmplY3RcclxuICAgICAgLnZhbHVlcyh0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSlcclxuICAgICAgLnJlZHVjZSgoYTogYW55LCBiOiBhbnkpID0+IGEgKyBiKTtcclxuICAgIHJldHVybiB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQ7XHJcbiAgfVxyXG5cclxuICBjaGVja0ltYWdlc0luTW9kaWZpZXIobW9kaWZpZXJJZCkge1xyXG4gICAgY29uc3QgbTogYW55ID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdO1xyXG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmltYWdlc0lzc2V0ID0gbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XHJcbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF0uY2hpbGRJbWFnZXNJc3NldCA9ICEhdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdXHJcbiAgICAgIC5jaGlsZE1vZGlmaWVyc1xyXG4gICAgICAuZmluZCgobTogYW55KSA9PiBtICYmIG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIGNhbGN1bGF0ZVRvdGFsUHJpY2UoKSB7XHJcbiAgICBsZXQgdG90YWxQcmljZSA9IHRoaXMuZGlzaC5wcmljZSB8fCAwO1xyXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XHJcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xyXG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xyXG4gICAgICAgIGlmKGFtb3VudCkge1xyXG4gICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XHJcbiAgICAgICAgICBpZihtb2RpZmllciAmJiBtb2RpZmllci5kaXNoICYmIG1vZGlmaWVyLmRpc2gucHJpY2UpIHtcclxuICAgICAgICAgICAgdG90YWxQcmljZSArPSBtb2RpZmllci5kaXNoLnByaWNlICogYW1vdW50O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy50b3RhbFByaWNlID0gdG90YWxQcmljZTtcclxuICAgIHRoaXMuc2V0TW9kaWZpZXJzKCk7XHJcbiAgfVxyXG5cclxuICBnZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdyb3VwSWQ6IChtb2RpZmllci5kaXNoICYmIG1vZGlmaWVyLmRpc2guZ3JvdXBJZCkgPyBtb2RpZmllci5kaXNoLmdyb3VwSWQgOiB1bmRlZmluZWQsXHJcbiAgICAgIG1vZGlmaWVySWQ6IG1vZGlmaWVyLm1vZGlmaWVySWRcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIobW9kaWZpZXI6IGFueSkge1xyXG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcclxuICAgIGNvbnN0IHsgbWluQW1vdW50LCBtYXhBbW91bnQgfSA9IG1vZGlmaWVyO1xyXG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcclxuICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcclxuICAgIGNvbnN0IHByZXZpb3VzQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcclxuICAgIGNvbnN0IGFtb3VudDogbnVtYmVyID0gcHJldmlvdXNBbW91bnQgPyAwIDogMTtcclxuXHJcbiAgICAvLyBJbml0IHRtcCB2YWx1ZSBzdG9yYWdlIGlmIG5vdCBleGlzdHNcclxuICAgIGlmKCF0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdKSB7XHJcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUb3RhbCBhbW91bnQgaW4gZ3JvdXBcclxuICAgIGNvbnN0IGdyb3VwQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0udG90YWxBbW91bnQgLSBwcmV2aW91c0Ftb3VudCArIGFtb3VudDtcclxuICAgIGlmKGdyb3VwQW1vdW50ID4gZ3JvdXBNYXhBbW91bnQpIHtcclxuICAgICAgaWYodGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXS5sZW5ndGgpIHtcclxuICAgICAgICBmb3IobGV0IG1JZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbUlkXSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0gPSB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdLnNsaWNlKDEsMik7XHJcbiAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXVswXV0gPSAxO1xyXG4gICAgICB9ZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWF4ICR7Z3JvdXBNYXhBbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XHJcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxyXG4gICAgICAgICAgICAnd2FybmluZycsXHJcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcclxuICAgICAgICAgICAgYNCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQvtC/0YbQuNC5INC00LvRjyDQs9GA0YPQv9C/0YtcclxuICAgICAgICAgICAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0g0L3QtSDQsdC+0LvQtdC1ICR7Z3JvdXBNYXhBbW91bnR9YFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9ZWxzZSBpZihncm91cEFtb3VudCA9PT0gMCkge1xyXG4gICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgaWYoYW1vdW50ICYmICF0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdLmZpbmQodiA9PiB2ID09IG1vZGlmaWVySWQpKSB7XHJcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ucHVzaChtb2RpZmllcklkKTtcclxuICAgIH1cclxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdID0gYW1vdW50O1xyXG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcclxuICB9XHJcblxyXG4gIGNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyOiBhbnksIGFtb3VudDogbnVtYmVyLCBvcGVyYXRpb246IHN0cmluZykge1xyXG4gICAgaWYoYW1vdW50IDwgMCkgcmV0dXJuO1xyXG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcclxuICAgIGNvbnN0IHsgbWluQW1vdW50LCBtYXhBbW91bnQgfSA9IG1vZGlmaWVyO1xyXG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcclxuICAgICAgICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcclxuICAgIGNvbnN0IHByZXZpb3VzQW1vdW50OiBudW1iZXIgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcclxuXHJcbiAgICAvLyBGb3IgY2hlY2tib3hcclxuICAgIGlmKG9wZXJhdGlvbiA9PSAnY2hlY2tib3gnICYmIGdyb3VwSWQgIT09ICdzaW5nbGUnKSB7XHJcbiAgICAgIC8vIElmIGl0IHdvcmsgbGlrZSByYWRpbyBidXR0b25cclxuICAgICAgaWYoZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxKSB7XHJcbiAgICAgICAgaWYoYW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gU2V0IHplcm8gYW1vdW50IGZvciBhbGwgb3B0aW9uc1xyXG4gICAgICAgIGZvcihsZXQgaXRlbU1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcclxuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW2l0ZW1Nb2RpZmllcklkXSA9IDBcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gTm90IGFjdGlvbiBuZWVkZWQgYWZ0ZXJcclxuICAgICAgaWYoYW1vdW50ID09IDApIHtcclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBHcm91cCBhbW91bnQgbGltaXRzXHJcbiAgICBpZihncm91cE1pbkFtb3VudCB8fCBncm91cE1heEFtb3VudCkge1xyXG4gICAgICAvLyBUb3RhbCBhbW91bnQgaW4gZ3JvdXBcclxuICAgICAgY29uc3QgZ3JvdXBBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCAtIHByZXZpb3VzQW1vdW50ICsgYW1vdW50O1xyXG5cclxuICAgICAgaWYoZ3JvdXBBbW91bnQgPCBncm91cE1pbkFtb3VudCkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihgTGltaXQ6IG1pbiAke2dyb3VwTWluQW1vdW50fS4gQ3VycmVudCAke2dyb3VwQW1vdW50fWApO1xyXG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxyXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcclxuICAgICAgICAgICAgJ3dhcm5pbmcnLFxyXG4gICAgICAgICAgICAn0J7Qs9GA0LDQvdC40YfQtdC90LjQtScsXHJcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXHJcbiAgICAgICAgICAgINC80L7QtNC40YTQuNC60LDRgtC+0YDQvtCyIFwiJHt0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0uZ3JvdXAubmFtZX1cIiAtINC90LUg0LzQtdC90LXQtSAke2dyb3VwTWluQW1vdW50fWBcclxuICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZihncm91cEFtb3VudCA+IGdyb3VwTWF4QW1vdW50KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWF4ICR7Z3JvdXBNYXhBbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XHJcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxyXG4gICAgICAgICAgICAnd2FybmluZycsXHJcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcclxuICAgICAgICAgICAgYNCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQvtC/0YbQuNC5INC00LvRjyDQs9GA0YPQv9C/0YtcclxuICAgICAgICAgICAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0g0L3QtSDQsdC+0LvQtdC1ICR7Z3JvdXBNYXhBbW91bnR9YFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ0hlY2sgTW9kaWZpZXIgYW1vdW50IGxpbWl0c1xyXG4gICAgaWYobWluQW1vdW50IHx8IG1heEFtb3VudCkge1xyXG4gICAgICBpZihhbW91bnQgPCBtaW5BbW91bnQpIHtcclxuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xyXG4gICAgICAgICAgY2FzZSAncGx1cyc6IGFtb3VudCA9IG1pbkFtb3VudDsgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdtaW51cyc6IGFtb3VudCA9IDA7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZihhbW91bnQgPiBtYXhBbW91bnQpIHtcclxuICAgICAgICBhbW91bnQgPSBtYXhBbW91bnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXSA9IGFtb3VudDtcclxuICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xyXG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XHJcbiAgfVxyXG5cclxuICBzZXRNb2RpZmllcnMoKSB7XHJcbiAgICBjb25zdCBtb2RpZmllcnNUb1NldCA9IFtdO1xyXG5cclxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xyXG4gICAgICBmb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcclxuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcclxuICAgICAgICBpZihhbW91bnQpIHtcclxuXHJcbiAgICAgICAgICBtb2RpZmllcnNUb1NldC5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IG1vZGlmaWVySWQsXHJcbiAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgICBncm91cElkOiBncm91cElkICE9PSAnc2luZ2xlJyA/IGdyb3VwSWQgOiB1bmRlZmluZWRcclxuICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZihtb2RpZmllcnNUb1NldC5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5jaGVja1ZhbGlkKCk7XHJcbiAgICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKG1vZGlmaWVyc1RvU2V0LCBbXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja1ZhbGlkKCkge1xyXG5cclxuICAgIGxldCBpc1ZhbGlkID0gdHJ1ZTtcclxuXHJcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcclxuXHJcbiAgICAgIGNvbnN0IGdyb3VwTW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF07XHJcbiAgICAgIGlmKGdyb3VwTW9kaWZpZXIucmVxdWlyZWQpIHtcclxuICAgICAgICBjb25zdCB0b3RhbEFtb3VudEluR3JvdXAgPSB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcclxuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPCBncm91cE1vZGlmaWVyLm1pbkFtb3VudCkge1xyXG4gICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKGBNb2RpZmllciAke2dyb3VwSWR9IG1pbiBhbW91bnQ6ICR7Z3JvdXBNb2RpZmllci5taW5BbW91bnR9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA+IGdyb3VwTW9kaWZpZXIubWF4QW1vdW50KSB7XHJcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWF4IGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1heEFtb3VudH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XHJcbiAgICAgIC8vXHJcbiAgICAgIC8vfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmFsaWRhdGUuZW1pdChpc1ZhbGlkKTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiAqbmdJZj1cImRpc2hcIiBjbGFzcz1cIm5nLWNhcnQtZGlzaC1jYWxjXCIgW25nQ2xhc3NdPVwieyduZy1jYXJ0LWRpc2gtY2FsYy10d28tcGFydHMtYXNzZW1ibGVkJzogaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlfVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImRpc2hcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1ib3hcIj5cclxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImRpc2hJbWFnZVRlbXBsYXRlOyBjb250ZXh0OiB7IGRpc2g6IGRpc2ggfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWRlc2NyaXB0aW9uLWJveFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1uYW1lXCI+e3sgZGlzaC5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWluZ3JlZGllbnRzXCI+e3sgZGlzaC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1wcmljZS1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbW9kaWZpZXJzLmN1c3RvbS5maXhlZDsgZWxzZSBtb2RpZmllckZpeGVkVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJGaXhlZFRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllcnMuY3VzdG9tLmZpeGVkIGFzIG1vZGlmaWVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1maXhlZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXX1cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KGNoaWxkTW9kaWZpZXIsIDEsICdjaGVja2JveCcpXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGNoaWxkTW9kaWZpZXIuZGlzaD8ubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcmljZVwiIFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFjaGlsZE1vZGlmaWVyLmRpc2g/LnByaWNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBjaGlsZE1vZGlmaWVyLmRpc2g/LnByaWNlIH19PC9zcGFuPiDigr1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyc1wiICpuZ0lmPVwibW9kaWZpZXJzLmJhc2VMaXN0Py5sZW5ndGhcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBtb2RpZmllciBvZiBtb2RpZmllcnMuYmFzZUxpc3RcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1oZWFkZXJcIiAqbmdJZj1cIm1vZGlmaWVyLmdyb3VwIGFzIGdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1uYW1lXCIgKm5nSWY9XCJncm91cC5uYW1lXCI+e3sgZ3JvdXAubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWJveFwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuY2hpbGRJbWFnZXNJc3NldH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTaW5nbGUgbW9kaWZpZXIgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiAnc2luZ2xlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IG1vZGlmaWVyLm1pbkFtb3VudCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzPy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDI7IHRoZW4gdHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZSBlbHNlIGdyb3VwVGVtcGxhdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPCEtLSBCYXNlIGdyb3VwIG1vZGlmaWVyIHZpZXcgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNncm91cFRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItaGVhZGVyXCIgKm5nSWY9XCJtb2RpZmllci5ncm91cCBhcyBncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jaGlsZHJlblwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuaW1hZ2VzSXNzZXR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBHcm91cCBtb2RpZmllciAtLT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IGNoaWxkTW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBtb2RpZmllci5tb2RpZmllcklkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdLnRvdGFsQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IG1vZGlmaWVyLm1pbkFtb3VudCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8IS0tIFR3byBwYXJ0cyBhc3NlbWJsZWQgZ3JvdXAgbW9kaWZpZXIgdmlldyAobGlrZSBwaXp6YSBmcm9tIHR3byBoYWx2ZXMpIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjdHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlclwiIFtuZ0NsYXNzXT1cIntlbXB0eTogIXR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW21vZGlmaWVyLm1vZGlmaWVySWRdPy5sZW5ndGh9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjaGlsZE1vZGlmaWVyLmRpc2ggYXMgZGlzaFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZC1kaXNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCA9PSAxXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWRpc2hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+0JLRi9Cx0LXRgNC40YLQtSDQv9C+0LvQvtCy0LjQvdGDPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiB7fSB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbmFtZVwiPtCS0YvQsdC10YDQuNGC0LUg0LvRjtCx0YvQtSDQtNCy0LUg0L/QvtC70L7QstC40L3QutC4PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIoY2hpbGRNb2RpZmllcilcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiY2hpbGRNb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1uYW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGRpc2gubmFtZSB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLXByaWNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDigr1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPtCY0KLQntCT0J46PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj5cclxuICAgICAgICAgICAgPHNwYW4+e3sgdG90YWxQcmljZX19PC9zcGFuPiDigr1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50XCIgKm5nSWY9XCJpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj7QmtC+0LzQvNC10L3RgtCw0YDQuNC5PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImlucHV0LWJveFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgI2NvbW1lbnRJbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgKGtleXVwKT1cImNvbW1lbnQuZW1pdChjb21tZW50SW5wdXQudmFsdWUpXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxyXG5cclxuPG5nLXRlbXBsYXRlICNkaXNoSW1hZ2VUZW1wbGF0ZSBsZXQtZGlzaD1cImRpc2hcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZVwiIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiJ3VybCgnICsgaW1hZ2VVcmwgKyBkaXNoLmltYWdlc1swXS5pbWFnZXMuc21hbGwgKyAnKSdcIj48L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1wbGFjZWhvbGRlclwiPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyVGVtcGxhdGUgLS0+XHJcblxyXG48bmctdGVtcGxhdGUgI21vZGlmaWVyVGVtcGxhdGVcclxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcclxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXHJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1heEFtb3VudD1cImdyb3VwTWF4QW1vdW50XCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiICpuZ0lmPVwiZGlzaC53ZWlnaHRcIj57eyBkaXNoLndlaWdodCAqIDEwMDAgfX0g0LPRgDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtcHJpY2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1hY3Rpb24tYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxOyBlbHNlIGNvdW50ZXJUZW1wbGF0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNoZWNrYm94VGVtcGxhdGU7IGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudFxyXG4gICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY291bnRlclRlbXBsYXRlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNvdW50ZXJUZW1wbGF0ZTsgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogZ3JvdXBBbW91bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBncm91cE1pbkFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cclxuXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZSAtLT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjbW9kaWZpZXJDb3VudGVyVGVtcGxhdGVcclxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcclxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXHJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1heEFtb3VudD1cImdyb3VwTWF4QW1vdW50XCI+XHJcbiAgICA8bmctY29udGFpbmVyPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jb3VudGVyXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50ICYmIGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiPlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJtaW51c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50IHx8IGdyb3VwQW1vdW50IDw9IGdyb3VwTWluQW1vdW50fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgLSAxLCAnbWludXMnKVwiXHJcbiAgICAgICAgICAgICAgICAgICAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIj4tPC9kaXY+XHJcbiAgICAgICAgICAgIDxpbnB1dCBbdmFsdWVdPVwiYW1vdW50XCIgcmVhZG9ubHkgI2lucHV0PlxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiXHJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgKyAxLCAncGx1cycpXCJcclxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPis8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJDaGVja2JveFRlbXBsYXRlIC0tPlxyXG5cclxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGVcclxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcclxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXHJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCI+XHJcbiAgICA8bmctY29udGFpbmVyPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzPVwibW9kaWZpZXItY2hlY2tib3hcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie3NlbGVjdGVkOiBhbW91bnR9XCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ID8gMCA6IDEsICdjaGVja2JveCcpXCI+PC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19