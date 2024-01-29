import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductsModule } from './external/products/products.module';
import { CartsModule } from './external/carts/carts.module';
import { MutexService } from './libraries/mutex/mutex.service';
import { MutexModule } from './libraries/mutex/mutex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.ROOT_DB_HOST,
      port: parseInt(process.env.ROOT_DB_PORT, 10),
      username: process.env.ROOT_DB_USER,
      password: process.env.ROOT_DB_PASS,
      database: process.env.ROOT_DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.ROOT_DB_AUTOSYNC === 'true',
    }),
    CacheModule.register(),
    OrderModule,
    ProductsModule,
    CartsModule,
    MutexModule,
  ],
  controllers: [],
  providers: [AppService, MutexService],
})
export class AppModule {}
