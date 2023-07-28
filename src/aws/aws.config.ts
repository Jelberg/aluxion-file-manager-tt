import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
  host: 'smtp.example.com',
  port: 587,
  secure: false, // Si utilizas SSL/TLS, cambia esto a 'true'
  auth: {
    user: 'elbergjessica@gmail.com',
    pass: 'Winterfell2019',
  },
}));
