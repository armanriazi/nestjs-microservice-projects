import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  userId: string;
}
