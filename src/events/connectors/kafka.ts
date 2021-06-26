import { Consumer, Kafka, KafkaMessage, logLevel, Producer } from "kafkajs"
import { IEvent } from "./IConnector"
import { injectable, decorate } from "inversify";

@injectable()
class KafkaConnector {
    public kafkaClient: Kafka
    private producerConnection?: Producer
    private consumerConnection?: Consumer
    private _kafkaProducer: Producer
    private _kafkaConsumer: Consumer

    constructor() {

        this.kafkaClient = new Kafka({
            logLevel: logLevel.ERROR,
            clientId: `${process.env?.KAFKA_GROUP_ID ?? 'titip_paket_vehicle_service'}`,
            brokers: (process.env?.KAFKA_BROKERS ?? "localhost:9092").split(","),
        })

        this._kafkaProducer = this.kafkaClient.producer()
        this._kafkaConsumer = this.kafkaClient.consumer({ groupId: `${process.env?.KAFKA_GROUP_ID ?? 'titip_paket_vehicle_service_consumer_group'}` })
    }

    async kafkaProducer(): Promise<Producer | undefined> {

        if (!this.producerConnection) {
            this.producerConnection = await new Promise((resolve) => { this._kafkaProducer.connect().then(() => resolve(this._kafkaProducer)) })
        }

        return this.producerConnection
    }

    async kafkaConsumer(): Promise<Consumer | undefined> {

        if (!this.consumerConnection) {
            this.consumerConnection = await new Promise((resolve) => { this._kafkaConsumer.connect().then(() => resolve(this._kafkaConsumer)) })
        }

        return this.consumerConnection
    }

    async publishEvent(event: IEvent): Promise<any> {

        const producer = await this.kafkaProducer()
        console.log("publish event => ", event.topic)

        return
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

    async subscribeEvent(topic: string, callback: any): Promise<any> {

        const consumer = await this.kafkaConsumer()
        if (consumer) {
            await consumer.subscribe({
                topic,
                fromBeginning: true,
            })

            await consumer.run({
                eachMessage: async (param) => callback(param)
            }).then(() => {
                console.log("subscribe event => ", topic)
            })

        } else {
            console.log("kafka not connected")
        }

    }
}

export default KafkaConnector
