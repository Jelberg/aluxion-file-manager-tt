import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { UsersController } from './controllers/users.controller';

import { UsersService } from './services/users.service';
import { FilesModule } from 'src/files/files.module';

import { UserEntity } from './entities/user.entity';

@Module({
  imports: [FilesModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
