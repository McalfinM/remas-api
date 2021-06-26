"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const inversify_config_1 = require("../../../inversify.config");
const types_1 = require("../../../types");
let SyncConsumer = class SyncConsumer extends event_dispatch_1.EventDispatcher {
    dispatcher;
    defaultNumChuck = 30;
    constructor() {
        super();
        this.dispatcher = inversify_config_1.container.get(types_1.TYPES.ProducerDispatcher);
    }
    splitToChunks(model, numChunk) {
        const anymodel = model;
        const chuck = [];
        var i, j, chunk = numChunk;
        for (i = 0, j = anymodel.length; i < j; i += chunk) {
            chuck.push(anymodel.slice(i, i + chunk));
        }
        return chuck;
    }
};
SyncConsumer = __decorate([
    event_dispatch_1.EventSubscriber()
], SyncConsumer);
exports.default = SyncConsumer;
