import { IsNumber, IsString } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  numberOfPurchases: number;
}
