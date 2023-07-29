import { Module, Inject } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { AuthService } from './services/auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtResetPassStrategy } from './strategies/jwt-reset-pass.strategy';
import { AuthController } from './controllers/auth.controller';
import { MailerModule } from 'src/mailer/mailer.module';
import config from 'src/common/config';
import { TokenEntity } from './entities/token.entity';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    MailerModule,
    TypeOrmModule.forFeature([TokenEntity]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.api.jwtSecret,
          signOptions: {
            expiresIn: '5h',
          },
        };
      },
    }),
    /* JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.api.jwtSecretReset,
        };
      },
    }),*/
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtResetPassStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
