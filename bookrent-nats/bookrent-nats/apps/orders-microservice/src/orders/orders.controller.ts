import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersMicroserviceController {
  constructor(
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    private ordersService: OrdersService,
  ) {}
  @EventPattern('createOrder')
  async createOrder(@Payload() createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    const newOrder = await this.ordersService.createOrder(createOrderDto);
    if (newOrder) this.natsClient.emit('orderCreated', newOrder);
  }
}
