import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//refactor
export enum IncomeType {
  SALARY = 'salary',
  INVERSION = 'inversion',
  DEBT = 'debt',
  SALE = 'sale',
  OTHER = 'other',
}

export enum IncomeMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
}

@Entity({ name: 'user_incomes' })
export class IncomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.incomes)
  user: UserEntity;

  //tipo de ganancia
  @Column({ type: 'enum', enum: IncomeType })
  income_type: IncomeType;

  //metodo
  @Column({ type: 'enum', enum: IncomeMethod })
  income_method: IncomeMethod;

}
