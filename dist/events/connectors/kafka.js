"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const inversify_1 = require("inversify");
let KafkaConnector = class KafkaConnector {
    kafkaClient;
    producerConnection;
    consumerConnection;
    _kafkaProducer;
    _kafkaConsumer;
    constructor() {
        this.kafkaClient = new kafkajs_1.Kafka({
            logLevel: kafkajs_1.logLevel.ERROR,
            clientId: `${process.env?.KAFKA_GROUP_ID ?? 'titip_paket_vehicle_service'}`,
            brokers: (process.env?.KAFKA_BROKERS ?? "localhost:9092").split(","),
        });
        this._kafkaProducer = this.kafkaClient.producer();
        this._kafkaConsumer = this.kafkaClient.consumer({ groupId: `${process.env?.KAFKA_GROUP_ID ?? 'titip_paket_vehicle_service_consumer_group'}` });
    }
    async kafkaProducer() {
        if (!this.producerConnection) {
            this.producerConnection = await new Promise((resolve) => { this._kafkaProducer.connect().then(() => resolve(this._kafkaProducer)); });
        }
        return this.producerConnection;
    }
    async kafkaConsumer() {
        if (!this.consumerConnection) {
            this.consumerConnection = await new Promise((resolve) => { this._kafkaConsumer.connect().then(() => resolve(this._kafkaConsumer)); });
        }
        return this.consumerConnection;
    }
    async publishEvent(event) {
        const producer = await this.kafkaProducer();
        console.log("publish event => ", event.topic);
        return;
        // return producer?.send({
        //     topic: event.topic,
        //     messages: [
        //         {
        //             key: event.key,
        //             value: event.value
        //         }
        //     ]
        // })
    }
    async subscribeEvent(topic, callback) {
        const consumer = await this.kafkaConsumer();
        if (consumer) {
            await consumer.subscribe({
                topic,
                fromBeginning: true,
            });
            await consumer.run({
                eachMessage: async (param) => callback(param)
            }).then(() => {
                console.log("subscribe event => ", topic);
            });
        }
        else {
            console.log("kafka not connected");
        }
    }
};
KafkaConnector = __decorate([
    inversify_1.injectable()
], KafkaConnector);
exports.default = KafkaConnector;
