// config/mailer.config.ts
import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  secure: false, // Si utilizas SSL/TLS, cambia esto a 'true'
  auth: {
    user: '920a9dd4767ab2',
    pass: '82824d7f0dae81',
  },
}));
