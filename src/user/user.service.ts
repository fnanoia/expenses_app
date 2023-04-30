import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from 'src/incomes/dto/create-income.dto';
import { IncomeEntity } from 'src/incomes/income.entity';
import { CreateOutcomeDto } from 'src/outcomes/dto/create-outcome.dto';
import { OutcomeEntity } from 'src/outcomes/outcome.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(IncomeEntity)
    private incomesRepository: Repository<IncomeEntity>,
    @InjectRepository(OutcomeEntity)
    private outcomesRepository: Repository<OutcomeEntity>,
  ) {}

  //metodos para interactuar con la bbdd
  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      relations: ['incomes', 'outcomes'],
    });
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });

    if (!user) {
      throw new NotFoundException({ message: 'user not found' });
    }
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new NotFoundException({ message: 'user not found' });
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userRepository.create(createUserDto);

    await this.userRepository.save(user);
    return { message: 'user created succesfully' };
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.findById(id);

    const newUser: UpdateUserDto = {
      email: updateUserDto.email ? updateUserDto.email : user.email,
      password: updateUserDto.password ? updateUserDto.password : user.password,
      initial_budget: updateUserDto.initial_budget
        ? updateUserDto.initial_budget
        : user.initial_budget,
    };

    await this.userRepository.update(id, newUser);
    return { message: 'user updated successfully' };
  }

  async deleteById(id: number): Promise<any> {
    const user = await this.findById(id);
    await this.userRepository.delete(user);
    return { message: 'user deleted successfully' };
  }

  async deleteAll(): Promise<any> {
    //await this.outcomesRepository.delete({})
    await this.incomesRepository.delete({})
    //await this.userRepository.delete({})
  }

  //metodos para agregar INCOMES, OUTCOMES
  async addIncome(id: number, createIncomeDto: CreateIncomeDto) {
    const user = await this.findById(id);
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //crear income y relacionarlo con user
    const newIncome = this.incomesRepository.create({
      ...createIncomeDto,
      user,
    });

    //guardar y retornar incomes
    return this.incomesRepository.save(newIncome);
  }

  async addOutcome(id: number, createOutcomeDto: CreateOutcomeDto) {
    const user = await this.findById(id);
    if (!user) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //crear outcome y relacionarlo con user
    const newOutcome = this.outcomesRepository.create({
      ...createOutcomeDto,
      user,
    });

    //guardar y retornar outcomes
    return this.outcomesRepository.save(newOutcome);
  }

  //metodos de calculos
  //suma de ingresos
  async getIncomesByUserId(id: number): Promise<any> {
    const totalIncomes = await this.incomesRepository
      .createQueryBuilder('user_incomes')
      .select('SUM(user_incomes.amount)', 'total_amount')
      .where('user_incomes.userId = :userId', { userId: id })
      .getRawOne();

    return totalIncomes.total_amount;
  }

  //suma de egresos
  async getOutcomesByUserId(id: number): Promise<any> {
    const totalOutcomes = await this.outcomesRepository
      .createQueryBuilder('user_outomes')
      .select('SUM(user_outomes.amount)', 'total_amount')
      .where('user_outomes.userId = :userId', { userId: id })
      .getRawOne();

    return totalOutcomes.total_amount;
  }

  //balance
  async getBalanceByUserId(id: number) {
    const userBudget = (await this.findById(id)).initial_budget;

    const incomes = parseFloat(await this.getIncomesByUserId(id));
    const outcomes = parseFloat(await this.getOutcomesByUserId(id));

    //calcular presupuesto incial mas ingresos menos gastos
    const totalSum = userBudget + incomes - outcomes;

    return totalSum;
  }
}
