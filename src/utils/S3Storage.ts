// const S3 = require('aws-sdk');
import aws, { S3 } from 'aws-sdk';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import uploadConfig from '../config/upload';

class S3Storage {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1', 
    })
  }

  async saveFile(filename: string): Promise<void> {
    const originalPath = path.resolve(uploadConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File not found');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    this.client.putObject({
      Bucket: 'estudo-aws-s3',
      Key: filename,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(originalPath);
  }

  async deleteFile(filename: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: 'estudo-aws-s3',
      Key: filename,
    }).promise();
  }
}

export default S3Storage;