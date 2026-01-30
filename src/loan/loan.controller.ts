import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

 @Post('borrow')
borrow(@Body() dto: CreateLoanDto) {
  console.log('DTO MASUK:', dto);
  return this.loanService.borrow(dto);
}


  // PATCH /loan/return/:id
  @Patch('return/:id')
  returnBook(@Param('id') id: string) {
    return this.loanService.returnBook(Number(id));
  }

  // GET /loan/user/:userId
  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.loanService.findByUser(Number(userId));
  }

  // GET /loan/active
  @Get('active')
  findActive() {
    return this.loanService.findActive();
  }
}
