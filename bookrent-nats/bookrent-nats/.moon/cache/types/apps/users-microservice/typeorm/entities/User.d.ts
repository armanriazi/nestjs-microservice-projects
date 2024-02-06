import { Order } from './Order';
export declare class User {
    id: string;
    username: string;
    password: string;
    email?: string;
    displayName?: string;
    orders: Order[];
    createdAt?: Date;
    updatedAt?: Date;
    refreshToken?: string;
}
