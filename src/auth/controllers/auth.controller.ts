import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EmailDto } from '../dtos/email.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { MailerService } from 'src/mailer/services/mailer.service';
import { UserEntity } from 'src/users/entities/user.entity';

@ApiTags('Auth Endpoints')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailerService: MailerService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Req() Req: Request) {
    const user = Req.user as UserEntity;
    return this.authService.generateJWT(user);
  }

  //@UseGuards(AuthGuard('local'))
  @Post('email')
  @ApiOperation({ summary: 'Login' })
  email(@Body() mail: EmailDto) {
    return this.mailerService.sendEmail(mail.email, mail.subject, mail.message);
  }
}
