import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { FileEntity } from 'src/files/entities/file.entity';

import { FilesService } from 'src/files/services/files.service';

@Injectable()
export class UsersService {
  constructor(private filesService: FilesService) {}

  private users: UserEntity[] = [
    {
      id: 1,
      email: 'jessica@gmail.com',
      password: 'jessica',
      name: 'jessica',
      lastname: 'elberg',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id == id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    else return user;
  }

  create(payload: any) {
    const newUser = {
      id: payload.id,
      ...payload,
    };
  }

  update(id: number, payload: any) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id == id);
      console.log(index);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  fetchFiles(id: number) {
    const user = this.findOne(id);
    return {
      user,
      files: this.filesService.findOne(id),
    };
  }
}
