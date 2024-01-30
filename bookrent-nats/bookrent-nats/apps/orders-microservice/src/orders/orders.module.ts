import { Module } from '@nestjs/common';
import { OrdersMicroserviceController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User]), NatsClientModule],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersService],
})
export class OrdersModule {}