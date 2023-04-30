import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IncomeEntity } from './income.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomesRepository: Repository<IncomeEntity>,
  ) {}

  //recibe el id del usuario, buscado anteriormente por el serv user
  async getIncomesByUserId(id:number) {
    const totalIncomes = await this.incomesRepository
      .createQueryBuilder('user_incomes')
      .select('SUM(user_incomes.amount)', 'total_amount')
      .where('user_incomes.userId = :userId', {userId: id})
      .getRawMany();

    return totalIncomes;
  }
}
