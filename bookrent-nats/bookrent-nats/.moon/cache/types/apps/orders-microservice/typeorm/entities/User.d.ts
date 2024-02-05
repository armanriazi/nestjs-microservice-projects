import { Order } from './Order';
export declare class User {
    id: string;
    username: string;
    password: string;
    email: string;
    displayName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    orders: Order[];
}
