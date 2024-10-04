import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequalizeConfig } from './config/sequalize.config';

@Module({
  imports: [
    TasksModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot(sequalizeConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
