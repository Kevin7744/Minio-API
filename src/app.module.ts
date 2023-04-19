import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinioClientModule } from './minio-client/minio-client.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileDownloadService } from './file-download/file-download/file-download.service';

@Module({
  imports: [MinioClientModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService, FileDownloadService],
})
export class AppModule {}
