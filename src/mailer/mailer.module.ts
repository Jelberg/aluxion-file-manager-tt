import { Module } from '@nestjs/common';
import mailerConfig from './mailer.config';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './services/mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mailerConfig],
    }),
  ],
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}
