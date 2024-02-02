import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { Order } from 'src/typeorm/entities/Order';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from '../queries/handlers';
@Module({
  imports: [TypeOrmModule.forFeature([User, Order]), CqrsModule],
  controllers: [UsersMicroserviceController],
  providers: [UsersService, ...QueryHandlers],
})
export class UsersModule {}
