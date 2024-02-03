import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrdersCommand } from 'src/commands/impl';

@Controller()
export class OrdersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly commandBus: CommandBus,
  ) {}
  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(@Payload() data: { bookname; bookstateType; userId }) {
    console.log('\n----createOrderDto----\n');
    console.log(data);
    const newOrder = await this.commandBus.execute(
      new CreateOrdersCommand(data.bookname, data.bookstateType, data.userId),
    );
    console.log(data);
    console.log('\n----createOrderDto----\n');
    if (newOrder) this.natsClient.emit('orderCreated', newOrder);
  }
}
