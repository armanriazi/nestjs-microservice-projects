import { Order } from './Order';
export declare class User {
    id: string;
    username: string;
    email: string;
    displayName?: string;
    createdAt?: Date;
    updatedAt?: Date;
    orders: Order[];
}
