import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { FilesController } from './controllers/files/files.controller';
import { UsersService } from './services/users/users.service';
import { FilesService } from './services/files/files.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController, FilesController],
  providers: [AppService, UsersService, FilesService],
})
export class AppModule {}
