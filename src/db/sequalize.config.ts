import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { ConfigService } from '@nestjs/config';
import { TaskModel } from 'src/models/task.model';

export const sequelizeConfig = [
  SequelizeModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: 'mysql',
      host: configService.get('DATABASE_HOST'),
      port: +configService.get<number>('DATABASE_PORT'),
      username: configService.get('DATABASE_USERNAME'),
      password: configService.get('SQL_PASSWORD'),
      database: configService.get('DATABASE_NAME'),
      models: [User, TaskModel],
      autoLoadModels: true,
      logging: console.log,
    }),
  }),
];
