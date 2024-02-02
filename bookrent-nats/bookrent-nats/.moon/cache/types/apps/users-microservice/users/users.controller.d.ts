import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { QueryBus } from '@nestjs/cqrs';
export declare class UsersMicroserviceController {
    private usersService;
    private readonly queryBus;
    constructor(usersService: UsersService, queryBus: QueryBus);
    findUserAll(): Promise<any>;
    getUserById(data: any): Promise<any>;
    createUser(data: CreateUserDto): Promise<import("../typeorm/entities/User").User>;
    orderCreated(data: any): void;
    createOrder(data: any): void;
    inQueueOrderCreated(data: any): void;
}
