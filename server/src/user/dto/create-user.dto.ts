import { IsEmail, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class CreateUserDto extends UserEntity {
  //agregar decorador de swagger
  @ApiProperty()
  @IsString()
  @Length(5, 20)
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20)
  password: string;

  @ApiProperty()
  @IsNumber()
  initial_budget: number;
}
