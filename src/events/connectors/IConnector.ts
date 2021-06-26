import { KafkaMessage } from "kafkajs";

export interface IEvent {
    topic: string
    key?: string
    value: string
}

export interface ISubsCallbackParam {
    topic: string;
    partition: number;
    message: KafkaMessage;
}

export interface IConnector {
    publishEvent(event: IEvent): Promise<any>
    subscribeEvent(topic: string, callback: Function): Promise<any>
}