import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../../events/impl/order-create.event';

export class OrderModel extends AggregateRoot {

  constructor(private readonly id: string) {
    super();
  }
  public createOrder(userId: string) {
    this.apply(new OrderCreatedEvent(this.id, userId));
  }
}
