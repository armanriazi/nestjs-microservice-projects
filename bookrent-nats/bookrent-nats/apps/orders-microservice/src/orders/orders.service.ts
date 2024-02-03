import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersCommand, DeleteOrdersCommand } from 'src/commands/impl';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';
import { OrderModel } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}
  async createOrder({
    userId,
    ...createOrderCmd
  }: CreateOrdersCommand): Promise<OrderModel> {
    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    );

    if (user) {
      const repoOrder: Order = await this.ordersRepository.createOrder(
        createOrderCmd.bookname,
        createOrderCmd.bookstateType,
        user,
      );

      const result: OrderModel = new OrderModel(repoOrder.id);
      return result;
    }
    return null;
  }

  async deleteOrder({ id }: DeleteOrdersCommand) {
    const order = await lastValueFrom<Order>(
      this.natsClient.send({ cmd: 'getOrderById' }, { id }),
    );
    if (order) {
      const deletedOrder = (await this.ordersRepository.delete(order)).raw();
      return this.ordersRepository.save(deletedOrder);
    }
    return id;
  }
}
