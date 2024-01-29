import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AmqpService } from './amqp.service';

@Module({
  imports: [ConfigModule],
  exports: [AmqpService],
  providers: [AmqpService],
})
export class AmqpModule {}
