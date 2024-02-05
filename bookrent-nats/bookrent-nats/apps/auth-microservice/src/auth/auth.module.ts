import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthMicroserviceController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { jwtConstants } from './constants';
import { NatsClientModule } from 'nats-client/nats-client.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    NatsClientModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthMicroserviceController],
  exports: [AuthService],
})
export class AuthModule {}
