import { Controller, Get, Injectable, Req, } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
var Minio = require('minio');

@Controller('')
export class MinioController {


    constructor(private readonly minioService: MinioService) {
    console.log("reached");
  }
  

  @Get('listBuckets')
  async listAllBuckets(@Req() req) {
    return this.minioService.client.listBuckets();
  }

    @Get()
    findAll(): string {
        return 'This action returns all cats';
    }

}
