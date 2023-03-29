import { Controller, Get, Injectable, Req, } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { Request, Response } from 'express';
var Minio = require('minio');

@Controller('')
export class MinioController {
    constructor(private readonly minioService: MinioService) {
    console.log("Minio service reached");
  }
  // list all buckets
  @Get('listBuckets')
  async listAllBuckets(@Req() req) {  
    return this.minioService.client.listBuckets();
  }
  // create a bucket
  @Get('createBucket')
  async createBucket(@Req() req) {
    return this.minioService.client.makeBucket('test', 'us-east-1');
  }
  //Delete a bucket
  @Get('deleteBucket')
  async deleteBucket(@Req() req) {
    return this.minioService.client.removeBucket('test');
  }
}
