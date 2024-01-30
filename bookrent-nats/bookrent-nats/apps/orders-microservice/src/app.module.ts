import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './typeorm/entities/Order';
import { User } from './typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'bookrent',
      entities: [Order, User],
      synchronize: true,
      username: 'postgres',
      password: 'postgres',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
