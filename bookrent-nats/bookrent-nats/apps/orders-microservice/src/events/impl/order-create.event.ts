import { OrderModel } from 'src/orders/models/order.model';

export class OrderCreatedEvent {
  constructor(
    public readonly order: OrderModel,
    public readonly userId: string,
  ) {}
}
