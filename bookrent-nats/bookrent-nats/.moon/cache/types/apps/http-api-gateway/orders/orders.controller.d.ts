import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrder.dto';
export declare class OrdersController {
    private natsClient;
    constructor(natsClient: ClientProxy);
    createOrder(createOrderDto: CreateOrderDto): void;
}
