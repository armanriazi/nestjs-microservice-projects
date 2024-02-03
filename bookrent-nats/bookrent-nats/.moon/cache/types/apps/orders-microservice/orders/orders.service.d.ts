import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrdersCommand } from 'src/commands/impl';
export declare class OrdersService {
    private ordersRepository;
    private natsClient;
    constructor(ordersRepository: Repository<Order>, natsClient: ClientProxy);
    delay(milliseconds: number, count: number): Promise<number>;
    createOrder({ userId, ...createOrderDto }: CreateOrdersCommand): Promise<Order>;
}
