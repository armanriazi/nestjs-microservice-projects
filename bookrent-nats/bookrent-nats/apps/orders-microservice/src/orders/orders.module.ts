import { Module } from '@nestjs/common';
import { OrdersMicroserviceController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/typeorm/entities/Order';
import { User } from 'src/typeorm/entities/User';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '../commands/handlers';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Order]),
    NatsClientModule,
    CqrsModule,
  ],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersService, ...CommandHandlers],
})
export class OrdersModule {}
