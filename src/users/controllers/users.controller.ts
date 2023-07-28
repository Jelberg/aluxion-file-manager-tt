import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User Endpoints')
//@UseGuards(ApiKeyGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  @Public()
  @ApiOperation({ summary: 'Get all users' })
  all() {
    return this.usersService.findAll();
  }

  /*@Post('login')
  @Public()
  @ApiOperation({ summary: 'Login' })
  login(@Body() data: LoginUserDto) {
    return this.usersService.login(data);
  }*/

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create user' })
  creator(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  updated(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Get(':id/files')
  @ApiOperation({ summary: 'Fetch files by user ID' })
  getFiles(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.fetchFiles(id);
  }
}
