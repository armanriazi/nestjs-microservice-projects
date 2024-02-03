import { Repository } from 'typeorm';
import { Order } from '../typeorm/entities/Order';
import { User } from 'src/typeorm/entities/User';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(Order)
export class OrdersRepository extends Repository<Order> {
  //   delay(milliseconds: number, count: number): Promise<number> {
  //     return new Promise<number>((resolve) => {
  //       setTimeout(() => {
  //         resolve(count);
  //       }, milliseconds);
  //     });
  //   }
  async createOrder(
    bookName: string,
    bookstateType: number,
    user: User,
  ): Promise<Order> {
    // const rnd = randomInt(5, 20);

    // if (rnd > 3) {
    //   const { id, username, email, displayName, orders } =
    //     await lastValueFrom<User>(
    //       this.natsClient.send({ cmd: 'getUserById' }, { userId }),
    //     );
    //   const { bookname } = { ...createOrderCmd };

    //   console.log('---QUEUE---');

    //   const old_orders = [orders] as unknown as Array<CreateTransitionOrder>;
    //   {
    //     const finalCreatedTransitionOrder = new CreateTransitionOrder(bookname);
    //     const orders = old_orders
    //       ? old_orders.concat([finalCreatedTransitionOrder])
    //       : [{ finalCreatedTransitionOrder }];

    //     const result = await lastValueFrom<User>(
    //       this.natsClient.emit('inQueueOrderCreate', {
    //         id,
    //         username,
    //         email,
    //         displayName,
    //         orders,
    //       }),
    //     );
    //     console.log(result);
    //   }

    //   for (let i = 0; i < rnd; i++) {
    //     // await is converting Promise<number> into number
    //     await this.delay(rnd * 100, i);
    //   }
    //   console.log('\n-----------End of delay---------\n');
    // }

    const newOrder = this.create({
      bookname: bookName,
      bookstateType: bookstateType,
      user: user,
    });
    return await this.save(newOrder);
  }

  async deleteOrder(order: Order) {
    // const order = await lastValueFrom<Order>(
    //   this.natsClient.send({ cmd: 'getOrderById' }, { id }),
    // );
    // if (order) {
    //   const deletedOrder = this.ordersRepository.delete({
    //     order,
    //   });
    //   return this.ordersRepository.save(deletedOrder);
    // }
    return order;
  }
}
