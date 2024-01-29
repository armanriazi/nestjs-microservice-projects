import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrdersDetail } from './orders_detail';

export enum OrderStatus {
  PENDING = 'pending',
  SETTLEMENT = 'settlement',
  IN_DELIVERY = 'in_delivery',
  ARRIVED = 'arrived',
}

@Entity({ name: 'orders' })
export class Orders {
  @PrimaryGeneratedColumn('uuid', { name: 'order_id' })
  order_id: string;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({
    name: 'order_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  order_time: Date;

  @Column({ name: 'total_quantity' })
  total_quantity: number;

  @Column({ name: 'total_price' })
  total_price: number;

  @Column({ name: 'order_status', type: 'enum', enum: OrderStatus })
  order_status: string;

  @OneToMany((type) => OrdersDetail, (orderDetail) => orderDetail.orders)
  order_detail: OrdersDetail[];
}
