import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { TokenEntity } from '../entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private TokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    return await this.usersService.login(email, password);
  }

  generateJWT(user: UserEntity) {
    const payload: PayloadToken = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async saveTokenRecoveryPassword(email: string) {
    const isExist = this.usersService.findEmail(email);
    if (!isExist) throw new NotFoundException(`Email ${email} not found`);

    return;
  }
}
