import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files.service';
import { AwsModule } from '../aws/aws.module';
import { FileEntity } from './entities/file.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
  imports: [AwsModule, TypeOrmModule.forFeature([FileEntity])],
})
export class FilesModule {}
