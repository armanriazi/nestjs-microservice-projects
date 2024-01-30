import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { OrdersService } from './orders.service';
export declare class OrdersMicroserviceController {
    private natsClient;
    private ordersService;
    constructor(natsClient: ClientProxy, ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto): Promise<void>;
}
//# sourceMappingURL=orders.controller.d.ts.map