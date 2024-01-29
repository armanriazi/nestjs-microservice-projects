import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { CartsFromExternal } from 'src/external/carts/cart.dto';
import { CartsService } from 'src/external/carts/carts.service';
import { ProductsService } from 'src/external/products/products.service';
import { getConnection, In } from 'typeorm';
import { UserOrderParam } from './dto/order.dto';
import { Orders, OrderStatus } from './entity/orders';
import { OrdersDetail } from './entity/orders_detail';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersDetailRepository } from './repository/orders_detail.repository';
import { MutexService } from 'src/libraries/mutex/mutex.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrdersRepository)
    private readonly ordersRepository: OrdersRepository,
    @InjectRepository(OrdersDetailRepository)
    private readonly ordersDetailRepository: OrdersDetailRepository,
    private readonly cartService: CartsService,
    private readonly productService: ProductsService,
    private readonly mutex: MutexService,
  ) {}

  async GetUserOrder(param: UserOrderParam): Promise<Orders[]> {
    console.log(param);
    return this.ordersRepository.FindUserOrderByParameters(
      param.order_id,
      param.order_status,
    );
  }

  async CreateOrderByUserCart(
    auth: string,
    cartIds: string[],
  ): Promise<string> {
    const userCarts = await this.cartService.GetUserCartByCartIds(
      auth,
      cartIds,
    );

    if (userCarts.data.length === 0) {
      return 'cart_is_empty';
    }

    const productVariantIds = userCarts.data.map(
      (data) => data.product_variant_id,
    );

    const mutex = this.mutex.NewMutex();

    const result = await mutex.runExclusive(async () => {
      // first add new order
      // get a connection and create a new query runner
      const connection = getConnection();
      const queryRunner = connection.createQueryRunner();

      // establish real database connection using our new query runner
      await queryRunner.connect();

      await queryRunner.startTransaction();

      try {
        const order = new Orders();
        order.user_id = userCarts.data[0].user_id;
        order.total_quantity = userCarts.data.reduce(
          (prevVal: number, curVal: CartsFromExternal) =>
            (prevVal += curVal.quantity),
          0,
        );
        order.total_price = userCarts.data.reduce(
          (prevVal: number, curVal: CartsFromExternal) =>
            (prevVal += curVal.price),
          0,
        );
        order.order_status = OrderStatus.PENDING;
        const newOrder = await queryRunner.manager.save(order);

        const orderDetails: OrdersDetail[] = [];

        for (const cart of userCarts.data) {
          const orderDetail = new OrdersDetail();
          orderDetail.price = cart.price;
          orderDetail.quantity = cart.quantity;
          orderDetail.product_variant_id = cart.product_variant_id;
          orderDetail.orders = newOrder;
          orderDetails.push(orderDetail);
        }
        order.order_detail = orderDetails;

        await queryRunner.manager.save(orderDetails);

        // delete user cart after save data order
        if (cartIds.length > 1) {
          await this.cartService.DeleteBulkUserCart(auth, cartIds);
        } else {
          await this.cartService.DeleteUserCart(auth, cartIds[0]);
        }
        // patch product quantity after save data order
        await this.productService.PatchProductVariantStockByVariantId(
          auth,
          userCarts.data,
        );
        await this.productService.CommitPatchProductVariantStockByVariantId(
          auth,
        );
        await this.cartService.CommitDeleteUserCart(auth);
        await queryRunner.commitTransaction();
        console.log('order - success');
        return 'success make order';
      } catch (e) {
        console.log('order - failed');
        console.log(e.message);
        await queryRunner.rollbackTransaction();
        await this.cartService.RollbackUserCart(auth);
        await this.productService.RollbackPatchProductVariantStockByVariantId(
          auth,
        );
        return 'failed make order';
      } finally {
        await queryRunner.release();
      }
    });

    return result;
  }
}
