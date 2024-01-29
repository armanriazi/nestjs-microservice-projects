import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';

@Module({
  exports: [CartsService],
  providers: [CartsService],
})
export class CartsModule {}
