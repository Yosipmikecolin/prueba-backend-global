import { User } from 'src/auth/entities/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ default: 'active' })
  status: string;

  @OneToMany(() => User, (user) => user.program)
  users: User[];
}
