import { UserEntity } from 'src/user/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  //tipo de gastos
}
