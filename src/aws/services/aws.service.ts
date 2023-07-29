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

  /**
   * Crea una instancia de S3
   * @returns
   */
  getS3Instance(): AWS.S3 {
    return this.s3;
  }

  /**
   * Actuliza el nombre anterior por el nuevo
   * @param oldKey
   * @param newKey
   * @returns
   */
  async renameFile(oldKey: string, newKey: string) {
    const s3 = this.getS3Instance();
    const copyParams = {
      Bucket: this.configService.aws.bucket,
      CopySource: `${this.configService.aws.bucket}/${oldKey}`,
      Key: newKey,
    };

    await s3.copyObject(copyParams).promise();

    const deleteParams = {
      Bucket: this.configService.aws.bucket,
      Key: oldKey,
    };

    return await s3.deleteObject(deleteParams).promise();
  }
}
