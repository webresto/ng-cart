import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { EventMessage } from '@webresto/ng-core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/ng-restocart.service";
import * as i2 from "@webresto/ng-core";
import * as i3 from "@angular/common";
function DishCalcComponent_div_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { "zero-price": a0 }; };
function DishCalcComponent_div_0_ng_container_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 19);
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
    const _r20 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 23);
    i0.ɵɵlistener("click", function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r20); const childModifier_r18 = ctx.$implicit; const ctx_r19 = i0.ɵɵnextContext(4); return ctx_r19.changeModifierAmount(childModifier_r18, 1, "checkbox"); });
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r18 = ctx.$implicit;
    const modifier_r15 = i0.ɵɵnextContext().ngIf;
    const ctx_r16 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, !!ctx_r16.modifiersValueTree[modifier_r15.modifierId][childModifier_r18.modifierId]));
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate1(" ", childModifier_r18.dish == null ? null : childModifier_r18.dish.name, " ");
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 19);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(4, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r22 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c0, !(childModifier_r22.dish == null ? null : childModifier_r22.dish.price)));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(childModifier_r22.dish == null ? null : childModifier_r22.dish.price);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_ng_container_1_Template, 5, 4, "ng-container", 20);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r22 = ctx.$implicit;
    const modifier_r15 = i0.ɵɵnextContext().ngIf;
    const ctx_r17 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", !!ctx_r17.modifiersValueTree[modifier_r15.modifierId][childModifier_r22.modifierId]);
} }
function DishCalcComponent_div_0_ng_template_11_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 21);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_2_Template, 3, 4, "ng-container", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_ng_template_11_ng_container_0_ng_container_3_Template, 2, 1, "ng-container", 22);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r15 = ctx.ngIf;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", modifier_r15.childModifiers);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", modifier_r15.childModifiers);
} }
function DishCalcComponent_div_0_ng_template_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_div_0_ng_template_11_ng_container_0_Template, 4, 2, "ng-container", 20);
} if (rf & 2) {
    const ctx_r12 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", ctx_r12.modifiers.custom.fixed);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 30);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r31.name);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 31);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(group_r31.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_1_Template, 2, 1, "div", 28);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_div_2_Template, 2, 1, "div", 29);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r31 = ctx.ngIf;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r31.name);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", group_r31.description);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c2 = function (a0) { return { "without-images": a0 }; };
const _c3 = function (a0, a2, a3, a4, a5) { return { modifier: a0, groupId: "single", amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 32);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_ng_container_2_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = i0.ɵɵnextContext().$implicit;
    const ctx_r29 = i0.ɵɵnextContext(3);
    const _r3 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(3, _c2, !modifier_r27.childImagesIsset));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction5(5, _c3, modifier_r27, ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], ctx_r29.modifiersValueTree["single"][modifier_r27.modifierId], modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c4 = function (a0, a1, a2, a3, a4, a5) { return { modifier: a0, groupId: a1, amount: a2, groupAmount: a3, groupMinAmount: a4, groupMaxAmount: a5 }; };
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const childModifier_r39 = ctx.$implicit;
    const modifier_r27 = i0.ɵɵnextContext(2).$implicit;
    const ctx_r38 = i0.ɵɵnextContext(3);
    const _r3 = i0.ɵɵreference(4);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r3)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, childModifier_r39, modifier_r27.modifierId, ctx_r38.modifiersValueTree[modifier_r27.modifierId][childModifier_r39.modifierId], ctx_r38.modifiers.indexById[modifier_r27.modifierId].totalAmount, modifier_r27.minAmount || 0, modifier_r27.maxAmount || 100));
} }
function DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 33);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_ng_container_2_Template, 2, 9, "ng-container", 22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c2, !modifier_r27.imagesIsset));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", modifier_r27.childModifiers);
} }
function DishCalcComponent_div_0_div_13_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 25);
    i0.ɵɵtemplate(2, DishCalcComponent_div_0_div_13_ng_container_1_div_2_Template, 3, 2, "div", 26);
    i0.ɵɵtemplate(3, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_3_Template, 3, 11, "ng-container", 20);
    i0.ɵɵtemplate(4, DishCalcComponent_div_0_div_13_ng_container_1_ng_container_4_Template, 3, 4, "ng-container", 20);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const modifier_r27 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", modifier_r27.group);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", modifier_r27.dish);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngIf", modifier_r27.childModifiers == null ? null : modifier_r27.childModifiers.length);
} }
function DishCalcComponent_div_0_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵtemplate(1, DishCalcComponent_div_0_div_13_ng_container_1_Template, 5, 3, "ng-container", 22);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r13 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r13.modifiers.baseList);
} }
const _c5 = function (a0) { return { dish: a0 }; };
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
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const _r11 = i0.ɵɵreference(12);
    const ctx_r0 = i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, ctx_r0.dish));
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
} }
function DishCalcComponent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "div", 35);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r43 = i0.ɵɵnextContext().dish;
    const ctx_r44 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("background-image", "url(" + ctx_r44.imageUrl + dish_r43.images[0].images.small + ")");
} }
function DishCalcComponent_ng_template_1_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 36);
} }
function DishCalcComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_1_ng_container_0_Template, 2, 2, "ng-container", 13);
    i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_ng_template_1_Template, 1, 0, "ng-template", null, 34, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const dish_r43 = ctx.dish;
    const _r45 = i0.ɵɵreference(2);
    i0.ɵɵproperty("ngIf", (dish_r43 == null ? null : dish_r43.images) && (dish_r43.images[0] == null ? null : dish_r43.images[0].images == null ? null : dish_r43.images[0].images.small))("ngIfElse", _r45);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c6 = function (a0, a1, a2) { return { modifier: a0, groupId: a1, amount: a2 }; };
function DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r61 = i0.ɵɵnextContext(2);
    const modifier_r48 = ctx_r61.modifier;
    const groupId_r49 = ctx_r61.groupId;
    const amount_r50 = ctx_r61.amount;
    i0.ɵɵnextContext();
    const _r7 = i0.ɵɵreference(8);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r7)("ngTemplateOutletContext", i0.ɵɵpureFunction3(2, _c6, modifier_r48, groupId_r49, amount_r50));
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_ng_container_0_Template, 1, 0, "ng-container", 8);
} if (rf & 2) {
    const ctx_r63 = i0.ɵɵnextContext(2);
    const modifier_r48 = ctx_r63.modifier;
    const groupId_r49 = ctx_r63.groupId;
    const amount_r50 = ctx_r63.amount;
    const groupAmount_r51 = ctx_r63.groupAmount;
    const groupMinAmount_r52 = ctx_r63.groupMinAmount;
    const groupMaxAmount_r53 = ctx_r63.groupMaxAmount;
    i0.ɵɵnextContext();
    const _r5 = i0.ɵɵreference(6);
    i0.ɵɵproperty("ngTemplateOutlet", _r5)("ngTemplateOutletContext", i0.ɵɵpureFunction6(2, _c4, modifier_r48, groupId_r49, amount_r50, groupAmount_r51, groupMinAmount_r52, groupMaxAmount_r53));
} }
function DishCalcComponent_ng_template_3_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 37);
    i0.ɵɵelementStart(2, "div", 38);
    i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 39);
    i0.ɵɵelementStart(5, "div", 40);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 41);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 42);
    i0.ɵɵelementStart(10, "div", 43);
    i0.ɵɵelementStart(11, "span");
    i0.ɵɵtext(12);
    i0.ɵɵelementEnd();
    i0.ɵɵtext(13, " \u20BD ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "div", 44);
    i0.ɵɵtemplate(15, DishCalcComponent_ng_template_3_ng_container_0_ng_container_15_Template, 2, 6, "ng-container", 13);
    i0.ɵɵtemplate(16, DishCalcComponent_ng_template_3_ng_container_0_ng_template_16_Template, 1, 9, "ng-template", null, 45, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const dish_r55 = ctx.ngIf;
    const _r58 = i0.ɵɵreference(17);
    const ctx_r64 = i0.ɵɵnextContext();
    const groupMinAmount_r52 = ctx_r64.groupMinAmount;
    const groupMaxAmount_r53 = ctx_r64.groupMaxAmount;
    i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(2);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(8, _c5, dish_r55));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(dish_r55.name);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("", dish_r55.weight * 1000, " \u0433\u0440");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(10, _c0, !dish_r55.price));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(dish_r55.price);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", groupMinAmount_r52 <= 1 && groupMaxAmount_r53 == 1)("ngIfElse", _r58);
} }
function DishCalcComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, DishCalcComponent_ng_template_3_ng_container_0_Template, 18, 12, "ng-container", 20);
} if (rf & 2) {
    const modifier_r48 = ctx.modifier;
    i0.ɵɵproperty("ngIf", modifier_r48.dish);
} }
const _c7 = function (a0) { return { disabled: a0 }; };
function DishCalcComponent_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    const _r73 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 46);
    i0.ɵɵelementStart(2, "div", 47);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_2_listener() { i0.ɵɵrestoreView(_r73); const modifier_r65 = ctx.modifier; const amount_r67 = ctx.amount; const ctx_r72 = i0.ɵɵnextContext(); return ctx_r72.changeModifierAmount(modifier_r65, amount_r67 - 1, "minus"); });
    i0.ɵɵtext(3, "-");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "input", 48, 49);
    i0.ɵɵelementStart(6, "div", 50);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_5_Template_div_click_6_listener() { i0.ɵɵrestoreView(_r73); const modifier_r65 = ctx.modifier; const amount_r67 = ctx.amount; const ctx_r74 = i0.ɵɵnextContext(); return ctx_r74.changeModifierAmount(modifier_r65, amount_r67 + 1, "plus"); });
    i0.ɵɵtext(7, "+");
    i0.ɵɵelementEnd();
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r67 = ctx.amount;
    const groupAmount_r68 = ctx.groupAmount;
    const groupMinAmount_r69 = ctx.groupMinAmount;
    const groupMaxAmount_r70 = ctx.groupMaxAmount;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(4, _c7, !amount_r67 && groupAmount_r68 >= groupMaxAmount_r70));
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(6, _c7, !amount_r67 || groupAmount_r68 <= groupMinAmount_r69));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", amount_r67);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(8, _c7, groupAmount_r68 >= groupMaxAmount_r70));
} }
function DishCalcComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r79 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "div", 51);
    i0.ɵɵlistener("click", function DishCalcComponent_ng_template_7_Template_div_click_1_listener() { i0.ɵɵrestoreView(_r79); const modifier_r75 = ctx.modifier; const amount_r77 = ctx.amount; const ctx_r78 = i0.ɵɵnextContext(); return ctx_r78.changeModifierAmount(modifier_r75, amount_r77 ? 0 : 1, "checkbox"); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const amount_r77 = ctx.amount;
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(1, _c1, amount_r77));
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
DishCalcComponent.ɵcmp = i0.ɵɵdefineComponent({ type: DishCalcComponent, selectors: [["dish-calc"]], inputs: { dish: "dish", amount: "amount", selectedModifiers: "selectedModifiers" }, outputs: { validate: "validate", amountDishToAdd: "amountDishToAdd" }, features: [i0.ɵɵNgOnChangesFeature], decls: 9, vars: 1, consts: [["class", "ng-cart-dish-calc", 4, "ngIf"], ["dishImageTemplate", ""], ["modifierTemplate", ""], ["modifierCounterTemplate", ""], ["modifierCheckboxTemplate", ""], [1, "ng-cart-dish-calc"], [1, "dish"], [1, "dish-image-box"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "dish-description-box"], [1, "dish-name"], [1, "dish-ingredients"], [1, "dish-price-box"], [4, "ngIf", "ngIfElse"], ["modifierFixedTemplate", ""], ["class", "modifiers", 4, "ngIf"], [1, "result"], [1, "text"], [1, "price"], [1, "price", 3, "ngClass"], [4, "ngIf"], [1, "modifier-fixed"], [4, "ngFor", "ngForOf"], [1, "item", 3, "ngClass", "click"], [1, "modifiers"], [1, "modifier-group"], ["class", "modifier-header", 4, "ngIf"], [1, "modifier-header"], ["class", "modifier-name", 4, "ngIf"], ["class", "modifier-description", 4, "ngIf"], [1, "modifier-name"], [1, "modifier-description"], [1, "modifier-box", 3, "ngClass"], [1, "modifier-children", 3, "ngClass"], ["imgPlaceholder", ""], [1, "dish-image"], [1, "dish-image-placeholder"], [1, "modifier-dish"], [1, "modifier-dish-image-box"], [1, "modifier-dish-description-box"], [1, "modifier-dish-name"], [1, "modifier-dish-weight"], [1, "modifier-dish-price-box"], [3, "ngClass"], [1, "modifier-dish-action-box"], ["counterTemplate", ""], [1, "modifier-counter", 3, "ngClass"], ["onselectstart", "return false;", 1, "minus", 3, "ngClass", "click"], ["readonly", "", 3, "value"], ["input", ""], ["onselectstart", "return false;", 1, "plus", 3, "ngClass", "click"], [1, "modifier-checkbox", 3, "ngClass", "click"]], template: function DishCalcComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, DishCalcComponent_div_0_Template, 21, 10, "div", 0);
        i0.ɵɵtemplate(1, DishCalcComponent_ng_template_1_Template, 3, 2, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(3, DishCalcComponent_ng_template_3_Template, 1, 1, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(5, DishCalcComponent_ng_template_5_Template, 8, 10, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
        i0.ɵɵtemplate(7, DishCalcComponent_ng_template_7_Template, 2, 3, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.dish);
    } }, directives: [i3.NgIf, i3.NgTemplateOutlet, i3.NgClass, i3.NgForOf], styles: [".dish[_ngcontent-%COMP%]{align-items:flex-start;border-bottom:2px solid #969696;display:flex;padding-bottom:34px}.dish[_ngcontent-%COMP%]   .dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:170px;position:relative;text-align:center;width:250px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]{align-items:stretch;box-sizing:border-box;display:flex;flex-direction:column;height:170px;margin-left:34px;padding:5px 0 0}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:28px;font-weight:700;letter-spacing:2.4px;line-height:32px}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-ingredients[_ngcontent-%COMP%]{color:#000;flex-grow:1;font-size:15px;line-height:17px;margin-top:15px;overflow:hidden}.dish[_ngcontent-%COMP%]   .dish-description-box[_ngcontent-%COMP%]   .dish-price-box[_ngcontent-%COMP%]{align-items:center;display:flex;font-size:20px;font-weight:700;height:45px;justify-content:space-between;line-height:23px;margin-right:49px}.dish-image[_ngcontent-%COMP%]{background-position:top;background-repeat:no-repeat;background-size:cover;border-radius:0;height:100%;width:250px}.result[_ngcontent-%COMP%]{color:#0a0909;font-size:24px;font-weight:700;line-height:28px;margin-top:49px;text-align:right}.result[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%]{margin-left:76px}.modifiers[_ngcontent-%COMP%]   .modifier-group[_ngcontent-%COMP%]{border-bottom:2px solid #969696;margin-top:25px;padding-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]{margin-bottom:25px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-header[_ngcontent-%COMP%]   .modifier-description[_ngcontent-%COMP%]{color:#0a0909;font-size:15px;line-height:17px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{align-items:center;box-sizing:border-box;display:flex;height:100px;justify-content:center;margin-bottom:2px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{background-color:#eee;background-size:50%;box-sizing:border-box;height:100px;margin-right:28px;position:relative;text-align:center;width:100px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex-grow:1;justify-content:center}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-name[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:500;line-height:23px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-description-box[_ngcontent-%COMP%]   .modifier-dish-weight[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;line-height:23px;margin-top:10px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]{color:#0a0909;font-size:20px;font-weight:700;line-height:23px;margin-right:105px}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-price-box[_ngcontent-%COMP%]   .zero-price[_ngcontent-%COMP%]{display:none}.modifiers[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]   .modifier-dish-action-box[_ngcontent-%COMP%]{display:flex;justify-content:center;width:151px}.modifier-fixed[_ngcontent-%COMP%]{align-items:stretch;border:2px solid #767676;border-radius:15px;box-sizing:border-box;display:flex;height:45px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{align-items:center;color:#767676;display:flex;font-size:20px;font-weight:500;height:45px;justify-content:center;line-height:23px;margin-top:-2px;width:142px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:first-child{margin-left:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:last-child{margin-right:-2px}.modifier-fixed[_ngcontent-%COMP%]   .item.selected[_ngcontent-%COMP%]{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]:not(.selected){cursor:pointer}.modifier-checkbox[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;height:50px;justify-content:center;width:50px}.modifier-checkbox.selected[_ngcontent-%COMP%]:after{content:url(\"data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==\")}.modifier-counter[_ngcontent-%COMP%]{align-items:center;background:#e0e0e0;border:none;border-radius:15px;display:flex;height:50px;position:relative;width:151px}.modifier-counter.disabled[_ngcontent-%COMP%]{opacity:.3}.modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .minus.disabled[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]:not(.disabled)   .plus.disabled[_ngcontent-%COMP%]{cursor:default;opacity:.15}.modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;border:none;font-weight:500;padding:0;width:100%}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{color:#0a0909;font-size:18px;height:50px;line-height:50px;text-align:center}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{cursor:pointer;display:block;font-style:normal;font-weight:700;padding:0 30px;position:absolute;top:0}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:hover, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:hover{color:#000}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]:active, .modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]:active{color:#cc0009}.modifier-counter[_ngcontent-%COMP%]   .minus.loading[_ngcontent-%COMP%], .modifier-counter[_ngcontent-%COMP%]   .plus.loading[_ngcontent-%COMP%]{opacity:.2}.modifier-counter[_ngcontent-%COMP%]   .minus[_ngcontent-%COMP%]{left:0}.modifier-counter[_ngcontent-%COMP%]   .plus[_ngcontent-%COMP%]{right:0}.without-images[_ngcontent-%COMP%]   .modifier-dish-image-box[_ngcontent-%COMP%]{height:70px!important}.without-images[_ngcontent-%COMP%]   .modifier-dish[_ngcontent-%COMP%]{height:70px}"] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(DishCalcComponent, [{
        type: Component,
        args: [{
                selector: 'dish-calc',
<<<<<<< HEAD
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
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi8uLi8uLi9zcmMvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9kaXNoLWNhbGMvZGlzaC1jYWxjLmNvbXBvbmVudC50cyIsImxpYi9jb21wb25lbnRzL2Rpc2gtY2FsYy9kaXNoLWNhbGMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdHLE9BQU8sRUFFTCxZQUFZLEVBQ2IsTUFBTSxtQkFBbUIsQ0FBQzs7Ozs7O0lDSGYsd0JBQTRGOzs7O0lBTXhGLDZCQUNJO0lBQUEsK0JBQ0k7SUFBQSw0QkFBTTtJQUFBLFlBQWdCO0lBQUEsaUJBQU87SUFBQyx3QkFDbEM7SUFBQSxpQkFBTTtJQUNWLDBCQUFlOzs7SUFIUSxlQUF1QztJQUF2Qyx5RUFBdUM7SUFDaEQsZUFBZ0I7SUFBaEIsd0NBQWdCOzs7OztJQU1sQiw2QkFDSTtJQUFBLCtCQUdJO0lBREMsb1NBQTZDLENBQUMsRUFBRSxVQUFVLEtBQUU7SUFDN0QsWUFDSjtJQUFBLGlCQUFNO0lBQ1YsMEJBQWU7Ozs7O0lBSk4sZUFBMkY7SUFBM0YseUlBQTJGO0lBRTVGLGVBQ0o7SUFESSxvR0FDSjs7O0lBSUosNkJBQ0k7SUFBQSwrQkFDSTtJQUFBLDRCQUFNO0lBQUEsWUFBK0I7SUFBQSxpQkFBTztJQUFDLHdCQUNqRDtJQUFBLGlCQUFNO0lBQ1YsMEJBQWU7OztJQUhRLGVBQXNEO0lBQXRELDZIQUFzRDtJQUMvRCxlQUErQjtJQUEvQiwwRkFBK0I7OztJQUhqRCw2QkFDSTtJQUFBLHdJQUllO0lBQ25CLDBCQUFlOzs7OztJQUxJLGVBQXlFO0lBQXpFLDBHQUF5RTs7O0lBWGhHLDZCQUNJO0lBQUEsK0JBQ0k7SUFBQSx5SEFNZTtJQUNuQixpQkFBTTtJQUNOLHlI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Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ1Jlc3RvQ2FydFNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvbmctcmVzdG9jYXJ0LnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgRXZlbnRlclNlcnZpY2UsXHJcbiAgRXZlbnRNZXNzYWdlXHJcbn0gZnJvbSAnQHdlYnJlc3RvL25nLWNvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdkaXNoLWNhbGMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9kaXNoLWNhbGMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Rpc2gtY2FsYy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaXNoQ2FsY0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xyXG5cclxuICBASW5wdXQoKSAgZGlzaDphbnk7XHJcbiAgQElucHV0KCkgIGFtb3VudDphbnk7XHJcbiAgQElucHV0KCkgIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcclxuICBAT3V0cHV0KCkgIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSAgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBtb2RpZmllcnMgPSB7XHJcbiAgICBpbmRleEJ5SWQ6IHt9LFxyXG4gICAgY3VzdG9tOiB7XHJcbiAgICAgIGZpeGVkOiBudWxsXHJcbiAgICB9LFxyXG4gICAgYmFzZUxpc3Q6IFtdLFxyXG4gIH07XHJcblxyXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcclxuICBtb2RpZmllcnNWYWx1ZVRyZWU6IGFueSA9IHt9O1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBjYXJ0U2VydmljZTogTmdSZXN0b0NhcnRTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBldmVudGVyOkV2ZW50ZXJTZXJ2aWNlLFxyXG4gICAgQEluamVjdCgnSW1hZ2VVcmwnKSBpbWFnZVVybDpzdHJpbmdcclxuICApIHtcclxuICAgIHRoaXMuaW1hZ2VVcmwgPSBpbWFnZVVybDtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIHRoaXMudmFsaWRhdGUuZW1pdCh0cnVlKTtcclxuICAgIHRoaXMuY2FydFNlcnZpY2Uuc2V0TW9kaWZpcmVzKFtdLCBbXSk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubW9kaWZpZXJzID0ge1xyXG4gICAgICBpbmRleEJ5SWQ6IHt9LFxyXG4gICAgICBjdXN0b206IHtcclxuICAgICAgICBmaXhlZDogbnVsbFxyXG4gICAgICB9LFxyXG4gICAgICBiYXNlTGlzdDogW10sXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlID0ge307XHJcbiAgICBpZih0aGlzLmRpc2ggJiYgdGhpcy5kaXNoLm1vZGlmaWVycykge1xyXG4gICAgICBmb3IobGV0IG1vZGlmaWVyIG9mIHRoaXMuZGlzaC5tb2RpZmllcnMpIHtcclxuICAgICAgICBsZXQgbW9kaWZpZXJUeXBlID0gbnVsbDtcclxuICAgICAgICAvLyBJbmRleGluZ1xyXG4gICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXSA9IG1vZGlmaWVyO1xyXG4gICAgICAgIC8vIENoZWNrIEN1c3RvbSBtb2RpZmllcnMgKGxpa2UgUGl6emEgU2l6ZSlcclxuICAgICAgICBpZighdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkXHJcbiAgICAgICAgICAmJiAhdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QubGVuZ3RoXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1xyXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoID09IDJcclxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSBtb2RpZmllci5tYXhBbW91bnRcclxuICAgICAgICAgICYmIG1vZGlmaWVyLm1heEFtb3VudCA9PSAxKSB7XHJcbiAgICAgICAgICAvLyBUaGlzIGlzIFBpenphIFNpemUgbW9kaWZpZXJcclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdjdXN0b20nO1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkID0gbW9kaWZpZXI7XHJcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0N1c3RvbSBGaXhlZCBtb2RpZmllcjonLCBtb2RpZmllcik7XHJcbiAgICAgICAgfSBlbHNlIGlmKG1vZGlmaWVyLmdyb3VwXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1xyXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoXHJcbiAgICAgICAgICAmJiBtb2RpZmllci5jaGlsZE1vZGlmaWVycy5maW5kKG0gPT4gbS5kaXNoKSkge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyBCYXNlIG1vZGlmaWVyXHJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnZ3JvdXAnO1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XHJcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0dyb3VwIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcclxuICAgICAgICB9IGVsc2UgaWYobW9kaWZpZXIuZGlzaCkge1xyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XHJcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5iYXNlTGlzdC5wdXNoKG1vZGlmaWVyKTtcclxuICAgICAgICAgIGNvbnNvbGUuaW5mbygnU2luZ2xlIG1vZGlmaWVyOicsIG1vZGlmaWVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gVGhpcyBpcyBicm9rZW4gbW9kaWZpZXJcclxuICAgICAgICAgIG1vZGlmaWVyVHlwZSA9ICdicm9rZW4nO1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICBzd2l0Y2ggKG1vZGlmaWVyVHlwZSkge1xyXG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxyXG4gICAgICAgICAgY2FzZSAnY3VzdG9tJzpcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSB7fTtcclxuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XHJcbiAgICAgICAgICAgICAgLy8gSW5kZXhpbmdcclxuICAgICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXI7XHJcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXHJcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSA9IGNoaWxkTW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXHJcbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKG1vZGlmaWVyLm1vZGlmaWVySWQpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ10pe1xyXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXSA9IHt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gSW5kZXhpbmdcclxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXI7XHJcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxyXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVsnc2luZ2xlJ11bbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllci5kZWZhdWx0QW1vdW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluZCBpbWFnZXMgYW5kIHNldCBmbGFncyAoaW1hZ2VzSXNzZXQsIGNoaWxkSW1hZ2VzSXNzZXQpXHJcbiAgICAgICAgdGhpcy5jaGVja0ltYWdlc0luTW9kaWZpZXIobW9kaWZpZXIubW9kaWZpZXJJZCk7XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcclxuICAgIGlmKGdyb3VwSWQgPT0gJ3NpbmdsZScpIHJldHVybjtcclxuICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCA9IE9iamVjdFxyXG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxyXG4gICAgICAucmVkdWNlKChhOiBhbnksIGI6IGFueSkgPT4gYSArIGIpO1xyXG4gICAgcmV0dXJuIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudDtcclxuICB9XHJcblxyXG4gIGNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllcklkKSB7XHJcbiAgICBjb25zdCBtOiBhbnkgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XHJcbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF0uaW1hZ2VzSXNzZXQgPSBtLmRpc2ggJiYgbS5kaXNoLmltYWdlcyAmJiBtLmRpc2guaW1hZ2VzLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF0uY2hpbGRJbWFnZXNJc3NldCA9ICEhT2JqZWN0XHJcbiAgICAgIC52YWx1ZXModGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXJJZF0pXHJcbiAgICAgIC5maW5kKChtOiBhbnkpID0+IG0gJiYgbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgY2FsY3VsYXRlVG90YWxQcmljZSgpIHtcclxuICAgIGxldCB0b3RhbFByaWNlID0gdGhpcy5kaXNoLnByaWNlIHx8IDA7XHJcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcclxuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XHJcbiAgICAgICAgY29uc3QgYW1vdW50ID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XHJcbiAgICAgICAgaWYoYW1vdW50KSB7XHJcbiAgICAgICAgICBjb25zdCBtb2RpZmllciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXTtcclxuICAgICAgICAgIGlmKG1vZGlmaWVyICYmIG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5wcmljZSkge1xyXG4gICAgICAgICAgICB0b3RhbFByaWNlICs9IG1vZGlmaWVyLmRpc2gucHJpY2UgKiBhbW91bnQ7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnRvdGFsUHJpY2UgPSB0b3RhbFByaWNlO1xyXG4gICAgdGhpcy5zZXRNb2RpZmllcnMoKTtcclxuICB9XHJcblxyXG4gIGdldE1vZGlmaWVyc0lkcyhtb2RpZmllcikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZ3JvdXBJZDogKG1vZGlmaWVyLmRpc2ggJiYgbW9kaWZpZXIuZGlzaC5ncm91cElkKSA/IG1vZGlmaWVyLmRpc2guZ3JvdXBJZCA6IHVuZGVmaW5lZCxcclxuICAgICAgbW9kaWZpZXJJZDogbW9kaWZpZXIubW9kaWZpZXJJZFxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXI6IGFueSwgYW1vdW50OiBudW1iZXIsIG9wZXJhdGlvbjogc3RyaW5nKSB7XHJcbiAgICBpZihhbW91bnQgPCAwKSByZXR1cm47XHJcbiAgICBjb25zdCB7IGdyb3VwSWQgPSAnc2luZ2xlJywgbW9kaWZpZXJJZCB9ID0gdGhpcy5nZXRNb2RpZmllcnNJZHMobW9kaWZpZXIpO1xyXG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XHJcbiAgICBjb25zdCB7IG1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQgPSAwLFxyXG4gICAgICAgICAgICBtYXhBbW91bnQ6IGdyb3VwTWF4QW1vdW50ID0gMCB9ID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdIHx8IHt9O1xyXG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xyXG5cclxuICAgIC8vIEZvciBjaGVja2JveFxyXG4gICAgaWYob3BlcmF0aW9uID09ICdjaGVja2JveCcgJiYgZ3JvdXBJZCAhPT0gJ3NpbmdsZScpIHtcclxuICAgICAgLy8gSWYgaXQgd29yayBsaWtlIHJhZGlvIGJ1dHRvblxyXG4gICAgICBpZihncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDEpIHtcclxuICAgICAgICBpZihhbW91bnQgPCBncm91cE1pbkFtb3VudCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBTZXQgemVybyBhbW91bnQgZm9yIGFsbCBvcHRpb25zXHJcbiAgICAgICAgZm9yKGxldCBpdGVtTW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xyXG4gICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1baXRlbU1vZGlmaWVySWRdID0gMFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBOb3QgYWN0aW9uIG5lZWRlZCBhZnRlclxyXG4gICAgICBpZihhbW91bnQgPT0gMCkge1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlVG90YWxQcmljZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIEdyb3VwIGFtb3VudCBsaW1pdHNcclxuICAgIGlmKGdyb3VwTWluQW1vdW50IHx8IGdyb3VwTWF4QW1vdW50KSB7XHJcbiAgICAgIC8vIFRvdGFsIGFtb3VudCBpbiBncm91cFxyXG4gICAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XHJcblxyXG4gICAgICBpZihncm91cEFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWluICR7Z3JvdXBNaW5BbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XHJcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXHJcbiAgICAgICAgICBuZXcgRXZlbnRNZXNzYWdlKFxyXG4gICAgICAgICAgICAnd2FybmluZycsXHJcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcclxuICAgICAgICAgICAgYNCc0LDQutGB0LjQvNCw0LvRjNC90L7QtSDQutC+0LvQuNGH0LXRgdGC0LLQviDQvtC/0YbQuNC5INC00LvRjyDQs9GA0YPQv9C/0YtcclxuICAgICAgICAgICAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0g0L3QtSDQvNC10L3QtdC1ICR7Z3JvdXBNaW5BbW91bnR9YFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmKGdyb3VwQW1vdW50ID4gZ3JvdXBNYXhBbW91bnQpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcclxuICAgICAgICB0aGlzLmV2ZW50ZXIuZW1pdE1lc3NhZ2VFdmVudChcclxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXHJcbiAgICAgICAgICAgICd3YXJuaW5nJyxcclxuICAgICAgICAgICAgJ9Ce0LPRgNCw0L3QuNGH0LXQvdC40LUnLFxyXG4gICAgICAgICAgICBg0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC+0L/RhtC40Lkg0LTQu9GPINCz0YDRg9C/0L/Ri1xyXG4gICAgICAgICAgICDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDQvdC1INCx0L7Qu9C10LUgJHtncm91cE1heEFtb3VudH1gXHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDSGVjayBNb2RpZmllciBhbW91bnQgbGltaXRzXHJcbiAgICBpZihtaW5BbW91bnQgfHwgbWF4QW1vdW50KSB7XHJcbiAgICAgIGlmKGFtb3VudCA8IG1pbkFtb3VudCkge1xyXG4gICAgICAgIHN3aXRjaCAob3BlcmF0aW9uKSB7XHJcbiAgICAgICAgICBjYXNlICdwbHVzJzogYW1vdW50ID0gbWluQW1vdW50OyBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ21pbnVzJzogYW1vdW50ID0gMDsgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGlmKGFtb3VudCA+IG1heEFtb3VudCkge1xyXG4gICAgICAgIGFtb3VudCA9IG1heEFtb3VudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdID0gYW1vdW50O1xyXG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcclxuICB9XHJcblxyXG4gIHNldE1vZGlmaWVycygpIHtcclxuICAgIGNvbnN0IG1vZGlmaWVyc1RvU2V0ID0gW107XHJcblxyXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XHJcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xyXG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xyXG4gICAgICAgIGlmKGFtb3VudCkge1xyXG5cclxuICAgICAgICAgIG1vZGlmaWVyc1RvU2V0LnB1c2goe1xyXG4gICAgICAgICAgICBpZDogbW9kaWZpZXJJZCxcclxuICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXHJcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQgIT09ICdzaW5nbGUnID8gZ3JvdXBJZCA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmKG1vZGlmaWVyc1RvU2V0Lmxlbmd0aCkge1xyXG4gICAgICB0aGlzLmNoZWNrVmFsaWQoKTtcclxuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpZXJzVG9TZXQsIFtdKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrVmFsaWQoKSB7XHJcblxyXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xyXG5cclxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xyXG5cclxuICAgICAgY29uc3QgZ3JvdXBNb2RpZmllciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXTtcclxuICAgICAgaWYoZ3JvdXBNb2RpZmllci5yZXF1aXJlZCkge1xyXG4gICAgICAgIGNvbnN0IHRvdGFsQW1vdW50SW5Hcm91cCA9IHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xyXG4gICAgICAgIGlmKHRvdGFsQW1vdW50SW5Hcm91cCA8IGdyb3VwTW9kaWZpZXIubWluQW1vdW50KSB7XHJcbiAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWluIGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1pbkFtb3VudH1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYodG90YWxBbW91bnRJbkdyb3VwID4gZ3JvdXBNb2RpZmllci5tYXhBbW91bnQpIHtcclxuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgIGNvbnNvbGUud2FybihgTW9kaWZpZXIgJHtncm91cElkfSBtYXggYW1vdW50OiAke2dyb3VwTW9kaWZpZXIubWF4QW1vdW50fWApO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy9mb3IobGV0IG1vZGlmaWVySWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF0pIHtcclxuICAgICAgLy9cclxuICAgICAgLy99XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52YWxpZGF0ZS5lbWl0KGlzVmFsaWQpO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibmctY2FydC1kaXNoLWNhbGNcIiAqbmdJZj1cImRpc2hcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJkaXNoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbmdyZWRpZW50c1wiPnt7IGRpc2guZGVzY3JpcHRpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIW1vZGlmaWVycy5jdXN0b20uZml4ZWQ7IGVsc2UgbW9kaWZpZXJGaXhlZFRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21vZGlmaWVyRml4ZWRUZW1wbGF0ZT5cclxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmN1c3RvbS5maXhlZCBhcyBtb2RpZmllclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZml4ZWRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6ICEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF19XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChjaGlsZE1vZGlmaWVyLCAxLCAnY2hlY2tib3gnKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7eyBjaGlsZE1vZGlmaWVyLmRpc2g/Lm5hbWUgfX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgY2hpbGRNb2RpZmllci5kaXNoPy5wcmljZSB9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllcnNcIiAqbmdJZj1cIm1vZGlmaWVycy5iYXNlTGlzdD8ubGVuZ3RoXCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgbW9kaWZpZXIgb2YgbW9kaWZpZXJzLmJhc2VMaXN0XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItbmFtZVwiICpuZ0lmPVwiZ3JvdXAubmFtZVwiPnt7IGdyb3VwLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGVzY3JpcHRpb25cIiAqbmdJZj1cImdyb3VwLmRlc2NyaXB0aW9uXCI+e3sgZ3JvdXAuZGVzY3JpcHRpb24gfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWJveFwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuY2hpbGRJbWFnZXNJc3NldH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBTaW5nbGUgbW9kaWZpZXIgLS0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiAnc2luZ2xlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IG1vZGlmaWVyLm1pbkFtb3VudCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzPy5sZW5ndGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItY2hpbGRyZW5cIiBbbmdDbGFzc109XCJ7J3dpdGhvdXQtaW1hZ2VzJzogIW1vZGlmaWVyLmltYWdlc0lzc2V0fVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEdyb3VwIG1vZGlmaWVyIC0tPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyVGVtcGxhdGU7IGNvbnRleHQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogbW9kaWZpZXIubW9kaWZpZXJJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWluQW1vdW50OiBtb2RpZmllci5taW5BbW91bnQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwTWF4QW1vdW50OiBtb2RpZmllci5tYXhBbW91bnQgfHwgMTAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cInJlc3VsdFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPtCY0KLQntCT0J46PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJpY2VcIj5cclxuICAgICAgICAgICAgPHNwYW4+e3sgdG90YWxQcmljZX19PC9zcGFuPiDigr1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxyXG5cclxuPG5nLXRlbXBsYXRlICNkaXNoSW1hZ2VUZW1wbGF0ZSBsZXQtZGlzaD1cImRpc2hcIj5cclxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZVwiIFtzdHlsZS5iYWNrZ3JvdW5kSW1hZ2VdPVwiJ3VybCgnICsgaW1hZ2VVcmwgKyBkaXNoLmltYWdlc1swXS5pbWFnZXMuc21hbGwgKyAnKSdcIj48L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1pbWFnZS1wbGFjZWhvbGRlclwiPjwvZGl2PlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyVGVtcGxhdGUgLS0+XHJcblxyXG48bmctdGVtcGxhdGUgI21vZGlmaWVyVGVtcGxhdGVcclxuICAgICAgICAgICAgIGxldC1tb2RpZmllcj1cIm1vZGlmaWVyXCJcclxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXHJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cEFtb3VudD1cImdyb3VwQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcclxuICAgICAgICAgICAgIGxldC1ncm91cE1heEFtb3VudD1cImdyb3VwTWF4QW1vdW50XCI+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiPnt7IGRpc2gud2VpZ2h0ICogMTAwMCB9fSDQs9GAPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1wcmljZS1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4g4oK9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWFjdGlvbi1ib3hcIj5cclxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDE7IGVsc2UgY291bnRlclRlbXBsYXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZTsgY29udGV4dDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogYW1vdW50XHJcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcblxyXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICNjb3VudGVyVGVtcGxhdGU+XHJcbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ291bnRlclRlbXBsYXRlOyBjb250ZXh0OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBJZDogZ3JvdXBJZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQW1vdW50OiBncm91cEFtb3VudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogZ3JvdXBNYXhBbW91bnRcclxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxyXG5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlIC0tPlxyXG5cclxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNvdW50ZXJUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxyXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcclxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIlxyXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxyXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWluQW1vdW50PVwiZ3JvdXBNaW5BbW91bnRcIlxyXG4gICAgICAgICAgICAgbGV0LWdyb3VwTWF4QW1vdW50PVwiZ3JvdXBNYXhBbW91bnRcIj5cclxuICAgIDxuZy1jb250YWluZXI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWNvdW50ZXJcIiBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6ICFhbW91bnQgJiYgZ3JvdXBBbW91bnQgPj0gZ3JvdXBNYXhBbW91bnR9XCI+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6ICFhbW91bnQgfHwgZ3JvdXBBbW91bnQgPD0gZ3JvdXBNaW5BbW91bnR9XCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCAtIDEsICdtaW51cycpXCJcclxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPi08L2Rpdj5cclxuICAgICAgICAgICAgPGlucHV0IFt2YWx1ZV09XCJhbW91bnRcIiByZWFkb25seSAjaW5wdXQ+XHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBsdXNcIlxyXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntkaXNhYmxlZDogZ3JvdXBBbW91bnQgPj0gZ3JvdXBNYXhBbW91bnR9XCJcclxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlTW9kaWZpZXJBbW91bnQobW9kaWZpZXIsIGFtb3VudCArIDEsICdwbHVzJylcIlxyXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+KzwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9uZy1jb250YWluZXI+XHJcbjwvbmctdGVtcGxhdGU+XHJcblxyXG48IS0tIFRlbXBsYXRlIGJsb2NrICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGUgLS0+XHJcblxyXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZVxyXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxyXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcclxuICAgICAgICAgICAgIGxldC1hbW91bnQ9XCJhbW91bnRcIj5cclxuICAgIDxuZy1jb250YWluZXI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJtb2RpZmllci1jaGVja2JveFwiXHJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IGFtb3VudH1cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgPyAwIDogMSwgJ2NoZWNrYm94JylcIj48L2Rpdj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=
=======
                template: `<div *ngIf="dish" class="ng-cart-dish-calc" [ngClass]="{'ng-cart-dish-calc-two-parts-assembled': isTwoPartsAssembledTemplate}">
    <div class="dish">
        <div class="dish-image-box">
            <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
        </div>
        <div class="dish-description-box">
            <div class="dish-name">{{ dish.name }}</div>
            <div class="dish-ingredients">{{ dish.description }}</div>
            <div class="dish-price-box">
                <ng-container *ngIf="!modifiers.custom.fixed; else modifierFixedTemplate">
                    <div class="price" [ngClass]="{'zero-price': !dish.price}">
                        <span>{{ dish.price }}</span> ₽
                    </div>
                </ng-container>
                <ng-template #modifierFixedTemplate>
                    <ng-container *ngIf="modifiers.custom.fixed as modifier">
                        <div class="modifier-fixed">
                            <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                <div class="item"
                                     [ngClass]="{selected: !!modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                     (click)="changeModifierAmount(childModifier, 1, 'checkbox')">
                                    {{ childModifier.dish?.name }}
                                </div>
                            </ng-container>
                        </div>
                        <ng-container *ngFor="let childModifier of modifier.childModifiers">
                            <ng-container *ngIf="!!modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                <div class="price" [ngClass]="{'zero-price': !childModifier.dish?.price}">
                                    <span>{{ childModifier.dish?.price }}</span> ₽
                                </div>
                            </ng-container>
                        </ng-container>
                    </ng-container>
                </ng-template>

            </div>
        </div>
    </div>
    <div class="modifiers" *ngIf="modifiers.baseList?.length">
        <ng-container *ngFor="let modifier of modifiers.baseList">
            <div class="modifier-group">
                <ng-container *ngIf="modifier.dish">
                    <div class="modifier-header" *ngIf="modifier.group as group">
                        <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                        <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                    </div>

                    <div class="modifier-box" [ngClass]="{'without-images': !modifier.childImagesIsset}">
                        <!-- Single modifier -->
                        <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: modifier,
                            groupId: 'single',
                            amount: modifiersValueTree['single'][modifier.modifierId],
                            groupAmount: modifiersValueTree['single'][modifier.modifierId],
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>
                    </div>
                </ng-container>

                <ng-container *ngIf="modifier.childModifiers?.length">
                    <ng-container *ngIf="modifier.minAmount == 2 && modifier.maxAmount == 2; then twoPartsAssembledTemplate else groupTemplate">
                    </ng-container>

                    <!-- Base group modifier view -->
                    <ng-template #groupTemplate>
                        <div class="modifier-header" *ngIf="modifier.group as group">
                            <div class="modifier-name" *ngIf="group.name">{{ group.name }}</div>
                            <div class="modifier-description" *ngIf="group.description">{{ group.description }}</div>
                        </div>
                        <div class="modifier-children" [ngClass]="{'without-images': !modifier.imagesIsset}">
                            <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                <!-- Group modifier -->
                                <ng-container *ngTemplateOutlet="modifierTemplate; context: {
                            modifier: childModifier,
                            groupId: modifier.modifierId,
                            amount: modifiersValueTree[modifier.modifierId][childModifier.modifierId],
                            groupAmount: modifiers.indexById[modifier.modifierId].totalAmount,
                            groupMinAmount: modifier.minAmount || 0,
                            groupMaxAmount: modifier.maxAmount || 100
                        }"></ng-container>

                            </ng-container>
                        </div>
                    </ng-template>

                    <!-- Two parts assembled group modifier view (like pizza from two halves) -->
                    <ng-template #twoPartsAssembledTemplate>
                        <div class="two-parts-assembled">
                            <div class="two-parts-assembled-header" [ngClass]="{empty: !twoPartsAssembledModifiersIdsByGroupId[modifier.modifierId]?.length}">
                                <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                    <ng-container *ngIf="modifiersValueTree[modifier.modifierId][childModifier.modifierId]">
                                        <ng-container *ngIf="childModifier.dish as dish">
                                            <div class="selected-dish">
                                                <div class="title">{{ dish.name }}</div>
                                                <div class="image-box">
                                                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                                </div>
                                            </div>
                                        </ng-container>
                                        <ng-container *ngIf="modifiers.indexById[modifier.modifierId].totalAmount == 1">
                                            <div class="selected-dish">
                                                <div class="title">Выберите половину</div>
                                                <div class="image-box">
                                                    <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: {} }"></ng-container>
                                                </div>
                                            </div>
                                        </ng-container>
                                    </ng-container>
                                </ng-container>
                            </div>

                            <div class="two-parts-assembled-body">
                                <div class="two-parts-assembled-body-name">Выберите любые две половинки</div>
                                <div class="two-parts-assembled-body-list">
                                    <ng-container *ngFor="let childModifier of modifier.childModifiers">
                                        <div class="two-parts-assembled-body-list-dish"
                                             (click)="selectTwoPartsAssembledModifier(childModifier)"
                                             [ngClass]="{selected: modifiersValueTree[modifier.modifierId][childModifier.modifierId]}"
                                             *ngIf="childModifier.dish as dish">
                                            <div class="image-box">
                                                <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
                                            </div>
                                            <div class="dish-name">
                                                {{ dish.name }}
                                            </div>
                                            <div class="dish-price">
                                                <div [ngClass]="{'zero-price': !dish.price}">
                                                    <span>{{ dish.price }}</span> ₽
                                                </div>
                                            </div>
                                        </div>
                                    </ng-container>
                                </div>
                            </div>
                        </div>
                    </ng-template>


                </ng-container>

            </div>
        </ng-container>
    </div>
    <div class="result">
        <span class="text">ИТОГО:</span>
        <span class="price">
            <span>{{ totalPrice}}</span> ₽
        </span>
    </div>
    <div class="comment" *ngIf="isTwoPartsAssembledTemplate">
        <div class="title">Комментарий</div>
        <div class="input-box">
            <input #commentInput type="text" placeholder="" (keyup)="comment.emit(commentInput.value)">
        </div>
    </div>
</div>



<!-- Template block #dishImageTemplate -->

<ng-template #dishImageTemplate let-dish="dish">
    <ng-container *ngIf="dish?.images && dish.images[0]?.images?.small; else imgPlaceholder">
        <div class="dish-image" [style.backgroundImage]="'url(' + imageUrl + dish.images[0].images.small + ')'"></div>
    </ng-container>
    <ng-template #imgPlaceholder>
        <div class="dish-image-placeholder"></div>
    </ng-template>
</ng-template>

<!-- Template block #modifierTemplate -->

<ng-template #modifierTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container *ngIf="modifier.dish as dish">
        <div class="modifier-dish">
            <div class="modifier-dish-image-box">
                <ng-container *ngTemplateOutlet="dishImageTemplate; context: { dish: dish }"></ng-container>
            </div>
            <div class="modifier-dish-description-box">
                <div class="modifier-dish-name">{{ dish.name }}</div>
                <div class="modifier-dish-weight" *ngIf="dish.weight">{{ dish.weight * 1000 }} гр</div>
            </div>
            <div class="modifier-dish-price-box">
                <div [ngClass]="{'zero-price': !dish.price}">
                    <span>{{ dish.price }}</span> ₽
                </div>
            </div>
            <div class="modifier-dish-action-box">
                <ng-container *ngIf="groupMinAmount <= 1 && groupMaxAmount == 1; else counterTemplate">
                    <ng-container *ngTemplateOutlet="modifierCheckboxTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount
                    }"></ng-container>
                </ng-container>

                <ng-template #counterTemplate>
                    <ng-container *ngTemplateOutlet="modifierCounterTemplate; context: {
                        modifier: modifier,
                        groupId: groupId,
                        amount: amount,
                        groupAmount: groupAmount,
                        groupMinAmount: groupMinAmount,
                        groupMaxAmount: groupMaxAmount
                    }"></ng-container>
                </ng-template>

            </div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCounterTemplate -->

<ng-template #modifierCounterTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount"
             let-groupAmount="groupAmount"
             let-groupMinAmount="groupMinAmount"
             let-groupMaxAmount="groupMaxAmount">
    <ng-container>
        <div class="modifier-counter" [ngClass]="{disabled: !amount && groupAmount >= groupMaxAmount}">
            <div
                    class="minus"
                    [ngClass]="{disabled: !amount || groupAmount <= groupMinAmount}"
                    (click)="changeModifierAmount(modifier, amount - 1, 'minus')"
                    onselectstart="return false;">-</div>
            <input [value]="amount" readonly #input>
            <div
                    class="plus"
                    [ngClass]="{disabled: groupAmount >= groupMaxAmount}"
                    (click)="changeModifierAmount(modifier, amount + 1, 'plus')"
                    onselectstart="return false;">+</div>
        </div>
    </ng-container>
</ng-template>

<!-- Template block #modifierCheckboxTemplate -->

<ng-template #modifierCheckboxTemplate
             let-modifier="modifier"
             let-groupId="groupId"
             let-amount="amount">
    <ng-container>
        <div
                class="modifier-checkbox"
                [ngClass]="{selected: amount}"
                (click)="changeModifierAmount(modifier, amount ? 0 : 1, 'checkbox')"></div>
    </ng-container>
</ng-template>
`,
                styles: [`.dish{display:flex;align-items:flex-start;padding-bottom:34px;border-bottom:2px solid #969696}.dish .dish-image-box{position:relative;width:250px;height:170px;box-sizing:border-box;text-align:center;background-color:#eee;background-size:50%}.dish .dish-description-box{margin-left:34px;height:170px;display:flex;flex-direction:column;align-items:stretch;padding:5px 0 0;box-sizing:border-box}.dish .dish-description-box .dish-name{font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909}.dish .dish-description-box .dish-ingredients{font-size:15px;line-height:17px;color:#000;margin-top:15px;overflow:hidden;flex-grow:1}.dish .dish-description-box .dish-price-box{font-weight:700;font-size:20px;line-height:23px;display:flex;align-items:center;justify-content:space-between;height:45px;margin-right:49px}.ng-cart-dish-calc-two-parts-assembled .dish{border:none;margin-left:0;padding-bottom:0}.ng-cart-dish-calc-two-parts-assembled .dish .dish-image-box{display:none}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box{width:100%;height:auto}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-name{text-align:center;font-weight:700;font-size:28px;line-height:32px;letter-spacing:2.4px;color:#0a0909;text-transform:uppercase}.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-ingredients,.ng-cart-dish-calc-two-parts-assembled .dish .dish-description-box .dish-price-box{display:none}.dish-image{width:250px;height:100%;border-radius:0;background-size:cover;background-position:top;background-repeat:no-repeat}.result{margin-top:49px;font-weight:700;font-size:24px;line-height:28px;color:#0a0909;text-align:right}.result .price{margin-left:76px}.comment{padding-bottom:15px}.comment .title{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;margin:30px 0 20px}.comment .input-box{margin-top:10px}.comment .input-box input{border:2px solid #969696;box-sizing:border-box;border-radius:15px;height:45px;line-height:45px;font-style:italic;font-weight:400;font-size:20px;color:#969696;padding:0 20px}.modifiers .modifier-group{margin-top:25px;padding-bottom:25px;border-bottom:2px solid #969696}.modifiers .modifier-header{margin-bottom:25px}.modifiers .modifier-header .modifier-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-header .modifier-description{font-size:15px;line-height:17px;color:#0a0909}.modifiers .modifier-dish{display:flex;justify-content:center;align-items:center;margin-bottom:2px;height:100px;box-sizing:border-box}.modifiers .modifier-dish .modifier-dish-image-box{position:relative;width:100px;height:100px;box-sizing:border-box;text-align:center;background-color:#fff;background-size:50%;margin-right:28px}.modifiers .modifier-dish .modifier-dish-image-box .dish-image{width:100%;height:100%;background-size:contain;background-position:center}.modifiers .modifier-dish .modifier-dish-description-box{flex-grow:1;display:flex;flex-direction:column;justify-content:center}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909}.modifiers .modifier-dish .modifier-dish-description-box .modifier-dish-weight{font-size:20px;line-height:23px;color:#0a0909;margin-top:10px}.modifiers .modifier-dish .modifier-dish-price-box{font-weight:700;font-size:20px;line-height:23px;color:#0a0909;margin-right:105px}.modifiers .modifier-dish .modifier-dish-price-box .zero-price{display:none}.modifiers .modifier-dish .modifier-dish-action-box{width:151px;display:flex;justify-content:center}.two-parts-assembled .two-parts-assembled-header{display:flex;align-items:center;justify-content:center;padding-bottom:28px;opacity:1;border-bottom:2px solid #969696;height:230px;overflow:hidden;transition:.5s}.two-parts-assembled .two-parts-assembled-header.empty{border-bottom:none;height:0;opacity:0}.two-parts-assembled .two-parts-assembled-header .selected-dish{display:flex;align-items:center;justify-content:flex-end;width:50%}.two-parts-assembled .two-parts-assembled-header .selected-dish .title{font-size:21px;line-height:25px;color:#0a0909;margin-right:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box{width:100px;height:200px;overflow:hidden}.two-parts-assembled .two-parts-assembled-header .selected-dish .image-box .dish-image{width:200%;height:100%}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2){flex-direction:row-reverse}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .title{margin-left:24px}.two-parts-assembled .two-parts-assembled-header .selected-dish:nth-child(2) .image-box{direction:rtl}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-name{font-weight:500;font-size:20px;line-height:23px;color:#0a0909;padding:20px 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list{display:grid;grid-template-columns:1fr 1fr 1fr;margin-top:30px;grid-column-gap:30px;grid-row-gap:24px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish{display:flex;flex-direction:column;align-items:center;box-sizing:border-box;cursor:pointer;color:#0a0909;border:1.5px solid rgba(255,255,255,0)}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish.selected{border:1.5px solid #0a0909;border-radius:15px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-name{font-weight:500;font-size:17px;line-height:20px;letter-spacing:2.4px;text-transform:uppercase;text-align:center;padding:0 5px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .dish-price{font-weight:700;font-size:20px;line-height:23px;padding:5px 0 10px}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box{width:228px;height:228px;border-radius:15px 15px 0 0}.two-parts-assembled .two-parts-assembled-body .two-parts-assembled-body-list .two-parts-assembled-body-list-dish .image-box .dish-image{width:100%;height:100%;border-radius:15px 15px 0 0}.modifier-fixed{border:2px solid #767676;box-sizing:border-box;border-radius:15px;display:flex;align-items:stretch;height:45px}.modifier-fixed .item{font-weight:500;font-size:20px;line-height:23px;width:142px;height:45px;color:#767676;display:flex;align-items:center;justify-content:center;margin-top:-2px}.modifier-fixed .item:first-child{margin-left:-2px}.modifier-fixed .item:last-child{margin-right:-2px}.modifier-fixed .item.selected{background:#0a0909;border-radius:15px;color:#fff}.modifier-fixed .item:not(.selected){cursor:pointer}.modifier-checkbox{width:50px;height:50px;background:#e0e0e0;border-radius:15px;cursor:pointer;display:flex;justify-content:center;align-items:center}.modifier-checkbox.selected:after{content:url("data:image/svg+xml; base64, PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgMTMuNUwxMS4zMjMxIDI2TDI2IDIiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==")}.modifier-counter{display:flex;align-items:center;position:relative;border:none;width:151px;height:50px;border-radius:15px;background:#e0e0e0}.modifier-counter.disabled{opacity:.3}.modifier-counter:not(.disabled) .minus.disabled,.modifier-counter:not(.disabled) .plus.disabled{opacity:.15;cursor:default}.modifier-counter input{border:none;background:0 0;width:100%;padding:0;height:50px;line-height:50px;text-align:center;font-weight:500;font-size:18px;color:#0a0909}.modifier-counter .minus,.modifier-counter .plus{display:block;position:absolute;top:0;height:50px;line-height:50px;text-align:center;font-style:normal;font-weight:700;font-size:18px;color:#0a0909;padding:0 30px;cursor:pointer}.modifier-counter .minus:hover,.modifier-counter .plus:hover{color:#000}.modifier-counter .minus:active,.modifier-counter .plus:active{color:#cc0009}.modifier-counter .minus.loading,.modifier-counter .plus.loading{opacity:.2}.modifier-counter .minus{left:0}.modifier-counter .plus{right:0}.without-images .modifier-dish-image-box{height:70px!important}.without-images .modifier-dish{height:70px}`]
            },] },
];
/** @nocollapse */
DishCalcComponent.ctorParameters = () => [
    { type: NgRestoCartService },
    { type: EventerService },
    { type: String, decorators: [{ type: Inject, args: ['ImageUrl',] }] }
];
DishCalcComponent.propDecorators = {
    dish: [{ type: Input }],
    amount: [{ type: Input }],
    selectedModifiers: [{ type: Input }],
    validate: [{ type: Output }],
    amountDishToAdd: [{ type: Output }],
    comment: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzaC1jYWxjLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B3ZWJyZXN0by9uZy1jYXJ0LyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvZGlzaC1jYWxjL2Rpc2gtY2FsYy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBZ0MsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBRXpFLE9BQU8sRUFDTCxjQUFjLEVBQ2QsWUFBWSxFQUNiLE1BQU0sbUJBQW1CLENBQUM7QUF5UTNCLE1BQU0sT0FBTyxpQkFBaUI7SUF3QjVCLFlBQ1UsV0FBK0IsRUFDL0IsT0FBc0IsRUFDVixRQUFlO1FBRjNCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBckJ0QixhQUFRLEdBQXFCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEQsb0JBQWUsR0FBcUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RCxZQUFPLEdBQXdCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUQsY0FBUyxHQUFHO1lBQ1YsU0FBUyxFQUFFLEVBQUU7WUFDYixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUtGLHVCQUFrQixHQUFRLEVBQUUsQ0FBQztRQUM3QiwyQ0FBc0MsR0FBUSxFQUFFLENBQUM7UUFRL0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztR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dXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nUmVzdG9DYXJ0U2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9uZy1yZXN0b2NhcnQuc2VydmljZVwiO1xuXG5pbXBvcnQge1xuICBFdmVudGVyU2VydmljZSxcbiAgRXZlbnRNZXNzYWdlXG59IGZyb20gJ0B3ZWJyZXN0by9uZy1jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZGlzaC1jYWxjJyxcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwiZGlzaFwiIGNsYXNzPVwibmctY2FydC1kaXNoLWNhbGNcIiBbbmdDbGFzc109XCJ7J25nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQnOiBpc1R3b1BhcnRzQXNzZW1ibGVkVGVtcGxhdGV9XCI+XG4gICAgPGRpdiBjbGFzcz1cImRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtYm94XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDogZGlzaCB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGlzaC1kZXNjcmlwdGlvbi1ib3hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIj57eyBkaXNoLm5hbWUgfX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLWluZ3JlZGllbnRzXCI+e3sgZGlzaC5kZXNjcmlwdGlvbiB9fTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2UtYm94XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFtb2RpZmllcnMuY3VzdG9tLmZpeGVkOyBlbHNlIG1vZGlmaWVyRml4ZWRUZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJpY2VcIiBbbmdDbGFzc109XCJ7J3plcm8tcHJpY2UnOiAhZGlzaC5wcmljZX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt7IGRpc2gucHJpY2UgfX08L3NwYW4+IOKCvVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI21vZGlmaWVyRml4ZWRUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVycy5jdXN0b20uZml4ZWQgYXMgbW9kaWZpZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1maXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIml0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogISFtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXX1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChjaGlsZE1vZGlmaWVyLCAxLCAnY2hlY2tib3gnKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3sgY2hpbGRNb2RpZmllci5kaXNoPy5uYW1lIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiEhbW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByaWNlXCIgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWNoaWxkTW9kaWZpZXIuZGlzaD8ucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBjaGlsZE1vZGlmaWVyLmRpc2g/LnByaWNlIH19PC9zcGFuPiDigr1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllcnNcIiAqbmdJZj1cIm1vZGlmaWVycy5iYXNlTGlzdD8ubGVuZ3RoXCI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IG1vZGlmaWVyIG9mIG1vZGlmaWVycy5iYXNlTGlzdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWdyb3VwXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIm1vZGlmaWVyLmRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWhlYWRlclwiICpuZ0lmPVwibW9kaWZpZXIuZ3JvdXAgYXMgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1uYW1lXCIgKm5nSWY9XCJncm91cC5uYW1lXCI+e3sgZ3JvdXAubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1ib3hcIiBbbmdDbGFzc109XCJ7J3dpdGhvdXQtaW1hZ2VzJzogIW1vZGlmaWVyLmNoaWxkSW1hZ2VzSXNzZXR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFNpbmdsZSBtb2RpZmllciAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXI6IG1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6ICdzaW5nbGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzVmFsdWVUcmVlWydzaW5nbGUnXVttb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIuY2hpbGRNb2RpZmllcnM/Lmxlbmd0aFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDI7IHRoZW4gdHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZSBlbHNlIGdyb3VwVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBCYXNlIGdyb3VwIG1vZGlmaWVyIHZpZXcgLS0+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjZ3JvdXBUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1oZWFkZXJcIiAqbmdJZj1cIm1vZGlmaWVyLmdyb3VwIGFzIGdyb3VwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLW5hbWVcIiAqbmdJZj1cImdyb3VwLm5hbWVcIj57eyBncm91cC5uYW1lIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRlc2NyaXB0aW9uXCIgKm5nSWY9XCJncm91cC5kZXNjcmlwdGlvblwiPnt7IGdyb3VwLmRlc2NyaXB0aW9uIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jaGlsZHJlblwiIFtuZ0NsYXNzXT1cInsnd2l0aG91dC1pbWFnZXMnOiAhbW9kaWZpZXIuaW1hZ2VzSXNzZXR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgY2hpbGRNb2RpZmllciBvZiBtb2RpZmllci5jaGlsZE1vZGlmaWVyc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIEdyb3VwIG1vZGlmaWVyIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwibW9kaWZpZXJUZW1wbGF0ZTsgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBjaGlsZE1vZGlmaWVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IG1vZGlmaWVyLm1vZGlmaWVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBtb2RpZmllcnNWYWx1ZVRyZWVbbW9kaWZpZXIubW9kaWZpZXJJZF1bY2hpbGRNb2RpZmllci5tb2RpZmllcklkXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogbW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogbW9kaWZpZXIubWluQW1vdW50IHx8IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBNYXhBbW91bnQ6IG1vZGlmaWVyLm1heEFtb3VudCB8fCAxMDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cIj48L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICAgICAgPCEtLSBUd28gcGFydHMgYXNzZW1ibGVkIGdyb3VwIG1vZGlmaWVyIHZpZXcgKGxpa2UgcGl6emEgZnJvbSB0d28gaGFsdmVzKSAtLT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICN0d29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXJcIiBbbmdDbGFzc109XCJ7ZW1wdHk6ICF0d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFttb2RpZmllci5tb2RpZmllcklkXT8ubGVuZ3RofVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hpbGRNb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdGVkLWRpc2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwibW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllci5tb2RpZmllcklkXS50b3RhbEFtb3VudCA9PSAxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3RlZC1kaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj7QktGL0LHQtdGA0LjRgtC1INC/0L7Qu9C+0LLQuNC90YM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZGlzaEltYWdlVGVtcGxhdGU7IGNvbnRleHQ6IHsgZGlzaDoge30gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LW5hbWVcIj7QktGL0LHQtdGA0LjRgtC1INC70Y7QsdGL0LUg0LTQstC1INC/0L7Qu9C+0LLQuNC90LrQuDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGNoaWxkTW9kaWZpZXIgb2YgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0VHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcihjaGlsZE1vZGlmaWVyKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7c2VsZWN0ZWQ6IG1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXVtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqbmdJZj1cImNoaWxkTW9kaWZpZXIuZGlzaCBhcyBkaXNoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWFnZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkaXNoLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt7IGRpc2gubmFtZSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtcHJpY2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd6ZXJvLXByaWNlJzogIWRpc2gucHJpY2V9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3sgZGlzaC5wcmljZSB9fTwvc3Bhbj4g4oK9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuXG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwicmVzdWx0XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPtCY0KLQntCT0J46PC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzcz1cInByaWNlXCI+XG4gICAgICAgICAgICA8c3Bhbj57eyB0b3RhbFByaWNlfX08L3NwYW4+IOKCvVxuICAgICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnRcIiAqbmdJZj1cImlzVHdvUGFydHNBc3NlbWJsZWRUZW1wbGF0ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj7QmtC+0LzQvNC10L3RgtCw0YDQuNC5PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ib3hcIj5cbiAgICAgICAgICAgIDxpbnB1dCAjY29tbWVudElucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJcIiAoa2V5dXApPVwiY29tbWVudC5lbWl0KGNvbW1lbnRJbnB1dC52YWx1ZSlcIj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5cblxuXG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI2Rpc2hJbWFnZVRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI2Rpc2hJbWFnZVRlbXBsYXRlIGxldC1kaXNoPVwiZGlzaFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkaXNoPy5pbWFnZXMgJiYgZGlzaC5pbWFnZXNbMF0/LmltYWdlcz8uc21hbGw7IGVsc2UgaW1nUGxhY2Vob2xkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2VcIiBbc3R5bGUuYmFja2dyb3VuZEltYWdlXT1cIid1cmwoJyArIGltYWdlVXJsICsgZGlzaC5pbWFnZXNbMF0uaW1hZ2VzLnNtYWxsICsgJyknXCI+PC9kaXY+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNpbWdQbGFjZWhvbGRlcj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImRpc2gtaW1hZ2UtcGxhY2Vob2xkZXJcIj48L2Rpdj5cbiAgICA8L25nLXRlbXBsYXRlPlxuPC9uZy10ZW1wbGF0ZT5cblxuPCEtLSBUZW1wbGF0ZSBibG9jayAjbW9kaWZpZXJUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJtb2RpZmllci5kaXNoIGFzIGRpc2hcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLWltYWdlLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkaXNoSW1hZ2VUZW1wbGF0ZTsgY29udGV4dDogeyBkaXNoOiBkaXNoIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtbmFtZVwiPnt7IGRpc2gubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1kaXNoLXdlaWdodFwiICpuZ0lmPVwiZGlzaC53ZWlnaHRcIj57eyBkaXNoLndlaWdodCAqIDEwMDAgfX0g0LPRgDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kaWZpZXItZGlzaC1wcmljZS1ib3hcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cInsnemVyby1wcmljZSc6ICFkaXNoLnByaWNlfVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57eyBkaXNoLnByaWNlIH19PC9zcGFuPiDigr1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGlmaWVyLWRpc2gtYWN0aW9uLWJveFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJncm91cE1pbkFtb3VudCA8PSAxICYmIGdyb3VwTWF4QW1vdW50ID09IDE7IGVsc2UgY291bnRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJtb2RpZmllckNoZWNrYm94VGVtcGxhdGU7IGNvbnRleHQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyOiBtb2RpZmllcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IGFtb3VudFxuICAgICAgICAgICAgICAgICAgICB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgI2NvdW50ZXJUZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm1vZGlmaWVyQ291bnRlclRlbXBsYXRlOyBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcjogbW9kaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cElkOiBncm91cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cEFtb3VudDogZ3JvdXBBbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cE1heEFtb3VudDogZ3JvdXBNYXhBbW91bnRcbiAgICAgICAgICAgICAgICAgICAgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlIC0tPlxuXG48bmctdGVtcGxhdGUgI21vZGlmaWVyQ291bnRlclRlbXBsYXRlXG4gICAgICAgICAgICAgbGV0LW1vZGlmaWVyPVwibW9kaWZpZXJcIlxuICAgICAgICAgICAgIGxldC1ncm91cElkPVwiZ3JvdXBJZFwiXG4gICAgICAgICAgICAgbGV0LWFtb3VudD1cImFtb3VudFwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwQW1vdW50PVwiZ3JvdXBBbW91bnRcIlxuICAgICAgICAgICAgIGxldC1ncm91cE1pbkFtb3VudD1cImdyb3VwTWluQW1vdW50XCJcbiAgICAgICAgICAgICBsZXQtZ3JvdXBNYXhBbW91bnQ9XCJncm91cE1heEFtb3VudFwiPlxuICAgIDxuZy1jb250YWluZXI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtb2RpZmllci1jb3VudGVyXCIgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50ICYmIGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cIm1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwie2Rpc2FibGVkOiAhYW1vdW50IHx8IGdyb3VwQW1vdW50IDw9IGdyb3VwTWluQW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50IC0gMSwgJ21pbnVzJylcIlxuICAgICAgICAgICAgICAgICAgICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiPi08L2Rpdj5cbiAgICAgICAgICAgIDxpbnB1dCBbdmFsdWVdPVwiYW1vdW50XCIgcmVhZG9ubHkgI2lucHV0PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInBsdXNcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ZGlzYWJsZWQ6IGdyb3VwQW1vdW50ID49IGdyb3VwTWF4QW1vdW50fVwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllciwgYW1vdW50ICsgMSwgJ3BsdXMnKVwiXG4gICAgICAgICAgICAgICAgICAgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCI+KzwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5cbjwhLS0gVGVtcGxhdGUgYmxvY2sgI21vZGlmaWVyQ2hlY2tib3hUZW1wbGF0ZSAtLT5cblxuPG5nLXRlbXBsYXRlICNtb2RpZmllckNoZWNrYm94VGVtcGxhdGVcbiAgICAgICAgICAgICBsZXQtbW9kaWZpZXI9XCJtb2RpZmllclwiXG4gICAgICAgICAgICAgbGV0LWdyb3VwSWQ9XCJncm91cElkXCJcbiAgICAgICAgICAgICBsZXQtYW1vdW50PVwiYW1vdW50XCI+XG4gICAgPG5nLWNvbnRhaW5lcj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzPVwibW9kaWZpZXItY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIntzZWxlY3RlZDogYW1vdW50fVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1vZGlmaWVyQW1vdW50KG1vZGlmaWVyLCBhbW91bnQgPyAwIDogMSwgJ2NoZWNrYm94JylcIj48L2Rpdj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbjwvbmctdGVtcGxhdGU+XG5gLFxuICBzdHlsZXM6IFtgLmRpc2h7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7cGFkZGluZy1ib3R0b206MzRweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5kaXNoIC5kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoyNTBweDtoZWlnaHQ6MTcwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtiYWNrZ3JvdW5kLXNpemU6NTAlfS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveHttYXJnaW4tbGVmdDozNHB4O2hlaWdodDoxNzBweDtkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOnN0cmV0Y2g7cGFkZGluZzo1cHggMCAwO2JveC1zaXppbmc6Ym9yZGVyLWJveH0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtbmFtZXtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI4cHg7bGluZS1oZWlnaHQ6MzJweDtsZXR0ZXItc3BhY2luZzoyLjRweDtjb2xvcjojMGEwOTA5fS5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1pbmdyZWRpZW50c3tmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwMDA7bWFyZ2luLXRvcDoxNXB4O292ZXJmbG93OmhpZGRlbjtmbGV4LWdyb3c6MX0uZGlzaCAuZGlzaC1kZXNjcmlwdGlvbi1ib3ggLmRpc2gtcHJpY2UtYm94e2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47aGVpZ2h0OjQ1cHg7bWFyZ2luLXJpZ2h0OjQ5cHh9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2h7Ym9yZGVyOm5vbmU7bWFyZ2luLWxlZnQ6MDtwYWRkaW5nLWJvdHRvbTowfS5uZy1jYXJ0LWRpc2gtY2FsYy10d28tcGFydHMtYXNzZW1ibGVkIC5kaXNoIC5kaXNoLWltYWdlLWJveHtkaXNwbGF5Om5vbmV9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94e3dpZHRoOjEwMCU7aGVpZ2h0OmF1dG99Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLW5hbWV7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyOHB4O2xpbmUtaGVpZ2h0OjMycHg7bGV0dGVyLXNwYWNpbmc6Mi40cHg7Y29sb3I6IzBhMDkwOTt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9Lm5nLWNhcnQtZGlzaC1jYWxjLXR3by1wYXJ0cy1hc3NlbWJsZWQgLmRpc2ggLmRpc2gtZGVzY3JpcHRpb24tYm94IC5kaXNoLWluZ3JlZGllbnRzLC5uZy1jYXJ0LWRpc2gtY2FsYy10d28tcGFydHMtYXNzZW1ibGVkIC5kaXNoIC5kaXNoLWRlc2NyaXB0aW9uLWJveCAuZGlzaC1wcmljZS1ib3h7ZGlzcGxheTpub25lfS5kaXNoLWltYWdle3dpZHRoOjI1MHB4O2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MDtiYWNrZ3JvdW5kLXNpemU6Y292ZXI7YmFja2dyb3VuZC1wb3NpdGlvbjp0b3A7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0fS5yZXN1bHR7bWFyZ2luLXRvcDo0OXB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjRweDtsaW5lLWhlaWdodDoyOHB4O2NvbG9yOiMwYTA5MDk7dGV4dC1hbGlnbjpyaWdodH0ucmVzdWx0IC5wcmljZXttYXJnaW4tbGVmdDo3NnB4fS5jb21tZW50e3BhZGRpbmctYm90dG9tOjE1cHh9LmNvbW1lbnQgLnRpdGxle2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDk7bWFyZ2luOjMwcHggMCAyMHB4fS5jb21tZW50IC5pbnB1dC1ib3h7bWFyZ2luLXRvcDoxMHB4fS5jb21tZW50IC5pbnB1dC1ib3ggaW5wdXR7Ym9yZGVyOjJweCBzb2xpZCAjOTY5Njk2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7aGVpZ2h0OjQ1cHg7bGluZS1oZWlnaHQ6NDVweDtmb250LXN0eWxlOml0YWxpYztmb250LXdlaWdodDo0MDA7Zm9udC1zaXplOjIwcHg7Y29sb3I6Izk2OTY5NjtwYWRkaW5nOjAgMjBweH0ubW9kaWZpZXJzIC5tb2RpZmllci1ncm91cHttYXJnaW4tdG9wOjI1cHg7cGFkZGluZy1ib3R0b206MjVweDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjOTY5Njk2fS5tb2RpZmllcnMgLm1vZGlmaWVyLWhlYWRlcnttYXJnaW4tYm90dG9tOjI1cHh9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItaGVhZGVyIC5tb2RpZmllci1kZXNjcmlwdGlvbntmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxN3B4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaHtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7bWFyZ2luLWJvdHRvbToycHg7aGVpZ2h0OjEwMHB4O2JveC1zaXppbmc6Ym9yZGVyLWJveH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtwb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDoxMDBweDtoZWlnaHQ6MTAwcHg7Ym94LXNpemluZzpib3JkZXItYm94O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2ZmZjtiYWNrZ3JvdW5kLXNpemU6NTAlO21hcmdpbi1yaWdodDoyOHB4fS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtaW1hZ2UtYm94IC5kaXNoLWltYWdle3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZC1zaXplOmNvbnRhaW47YmFja2dyb3VuZC1wb3NpdGlvbjpjZW50ZXJ9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1kZXNjcmlwdGlvbi1ib3h7ZmxleC1ncm93OjE7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS5tb2RpZmllcnMgLm1vZGlmaWVyLWRpc2ggLm1vZGlmaWVyLWRpc2gtZGVzY3JpcHRpb24tYm94IC5tb2RpZmllci1kaXNoLW5hbWV7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToyMHB4O2xpbmUtaGVpZ2h0OjIzcHg7Y29sb3I6IzBhMDkwOX0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLWRlc2NyaXB0aW9uLWJveCAubW9kaWZpZXItZGlzaC13ZWlnaHR7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O21hcmdpbi10b3A6MTBweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLXByaWNlLWJveHtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O21hcmdpbi1yaWdodDoxMDVweH0ubW9kaWZpZXJzIC5tb2RpZmllci1kaXNoIC5tb2RpZmllci1kaXNoLXByaWNlLWJveCAuemVyby1wcmljZXtkaXNwbGF5Om5vbmV9Lm1vZGlmaWVycyAubW9kaWZpZXItZGlzaCAubW9kaWZpZXItZGlzaC1hY3Rpb24tYm94e3dpZHRoOjE1MXB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZy1ib3R0b206MjhweDtvcGFjaXR5OjE7Ym9yZGVyLWJvdHRvbToycHggc29saWQgIzk2OTY5NjtoZWlnaHQ6MjMwcHg7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zaXRpb246LjVzfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlci5lbXB0eXtib3JkZXItYm90dG9tOm5vbmU7aGVpZ2h0OjA7b3BhY2l0eTowfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaHtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpmbGV4LWVuZDt3aWR0aDo1MCV9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC50aXRsZXtmb250LXNpemU6MjFweDtsaW5lLWhlaWdodDoyNXB4O2NvbG9yOiMwYTA5MDk7bWFyZ2luLXJpZ2h0OjI0cHh9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoIC5pbWFnZS1ib3h7d2lkdGg6MTAwcHg7aGVpZ2h0OjIwMHB4O292ZXJmbG93OmhpZGRlbn0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2ggLmltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoyMDAlO2hlaWdodDoxMDAlfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWhlYWRlciAuc2VsZWN0ZWQtZGlzaDpudGgtY2hpbGQoMil7ZmxleC1kaXJlY3Rpb246cm93LXJldmVyc2V9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtaGVhZGVyIC5zZWxlY3RlZC1kaXNoOm50aC1jaGlsZCgyKSAudGl0bGV7bWFyZ2luLWxlZnQ6MjRweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1oZWFkZXIgLnNlbGVjdGVkLWRpc2g6bnRoLWNoaWxkKDIpIC5pbWFnZS1ib3h7ZGlyZWN0aW9uOnJ0bH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbmFtZXtmb250LXdlaWdodDo1MDA7Zm9udC1zaXplOjIwcHg7bGluZS1oZWlnaHQ6MjNweDtjb2xvcjojMGEwOTA5O3BhZGRpbmc6MjBweCAwfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0e2Rpc3BsYXk6Z3JpZDtncmlkLXRlbXBsYXRlLWNvbHVtbnM6MWZyIDFmciAxZnI7bWFyZ2luLXRvcDozMHB4O2dyaWQtY29sdW1uLWdhcDozMHB4O2dyaWQtcm93LWdhcDoyNHB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoe2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2JveC1zaXppbmc6Ym9yZGVyLWJveDtjdXJzb3I6cG9pbnRlcjtjb2xvcjojMGEwOTA5O2JvcmRlcjoxLjVweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDApfS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoLnNlbGVjdGVke2JvcmRlcjoxLjVweCBzb2xpZCAjMGEwOTA5O2JvcmRlci1yYWRpdXM6MTVweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuZGlzaC1uYW1le2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MTdweDtsaW5lLWhlaWdodDoyMHB4O2xldHRlci1zcGFjaW5nOjIuNHB4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjAgNXB4fS50d28tcGFydHMtYXNzZW1ibGVkIC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHkgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdC1kaXNoIC5kaXNoLXByaWNle2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O3BhZGRpbmc6NXB4IDAgMTBweH0udHdvLXBhcnRzLWFzc2VtYmxlZCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5IC50d28tcGFydHMtYXNzZW1ibGVkLWJvZHktbGlzdCAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QtZGlzaCAuaW1hZ2UtYm94e3dpZHRoOjIyOHB4O2hlaWdodDoyMjhweDtib3JkZXItcmFkaXVzOjE1cHggMTVweCAwIDB9LnR3by1wYXJ0cy1hc3NlbWJsZWQgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keSAudHdvLXBhcnRzLWFzc2VtYmxlZC1ib2R5LWxpc3QgLnR3by1wYXJ0cy1hc3NlbWJsZWQtYm9keS1saXN0LWRpc2ggLmltYWdlLWJveCAuZGlzaC1pbWFnZXt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2JvcmRlci1yYWRpdXM6MTVweCAxNXB4IDAgMH0ubW9kaWZpZXItZml4ZWR7Ym9yZGVyOjJweCBzb2xpZCAjNzY3Njc2O2JveC1zaXppbmc6Ym9yZGVyLWJveDtib3JkZXItcmFkaXVzOjE1cHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOnN0cmV0Y2g7aGVpZ2h0OjQ1cHh9Lm1vZGlmaWVyLWZpeGVkIC5pdGVte2ZvbnQtd2VpZ2h0OjUwMDtmb250LXNpemU6MjBweDtsaW5lLWhlaWdodDoyM3B4O3dpZHRoOjE0MnB4O2hlaWdodDo0NXB4O2NvbG9yOiM3Njc2NzY7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO21hcmdpbi10b3A6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06Zmlyc3QtY2hpbGR7bWFyZ2luLWxlZnQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW06bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6LTJweH0ubW9kaWZpZXItZml4ZWQgLml0ZW0uc2VsZWN0ZWR7YmFja2dyb3VuZDojMGEwOTA5O2JvcmRlci1yYWRpdXM6MTVweDtjb2xvcjojZmZmfS5tb2RpZmllci1maXhlZCAuaXRlbTpub3QoLnNlbGVjdGVkKXtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY2hlY2tib3h7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDtiYWNrZ3JvdW5kOiNlMGUwZTA7Ym9yZGVyLXJhZGl1czoxNXB4O2N1cnNvcjpwb2ludGVyO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ubW9kaWZpZXItY2hlY2tib3guc2VsZWN0ZWQ6YWZ0ZXJ7Y29udGVudDp1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7IGJhc2U2NCwgUEhOMlp5QjNhV1IwYUQwaU1qZ2lJR2hsYVdkb2REMGlNamdpSUhacFpYZENiM2c5SWpBZ01DQXlPQ0F5T0NJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNEtQSEJoZEdnZ1pEMGlUVElnTVRNdU5Vd3hNUzR6TWpNeElESTJUREkySURJaUlITjBjbTlyWlQwaVlteGhZMnNpSUhOMGNtOXJaUzEzYVdSMGFEMGlNeTQxSWlCemRISnZhMlV0YkdsdVpXTmhjRDBpY205MWJtUWlJSE4wY205clpTMXNhVzVsYW05cGJqMGljbTkxYm1RaUx6NEtQQzl6ZG1jK0NnPT1cIil9Lm1vZGlmaWVyLWNvdW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXI6bm9uZTt3aWR0aDoxNTFweDtoZWlnaHQ6NTBweDtib3JkZXItcmFkaXVzOjE1cHg7YmFja2dyb3VuZDojZTBlMGUwfS5tb2RpZmllci1jb3VudGVyLmRpc2FibGVke29wYWNpdHk6LjN9Lm1vZGlmaWVyLWNvdW50ZXI6bm90KC5kaXNhYmxlZCkgLm1pbnVzLmRpc2FibGVkLC5tb2RpZmllci1jb3VudGVyOm5vdCguZGlzYWJsZWQpIC5wbHVzLmRpc2FibGVke29wYWNpdHk6LjE1O2N1cnNvcjpkZWZhdWx0fS5tb2RpZmllci1jb3VudGVyIGlucHV0e2JvcmRlcjpub25lO2JhY2tncm91bmQ6MCAwO3dpZHRoOjEwMCU7cGFkZGluZzowO2hlaWdodDo1MHB4O2xpbmUtaGVpZ2h0OjUwcHg7dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC13ZWlnaHQ6NTAwO2ZvbnQtc2l6ZToxOHB4O2NvbG9yOiMwYTA5MDl9Lm1vZGlmaWVyLWNvdW50ZXIgLm1pbnVzLC5tb2RpZmllci1jb3VudGVyIC5wbHVze2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7aGVpZ2h0OjUwcHg7bGluZS1oZWlnaHQ6NTBweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjE4cHg7Y29sb3I6IzBhMDkwOTtwYWRkaW5nOjAgMzBweDtjdXJzb3I6cG9pbnRlcn0ubW9kaWZpZXItY291bnRlciAubWludXM6aG92ZXIsLm1vZGlmaWVyLWNvdW50ZXIgLnBsdXM6aG92ZXJ7Y29sb3I6IzAwMH0ubW9kaWZpZXItY291bnRlciAubWludXM6YWN0aXZlLC5tb2RpZmllci1jb3VudGVyIC5wbHVzOmFjdGl2ZXtjb2xvcjojY2MwMDA5fS5tb2RpZmllci1jb3VudGVyIC5taW51cy5sb2FkaW5nLC5tb2RpZmllci1jb3VudGVyIC5wbHVzLmxvYWRpbmd7b3BhY2l0eTouMn0ubW9kaWZpZXItY291bnRlciAubWludXN7bGVmdDowfS5tb2RpZmllci1jb3VudGVyIC5wbHVze3JpZ2h0OjB9LndpdGhvdXQtaW1hZ2VzIC5tb2RpZmllci1kaXNoLWltYWdlLWJveHtoZWlnaHQ6NzBweCFpbXBvcnRhbnR9LndpdGhvdXQtaW1hZ2VzIC5tb2RpZmllci1kaXNoe2hlaWdodDo3MHB4fWBdXG59KVxuZXhwb3J0IGNsYXNzIERpc2hDYWxjQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgQElucHV0KCkgZGlzaDphbnk7XG4gIEBJbnB1dCgpIGFtb3VudDphbnk7XG4gIEBJbnB1dCgpIHNlbGVjdGVkTW9kaWZpZXJzOmFueTtcbiAgQE91dHB1dCgpIHZhbGlkYXRlOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYW1vdW50RGlzaFRvQWRkOkV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29tbWVudDpFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBtb2RpZmllcnMgPSB7XG4gICAgaW5kZXhCeUlkOiB7fSxcbiAgICBjdXN0b206IHtcbiAgICAgIGZpeGVkOiBudWxsXG4gICAgfSxcbiAgICBiYXNlTGlzdDogW10sXG4gIH07XG5cbiAgaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlOiBib29sZWFuO1xuXG4gIHRvdGFsUHJpY2U6IG51bWJlcjtcbiAgbW9kaWZpZXJzVmFsdWVUcmVlOiBhbnkgPSB7fTtcbiAgdHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWQ6IGFueSA9IHt9O1xuICBpbWFnZVVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY2FydFNlcnZpY2U6IE5nUmVzdG9DYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIGV2ZW50ZXI6RXZlbnRlclNlcnZpY2UsXG4gICAgQEluamVjdCgnSW1hZ2VVcmwnKSBpbWFnZVVybDpzdHJpbmdcbiAgKSB7XG4gICAgdGhpcy5pbWFnZVVybCA9IGltYWdlVXJsO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jaGVja1ZhbGlkKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZhbGlkYXRlLmVtaXQodHJ1ZSk7XG4gICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMoW10sIFtdKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubW9kaWZpZXJzID0ge1xuICAgICAgaW5kZXhCeUlkOiB7fSxcbiAgICAgIGN1c3RvbToge1xuICAgICAgICBmaXhlZDogbnVsbFxuICAgICAgfSxcbiAgICAgIGJhc2VMaXN0OiBbXSxcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUgPSB7fTtcbiAgICBpZih0aGlzLmRpc2ggJiYgdGhpcy5kaXNoLm1vZGlmaWVycykge1xuICAgICAgZm9yKGxldCBtb2RpZmllciBvZiB0aGlzLmRpc2gubW9kaWZpZXJzKSB7XG4gICAgICAgIGxldCBtb2RpZmllclR5cGUgPSBudWxsO1xuICAgICAgICAvLyBJbmRleGluZ1xuICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgLy8gQ2hlY2sgQ3VzdG9tIG1vZGlmaWVycyAobGlrZSBQaXp6YSBTaXplKVxuICAgICAgICBpZighdGhpcy5tb2RpZmllcnMuY3VzdG9tLmZpeGVkXG4gICAgICAgICAgJiYgIXRoaXMubW9kaWZpZXJzLmJhc2VMaXN0Lmxlbmd0aFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoID09IDJcbiAgICAgICAgICAmJiBtb2RpZmllci5tYXhBbW91bnQgPT0gbW9kaWZpZXIubWF4QW1vdW50XG4gICAgICAgICAgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDEpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIFBpenphIFNpemUgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnY3VzdG9tJztcbiAgICAgICAgICB0aGlzLm1vZGlmaWVycy5jdXN0b20uZml4ZWQgPSBtb2RpZmllcjtcbiAgICAgICAgICBjb25zb2xlLmluZm8oJ0N1c3RvbSBGaXhlZCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5ncm91cFxuICAgICAgICAgICYmIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMubGVuZ3RoXG4gICAgICAgICAgJiYgbW9kaWZpZXIuY2hpbGRNb2RpZmllcnMuZmluZChtID0+IG0uZGlzaCkpIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIEJhc2UgbW9kaWZpZXJcbiAgICAgICAgICBtb2RpZmllclR5cGUgPSAnZ3JvdXAnO1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmJhc2VMaXN0LnB1c2gobW9kaWZpZXIpO1xuXG4gICAgICAgICAgaWYobW9kaWZpZXIubWluQW1vdW50ID09IDIgJiYgbW9kaWZpZXIubWF4QW1vdW50ID09IDIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUd29QYXJ0c0Fzc2VtYmxlZFRlbXBsYXRlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdHcm91cCBtb2RpZmllcjonLCBtb2RpZmllcik7XG4gICAgICAgIH0gZWxzZSBpZihtb2RpZmllci5kaXNoKSB7XG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ3NpbmdsZSc7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnMuYmFzZUxpc3QucHVzaChtb2RpZmllcik7XG4gICAgICAgICAgY29uc29sZS5pbmZvKCdTaW5nbGUgbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFRoaXMgaXMgYnJva2VuIG1vZGlmaWVyXG4gICAgICAgICAgbW9kaWZpZXJUeXBlID0gJ2Jyb2tlbic7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdCcm9rZW4gbW9kaWZpZXI6JywgbW9kaWZpZXIpO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBJbml0IGRlZmF1bHQgdmFsdWVzXG4gICAgICAgIHN3aXRjaCAobW9kaWZpZXJUeXBlKSB7XG4gICAgICAgICAgY2FzZSAnZ3JvdXAnOlxuICAgICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVttb2RpZmllci5tb2RpZmllcklkXSA9IHt9O1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZE1vZGlmaWVyIG9mIG1vZGlmaWVyLmNoaWxkTW9kaWZpZXJzKSB7XG4gICAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtjaGlsZE1vZGlmaWVyLm1vZGlmaWVySWRdID0gY2hpbGRNb2RpZmllcjtcbiAgICAgICAgICAgICAgLy8gSW5pdCBkZWZhdWx0IHZhbHVlXG4gICAgICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW21vZGlmaWVyLm1vZGlmaWVySWRdW2NoaWxkTW9kaWZpZXIubW9kaWZpZXJJZF0gPSBjaGlsZE1vZGlmaWVyLmRlZmF1bHRBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChtb2RpZmllci5tb2RpZmllcklkKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NpbmdsZSc6XG4gICAgICAgICAgICBpZighdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddKXtcbiAgICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddID0ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEluZGV4aW5nXG4gICAgICAgICAgICB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXIubW9kaWZpZXJJZF0gPSBtb2RpZmllcjtcbiAgICAgICAgICAgIC8vIEluaXQgZGVmYXVsdCB2YWx1ZVxuICAgICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbJ3NpbmdsZSddW21vZGlmaWVyLm1vZGlmaWVySWRdID0gbW9kaWZpZXIuZGVmYXVsdEFtb3VudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpbmQgaW1hZ2VzIGFuZCBzZXQgZmxhZ3MgKGltYWdlc0lzc2V0LCBjaGlsZEltYWdlc0lzc2V0KVxuICAgICAgICB0aGlzLmNoZWNrSW1hZ2VzSW5Nb2RpZmllcihtb2RpZmllci5tb2RpZmllcklkKTtcblxuICAgICAgfVxuICAgICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRgLCB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWQpO1xuICB9XG5cbiAgY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpIHtcbiAgICBpZihncm91cElkID09ICdzaW5nbGUnKSByZXR1cm47XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50ID0gT2JqZWN0XG4gICAgICAudmFsdWVzKHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKVxuICAgICAgLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgKyBiKTtcbiAgICByZXR1cm4gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50O1xuICB9XG5cbiAgY2hlY2tJbWFnZXNJbk1vZGlmaWVyKG1vZGlmaWVySWQpIHtcbiAgICBjb25zdCBtOiBhbnkgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmltYWdlc0lzc2V0ID0gbS5kaXNoICYmIG0uZGlzaC5pbWFnZXMgJiYgbS5kaXNoLmltYWdlcy5sZW5ndGggPyB0cnVlIDogZmFsc2U7XG4gICAgdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW21vZGlmaWVySWRdLmNoaWxkSW1hZ2VzSXNzZXQgPSAhIXRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFttb2RpZmllcklkXVxuICAgICAgLmNoaWxkTW9kaWZpZXJzXG4gICAgICAuZmluZCgobTogYW55KSA9PiBtICYmIG0uZGlzaCAmJiBtLmRpc2guaW1hZ2VzICYmIG0uZGlzaC5pbWFnZXMubGVuZ3RoID8gdHJ1ZSA6IGZhbHNlKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZVRvdGFsUHJpY2UoKSB7XG4gICAgbGV0IHRvdGFsUHJpY2UgPSB0aGlzLmRpc2gucHJpY2UgfHwgMDtcbiAgICBmb3IobGV0IGdyb3VwSWQgaW4gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWUpIHtcbiAgICAgIGZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICBjb25zdCBhbW91bnQgPSB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXVttb2RpZmllcklkXTtcbiAgICAgICAgaWYoYW1vdW50KSB7XG4gICAgICAgICAgY29uc3QgbW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbbW9kaWZpZXJJZF07XG4gICAgICAgICAgaWYobW9kaWZpZXIgJiYgbW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLnByaWNlKSB7XG4gICAgICAgICAgICB0b3RhbFByaWNlICs9IG1vZGlmaWVyLmRpc2gucHJpY2UgKiBhbW91bnQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMudG90YWxQcmljZSA9IHRvdGFsUHJpY2U7XG4gICAgdGhpcy5zZXRNb2RpZmllcnMoKTtcbiAgfVxuXG4gIGdldE1vZGlmaWVyc0lkcyhtb2RpZmllcikge1xuICAgIHJldHVybiB7XG4gICAgICBncm91cElkOiAobW9kaWZpZXIuZGlzaCAmJiBtb2RpZmllci5kaXNoLmdyb3VwSWQpID8gbW9kaWZpZXIuZGlzaC5ncm91cElkIDogdW5kZWZpbmVkLFxuICAgICAgbW9kaWZpZXJJZDogbW9kaWZpZXIubW9kaWZpZXJJZFxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdFR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXIobW9kaWZpZXI6IGFueSkge1xuICAgIGNvbnN0IHsgZ3JvdXBJZCA9ICdzaW5nbGUnLCBtb2RpZmllcklkIH0gPSB0aGlzLmdldE1vZGlmaWVyc0lkcyhtb2RpZmllcik7XG4gICAgY29uc3QgeyBtaW5BbW91bnQsIG1heEFtb3VudCB9ID0gbW9kaWZpZXI7XG4gICAgY29uc3QgeyBtaW5BbW91bnQ6IGdyb3VwTWluQW1vdW50ID0gMCxcbiAgICAgIG1heEFtb3VudDogZ3JvdXBNYXhBbW91bnQgPSAwIH0gPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF0gfHwge307XG4gICAgY29uc3QgcHJldmlvdXNBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgIGNvbnN0IGFtb3VudDogbnVtYmVyID0gcHJldmlvdXNBbW91bnQgPyAwIDogMTtcblxuICAgIC8vIEluaXQgdG1wIHZhbHVlIHN0b3JhZ2UgaWYgbm90IGV4aXN0c1xuICAgIGlmKCF0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdKSB7XG4gICAgICB0aGlzLnR3b1BhcnRzQXNzZW1ibGVkTW9kaWZpZXJzSWRzQnlHcm91cElkW2dyb3VwSWRdID0gW107XG4gICAgfVxuXG4gICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgY29uc3QgZ3JvdXBBbW91bnQ6IG51bWJlciA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS50b3RhbEFtb3VudCAtIHByZXZpb3VzQW1vdW50ICsgYW1vdW50O1xuICAgIGlmKGdyb3VwQW1vdW50ID4gZ3JvdXBNYXhBbW91bnQpIHtcbiAgICAgIGlmKHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ubGVuZ3RoKSB7XG4gICAgICAgIGZvcihsZXQgbUlkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbUlkXSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXSA9IHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0uc2xpY2UoMSwyKTtcbiAgICAgICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bdGhpcy50d29QYXJ0c0Fzc2VtYmxlZE1vZGlmaWVyc0lkc0J5R3JvdXBJZFtncm91cElkXVswXV0gPSAxO1xuICAgICAgfWVsc2Uge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXG4gICAgICAgICAgICDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDQvdC1INCx0L7Qu9C10LUgJHtncm91cE1heEFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfWVsc2UgaWYoZ3JvdXBBbW91bnQgPT09IDApIHtcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0gPSBbXTtcbiAgICB9XG5cbiAgICBpZihhbW91bnQgJiYgIXRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0uZmluZCh2ID0+IHYgPT0gbW9kaWZpZXJJZCkpIHtcbiAgICAgIHRoaXMudHdvUGFydHNBc3NlbWJsZWRNb2RpZmllcnNJZHNCeUdyb3VwSWRbZ3JvdXBJZF0ucHVzaChtb2RpZmllcklkKTtcbiAgICB9XG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gIH1cblxuICBjaGFuZ2VNb2RpZmllckFtb3VudChtb2RpZmllcjogYW55LCBhbW91bnQ6IG51bWJlciwgb3BlcmF0aW9uOiBzdHJpbmcpIHtcbiAgICBpZihhbW91bnQgPCAwKSByZXR1cm47XG4gICAgY29uc3QgeyBncm91cElkID0gJ3NpbmdsZScsIG1vZGlmaWVySWQgfSA9IHRoaXMuZ2V0TW9kaWZpZXJzSWRzKG1vZGlmaWVyKTtcbiAgICBjb25zdCB7IG1pbkFtb3VudCwgbWF4QW1vdW50IH0gPSBtb2RpZmllcjtcbiAgICBjb25zdCB7IG1pbkFtb3VudDogZ3JvdXBNaW5BbW91bnQgPSAwLFxuICAgICAgICAgICAgbWF4QW1vdW50OiBncm91cE1heEFtb3VudCA9IDAgfSA9IHRoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXSB8fCB7fTtcbiAgICBjb25zdCBwcmV2aW91c0Ftb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF07XG5cbiAgICAvLyBGb3IgY2hlY2tib3hcbiAgICBpZihvcGVyYXRpb24gPT0gJ2NoZWNrYm94JyAmJiBncm91cElkICE9PSAnc2luZ2xlJykge1xuICAgICAgLy8gSWYgaXQgd29yayBsaWtlIHJhZGlvIGJ1dHRvblxuICAgICAgaWYoZ3JvdXBNaW5BbW91bnQgPD0gMSAmJiBncm91cE1heEFtb3VudCA9PSAxKSB7XG4gICAgICAgIGlmKGFtb3VudCA8IGdyb3VwTWluQW1vdW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB6ZXJvIGFtb3VudCBmb3IgYWxsIG9wdGlvbnNcbiAgICAgICAgZm9yKGxldCBpdGVtTW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgICAgIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW2l0ZW1Nb2RpZmllcklkXSA9IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsQW1vdW50SW5Hcm91cChncm91cElkKTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdCBhY3Rpb24gbmVlZGVkIGFmdGVyXG4gICAgICBpZihhbW91bnQgPT0gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZVRvdGFsUHJpY2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIEdyb3VwIGFtb3VudCBsaW1pdHNcbiAgICBpZihncm91cE1pbkFtb3VudCB8fCBncm91cE1heEFtb3VudCkge1xuICAgICAgLy8gVG90YWwgYW1vdW50IGluIGdyb3VwXG4gICAgICBjb25zdCBncm91cEFtb3VudDogbnVtYmVyID0gdGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLnRvdGFsQW1vdW50IC0gcHJldmlvdXNBbW91bnQgKyBhbW91bnQ7XG5cbiAgICAgIGlmKGdyb3VwQW1vdW50IDwgZ3JvdXBNaW5BbW91bnQpIHtcbiAgICAgICAgY29uc29sZS53YXJuKGBMaW1pdDogbWluICR7Z3JvdXBNaW5BbW91bnR9LiBDdXJyZW50ICR7Z3JvdXBBbW91bnR9YCk7XG4gICAgICAgIHRoaXMuZXZlbnRlci5lbWl0TWVzc2FnZUV2ZW50KFxuICAgICAgICAgIG5ldyBFdmVudE1lc3NhZ2UoXG4gICAgICAgICAgICAnd2FybmluZycsXG4gICAgICAgICAgICAn0J7Qs9GA0LDQvdC40YfQtdC90LjQtScsXG4gICAgICAgICAgICBg0JzQsNC60YHQuNC80LDQu9GM0L3QvtC1INC60L7Qu9C40YfQtdGB0YLQstC+INC+0L/RhtC40Lkg0LTQu9GPINCz0YDRg9C/0L/Ri1xuICAgICAgICAgICAg0LzQvtC00LjRhNC40LrQsNGC0L7RgNC+0LIgXCIke3RoaXMubW9kaWZpZXJzLmluZGV4QnlJZFtncm91cElkXS5ncm91cC5uYW1lfVwiIC0g0L3QtSDQvNC10L3QtdC1ICR7Z3JvdXBNaW5BbW91bnR9YFxuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYoZ3JvdXBBbW91bnQgPiBncm91cE1heEFtb3VudCkge1xuICAgICAgICBjb25zb2xlLndhcm4oYExpbWl0OiBtYXggJHtncm91cE1heEFtb3VudH0uIEN1cnJlbnQgJHtncm91cEFtb3VudH1gKTtcbiAgICAgICAgdGhpcy5ldmVudGVyLmVtaXRNZXNzYWdlRXZlbnQoXG4gICAgICAgICAgbmV3IEV2ZW50TWVzc2FnZShcbiAgICAgICAgICAgICd3YXJuaW5nJyxcbiAgICAgICAgICAgICfQntCz0YDQsNC90LjRh9C10L3QuNC1JyxcbiAgICAgICAgICAgIGDQnNCw0LrRgdC40LzQsNC70YzQvdC+0LUg0LrQvtC70LjRh9C10YHRgtCy0L4g0L7Qv9GG0LjQuSDQtNC70Y8g0LPRgNGD0L/Qv9GLXG4gICAgICAgICAgICDQvNC+0LTQuNGE0LjQutCw0YLQvtGA0L7QsiBcIiR7dGhpcy5tb2RpZmllcnMuaW5kZXhCeUlkW2dyb3VwSWRdLmdyb3VwLm5hbWV9XCIgLSDQvdC1INCx0L7Qu9C10LUgJHtncm91cE1heEFtb3VudH1gXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ0hlY2sgTW9kaWZpZXIgYW1vdW50IGxpbWl0c1xuICAgIGlmKG1pbkFtb3VudCB8fCBtYXhBbW91bnQpIHtcbiAgICAgIGlmKGFtb3VudCA8IG1pbkFtb3VudCkge1xuICAgICAgICBzd2l0Y2ggKG9wZXJhdGlvbikge1xuICAgICAgICAgIGNhc2UgJ3BsdXMnOiBhbW91bnQgPSBtaW5BbW91bnQ7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbnVzJzogYW1vdW50ID0gMDsgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKGFtb3VudCA+IG1heEFtb3VudCkge1xuICAgICAgICBhbW91bnQgPSBtYXhBbW91bnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tb2RpZmllcnNWYWx1ZVRyZWVbZ3JvdXBJZF1bbW9kaWZpZXJJZF0gPSBhbW91bnQ7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbEFtb3VudEluR3JvdXAoZ3JvdXBJZCk7XG4gICAgdGhpcy5jYWxjdWxhdGVUb3RhbFByaWNlKCk7XG4gIH1cblxuICBzZXRNb2RpZmllcnMoKSB7XG4gICAgY29uc3QgbW9kaWZpZXJzVG9TZXQgPSBbXTtcblxuICAgIGZvcihsZXQgZ3JvdXBJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZSkge1xuICAgICAgZm9yKGxldCBtb2RpZmllcklkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdKSB7XG4gICAgICAgIGNvbnN0IGFtb3VudCA9IHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlW2dyb3VwSWRdW21vZGlmaWVySWRdO1xuICAgICAgICBpZihhbW91bnQpIHtcblxuICAgICAgICAgIG1vZGlmaWVyc1RvU2V0LnB1c2goe1xuICAgICAgICAgICAgaWQ6IG1vZGlmaWVySWQsXG4gICAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICAgIGdyb3VwSWQ6IGdyb3VwSWQgIT09ICdzaW5nbGUnID8gZ3JvdXBJZCA6IHVuZGVmaW5lZFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtb2RpZmllcnNUb1NldC5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY2hlY2tWYWxpZCgpO1xuICAgICAgdGhpcy5jYXJ0U2VydmljZS5zZXRNb2RpZmlyZXMobW9kaWZpZXJzVG9TZXQsIFtdKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1ZhbGlkKCkge1xuXG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuXG4gICAgZm9yKGxldCBncm91cElkIGluIHRoaXMubW9kaWZpZXJzVmFsdWVUcmVlKSB7XG5cbiAgICAgIGNvbnN0IGdyb3VwTW9kaWZpZXIgPSB0aGlzLm1vZGlmaWVycy5pbmRleEJ5SWRbZ3JvdXBJZF07XG4gICAgICBpZihncm91cE1vZGlmaWVyLnJlcXVpcmVkKSB7XG4gICAgICAgIGNvbnN0IHRvdGFsQW1vdW50SW5Hcm91cCA9IHRoaXMuY2FsY3VsYXRlVG90YWxBbW91bnRJbkdyb3VwKGdyb3VwSWQpO1xuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPCBncm91cE1vZGlmaWVyLm1pbkFtb3VudCkge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWluIGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1pbkFtb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0b3RhbEFtb3VudEluR3JvdXAgPiBncm91cE1vZGlmaWVyLm1heEFtb3VudCkge1xuICAgICAgICAgIGlzVmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICBjb25zb2xlLndhcm4oYE1vZGlmaWVyICR7Z3JvdXBJZH0gbWF4IGFtb3VudDogJHtncm91cE1vZGlmaWVyLm1heEFtb3VudH1gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL2ZvcihsZXQgbW9kaWZpZXJJZCBpbiB0aGlzLm1vZGlmaWVyc1ZhbHVlVHJlZVtncm91cElkXSkge1xuICAgICAgLy9cbiAgICAgIC8vfVxuICAgIH1cblxuICAgIHRoaXMudmFsaWRhdGUuZW1pdChpc1ZhbGlkKTtcbiAgfVxufVxuIl19
>>>>>>> origin/features_halfpizza
