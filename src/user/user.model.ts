import { UserRole } from './user-role.enum';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: UserRole;
}
