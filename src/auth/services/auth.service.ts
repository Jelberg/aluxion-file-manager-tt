import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    return await this.usersService.login(email, password);
  }
}
