"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerDispatcher = void 0;
const decorators_1 = require("event-dispatch/decorators");
const EventDispatcher_1 = require("event-dispatch/EventDispatcher");
const inversify_1 = require("inversify");
let ProducerDispatcher = class ProducerDispatcher extends EventDispatcher_1.EventDispatcher {
    dispatchers = [];
    constructor() {
        super();
    }
    register(dispatcher) {
        this.dispatchers.push(dispatcher);
    }
};
ProducerDispatcher = __decorate([
    decorators_1.EventSubscriber(),
    inversify_1.injectable()
], ProducerDispatcher);
exports.ProducerDispatcher = ProducerDispatcher;
