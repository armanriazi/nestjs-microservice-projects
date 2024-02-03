import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrdersCommand, DeleteOrdersCommand } from 'src/commands/impl';
export declare class OrdersService {
    private ordersRepository;
    private natsClient;
    constructor(ordersRepository: Repository<Order>, natsClient: ClientProxy);
    delay(milliseconds: number, count: number): Promise<number>;
    createOrder({ userId, ...createOrderCmd }: CreateOrdersCommand): Promise<Order>;
    deleteOrder({ id }: DeleteOrdersCommand): Promise<number>;
}
