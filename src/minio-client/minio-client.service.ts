import { Injectable, Logger, HttpException, HttpStatus } from "@nestjs/common";
import { MinioService } from "nestjs-minio-client";
import { Stream } from "stream";
import { config } from "./config";
import { BufferedFile } from "./file.model";
import  * as crypto from "crypto";
import { MinioController } from "src/minio/minio.controller";
var Minio = require('minio');

@Injectable()
export class MinioClientService 
{
    private readonly logger: Logger;
    private readonly baseBucket = config.bucketName;

    public get client() 
    {
        return this.minio.client;
    }

    constructor(
        private readonly minio: MinioService,
    )
    {
        this.logger = new Logger('MinioStorageService');
    }

    async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new HttpException ('error while uploading file', HttpStatus.BAD_REQUEST)
        }
        let temp_filename = Date.now(). toString()
        let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        let filename = hashedFileName + ext
        const fileName: string = `${filename};`
        const fileBuffer = file.buffer;
        await this.client.putObject(baseBucket, fileName, fileBuffer, file.size, function(err, res) {
            if(err) throw new HttpException ('Error while uploading file', HttpStatus.BAD_REQUEST )
        })
        return {
            url: `${config.endPoint}: ${config.port}/${config.bucketName}/${filename}`
        }
    }
    async delete(objectName: string, baseBucket: string = this.baseBucket) {
        await this.client.removeObject(baseBucket, objectName,(err) => {
            if(err) throw new HttpException ("Error while deleting file", HttpStatus.BAD_REQUEST )
        })
    }
}

