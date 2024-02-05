import { Repository } from 'typeorm';
import { Order } from '../typeorm/entities/Order';
import { User } from 'src/typeorm/entities/User';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';

@CustomRepository(Order)
export class OrdersRepository extends Repository<Order> {
  async createOrder(
    bookName: string,
    bookstateType: number,
    user: User,
  ): Promise<Order> {
    const newOrder = this.create({
      bookname: bookName,
      bookstateType: bookstateType,
      user: user,
    });
    const result = await this.save(newOrder);

    return result;
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
