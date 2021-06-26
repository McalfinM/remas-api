import { EventDispatcher, EventSubscriber, On } from 'event-dispatch';
import { container } from '../../../inversify.config';
import { TYPES } from '../../../types';
import { events } from '../../events';


@EventSubscriber()
class SyncConsumer extends EventDispatcher {

  private dispatcher: EventDispatcher
  private defaultNumChuck = 30

  constructor() {
    super()
    this.dispatcher = container.get<EventDispatcher>(TYPES.ProducerDispatcher)
  }

  private splitToChunks<T>(model: T, numChunk: number): T[] {
    const anymodel = <any>model
    const chuck: T[] = []
    var i, j, chunk = numChunk;
    for (i = 0, j = anymodel.length; i < j; i += chunk) {
      chuck.push(anymodel.slice(i, i + chunk))
    }
    return chuck
  }

}

export default SyncConsumer