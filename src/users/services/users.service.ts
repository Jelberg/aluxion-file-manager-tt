import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { isNotEmpty } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Valida el email del usuario y compara las contrasenas
   * @param email
   * @param password
   * @returns
   */
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

  /**
   * Devuelve todos los usuarios registrados
   * @returns Users[]
   */
  async findAll() {
    return await this.userRepository.find();
  }

  /**
   * Busca por id del usuario
   * @param id
   * @returns user
   */
  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    else return user;
  }

  /**
   * Valida si el correo fue tomado
   * @param email
   * @returns
   */

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (user) throw new NotFoundException(`Email: ${email} is already taken`);
    else return false;
  }

  /**
   * Devuelve error si no consigue email
   * @param email
   * @returns
   */
  async findEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!user) throw new NotFoundException(`Email: ${email} not found`);
    else return user;
  }

  /**
   * Guarda los datos del usuario que se registra
   * @param data
   * @returns
   */
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

  /**
   * Hace merge con los datos nuevos del usuario y los anteriores para actualizar
   * @param id
   * @param data
   * @returns
   */
  async update(id: number, data: UpdateUserDto) {
    if (isNotEmpty(data.email)) {
      await this.isEmailExist(data.email);
    }

    if (isNotEmpty(data.password)) {
      (data.password as string) = await bcrypt.hash(data.password, 10);
    }

    const user = await this.findOne(id);
    const updtUser = this.userRepository.merge(user, data);

    return this.userRepository.save(updtUser);
  }

  /**
   * Actualiza contrana
   * @param id
   * @param data
   * @returns
   */
  async updatePassword(id: number, data: UpdateUserDto) {
    if (isNotEmpty(data.password)) {
      (data.password as string) = await bcrypt.hash(data.password, 10);
    }

    const user = await this.findOne(id);
    const updtUser = this.userRepository.merge(user, data);

    return this.userRepository.save(updtUser);
  }

  /**
   * Elimina al usuario segun el id
   * @param id
   * @returns
   */
  async delete(id: number) {
    return await this.findOne(id).then(async () => {
      return await this.userRepository.delete(id);
    });
  }
}
