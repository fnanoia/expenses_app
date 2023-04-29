import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { IncomeEntity } from 'src/incomes/income.entity';
import { OutcomeEntity } from 'src/outcomes/outcome.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, IncomeEntity, OutcomeEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
