import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Order } from './typeorm/entities/Order';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [User, Order],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
