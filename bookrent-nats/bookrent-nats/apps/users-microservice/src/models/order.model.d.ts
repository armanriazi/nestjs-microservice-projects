import { AggregateRoot } from '@nestjs/cqrs';
export declare class OrderModel extends AggregateRoot {
    private readonly id;
    updatedAt: Date;
    createdAt: Date;
    constructor(id: string, _createdAt: Date, _updatedAt: Date);
}
