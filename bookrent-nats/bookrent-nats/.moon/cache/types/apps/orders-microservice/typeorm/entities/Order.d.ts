import { User } from './User';
export declare enum BookStateType {
    RENTED = 0,
    QUEUE = 1,
    READY = 2
}
export declare class Order {
    id: string;
    bookname: string;
    bookstateType: BookStateType;
    createdAt?: Date;
    updatedAt?: Date;
    user: User;
}
