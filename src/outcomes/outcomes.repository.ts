import { EntityRepository, Repository } from 'typeorm';
import { OutcomeEntity } from './outcome.entity';

@EntityRepository(OutcomeEntity)
export class OutcomesRepository extends Repository<OutcomeEntity> {}
