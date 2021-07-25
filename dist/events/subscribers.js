"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("./events");
const inversify_1 = require("inversify");
const types_1 = require("../types");
let Subscribers = class Subscribers {
    connector;
    dispatcher;
    constructor(connector, dispatcher) {
        this.connector = connector;
        this.dispatcher = dispatcher;
        events_1.subscriptions.forEach(eventName => {
            this.subscribeEvent(eventName);
        });
    }
    async subscribeEvent(eventName) {
        this.connector.subscribeEvent(eventName, (data) => {
            // Subscribe dispatcher
            console.log("received event =>", data.topic);
            this.dispatcher.dispatch(`get ${data.topic}`, JSON.parse(data.message.value ? data.message.value.toString() : '{}'));
        });
    }
};
Subscribers = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Connector)),
    __param(1, inversify_1.inject(types_1.TYPES.ConsumerDispatcher))
], Subscribers);
exports.default = Subscribers;
