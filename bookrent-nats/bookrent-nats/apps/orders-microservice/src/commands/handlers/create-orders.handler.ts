import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrdersService } from '../../orders/orders.service';
import { CreateOrdersCommand, DeleteOrdersCommand } from '../impl';

@CommandHandler(CreateOrdersCommand)
export class CreateOrdersHandler
  implements ICommandHandler<CreateOrdersCommand>
{
  constructor(
    private readonly orderService: OrdersService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(createOrderCommand: CreateOrdersCommand) {
    console.log(clc.yellowBright('Async CreateOrdersCommand...'));
    const { userId } = createOrderCommand;

    const order = this.publisher.mergeObjectContext(
      await this.orderService.createOrder({
        userId,
        ...createOrderCommand,
      }),
    );
    order!.createOrder(userId);
    order!.commit();
    return order;
  }
}
@CommandHandler(DeleteOrdersCommand)
export class DeleteOrdersHandler
  implements ICommandHandler<DeleteOrdersCommand>
{
  constructor(private readonly orderService: OrdersService) {}

  async execute(deleteOrderCommand: DeleteOrdersCommand) {
    console.log(clc.yellowBright('Async DeleteOrdersCommand...'));
    return this.orderService.deleteOrder(deleteOrderCommand);
  }
}
