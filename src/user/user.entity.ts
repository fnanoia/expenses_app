import { IncomeEntity } from 'src/incomes/income.entity';
import { OutcomeEntity } from 'src/outcomes/outcome.entity';
import {
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

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => IncomeEntity, (income) => income.user)
  @JoinColumn()
  incomes: IncomeEntity[];

  @OneToMany(() => OutcomeEntity, (outcome) => outcome.user)
  @JoinColumn()
  outcomes: OutcomeEntity[];

  @Column()
  test: string;
}
