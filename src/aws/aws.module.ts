import { Module, Global } from '@nestjs/common';
import { AwsService } from './services/aws.service';
import { AwsController } from './controllers/aws.controller';

Global();
@Module({
  providers: [AwsService],
  controllers: [AwsController],
  exports: [AwsService],
})
export class AwsModule {}
