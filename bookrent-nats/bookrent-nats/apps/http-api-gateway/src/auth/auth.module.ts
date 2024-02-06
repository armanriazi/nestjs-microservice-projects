import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { JwtAuthGuard } from './guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [NatsClientModule],
  controllers: [AuthController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
