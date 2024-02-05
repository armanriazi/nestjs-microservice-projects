import { Controller, Inject, Post, Body, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrder.dto';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {

    const order = await lastValueFrom(
      this.natsClient.send({ cmd: 'createOrder' }, createOrderDto),
    );               
    if (order) return {...order, ...createOrderDto};
    else throw new HttpException('Order Not Created', 404);     
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
