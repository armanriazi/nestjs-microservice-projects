import { Order } from 'src/typeorm/entities/Order';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersCommand, DeleteOrdersCommand } from 'src/commands/impl';
export declare class OrdersService {
    private readonly ordersRepository;
    private natsClient;
    constructor(ordersRepository: OrdersRepository, natsClient: ClientProxy);
    createOrder({ userId, ...createOrderCmd }: CreateOrdersCommand): Promise<Order>;
    deleteOrder({ id }: DeleteOrdersCommand): Promise<any>;
}
