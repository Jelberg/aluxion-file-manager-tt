import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      db: process.env.POSTGRES_DB,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      password: process.env.POSTGRES_PASSWORD,
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
    },
    aws: {
      key: process.env.AWS_KEY,
      bucket: process.env.AWS_BUCKET,
      secret: process.env.AWS_SECRET,
    },
    api: {
      key: process.env.API_KEY,
      jwtSecret: process.env.JWT_SECRET,
      keyRecovery: process.env.API_KEY_RESET,
      jwtSecretReset: process.env.JWT_SECRET_RESET,
    },
    mail: {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    },
  };
});
