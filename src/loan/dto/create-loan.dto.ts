import { IsNumber } from 'class-validator';

export class CreateLoanDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  bookId: number;
}