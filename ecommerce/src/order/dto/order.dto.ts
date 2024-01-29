import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { OrderStatus } from '../entity/orders';

export class UserOrderFromCart {
  @ApiProperty()
  @IsNotEmpty()
  cart_ids: string[];
}

export class UserOrderParam {
  @ApiProperty({
    nullable: true,
    required: false,
  })
  order_id: string;

  @ApiProperty({
    nullable: true,
    required: false,
  })
  order_status: OrderStatus;
}
