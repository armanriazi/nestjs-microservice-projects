import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserOrderFromCart, UserOrderParam } from 'src/order/dto/order.dto';
import { OrderService } from 'src/order/order.service';

@Controller('v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth('Authorization')
  @Get('')
  async GetUserOrder(@Query() query: UserOrderParam, @Param() param) {
    console.log(query);
    console.log(param);
    return this.orderService.GetUserOrder(query);
  }

  @ApiBearerAuth('Authorization')
  @Post('')
  async CreateOrderByUserCart(@Body() body: UserOrderFromCart, @Request() req) {
    const resp = await this.orderService.CreateOrderByUserCart(
      req.headers.token,
      body.cart_ids,
    );
    console.log(resp);
    if (resp === 'cart_is_empty') {
      throw new HttpException(resp, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return resp;
  }
}
