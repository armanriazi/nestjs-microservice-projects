import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../typeorm/entities/User';
import { Order } from '../typeorm/entities/Order';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from '../queries/handlers';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../auth/strategies/refreshToken.strategy';
import { jwtConstants } from '../auth/constants';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { AuthMicroserviceController } from 'src/auth/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' },
    }),
    TypeOrmModule.forFeature([User, Order]),
    CqrsModule,
  ],
  controllers: [UsersMicroserviceController, AuthMicroserviceController],
  providers: [
    UsersService,
    AuthService,
    ConfigService,
    JwtService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...QueryHandlers,
  ],
})
export class UsersModule {}
