import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import config from 'src/common/config';

@Injectable()
export class AwsService {
  private s3: AWS.S3;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {
    AWS.config.update({
      accessKeyId: configService.aws.key,
      secretAccessKey: configService.aws.secret,
      //region: configService.,
    });

    this.s3 = new AWS.S3();
  }

  getS3Instance(): AWS.S3 {
    return this.s3;
  }
}
