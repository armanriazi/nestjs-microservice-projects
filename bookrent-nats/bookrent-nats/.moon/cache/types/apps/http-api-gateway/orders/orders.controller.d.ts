import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/CreateOrder.dto';
export declare class OrdersController {
    private natsClient;
    constructor(natsClient: ClientProxy);
    createOrder(createOrderDto: CreateOrderDto): Promise<{
        createdAt: string;
        updatedAt: string;
        bookname: string;
        bookstateType: import("./dto/CreateOrder.dto").BookStateType;
        userId: string;
        id: string;
    }>;
}
