import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { CatsController } from './cats/cats.controller';
import { MinioController } from './minio/minio.controller';
var Minio = require('minio');

@Module({
imports: [
    MinioModule.register({
      endPoint: '192.168.0.9',
      port: 9000,
      useSSL: false,
      accessKey: 'minioadmin',
      secretKey: 'minioadmin',
    })
  ],
controllers: [CatsController, MinioController],
})
export class AppModule {}