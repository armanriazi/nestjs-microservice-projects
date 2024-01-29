import { Injectable } from '@nestjs/common';
import { Mutex } from 'async-mutex';

@Injectable()
export class MutexService {
  NewMutex(): Mutex {
    return new Mutex();
  }
}
