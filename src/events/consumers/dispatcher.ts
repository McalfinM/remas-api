import { EventSubscriber } from "event-dispatch/decorators"
import { EventDispatcher } from "event-dispatch/EventDispatcher";
import { injectable } from "inversify";
import SyncConsumer from "./sync/syncConsumer";


@EventSubscriber()
@injectable()
export class ConsumerDispatcher extends EventDispatcher{
    private dispatchers: EventDispatcher[] = []

    constructor(){
        super();
        this.register(new SyncConsumer)
    }

    register(dispatcher: any) {
        this.dispatchers.push(dispatcher)
    }

}

