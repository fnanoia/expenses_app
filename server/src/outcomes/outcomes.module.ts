import { Module } from '@nestjs/common';
import { OutcomesService } from './outcomes.service';
import { OutcomesController } from './outcomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutcomeEntity } from './outcome.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OutcomeEntity])],
  controllers: [OutcomesController],
  providers: [OutcomesService],
  exports: [OutcomesService],
})
export class OutcomesModule {}
