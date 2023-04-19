import { Controller } from '@nestjs/common';
import { FileDownloadService } from './file-download.service';
import { Get } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';




@Controller('file-download')
export class FileDownloadController {
    constructor(
        private readonly fileDownloadService: FileDownloadService
    ) {}

    // Get file from minio and return it as an url to the client, a file download link  
    @Get('single')
    async downloadFile() {
        return this.fileDownloadService.downloadFile()
    }

}
