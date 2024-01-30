import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
