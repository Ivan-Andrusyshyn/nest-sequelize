import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { User } from 'src/models/user.model';
import { TaskModel } from 'src/models/task.model';

export const sequelizeConfig = [
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      dialect: configService.get('DB_DIALECT'),
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      models: [User, TaskModel],
      autoLoadModels: true,
      logging: console.log,
    }),
  }),
];
