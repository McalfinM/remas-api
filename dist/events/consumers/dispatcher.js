"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerDispatcher = void 0;
const decorators_1 = require("event-dispatch/decorators");
const EventDispatcher_1 = require("event-dispatch/EventDispatcher");
const inversify_1 = require("inversify");
const syncConsumer_1 = __importDefault(require("./sync/syncConsumer"));
let ConsumerDispatcher = class ConsumerDispatcher extends EventDispatcher_1.EventDispatcher {
    dispatchers = [];
    constructor() {
        super();
        this.register(new syncConsumer_1.default);
    }
    register(dispatcher) {
        this.dispatchers.push(dispatcher);
    }
};
ConsumerDispatcher = __decorate([
    decorators_1.EventSubscriber(),
    inversify_1.injectable()
], ConsumerDispatcher);
exports.ConsumerDispatcher = ConsumerDispatcher;
