import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../dtos/login.dto';
import { Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*@UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() login: LoginDto) {
    return this.authService.validateUser(login)
  }*/

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Req() Req: Request) {
    return Req.user;
  }
}
