import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './orders';

@Entity('orders_detail')
export class OrdersDetail {
  @PrimaryGeneratedColumn('uuid', { name: 'order_detail_id' })
  orders_detail_id: string;

  @ManyToOne((type) => Orders, (orders) => orders.order_id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  orders: Orders;

  @Column({ name: 'product_variant_id' })
  product_variant_id: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;
}
