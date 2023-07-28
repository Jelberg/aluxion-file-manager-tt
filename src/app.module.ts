import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './common/enviroments';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';

import config from './common/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_SECRET: Joi.string().required(),
        AWS_KEY: Joi.string().required(),
        AWS_BUCKET: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        API_KEY: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        API_KEY_RECOVERY: Joi.string().required(),
        JWT_SECRET_RECOVERY: Joi.string().required(),
      }),
    }),
    UsersModule,
    FilesModule,
    DatabaseModule,
    AuthModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
