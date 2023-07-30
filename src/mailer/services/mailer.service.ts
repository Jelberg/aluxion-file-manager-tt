import { Injectable, Inject } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import config from 'src/common/config';

@Injectable()
export class MailerService {
  private readonly mailerConfig: any;

  constructor(
    private readonly configService: ConfigService,
    @Inject(config.KEY) private conService: ConfigType<typeof config>,
  ) {}

  /**
   * Carga los datos para inicializar los envios de correo
   * @returns
   */
  mailerInfo() {
    return {
      host: this.conService.mail.host,
      port: this.conService.mail.port,
      secure: this.conService.mail.secure,
      auth: {
        user: this.conService.mail.auth.user,
        pass: this.conService.mail.auth.pass,
      },
    };
  }

  /**
   * Envia correo
   * @param to
   * @param subject
   * @param text
   */
  async sendEmail(to: string, subject: string, text: string): Promise<void> {
    const info = this.mailerInfo();
    const transporter = nodemailer.createTransport(info);
    const mailOptions = {
      from: info.auth.user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  }
}
