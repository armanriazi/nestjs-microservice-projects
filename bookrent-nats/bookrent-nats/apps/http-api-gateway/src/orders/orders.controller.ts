import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    this.natsClient.emit('createOrder', createOrderDto);
  }
}
