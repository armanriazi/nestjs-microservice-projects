import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
export declare class UsersController {
    private natsClient;
    constructor(natsClient: ClientProxy);
    createUser(createUserDto: CreateUserDto): Promise<import("rxjs").Observable<any>>;
    getUserById(id: string): Promise<any>;
    findUserAll(): Promise<any>;
}
