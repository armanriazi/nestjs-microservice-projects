import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { ClientProxy } from '@nestjs/microservices';
import { OrdersRepository } from './orders.repository';
import { CreateOrdersCommand, DeleteOrdersCommand } from 'src/commands/impl';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/typeorm/entities/User';
import { OrderModel } from './models/order.model';
import { CreateTransitionOrder } from './dtos/CreateTransitionOrder.dto';
import { randomInt } from 'crypto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(count);
      }, milliseconds);
    });
  }

  async createOrder({
    userId,
    ...createOrderCmd
  }: CreateOrdersCommand): Promise<OrderModel> {
    const user = await lastValueFrom<User>(
      this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    );

    const rnd = randomInt(0, 7);

    if (rnd > 3) {
      const { id, username, email, displayName, orders } =
        await lastValueFrom<User>(
          this.natsClient.send({ cmd: 'getUserById' }, { userId }),
        );
      const { bookname } = { ...createOrderCmd };

      console.log('\n---QUEUE---');

      const old_orders = [orders] as unknown as Array<CreateTransitionOrder>;
      {
        const finalCreatedTransitionOrder = new CreateTransitionOrder(bookname);
        const orders = old_orders
          ? old_orders.concat([finalCreatedTransitionOrder])
          : [{ finalCreatedTransitionOrder }];

        await lastValueFrom<User>(
          this.natsClient.emit('inQueueOrderCreate', {
            id,
            username,
            email,
            displayName,
            orders,
          }),
        );
      }

      for (let i = 0; i < rnd; i++) {
        // await is converting Promise<number> into number
        await this.delay(rnd * 100, i);
      }
      console.log('\n---End of delay---');
    }

    if (user) {
      const repoOrder: Order = await this.ordersRepository.createOrder(
        createOrderCmd.bookname,
        createOrderCmd.bookstateType,
        user,
      );

      const result: OrderModel = new OrderModel(
        repoOrder.id,
        repoOrder.createdAt,
        repoOrder.updatedAt,
      );
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
