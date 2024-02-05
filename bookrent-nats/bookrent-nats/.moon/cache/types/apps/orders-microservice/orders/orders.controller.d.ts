import { ClientProxy } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateOrderDto } from '../orders/dtos/CreateOrder.dto';
import { OrderModel } from './models/order.model';
export declare class OrdersMicroserviceController {
    private natsClient;
    private readonly commandBus;
    constructor(natsClient: ClientProxy, commandBus: CommandBus);
    createOrder(data: CreateOrderDto): Promise<OrderModel>;
}
