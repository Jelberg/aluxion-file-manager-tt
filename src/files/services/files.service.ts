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

  /**
   * Guarda informacion de los archivos en la base de datos
   * @param payload
   * @returns
   */
  async create(payload: CreateFileDto) {
    return await this.fileRepository.save(payload);
  }

  /**
   * Funcion actualiza el nombre del archivo en S3 y el la base de datos
   * @param id
   * @param data
   * @returns
   */
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

  /**
   * Caraga la imagen al Bucket de S3
   * @param file
   * @returns
   */
  async uploadFile(file: any) {
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

  /**
   * Carga la imagen segun url al Bucket S3
   * @param url
   * @returns
   */
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

  /**
   * Descarga la imagen del Bucket dada la key
   * @param objectKey
   * @returns
   */
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
