import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
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
}
