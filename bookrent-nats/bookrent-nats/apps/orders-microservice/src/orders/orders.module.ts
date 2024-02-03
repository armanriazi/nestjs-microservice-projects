import { Module } from '@nestjs/common';
import { OrdersMicroserviceController } from './orders.controller';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { OrdersService } from './orders.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from '../commands/handlers';
import { OrdersRepository } from './orders.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [
    //TypeOrmModule.forFeature([User, OrdersRepository]),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   entities: [User, Order],
    // }),
    TypeOrmExModule.forCustomRepository([OrdersRepository]),
    NatsClientModule,
    CqrsModule,
  ],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersService, ...CommandHandlers],
})
export class OrdersModule {}
