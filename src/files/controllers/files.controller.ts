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
  Inject,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { UpdateFileDto, CreateFileDto } from '../dtos/files.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ConfigType } from '@nestjs/config';
import config from 'src/common/config';
import * as AWS from 'aws-sdk';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('File Endpoints')
@Controller('files')
export class FilesController {
  constructor(
    private filesService: FilesService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get('images')
  async getImages(/*@Param('name') name: string*/) {
    const client = new S3Client({});
    const command = new GetObjectCommand({
      Bucket: this.configService.aws.bucket,
      Key: 'hola12347.jpg',
    });

    try {
      const response = await client.send(command);
      // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
      const str = await response.Body.transformToString();
      console.log(str);
    } catch (err) {
      console.error(err);
    }
  }

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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log('upload');
    console.log(file);
    const s3 = new AWS.S3({
      accessKeyId: this.configService.aws.key,
      secretAccessKey: this.configService.aws.secret,
    });

    //const fileName = `${file.originalname}`;
    const fileName = 'hola12347.jpg';
    const params = {
      Bucket: this.configService.aws.bucket,
      Key: fileName,
      Body: file.buffer,
    };

    return await s3.upload(params).promise();
  }
}
