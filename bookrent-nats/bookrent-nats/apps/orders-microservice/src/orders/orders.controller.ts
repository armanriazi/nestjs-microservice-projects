import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrdersCommand } from 'src/commands/impl';
import { CreateOrderDto } from '../orders/dtos/CreateOrder.dto';

@Controller()
export class OrdersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly commandBus: CommandBus,
  ) {}
  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(@Payload() data: CreateOrderDto) {
    const newOrder = await this.commandBus.execute(
      new CreateOrdersCommand(data.userId, data.bookname, data.bookstateType),
    );
    if (newOrder) this.natsClient.emit('orderCreated', newOrder);
    return newOrder;
  }
}
