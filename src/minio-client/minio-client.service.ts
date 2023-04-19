import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { MinioService } from "nestjs-minio-client";
import { Stream } from 'stream';
import { config } from "./config";
import { BufferedFile } from "./file.model";
import  * as crypto from "crypto";
import { Express } from 'express';

@Injectable()
export class MinioClientService {
    private readonly logger: Logger;
    private readonly baseBucket = config.bucketName

  public get client() {
    return this.minio.client;
  }

  constructor(
    private readonly minio: MinioService,
  ) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
    if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    }
    let temp_filename = Date.now().toString()
    let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    let filename = hashedFileName + ext
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;
    this.client.putObject(baseBucket,fileName,fileBuffer, file.size, function(err, res) {
      if(err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
    })

    return {
      url: `${config.endPoint}:${config.port}/${config.bucketName}/${filename}` 
    }
  }

  public async delete(objectName: string, baseBucket: string = this.baseBucket) {
    this.client.removeObject(baseBucket, objectName,function(err){
      if(err) throw new HttpException("Oops Something wrong happened", HttpStatus.BAD_REQUEST)
    })
  }
  
  public async download(objectName: string, baseBucket: string = this.baseBucket) {
    let url = `${config.endPoint}:${config.port}/${config.bucketName}/${objectName}`
    return {
      url: url
    }
  }
}
