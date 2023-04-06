import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { MinioController } from 'src/minio/minio.controller';

@Module({
    imports: [MinioClientModule],
    providers: [FileUploadService],
    controllers: [FileUploadController],
})
export class FileUploadModule {}