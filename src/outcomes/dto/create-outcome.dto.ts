import { OutcomeEntity, OutcomeMethod, OutcomeType } from '../outcome.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateOutcomeDto extends OutcomeEntity {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsEnum(OutcomeType)
  outcome_type: OutcomeType;

  @ApiProperty()
  @IsEnum(OutcomeMethod)
  outcome_method: OutcomeMethod;

}
