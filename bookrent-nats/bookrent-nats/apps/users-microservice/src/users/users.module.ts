import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersMicroserviceController } from './users.controller';
import { UsersService } from './users.service';
import { User } from 'src/typeorm/entities/User';
import { Order } from 'src/typeorm/entities/Order';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order])],
  controllers: [UsersMicroserviceController],
  providers: [UsersService],
})
export class UsersModule {}
