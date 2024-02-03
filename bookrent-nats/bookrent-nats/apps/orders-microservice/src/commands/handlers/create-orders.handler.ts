import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { OrdersService } from '../../orders/orders.service';
import { CreateOrdersCommand } from '../impl';

@CommandHandler(CreateOrdersCommand)
export class CreateOrdersHandler
  implements ICommandHandler<CreateOrdersCommand>
{
  constructor(private readonly orderService: OrdersService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(createOrderCommand: CreateOrdersCommand) {
    console.log(clc.yellowBright('Async CreateOrdersCommand...'));
    return this.orderService.createOrder(createOrderCommand);
  }
}
