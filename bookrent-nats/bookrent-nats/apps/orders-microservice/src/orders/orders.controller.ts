import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrdersCommand } from 'src/commands/impl';
import { CreateOrderDto } from '../orders/dtos/CreateOrder.dto';
import { OrderModel } from './models/order.model';

@Controller()
export class OrdersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private readonly commandBus: CommandBus,
    //private readonly queryBus: QueryBus,
  ) {}
  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(@Payload() data: CreateOrderDto): Promise<OrderModel> {
    const newOrder: OrderModel = await this.commandBus.execute(
      new CreateOrdersCommand(data.userId, data.bookname, data.bookstateType),
    );

    if (newOrder) this.natsClient.emit('orderCreated', newOrder);

    return newOrder;
  }
  // @Get()
  // async find() {
  //   return this.queryBus.execute(new ListTaskQuery());
  // }

  // @Get(':id')
  // async findById(@Param('id') id: number) {
  //   return this.queryBus.execute(new ListByIdTaskQuery(id));
  // }

  // @Patch(':id/completed/:completed')
  // async updateByCompleted(
  //   @Param('id') id: number,
  //   @Param('completed') completed: boolean,
  // ) {
  //   return this.commandBus.execute(new UpdateByCompletedCommand(id, completed));
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: number) {
  //   return this.commandBus.execute(new DeleteTaskCommand(id));
  //}
}
