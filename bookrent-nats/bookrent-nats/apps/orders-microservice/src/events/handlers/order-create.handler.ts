import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { OrderCreateEvent } from '../impl/order-create.event';

@EventsHandler(OrderCreateEvent)
export class OrderCreateHandler implements IEventHandler<OrderCreateEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: OrderCreateEvent) {
    console.log(clc.greenBright('OrderCreateEvent...'));
  }
}
