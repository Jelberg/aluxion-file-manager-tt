import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'src/common/config';
import { PayloadToken } from '../models/token.model';

/**
 * Estrategia para validar el JWT
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.api.jwtSecret,
    });
  }

  /**
   * Valida el formato del token
   * @param payload
   * @returns
   */
  validate(payload: PayloadToken) {
    return payload;
  }
}
