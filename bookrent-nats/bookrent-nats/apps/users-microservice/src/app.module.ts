import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Order } from './typeorm/entities/Order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'bookrent',
      entities: [User, Order],
      synchronize: true,
      username: 'postgres',
      password: 'postgres',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
