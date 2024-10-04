import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  username: string;

  @Column
  email: number;

  @Column
  password: string;
}
