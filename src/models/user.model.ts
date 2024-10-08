import { UserRole } from '../user/user-role.enum';
import {
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TaskModel } from './task.model';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Column
  username: string;

  @Column
  email: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  password: string;

  @Column
  role: UserRole;

  @HasMany(() => TaskModel)
  tasks: TaskModel[];
}
