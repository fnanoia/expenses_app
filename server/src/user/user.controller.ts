import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateIncomeDto } from 'src/incomes/dto/create-income.dto';
import { CreateOutcomeDto } from 'src/outcomes/dto/create-outcome.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //metodos http
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Put(':id')
  async updateById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.userService.updateById(id, dto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.userService.deleteById(id);
  }

  @Delete()
  async deleteAll() {
    return await this.userService.deleteAll();
  }

  @Post(':id/income')
  async addIncome(
    @Param('id', ParseIntPipe) id: number,
    @Body() createIncomeDto: CreateIncomeDto,
  ) {
    return await this.userService.addIncome(id, createIncomeDto);
  }

  @Post(':id/outcome')
  async addOutcome(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOutcomeDto: CreateOutcomeDto,
  ) {
    return await this.userService.addOutcome(id, createOutcomeDto);
  }

  @Get(':id/incomes')
  async getIncomesByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getIncomesByUserId(id);
  }

  @Get(':id/outcomes')
  async getOutcomesByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getOutcomesByUserId(id);
  }

  @Get(':id/balance')
  async getBalance(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getBalanceByUserId(id);
  }

  @Get(':id/updateoperations')
  async updateOperationsById(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.updateValuesById(id);
  }
  
}
