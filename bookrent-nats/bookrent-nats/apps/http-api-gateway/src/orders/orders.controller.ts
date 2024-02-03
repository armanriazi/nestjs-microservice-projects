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

    const id =(order as CreateOrderDto).id;
    const createdAt =(order as CreateOrderDto).createdAt;
    const updatedAt =(order as CreateOrderDto).updatedAt;
    if (order) return {id, ...createOrderDto, createdAt,updatedAt};
    else throw new HttpException('Order Not Created', 404);     
  }
}
