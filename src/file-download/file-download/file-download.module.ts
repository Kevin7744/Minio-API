import { Module } from '@nestjs/common';
import { FileDownloadService } from './file-download.service';
import { FileDownloadController } from './file-download.controller';
import { MinioClientModule } from 'src/minio-client/minio-client.module';



@Module({
    imports: [MinioClientModule],
    providers: [FileDownloadService],
    controllers: [FileDownloadController],
})
export class FileDownloadModule {}


