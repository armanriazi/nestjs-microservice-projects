import { Order } from 'src/typeorm/entities/Order';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/CreateOrder.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class OrdersService {
    private ordersRepository;
    private natsClient;
    constructor(ordersRepository: Repository<Order>, natsClient: ClientProxy);
    delay(milliseconds: number, count: number): Promise<number>;
    createOrder({ userId, ...createOrderDto }: CreateOrderDto): Promise<Order>;
}
