import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  bookname: string;

  @IsNotEmpty()
  userId: string;
}
