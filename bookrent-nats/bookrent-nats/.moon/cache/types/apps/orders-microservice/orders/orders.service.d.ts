import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersCommand, DeleteOrdersCommand } from 'src/commands/impl';
import { OrderModel } from './models/order.model';
export declare class OrdersService {
    private readonly ordersRepository;
    private natsClient;
    constructor(ordersRepository: OrdersRepository, natsClient: ClientProxy);
    createOrder({ userId, ...createOrderCmd }: CreateOrdersCommand): Promise<OrderModel>;
    deleteOrder({ id }: DeleteOrdersCommand): Promise<any>;
}
