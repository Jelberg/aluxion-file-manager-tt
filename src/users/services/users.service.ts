import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { FilesService } from 'src/files/services/files.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    private filesService: FilesService,
  ) {}

  async login(email: string, password: string) {
    const userFind = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!userFind) throw new NotFoundException(`User ${email} not found`);
    else {
      const compare = await bcrypt.compare(password, userFind.password);
      if (compare) return userFind;
      else return null;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    else return user;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) throw new NotFoundException(`Email: ${email} is already taken`);
    else return false;
  }

  async create(data: CreateUserDto) {
    const userValid = await this.isEmailExist(data.email);
    if (userValid) {
      throw new NotFoundException(`Email: ${data.email} is already taken`);
    } else {
      const newUser = new UserEntity();
      const encryp = await bcrypt.hash(data.password, 10);

      newUser.email = data.email;
      newUser.password = encryp;
      newUser.name = data.name;
      newUser.lastname = data.lastname;
      return await this.userRepository.save(newUser);
    }
  }

  async update(id: number, data: UpdateUserDto) {
    if (isNotEmpty(data.email)) {
      await this.isEmailExist(data.email);
    }

    if (isNotEmpty(data.password)) {
      (data.password as string) = await bcrypt.hash(data.password, 10);
    }

    const user = await this.findOne(id);
    const updtUser = this.userRepository.merge(user, data);
    console.log(updtUser);
    return this.userRepository.save(updtUser);
  }

  async delete(id: number) {
    return await this.findOne(id).then(async () => {
      return await this.userRepository.delete(id);
    });
  }

  fetchFiles(id: number) {
    const user = this.findOne(id);
    return {
      user,
      files: this.filesService.findOne(id),
    };
  }
}
