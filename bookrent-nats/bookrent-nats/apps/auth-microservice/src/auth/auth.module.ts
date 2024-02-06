import { Module } from '@nestjs/common';
import { AuthMicroserviceController } from './auth.controller';
import { NatsClientModule } from '../../nats-client/nats-client.module';
import { AuthService } from './auth.service';

@Module({
  imports: [NatsClientModule],
  providers: [AuthService],
  controllers: [AuthMicroserviceController],
  exports: [AuthService],
})
export class AuthModule {}
