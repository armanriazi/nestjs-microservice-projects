import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrdersService } from '../../orders/orders.service';
import { CreateOrdersCommand, DeleteOrdersCommand } from '../impl';

@CommandHandler(CreateOrdersCommand)
export class CreateOrdersHandler
  implements ICommandHandler<CreateOrdersCommand>
{
  constructor(private readonly orderService: OrdersService) {}

  async execute(createOrderCommand: CreateOrdersCommand) {
    console.log(clc.yellowBright('Async CreateOrdersCommand...'));
    return this.orderService.createOrder(createOrderCommand);
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
