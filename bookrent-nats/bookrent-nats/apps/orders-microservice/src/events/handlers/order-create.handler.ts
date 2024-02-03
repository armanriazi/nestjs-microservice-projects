import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import * as clc from 'cli-color';
import { OrderCreatedEvent } from '../impl/order-create.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreateHandler implements IEventHandler<OrderCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(event: OrderCreatedEvent) {
    console.log(clc.greenBright('OrderCreatedEvent...'));
  }
}
