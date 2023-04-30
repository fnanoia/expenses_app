import { IncomeEntity, IncomeType, IncomeMethod } from '../income.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto extends IncomeEntity {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsEnum(IncomeType)
  income_type: IncomeType;

  @ApiProperty()
  @IsEnum(IncomeMethod)
  income_method: IncomeMethod;
  
  
}
