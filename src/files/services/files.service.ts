import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { FileEntity } from '../entities/file.entity';
import { CreateFileDto, UpdateFileDto } from '../dtos/files.dto';
import { AwsService } from 'src/aws/services/aws.service';
import { UsersService } from 'src/users/services/users.service';

import { ConfigType } from '@nestjs/config';
import config from './../../common/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    private awsService: AwsService,
    private usersService: UsersService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  async create(payload: CreateFileDto) {
    return await this.fileRepository.save(payload);
  }

  async updateName(id: number, data: UpdateFileDto) {
    if (isEmpty(data.key)) {
      throw new NotFoundException(`Key is empty`);
    }
    const file = await this.fileRepository.findOne({ where: { id: id } });
    if (isEmpty(file)) {
      throw new NotFoundException(`File Not Found`);
    }

    return await this.awsService.renameFile(file.key, data.key).then((item) => {
      console.log(item);
      /*const updtFile = new FileEntity()
      updtFile.img = item.data.Location
      updtFile.key = item.Key
      const newFile = this.fileRepository.merge(file, updtFile);
      return this.fileRepository.save(newFile);*/
    });
  }

  async uploadFile(file: any) {
    console.log(file);
    const user = await this.usersService.findOne(file.user_id);
    if (!user)
      throw new NotFoundException(`User with id ${file.user_id} not found`);

    const s3 = this.awsService.getS3Instance();

    const newFilename = `${file.originalname}`;
    const params = {
      Bucket: this.configService.aws.bucket,
      Key: newFilename,
      Body: file.buffer,
    };

    return await s3
      .upload(params)
      .promise()
      .then(async (res) => {
        const newFile = new FileEntity();
        newFile.key = res.Key;
        newFile.img = res.Location;
        return await this.create(newFile);
      });
  }

  async uploadImageUrl(url: string) {
    const s3 = this.awsService.getS3Instance();
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const newFilename = `${url.split('/').pop()}`;

    const params = {
      Bucket: this.configService.aws.bucket,
      Key: newFilename,
      Body: Buffer.from(response.data),
    };

    return await s3
      .upload(params)
      .promise()
      .then(async (res) => {
        const newFile = new FileEntity();
        newFile.key = res.Key;
        newFile.img = res.Location;
        return await this.create(newFile);
      });
  }

  /*findAll() {
    return this.files;
  }

  findOne(id: number) {
    const file = this.files.find((item) => item.id == id);
    if (!file) throw new NotFoundException(`File ${id} not found`);
    else return file;
  }*/

  async downloadImage(objectKey: string): Promise<Buffer> {
    const params = {
      Bucket: this.configService.aws.bucket,
      Key: objectKey,
    };

    try {
      const data = await this.awsService
        .getS3Instance()
        .getObject(params)
        .promise();

      if (isEmpty(data.Body)) throw new NotFoundException(`Image not found`);

      return data.Body as Buffer;
    } catch (error) {
      throw new Error('Download error S3');
    }
  }
}
