import { SequelizeModule } from '@nestjs/sequelize';
import dotenv from 'dotenv';
import { env } from 'process';
dotenv.config();

export const sequalizeConfig: SequelizeModule = {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: env.DATABASE_USERNAME,
  password: env.SQL_PASSWORD,
  database: 'node-complete',
  autoLoadModels: true,
  synchronize: true,
};
