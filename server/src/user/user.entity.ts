import { IncomeEntity } from 'src/incomes/income.entity';
import { OutcomeEntity } from 'src/outcomes/outcome.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

//nombre de la tabla
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '20', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: '20', nullable: false })
  password: string;

  @OneToMany(() => IncomeEntity, (income) => income.user)
  @JoinColumn()
  incomes: IncomeEntity[];

  @OneToMany(() => OutcomeEntity, (outcome) => outcome.user)
  @JoinColumn()
  outcomes: OutcomeEntity[];

  @Column({ type: 'int', nullable: false })
  initial_budget: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'float', nullable: true })
  total_incomes: number;

  @Column({ type: 'float', nullable: true })
  total_outcomes: number;

  @Column({ type: 'float', nullable: true })
  balance: number;

}
