import { Body, Controller, Post, UseGuards, Req, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LoginDto } from '../dtos/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { MailerService } from 'src/mailer/services/mailer.service';
import { ResetPasswordDto } from '../dtos/resetPasswordReset.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Req() Req: Request) {
    const user = Req.user as UserEntity;
    return this.authService.generateJWT(user);
  }

  //@UseGuards(AuthGuard('jwtreset'))
  @Post('email-reset/:email')
  @ApiOperation({ summary: 'Send Email for password reset' })
  emailPassword(@Param('email') email: string) {
    console.log(email);
    return this.authService.sendEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password from email' })
  resetPassword(@Body() data: LoginDto) {
    return this.authService.resetPassword(data);
  }
}
