import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

//refactor
export  enum OutcomeType {
  TAX = 'tax',
  FOOD = 'food',
  DEBT = 'debt',
  OTHER = 'other',
}

export enum OutcomeMethod {
  CASH = 'cash',
  DEBIT_CARD = 'debit_card',
  CREDIT_CARD = 'credit_card',
}

@Entity({ name: 'user_outcomes' })
export class OutcomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: false })
  amount: number;

  @ManyToOne(() => UserEntity, (user) => user.incomes)
  user: UserEntity;

  //tipo de gastos
  @Column({ type: 'enum', enum: OutcomeType })
  outcome_type: OutcomeType;

  //metodo
  @Column({ type: 'enum', enum: OutcomeMethod })
  outcome_method: OutcomeMethod;
}
