import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { UpdateFileDto, CreateFileDto } from '../dtos/files.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('File Endpoints')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  getfile(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.findOne(id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all files' })
  all() {
    return this.filesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create File' })
  creator(@Body() payload: CreateFileDto) {
    return {
      payload: payload,
    };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update file by ID' })
  updated(@Param('id') id: number, @Body() payload: UpdateFileDto) {
    return this.filesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete File by ID' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id: id,
    };
  }
}
