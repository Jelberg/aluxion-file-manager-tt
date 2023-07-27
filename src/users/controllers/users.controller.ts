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
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  all() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  creator(@Body() payload: CreateUserDto) {
    return {
      payload: payload,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  updated(@Param('id') id: number, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  delete(@Param('id') id: number) {
    return {
      id: id,
    };
  }

  @Get(':id/files')
  @ApiOperation({ summary: 'Fetch files by user ID' })
  getFiles(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.fetchFiles(id);
  }
}
