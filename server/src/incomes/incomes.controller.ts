import { Controller, Get } from '@nestjs/common';
import { IncomesService } from './incomes.service';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}
/*
  @Get('total_test')
  async getTotalSumTest() {
    return this.incomesService.getIncomesSum();
  }*/
}
