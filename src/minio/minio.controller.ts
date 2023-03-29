import { Controller, Get, Injectable, Req, Post } from '@nestjs/common';
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
    return this.minioService.client.makeBucket('', '');
  }
  //Delete a bucket
  @Get('deleteBucket')
  async deleteBucket(@Req() req) {
    return this.minioService.client.removeBucket('kevin');
  }

  // list objects in a bucket
  @Get('listObjects')
  async listObjects(@Req() req) {
    return this.minioService.client.listObjects('kevin', '', true);
  }

  // upload an object to a bucket
  @Post('uploadObject')
    create() {
      const bucketName = 'kevin';
      const fileName = 'test.txt';
      const metaData = {
          'Content-Type': 'text/plain',
          'X-Amz-Meta-Testing': 1234,
          example: 5678,
      };
      const file = {
          buffer: 'Hello World',
      };
    return this.minioService.client.putObject(bucketName, fileName, file.buffer, metaData);
  }

  // download an object as url from a bucket
  @Get('downloadObject')
  async downloadObject(@Req() req) {
    return this.minioService.client.presignedGetObject('kevin', 'test.txt', 24 * 60 * 60);
  }

  // delete an object from a bucket
  @Get('deleteObject')  
  async deleteObject(@Req() req) {
    return this.minioService.client.removeObject('kevin', 'test.txt');
  }
}
