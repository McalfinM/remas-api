import { IConnector, ISubsCallbackParam } from "./connectors/IConnector";
import { EventDispatcher, EventDispatcher as EventDispatcherInterface } from 'event-dispatch';
import { events, subscriptions } from "./events";
import { injectable,inject } from "inversify";
import { TYPES } from "../types";


@injectable()
class Subscribers {

    constructor(@inject(TYPES.Connector) private connector: IConnector,
    @inject(TYPES.ConsumerDispatcher) private dispatcher: EventDispatcher
    ){
        subscriptions.forEach(eventName => {
            this.subscribeEvent(eventName)
        })
    }
    
    private async subscribeEvent(eventName:string) {
        this.connector.subscribeEvent(eventName, (data:ISubsCallbackParam)=> {
            
            // Subscribe dispatcher
            console.log("received event =>", data.topic)
            this.dispatcher.dispatch(`get ${data.topic}`, JSON.parse(data.message.value ? data.message.value.toString() : '{}'));
        })
    }
}

export default Subscribers