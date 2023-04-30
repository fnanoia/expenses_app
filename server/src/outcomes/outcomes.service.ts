import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OutcomeEntity } from './outcome.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OutcomesService {
  constructor(
    @InjectRepository(OutcomeEntity)
    private outcomesRepository: Repository<OutcomeEntity>,
  ) {}
}
