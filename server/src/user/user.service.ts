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
    //const user = await this.findById(id);
    //await this.userRepository.delete(user);
    //return { message: 'user deleted successfully' };
  }

  async deleteAll(): Promise<any> {
    //await this.outcomesRepository.delete({})
    //await this.incomesRepository.delete({})
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
    await this.incomesRepository.save(newIncome);

    //update table
    return await this.updateValuesById(id);
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
    await this.outcomesRepository.save(newOutcome);

    //actualizar valores de tablas
    return await this.updateValuesById(id);
  }

  ///////////////////
  //metodos de calculos
  //suma de ingresos
  async getIncomesByUserId(id: number) {
    const totalIncomes = await this.userRepository
      .createQueryBuilder('users')
      .leftJoin('users.incomes', 'user_incomes')
      .select('SUM(user_incomes.amount)', 'total_incomes')
      .where('user_incomes.userId = :userId', { userId: id })
      .getRawOne();

    return totalIncomes;
  }

  //suma de egresos
  async getOutcomesByUserId(id: number) {
    const totalOutcomes = await this.userRepository
      .createQueryBuilder('users')
      .leftJoin('users.outcomes', 'user_outcomes')
      .select('SUM(user_outcomes.amount)', 'total_outcomes')
      .where('user_outcomes.userId = :userId', { userId: id })
      .getRawOne();

    return totalOutcomes;
  }

  //balance
  async getBalanceByUserId(id: number) {
    const { initial_budget, total_incomes, total_outcomes } =
      await this.userRepository.findOne({ where: { id: id } });

    const balance = initial_budget + total_incomes - total_outcomes;

    return { balance: balance };
  }

  //////////////////////////
  //actualizar todos los valores
  async updateValuesById(id: number): Promise<void> {
    //update numbers
    const { total_incomes } = await this.getIncomesByUserId(id);
    const { total_outcomes } = await this.getOutcomesByUserId(id);
    const { balance } = await this.getBalanceByUserId(id);
    const updateUserOperations = { total_incomes, total_outcomes, balance };

    await this.userRepository.update(id, updateUserOperations);
  }
}
