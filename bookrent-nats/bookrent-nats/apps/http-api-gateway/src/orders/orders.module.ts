import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { OrdersController } from './orders.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
