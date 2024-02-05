import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { QueryBus } from '@nestjs/cqrs';
import { OrderModel } from '../models/order.model';
export declare class UsersMicroserviceController {
    private usersService;
    private readonly queryBus;
    private dataInqueue;
    constructor(usersService: UsersService, queryBus: QueryBus);
    findUserAll(): Promise<any>;
    getUserById(data: any): Promise<any>;
    createUser(data: CreateUserDto): Promise<import("../typeorm/entities/User").User>;
    orderCreated(data: any): void;
    inQueueOrderCreate(data: OrderModel): void;
    authSignined(data: any): void;
}
