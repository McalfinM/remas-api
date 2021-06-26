import { EventSubscriber } from "event-dispatch/decorators"
import { EventDispatcher } from "event-dispatch/EventDispatcher";
import { injectable } from "inversify";


@EventSubscriber()
@injectable()
export class ProducerDispatcher extends EventDispatcher {
    private dispatchers: EventDispatcher[] = [

    ]

    constructor() {
        super();
    }

    register(dispatcher: any) {
        this.dispatchers.push(dispatcher)
    }

}

