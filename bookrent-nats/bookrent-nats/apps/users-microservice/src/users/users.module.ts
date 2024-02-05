import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../typeorm/entities/User';
import { Order } from '../typeorm/entities/Order';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from '../queries/handlers';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([User, Order]), CqrsModule],
  controllers: [UsersMicroserviceController],
  providers: [JwtService, UsersService, ...QueryHandlers],
})
export class UsersModule {}
