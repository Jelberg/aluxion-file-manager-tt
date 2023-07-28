import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/common/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtRecoveryPassStrategy extends PassportStrategy(
  Strategy,
  'jwt-recovery',
) {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.api.jwtSecretRecovery,
    });
  }

  validate(payload: PayloadToken) {
    return payload;
  }
}
