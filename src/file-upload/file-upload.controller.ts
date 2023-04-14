import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Get } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { FileUploadService } from './file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { Express } from 'express';

@Controller('file-upload')
export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService
    ) {}

    @Post('single')
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingle(
        @UploadedFile() image: BufferedFile
        ) {
        return this.fileUploadService.uploadSingle(image)
        }
    @Post('many')
    @UseInterceptors(FileFieldsInterceptor([
          { name: 'image1', maxCount: 1 },
          { name: 'image2', maxCount: 1 },
        ]))
    async uploadMany(
          @UploadedFiles() files: BufferedFile,
        ) {
          return this.fileUploadService.uploadMany(files)
        }
      // Get the image from the minio server an return it as an url
      @Get('image')
      async getImage() {
        return this.fileUploadService.getImage()
      }
      
     
}
