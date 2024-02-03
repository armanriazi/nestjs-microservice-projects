import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreateEvent } from '../../events/impl/order-create.event';

export enum BookStateType {
  RENTED,
  QUEUE,
  READY,
}

export class Order extends AggregateRoot {
  bookname: string;
  bookstateType: BookStateType;
  userId: string;
  constructor(private readonly id: string) {
    super();
  }
  public createOrder(userId: string) {
    this.apply(new OrderCreateEvent(this.id, userId));
  }
}
