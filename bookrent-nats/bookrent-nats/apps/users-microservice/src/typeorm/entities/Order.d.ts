import { User } from './User';
export declare enum BookStateType {
    RENTED = 0,
    QUEUE = 1,
    READY = 2
}
export declare class Order {
    id: number;
    bookname: string;
    bookstateType: BookStateType;
    user_id: User;
}
//# sourceMappingURL=Order.d.ts.map