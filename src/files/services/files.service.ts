import { Injectable, NotFoundException } from '@nestjs/common';
import { FileEntity } from '../entities/file.entity';

@Injectable()
export class FilesService {
  private files: FileEntity[] = [
    {
      id: 1,
      name: 'Image',
      img: 'this is a image',
    },
  ];

  findAll() {
    return this.files;
  }

  findOne(id: number) {
    const file = this.files.find((item) => item.id == id);
    if (!file) throw new NotFoundException(`File ${id} not found`);
    else return file;
  }

  create(payload: any) {
    const newFile = {
      id: payload.id,
      ...payload,
    };
  }

  update(id: number, payload: any) {
    const file = this.findOne(id);
    if (file) {
      const index = this.files.findIndex((item) => item.id == id);
      console.log(index);
      this.files[index] = {
        ...file,
        ...payload,
      };
      return this.files[index];
    }
    return null;
  }
}
