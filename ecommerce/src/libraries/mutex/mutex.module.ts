import { Module } from '@nestjs/common';
import { MutexService } from './mutex.service';

@Module({
  exports: [MutexService],
  providers: [MutexService],
})
export class MutexModule {}
