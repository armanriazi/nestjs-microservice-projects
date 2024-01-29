import { EntityRepository, Repository } from 'typeorm';
import { Orders, OrderStatus } from '../entity/orders';

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {
  FindUserOrderByParameters(
    orderId: string,
    orderStatus: OrderStatus,
  ): Promise<Orders[]> {
    let where = {};
    let conditions = {};
    if (orderId) {
      conditions = {
        order_id: orderId,
      };
    }
    if (orderStatus) {
      conditions = {
        ...conditions,
        order_status: orderStatus,
      };
    }

    if (Object.keys(conditions).length > 0) {
      where = {
        where: conditions,
      };
    }
    console.log(where);
    return this.find({
      where,
    });
  }
}
