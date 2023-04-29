import { EntityRepository, Repository } from 'typeorm';
import { IncomeEntity } from './income.entity';

@EntityRepository(IncomeEntity)
export class IncomesRepository extends Repository<IncomeEntity> {}
