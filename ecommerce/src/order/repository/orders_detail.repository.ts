import { EntityRepository, Repository } from 'typeorm';
import { OrdersDetail } from '../entity/orders_detail';

@EntityRepository(OrdersDetail)
export class OrdersDetailRepository extends Repository<OrdersDetail> {}
