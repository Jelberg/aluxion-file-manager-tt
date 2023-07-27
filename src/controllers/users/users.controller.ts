import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/dtos/users.dtos';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('all')
  all() {
    return this.usersService.findAll();
  }

  @Post()
  creator(@Body() payload: CreateUserDto) {
    return {
      payload: payload,
    };
  }

  @Put(':id')
  updated(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id: id,
    };
  }
}
