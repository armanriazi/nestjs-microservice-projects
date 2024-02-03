import { ClientProxy } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
export declare class OrdersMicroserviceController {
    private natsClient;
    private readonly commandBus;
    constructor(natsClient: ClientProxy, commandBus: CommandBus);
    createOrder(data: {
        bookname: any;
        bookstateType: any;
        userId: any;
    }): Promise<void>;
}
