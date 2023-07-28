import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailDto } from '../../auth/dtos/email.dto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly mailerConfig: any;

  constructor(private readonly configService: ConfigService) {
    this.mailerConfig = this.configService.get('mailer');
  }

  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const transporter = nodemailer.createTransport(this.mailerConfig);

    const mailOptions = {
      from: this.mailerConfig.auth.user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }
}
