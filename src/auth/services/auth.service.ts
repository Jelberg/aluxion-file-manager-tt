import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/services/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';
import { TokenEntity } from '../entities/token.entity';
import { MailerService } from 'src/mailer/services/mailer.service';
import { UpdateUserDto } from 'src/users/dtos/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private TokenRepository: Repository<TokenEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  /**
   * Valida el usuario usando la estrategia para mensajes de autorizacion
   * @param email
   * @param password
   * @returns
   */
  async validateUser(email: string, password: string) {
    return await this.usersService.login(email, password);
  }

  /**
   * Genera el token
   * @param user
   * @returns
   */
  generateJWT(user: UserEntity) {
    const payload: PayloadToken = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  /*
  async saveTokenRecoveryPassword(email: string) {
    const isExist = this.usersService.findEmail(email);
    if (!isExist) throw new NotFoundException(`Email ${email} not found`);
    return;
  }*/

  /**
   * Funcion llama al servicio de envio de email para mandar datos del token
   * @param email
   * @returns
   */
  async sendEmail(email: string) {
    const user = await this.usersService.findEmail(email);

    if (!user) throw new NotFoundException(`Email ${email} not found`);
    const uEntity = new UserEntity();
    uEntity.email = email;
    uEntity.id = user.id;
    const subject = 'Reset your password ' + email + ' !';
    const message =
      'This is the token: ' + this.generateJWT(uEntity).access_token;
    return this.mailerService.sendEmail(email, subject, message);
  }

  /**
   * Funcion actualiza password usando token de valido
   * @param data
   * @returns
   */
  async resetPassword(data) {
    const user = await this.usersService.findEmail(data.email);
    const newData = data as UpdateUserDto;
    return await this.usersService.updatePassword(user.id, newData);
  }
}
