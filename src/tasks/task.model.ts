import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Task extends Model<Task> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;
}
