import {
  Controller,
  Get,
  Param,
  Res,
  Body,
  Post,
  Delete,
  Put,
  Inject,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { UpdateFileDto } from '../dtos/files.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ConfigType } from '@nestjs/config';
import config from 'src/common/config';

import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File Endpoints')
@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get('get-image/:objectKey')
  @ApiOperation({ summary: 'Download image from url' })
  async downloadImage(
    @Param('objectKey') objectKey: string,
    @Res() res: Response,
  ) {
    try {
      const imageBuffer = await this.filesService.downloadImage(objectKey);
      res.contentType('image/jpeg');
      res.send(imageBuffer);
    } catch (error) {
      res.status(404).send('No se encontró la imagen.');
    }
  }

  @Put('change-name/:id')
  @ApiOperation({ summary: 'Change name' })
  updated(@Param('id') id: number, @Body() payload: UpdateFileDto) {
    return this.filesService.updateName(id, payload);
  }

  @Post('upload')
  @ApiOperation({ summary: 'Upload image from desktop' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  @Post('upload-image-url')
  @ApiOperation({ summary: 'Upload image from url' })
  async uploadFileFromUrl(@Body() body: { url: string }) {
    const { url } = body;
    if (!url) {
      throw new Error('Invalid Url');
    }
    return await this.filesService.uploadImageUrl(url);
  }
}
