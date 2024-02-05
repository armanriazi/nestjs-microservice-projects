import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule,UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
