import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio-client/minio-client.service';

@Injectable()
export class FileDownloadService {
    constructor(
        private readonly minioClientService: MinioClientService
    ) {}

    
    // Get file from minio and return it as an url to the client, a file download link  
    async downloadFile() {
        let file = await this.minioClientService.download('image1.jpg')
        return file.url
    }
}
