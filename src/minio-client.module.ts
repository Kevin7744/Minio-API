import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { MinioController } from './minio/minio.controller';
import { config } from './config';
var Minio = require('minio');

@Module({
imports: [
    MinioModule.register({
      endPoint: config.endPoint,
      port: config.port,
      useSSL: config.useSSL,
      accessKey: config.accessKey,
      secretKey: config.secretKey,
    })
  ],
controllers: [MinioController],
})
export class AppModule {}