import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import { isEmpty } from 'class-validator';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { FileEntity } from '../entities/file.entity';
import { CreateFileDto, UpdateFileDto } from '../dtos/files.dto';
import { AwsService } from 'src/aws/services/aws.service';

import { ConfigType } from '@nestjs/config';
import config from './../../common/config';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    private awsService: AwsService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private files: FileEntity[] = [
    {
      id: 1,
      name: 'Image',
      img: 'this is a image',
    },
  ];

  async create(payload: CreateFileDto) {
    return await this.fileRepository.save(payload);
  }

  async updateName(id: number, data: UpdateFileDto) {
    if (isEmpty(data.name)) {
      throw new NotFoundException(`Name Fils is empty`);
    }
    const file = await this.fileRepository.findOne({ where: { id: id } });

    if (isEmpty(file)) {
      throw new NotFoundException(`File Not Found`);
    }

    const updtFile = this.fileRepository.merge(file, data);
    return this.fileRepository.save(updtFile);
  }

  async uploadFile(file: any) {
    console.log('upload');
    console.log(file);

    const s3 = this.awsService.getS3Instance();
    const fileName = 'hola12347.jpg';

    const params = {
      Bucket: this.configService.aws.bucket,
      Key: fileName,
      Body: file.buffer,
    };

    return await s3.upload(params).promise();

    /* const s3 = new AWS.S3({
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

    await s3
      .upload(params)
      .promise()
      .then(async (res) => {
        const newFile = new FileEntity();
        newFile.name = res.Key;
        newFile.img = res.Location;
        return await this.filesService.create(newFile);
      });*/
  }

  async uploadImageUrl(url: string) {
    const s3 = this.awsService.getS3Instance();
    const response = await axios.get(url, { responseType: 'arraybuffer' });

    const newFilename = `${uuidv4()}_${url.split('/').pop()}`;

    const params = {
      Bucket: this.configService.aws.bucket,
      Key: newFilename,
      Body: Buffer.from(response.data),
    };

    return await s3.upload(params).promise();
  }

  findAll() {
    return this.files;
  }

  findOne(id: number) {
    const file = this.files.find((item) => item.id == id);
    if (!file) throw new NotFoundException(`File ${id} not found`);
    else return file;
  }
}
